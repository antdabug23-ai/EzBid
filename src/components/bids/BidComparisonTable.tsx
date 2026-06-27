import Link from "next/link";
import type { BidStatus, ServiceWindow, VerificationStatus } from "@prisma/client";
import { Card, CardBody } from "@/components/ui/Card";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { RatingDisplay } from "@/components/reviews/RatingDisplay";
import { VerificationBadge } from "@/components/vendors/VerificationBadge";
import { BidStatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/states";
import { acceptBidAction } from "@/lib/actions/bids";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { SERVICE_WINDOW_LABELS } from "@/lib/utils/labels";

interface BidRow {
  id: string;
  amount: number;
  description: string | null;
  earliestAvailableDate: Date | null;
  proposedServiceDate: Date | null;
  proposedServiceWindow: ServiceWindow;
  estimatedTimeline: string | null;
  status: BidStatus;
  vendor: {
    id: string;
    businessName: string;
    verificationStatus: VerificationStatus;
    averageRating: number;
    reviewCount: number;
  };
}

interface BidComparisonTableProps {
  jobId: string;
  bids: BidRow[];
  canAccept: boolean;
}

export function BidComparisonTable({ jobId, bids, canAccept }: BidComparisonTableProps) {
  if (bids.length === 0) {
    return (
      <EmptyState
        title="No bids received yet"
        description="Vendors in your area will be able to bid on this job. Check back soon."
      />
    );
  }

  return (
    <div className="space-y-4">
      {bids.map((bid) => (
        <Card key={bid.id} className={bid.status === "ACCEPTED" ? "border-emerald-300" : undefined}>
          <CardBody className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/customer/vendors/${bid.vendor.id}`}
                    className="text-base font-semibold text-slate-900 hover:text-brand-700 hover:underline"
                  >
                    {bid.vendor.businessName}
                  </Link>
                  <VerificationBadge status={bid.vendor.verificationStatus} />
                </div>
                <div className="mt-1">
                  <RatingDisplay
                    rating={bid.vendor.averageRating}
                    count={bid.vendor.reviewCount}
                    size="sm"
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(bid.amount)}</p>
                <BidStatusBadge status={bid.status} />
              </div>
            </div>

            {bid.description ? <p className="text-sm text-slate-600">{bid.description}</p> : null}

            <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Earliest</dt>
                <dd className="font-medium text-slate-800">{formatDate(bid.earliestAvailableDate)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Proposed date</dt>
                <dd className="font-medium text-slate-800">{formatDate(bid.proposedServiceDate)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Window</dt>
                <dd className="font-medium text-slate-800">
                  {SERVICE_WINDOW_LABELS[bid.proposedServiceWindow]}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Timeline</dt>
                <dd className="font-medium text-slate-800">{bid.estimatedTimeline ?? "—"}</dd>
              </div>
            </dl>

            {canAccept && bid.status === "SUBMITTED" ? (
              <form action={acceptBidAction} className="flex justify-end">
                <input type="hidden" name="jobId" value={jobId} />
                <input type="hidden" name="bidId" value={bid.id} />
                <SubmitButton
                  pendingText="Accepting…"
                  confirm="Accept this bid? Other bids will be declined."
                >
                  Accept this bid
                </SubmitButton>
              </form>
            ) : null}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
