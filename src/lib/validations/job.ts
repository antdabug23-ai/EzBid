import { z } from "zod";

const serviceWindow = z.enum(["MORNING", "AFTERNOON", "EVENING", "FLEXIBLE"]);
const urgency = z.enum(["LOW", "NORMAL", "HIGH", "EMERGENCY"]);

const optionalInt = z
  .union([z.string(), z.number()])
  .optional()
  .transform((v) => {
    if (v === undefined || v === "" || v === null) return undefined;
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? Math.round(n) : undefined;
  });

const optionalDate = z
  .string()
  .optional()
  .transform((v) => (v && v.length > 0 ? new Date(v) : undefined));

export const jobSchema = z
  .object({
    serviceCategoryId: z.string().min(1, "Select a service category"),
    title: z.string().min(3, "Add a short title").max(120),
    description: z.string().min(10, "Describe the work (at least 10 characters)").max(4000),
    town: z.string().min(1, "Town is required").max(80),
    state: z.string().min(1, "State is required").max(40),
    exactAddress: z.string().min(3, "Street address is required").max(250),
    budgetMin: optionalInt,
    budgetMax: optionalInt,
    requestedServiceDate: optionalDate,
    preferredServiceWindow: serviceWindow.default("FLEXIBLE"),
    isDateFlexible: z.preprocess(
      (v) => v === "true" || v === "on" || v === true,
      z.boolean()
    ),
    urgencyLevel: urgency.default("NORMAL"),
  })
  .refine(
    (d) => d.budgetMin === undefined || d.budgetMax === undefined || d.budgetMax >= d.budgetMin,
    { message: "Max budget must be greater than min budget", path: ["budgetMax"] }
  );
export type JobInput = z.infer<typeof jobSchema>;
