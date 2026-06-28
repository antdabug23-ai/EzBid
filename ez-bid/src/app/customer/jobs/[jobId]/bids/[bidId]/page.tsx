import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireCustomer } from "@/lib/auth/current-user";
import { getCustomerBid } from "@/lib/services/jobs";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { BidStatusBadge } from "@/components/ui/status-badge";

export const metadata: Metadata = {
  title: "Review bid — EZ Bid",
};

function formatDate(date: Date | null | undefined): string {
  if (!date) return "Not specified";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-slate-100 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-sm font-medium text-slate-800">{value}</dd>
    </div>
  );
}

export default async function BidReviewPage({
  params,
}: {
  params: Promise<{ jobId: string; bidId: string }>;
}) {
  const { jobId, bidId } = await params;
  const { profile } = await requireCustomer();
  const bid = await getCustomerBid(profile.id, jobId, bidId);

  if (!bid) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-lg font-bold text-slate-900">
              EZ Bid
            </Link>
            <span className="hidden text-slate-300 sm:inline">/</span>
            <Link
              href={`/customer/jobs/${jobId}`}
              className="hidden text-sm text-slate-500 hover:text-slate-700 sm:block"
            >
              Job
            </Link>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <div>
          <Link
            href={`/customer/jobs/${jobId}`}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            &larr; Back to job
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Review bid</h1>
            <BidStatusBadge status={bid.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500">{bid.job.title}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              <Link
                href={`/vendors/${bid.vendor.id}`}
                className="text-blue-600 hover:underline"
              >
                {bid.vendor.businessName}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <StarRating rating={bid.vendor.averageRating} count={bid.vendor.reviewCount} />
            <dl>
              <DetailRow label="Bid amount" value={`$${bid.amount.toLocaleString()}`} />
              <DetailRow label="Estimated start" value={formatDate(bid.proposedServiceDate)} />
              <DetailRow label="Completion time" value={bid.estimatedTimeline ?? "—"} />
              <DetailRow label="Submitted" value={formatDate(bid.createdAt)} />
            </dl>
            {bid.description ? (
              <div>
                <p className="text-sm font-medium text-slate-700">Vendor message</p>
                <p className="mt-1 whitespace-pre-line text-sm text-slate-600">
                  {bid.description}
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="pt-6 text-sm text-emerald-800">
            Your exact address and contact information stay private until you select a vendor and
            the vendor confirms the job.
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Link href={`/customer/jobs/${jobId}`}>
            <Button variant="outline">Back to Job</Button>
          </Link>
          <Link href={`/vendors/${bid.vendor.id}`}>
            <Button variant="outline">View Vendor Profile</Button>
          </Link>
          <Button disabled title="Available in the next phase">
            Select This Bid
          </Button>
        </div>
        <p className="text-xs text-slate-400">
          Vendor selection and final confirmation will be added in the next phase.
        </p>
      </main>
    </div>
  );
}
