import Link from "next/link";
import { requireAdmin } from "@/lib/auth/current-user";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default async function AdminDashboardPage() {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <Link href="/" className="text-lg font-bold text-slate-900">
              EZ Bid
            </Link>
            <p className="text-sm text-slate-500">Admin dashboard</p>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Admin</h1>
          <p className="mt-2 text-slate-600">
            Signed in as {user.email}. Admin tools will be expanded in a later phase.
          </p>
        </div>
      </main>
    </div>
  );
}
