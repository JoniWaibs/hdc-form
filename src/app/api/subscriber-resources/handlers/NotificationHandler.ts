import { NotificationResult } from "@/app/typings/notification";
import { NotificationError } from "@/lib/errors/Notifications";
import { DataSource } from "@/services/datasource";
import { NotificationService } from "@/services/notifications/notification";
import { SubscriberResource } from "@/app/schema";

export class NotificationHandler {
  private dataSource: DataSource;
  private notificationService: NotificationService;

  constructor(
    dataSource: DataSource,
    notificationService: NotificationService
  ) {
    this.dataSource = dataSource;
    this.notificationService = notificationService;
  }

  async sendPaymentConfirmationEmail(
    subscriberResourceId: SubscriberResource["id"]
  ): Promise<NotificationResult> {
    const subscriberResource = await this.dataSource.getSubscriberResources({
      id: subscriberResourceId,
    });

    if (!subscriberResource.length) {
      throw new NotificationError("SubscriberResource Not found", 404);
    }

    const { subscriber, resource } = subscriberResource[0];
    try {
      await this.notificationService.send({
        to: subscriber.email,
        type: "email",
        template: "confirmation",
        data: {
          subscriber,
          resource,
        },
      });

      console.info(
        `NotificationHandler::Confirmation email sent to user: ${subscriber.email}`
      );

      return {
        success: true,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        `NotificationHandler::Failed to send confirmation email: ${errorMessage}`
      );

      throw new NotificationError(errorMessage);
    }
  }
}
