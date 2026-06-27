import Link from "next/link";
import { requireVendor } from "@/lib/auth/current-user";
import { getVendorAcceptedJobs } from "@/lib/services/bids";
import { PageHeader, EmptyState } from "@/components/shared/states";
import { Card, CardBody } from "@/components/ui/Card";
import { JobStatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency } from "@/lib/utils/format";

export default async function VendorAcceptedJobsPage() {
  const { profile } = await requireVendor();
  const accepted = await getVendorAcceptedJobs(profile.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Accepted jobs"
        description="Jobs where your bid was accepted. Open a job to view the customer's address and contact details."
      />

      {accepted.length === 0 ? (
        <EmptyState
          title="No accepted jobs yet"
          description="When a customer accepts your bid, the job will appear here."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {accepted.map((bid) => {
            const unlocked = bid.job.finderFee?.status === "CONFIRMED";
            return (
              <Card key={bid.id}>
                <CardBody className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/vendor/jobs/${bid.job.id}`}
                        className="truncate text-base font-semibold text-slate-900 hover:text-brand-700 hover:underline"
                      >
                        {bid.job.title}
                      </Link>
                      <p className="text-sm text-slate-500">
                        {bid.job.serviceCategory.name} · {bid.job.town}, {bid.job.state}
                      </p>
                    </div>
                    <JobStatusBadge status={bid.job.status} />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Your bid</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(bid.amount)}</span>
                  </div>

                  <div
                    className={`rounded-lg p-2 text-xs ${
                      unlocked ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {unlocked
                      ? "Customer contact unlocked — open the job to view the address."
                      : "Open the job to view the customer's address and contact details."}
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
