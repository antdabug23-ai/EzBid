import { ZodError } from "zod";
import { ServiceError } from "@/lib/services/errors";

export interface FormState {
  ok: boolean;
  error?: string;
  message?: string;
  fieldErrors?: Record<string, string[]>;
}

export const initialFormState: FormState = { ok: false };

export function zodToFieldErrors(error: ZodError): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path[0]?.toString() ?? "_form";
    if (!out[key]) out[key] = [];
    out[key].push(issue.message);
  }
  return out;
}

export function toErrorState(err: unknown): FormState {
  if (err instanceof ZodError) {
    return { ok: false, fieldErrors: zodToFieldErrors(err) };
  }
  if (err instanceof ServiceError) {
    return { ok: false, error: err.message };
  }
  return { ok: false, error: "Something went wrong. Please try again." };
}
