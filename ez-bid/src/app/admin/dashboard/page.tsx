import { requireAdmin } from "@/lib/auth/current-user";

export default async function AdminDashboardPage() {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-50">
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
