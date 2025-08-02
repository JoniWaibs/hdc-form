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

export class SubscriberResourceNotFoundError extends PaymentError {
  constructor(subscriberId: string, resourceId: string) {
    super(
      `Subscriber resource not found for subscriber: ${subscriberId}, resource: ${resourceId}`,
      404,
    );
    this.name = "SubscriberResourceNotFoundError";
  }
}

export class PaymentProcessingError extends PaymentError {
  constructor(message: string) {
    super(`Payment processing failed: ${message}`, 500);
    this.name = "PaymentProcessingError";
  }
}

export class NotificationError extends PaymentError {
  constructor(message: string) {
    super(`Notification failed: ${message}`, 500);
    this.name = "NotificationError";
  }
}
