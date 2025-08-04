import { NotificationResult } from "@/app/typings/notification";
import { NotificationError } from "@/lib/errors/Notifications";

import { DataSource } from "@/services/datasource";
import { ExternalReference } from "@/app/typings/webhook";
import { NotificationService } from "@/services/notifications/notification";
import { SubscriberResourceNotFoundError } from "@/lib/errors/Suscription";

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
        `NotificationHandler::Confirmation email sent to user: ${JSON.stringify(
          {
            subscriberId: subscriberResource.subscriber.id,
          },
        )}`,
      );

      return {
        success: true,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        `NotificationHandler::Webhook::Failed to send confirmation email: ${errorMessage}`,
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
        `NotificationHandler::Webhook::Payment failure notification for user ${subscriberResource.subscriber.id}: ${failureReason}`,
      );

      return {
        success: true,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        `NotificationHandler::Webhook::Failed to send failure notification: ${errorMessage}`,
      );

      throw new NotificationError(errorMessage);
    }
  }
}
