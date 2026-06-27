import Link from "next/link";
import type { JobStatus, ServiceWindow, UrgencyLevel } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { JobStatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { formatBudgetRange, formatDate } from "@/lib/utils/format";
import { SERVICE_WINDOW_LABELS, URGENCY_LABELS } from "@/lib/utils/labels";

interface JobCardProps {
  href: string;
  title: string;
  categoryName: string;
  town: string;
  state: string;
  status: JobStatus;
  description?: string;
  budgetMin?: number | null;
  budgetMax?: number | null;
  requestedServiceDate?: Date | string | null;
  preferredServiceWindow?: ServiceWindow;
  urgencyLevel?: UrgencyLevel;
  bidCount?: number;
  footnote?: string;
}

export function JobCard({
  href,
  title,
  categoryName,
  town,
  state,
  status,
  description,
  budgetMin,
  budgetMax,
  requestedServiceDate,
  preferredServiceWindow,
  urgencyLevel,
  bidCount,
  footnote,
}: JobCardProps) {
  return (
    <Link href={href} className="block transition-transform hover:-translate-y-0.5">
      <Card className="h-full p-5 hover:border-brand-300 hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Badge tone="blue">{categoryName}</Badge>
            <h3 className="mt-2 truncate text-base font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500">
              {town}, {state}
            </p>
          </div>
          <JobStatusBadge status={status} />
        </div>

        {description ? (
          <p className="mt-3 line-clamp-2 text-sm text-slate-600">{description}</p>
        ) : null}

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Budget</dt>
            <dd className="font-medium text-slate-800">{formatBudgetRange(budgetMin, budgetMax)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Requested date</dt>
            <dd className="font-medium text-slate-800">{formatDate(requestedServiceDate)}</dd>
          </div>
          {preferredServiceWindow ? (
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400">Window</dt>
              <dd className="font-medium text-slate-800">
                {SERVICE_WINDOW_LABELS[preferredServiceWindow]}
              </dd>
            </div>
          ) : null}
          {urgencyLevel ? (
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-400">Urgency</dt>
              <dd className="font-medium text-slate-800">{URGENCY_LABELS[urgencyLevel]}</dd>
            </div>
          ) : null}
        </dl>

        {(bidCount !== undefined || footnote) ? (
          <div className="mt-4 border-t border-slate-100 pt-3 text-sm text-slate-500">
            {bidCount !== undefined ? (
              <span>
                {bidCount} {bidCount === 1 ? "bid" : "bids"}
              </span>
            ) : null}
            {footnote ? <span>{footnote}</span> : null}
          </div>
        ) : null}
      </Card>
    </Link>
  );
}
