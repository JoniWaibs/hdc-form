import { DataSource } from "@/services/datasource";
import { PaymentProcessingResult } from "@/app/typings/payment";
import { PaymentProcessingError } from "@/lib/errors/Payment";
import { SubscriberResourceNotFoundError } from "@/lib/errors/Suscription";

export class PaymentProcessingService {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async confirm({
    subscriberResourceId,
  }: {
    subscriberResourceId: string;
  }): Promise<PaymentProcessingResult> {
    try {
      const response = await this.dataSource.updateSubscriberResource(
        subscriberResourceId,
        {
          payment_confirmed: true,
        },
      );

      console.info(
        `PaymentProcessingService::Payment confirmed and status updated for: ${JSON.stringify(
          {
            subscriberResourceId: response.data.id,
            paymentConfirmed: response.data.payment_confirmed,
            updatedAt: response.data.updated_at,
          },
        )}`,
      );

      return {
        success: true,
        subscriberResourceId: response.data.id,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        `PaymentProcessingService::Payment processing failed: ${errorMessage}`,
      );

      if (error instanceof SubscriberResourceNotFoundError) {
        throw error;
      }

      throw new PaymentProcessingError(errorMessage);
    }
  }
}
