import { z } from "zod";

const emptyToUndefined = (v: unknown) =>
  v === "" || v === null || v === undefined ? undefined : v;

const rating = z.preprocess(
  emptyToUndefined,
  z.coerce.number().int().min(1, "Rating is required").max(5)
);
const optionalRating = z.preprocess(
  emptyToUndefined,
  z.coerce.number().int().min(1).max(5).optional()
);

export const reviewSchema = z.object({
  overallRating: rating,
  qualityRating: optionalRating,
  communicationRating: optionalRating,
  timelinessRating: optionalRating,
  professionalismRating: optionalRating,
  writtenReview: z.string().max(2000).optional().or(z.literal("")),
});
export type ReviewInput = z.infer<typeof reviewSchema>;
