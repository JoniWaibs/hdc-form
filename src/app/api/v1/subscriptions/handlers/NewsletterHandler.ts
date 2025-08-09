import { HandlerResult } from "@/app/api/v1/core/types/api";
import { SubscriptionService } from "@/app/api/v1/subscriptions/services/Subscription";
import { Email } from "@/app/schema/common/email";
import {
  DDBBNewsletterSubscriber,
  UnsubscribeToken,
} from "@/app/schema/subscriptions/newsletter";
import { NotificationHandler } from "./NotificationHandler";

export class NewsletterHandler {
  constructor(
    private subscriptionService: SubscriptionService,
    private notificationHandler: NotificationHandler,
  ) {}

  async subscribe(
    email: Email,
  ): Promise<HandlerResult<DDBBNewsletterSubscriber | null>> {
    const token = crypto.randomUUID();

    const subscriptionResult =
      await this.subscriptionService.subscribeToNewsletter({
        email,
        unsubscribe_token: token,
      });

    const emailResponse =
      await this.notificationHandler.sendSubscriptionConfirmationEmail(
        email,
        token,
      );

    return {
      data: null,
      message: `Subscription created successfully for id: ${subscriptionResult.id}, email: ${emailResponse ? "was sent" : "was not sent"}`,
    };
  }

  async getSubscribers(
    email?: Email,
  ): Promise<HandlerResult<DDBBNewsletterSubscriber[]>> {
    const data = await this.subscriptionService.getSubscribersNewsletter(email);
    const message = !!data.length
      ? "Subscriber retrieved successfully"
      : "No subscribers found";
    return { data, message };
  }

  async unsubscribe(
    token: UnsubscribeToken,
  ): Promise<HandlerResult<DDBBNewsletterSubscriber>> {
    const result = await this.subscriptionService.unsubscribeNewsletter(token);
    return {
      data: result,
      message: `Unsubscription confirmed successfully for id: ${result.id}`,
    };
  }
}
