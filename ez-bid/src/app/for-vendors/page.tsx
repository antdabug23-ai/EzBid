import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "For Vendors — EZ Bid",
  description:
    "Find local jobs, submit bids, and grow your service business on EZ Bid. Create a profile, choose your services, and build trust through reviews.",
};

const vendorSteps = [
  { number: "1", title: "Create a profile", body: "Show who you are and what you do." },
  { number: "2", title: "Choose services", body: "Select the service categories you offer." },
  { number: "3", title: "View local jobs", body: "See jobs in your service area." },
  { number: "4", title: "Submit bids", body: "Send bids on the jobs you want." },
  { number: "5", title: "Build your reputation", body: "Win work and earn reviews." },
];

const goodFitFor = [
  "Landscapers",
  "Handymen",
  "Cleaners",
  "Junk removal companies",
  "Power washing businesses",
  "Contractors",
  "Independent service pros",
];

export default function ForVendorsPage() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Free during beta
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            For Vendors
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Find local jobs, submit bids, and grow your service business.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base text-slate-600">
            With EZ Bid, you can create a profile and view jobs in your service
            area, then submit bids on the work you want. Show your experience,
            photos, and service categories so customers get to know your
            business, and build trust over time through reviews.
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

      {/* Good fit for */}
      <section className="bg-white">
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
