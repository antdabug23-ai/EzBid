"use server";

import { redirect } from "next/navigation";
import {
  loginSchema,
  customerSignupSchema,
  vendorSignupSchema,
} from "@/lib/validations/auth";
import { authenticate, registerCustomer, registerVendor } from "@/lib/services/auth";
import { createSession, destroySession } from "@/lib/auth/session";
import { dashboardPathForRole } from "@/lib/auth/current-user";
import { type FormState, toErrorState } from "./form-state";

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  let redirectTo: string | null = null;
  try {
    const parsed = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const user = await authenticate(parsed.email, parsed.password);
    if (!user) return { ok: false, error: "Invalid email or password." };
    await createSession({ userId: user.id, role: user.role });
    redirectTo = dashboardPathForRole(user.role);
  } catch (err) {
    return toErrorState(err);
  }
  if (redirectTo) redirect(redirectTo);
  return { ok: false, error: "Something went wrong. Please try again." };
}

export async function customerSignupAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const parsed = customerSignupSchema.parse(Object.fromEntries(formData));
    const user = await registerCustomer(parsed);
    await createSession({ userId: user.id, role: user.role });
  } catch (err) {
    return toErrorState(err);
  }
  redirect("/customer/dashboard");
}

export async function vendorSignupAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const parsed = vendorSignupSchema.parse(Object.fromEntries(formData));
    const user = await registerVendor(parsed);
    await createSession({ userId: user.id, role: user.role });
  } catch (err) {
    return toErrorState(err);
  }
  redirect("/vendor/dashboard");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}
