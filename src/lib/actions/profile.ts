"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db/prisma";
import { customerProfileSchema, vendorProfileSchema } from "@/lib/validations/profile";
import { upsertVendorProfile } from "@/lib/services/vendors";
import { type FormState, toErrorState } from "./form-state";

export async function saveCustomerProfileAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const user = await requireRole("CUSTOMER");
    const parsed = customerProfileSchema.parse(Object.fromEntries(formData));
    await prisma.customerProfile.upsert({
      where: { userId: user.id },
      update: {
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        phone: parsed.phone || null,
        town: parsed.town || null,
        state: parsed.state || null,
      },
      create: {
        userId: user.id,
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        phone: parsed.phone || null,
        town: parsed.town || null,
        state: parsed.state || null,
      },
    });
  } catch (err) {
    return toErrorState(err);
  }
  revalidatePath("/customer/profile");
  redirect("/customer/dashboard");
}

export async function saveVendorProfileAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const user = await requireRole("VENDOR");
    const raw = {
      ...Object.fromEntries(formData),
      serviceCategoryIds: formData.getAll("serviceCategoryIds").map(String),
    };
    const parsed = vendorProfileSchema.parse(raw);
    await upsertVendorProfile(user.id, parsed);
  } catch (err) {
    return toErrorState(err);
  }
  revalidatePath("/vendor/profile");
  redirect("/vendor/dashboard");
}
