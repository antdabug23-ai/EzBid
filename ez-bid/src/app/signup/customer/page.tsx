import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Card, CardContent } from "@/components/ui/card";
import { CustomerSignupForm } from "@/components/auth/CustomerSignupForm";

export const metadata: Metadata = {
  title: "Customer sign up — EZ Bid",
  description: "Create a free customer account on EZ Bid.",
};

export default function CustomerSignupPage() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <SiteHeader />
      <main className="mx-auto max-w-lg px-4 py-16">
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Free during beta
          </span>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Create your customer account</h1>
          <p className="mt-1 text-sm text-slate-500">
            Post jobs and compare local vendor bids.
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <CustomerSignupForm />
          </CardContent>
        </Card>
        <p className="mt-4 text-center text-sm text-slate-500">
          Looking to offer services?{" "}
          <Link href="/signup/vendor" className="font-medium text-blue-600 hover:underline">
            Sign up as a vendor
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
