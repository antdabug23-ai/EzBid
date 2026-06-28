import Link from "next/link";
import { requireVendor } from "@/lib/auth/current-user";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default async function VendorDashboardPage() {
  const { user, profile } = await requireVendor();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <Link href="/" className="text-lg font-bold text-slate-900">
              EZ Bid
            </Link>
            <p className="text-sm text-slate-500">Vendor dashboard</p>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome, {profile.businessName}!
          </h1>
          <p className="mt-2 text-slate-600">
            You are signed in as a vendor ({user.email}). Browsing jobs and submitting bids
            will be available in the next phase.
          </p>
          <p className="mt-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Free during beta
          </p>
        </div>
      </main>
    </div>
  );
}
