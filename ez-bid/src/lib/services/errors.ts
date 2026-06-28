export class ServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServiceError";
  }
}

/** Thrown when AUTH_SECRET is missing or invalid. Mapped to a safe user message in form actions. */
export class AuthConfigurationError extends Error {
  constructor() {
    super("AUTH configuration invalid");
    this.name = "AuthConfigurationError";
  }
}

export const DUPLICATE_EMAIL_MESSAGE = "An account with that email already exists";
export const UNABLE_TO_CREATE_ACCOUNT = "Unable to create account right now";
export const UNABLE_TO_SIGN_IN = "Unable to sign in right now";

export class AuthorizationError extends ServiceError {
  constructor(message = "You are not allowed to do that.") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends ServiceError {
  constructor(message = "Not found.") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends ServiceError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
