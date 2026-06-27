import { requireVendor } from "@/lib/auth/current-user";
import { getVendorBids } from "@/lib/services/bids";
import { PageHeader, EmptyState, Alert } from "@/components/shared/states";
import { BidCard } from "@/components/bids/BidCard";
import { ButtonLink } from "@/components/ui/Button";

export default async function VendorBidsPage({
  searchParams,
}: {
  searchParams: { submitted?: string };
}) {
  const { profile } = await requireVendor();
  const bids = await getVendorBids(profile.id);
  const visible = bids.filter((b) => b.status !== "WITHDRAWN");

  return (
    <div className="space-y-6">
      <PageHeader
        title="My bids"
        description="Track the bids you've submitted."
        action={<ButtonLink href="/vendor/jobs" variant="outline">Browse jobs</ButtonLink>}
      />

      {searchParams.submitted ? <Alert tone="success">Your bid was submitted.</Alert> : null}

      {visible.length === 0 ? (
        <EmptyState
          title="No bids yet"
          description="Browse available jobs and submit your first bid."
          action={<ButtonLink href="/vendor/jobs">Browse jobs</ButtonLink>}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((bid) => (
            <BidCard
              key={bid.id}
              bidId={bid.id}
              amount={bid.amount}
              status={bid.status}
              createdAt={bid.createdAt}
              job={{
                id: bid.job.id,
                title: bid.job.title,
                town: bid.job.town,
                state: bid.job.state,
                status: bid.job.status,
                categoryName: bid.job.serviceCategory.name,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
