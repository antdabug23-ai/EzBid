"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/lib/actions/auth";
import { initialFormState } from "@/lib/actions/form-state";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./SubmitButton";

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialFormState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
          Email
        </label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
        {state.fieldErrors?.email ? (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.email[0]}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        {state.fieldErrors?.password ? (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.password[0]}</p>
        ) : null}
      </div>

      <SubmitButton pendingText="Signing in…">Log in</SubmitButton>

      <p className="text-center text-sm text-slate-500">
        Need an account?{" "}
        <Link href="/signup/customer" className="font-medium text-blue-600 hover:underline">
          Sign up as a customer
        </Link>{" "}
        or{" "}
        <Link href="/signup/vendor" className="font-medium text-blue-600 hover:underline">
          join as a vendor
        </Link>
        .
      </p>
    </form>
  );
}
