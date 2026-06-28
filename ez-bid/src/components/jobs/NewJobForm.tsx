"use client";

import { useActionState } from "react";
import { createJobAction } from "@/lib/actions/job";
import { initialFormState } from "@/lib/actions/form-state";
import {
  SERVICE_CATEGORIES,
  URGENCY_OPTIONS,
  BUDGET_OPTIONS,
} from "@/lib/validations/job";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/auth/SubmitButton";

const selectClass =
  "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
const labelClass = "mb-1 block text-sm font-medium text-slate-700";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

export function NewJobForm({
  defaultTown = "",
  defaultState = "",
}: {
  defaultTown?: string;
  defaultState?: string;
}) {
  const [state, formAction] = useActionState(createJobAction, initialFormState);
  const fe = state.fieldErrors;

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</div>
      ) : null}

      <div>
        <label htmlFor="title" className={labelClass}>
          Job title
        </label>
        <Input id="title" name="title" required placeholder="e.g. Mow front and back lawn" />
        <FieldError message={fe?.title?.[0]} />
      </div>

      <div>
        <label htmlFor="serviceCategory" className={labelClass}>
          Service category
        </label>
        <select id="serviceCategory" name="serviceCategory" required defaultValue="" className={selectClass}>
          <option value="" disabled>
            Select a category
          </option>
          {SERVICE_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <FieldError message={fe?.serviceCategory?.[0]} />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Job description
        </label>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Describe what you need done, any details that help vendors give an accurate bid."
        />
        <FieldError message={fe?.description?.[0]} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="town" className={labelClass}>
            Town
          </label>
          <Input id="town" name="town" required defaultValue={defaultTown} />
          <FieldError message={fe?.town?.[0]} />
        </div>
        <div>
          <label htmlFor="state" className={labelClass}>
            State
          </label>
          <Input id="state" name="state" required defaultValue={defaultState} />
          <FieldError message={fe?.state?.[0]} />
        </div>
      </div>

      <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
        Only your approximate location is shared during bidding. Your exact address stays private
        until you select a vendor and the vendor confirms the job.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="serviceDate" className={labelClass}>
            Desired / earliest service date
          </label>
          <Input id="serviceDate" name="serviceDate" type="date" required />
          <FieldError message={fe?.serviceDate?.[0]} />
        </div>
        <div>
          <label htmlFor="urgency" className={labelClass}>
            Urgency
          </label>
          <select id="urgency" name="urgency" required defaultValue="" className={selectClass}>
            <option value="" disabled>
              Select urgency
            </option>
            {URGENCY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <FieldError message={fe?.urgency?.[0]} />
        </div>
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>
          Budget range
        </label>
        <select id="budget" name="budget" required defaultValue="" className={selectClass}>
          <option value="" disabled>
            Select a budget range
          </option>
          {BUDGET_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <FieldError message={fe?.budget?.[0]} />
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Additional notes <span className="text-slate-400">(optional)</span>
        </label>
        <Textarea id="notes" name="notes" placeholder="Anything else vendors should know." />
        <FieldError message={fe?.notes?.[0]} />
      </div>

      <div>
        <label className={labelClass}>
          Photos <span className="text-slate-400">(optional)</span>
        </label>
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-4 text-center text-xs text-slate-500">
          Photo uploads are coming soon.
        </div>
      </div>

      <SubmitButton pendingText="Posting job…">Post Job</SubmitButton>
    </form>
  );
}
