export class WebhookError extends Error {
  public readonly status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.name = "WebhookError";
    // Note: Status is kept for internal error classification
    // MercadoPago webhook responses always return 200
    this.status = status;
  }
}

export class InvalidWebhookTypeError extends WebhookError {
  constructor(receivedType: string) {
    super(`Invalid webhook type: ${receivedType}. Expected: payment`, 200);
    this.name = "InvalidWebhookTypeError";
  }
}

export class PaymentNotApprovedError extends WebhookError {
  constructor(paymentId: string, status: string) {
    super(`Payment ${paymentId} not approved. Status: ${status}`, 200);
    this.name = "PaymentNotApprovedError";
  }
}
