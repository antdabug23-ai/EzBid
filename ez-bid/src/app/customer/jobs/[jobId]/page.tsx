import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { UrgencyLevel } from "@prisma/client";
import { requireCustomer } from "@/lib/auth/current-user";
import { getCustomerJob } from "@/lib/services/jobs";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobStatusBadge } from "@/components/ui/status-badge";

export const metadata: Metadata = {
  title: "Job details — EZ Bid",
};

const URGENCY_LABEL: Record<UrgencyLevel, string> = {
  LOW: "Flexible",
  NORMAL: "Within 1 week",
  HIGH: "Within 48 hours",
  EMERGENCY: "Emergency",
};

function formatDate(date: Date | null | undefined): string {
  if (!date) return "Not specified";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
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

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-slate-100 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-sm font-medium text-slate-800">{value}</dd>
    </div>
  );
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const { profile } = await requireCustomer();
  const job = await getCustomerJob(profile.id, jobId);

  if (!job) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-lg font-bold text-slate-900">
              EZ Bid
            </Link>
            <span className="hidden text-slate-300 sm:inline">/</span>
            <Link href="/customer/dashboard" className="hidden text-sm text-slate-500 hover:text-slate-700 sm:block">
              Dashboard
            </Link>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <div>
          <Link
            href="/customer/dashboard"
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            &larr; Back to dashboard
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
            <JobStatusBadge status={job.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500">{job.serviceCategory.name}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job details</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <dl>
              <DetailRow label="Service category" value={job.serviceCategory.name} />
              <DetailRow label="Approximate location" value={`${job.town}, ${job.state}`} />
              <DetailRow label="Status" value={<JobStatusBadge status={job.status} />} />
              <DetailRow
                label="Desired / earliest date"
                value={formatDate(job.requestedServiceDate)}
              />
              <DetailRow label="Budget range" value={formatBudget(job.budgetMin, job.budgetMax)} />
              <DetailRow label="Urgency" value={URGENCY_LABEL[job.urgencyLevel]} />
              <DetailRow label="Bids received" value={job._count.bids} />
              <DetailRow label="Posted" value={formatDate(job.createdAt)} />
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="whitespace-pre-line text-sm text-slate-700">{job.description}</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="pt-6 text-sm text-emerald-800">
            Your exact address and contact information stay private until you choose a vendor and
            the job is confirmed. Only your approximate location ({job.town}, {job.state}) is
            shared with vendors during bidding.
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
