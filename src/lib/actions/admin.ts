"use server";

import { revalidatePath } from "next/cache";
import type { VerificationStatus } from "@prisma/client";
import { requireAdmin } from "@/lib/auth/current-user";
import { markFinderFeeConfirmed } from "@/lib/services/admin";
import { setVendorVerificationStatus } from "@/lib/services/verification";

export async function markFinderFeeConfirmedAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const finderFeeId = String(formData.get("finderFeeId") ?? "");
  await markFinderFeeConfirmed(finderFeeId);
  revalidatePath("/admin/finder-fees");
}

export async function setVerificationStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const vendorId = String(formData.get("vendorId") ?? "");
  const status = String(formData.get("status") ?? "") as VerificationStatus;
  await setVendorVerificationStatus(vendorId, status);
  revalidatePath("/admin/verification");
}
