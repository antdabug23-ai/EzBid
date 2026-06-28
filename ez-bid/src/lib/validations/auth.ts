import { z } from "zod";

function formString(val: unknown): string {
  if (val === null || val === undefined) return "";
  return String(val);
}

function optionalFormString(val: unknown): string | undefined {
  if (val === null || val === undefined || val === "") return undefined;
  return String(val);
}

export const loginSchema = z.object({
  email: z.preprocess(
    formString,
    z.string().email("Enter a valid email").transform((v) => v.toLowerCase().trim())
  ),
  password: z.preprocess(formString, z.string().min(1, "Password is required")),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const customerSignupSchema = z
  .object({
    email: z.preprocess(
      formString,
      z.string().email("Enter a valid email").transform((v) => v.toLowerCase().trim())
    ),
    password: z.preprocess(
      formString,
      z.string().min(8, "Password must be at least 8 characters")
    ),
    confirmPassword: z.preprocess(formString, z.string()),
    firstName: z.preprocess(
      formString,
      z.string().min(1, "First name is required").max(60)
    ),
    lastName: z.preprocess(
      formString,
      z.string().min(1, "Last name is required").max(60)
    ),
    phone: z.preprocess(optionalFormString, z.string().max(30).optional()),
    town: z.preprocess(optionalFormString, z.string().max(80).optional()),
    state: z.preprocess(optionalFormString, z.string().max(40).optional()),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type CustomerSignupInput = z.infer<typeof customerSignupSchema>;

export const vendorSignupSchema = z
  .object({
    email: z.preprocess(
      formString,
      z.string().email("Enter a valid email").transform((v) => v.toLowerCase().trim())
    ),
    password: z.preprocess(
      formString,
      z.string().min(8, "Password must be at least 8 characters")
    ),
    confirmPassword: z.preprocess(formString, z.string()),
    businessName: z.preprocess(
      formString,
      z.string().min(2, "Business name is required").max(120)
    ),
    phone: z.preprocess(optionalFormString, z.string().max(30).optional()),
    town: z.preprocess(optionalFormString, z.string().max(80).optional()),
    state: z.preprocess(optionalFormString, z.string().max(40).optional()),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type VendorSignupInput = z.infer<typeof vendorSignupSchema>;

/** Read only known signup fields from FormData (ignores React action metadata keys). */
export function customerSignupFromFormData(formData: FormData) {
  return customerSignupSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    town: formData.get("town"),
    state: formData.get("state"),
  });
}

export function vendorSignupFromFormData(formData: FormData) {
  return vendorSignupSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    businessName: formData.get("businessName"),
    phone: formData.get("phone"),
    town: formData.get("town"),
    state: formData.get("state"),
  });
}

export function loginFromFormData(formData: FormData) {
  return loginSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
}
