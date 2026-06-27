"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCustomer, requireVendor } from "@/lib/auth/current-user";
import { bidSchema } from "@/lib/validations/bid";
import { acceptBid, createBid, withdrawBid } from "@/lib/services/bids";
import { type FormState, toErrorState } from "./form-state";

export async function createBidAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const jobId = String(formData.get("jobId") ?? "");
  try {
    const { profile } = await requireVendor();
    const parsed = bidSchema.parse(Object.fromEntries(formData));
    await createBid(profile.id, jobId, parsed);
  } catch (err) {
    return toErrorState(err);
  }
  revalidatePath(`/vendor/jobs/${jobId}`);
  revalidatePath("/vendor/bids");
  redirect("/vendor/bids?submitted=1");
}

export async function withdrawBidAction(formData: FormData): Promise<void> {
  const bidId = String(formData.get("bidId") ?? "");
  const { profile } = await requireVendor();
  await withdrawBid(profile.id, bidId);
  revalidatePath("/vendor/bids");
}

export async function acceptBidAction(formData: FormData): Promise<void> {
  const jobId = String(formData.get("jobId") ?? "");
  const bidId = String(formData.get("bidId") ?? "");
  const { profile } = await requireCustomer();
  await acceptBid(profile.id, jobId, bidId);
  revalidatePath(`/customer/jobs/${jobId}`);
  revalidatePath(`/customer/jobs/${jobId}/bids`);
  redirect(`/customer/jobs/${jobId}?accepted=1`);
}
