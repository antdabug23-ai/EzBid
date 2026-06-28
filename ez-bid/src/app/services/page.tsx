import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Services — EZ Bid",
  description:
    "Browse the home, property, and small business services available on EZ Bid. Find local vendors for landscaping, handyman work, cleaning, and more.",
};

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

function ServiceCard({
  name,
  available,
}: {
  name: string;
  available: boolean;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-5 shadow-sm transition ${
        available
          ? "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-base font-bold ${
            available
              ? "bg-blue-100 text-blue-700"
              : "bg-slate-200 text-slate-500"
          }`}
        >
          {name.charAt(0)}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
            available
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {available ? "Available" : "Coming soon"}
        </span>
      </div>
      <span
        className={`mt-4 text-sm font-semibold ${
          available ? "text-slate-800" : "text-slate-500"
        }`}
      >
        {name}
      </span>
    </div>
  );
}

export default function ServicesPage() {
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
            Services on EZ Bid
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Find local vendors for common home, property, and small business
            service needs.
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
              Services you can request from local vendors today.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {availableServices.map((name) => (
              <ServiceCard key={name} name={name} available />
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Coming soon
            </h2>
            <p className="mt-2 text-slate-600">
              More service categories we plan to add.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
