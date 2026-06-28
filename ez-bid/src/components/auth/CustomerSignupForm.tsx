"use client";

import { useActionState } from "react";
import Link from "next/link";
import { customerSignupAction } from "@/lib/actions/auth";
import { initialFormState } from "@/lib/actions/form-state";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./SubmitButton";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

export function CustomerSignupForm() {
  const [state, formAction] = useActionState(customerSignupAction, initialFormState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-slate-700">
            First name
          </label>
          <Input id="firstName" name="firstName" required />
          <FieldError message={state.fieldErrors?.firstName?.[0]} />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-slate-700">
            Last name
          </label>
          <Input id="lastName" name="lastName" required />
          <FieldError message={state.fieldErrors?.lastName?.[0]} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
          Email
        </label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
        <FieldError message={state.fieldErrors?.email?.[0]} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <Input id="password" name="password" type="password" autoComplete="new-password" required />
          <FieldError message={state.fieldErrors?.password?.[0]} />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-700">
            Confirm password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
          />
          <FieldError message={state.fieldErrors?.confirmPassword?.[0]} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
            Phone <span className="text-slate-400">(optional)</span>
          </label>
          <Input id="phone" name="phone" type="tel" />
        </div>
        <div>
          <label htmlFor="town" className="mb-1 block text-sm font-medium text-slate-700">
            Town <span className="text-slate-400">(optional)</span>
          </label>
          <Input id="town" name="town" />
        </div>
        <div>
          <label htmlFor="state" className="mb-1 block text-sm font-medium text-slate-700">
            State <span className="text-slate-400">(optional)</span>
          </label>
          <Input id="state" name="state" />
        </div>
      </div>

      <SubmitButton pendingText="Creating account…">Create customer account</SubmitButton>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
