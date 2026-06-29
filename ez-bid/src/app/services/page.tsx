import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ServiceIllustration } from "@/components/services/ServiceIllustration";

export const metadata: Metadata = {
  title: "Services — EZ Bid",
  description:
    "Browse the home, property, and small business services available on EZ Bid. Find local vendors for landscaping, handyman work, cleaning, and more.",
};

// Soft tinted background behind each service illustration.
const SERVICE_TINTS: Record<string, string> = {
  // Available services
  Landscaping: "bg-emerald-50",
  "Lawn mowing": "bg-lime-50",
  "Power washing": "bg-blue-50",
  "Handyman services": "bg-orange-50",
  Plumbing: "bg-sky-50",
  HVAC: "bg-cyan-50",
  "Electrical work": "bg-amber-50",
  "Junk removal": "bg-stone-100",
  "House cleaning": "bg-violet-50",
  "Tree removal": "bg-emerald-50",
  "Gutter cleaning": "bg-sky-50",
  "Snow removal": "bg-blue-50",
  Painting: "bg-rose-50",
  "Fence repair": "bg-amber-50",
  "Deck repair": "bg-orange-50",
  "Appliance installation": "bg-slate-100",
  "Moving help": "bg-indigo-50",
  "Small demolition": "bg-stone-100",
  "Garage cleanout": "bg-slate-100",
  "Yard cleanup": "bg-lime-50",
  "Mulch installation": "bg-amber-50",
  "Pressure washing": "bg-blue-50",
  "Driveway sealing": "bg-zinc-100",
  // Coming soon services
  "Dog grooming": "bg-amber-50",
  "Pet sitting": "bg-orange-50",
  "Mobile car detailing": "bg-blue-50",
  "Pool cleaning": "bg-cyan-50",
  "Pest control": "bg-lime-50",
  Roofing: "bg-stone-100",
  Masonry: "bg-orange-50",
  "Concrete work": "bg-amber-50",
  "Window cleaning": "bg-sky-50",
  "Carpet cleaning": "bg-violet-50",
  Locksmith: "bg-yellow-50",
  "Security camera installation": "bg-slate-100",
  "Smart home setup": "bg-emerald-50",
  "Computer help": "bg-indigo-50",
  "Small engine repair": "bg-zinc-100",
};

function getTint(name: string): string {
  return SERVICE_TINTS[name] ?? "bg-slate-100";
}

// Maps a service card to a job-posting category. Categories must match the
// options in the job form (lib/validations/job.ts). Anything without a direct
// match falls back to "Other".
const SERVICE_CATEGORY: Record<string, string> = {
  Landscaping: "Landscaping",
  "Lawn mowing": "Lawn Mowing",
  "Power washing": "Power Washing",
  "Handyman services": "Handyman",
  Plumbing: "Plumbing",
  HVAC: "HVAC",
  "Electrical work": "Electrical",
  "Junk removal": "Junk Removal",
  "House cleaning": "House Cleaning",
  "Tree removal": "Tree Removal",
  "Gutter cleaning": "Other",
  "Snow removal": "Other",
  Painting: "Other",
  "Fence repair": "Handyman",
  "Deck repair": "Handyman",
  "Appliance installation": "Handyman",
  "Moving help": "Other",
  "Small demolition": "Other",
  "Garage cleanout": "Junk Removal",
  "Yard cleanup": "Landscaping",
  "Mulch installation": "Landscaping",
  "Pressure washing": "Power Washing",
  "Driveway sealing": "Other",
};

function getCategory(name: string): string {
  return SERVICE_CATEGORY[name] ?? "Other";
}

const availableServices = [
  "Landscaping",
  "Lawn mowing",
  "Power washing",
  "Handyman services",
  "Plumbing",
  "HVAC",
  "Electrical work",
  "Junk removal",
  "House cleaning",
  "Tree removal",
  "Gutter cleaning",
  "Snow removal",
  "Painting",
  "Fence repair",
  "Deck repair",
  "Appliance installation",
  "Moving help",
  "Small demolition",
  "Garage cleanout",
  "Yard cleanup",
  "Mulch installation",
  "Pressure washing",
  "Driveway sealing",
];

const comingSoonServices = [
  "Dog grooming",
  "Pet sitting",
  "Mobile car detailing",
  "Pool cleaning",
  "Pest control",
  "Roofing",
  "Masonry",
  "Concrete work",
  "Window cleaning",
  "Carpet cleaning",
  "Locksmith",
  "Security camera installation",
  "Smart home setup",
  "Computer help",
  "Small engine repair",
];

function ServiceCardInner({
  name,
  available,
}: {
  name: string;
  available: boolean;
}) {
  const tint = getTint(name);

  return (
    <>
      <span
        className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl ${
          available ? tint : "bg-slate-100"
        }`}
      >
        <ServiceIllustration name={name} muted={!available} />
      </span>

      <span
        className={`min-w-0 pr-20 text-sm font-semibold ${
          available ? "text-slate-800" : "text-slate-500"
        }`}
      >
        {name}
      </span>

      <span
        className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
          available ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
        }`}
      >
        {available ? (
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        ) : null}
        {available ? "Available" : "Coming soon"}
      </span>
    </>
  );
}

function ServiceCard({
  name,
  available,
}: {
  name: string;
  available: boolean;
}) {
  const base =
    "relative flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition";

  if (available) {
    return (
      <Link
        href={`/customer/jobs/new?service=${encodeURIComponent(getCategory(name))}`}
        className={`${base} border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
      >
        <ServiceCardInner name={name} available />
      </Link>
    );
  }

  return (
    <div className={`${base} border-slate-200 bg-slate-50`}>
      <ServiceCardInner name={name} available={false} />
    </div>
  );
}

export default function ServicesPage() {
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
            Services on EZ Bid
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Request bids from local independent vendors, small crews, and growing
            service businesses.
          </p>
        </div>
      </section>

      {/* Available services */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Available services
            </h2>
            <p className="mt-2 text-slate-600">
              Request bids from local independent vendors, small crews, and growing
              service businesses near you.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {availableServices.map((name) => (
              <ServiceCard key={name} name={name} available />
            ))}
          </div>
        </div>
      </section>

      {/* Built for local work */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-8 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Built for local work
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              A fair place for local vendors to earn work
            </h2>
            <p className="mt-3 max-w-3xl text-base text-slate-600">
              EZ Bid helps homeowners connect with independent service providers,
              small crews, and growing local businesses. Whether someone is starting
              with a lawn mower or building a full service company, EZ Bid gives local
              vendors a fair place to earn work and build reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Coming soon
            </h2>
            <p className="mt-2 text-slate-600">
              More service categories we plan to add.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {comingSoonServices.map((name) => (
              <ServiceCard key={name} name={name} available={false} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
