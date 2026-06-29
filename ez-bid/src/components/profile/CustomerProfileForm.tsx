"use client";

import { useActionState } from "react";
import Link from "next/link";
import { updateCustomerProfileAction } from "@/lib/actions/profile";
import { initialFormState } from "@/lib/actions/form-state";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/auth/SubmitButton";

const labelClass = "mb-1 block text-sm font-medium text-slate-700";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

export function CustomerProfileForm({
  email,
  defaults,
}: {
  email: string;
  defaults: {
    firstName: string;
    lastName: string;
    phone: string;
    town: string;
    state: string;
  };
}) {
  const [state, formAction] = useActionState(updateCustomerProfileAction, initialFormState);
  const fe = state.fieldErrors;
  const v = state.values;

  return (
    <form action={formAction} className="space-y-5">
      {state.ok && state.message ? (
        <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {state.message}
        </div>
      ) : null}
      {state.error ? (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First name
          </label>
          <Input
            id="firstName"
            name="firstName"
            required
            defaultValue={v?.firstName ?? defaults.firstName}
          />
          <FieldError message={fe?.firstName?.[0]} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last name
          </label>
          <Input
            id="lastName"
            name="lastName"
            required
            defaultValue={v?.lastName ?? defaults.lastName}
          />
          <FieldError message={fe?.lastName?.[0]} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <Input id="email" name="email" type="email" value={email} readOnly disabled />
        <p className="mt-1 text-xs text-slate-400">Email cannot be changed right now.</p>
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone <span className="text-slate-400">(optional)</span>
        </label>
        <Input id="phone" name="phone" type="tel" defaultValue={v?.phone ?? defaults.phone} />
        <FieldError message={fe?.phone?.[0]} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="town" className={labelClass}>
            General town / city <span className="text-slate-400">(optional)</span>
          </label>
          <Input id="town" name="town" defaultValue={v?.town ?? defaults.town} />
          <FieldError message={fe?.town?.[0]} />
        </div>
        <div>
          <label htmlFor="state" className={labelClass}>
            State <span className="text-slate-400">(optional)</span>
          </label>
          <Input id="state" name="state" defaultValue={v?.state ?? defaults.state} />
          <FieldError message={fe?.state?.[0]} />
        </div>
      </div>

      <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
        Your saved general location is used to make posting jobs faster. Only your approximate
        location (town and state) is shared during bidding — your exact address stays private.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton pendingText="Saving…">Save changes</SubmitButton>
        <Link
          href="/account/password"
          className="text-center text-sm font-medium text-blue-600 hover:underline"
        >
          Change Password
        </Link>
      </div>
    </form>
  );
}
