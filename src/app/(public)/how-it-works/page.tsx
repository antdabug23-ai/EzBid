import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export const metadata = { title: "How it works — EZ Bid" };

const customerSteps = [
  "Create a free account and complete your profile.",
  "Post a job with a description, photos, preferred date, and budget range.",
  "Receive bids from local vendors with their price and earliest availability.",
  "Compare bids, vendor ratings, and verification badges side by side.",
  "Accept one bid and the vendor is notified.",
  "Once you accept, the vendor sees your exact address and contact info.",
  "After the work is done, mark the job complete and leave a review.",
];

const vendorSteps = [
  "Sign up and build your business profile.",
  "Upload verification documents to earn a trust badge.",
  "Browse open jobs in your service area — you'll see town, state, and job details.",
  "Submit a bid with your price, earliest availability, and proposed date.",
  "If the customer accepts, you're connected with them to do the work.",
  "Once accepted, you unlock the customer's exact address and contact details.",
  "Complete the work and build your reputation with great reviews.",
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">How EZ Bid works</h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          A simple, transparent marketplace. Customers post jobs and compare bids. Vendors create a
          profile and submit bids. Free during beta, and your private details stay private until you
          choose a vendor.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold text-slate-900">For customers</h2>
            <ol className="mt-4 space-y-3">
              {customerSteps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <ButtonLink href="/signup/customer">Post a job</ButtonLink>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold text-slate-900">For vendors</h2>
            <ol className="mt-4 space-y-3">
              {vendorSteps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <ButtonLink href="/signup/vendor" variant="outline">
                Become a vendor
              </ButtonLink>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardBody>
          <h2 className="text-lg font-semibold text-slate-900">Privacy first</h2>
          <p className="mt-2 text-sm text-slate-600">
            Before you accept a bid, vendors only see the town, state, and general details of your
            job — never your exact street address, phone number, or email. Those details unlock only
            for the vendor you choose, after you accept their bid.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
