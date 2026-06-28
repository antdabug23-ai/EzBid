import type { Metadata } from "next";
import {
  Trees,
  Sprout,
  SprayCan,
  Hammer,
  Droplets,
  AirVent,
  Zap,
  Trash2,
  Sparkles,
  Axe,
  CloudRain,
  Snowflake,
  Paintbrush,
  Construction,
  Layers,
  WashingMachine,
  Truck,
  Pickaxe,
  Warehouse,
  Leaf,
  Package,
  Waves,
  PaintBucket,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Services — EZ Bid",
  description:
    "Browse the home, property, and small business services available on EZ Bid. Find local vendors for landscaping, handyman work, cleaning, and more.",
};

type ServiceVisual = { Icon: LucideIcon; tint: string };

const SERVICE_VISUALS: Record<string, ServiceVisual> = {
  Landscaping: { Icon: Trees, tint: "bg-emerald-50 text-emerald-600" },
  "Lawn mowing": { Icon: Sprout, tint: "bg-lime-50 text-lime-600" },
  "Power washing": { Icon: SprayCan, tint: "bg-blue-50 text-blue-600" },
  "Handyman services": { Icon: Hammer, tint: "bg-orange-50 text-orange-600" },
  Plumbing: { Icon: Droplets, tint: "bg-sky-50 text-sky-600" },
  HVAC: { Icon: AirVent, tint: "bg-cyan-50 text-cyan-600" },
  "Electrical work": { Icon: Zap, tint: "bg-amber-50 text-amber-600" },
  "Junk removal": { Icon: Trash2, tint: "bg-stone-100 text-stone-600" },
  "House cleaning": { Icon: Sparkles, tint: "bg-violet-50 text-violet-600" },
  "Tree removal": { Icon: Axe, tint: "bg-emerald-50 text-emerald-700" },
  "Gutter cleaning": { Icon: CloudRain, tint: "bg-sky-50 text-sky-600" },
  "Snow removal": { Icon: Snowflake, tint: "bg-blue-50 text-blue-500" },
  Painting: { Icon: Paintbrush, tint: "bg-rose-50 text-rose-600" },
  "Fence repair": { Icon: Construction, tint: "bg-amber-50 text-amber-700" },
  "Deck repair": { Icon: Layers, tint: "bg-orange-50 text-orange-700" },
  "Appliance installation": { Icon: WashingMachine, tint: "bg-slate-100 text-slate-600" },
  "Moving help": { Icon: Truck, tint: "bg-indigo-50 text-indigo-600" },
  "Small demolition": { Icon: Pickaxe, tint: "bg-stone-100 text-stone-600" },
  "Garage cleanout": { Icon: Warehouse, tint: "bg-slate-100 text-slate-600" },
  "Yard cleanup": { Icon: Leaf, tint: "bg-lime-50 text-lime-600" },
  "Mulch installation": { Icon: Package, tint: "bg-amber-50 text-amber-700" },
  "Pressure washing": { Icon: Waves, tint: "bg-blue-50 text-blue-600" },
  "Driveway sealing": { Icon: PaintBucket, tint: "bg-zinc-100 text-zinc-700" },
};

function getVisual(name: string): ServiceVisual {
  return SERVICE_VISUALS[name] ?? { Icon: Wrench, tint: "bg-slate-100 text-slate-500" };
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

function ServiceCard({
  name,
  available,
}: {
  name: string;
  available: boolean;
}) {
  const { Icon, tint } = getVisual(name);

  return (
    <div
      className={`relative flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition ${
        available
          ? "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
          available ? tint : "bg-slate-200 text-slate-400"
        }`}
      >
        <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
      </span>

      <span
        className={`text-sm font-semibold ${
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
              Services you can request from local vendors today.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
