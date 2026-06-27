import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { CustomerSignupForm } from "@/components/auth/CustomerSignupForm";

export const metadata = { title: "Customer sign up — EZ Bid" };

export default function CustomerSignupPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col px-4 py-12">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Create your customer account</h1>
        <p className="mt-1 text-sm text-slate-500">Post jobs and get bids from local vendors.</p>
      </div>
      <Card>
        <CardBody>
          <CustomerSignupForm />
        </CardBody>
      </Card>
      <p className="mt-4 text-center text-sm text-slate-500">
        Are you a vendor?{" "}
        <Link href="/signup/vendor" className="font-medium text-brand-700 hover:underline">
          Sign up as a vendor
        </Link>
      </p>
    </div>
  );
}
