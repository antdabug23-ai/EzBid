import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "About — EZ Bid",
  description:
    "EZ Bid is built to make local service hiring easier, faster, and more organized for both customers and local vendors.",
};

const beliefs = [
  "Local businesses matter",
  "Customers deserve simple options",
  "Privacy should be respected",
  "Vendors should have a fair way to find jobs",
  "The process should be simple and transparent",
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

export default function AboutPage() {
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
            About EZ Bid
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            EZ Bid is built to make local service hiring easier, faster, and more
            organized.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base text-slate-600">
            EZ Bid helps customers avoid calling around to multiple vendors by
            letting them post one job and compare bids in one place. It also
            helps local vendors find work that matches their service area and
            skills.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Our mission
            </h2>
            <p className="mt-4 max-w-3xl text-base text-slate-600">
              Make local service hiring easier for customers and better organized
              for vendors.
            </p>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              What we believe
            </h2>
            <p className="mt-2 text-slate-600">
              The principles that guide how we build EZ Bid.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <ul className="space-y-4">
              {beliefs.map((item) => (
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
