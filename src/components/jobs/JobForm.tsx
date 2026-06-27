"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Input, Textarea, Select, Field } from "@/components/ui/Input";
import { Card, CardBody } from "@/components/ui/Card";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { FileUpload } from "@/components/ui/FileUpload";
import { Alert } from "@/components/shared/states";
import { EMPTY_FORM_STATE, type FormState } from "@/lib/actions/form-state";
import { SERVICE_WINDOW_OPTIONS, URGENCY_OPTIONS } from "@/lib/utils/labels";

interface Category {
  id: string;
  name: string;
}

export interface JobFormDefaults {
  serviceCategoryId?: string;
  title?: string;
  description?: string;
  town?: string;
  state?: string;
  exactAddress?: string;
  budgetMin?: number | null;
  budgetMax?: number | null;
  requestedServiceDate?: string | null;
  preferredServiceWindow?: string;
  isDateFlexible?: boolean;
  urgencyLevel?: string;
}

interface JobFormProps {
  categories: Category[];
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  defaults?: JobFormDefaults;
  jobId?: string;
  submitLabel?: string;
}

export function JobForm({ categories, action, defaults = {}, jobId, submitLabel = "Post job" }: JobFormProps) {
  const [state, formAction] = useFormState(action, EMPTY_FORM_STATE);
  const [photos, setPhotos] = useState<string[]>([]);
  const err = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      {jobId ? <input type="hidden" name="jobId" value={jobId} /> : null}
      {photos.map((url) => (
        <input key={url} type="hidden" name="photoUrls" value={url} />
      ))}

      {state.error ? <Alert tone="error">{state.error}</Alert> : null}

      <Card>
        <CardBody className="space-y-4">
          <Field label="Service category" htmlFor="serviceCategoryId" required error={err.serviceCategoryId}>
            <Select id="serviceCategoryId" name="serviceCategoryId" defaultValue={defaults.serviceCategoryId ?? ""}>
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Job title" htmlFor="title" required error={err.title}>
            <Input id="title" name="title" defaultValue={defaults.title} placeholder="e.g. Weekly lawn mowing" />
          </Field>

          <Field label="Description" htmlFor="description" required error={err.description}>
            <Textarea
              id="description"
              name="description"
              defaultValue={defaults.description}
              placeholder="Describe the work, access details, and anything vendors should know."
            />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Town" htmlFor="town" required error={err.town}>
              <Input id="town" name="town" defaultValue={defaults.town} />
            </Field>
            <Field label="State" htmlFor="state" required error={err.state}>
              <Input id="state" name="state" defaultValue={defaults.state} />
            </Field>
          </div>
          <Field
            label="Exact street address"
            htmlFor="exactAddress"
            required
            error={err.exactAddress}
            hint="Stored privately. Vendors only see town & state until you accept a bid."
          >
            <Input id="exactAddress" name="exactAddress" defaultValue={defaults.exactAddress} />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Budget min ($)" htmlFor="budgetMin" error={err.budgetMin}>
              <Input id="budgetMin" name="budgetMin" type="number" min={0} defaultValue={defaults.budgetMin ?? ""} />
            </Field>
            <Field label="Budget max ($)" htmlFor="budgetMax" error={err.budgetMax}>
              <Input id="budgetMax" name="budgetMax" type="number" min={0} defaultValue={defaults.budgetMax ?? ""} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Requested service date" htmlFor="requestedServiceDate" error={err.requestedServiceDate}>
              <Input
                id="requestedServiceDate"
                name="requestedServiceDate"
                type="date"
                defaultValue={defaults.requestedServiceDate ?? ""}
              />
            </Field>
            <Field label="Preferred window" htmlFor="preferredServiceWindow">
              <Select
                id="preferredServiceWindow"
                name="preferredServiceWindow"
                defaultValue={defaults.preferredServiceWindow ?? "FLEXIBLE"}
              >
                {SERVICE_WINDOW_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Urgency" htmlFor="urgencyLevel">
              <Select id="urgencyLevel" name="urgencyLevel" defaultValue={defaults.urgencyLevel ?? "NORMAL"}>
                {URGENCY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Date flexibility">
              <label className="flex h-10 items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="isDateFlexible"
                  value="true"
                  defaultChecked={defaults.isDateFlexible ?? true}
                  className="h-4 w-4 rounded border-slate-300"
                />
                My date is flexible
              </label>
            </Field>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-3">
          <Field label="Job photos" hint="JPG, PNG, WEBP or GIF up to 5 MB each.">
            <FileUpload kind="image" multiple value={photos} onChange={setPhotos} label="Add photos" />
          </Field>
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <SubmitButton pendingText="Saving…">{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}
