import { requireVendor } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db/prisma";
import { PageHeader, EmptyState } from "@/components/shared/states";
import { Card, CardBody } from "@/components/ui/Card";
import { DocumentStatusBadge } from "@/components/shared/StatusBadge";
import { VerificationBadge } from "@/components/vendors/VerificationBadge";
import { DocumentUploadForm } from "@/components/vendors/DocumentUploadForm";
import { formatDate } from "@/lib/utils/format";

export default async function VendorDocumentsPage() {
  const { profile } = await requireVendor();
  const documents = await prisma.vendorDocument.findMany({
    where: { vendorId: profile.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Verification documents"
        description="Upload licenses, insurance, or trade certifications for admin review."
        action={<VerificationBadge status={profile.verificationStatus} />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <DocumentUploadForm />
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">Your documents</h2>
          {documents.length === 0 ? (
            <EmptyState
              title="No documents yet"
              description="Upload your first document to begin verification."
            />
          ) : (
            documents.map((doc) => (
              <Card key={doc.id}>
                <CardBody className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{doc.documentType}</p>
                      <p className="text-xs text-slate-400">Uploaded {formatDate(doc.createdAt)}</p>
                    </div>
                    <DocumentStatusBadge status={doc.status} />
                  </div>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-brand-700 hover:underline"
                  >
                    View file
                  </a>
                  {doc.adminNotes ? (
                    <p className="rounded bg-slate-50 p-2 text-xs text-slate-600">
                      Admin note: {doc.adminNotes}
                    </p>
                  ) : null}
                </CardBody>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
