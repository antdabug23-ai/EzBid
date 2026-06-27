"use server";

import { revalidatePath } from "next/cache";
import { requireVendor, requireAdmin } from "@/lib/auth/current-user";
import { vendorDocumentSchema } from "@/lib/validations/document";
import {
  approveVendorDocument,
  rejectVendorDocument,
  uploadVendorDocument,
} from "@/lib/services/verification";
import { type FormState, toErrorState } from "./form-state";

export async function uploadVendorDocumentAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const { profile } = await requireVendor();
    const parsed = vendorDocumentSchema.parse({
      documentType: formData.get("documentType"),
      fileUrl: formData.get("fileUrl"),
    });
    await uploadVendorDocument(profile.id, parsed.documentType, parsed.fileUrl);
  } catch (err) {
    return toErrorState(err);
  }
  revalidatePath("/vendor/documents");
  return { ok: true, message: "Document uploaded. It is pending review." };
}

export async function approveDocumentAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const documentId = String(formData.get("documentId") ?? "");
  const notes = String(formData.get("adminNotes") ?? "");
  await approveVendorDocument(documentId, notes);
  revalidatePath("/admin/verification");
}

export async function rejectDocumentAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const documentId = String(formData.get("documentId") ?? "");
  const notes = String(formData.get("adminNotes") ?? "");
  await rejectVendorDocument(documentId, notes);
  revalidatePath("/admin/verification");
}
