import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { Alert } from "@/components/shared/states";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Log in — EZ Bid" };

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-500">Log in to your EZ Bid account.</p>
      </div>
      <Card>
        <CardBody className="space-y-4">
          {searchParams.error === "unauthorized" ? (
            <Alert tone="warning">Please log in with an account that has access.</Alert>
          ) : null}
          <LoginForm />
        </CardBody>
      </Card>
      <p className="mt-4 text-center text-sm text-slate-500">
        Need an account?{" "}
        <Link href="/signup/customer" className="font-medium text-brand-700 hover:underline">
          Sign up as a customer
        </Link>{" "}
        or{" "}
        <Link href="/signup/vendor" className="font-medium text-brand-700 hover:underline">
          as a vendor
        </Link>
        .
      </p>
    </div>
  );
}
