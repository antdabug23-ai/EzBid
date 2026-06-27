import { notFound } from "next/navigation";
import { requireCustomer } from "@/lib/auth/current-user";
import { getCustomerJobDetail } from "@/lib/services/jobs";
import { NotFoundError } from "@/lib/services/errors";
import { PageHeader, Alert } from "@/components/shared/states";
import { ButtonLink } from "@/components/ui/Button";
import { BidComparisonTable } from "@/components/bids/BidComparisonTable";

export default async function JobBidsPage({ params }: { params: { jobId: string } }) {
  const { profile } = await requireCustomer();

  let job;
  try {
    job = await getCustomerJobDetail(profile.id, params.jobId);
  } catch (err) {
    if (err instanceof NotFoundError) notFound();
    throw err;
  }

  const canAccept = ["OPEN", "BIDDING"].includes(job.status);
  const visibleBids = job.bids.filter((b) => b.status !== "WITHDRAWN");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compare bids"
        description={job.title}
        action={
          <ButtonLink href={`/customer/jobs/${job.id}`} variant="outline">
            Back to job
          </ButtonLink>
        }
      />

      {!canAccept ? (
        <Alert tone="info">
          This job already has an accepted bid. Bids are shown for your records.
        </Alert>
      ) : null}

      <BidComparisonTable jobId={job.id} bids={visibleBids} canAccept={canAccept} />
    </div>
  );
}
