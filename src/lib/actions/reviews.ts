"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCustomer } from "@/lib/auth/current-user";
import { reviewSchema } from "@/lib/validations/review";
import { createReview } from "@/lib/services/reviews";
import { type FormState, toErrorState } from "./form-state";

export async function createReviewAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const jobId = String(formData.get("jobId") ?? "");
  try {
    const { profile } = await requireCustomer();
    const parsed = reviewSchema.parse(Object.fromEntries(formData));
    await createReview(profile.id, jobId, parsed);
  } catch (err) {
    return toErrorState(err);
  }
  revalidatePath(`/customer/jobs/${jobId}`);
  redirect(`/customer/jobs/${jobId}?reviewed=1`);
}
