"use client";

import { useFormState } from "react-dom";
import { Input, Textarea, Select, Field } from "@/components/ui/Input";
import { Card, CardBody } from "@/components/ui/Card";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Alert } from "@/components/shared/states";
import { createBidAction } from "@/lib/actions/bids";
import { EMPTY_FORM_STATE } from "@/lib/actions/form-state";
import { SERVICE_WINDOW_OPTIONS } from "@/lib/utils/labels";

export function BidForm({ jobId }: { jobId: string }) {
  const [state, formAction] = useFormState(createBidAction, EMPTY_FORM_STATE);
  const err = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="jobId" value={jobId} />
      {state.error ? <Alert tone="error">{state.error}</Alert> : null}

      <Card>
        <CardBody className="space-y-4">
          <Field label="Bid amount ($)" htmlFor="amount" required error={err.amount}>
            <Input id="amount" name="amount" type="number" min={1} placeholder="e.g. 350" />
          </Field>

          <Field label="Message to customer" htmlFor="description" error={err.description}>
            <Textarea
              id="description"
              name="description"
              placeholder="Explain what's included, your experience, and any assumptions."
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Earliest available date" htmlFor="earliestAvailableDate" error={err.earliestAvailableDate}>
              <Input id="earliestAvailableDate" name="earliestAvailableDate" type="date" />
            </Field>
            <Field label="Proposed service date" htmlFor="proposedServiceDate" error={err.proposedServiceDate}>
              <Input id="proposedServiceDate" name="proposedServiceDate" type="date" />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Proposed window" htmlFor="proposedServiceWindow">
              <Select id="proposedServiceWindow" name="proposedServiceWindow" defaultValue="FLEXIBLE">
                {SERVICE_WINDOW_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Estimated timeline" htmlFor="estimatedTimeline" error={err.estimatedTimeline}>
              <Input id="estimatedTimeline" name="estimatedTimeline" placeholder="e.g. Half a day" />
            </Field>
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <SubmitButton pendingText="Submitting…">Submit bid</SubmitButton>
      </div>
    </form>
  );
}
