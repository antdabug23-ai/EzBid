import Link from "next/link";
import type { Metadata } from "next";
import { requireCustomer } from "@/lib/auth/current-user";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Card, CardContent } from "@/components/ui/card";
import { NewJobForm } from "@/components/jobs/NewJobForm";

export const metadata: Metadata = {
  title: "Post a New Job — EZ Bid",
};

export default async function NewJobPage() {
  const { profile } = await requireCustomer();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-lg font-bold text-slate-900">
              EZ Bid
            </Link>
            <span className="hidden text-slate-300 sm:inline">/</span>
            <Link href="/customer/dashboard" className="hidden text-sm text-slate-500 hover:text-slate-700 sm:block">
              Dashboard
            </Link>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6">
          <Link
            href="/customer/dashboard"
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            &larr; Back to dashboard
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">Post a New Job</h1>
          <p className="mt-1 text-sm text-slate-500">
            Tell vendors what you need done. Your exact address and contact information stay
            private until you choose a vendor and the job is confirmed.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <NewJobForm
              defaultTown={profile.town ?? ""}
              defaultState={profile.state ?? ""}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
