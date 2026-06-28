import Link from "next/link";
import type { Metadata } from "next";
import { requireVendor } from "@/lib/auth/current-user";
import { listVendorBids, getVendorStats } from "@/lib/services/vendor";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { StarRating } from "@/components/ui/star-rating";
import { BidStatusBadge } from "@/components/ui/status-badge";

export const metadata: Metadata = {
  title: "Vendor dashboard — EZ Bid",
};

function formatMemberSince(date: Date | null | undefined): string | null {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatShortDate(date: Date | null | undefined): string {
  if (!date) return "Flexible";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CheckItem({ label, done }: { label: string; done: boolean }) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={
          done
            ? "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
            : "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white"
        }
        aria-hidden="true"
      >
        {done ? (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.29 6.8-6.79a1 1 0 011.4 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : null}
      </span>
      <span className={done ? "text-sm text-slate-700" : "text-sm text-slate-500"}>{label}</span>
    </li>
  );
}

export default async function VendorDashboardPage() {
  const { user, profile } = await requireVendor();
  const [bids, stats] = await Promise.all([
    listVendorBids(profile.id),
    getVendorStats(profile.id),
  ]);

  const memberSince = formatMemberSince(user.createdAt);
  const serviceArea =
    profile.serviceAreaDescription ||
    [profile.town, profile.state].filter(Boolean).join(", ");
  const hasBusinessProfile = Boolean(
    profile.description || profile.serviceAreaDescription || (profile.town && profile.state)
  );

  const statCards = [
    { label: "Available Jobs", value: stats.availableJobs },
    { label: "Bids Submitted", value: stats.bidsSubmitted },
    { label: "Jobs Won", value: stats.jobsWon },
    { label: "Completed Jobs", value: stats.completedJobs },
  ];

  const checklist = [
    { label: "Create vendor account", done: true },
    { label: "Complete business profile", done: hasBusinessProfile },
    { label: "Browse available jobs", done: stats.bidsSubmitted > 0 },
    { label: "Submit first bid", done: stats.bidsSubmitted > 0 },
    { label: "Complete first job", done: stats.completedJobs > 0 },
    { label: "Receive first review", done: profile.reviewCount > 0 },
  ];

  const recentBids = bids.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-lg font-bold text-slate-900">
              EZ Bid
            </Link>
            <span className="hidden text-slate-300 sm:inline">/</span>
            <p className="hidden text-sm text-slate-500 sm:block">Vendor dashboard</p>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        {/* Profile summary */}
        <Card>
          <CardContent className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                {profile.businessName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900">{profile.businessName}</h1>
                  <Badge tone="green">Free during beta</Badge>
                </div>
                <div className="mt-1">
                  <StarRating rating={profile.averageRating} count={profile.reviewCount} />
                </div>
                <dl className="mt-2 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
                  <div className="flex gap-2">
                    <dt className="text-slate-500">Email:</dt>
                    <dd className="text-slate-800">{user.email}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-slate-500">Account type:</dt>
                    <dd className="text-slate-800">Vendor</dd>
                  </div>
                  {profile.phone ? (
                    <div className="flex gap-2">
                      <dt className="text-slate-500">Phone:</dt>
                      <dd className="text-slate-800">{profile.phone}</dd>
                    </div>
                  ) : null}
                  {serviceArea ? (
                    <div className="flex gap-2">
                      <dt className="text-slate-500">Service area:</dt>
                      <dd className="text-slate-800">{serviceArea}</dd>
                    </div>
                  ) : null}
                  {memberSince ? (
                    <div className="flex gap-2">
                      <dt className="text-slate-500">Member since:</dt>
                      <dd className="text-slate-800">{memberSince}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>
            <div className="shrink-0">
              <Button variant="outline" size="sm" disabled title="Available soon">
                Edit Vendor Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Primary action + stats */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="bg-blue-600 lg:col-span-1">
            <CardContent className="flex h-full flex-col justify-between gap-4 pt-6 text-white">
              <div>
                <h2 className="text-lg font-bold">Find Jobs to Bid</h2>
                <p className="mt-1 text-sm text-blue-100">
                  Browse open customer jobs in your service area and submit bids.
                </p>
              </div>
              <div>
                <Link href="/vendor/jobs">
                  <Button className="bg-white text-blue-700 hover:bg-blue-50">
                    View Available Jobs
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {statCards.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* My Bids */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>My Bids</CardTitle>
            {bids.length > 0 ? (
              <Link href="/vendor/bids">
                <Button variant="outline" size="sm">
                  View all
                </Button>
              </Link>
            ) : null}
          </CardHeader>
          <CardContent className="pt-5">
            {recentBids.length === 0 ? (
              <EmptyState
                title="No bids yet"
                description="You have not submitted any bids yet. Browse available jobs to get started."
                action={
                  <Link href="/vendor/jobs">
                    <Button>Browse Available Jobs</Button>
                  </Link>
                }
              />
            ) : (
              <ul className="space-y-3">
                {recentBids.map((bid) => (
                  <li
                    key={bid.id}
                    className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
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
          </CardContent>
        </Card>

        {/* Trust / Privacy */}
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="flex items-start gap-3 pt-6">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
              aria-hidden="true"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 1l7 3v5c0 4.5-3 8.6-7 9.9C6 17.6 3 13.5 3 9V4l7-3zm3.7 6.3a1 1 0 00-1.4-1.4L9 9.2 7.7 7.9a1 1 0 10-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <div>
              <h2 className="text-sm font-semibold text-emerald-900">Customer privacy</h2>
              <p className="mt-1 text-sm text-emerald-800">
                Customer exact address and contact information stay private during bidding.
                Details are only shared after the customer selects a bid and the vendor confirms
                the job.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>Vendor setup checklist</CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <ul className="space-y-3">
              {checklist.map((item) => (
                <CheckItem key={item.label} label={item.label} done={item.done} />
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
