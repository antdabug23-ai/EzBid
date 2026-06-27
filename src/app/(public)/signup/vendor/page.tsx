import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { VendorSignupForm } from "@/components/auth/VendorSignupForm";

export const metadata = { title: "Vendor sign up — EZ Bid" };

export default function VendorSignupPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col px-4 py-12">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Create your vendor account</h1>
        <p className="mt-1 text-sm text-slate-500">
          Create a profile, browse local jobs, and submit bids. Free during beta.
        </p>
      </div>
      <Card>
        <CardBody>
          <VendorSignupForm />
        </CardBody>
      </Card>
      <p className="mt-4 text-center text-sm text-slate-500">
        Looking to hire instead?{" "}
        <Link href="/signup/customer" className="font-medium text-brand-700 hover:underline">
          Sign up as a customer
        </Link>
      </p>
    </div>
  );
}
