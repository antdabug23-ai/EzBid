import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Card, CardContent } from "@/components/ui/card";
import { VendorSignupForm } from "@/components/auth/VendorSignupForm";

export const metadata: Metadata = {
  title: "Vendor sign up — EZ Bid",
  description: "Create a free vendor account on EZ Bid.",
};

export default function VendorSignupPage() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <main className="mx-auto max-w-lg px-4 py-16">
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Free during beta
          </span>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Create your vendor account</h1>
          <p className="mt-1 text-sm text-slate-500">
            Create a vendor account to start finding local jobs, building reviews,
            and growing your service business during beta.
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <VendorSignupForm />
          </CardContent>
        </Card>
        <p className="mt-4 text-center text-sm text-slate-500">
          Looking to hire instead?{" "}
          <Link href="/signup/customer" className="font-medium text-blue-600 hover:underline">
            Sign up as a customer
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
