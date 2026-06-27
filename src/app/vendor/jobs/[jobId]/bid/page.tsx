import { notFound, redirect } from "next/navigation";
import { requireVendor } from "@/lib/auth/current-user";
import { getJobViewForVendor } from "@/lib/services/vendors";
import { NotFoundError } from "@/lib/services/errors";
import { PageHeader, Alert } from "@/components/shared/states";
import { Card, CardBody } from "@/components/ui/Card";
import { BidForm } from "@/components/bids/BidForm";
import { formatBudgetRange, formatDate } from "@/lib/utils/format";
import { SERVICE_WINDOW_LABELS } from "@/lib/utils/labels";

export default async function SubmitBidPage({ params }: { params: { jobId: string } }) {
  const { profile } = await requireVendor();

  let view;
  try {
    view = await getJobViewForVendor(profile.id, params.jobId);
  } catch (err) {
    if (err instanceof NotFoundError) notFound();
    throw err;
  }

  const { job, myBid } = view;

  if (!["OPEN", "BIDDING"].includes(job.status)) {
    redirect(`/vendor/jobs/${job.id}`);
  }
  if (myBid && myBid.status !== "WITHDRAWN") {
    redirect(`/vendor/jobs/${job.id}`);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader title="Submit a bid" description={job.title} />

      <Card>
        <CardBody className="grid grid-cols-2 gap-3 text-sm">
          <Detail label="Location" value={`${job.town}, ${job.state}`} />
          <Detail label="Budget" value={formatBudgetRange(job.budgetMin, job.budgetMax)} />
          <Detail label="Requested date" value={formatDate(job.requestedServiceDate)} />
          <Detail label="Window" value={SERVICE_WINDOW_LABELS[job.preferredServiceWindow]} />
        </CardBody>
      </Card>

      <Alert tone="info">
        Quote your earliest availability honestly — customers compare price and timing.
      </Alert>

      <BidForm jobId={job.id} />
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
