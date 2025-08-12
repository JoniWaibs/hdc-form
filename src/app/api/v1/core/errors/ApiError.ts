export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 400,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }

  static badRequest(message: string, code = "BAD_REQUEST", details?: unknown) {
    return new ApiError(code, message, 400, details);
  }

  static unauthorized(
    message: string,
    code = "UNAUTHORIZED",
    details?: unknown,
  ) {
    return new ApiError(code, message, 401, details);
  }

  static forbidden(message: string, code = "FORBIDDEN", details?: unknown) {
    return new ApiError(code, message, 403, details);
  }

  static notFound(message: string, code = "NOT_FOUND", details?: unknown) {
    return new ApiError(code, message, 404, details);
  }

  static conflict(message: string, code = "CONFLICT", details?: unknown) {
    return new ApiError(code, message, 409, details);
  }

  static internal(message: string, code = "INTERNAL_ERROR", details?: unknown) {
    return new ApiError(code, message, 500, details);
  }

  static notificationError(
    message: string,
    code = "NOTIFICATION_ERROR",
    details?: unknown,
  ) {
    return new ApiError(code, message, 500, details);
  }
}
