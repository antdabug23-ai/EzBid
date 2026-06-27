import { z } from "zod";

export const customerProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(60),
  lastName: z.string().min(1, "Last name is required").max(60),
  phone: z.string().max(30).optional().or(z.literal("")),
  town: z.string().max(80).optional().or(z.literal("")),
  state: z.string().max(40).optional().or(z.literal("")),
});
export type CustomerProfileInput = z.infer<typeof customerProfileSchema>;

export const vendorProfileSchema = z.object({
  businessName: z.string().min(2, "Business name is required").max(120),
  description: z.string().max(2000).optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  website: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  town: z.string().max(80).optional().or(z.literal("")),
  state: z.string().max(40).optional().or(z.literal("")),
  serviceAreaDescription: z.string().max(500).optional().or(z.literal("")),
  serviceCategoryIds: z.array(z.string()).default([]),
});
export type VendorProfileInput = z.infer<typeof vendorProfileSchema>;
