import Link from "next/link";
import type { Metadata } from "next";
import type { UrgencyLevel } from "@prisma/client";
import { requireVendor } from "@/lib/auth/current-user";
import { listAvailableJobs } from "@/lib/services/vendor";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { JobStatusBadge } from "@/components/ui/status-badge";

export const metadata: Metadata = {
  title: "Available jobs — EZ Bid",
};

const URGENCY_LABEL: Record<UrgencyLevel, string> = {
  LOW: "Flexible",
  NORMAL: "Within 1 week",
  HIGH: "Within 48 hours",
  EMERGENCY: "Emergency",
};

function formatShortDate(date: Date | null | undefined): string {
  if (!date) return "Flexible";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatBudget(min: number | null, max: number | null): string {
  if (min == null && max == null) return "Not sure yet";
  if (min == null && max != null) return `Under $${max.toLocaleString()}`;
  if (min != null && max == null) return `$${min.toLocaleString()}+`;
  return `$${min!.toLocaleString()} - $${max!.toLocaleString()}`;
}

function preview(text: string, max = 160): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

export default async function VendorJobsPage() {
  await requireVendor();
  const jobs = await listAvailableJobs();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-lg font-bold text-slate-900">
              EZ Bid
            </Link>
            <span className="hidden text-slate-300 sm:inline">/</span>
            <Link href="/vendor/dashboard" className="hidden text-sm text-slate-500 hover:text-slate-700 sm:block">
              Dashboard
            </Link>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6">
          <Link href="/vendor/dashboard" className="text-sm text-slate-500 hover:text-slate-700">
            &larr; Back to dashboard
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">Available jobs</h1>
          <p className="mt-1 text-sm text-slate-500">
            Browse open customer jobs in your area and submit bids. Only approximate location is
            shown during bidding.
          </p>
        </div>

        {jobs.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <EmptyState
                title="No open jobs"
                description="No open jobs are available right now. Check back soon."
              />
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {jobs.map((job) => (
              <Card key={job.id} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col gap-3 pt-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-slate-900">{job.title}</h2>
                    <JobStatusBadge status={job.status} />
                  </div>
                  <p className="text-sm text-slate-500">{job.serviceCategory.name}</p>
                  <p className="text-sm text-slate-600">{preview(job.description)}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge tone="neutral">{job.town}, {job.state}</Badge>
                    <Badge tone="blue">{formatBudget(job.budgetMin, job.budgetMax)}</Badge>
                    <Badge tone="amber">{URGENCY_LABEL[job.urgencyLevel]}</Badge>
                  </div>
                  <p className="text-xs text-slate-400">
                    Service date: {formatShortDate(job.requestedServiceDate)} &middot; Bids:{" "}
                    {job._count.bids} &middot; Posted {formatShortDate(job.createdAt)}
                  </p>
                  <div className="mt-auto pt-2">
                    <Link href={`/vendor/jobs/${job.id}`}>
                      <Button size="sm" className="w-full sm:w-auto">
                        View Job
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
