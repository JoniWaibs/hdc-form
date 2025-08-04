import { NewsletterSubscriber } from "@/app/schema";
import { ApiServiceResult } from "@/app/typings/services";
import { NewsletterDataSource } from "@/services/datasource/newsletter";

export class SubscriptionService {
  private dataSource: NewsletterDataSource;

  constructor(dataSource: NewsletterDataSource) {
    this.dataSource = dataSource;
  }

  async subscribeToNewsletter(
    email: string,
    token: string,
  ): Promise<ApiServiceResult<void>> {
    try {
      await this.dataSource.createSubscriberNewsletter({
        email,
        unsubscribeToken: token,
      });

      return {
        success: true,
        message:
          "SubscriptionService::Subscription newsletter workflow completed successfully",
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      return {
        success: false,
        message: `SubscriptionService::Subscription newsletter workflow failed: ${errorMessage}`,
      };
    }
  }

  async getSubscribersNewsletter(
    email?: string,
  ): Promise<ApiServiceResult<NewsletterSubscriber[]>> {
    try {
      const subscriber = await this.dataSource.getSubscribersNewsletter(email);

      return {
        data: subscriber.data,
        success: true,
        message:
          "SubscriptionService::Get subscribers newsletter workflow completed successfully",
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      return {
        success: false,
        message: `SubscriptionService::Get subscribers newsletter workflow failed: ${errorMessage}`,
      };
    }
  }

  async unsubscribeNewsletter(token: string): Promise<ApiServiceResult<void>> {
    try {
      await this.dataSource.unsubscribeNewsletterByToken(token);

      return {
        success: true,
        message:
          "SubscriptionService::Unsubscription newsletter workflow completed successfully",
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      return {
        success: false,
        message: `SubscriptionService::Unsubscription newsletter workflow failed: ${errorMessage}`,
      };
    }
  }
}
