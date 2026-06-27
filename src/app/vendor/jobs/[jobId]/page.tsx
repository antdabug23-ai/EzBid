import { notFound } from "next/navigation";
import { requireVendor } from "@/lib/auth/current-user";
import { getJobViewForVendor } from "@/lib/services/vendors";
import { NotFoundError } from "@/lib/services/errors";
import { PageHeader, Alert } from "@/components/shared/states";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { JobStatusBadge, BidStatusBadge } from "@/components/shared/StatusBadge";
import { JobPhotos } from "@/components/jobs/JobPhotos";
import { formatBudgetRange, formatCurrency, formatDate } from "@/lib/utils/format";
import { SERVICE_WINDOW_LABELS, URGENCY_LABELS } from "@/lib/utils/labels";

export default async function VendorJobDetailPage({ params }: { params: { jobId: string } }) {
  const { profile } = await requireVendor();

  let view;
  try {
    view = await getJobViewForVendor(profile.id, params.jobId);
  } catch (err) {
    if (err instanceof NotFoundError) notFound();
    throw err;
  }

  const { job, unlocked, myBid } = view;
  const canBid =
    ["OPEN", "BIDDING"].includes(job.status) && (!myBid || myBid.status === "WITHDRAWN");

  return (
    <div className="space-y-6">
      <PageHeader
        title={job.title}
        description={`${job.serviceCategory.name} · ${job.town}, ${job.state}`}
        action={<JobStatusBadge status={job.status} />}
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
                <Detail label="Area" value={`${job.town}, ${job.state}`} />
              </dl>
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

          {unlocked ? (
            <Card className="border-emerald-300">
              <CardHeader>
                <CardTitle>Customer details (unlocked)</CardTitle>
              </CardHeader>
              <CardBody className="space-y-2 text-sm">
                <Detail label="Exact address" value={job.exactAddress ?? "—"} />
                <Detail
                  label="Customer"
                  value={`${job.customerContact.firstName} ${job.customerContact.lastName ?? ""}`.trim()}
                />
                {job.customerContact.phone ? (
                  <Detail label="Phone" value={job.customerContact.phone} />
                ) : null}
                {job.customerContact.email ? (
                  <Detail label="Email" value={job.customerContact.email} />
                ) : null}
              </CardBody>
            </Card>
          ) : null}
        </div>

        <div className="space-y-6">
          {!unlocked ? (
            <Alert tone="info">
              Approximate location only. The exact address and customer contact unlock once the
              customer accepts your bid.
            </Alert>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle>Your bid</CardTitle>
            </CardHeader>
            <CardBody className="space-y-3">
              {myBid && myBid.status !== "WITHDRAWN" ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-slate-900">
                      {formatCurrency(myBid.amount)}
                    </span>
                    <BidStatusBadge status={myBid.status} />
                  </div>
                </div>
              ) : canBid ? (
                <>
                  <p className="text-sm text-slate-600">You haven&rsquo;t bid on this job yet.</p>
                  <ButtonLink href={`/vendor/jobs/${job.id}/bid`} className="w-full">
                    Submit a bid
                  </ButtonLink>
                </>
              ) : (
                <p className="text-sm text-slate-600">This job is no longer accepting bids.</p>
              )}
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
