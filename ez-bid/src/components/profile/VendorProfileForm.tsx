"use client";

import { useActionState } from "react";
import Link from "next/link";
import { updateVendorProfileAction } from "@/lib/actions/profile";
import { initialFormState } from "@/lib/actions/form-state";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/auth/SubmitButton";

const labelClass = "mb-1 block text-sm font-medium text-slate-700";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

export function VendorProfileForm({
  email,
  allServices,
  selectedServices,
  defaults,
}: {
  email: string;
  allServices: readonly string[];
  selectedServices: string[];
  defaults: {
    businessName: string;
    phone: string;
    town: string;
    state: string;
    description: string;
    serviceAreaDescription: string;
    website: string;
  };
}) {
  const [state, formAction] = useActionState(updateVendorProfileAction, initialFormState);
  const fe = state.fieldErrors;
  const v = state.values;

  const submittedServices = v?.services;
  const checkedSet = new Set(
    submittedServices !== undefined
      ? submittedServices.split(",").filter(Boolean)
      : selectedServices
  );

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

      <div>
        <label htmlFor="businessName" className={labelClass}>
          Business name
        </label>
        <Input
          id="businessName"
          name="businessName"
          required
          defaultValue={v?.businessName ?? defaults.businessName}
        />
        <FieldError message={fe?.businessName?.[0]} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <Input id="email" name="email" type="email" value={email} readOnly disabled />
        <p className="mt-1 text-xs text-slate-400">Email cannot be changed right now.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-slate-400">(optional)</span>
          </label>
          <Input id="phone" name="phone" type="tel" defaultValue={v?.phone ?? defaults.phone} />
          <FieldError message={fe?.phone?.[0]} />
        </div>
        <div>
          <label htmlFor="website" className={labelClass}>
            Website <span className="text-slate-400">(optional)</span>
          </label>
          <Input
            id="website"
            name="website"
            type="url"
            placeholder="https://"
            defaultValue={v?.website ?? defaults.website}
          />
          <FieldError message={fe?.website?.[0]} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="town" className={labelClass}>
            General service town / city <span className="text-slate-400">(optional)</span>
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

      <div>
        <label htmlFor="serviceAreaDescription" className={labelClass}>
          Service area <span className="text-slate-400">(optional)</span>
        </label>
        <Input
          id="serviceAreaDescription"
          name="serviceAreaDescription"
          placeholder="e.g. Within 25 miles of downtown"
          defaultValue={v?.serviceAreaDescription ?? defaults.serviceAreaDescription}
        />
        <FieldError message={fe?.serviceAreaDescription?.[0]} />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Business description <span className="text-slate-400">(optional)</span>
        </label>
        <Textarea
          id="description"
          name="description"
          placeholder="Tell customers about your work, experience, and what makes your business great."
          defaultValue={v?.description ?? defaults.description}
        />
        <FieldError message={fe?.description?.[0]} />
      </div>

      <div>
        <span className={labelClass}>Services offered</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {allServices.map((name) => (
            <label
              key={name}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700"
            >
              <input
                type="checkbox"
                name="services"
                value={name}
                defaultChecked={checkedSet.has(name)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              {name}
            </label>
          ))}
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Selected services appear on your public vendor profile.
        </p>
      </div>

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
