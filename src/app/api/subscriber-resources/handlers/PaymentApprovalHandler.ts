import { NotificationHandler } from "./NotificationHandler";
import { PaymentProcessingService } from "@/app/api/subscriber-resources/services/PaymentProcessingService";
import { PaymentApprovalResult } from "@/app/typings/payment";
import { SubscriberResource } from "@/app/schema";

export class PaymentApprovalHandler {
  private paymentProcessingService: PaymentProcessingService;
  private notificationHandler: NotificationHandler;

  constructor(
    paymentProcessingService: PaymentProcessingService,
    notificationHandler: NotificationHandler,
  ) {
    this.paymentProcessingService = paymentProcessingService;
    this.notificationHandler = notificationHandler;
  }

  async handlePaymentApproval({
    subscriberResourceId,
  }: {
    subscriberResourceId: SubscriberResource["id"];
  }): Promise<PaymentApprovalResult> {
    const processingResult = await this.paymentProcessingService.confirm({
      subscriberResourceId,
    });

    if (!processingResult.success) {
      throw new Error(`Payment processing failed: ${processingResult.error}`);
    }

    await this.notificationHandler.sendPaymentConfirmationEmail(
      subscriberResourceId,
    );

    console.info(
      `PaymentApprovalHandler::Payment confirmed workflow completed successfully`,
    );

    return {
      message: `PaymentApprovalHandler::Payment confirmed workflow completed successfully for subscriber_resource ${processingResult.subscriberResourceId}`,
    };
  }
}
