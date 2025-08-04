import { MercadoPagoService } from "@/services/mercadopago";
import { PaymentValidator } from "@/app/api/webhook/mercadopago/validators/PaymentValidator";
import { PaymentProcessingService } from "@/app/api/webhook/mercadopago/services/PaymentProcessingService";
import { PaymentInfo } from "@/app/typings/payment";
import { WebhookPayload } from "@/app/api/webhook/mercadopago/types/webhook";
import { NotificationHandler } from "./NotificationHandler";

export class PaymentApprovalHandler {
  private mercadoPagoService: MercadoPagoService;
  private paymentProcessingService: PaymentProcessingService;
  private notificationHandler: NotificationHandler;

  constructor(
    mercadoPagoService: MercadoPagoService,
    paymentProcessingService: PaymentProcessingService,
    notificationHandler: NotificationHandler,
  ) {
    this.mercadoPagoService = mercadoPagoService;
    this.paymentProcessingService = paymentProcessingService;
    this.notificationHandler = notificationHandler;
  }

  async handlePaymentApproval(
    paymentId: WebhookPayload["data"]["id"],
  ): Promise<void> {
    const paymentInfo = await this.getPaymentInfo(paymentId);
    const validatedPayment = PaymentValidator.validatePaymentInfo(paymentInfo);
    const externalReference = PaymentValidator.validateAndDecodeToken(
      validatedPayment.external_reference,
    );

    const processingResult =
      await this.paymentProcessingService.confirm(externalReference);

    if (!processingResult.success) {
      throw new Error(`Payment processing failed: ${processingResult.error}`);
    }

    await this.notificationHandler.sendPaymentConfirmationEmail(
      externalReference,
    );

    console.info(
      `MP WEBHOOK::Payment approval workflow completed successfully`,
    );
  }

  private async getPaymentInfo(
    paymentId: WebhookPayload["data"]["id"],
  ): Promise<PaymentInfo> {
    try {
      const paymentInfo = await this.mercadoPagoService.getPayment(paymentId);
      return {
        id: paymentInfo.id?.toString() || "",
        status: paymentInfo.status || "",
        external_reference: paymentInfo.external_reference || "",
      };
    } catch (error) {
      console.error("MP WEBHOOK::Error getting payment info paymentId:", {
        paymentId,
      });
      throw error;
    }
  }
}
