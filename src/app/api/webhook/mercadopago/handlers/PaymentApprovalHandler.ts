import { MercadoPagoService } from "@/services/mercadopago";
import { PaymentValidator } from "../validators/PaymentValidator";
import { PaymentProcessingService } from "../services/PaymentProcessingService";
import { NotificationService } from "../services/NotificationService";
import { PaymentInfo } from "../types/payment.types";
import { WebhookPayload } from "../types/webhook.types";

export class PaymentApprovalHandler {
  private mercadoPagoService: MercadoPagoService;
  private paymentProcessingService: PaymentProcessingService;
  private notificationService: NotificationService;

  constructor(
    mercadoPagoService: MercadoPagoService,
    paymentProcessingService: PaymentProcessingService,
    notificationService: NotificationService,
  ) {
    this.mercadoPagoService = mercadoPagoService;
    this.paymentProcessingService = paymentProcessingService;
    this.notificationService = notificationService;
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

    await this.notificationService.sendPaymentConfirmationEmail(
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
