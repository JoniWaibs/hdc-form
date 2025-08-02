export class NotificationError extends Error {
  public readonly status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
    this.name = "NotificationError";
  }
}
