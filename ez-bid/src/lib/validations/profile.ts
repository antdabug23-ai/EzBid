import { z } from "zod";

function formString(val: unknown): string {
  if (val === null || val === undefined) return "";
  return String(val);
}

function optionalFormString(val: unknown): string | undefined {
  if (val === null || val === undefined || String(val).trim() === "") return undefined;
  return String(val);
}

// ----------------------------- Customer profile -----------------------------

export const customerProfileSchema = z.object({
  firstName: z.preprocess(
    formString,
    z.string().trim().min(1, "Please enter your first name.").max(60, "First name is too long.")
  ),
  lastName: z.preprocess(
    formString,
    z.string().trim().min(1, "Please enter your last name.").max(60, "Last name is too long.")
  ),
  phone: z.preprocess(optionalFormString, z.string().trim().max(30, "Phone is too long.").optional()),
  town: z.preprocess(optionalFormString, z.string().trim().max(80, "Town is too long.").optional()),
  state: z.preprocess(optionalFormString, z.string().trim().max(40, "State is too long.").optional()),
});
export type CustomerProfileInput = z.infer<typeof customerProfileSchema>;

export function customerProfileFromFormData(fd: FormData): CustomerProfileInput {
  return customerProfileSchema.parse({
    firstName: fd.get("firstName"),
    lastName: fd.get("lastName"),
    phone: fd.get("phone"),
    town: fd.get("town"),
    state: fd.get("state"),
  });
}

// ----------------------------- Vendor profile -----------------------------

export const vendorProfileSchema = z.object({
  businessName: z.preprocess(
    formString,
    z.string().trim().min(2, "Please enter your business name.").max(120, "Business name is too long.")
  ),
  phone: z.preprocess(optionalFormString, z.string().trim().max(30, "Phone is too long.").optional()),
  town: z.preprocess(optionalFormString, z.string().trim().max(80, "Town is too long.").optional()),
  state: z.preprocess(optionalFormString, z.string().trim().max(40, "State is too long.").optional()),
  description: z.preprocess(
    optionalFormString,
    z.string().trim().max(2000, "Description is too long.").optional()
  ),
  serviceAreaDescription: z.preprocess(
    optionalFormString,
    z.string().trim().max(300, "Service area is too long.").optional()
  ),
  website: z.preprocess(
    optionalFormString,
    z
      .string()
      .trim()
      .max(200, "Website is too long.")
      .url("Please enter a valid website URL (including https://).")
      .optional()
  ),
});
export type VendorProfileInput = z.infer<typeof vendorProfileSchema>;

export function vendorProfileFromFormData(fd: FormData): VendorProfileInput {
  return vendorProfileSchema.parse({
    businessName: fd.get("businessName"),
    phone: fd.get("phone"),
    town: fd.get("town"),
    state: fd.get("state"),
    description: fd.get("description"),
    serviceAreaDescription: fd.get("serviceAreaDescription"),
    website: fd.get("website"),
  });
}

// ----------------------------- Change password -----------------------------

export const changePasswordSchema = z
  .object({
    currentPassword: z.preprocess(formString, z.string().min(1, "Current password is required.")),
    newPassword: z.preprocess(
      formString,
      z.string().min(8, "Password must be at least 8 characters.")
    ),
    confirmPassword: z.preprocess(formString, z.string().min(1, "Please confirm your new password.")),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export function changePasswordFromFormData(fd: FormData): ChangePasswordInput {
  return changePasswordSchema.parse({
    currentPassword: fd.get("currentPassword"),
    newPassword: fd.get("newPassword"),
    confirmPassword: fd.get("confirmPassword"),
  });
}
