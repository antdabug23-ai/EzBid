import Link from "next/link";
import type { Metadata } from "next";
import { requireVendor } from "@/lib/auth/current-user";
import { getVendorServiceNames } from "@/lib/services/profile";
import { SERVICE_CATEGORIES } from "@/lib/validations/job";
import { Card, CardContent } from "@/components/ui/card";
import { VendorProfileForm } from "@/components/profile/VendorProfileForm";

export const metadata: Metadata = {
  title: "Edit Vendor Profile — EZ Bid",
};

export default async function VendorProfileEditPage() {
  const { user, profile } = await requireVendor();
  const selectedServices = await getVendorServiceNames(profile.id);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6">
          <Link
            href="/vendor/dashboard"
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            &larr; Back to dashboard
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">Edit vendor profile</h1>
          <p className="mt-1 text-sm text-slate-500">
            Update your business details and the services you offer. These appear on your public
            vendor profile.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <VendorProfileForm
              email={user.email}
              allServices={SERVICE_CATEGORIES}
              selectedServices={selectedServices}
              defaults={{
                businessName: profile.businessName ?? "",
                phone: profile.phone ?? "",
                town: profile.town ?? "",
                state: profile.state ?? "",
                description: profile.description ?? "",
                serviceAreaDescription: profile.serviceAreaDescription ?? "",
                website: profile.website ?? "",
              }}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
