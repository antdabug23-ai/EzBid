import Link from "next/link";
import type { Metadata } from "next";
import { requireCustomer } from "@/lib/auth/current-user";
import { Card, CardContent } from "@/components/ui/card";
import { CustomerProfileForm } from "@/components/profile/CustomerProfileForm";

export const metadata: Metadata = {
  title: "Edit Profile — EZ Bid",
};

export default async function CustomerProfileEditPage() {
  const { user, profile } = await requireCustomer();

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
          <h1 className="mt-3 text-2xl font-bold text-slate-900">Edit profile</h1>
          <p className="mt-1 text-sm text-slate-500">
            Update your contact details and general location. Your saved location is used to
            pre-fill new job posts.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <CustomerProfileForm
              email={user.email}
              defaults={{
                firstName: profile.firstName ?? "",
                lastName: profile.lastName ?? "",
                phone: profile.phone ?? "",
                town: profile.town ?? "",
                state: profile.state ?? "",
              }}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
