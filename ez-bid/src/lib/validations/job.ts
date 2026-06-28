import { z } from "zod";
import type { UrgencyLevel } from "@prisma/client";

export const SERVICE_CATEGORIES = [
  "Lawn Mowing",
  "Landscaping",
  "Power Washing",
  "Handyman",
  "Tree Removal",
  "Junk Removal",
  "House Cleaning",
  "Plumbing",
  "Electrical",
  "HVAC",
  "Other",
] as const;

export const URGENCY_OPTIONS = [
  { value: "FLEXIBLE", label: "Flexible" },
  { value: "WITHIN_WEEK", label: "Within 1 week" },
  { value: "WITHIN_48H", label: "Within 48 hours" },
  { value: "EMERGENCY", label: "Emergency" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "NOT_SURE", label: "Not sure yet" },
  { value: "UNDER_250", label: "Under $250" },
  { value: "250_500", label: "$250 - $500" },
  { value: "500_1000", label: "$500 - $1,000" },
  { value: "1000_2500", label: "$1,000 - $2,500" },
  { value: "2500_PLUS", label: "$2,500+" },
] as const;

type UrgencyValue = (typeof URGENCY_OPTIONS)[number]["value"];
type BudgetValue = (typeof BUDGET_OPTIONS)[number]["value"];

const urgencyValues = URGENCY_OPTIONS.map((o) => o.value) as [UrgencyValue, ...UrgencyValue[]];
const budgetValues = BUDGET_OPTIONS.map((o) => o.value) as [BudgetValue, ...BudgetValue[]];

/** Map the friendly urgency option to the Prisma UrgencyLevel enum. */
export function urgencyToLevel(value: UrgencyValue): UrgencyLevel {
  switch (value) {
    case "FLEXIBLE":
      return "LOW";
    case "WITHIN_WEEK":
      return "NORMAL";
    case "WITHIN_48H":
      return "HIGH";
    case "EMERGENCY":
      return "EMERGENCY";
  }
}

/** Map a budget option to min/max integers (null where open-ended). */
export function budgetToRange(value: BudgetValue): { min: number | null; max: number | null } {
  switch (value) {
    case "NOT_SURE":
      return { min: null, max: null };
    case "UNDER_250":
      return { min: null, max: 250 };
    case "250_500":
      return { min: 250, max: 500 };
    case "500_1000":
      return { min: 500, max: 1000 };
    case "1000_2500":
      return { min: 1000, max: 2500 };
    case "2500_PLUS":
      return { min: 2500, max: null };
  }
}

function trimmed(val: unknown): string {
  if (val === null || val === undefined) return "";
  return String(val).trim();
}

function optionalTrimmed(val: unknown): string | undefined {
  const s = trimmed(val);
  return s === "" ? undefined : s;
}

export const createJobSchema = z.object({
  title: z.preprocess(
    trimmed,
    z.string().min(1, "Please enter a job title.").max(120, "Job title is too long.")
  ),
  serviceCategory: z.preprocess(
    trimmed,
    z.enum(SERVICE_CATEGORIES, { message: "Please select a service category." })
  ),
  description: z.preprocess(
    trimmed,
    z
      .string()
      .min(10, "Please describe the job (at least 10 characters).")
      .max(4000, "Description is too long.")
  ),
  town: z.preprocess(
    trimmed,
    z.string().min(1, "Please enter your town.").max(80, "Town is too long.")
  ),
  state: z.preprocess(
    trimmed,
    z.string().min(1, "Please enter your state.").max(40, "State is too long.")
  ),
  serviceDate: z.preprocess(
    trimmed,
    z.string().min(1, "Please choose a desired service date.").refine((v) => !Number.isNaN(Date.parse(v)), {
      message: "Please choose a valid service date.",
    })
  ),
  budget: z.preprocess(trimmed, z.enum(budgetValues, { message: "Please select a budget range." })),
  urgency: z.preprocess(
    trimmed,
    z.enum(urgencyValues, { message: "Please select an urgency level." })
  ),
  notes: z.preprocess(optionalTrimmed, z.string().max(2000, "Notes are too long.").optional()),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;

export function createJobFromFormData(formData: FormData): CreateJobInput {
  return createJobSchema.parse({
    title: formData.get("title"),
    serviceCategory: formData.get("serviceCategory"),
    description: formData.get("description"),
    town: formData.get("town"),
    state: formData.get("state"),
    serviceDate: formData.get("serviceDate"),
    budget: formData.get("budget"),
    urgency: formData.get("urgency"),
    notes: formData.get("notes"),
  });
}
