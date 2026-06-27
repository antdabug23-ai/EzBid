import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCustomer } from "@/lib/auth/current-user";
import { getCustomerJobDetail } from "@/lib/services/jobs";
import { NotFoundError } from "@/lib/services/errors";
import { PageHeader, Alert } from "@/components/shared/states";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { JobStatusBadge } from "@/components/shared/StatusBadge";
import { JobPhotos } from "@/components/jobs/JobPhotos";
import { markCompletedAction, markInProgressAction, cancelJobAction } from "@/lib/actions/jobs";
import { formatBudgetRange, formatCurrency, formatDate } from "@/lib/utils/format";
import { SERVICE_WINDOW_LABELS, URGENCY_LABELS } from "@/lib/utils/labels";

export default async function CustomerJobDetailPage({
  params,
  searchParams,
}: {
  params: { jobId: string };
  searchParams: { accepted?: string; reviewed?: string };
}) {
  const { profile } = await requireCustomer();

  let job;
  try {
    job = await getCustomerJobDetail(profile.id, params.jobId);
  } catch (err) {
    if (err instanceof NotFoundError) notFound();
    throw err;
  }

  const submittedBids = job.bids.filter((b) => b.status === "SUBMITTED");
  const acceptedBid = job.bids.find((b) => b.status === "ACCEPTED") ?? null;
  const canEdit = ["OPEN", "BIDDING"].includes(job.status);
  const canReview = job.status === "COMPLETED" && !job.review;

  return (
    <div className="space-y-6">
      {searchParams.accepted ? (
        <Alert tone="success">
          Bid accepted. The vendor has been notified and can now see your address and contact
          details to arrange the work.
        </Alert>
      ) : null}
      {searchParams.reviewed ? <Alert tone="success">Thanks for your review!</Alert> : null}

      <PageHeader
        title={job.title}
        description={`${job.serviceCategory.name} · ${job.town}, ${job.state}`}
        action={
          <div className="flex items-center gap-2">
            <JobStatusBadge status={job.status} />
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Job details</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
              <p className="whitespace-pre-line text-sm text-slate-700">{job.description}</p>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <Detail label="Budget" value={formatBudgetRange(job.budgetMin, job.budgetMax)} />
                <Detail label="Requested date" value={formatDate(job.requestedServiceDate)} />
                <Detail label="Window" value={SERVICE_WINDOW_LABELS[job.preferredServiceWindow]} />
                <Detail label="Urgency" value={URGENCY_LABELS[job.urgencyLevel]} />
                <Detail label="Flexible date" value={job.isDateFlexible ? "Yes" : "No"} />
              </dl>
              <div className="rounded-lg bg-slate-50 p-3 text-sm">
                <p className="text-xs uppercase tracking-wide text-slate-400">Exact address (private)</p>
                <p className="font-medium text-slate-800">{job.exactAddress}</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
            </CardHeader>
            <CardBody>
              <JobPhotos photos={job.photos} />
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bids</CardTitle>
            </CardHeader>
            <CardBody className="space-y-3">
              {acceptedBid ? (
                <div className="space-y-1">
                  <p className="text-sm text-slate-600">Accepted bid</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(acceptedBid.amount)}
                  </p>
                  <p className="text-sm text-slate-600">{acceptedBid.vendor.businessName}</p>
                </div>
              ) : (
                <p className="text-sm text-slate-600">
                  {submittedBids.length} active {submittedBids.length === 1 ? "bid" : "bids"}
                </p>
              )}
              <ButtonLink href={`/customer/jobs/${job.id}/bids`} variant="outline" className="w-full">
                {acceptedBid ? "View bids" : "Compare & accept bids"}
              </ButtonLink>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardBody className="space-y-2">
              {canEdit ? (
                <ButtonLink
                  href={`/customer/jobs/${job.id}/edit`}
                  variant="outline"
                  className="w-full"
                >
                  Edit job
                </ButtonLink>
              ) : null}

              {job.status === "ACCEPTED" ? (
                <form action={markInProgressAction}>
                  <input type="hidden" name="jobId" value={job.id} />
                  <SubmitButton variant="secondary" className="w-full">
                    Mark in progress
                  </SubmitButton>
                </form>
              ) : null}

              {["ACCEPTED", "IN_PROGRESS"].includes(job.status) ? (
                <form action={markCompletedAction}>
                  <input type="hidden" name="jobId" value={job.id} />
                  <SubmitButton className="w-full" confirm="Mark this job as completed?">
                    Mark completed
                  </SubmitButton>
                </form>
              ) : null}

              {canReview ? (
                <ButtonLink href={`/customer/jobs/${job.id}/review`} className="w-full">
                  Leave a review
                </ButtonLink>
              ) : null}

              {["OPEN", "BIDDING"].includes(job.status) ? (
                <form action={cancelJobAction}>
                  <input type="hidden" name="jobId" value={job.id} />
                  <SubmitButton variant="danger" className="w-full" confirm="Cancel this job?">
                    Cancel job
                  </SubmitButton>
                </form>
              ) : null}

              {job.review ? (
                <p className="text-center text-sm text-slate-500">
                  You reviewed this job.{" "}
                  <Link
                    href={`/customer/vendors/${job.review.vendorId}`}
                    className="text-brand-700 hover:underline"
                  >
                    View vendor
                  </Link>
                </p>
              ) : null}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="font-medium text-slate-800">{value}</dd>
    </div>
  );
}
