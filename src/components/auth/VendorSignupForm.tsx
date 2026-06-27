"use client";

import { useFormState } from "react-dom";
import { Input, Field } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Alert } from "@/components/shared/states";
import { vendorSignupAction } from "@/lib/actions/auth";
import { EMPTY_FORM_STATE } from "@/lib/actions/form-state";

export function VendorSignupForm() {
  const [state, formAction] = useFormState(vendorSignupAction, EMPTY_FORM_STATE);
  const err = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? <Alert tone="error">{state.error}</Alert> : null}
      <Field label="Business name" htmlFor="businessName" required error={err.businessName}>
        <Input id="businessName" name="businessName" />
      </Field>
      <Field label="Email" htmlFor="email" required error={err.email}>
        <Input id="email" name="email" type="email" autoComplete="email" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Password" htmlFor="password" required error={err.password}>
          <Input id="password" name="password" type="password" autoComplete="new-password" />
        </Field>
        <Field label="Confirm password" htmlFor="confirmPassword" required error={err.confirmPassword}>
          <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" />
        </Field>
      </div>
      <Field label="Phone" htmlFor="phone" error={err.phone}>
        <Input id="phone" name="phone" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Town" htmlFor="town" error={err.town}>
          <Input id="town" name="town" />
        </Field>
        <Field label="State" htmlFor="state" error={err.state}>
          <Input id="state" name="state" />
        </Field>
      </div>
      <SubmitButton className="w-full" pendingText="Creating account…">
        Create vendor account
      </SubmitButton>
    </form>
  );
}
