"use client";

import { useFormState } from "react-dom";
import { Input, Textarea, Field } from "@/components/ui/Input";
import { Card, CardBody } from "@/components/ui/Card";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Alert } from "@/components/shared/states";
import { saveVendorProfileAction } from "@/lib/actions/profile";
import { EMPTY_FORM_STATE } from "@/lib/actions/form-state";

interface Category {
  id: string;
  name: string;
}

interface Defaults {
  businessName?: string;
  description?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  town?: string | null;
  state?: string | null;
  serviceAreaDescription?: string | null;
  serviceCategoryIds?: string[];
}

export function VendorProfileForm({
  categories,
  defaults = {},
}: {
  categories: Category[];
  defaults?: Defaults;
}) {
  const [state, formAction] = useFormState(saveVendorProfileAction, EMPTY_FORM_STATE);
  const err = state.fieldErrors ?? {};
  const selected = new Set(defaults.serviceCategoryIds ?? []);

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? <Alert tone="error">{state.error}</Alert> : null}

      <Card>
        <CardBody className="space-y-4">
          <Field label="Business name" htmlFor="businessName" required error={err.businessName}>
            <Input id="businessName" name="businessName" defaultValue={defaults.businessName} />
          </Field>
          <Field label="Business description" htmlFor="description" error={err.description}>
            <Textarea id="description" name="description" defaultValue={defaults.description ?? ""} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone" htmlFor="phone" error={err.phone}>
              <Input id="phone" name="phone" defaultValue={defaults.phone ?? ""} />
            </Field>
            <Field label="Contact email" htmlFor="email" error={err.email}>
              <Input id="email" name="email" type="email" defaultValue={defaults.email ?? ""} />
            </Field>
          </div>
          <Field label="Website" htmlFor="website" error={err.website}>
            <Input id="website" name="website" placeholder="https://" defaultValue={defaults.website ?? ""} />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Town" htmlFor="town" error={err.town}>
              <Input id="town" name="town" defaultValue={defaults.town ?? ""} />
            </Field>
            <Field label="State" htmlFor="state" error={err.state}>
              <Input id="state" name="state" defaultValue={defaults.state ?? ""} />
            </Field>
          </div>
          <Field label="Service area description" htmlFor="serviceAreaDescription" error={err.serviceAreaDescription}>
            <Textarea
              id="serviceAreaDescription"
              name="serviceAreaDescription"
              placeholder="e.g. Within 25 miles of downtown."
              defaultValue={defaults.serviceAreaDescription ?? ""}
            />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-3">
          <Field label="Service categories" hint="Select the services you offer." />
          <div className="grid gap-2 sm:grid-cols-2">
            {categories.map((c) => (
              <label
                key={c.id}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  name="serviceCategoryIds"
                  value={c.id}
                  defaultChecked={selected.has(c.id)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                {c.name}
              </label>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <SubmitButton pendingText="Saving…">Save profile</SubmitButton>
      </div>
    </form>
  );
}
