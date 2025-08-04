export class SuscriptionError extends Error {
  public readonly status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.name = "SuscriptionError";
    this.status = status;
  }
}

export class SubscribeError extends SuscriptionError {
  constructor(message: string, status: number = 400) {
    super(`Subscribe error: ${message}`, status);
    this.name = "SubscribeError";
  }
}

export class SubscriberResourceNotFoundError extends SuscriptionError {
  constructor(subscriberId: string, resourceId: string) {
    super(
      `Subscriber resource not found for subscriber: ${subscriberId}, resource: ${resourceId}`,
      404,
    );
    this.name = "SubscriberResourceNotFoundError";
  }
}
