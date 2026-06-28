"use server";

import { redirect } from "next/navigation";
import {
  customerSignupFromFormData,
  vendorSignupFromFormData,
  loginFromFormData,
} from "@/lib/validations/auth";
import { authenticate, registerCustomer, registerVendor } from "@/lib/services/auth";
import { createSession, destroySession } from "@/lib/auth/session";
import { dashboardPathForRole } from "@/lib/auth/current-user";
import { type FormState, toErrorState, UNABLE_TO_SIGN_IN } from "./form-state";
import { ZodError } from "zod";

function logSignupStep(step: string, detail?: string) {
  console.info(`[auth:customerSignup] ${step}${detail ? `: ${detail}` : ""}`);
}

function formDataKeys(formData: FormData): string {
  return Array.from(formData.keys()).join(", ");
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  let redirectTo: string | null = null;
  try {
    const parsed = loginFromFormData(formData);
    const user = await authenticate(parsed.email, parsed.password);
    if (!user) return { ok: false, error: "Invalid email or password." };
    await createSession({ userId: user.id, role: user.role });
    redirectTo = dashboardPathForRole(user.role);
  } catch (err) {
    return toErrorState(err, "login");
  }
  if (redirectTo) redirect(redirectTo);
  return { ok: false, error: UNABLE_TO_SIGN_IN };
}

export async function customerSignupAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  logSignupStep("signup action started");

  if (!(formData instanceof FormData)) {
    console.error("[auth:customerSignup] invalid formData type", typeof formData);
    return toErrorState(new Error("Invalid form submission"), "customerSignup");
  }

  logSignupStep("form data received keys", formDataKeys(formData));

  try {
    let parsed;
    try {
      parsed = customerSignupFromFormData(formData);
      logSignupStep("validation passed");
    } catch (err) {
      if (err instanceof ZodError) {
        logSignupStep("validation failed", err.issues[0]?.path.join(".") || "unknown");
      }
      throw err;
    }

    logSignupStep("register customer started");
    const user = await registerCustomer(parsed, {
      onEmailCheckStarted: () => logSignupStep("prisma email check started"),
      onEmailCheckPassed: () => logSignupStep("prisma email check passed"),
      onPasswordHashStarted: () => logSignupStep("password hash started"),
      onPasswordHashPassed: () => logSignupStep("password hash passed"),
      onCreateStarted: () => logSignupStep("prisma create started"),
      onCreatePassed: () => logSignupStep("prisma create passed"),
      onCreateFailed: (name, code) =>
        logSignupStep("prisma create failed", `${name}${code ? ` ${code}` : ""}`),
    });
    logSignupStep("register customer passed", user.id);

    logSignupStep("session creation started");
    await createSession({ userId: user.id, role: user.role });
    logSignupStep("session creation passed");
  } catch (err) {
    if (err instanceof Error && err.name === "AuthConfigurationError") {
      logSignupStep("session creation failed", err.name);
    }
    return toErrorState(err, "customerSignup");
  }

  logSignupStep("redirect started");
  redirect("/customer/dashboard");
}

export async function vendorSignupAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  if (!(formData instanceof FormData)) {
    return toErrorState(new Error("Invalid form submission"), "vendorSignup");
  }

  try {
    const parsed = vendorSignupFromFormData(formData);
    const user = await registerVendor(parsed);
    await createSession({ userId: user.id, role: user.role });
  } catch (err) {
    return toErrorState(err, "vendorSignup");
  }
  redirect("/vendor/dashboard");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}
