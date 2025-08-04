import jwt from "jsonwebtoken";
import { PaymentInfo } from "@/app/typings/payment";
import { ExternalReference } from "@/app/api/webhook/mercadopago/types/webhook";
import { InvalidTokenError } from "@/lib/errors/Payment";
import { PaymentNotApprovedError } from "@/lib/errors/Webhook";

export class PaymentValidator {
  static validatePaymentInfo(paymentInfo: PaymentInfo): PaymentInfo {
    if (
      !paymentInfo.status ||
      typeof paymentInfo.status !== "string" ||
      !["approved"].includes(paymentInfo.status)
    ) {
      throw new PaymentNotApprovedError(paymentInfo.id, paymentInfo.status);
    }

    return {
      id: paymentInfo.id,
      status: paymentInfo.status,
      external_reference: paymentInfo.external_reference,
    };
  }

  static validateAndDecodeToken(token: string): ExternalReference {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown;

      if (!decoded || typeof decoded !== "object") {
        throw new InvalidTokenError(token);
      }

      const reference = decoded as Record<string, unknown>;

      if (!reference.resourceId || typeof reference.resourceId !== "string") {
        throw new InvalidTokenError(token);
      }

      if (
        !reference.subscriberId ||
        typeof reference.subscriberId !== "string"
      ) {
        throw new InvalidTokenError(token);
      }

      console.log(
        "MP WEBHOOK::External reference decoded successfully",
        JSON.stringify({
          resourceId: reference.resourceId,
          subscriberId: reference.subscriberId,
        }),
      );

      return {
        resourceId: reference.resourceId,
        subscriberId: reference.subscriberId,
      };
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        throw error;
      }
      throw new InvalidTokenError(token);
    }
  }
}
