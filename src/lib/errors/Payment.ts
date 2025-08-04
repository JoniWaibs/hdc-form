export class PaymentError extends Error {
  public readonly status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.name = "PaymentError";
    this.status = status;
  }
}

export class InvalidTokenError extends PaymentError {
  constructor(token: string) {
    super(`Invalid or expired JWT token: ${token}`, 401);
    this.name = "InvalidTokenError";
  }
}

export class PaymentProcessingError extends PaymentError {
  constructor(message: string) {
    super(`Payment processing failed: ${message}`, 500);
    this.name = "PaymentProcessingError";
  }
}
