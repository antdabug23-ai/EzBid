import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const customerSignupSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is required").max(60),
    lastName: z.string().min(1, "Last name is required").max(60),
    phone: z.string().max(30).optional().or(z.literal("")),
    town: z.string().max(80).optional().or(z.literal("")),
    state: z.string().max(40).optional().or(z.literal("")),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type CustomerSignupInput = z.infer<typeof customerSignupSchema>;

export const vendorSignupSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    businessName: z.string().min(2, "Business name is required").max(120),
    phone: z.string().max(30).optional().or(z.literal("")),
    town: z.string().max(80).optional().or(z.literal("")),
    state: z.string().max(40).optional().or(z.literal("")),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type VendorSignupInput = z.infer<typeof vendorSignupSchema>;
