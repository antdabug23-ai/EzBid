import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "How It Works — EZ Bid",
  description:
    "Learn how EZ Bid connects customers and local vendors: post a job, compare bids, choose a vendor, and get the work done. Free during beta.",
};

const customerSteps = [
  { number: "1", title: "Post a job", body: "Describe the work you need done." },
  {
    number: "2",
    title: "Vendors submit bids",
    body: "Local vendors review your job and send bids.",
  },
  {
    number: "3",
    title: "Compare your options",
    body: "Compare price, availability, and profile info.",
  },
  { number: "4", title: "Choose a vendor", body: "Pick the vendor that fits your needs." },
  {
    number: "5",
    title: "Complete the job",
    body: "Finish the work and leave a review.",
  },
];

const vendorSteps = [
  {
    number: "1",
    title: "Create a vendor profile",
    body: "Set up your profile to show who you are.",
  },
  {
    number: "2",
    title: "Select service categories",
    body: "Choose the services you offer.",
  },
  {
    number: "3",
    title: "Browse available jobs",
    body: "See local jobs that match your services.",
  },
  { number: "4", title: "Submit bids", body: "Send bids on the jobs you want." },
  {
    number: "5",
    title: "Win work and build reviews",
    body: "Get hired and grow your reputation.",
  },
];

const faqs = [
  {
    q: "Is EZ Bid free during beta?",
    a: "Yes, the MVP/beta is free to use for now.",
  },
  {
    q: "Do customers have to share their exact address right away?",
    a: "No, the app is designed to limit exact location sharing early in the process.",
  },
  {
    q: "Can vendors choose which jobs to bid on?",
    a: "Yes, vendors can review available jobs and decide where to submit bids.",
  },
];

function StepList({
  steps,
  tone,
}: {
  steps: { number: string; title: string; body: string }[];
  tone: string;
}) {
  return (
    <ol className="mt-6 space-y-5">
      {steps.map((step) => (
        <li key={step.number} className="flex items-start gap-4">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${tone}`}
          >
            {step.number}
          </span>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {step.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function HowItWorksPage() {
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
            How EZ Bid Works
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            A simple way for customers and local vendors to connect.
          </p>
        </div>
      </section>

      {/* Customer / Vendor flows */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-2">
          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">For Customers</h2>
            <p className="mt-2 text-sm text-slate-600">
              From posting a job to leaving a review.
            </p>
            <StepList steps={customerSteps} tone="bg-blue-100 text-blue-700" />
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">For Vendors</h2>
            <p className="mt-2 text-sm text-slate-600">
              From building a profile to winning work.
            </p>
            <StepList
              steps={vendorSteps}
              tone="bg-emerald-100 text-emerald-700"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-slate-600">
              A few quick answers about using EZ Bid.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {faq.q}
                </h3>
                <p className="mt-3 text-sm text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
