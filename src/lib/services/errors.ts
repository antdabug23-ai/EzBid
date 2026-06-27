/** Domain error thrown by services. Carries a user-safe message. */
export class ServiceError extends Error {
  code: string;
  constructor(message: string, code = "SERVICE_ERROR") {
    super(message);
    this.name = "ServiceError";
    this.code = code;
  }
}

export class AuthorizationError extends ServiceError {
  constructor(message = "You are not allowed to do that.") {
    super(message, "FORBIDDEN");
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends ServiceError {
  constructor(message = "Not found.") {
    super(message, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class ValidationError extends ServiceError {
  constructor(message = "Invalid input.") {
    super(message, "VALIDATION");
    this.name = "ValidationError";
  }
}
