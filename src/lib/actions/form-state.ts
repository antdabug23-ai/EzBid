import { z } from "zod";
import { ServiceError } from "@/lib/services/errors";

export interface FormState {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  /** Optional success message. */
  message?: string;
}

export const EMPTY_FORM_STATE: FormState = { ok: false };

/** Turn a ZodError into flat field errors for the UI. */
export function zodToFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/** Wrap a service call so domain errors become safe FormState messages. */
export function toErrorState(err: unknown): FormState {
  if (err instanceof z.ZodError) {
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors: zodToFieldErrors(err) };
  }
  if (err instanceof ServiceError) {
    return { ok: false, error: err.message };
  }
  console.error(err);
  return { ok: false, error: "Something went wrong. Please try again." };
}
