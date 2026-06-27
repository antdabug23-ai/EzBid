import "server-only";
import type { VerificationStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { NotFoundError } from "./errors";

export async function uploadVendorDocument(
  vendorProfileId: string,
  documentType: string,
  fileUrl: string
) {
  const doc = await prisma.vendorDocument.create({
    data: { vendorId: vendorProfileId, documentType, fileUrl, status: "PENDING" },
  });

  // Move an unverified vendor into review once they submit a document.
  await prisma.vendorProfile.updateMany({
    where: { id: vendorProfileId, verificationStatus: "NOT_VERIFIED" },
    data: { verificationStatus: "PENDING_REVIEW" },
  });

  return doc;
}

export async function approveVendorDocument(documentId: string, adminNotes?: string) {
  const doc = await prisma.vendorDocument.findUnique({ where: { id: documentId } });
  if (!doc) throw new NotFoundError("Document not found.");
  return prisma.vendorDocument.update({
    where: { id: documentId },
    data: { status: "APPROVED", adminNotes: adminNotes || null },
  });
}

export async function rejectVendorDocument(documentId: string, adminNotes?: string) {
  const doc = await prisma.vendorDocument.findUnique({ where: { id: documentId } });
  if (!doc) throw new NotFoundError("Document not found.");
  return prisma.vendorDocument.update({
    where: { id: documentId },
    data: { status: "REJECTED", adminNotes: adminNotes || null },
  });
}

export async function setVendorVerificationStatus(
  vendorProfileId: string,
  status: VerificationStatus
) {
  const vendor = await prisma.vendorProfile.findUnique({ where: { id: vendorProfileId } });
  if (!vendor) throw new NotFoundError("Vendor not found.");
  return prisma.vendorProfile.update({
    where: { id: vendorProfileId },
    data: { verificationStatus: status },
  });
}
