"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Textarea, Field } from "@/components/ui/Input";
import { Card, CardBody } from "@/components/ui/Card";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Alert } from "@/components/shared/states";
import { createReviewAction } from "@/lib/actions/reviews";
import { EMPTY_FORM_STATE } from "@/lib/actions/form-state";
import { cn } from "@/lib/utils/cn";

function StarInput({
  name,
  label,
  required,
  defaultValue = 0,
}: {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: number;
}) {
  const [value, setValue] = useState(defaultValue);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="ml-0.5 text-red-500">*</span> : null}
      </span>
      <input type="hidden" name={name} value={value || ""} />
      <div className="flex" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setValue(i)}
            onMouseEnter={() => setHover(i)}
            className={cn(
              "px-0.5 text-2xl leading-none transition-colors",
              i <= (hover || value) ? "text-amber-400" : "text-slate-300"
            )}
            aria-label={`${i} star${i > 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}

export function ReviewForm({ jobId }: { jobId: string }) {
  const [state, formAction] = useFormState(createReviewAction, EMPTY_FORM_STATE);
  const err = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="jobId" value={jobId} />
      {state.error ? <Alert tone="error">{state.error}</Alert> : null}

      <Card>
        <CardBody className="space-y-4">
          <StarInput name="overallRating" label="Overall rating" required />
          {err.overallRating ? <p className="text-xs text-red-600">{err.overallRating}</p> : null}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <StarInput name="qualityRating" label="Quality of work" />
            <StarInput name="communicationRating" label="Communication" />
            <StarInput name="timelinessRating" label="Timeliness" />
            <StarInput name="professionalismRating" label="Professionalism" />
          </div>

          <Field label="Written review" htmlFor="writtenReview" error={err.writtenReview}>
            <Textarea id="writtenReview" name="writtenReview" placeholder="Share details about your experience." />
          </Field>
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <SubmitButton pendingText="Submitting…">Submit review</SubmitButton>
      </div>
    </form>
  );
}
