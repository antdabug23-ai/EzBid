import { z } from "zod";

function trimmed(val: unknown): string {
  if (val === null || val === undefined) return "";
  return String(val).trim();
}

function optionalTrimmed(val: unknown): string | undefined {
  const s = trimmed(val);
  return s === "" ? undefined : s;
}

export const submitBidSchema = z.object({
  amount: z.preprocess((val) => {
    const s = trimmed(val).replace(/[$,]/g, "");
    if (s === "") return undefined;
    const n = Number(s);
    return Number.isNaN(n) ? s : n;
  }, z.number({ message: "Please enter a bid amount." }).int("Enter a whole dollar amount.").positive("Bid amount must be greater than 0.").max(1_000_000, "Bid amount is too large.")),
  startDate: z.preprocess(
    trimmed,
    z
      .string()
      .min(1, "Please choose an estimated start date.")
      .refine((v) => !Number.isNaN(Date.parse(v)), {
        message: "Please choose a valid start date.",
      })
  ),
  timeline: z.preprocess(
    trimmed,
    z
      .string()
      .min(1, "Please enter an estimated completion time.")
      .max(120, "Completion time is too long.")
  ),
  message: z.preprocess(
    trimmed,
    z
      .string()
      .min(1, "Please enter a message to the customer.")
      .max(2000, "Message is too long.")
  ),
  notes: z.preprocess(optionalTrimmed, z.string().max(1000, "Notes are too long.").optional()),
});

export type SubmitBidInput = z.infer<typeof submitBidSchema>;

export function submitBidFromFormData(formData: FormData): SubmitBidInput {
  return submitBidSchema.parse({
    amount: formData.get("amount"),
    startDate: formData.get("startDate"),
    timeline: formData.get("timeline"),
    message: formData.get("message"),
    notes: formData.get("notes"),
  });
}

/** Raw safe string values for preserving the form after a validation error (no secrets here). */
export function rawBidValues(formData: FormData): Record<string, string> {
  return {
    amount: String(formData.get("amount") ?? ""),
    startDate: String(formData.get("startDate") ?? ""),
    timeline: String(formData.get("timeline") ?? ""),
    message: String(formData.get("message") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  };
}
