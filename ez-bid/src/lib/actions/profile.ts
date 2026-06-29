"use server";

import { revalidatePath } from "next/cache";
import { requireCustomer, requireVendor, requireUser } from "@/lib/auth/current-user";
import {
  customerProfileFromFormData,
  vendorProfileFromFormData,
  changePasswordFromFormData,
} from "@/lib/validations/profile";
import { SERVICE_CATEGORIES } from "@/lib/validations/job";
import {
  updateCustomerProfile,
  updateVendorProfile,
  changeUserPassword,
} from "@/lib/services/profile";
import { type FormState, toErrorState } from "./form-state";

const PROFILE_SAVED = "Profile updated successfully.";
const PASSWORD_SAVED = "Password updated successfully.";
const UNABLE_PROFILE = "Unable to update profile right now.";
const UNABLE_PASSWORD = "Unable to update password right now.";

function strVal(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v : "";
}

export async function updateCustomerProfileAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const { user } = await requireCustomer();
  try {
    const parsed = customerProfileFromFormData(formData);
    await updateCustomerProfile(user.id, parsed);
  } catch (err) {
    return {
      ...toErrorState(err, "customerProfile", UNABLE_PROFILE),
      values: {
        firstName: strVal(formData, "firstName"),
        lastName: strVal(formData, "lastName"),
        phone: strVal(formData, "phone"),
        town: strVal(formData, "town"),
        state: strVal(formData, "state"),
      },
    };
  }
  revalidatePath("/customer/dashboard");
  return { ok: true, message: PROFILE_SAVED };
}

export async function updateVendorProfileAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const { user } = await requireVendor();

  const selectedServices = formData
    .getAll("services")
    .map((s) => String(s))
    .filter((s) => (SERVICE_CATEGORIES as readonly string[]).includes(s));

  try {
    const parsed = vendorProfileFromFormData(formData);
    await updateVendorProfile(user.id, parsed, selectedServices);
  } catch (err) {
    return {
      ...toErrorState(err, "vendorProfile", UNABLE_PROFILE),
      values: {
        businessName: strVal(formData, "businessName"),
        phone: strVal(formData, "phone"),
        town: strVal(formData, "town"),
        state: strVal(formData, "state"),
        description: strVal(formData, "description"),
        serviceAreaDescription: strVal(formData, "serviceAreaDescription"),
        website: strVal(formData, "website"),
        services: selectedServices.join(","),
      },
    };
  }
  revalidatePath("/vendor/dashboard");
  return { ok: true, message: PROFILE_SAVED };
}

export async function changePasswordAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const user = await requireUser();
  try {
    const parsed = changePasswordFromFormData(formData);
    await changeUserPassword(user.id, parsed.currentPassword, parsed.newPassword);
  } catch (err) {
    // Never echo any password values back to the client.
    return toErrorState(err, "changePassword", UNABLE_PASSWORD);
  }
  return { ok: true, message: PASSWORD_SAVED };
}
