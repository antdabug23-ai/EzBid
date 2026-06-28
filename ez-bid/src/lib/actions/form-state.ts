import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { AuthConfigurationError, ServiceError, DUPLICATE_EMAIL_MESSAGE, UNABLE_TO_CREATE_ACCOUNT, UNABLE_TO_SIGN_IN } from "@/lib/services/errors";

export interface FormState {
  ok: boolean;
  error?: string;
  message?: string;
  fieldErrors?: Record<string, string[]>;
}

export const initialFormState: FormState = { ok: false };

export { DUPLICATE_EMAIL_MESSAGE, UNABLE_TO_CREATE_ACCOUNT, UNABLE_TO_SIGN_IN } from "@/lib/services/errors";

function isNextRedirect(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "digest" in err &&
    typeof (err as { digest: string }).digest === "string" &&
    (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

function firstLine(message: string): string {
  return message.split("\n")[0]?.trim() ?? message;
}

export function logAuthError(context: string, err: unknown): void {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(`[auth:${context}]`, err.name, err.code, firstLine(err.message));
    return;
  }
  if (err instanceof Error) {
    console.error(`[auth:${context}]`, err.name, firstLine(err.message));
    return;
  }
  console.error(`[auth:${context}]`, "UnknownError");
}

function isDuplicateEmailError(err: Prisma.PrismaClientKnownRequestError): boolean {
  const target = err.meta?.target;
  if (Array.isArray(target)) {
    return target.some((field) => String(field).toLowerCase() === "email");
  }
  return err.message.toLowerCase().includes("email");
}

function unableMessage(context: string): string {
  return context.includes("login") ? UNABLE_TO_SIGN_IN : UNABLE_TO_CREATE_ACCOUNT;
}

export function zodToFieldErrors(error: ZodError): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path[0]?.toString() ?? "_form";
    if (!out[key]) out[key] = [];
    out[key].push(issue.message);
  }
  return out;
}

export function toErrorState(
  err: unknown,
  context = "form",
  fallbackMessage?: string
): FormState {
  if (isNextRedirect(err)) throw err;

  logAuthError(context, err);

  const unable = fallbackMessage ?? unableMessage(context);

  if (err instanceof ZodError) {
    const fieldErrors = zodToFieldErrors(err);
    const firstMessage = err.issues[0]?.message;
    return {
      ok: false,
      fieldErrors,
      ...(firstMessage ? { error: firstMessage } : {}),
    };
  }

  if (err instanceof ServiceError) {
    return { ok: false, error: err.message };
  }

  if (err instanceof AuthConfigurationError) {
    return { ok: false, error: unable };
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002" && isDuplicateEmailError(err)) {
      return { ok: false, error: DUPLICATE_EMAIL_MESSAGE };
    }
    return { ok: false, error: unable };
  }

  if (
    err instanceof Prisma.PrismaClientInitializationError ||
    err instanceof Prisma.PrismaClientRustPanicError ||
    err instanceof Prisma.PrismaClientValidationError
  ) {
    return { ok: false, error: unable };
  }

  return { ok: false, error: unable };
}
