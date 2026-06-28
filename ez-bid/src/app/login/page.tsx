import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in — EZ Bid",
  description: "Log in to your EZ Bid account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <main className="mx-auto max-w-md px-4 py-16">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Log in to EZ Bid</h1>
          <p className="mt-1 text-sm text-slate-500">
            Access your customer or vendor dashboard.
          </p>
        </div>
        {params.error === "unauthorized" ? (
          <div className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            You do not have access to that page. Please log in with the correct account type.
          </div>
        ) : null}
        <Card>
          <CardContent className="pt-6">
            <LoginForm />
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
