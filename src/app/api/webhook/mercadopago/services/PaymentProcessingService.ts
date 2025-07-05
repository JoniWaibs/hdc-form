import { DataSource } from "@/services/datasource";
import { PaymentProcessingResult } from "../types/payment.types";
import { ExternalReference } from "../types/webhook.types";
import {
  SubscriberResourceNotFoundError,
  PaymentProcessingError,
} from "../errors/PaymentError";

export class PaymentProcessingService {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async confirm(
    externalReference: ExternalReference,
  ): Promise<PaymentProcessingResult> {
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

      const updateResult = await this.dataSource.updateSubscriberResource(
        subscriberResource.id,
        {
          payment_confirmed: true,
        },
      );

      console.info(
        `MP WEBHOOK::Payment confirmed and status updated for: ${JSON.stringify(
          {
            subscriberResourceId: updateResult.data.id,
            subscriberId: updateResult.data.subscriber?.id || "unknown",
            resourceId: updateResult.data.resource?.id || "unknown",
            paymentConfirmed: updateResult.data.payment_confirmed,
            updatedAt: updateResult.data.updated_at,
          },
        )}`,
      );

      return {
        success: true,
        subscriberResourceId: subscriberResource.id,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(`MP WEBHOOK::Payment processing failed: ${errorMessage}`);

      if (error instanceof SubscriberResourceNotFoundError) {
        throw error;
      }

      throw new PaymentProcessingError(errorMessage);
    }
  }
}
