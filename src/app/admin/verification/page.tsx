import { getAllVendorsForVerification } from "@/lib/services/admin";
import { setVerificationStatusAction } from "@/lib/actions/admin";
import { approveDocumentAction, rejectDocumentAction } from "@/lib/actions/documents";
import { PageHeader, EmptyState } from "@/components/shared/states";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { DocumentStatusBadge } from "@/components/shared/StatusBadge";
import { VerificationBadge } from "@/components/vendors/VerificationBadge";
import { VERIFICATION_STATUS_LABELS } from "@/lib/utils/labels";
import { formatDate } from "@/lib/utils/format";

const VERIFICATION_OPTIONS = Object.entries(VERIFICATION_STATUS_LABELS);

export default async function AdminVerificationPage() {
  const vendors = await getAllVendorsForVerification();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Verification review"
        description="Review vendor documents and assign verification status."
      />

      {vendors.length === 0 ? (
        <EmptyState title="No vendors to review" />
      ) : (
        <div className="space-y-4">
          {vendors.map((v) => (
            <Card key={v.id}>
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>{v.businessName}</CardTitle>
                  <p className="text-sm text-slate-500">{v.user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <VerificationBadge status={v.verificationStatus} />
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <form action={setVerificationStatusAction} className="flex flex-wrap items-end gap-2">
                  <input type="hidden" name="vendorId" value={v.id} />
                  <div className="min-w-[200px]">
                    <label className="mb-1 block text-xs font-medium text-slate-500">
                      Set verification status
                    </label>
                    <Select name="status" defaultValue={v.verificationStatus}>
                      {VERIFICATION_OPTIONS.map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <Button type="submit" variant="secondary" size="sm">
                    Update status
                  </Button>
                </form>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Documents ({v.documents.length})
                  </h4>
                  {v.documents.length === 0 ? (
                    <p className="text-sm text-slate-500">No documents uploaded.</p>
                  ) : (
                    v.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="rounded-lg border border-slate-200 p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium text-slate-900">{doc.documentType}</p>
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-brand-700 hover:underline"
                            >
                              View file
                            </a>
                            <p className="text-xs text-slate-400">{formatDate(doc.createdAt)}</p>
                          </div>
                          <DocumentStatusBadge status={doc.status} />
                        </div>

                        <div className="mt-3 flex flex-wrap items-end gap-2">
                          <form action={approveDocumentAction} className="flex items-end gap-2">
                            <input type="hidden" name="documentId" value={doc.id} />
                            <Input
                              name="adminNotes"
                              placeholder="Optional note"
                              className="h-9 w-44"
                            />
                            <Button type="submit" size="sm">
                              Approve
                            </Button>
                          </form>
                          <form action={rejectDocumentAction} className="flex items-end gap-2">
                            <input type="hidden" name="documentId" value={doc.id} />
                            <Input
                              name="adminNotes"
                              placeholder="Reason"
                              className="h-9 w-44"
                            />
                            <Button type="submit" variant="danger" size="sm">
                              Reject
                            </Button>
                          </form>
                        </div>

                        {doc.adminNotes ? (
                          <p className="mt-2 text-xs text-slate-500">Note: {doc.adminNotes}</p>
                        ) : null}
                      </div>
                    ))
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
