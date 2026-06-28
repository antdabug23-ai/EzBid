import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { UrgencyLevel } from "@prisma/client";
import { requireVendor } from "@/lib/auth/current-user";
import { getJobForVendor, getVendorBidForJob } from "@/lib/services/vendor";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobStatusBadge, BidStatusBadge } from "@/components/ui/status-badge";
import { SubmitBidForm } from "@/components/bids/SubmitBidForm";

export const metadata: Metadata = {
  title: "Job details — EZ Bid",
};

const URGENCY_LABEL: Record<UrgencyLevel, string> = {
  LOW: "Flexible",
  NORMAL: "Within 1 week",
  HIGH: "Within 48 hours",
  EMERGENCY: "Emergency",
};

const BIDDABLE = ["OPEN", "BIDDING"];

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

export default async function VendorJobDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ jobId: string }>;
  searchParams: Promise<{ bid?: string }>;
}) {
  const { jobId } = await params;
  const { bid: bidParam } = await searchParams;
  const { profile } = await requireVendor();

  const job = await getJobForVendor(jobId);
  if (!job) notFound();

  const existingBid = await getVendorBidForJob(profile.id, jobId);
  const isBiddable = BIDDABLE.includes(job.status);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-lg font-bold text-slate-900">
              EZ Bid
            </Link>
            <span className="hidden text-slate-300 sm:inline">/</span>
            <Link href="/vendor/jobs" className="hidden text-sm text-slate-500 hover:text-slate-700 sm:block">
              Available jobs
            </Link>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <div>
          <Link href="/vendor/jobs" className="text-sm text-slate-500 hover:text-slate-700">
            &larr; Back to available jobs
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
            <JobStatusBadge status={job.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500">{job.serviceCategory.name}</p>
        </div>

        {bidParam === "success" ? (
          <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Your bid has been submitted. You can update it anytime while the job is open.
          </div>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle>Job details</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <dl>
              <DetailRow label="Service category" value={job.serviceCategory.name} />
              <DetailRow label="Approximate location" value={`${job.town}, ${job.state}`} />
              <DetailRow label="Desired / earliest date" value={formatDate(job.requestedServiceDate)} />
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
            Only approximate location is shown during bidding. Exact address and customer contact
            information are shared only after the customer selects a vendor and the vendor confirms
            the job.
          </CardContent>
        </Card>

        {existingBid ? (
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Your current bid</CardTitle>
              <BidStatusBadge status={existingBid.status} />
            </CardHeader>
            <CardContent className="pt-2">
              <dl>
                <DetailRow label="Bid amount" value={`$${existingBid.amount.toLocaleString()}`} />
                <DetailRow label="Estimated start" value={formatDate(existingBid.proposedServiceDate)} />
                <DetailRow label="Completion time" value={existingBid.estimatedTimeline ?? "—"} />
              </dl>
              {existingBid.description ? (
                <p className="mt-3 whitespace-pre-line text-sm text-slate-600">
                  {existingBid.description}
                </p>
              ) : null}
            </CardContent>
          </Card>
        ) : null}

        {isBiddable ? (
          <Card>
            <CardHeader>
              <CardTitle>{existingBid ? "Update your bid" : "Submit a bid"}</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <SubmitBidForm
                jobId={job.id}
                isUpdate={Boolean(existingBid)}
                defaults={
                  existingBid
                    ? {
                        amount: String(existingBid.amount),
                        startDate: existingBid.proposedServiceDate
                          ? new Date(existingBid.proposedServiceDate).toISOString().slice(0, 10)
                          : "",
                        timeline: existingBid.estimatedTimeline ?? "",
                        message: existingBid.description ?? "",
                      }
                    : undefined
                }
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6 text-sm text-slate-600">
              This job is no longer accepting bids.
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
