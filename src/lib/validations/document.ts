import { z } from "zod";

export const vendorDocumentSchema = z.object({
  documentType: z.string().min(2, "Document type is required").max(100),
  fileUrl: z.string().min(1, "Upload a file first"),
});
export type VendorDocumentInput = z.infer<typeof vendorDocumentSchema>;

export const documentReviewSchema = z.object({
  documentId: z.string().min(1),
  decision: z.enum(["APPROVED", "REJECTED"]),
  adminNotes: z.string().max(1000).optional().or(z.literal("")),
});
export type DocumentReviewInput = z.infer<typeof documentReviewSchema>;
