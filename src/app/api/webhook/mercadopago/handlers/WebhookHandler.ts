import { WebhookValidator } from "../validators/WebhookValidator";
import { PaymentApprovalHandler } from "./PaymentApprovalHandler";
import { WebhookPayload, WebhookResponse } from "../types/webhook.types";

export class WebhookHandler {
  private paymentApprovalHandler: PaymentApprovalHandler;

  constructor(paymentApprovalHandler: PaymentApprovalHandler) {
    this.paymentApprovalHandler = paymentApprovalHandler;
  }

  async process(payload: WebhookPayload): Promise<WebhookResponse> {
    console.info("MP WEBHOOK::Webhook MercadoPago received");

    try {
      const paymentWebhook = WebhookValidator.validateWebhookPayload(payload);

      await this.paymentApprovalHandler.handlePaymentApproval(
        paymentWebhook.data.id,
      );

      return {
        message: "Payment webhook processed successfully",
      };
    } catch (error) {
      throw error;
    }
  }
}
