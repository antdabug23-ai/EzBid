import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "EZ Bid — Find trusted local service vendors faster",
  description:
    "EZ Bid helps customers post jobs, compare bids, and connect with local vendors for home and property services. Free during beta.",
};

type Service = {
  name: string;
  color: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    name: "Landscaping",
    color: "text-emerald-600",
    icon: (
      <path d="M12 2C9 6 8 9 8 12a4 4 0 0 0 8 0c0-3-1-6-4-10ZM12 12v9" />
    ),
  },
  {
    name: "Power Washing",
    color: "text-blue-600",
    icon: (
      <path d="M3 21h6m-3 0v-5m0 0a3 3 0 0 0 3-3V5l8-3v6M9 13H6m12-5 2 1m-2 3 2 1" />
    ),
  },
  {
    name: "Handyman",
    color: "text-amber-600",
    icon: (
      <path d="m14 7 3-3 4 4-3 3m-4-4-9 9v4h4l9-9m-4-4 4 4" />
    ),
  },
  {
    name: "Plumbing",
    color: "text-sky-600",
    icon: (
      <path d="M9 3v6a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V3M6 3h6m3 0h3m-9 12v6m-3 0h6" />
    ),
  },
  {
    name: "HVAC",
    color: "text-red-500",
    icon: (
      <path d="M12 12V2m0 10c3 0 8-1 9-3M12 12c-3 0-8-1-9-3m9 3c1.5 2.6 3 7 2 9m-2-9c-1.5 2.6-3 7-2 9" />
    ),
  },
  {
    name: "Electrical",
    color: "text-yellow-500",
    icon: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  },
  {
    name: "Junk Removal",
    color: "text-violet-600",
    icon: (
      <path d="M3 7h13v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm13 2h3l2 3v3a2 2 0 0 1-2 2h-1M7 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    ),
  },
  {
    name: "House Cleaning",
    color: "text-teal-600",
    icon: (
      <path d="M8 21h8m-4-4v4M6 3h6l1 8H5l1-8Zm6 0 6 2-1 6" />
    ),
  },
];

const steps = [
  {
    number: "1",
    title: "Post your job",
    body: "Customers describe the work they need done.",
    tone: "bg-blue-100 text-blue-700",
  },
  {
    number: "2",
    title: "Compare bids",
    body: "Local vendors submit bids for the job.",
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    number: "3",
    title: "Choose your vendor",
    body: "Customers choose the best fit and move forward.",
    tone: "bg-amber-100 text-amber-700",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Free during beta
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Find trusted local service vendors faster.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              EZ Bid helps customers post jobs, compare bids, and connect with
              local vendors for home and property services.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
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
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Post a Job
              </a>
              <a
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
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

          {/* Visual area */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-sky-500 p-8 shadow-xl">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-white/10" />
              <div className="relative space-y-4">
                <div className="rounded-2xl bg-white/95 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    New Job
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Backyard lawn care &amp; cleanup
                  </p>
                  <p className="text-xs text-slate-500">Posted just now</p>
                </div>
                <div className="rounded-2xl bg-white/95 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      3 local bids
                    </p>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      Comparing
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">GreenLeaf Lawn Co.</span>
                      <span className="font-semibold text-slate-900">$180</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Yardworks Pros</span>
                      <span className="font-semibold text-slate-900">$210</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Tidy Outdoors</span>
                      <span className="font-semibold text-slate-900">$165</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white"
                >
                  Choose your vendor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              How It Works
            </h2>
            <p className="mt-2 text-slate-600">
              Three simple steps to get your job done.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center md:text-left">
                <div className="flex items-center justify-center gap-3 md:justify-start">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold ${step.tone}`}
                  >
                    {step.number}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-slate-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section id="services" className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Popular Services
            </h2>
            <p className="mt-2 text-slate-600">
              Find help for your home and property needs.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`h-9 w-9 ${service.color}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {service.icon}
                </svg>
                <span className="mt-3 text-sm font-semibold text-slate-800">
                  {service.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer / Vendor split */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-2">
          <div
            id="for-customers"
            className="rounded-3xl border border-blue-100 bg-blue-50/60 p-8"
          >
            <h3 className="text-xl font-bold text-slate-900">For Customers</h3>
            <ul className="mt-6 space-y-4">
              {["Post jobs", "Compare bids", "Choose local vendors"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
            <a
              href="/signup"
              className="mt-8 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Post a Job
            </a>
          </div>

          <div
            id="for-vendors"
            className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-8"
          >
            <h3 className="text-xl font-bold text-slate-900">For Vendors</h3>
            <ul className="mt-6 space-y-4">
              {["Create a profile", "Find local jobs", "Submit bids"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
            <a
              href="/signup"
              className="mt-8 inline-flex rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Join as a Vendor
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Ready to try EZ Bid?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Start by posting a job or joining as a local vendor.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
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
                <path d="M12 5v14M5 12h14" />
              </svg>
              Post a Job
            </a>
            <a
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/70 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
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

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
