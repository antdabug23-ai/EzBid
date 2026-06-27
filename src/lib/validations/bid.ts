import { z } from "zod";

const serviceWindow = z.enum(["MORNING", "AFTERNOON", "EVENING", "FLEXIBLE"]);

const optionalDate = z
  .string()
  .optional()
  .transform((v) => (v && v.length > 0 ? new Date(v) : undefined));

export const bidSchema = z.object({
  amount: z.coerce.number().int("Enter a whole dollar amount").positive("Enter a bid amount"),
  description: z.string().max(2000).optional().or(z.literal("")),
  earliestAvailableDate: optionalDate,
  proposedServiceDate: optionalDate,
  proposedServiceWindow: serviceWindow.default("FLEXIBLE"),
  estimatedTimeline: z.string().max(200).optional().or(z.literal("")),
});
export type BidInput = z.infer<typeof bidSchema>;
