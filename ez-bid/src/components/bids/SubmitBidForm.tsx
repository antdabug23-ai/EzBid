"use client";

import { useActionState } from "react";
import { submitBidAction } from "@/lib/actions/bid";
import { initialFormState } from "@/lib/actions/form-state";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/auth/SubmitButton";

const labelClass = "mb-1 block text-sm font-medium text-slate-700";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

function toDateInput(value: Date | string | null | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export interface BidDefaults {
  amount?: string;
  startDate?: string;
  timeline?: string;
  message?: string;
  notes?: string;
}

export function SubmitBidForm({
  jobId,
  isUpdate = false,
  defaults,
}: {
  jobId: string;
  isUpdate?: boolean;
  defaults?: BidDefaults;
}) {
  const action = submitBidAction.bind(null, jobId);
  const [state, formAction] = useActionState(action, initialFormState);
  const fe = state.fieldErrors;
  const v = state.values;

  const val = (key: keyof BidDefaults) => v?.[key] ?? defaults?.[key] ?? "";

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</div>
      ) : null}

      <div>
        <label htmlFor="amount" className={labelClass}>
          Bid amount (USD)
        </label>
        <Input
          id="amount"
          name="amount"
          inputMode="numeric"
          placeholder="e.g. 350"
          required
          defaultValue={val("amount")}
        />
        <FieldError message={fe?.amount?.[0]} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className={labelClass}>
            Estimated start date
          </label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            required
            defaultValue={toDateInput(val("startDate"))}
          />
          <FieldError message={fe?.startDate?.[0]} />
        </div>
        <div>
          <label htmlFor="timeline" className={labelClass}>
            Estimated completion time
          </label>
          <Input
            id="timeline"
            name="timeline"
            placeholder="e.g. About 2 days"
            required
            defaultValue={val("timeline")}
          />
          <FieldError message={fe?.timeline?.[0]} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message to customer
        </label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Introduce your business and explain your bid."
          defaultValue={val("message")}
        />
        <FieldError message={fe?.message?.[0]} />
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Additional notes <span className="text-slate-400">(optional)</span>
        </label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Anything else the customer should know."
          defaultValue={val("notes")}
        />
        <FieldError message={fe?.notes?.[0]} />
      </div>

      <SubmitButton pendingText={isUpdate ? "Updating bid…" : "Submitting bid…"}>
        {isUpdate ? "Update Bid" : "Submit Bid"}
      </SubmitButton>
    </form>
  );
}
