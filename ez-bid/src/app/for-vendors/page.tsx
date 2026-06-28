import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "For Vendors — EZ Bid",
  description:
    "Start small, build reviews, and grow your business on EZ Bid. Built for local independent workers and small crews — find nearby jobs and earn work during beta.",
};

const vendorSteps = [
  { number: "1", title: "Create a profile", body: "Show who you are and what you do." },
  { number: "2", title: "Choose services", body: "Select the service categories you offer." },
  { number: "3", title: "View local jobs", body: "See jobs in your service area." },
  { number: "4", title: "Submit bids", body: "Send bids on the jobs you want." },
  { number: "5", title: "Build your reputation", body: "Win work and earn reviews." },
];

const goodFitFor = [
  "Solo landscapers",
  "Handymen",
  "Cleaners and small crews",
  "Junk removal",
  "Weekend power washers",
  "Independent contractors",
  "Side hustlers going full-time",
  "Small family-run businesses",
];

const growthPoints = [
  {
    title: "Find nearby jobs",
    body: "Browse open customer jobs in your service area and pick the work you want.",
  },
  {
    title: "Submit bids during beta",
    body: "Send bids on jobs that fit your skills. EZ Bid is free for vendors during beta.",
  },
  {
    title: "Build customer reviews",
    body: "Complete jobs and earn honest reviews that show new customers you do good work.",
  },
  {
    title: "Grow from side work to a real business",
    body: "Start small, build a reputation one job at a time, and grow at your own pace.",
  },
];

export default function ForVendorsPage() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900">

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Free during beta
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Start small. Build reviews. Grow your business.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Whether you are mowing lawns with your dad&apos;s mower, power washing
            driveways on weekends, or growing a small crew, EZ Bid helps you find
            local jobs and build your reputation.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base text-slate-600">
            Create a profile and view jobs in your service area, then submit bids
            on the work you want. Show your experience, photos, and service
            categories so customers get to know your business, and build trust over
            time through reviews — no big marketing budget needed.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M19 8v6M22 11h-6" />
              </svg>
              Join as a Vendor
            </a>
          </div>
        </div>
      </section>

      {/* How it works for vendors */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              How it works for vendors
            </h2>
            <p className="mt-2 text-slate-600">
              Five simple steps to start winning work.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {vendorSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-base font-bold text-emerald-700">
                  {step.number}
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for the little guy */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Built for the little guy
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              A fair place to compete for nearby jobs
            </h2>
            <p className="mt-2 text-slate-600">
              EZ Bid is built for local independent workers and small crews.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {growthPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good fit for */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Good fit for
            </h2>
            <p className="mt-2 text-slate-600">
              EZ Bid works well for a wide range of local service pros.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {goodFitFor.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
