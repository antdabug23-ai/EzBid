"use client";

import { useFormState } from "react-dom";
import { Input, Field } from "@/components/ui/Input";
import { Card, CardBody } from "@/components/ui/Card";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Alert } from "@/components/shared/states";
import { saveCustomerProfileAction } from "@/lib/actions/profile";
import { EMPTY_FORM_STATE } from "@/lib/actions/form-state";

interface Defaults {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  town?: string | null;
  state?: string | null;
}

export function CustomerProfileForm({ defaults = {} }: { defaults?: Defaults }) {
  const [state, formAction] = useFormState(saveCustomerProfileAction, EMPTY_FORM_STATE);
  const err = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? <Alert tone="error">{state.error}</Alert> : null}
      <Card>
        <CardBody className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" htmlFor="firstName" required error={err.firstName}>
              <Input id="firstName" name="firstName" defaultValue={defaults.firstName} />
            </Field>
            <Field label="Last name" htmlFor="lastName" required error={err.lastName}>
              <Input id="lastName" name="lastName" defaultValue={defaults.lastName} />
            </Field>
          </div>
          <Field label="Phone" htmlFor="phone" error={err.phone}>
            <Input id="phone" name="phone" defaultValue={defaults.phone ?? ""} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Town" htmlFor="town" error={err.town}>
              <Input id="town" name="town" defaultValue={defaults.town ?? ""} />
            </Field>
            <Field label="State" htmlFor="state" error={err.state}>
              <Input id="state" name="state" defaultValue={defaults.state ?? ""} />
            </Field>
          </div>
        </CardBody>
      </Card>
      <div className="flex justify-end">
        <SubmitButton pendingText="Saving…">Save profile</SubmitButton>
      </div>
    </form>
  );
}
