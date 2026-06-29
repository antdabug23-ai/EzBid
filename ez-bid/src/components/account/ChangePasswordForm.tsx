"use client";

import { useActionState } from "react";
import { changePasswordAction } from "@/lib/actions/profile";
import { initialFormState } from "@/lib/actions/form-state";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/auth/SubmitButton";

const labelClass = "mb-1 block text-sm font-medium text-slate-700";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

export function ChangePasswordForm() {
  const [state, formAction] = useActionState(changePasswordAction, initialFormState);
  const fe = state.fieldErrors;

  return (
    // No defaultValue on any field: password values are never preserved.
    <form action={formAction} className="space-y-5">
      {state.ok && state.message ? (
        <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {state.message}
        </div>
      ) : null}
      {state.error ? (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</div>
      ) : null}

      <div>
        <label htmlFor="currentPassword" className={labelClass}>
          Current password
        </label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
        />
        <FieldError message={fe?.currentPassword?.[0]} />
      </div>

      <div>
        <label htmlFor="newPassword" className={labelClass}>
          New password
        </label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
        />
        <FieldError message={fe?.newPassword?.[0]} />
      </div>

      <div>
        <label htmlFor="confirmPassword" className={labelClass}>
          Confirm new password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
        />
        <FieldError message={fe?.confirmPassword?.[0]} />
      </div>

      <p className="text-xs text-slate-400">New password must be at least 8 characters.</p>

      <SubmitButton pendingText="Updating…">Update password</SubmitButton>
    </form>
  );
}
