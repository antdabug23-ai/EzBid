import Link from "next/link";
import type { Metadata } from "next";
import { requireVendor } from "@/lib/auth/current-user";
import { listVendorBids } from "@/lib/services/vendor";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { BidStatusBadge } from "@/components/ui/status-badge";

export const metadata: Metadata = {
  title: "My bids — EZ Bid",
};

function formatShortDate(date: Date | null | undefined): string {
  if (!date) return "Flexible";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function VendorBidsPage() {
  const { profile } = await requireVendor();
  const bids = await listVendorBids(profile.id);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
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

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <Link href="/vendor/dashboard" className="text-sm text-slate-500 hover:text-slate-700">
            &larr; Back to dashboard
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">My bids</h1>
          <p className="mt-1 text-sm text-slate-500">Bids you have submitted to customers.</p>
        </div>

        {bids.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <EmptyState
                title="No bids yet"
                description="You have not submitted any bids yet. Browse available jobs to get started."
                action={
                  <Link href="/vendor/jobs">
                    <Button>Browse Available Jobs</Button>
                  </Link>
                }
              />
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-3">
            {bids.map((bid) => (
              <li
                key={bid.id}
                className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate font-semibold text-slate-900">{bid.job.title}</h3>
                    <BidStatusBadge status={bid.status} />
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {bid.job.serviceCategory.name} &middot; {bid.job.town}, {bid.job.state}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Bid: ${bid.amount.toLocaleString()} &middot; Start:{" "}
                    {formatShortDate(bid.proposedServiceDate)} &middot; Submitted{" "}
                    {formatShortDate(bid.createdAt)}
                  </p>
                </div>
                <div className="shrink-0">
                  <Link href={`/vendor/jobs/${bid.job.id}`}>
                    <Button variant="outline" size="sm">
                      View Job
                    </Button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
