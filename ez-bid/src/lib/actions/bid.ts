"use server";

import { redirect } from "next/navigation";
import { requireVendor } from "@/lib/auth/current-user";
import { submitBidFromFormData, rawBidValues } from "@/lib/validations/bid";
import { submitVendorBid } from "@/lib/services/vendor";
import { type FormState, toErrorState } from "./form-state";

const UNABLE_TO_SUBMIT_BID = "Unable to submit bid right now.";

export async function submitBidAction(
  jobId: string,
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const { profile } = await requireVendor();
    const parsed = submitBidFromFormData(formData);
    await submitVendorBid(profile.id, jobId, parsed);
  } catch (err) {
    const base = toErrorState(err, "submitBid", UNABLE_TO_SUBMIT_BID);
    return { ...base, values: rawBidValues(formData) };
  }

  redirect(`/vendor/jobs/${jobId}?bid=success`);
}
