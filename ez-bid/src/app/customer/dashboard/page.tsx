import Link from "next/link";
import type { Metadata } from "next";
import { requireCustomer } from "@/lib/auth/current-user";
import { listCustomerJobs } from "@/lib/services/jobs";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { JobStatusBadge } from "@/components/ui/status-badge";

export const metadata: Metadata = {
  title: "Customer dashboard — EZ Bid",
};

const SERVICES = [
  "Lawn Mowing",
  "Landscaping",
  "Power Washing",
  "Handyman",
  "Tree Removal",
  "Junk Removal",
  "House Cleaning",
  "Plumbing",
  "Electrical",
  "HVAC",
];

function formatMemberSince(date: Date | null | undefined): string | null {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
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
      <span className={done ? "text-sm text-slate-700" : "text-sm text-slate-500"}>
        {label}
      </span>
    </li>
  );
}

export default async function CustomerDashboardPage() {
  const { user, profile } = await requireCustomer();
  const jobs = await listCustomerJobs(profile.id);

  const fullName = `${profile.firstName} ${profile.lastName}`.trim();
  const hasPhone = Boolean(profile.phone);
  const hasLocation = Boolean(profile.town && profile.state);
  const memberSince = formatMemberSince(user.createdAt);
  const location = [profile.town, profile.state].filter(Boolean).join(", ");

  const checklist = [
    { label: "Create customer account", done: true },
    { label: "Add phone number", done: hasPhone },
    { label: "Add town and state", done: hasLocation },
    { label: "Post first job", done: jobs.length > 0 },
    { label: "Review your first vendor", done: false },
  ];

  const bidsReceived = jobs.reduce((sum, job) => sum + job._count.bids, 0);
  const stats = [
    { label: "Open Jobs", value: jobs.filter((j) => j.status === "OPEN" || j.status === "BIDDING").length },
    { label: "Bids Received", value: bidsReceived },
    { label: "Jobs In Progress", value: jobs.filter((j) => j.status === "IN_PROGRESS" || j.status === "ACCEPTED").length },
    { label: "Completed Jobs", value: jobs.filter((j) => j.status === "COMPLETED").length },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-lg font-bold text-slate-900">
              EZ Bid
            </Link>
            <span className="hidden text-slate-300 sm:inline">/</span>
            <p className="hidden text-sm text-slate-500 sm:block">Customer dashboard</p>
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
                {profile.firstName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900">{fullName}</h1>
                  <Badge tone="green">Free during beta</Badge>
                </div>
                <dl className="mt-2 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
                  <div className="flex gap-2">
                    <dt className="text-slate-500">Email:</dt>
                    <dd className="text-slate-800">{user.email}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-slate-500">Account type:</dt>
                    <dd className="text-slate-800">Customer</dd>
                  </div>
                  {hasPhone ? (
                    <div className="flex gap-2">
                      <dt className="text-slate-500">Phone:</dt>
                      <dd className="text-slate-800">{profile.phone}</dd>
                    </div>
                  ) : null}
                  {location ? (
                    <div className="flex gap-2">
                      <dt className="text-slate-500">Location:</dt>
                      <dd className="text-slate-800">{location}</dd>
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
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Primary action + stats */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="bg-blue-600 lg:col-span-1">
            <CardContent className="flex h-full flex-col justify-between gap-4 pt-6 text-white">
              <div>
                <h2 className="text-lg font-bold">Post a New Job</h2>
                <p className="mt-1 text-sm text-blue-100">
                  Tell local vendors what you need done and start receiving bids.
                </p>
              </div>
              <div>
                <Link href="/customer/jobs/new">
                  <Button className="bg-white text-blue-700 hover:bg-blue-50">
                    Post a Job
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* My Jobs */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>My Jobs</CardTitle>
            {jobs.length > 0 ? (
              <Link href="/customer/jobs/new">
                <Button size="sm">Post a Job</Button>
              </Link>
            ) : null}
          </CardHeader>
          <CardContent className="pt-5">
            {jobs.length === 0 ? (
              <EmptyState
                title="No jobs yet"
                description="You have not posted any jobs yet. Post your first job to start receiving bids from local vendors."
                action={
                  <Link href="/customer/jobs/new">
                    <Button>Post your first job</Button>
                  </Link>
                }
              />
            ) : (
              <ul className="space-y-3">
                {jobs.map((job) => (
                  <li
                    key={job.id}
                    className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-semibold text-slate-900">{job.title}</h3>
                        <JobStatusBadge status={job.status} />
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        {job.serviceCategory.name} &middot; {job.town}, {job.state}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Service date: {formatShortDate(job.requestedServiceDate)} &middot; Posted{" "}
                        {formatShortDate(job.createdAt)}
                      </p>

                      {job._count.bids === 0 ? (
                        <p className="mt-2 text-xs text-slate-400">No bids yet</p>
                      ) : (
                        <div className="mt-3 rounded-md bg-slate-50 px-3 py-2">
                          <p className="text-xs font-semibold text-slate-600">
                            {job._count.bids} {job._count.bids === 1 ? "bid" : "bids"} received
                            {job.bids[0] ? (
                              <span className="font-normal text-slate-500">
                                {" "}
                                &middot; lowest ${job.bids[0].amount.toLocaleString()}
                              </span>
                            ) : null}
                          </p>
                          <ul className="mt-1 space-y-0.5">
                            {job.bids.map((bid) => (
                              <li
                                key={bid.id}
                                className="flex items-center justify-between text-xs text-slate-600"
                              >
                                <span className="min-w-0 truncate">
                                  {bid.vendor.businessName}
                                  {bid.vendor.reviewCount > 0 ? (
                                    <span className="ml-1 text-amber-600">
                                      {"\u2605"} {bid.vendor.averageRating.toFixed(1)}
                                    </span>
                                  ) : (
                                    <span className="ml-1 text-slate-400">· New</span>
                                  )}
                                </span>
                                <span className="ml-2 shrink-0 font-medium text-slate-800">
                                  ${bid.amount.toLocaleString()}
                                </span>
                              </li>
                            ))}
                          </ul>
                          {job._count.bids > job.bids.length ? (
                            <p className="mt-1 text-xs text-blue-600">
                              + {job._count.bids - job.bids.length} more bids
                            </p>
                          ) : null}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0">
                      <Link href={`/customer/jobs/${job.id}`}>
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

        {/* Privacy / Safety */}
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
              <h2 className="text-sm font-semibold text-emerald-900">Your privacy is protected</h2>
              <p className="mt-1 text-sm text-emerald-800">
                Your exact address and contact information stay private until you choose a
                vendor and the job is confirmed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recommended services */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended services</CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {SERVICES.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-600">
                    {service.charAt(0)}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{service}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Setup checklist + recent activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Account setup checklist</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <ul className="space-y-3">
                {checklist.map((item) => (
                  <CheckItem key={item.label} label={item.label} done={item.done} />
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <p className="text-sm text-slate-500">No recent activity yet.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
