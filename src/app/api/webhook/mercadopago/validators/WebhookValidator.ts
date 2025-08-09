import { InvalidWebhookTypeError } from "@/lib/errors/Webhook";
import { WebhookPayload } from "@/app/typings/webhook";

export class WebhookValidator {
  static validateWebhookPayload(payload: WebhookPayload): WebhookPayload {
    if (payload.type !== "payment") {
      throw new InvalidWebhookTypeError(payload.type);
    }

    if (!payload.data?.id) {
      throw new Error("Invalid payment webhook: missing payment ID");
    }

    return payload as WebhookPayload;
  }
}
