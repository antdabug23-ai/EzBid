"use client";

import { useFormState } from "react-dom";
import { Input, Field } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Alert } from "@/components/shared/states";
import { loginAction } from "@/lib/actions/auth";
import { EMPTY_FORM_STATE } from "@/lib/actions/form-state";

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, EMPTY_FORM_STATE);
  const err = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? <Alert tone="error">{state.error}</Alert> : null}
      <Field label="Email" htmlFor="email" required error={err.email}>
        <Input id="email" name="email" type="email" autoComplete="email" />
      </Field>
      <Field label="Password" htmlFor="password" required error={err.password}>
        <Input id="password" name="password" type="password" autoComplete="current-password" />
      </Field>
      <SubmitButton className="w-full" pendingText="Signing in…">
        Log in
      </SubmitButton>
    </form>
  );
}
