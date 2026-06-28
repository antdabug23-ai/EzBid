import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign up — EZ Bid",
  description: "Create a free EZ Bid account as a customer or vendor.",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <main className="mx-auto max-w-lg px-4 py-16">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Free during beta
          </span>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">
            Choose how you want to use EZ Bid.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="transition hover:border-blue-300 hover:shadow-md">
            <CardContent className="flex flex-col pt-6">
              <h2 className="text-lg font-semibold text-slate-900">I need a service</h2>
              <p className="mt-2 flex-1 text-sm text-slate-600">
                Post jobs, compare bids, and choose local vendors.
              </p>
              <Link
                href="/signup/customer"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Sign up as a customer
              </Link>
            </CardContent>
          </Card>
          <Card className="transition hover:border-emerald-300 hover:shadow-md">
            <CardContent className="flex flex-col pt-6">
              <h2 className="text-lg font-semibold text-slate-900">I&rsquo;m a vendor</h2>
              <p className="mt-2 flex-1 text-sm text-slate-600">
                Create a profile, find local jobs, and submit bids.
              </p>
              <Link
                href="/signup/vendor"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Sign up as a vendor
              </Link>
            </CardContent>
          </Card>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
