import { v4 as uuidv4 } from "uuid";
import { SubscribeError } from "@/lib/errors/Suscription";
import { SubscriptionService } from "@/app/api/suscription/services/Subscription";
import { NewsletterSubscriber } from "@/app/schema";
import { HandlerResult } from "@/app/typings/handlers";
import { NotificationHandler } from "./NotificationHandler";

export class NewsletterHandler {
  private subscriptionService: SubscriptionService;
  private notificationHandler: NotificationHandler;

  constructor(
    subscriptionService: SubscriptionService,
    notificationHandler: NotificationHandler,
  ) {
    this.subscriptionService = subscriptionService;
    this.notificationHandler = notificationHandler;
  }

  private generateUnsubscribeToken(): string {
    return uuidv4();
  }

  async subscribe(email: string): Promise<HandlerResult<void>> {
    const unsubscribeToken = this.generateUnsubscribeToken();

    const result = await this.subscriptionService.subscribeToNewsletter(
      email,
      unsubscribeToken,
    );

    if (!result.success) {
      throw new SubscribeError(result.message, 409);
    }

    console.info(`NewsletterHandler::${result.message}`);

    await this.notificationHandler.sendSubscriptionConfirmationEmail(
      email,
      unsubscribeToken,
    );

    return {
      message: result.message,
    };
  }

  async getSubscribers(
    email?: string,
  ): Promise<HandlerResult<NewsletterSubscriber[]>> {
    const result =
      await this.subscriptionService.getSubscribersNewsletter(email);

    if (!result.success) {
      throw new SubscribeError(result.message);
    }

    console.info(`NewsletterHandler::${result.message}`);

    return {
      message: result.message,
      data: result.data,
    };
  }

  async unsubscribe(token: string): Promise<HandlerResult<void>> {
    const result = await this.subscriptionService.unsubscribeNewsletter(token);

    if (!result.success) {
      throw new SubscribeError(result.message);
    }

    console.info(`NewsletterHandler::${result.message}`);

    return {
      message: result.message,
    };
  }
}
