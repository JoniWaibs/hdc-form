import { EmailService } from "@/services/email";
import { NotificationResult } from "../types/payment.types";
import {
  NotificationError,
  SubscriberResourceNotFoundError,
} from "../errors/PaymentError";
import { DataSource } from "@/services/datasource";
import { ExternalReference } from "../types/webhook.types";
import { EmailType } from "@/lib/enums/emails";

export class NotificationService {
  private dataSource: DataSource;
  private emailService: EmailService;

  constructor(dataSource: DataSource, emailService: EmailService) {
    this.dataSource = dataSource;
    this.emailService = emailService;
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
      await this.emailService.send(EmailType.CONFIRMATION, subscriberResource);
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
