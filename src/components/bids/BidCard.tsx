import Link from "next/link";
import type { BidStatus, JobStatus } from "@prisma/client";
import { Card, CardBody } from "@/components/ui/Card";
import { BidStatusBadge, JobStatusBadge } from "@/components/shared/StatusBadge";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { withdrawBidAction } from "@/lib/actions/bids";
import { formatCurrency, formatRelativeDate } from "@/lib/utils/format";

interface BidCardProps {
  bidId: string;
  amount: number;
  status: BidStatus;
  createdAt: Date;
  job: {
    id: string;
    title: string;
    town: string;
    state: string;
    status: JobStatus;
    categoryName: string;
  };
}

export function BidCard({ bidId, amount, status, createdAt, job }: BidCardProps) {
  return (
    <Card>
      <CardBody className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/vendor/jobs/${job.id}`}
              className="truncate text-base font-semibold text-slate-900 hover:text-brand-700 hover:underline"
            >
              {job.title}
            </Link>
            <p className="text-sm text-slate-500">
              {job.categoryName} · {job.town}, {job.state}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-slate-900">{formatCurrency(amount)}</p>
            <BidStatusBadge status={status} />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            Job: <JobStatusBadge status={job.status} />
          </span>
          <span>Bid {formatRelativeDate(createdAt)}</span>
        </div>

        {status === "SUBMITTED" ? (
          <form action={withdrawBidAction} className="flex justify-end">
            <input type="hidden" name="bidId" value={bidId} />
            <SubmitButton
              variant="outline"
              size="sm"
              pendingText="Withdrawing…"
              confirm="Withdraw this bid?"
            >
              Withdraw bid
            </SubmitButton>
          </form>
        ) : null}
      </CardBody>
    </Card>
  );
}
