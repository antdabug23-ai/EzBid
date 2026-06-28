import Link from "next/link";
import type { Metadata } from "next";
import { requireCustomer } from "@/lib/auth/current-user";
import { Card, CardContent } from "@/components/ui/card";
import { NewJobForm } from "@/components/jobs/NewJobForm";
import { SERVICE_CATEGORIES } from "@/lib/validations/job";

export const metadata: Metadata = {
  title: "Post a New Job — EZ Bid",
};

export default async function NewJobPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { profile } = await requireCustomer();
  const { service } = await searchParams;
  const presetService =
    service && (SERVICE_CATEGORIES as readonly string[]).includes(service)
      ? service
      : "";

  return (
    <div className="min-h-screen bg-slate-50">
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
              defaultServiceCategory={presetService}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
