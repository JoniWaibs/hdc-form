import { NotificationResult } from "@/app/typings/payment";
import { NotificationError } from "@/lib/errors/Notifications";
import { SubscriberResourceNotFoundError } from "@/lib/errors/Payment";
import { DataSource } from "@/services/datasource";
import { ExternalReference } from "@/app/api/webhook/mercadopago/types/webhook";
import { NotificationService } from "@/services/notifications/notification";

export class NotificationHandler {
  private dataSource: DataSource;
  private notificationService: NotificationService;

  constructor(
    dataSource: DataSource,
    notificationService: NotificationService,
  ) {
    this.dataSource = dataSource;
    this.notificationService = notificationService;
  }

  async sendPaymentConfirmationEmail(
    externalReference: ExternalReference,
  ): Promise<NotificationResult> {
    const subscriberResources = await this.dataSource.getSubscriberResources({
      subscriber_id: externalReference.subscriberId,
      resource_id: externalReference.resourceId,
    });

    if (!subscriberResources.length) {
      throw new SubscriberResourceNotFoundError(
        externalReference.subscriberId,
        externalReference.resourceId,
      );
    }

    const subscriberResource = subscriberResources[0];

    try {
      await this.notificationService.send({
        to: subscriberResource.subscriber.email,
        type: "email",
        template: "confirmation",
        data: {
          subscriber: subscriberResource.subscriber,
          resource: subscriberResource.resource,
        },
      });

      console.info(
        `MP WEBHOOK::Confirmation email sent to user: ${JSON.stringify({
          subscriberId: subscriberResource.subscriber.id,
        })}`,
      );

      return {
        success: true,
        recipientEmail: subscriberResource.subscriber.email,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        `MP WEBHOOK::Failed to send confirmation email: ${errorMessage}`,
      );

      throw new NotificationError(errorMessage);
    }
  }

  async sendPaymentFailureEmail(
    externalReference: ExternalReference,
    failureReason: string,
  ): Promise<NotificationResult> {
    try {
      const subscriberResources = await this.dataSource.getSubscriberResources({
        subscriber_id: externalReference.subscriberId,
        resource_id: externalReference.resourceId,
      });

      if (!subscriberResources.length) {
        throw new SubscriberResourceNotFoundError(
          externalReference.subscriberId,
          externalReference.resourceId,
        );
      }

      const subscriberResource = subscriberResources[0];

      console.log(
        `Payment failure notification for user ${subscriberResource.subscriber.id}: ${failureReason}`,
      );

      return {
        success: true,
        recipientEmail: subscriberResource.subscriber.email,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(`Failed to send failure notification: ${errorMessage}`);

      throw new NotificationError(errorMessage);
    }
  }
}
