import Link from "next/link";
import type { Metadata } from "next";
import { requireUser, dashboardPathForRole } from "@/lib/auth/current-user";
import { Card, CardContent } from "@/components/ui/card";
import { ChangePasswordForm } from "@/components/account/ChangePasswordForm";

export const metadata: Metadata = {
  title: "Change Password — EZ Bid",
};

export default async function ChangePasswordPage() {
  const user = await requireUser();
  const dashboardPath = dashboardPathForRole(user.role);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-md px-4 py-8">
        <div className="mb-6">
          <Link href={dashboardPath} className="text-sm text-slate-500 hover:text-slate-700">
            &larr; Back to dashboard
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">Change password</h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter your current password and choose a new one.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
