import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "For Customers — EZ Bid",
  description:
    "Post a job, compare local bids, and choose the vendor that fits your needs while keeping your personal information protected during early review.",
};

const customerSteps = [
  { number: "1", title: "Describe the job", body: "Tell vendors what you need done." },
  { number: "2", title: "Add photos and details", body: "Help vendors understand the work." },
  { number: "3", title: "Review bids", body: "See bids from local vendors in one place." },
  { number: "4", title: "Choose a vendor", body: "Pick the vendor that fits your needs." },
  { number: "5", title: "Move forward", body: "Connect and move forward with the job." },
];

const privacyPoints = [
  "Approximate location first",
  "Exact address hidden early",
  "Compare bids before choosing",
  "Contact details protected during early review",
  "Customer chooses who moves forward",
];

const whyPoints = [
  "Save time",
  "Compare local vendors",
  "Avoid calling multiple businesses",
  "Keep job details organized",
  "Make a more informed choice",
];

function CheckIcon() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
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
  );
}

export default function ForCustomersPage() {
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
            For Customers
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            EZ Bid helps you compare bids from local independent vendors and small
            service businesses, not just big companies with big marketing budgets.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base text-slate-600">
            EZ Bid is built to protect your privacy. You stay in control. Your exact
            address and contact information stay private until you choose a vendor and
            the job is confirmed. That means you can compare local vendors while
            keeping your personal information limited during early bidding — and
            support local people building real businesses at the same time.
          </p>
          <div className="mt-8 flex justify-center">
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
          </div>
        </div>
      </section>

      {/* How it works for customers */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              How it works for customers
            </h2>
            <p className="mt-2 text-slate-600">
              Five simple steps from job to hire.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {customerSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-base font-bold text-blue-700">
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

      {/* Privacy + Why customers */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-2">
          <div className="rounded-3xl border border-blue-100 bg-blue-50/60 p-8">
            <h3 className="text-xl font-bold text-slate-900">
              Privacy-first job posting
            </h3>
            <ul className="mt-6 space-y-4">
              {privacyPoints.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Why customers use EZ Bid
            </h3>
            <ul className="mt-6 space-y-4">
              {whyPoints.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
