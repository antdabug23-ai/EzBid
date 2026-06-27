import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { activeServiceCategories } from "@/lib/serviceCategories";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
              Local blue-collar services, made simple
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Post a job. Compare local bids. Hire with confidence.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              EZ Bid connects you with trusted local vendors for landscaping, plumbing, cleaning,
              and more. Post jobs and compare local vendors — free during beta.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/signup/customer" size="lg">
                I need a service
              </ButtonLink>
              <ButtonLink href="/signup/vendor" size="lg" variant="outline">
                I&rsquo;m a service vendor
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-brand-700 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Post your job",
              body: "Describe the work, add photos, and set your preferred date. Your exact address stays private.",
            },
            {
              step: "2",
              title: "Compare bids",
              body: "Local vendors send their price and earliest availability. Review ratings and verification badges.",
            },
            {
              step: "3",
              title: "Accept & connect",
              body: "Accept the best bid. Contact details unlock and you can get the work done, then leave a review.",
            },
          ].map((item) => (
            <Card key={item.step} className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold text-slate-900">Services on EZ Bid</h2>
          <p className="mt-2 text-center text-slate-600">From quick fixes to bigger projects.</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activeServiceCategories.map((category) => (
              <Card key={category.id} className="flex h-full flex-col p-5">
                {category.icon ? (
                  <span className="text-2xl" aria-hidden>
                    {category.icon}
                  </span>
                ) : null}
                <h3 className="mt-2 text-base font-semibold text-slate-900">{category.name}</h3>
                <p className="mt-1 flex-1 text-sm text-slate-600">{category.description}</p>
                <div className="mt-3">
                  <Badge tone="blue">{category.seasonality}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor CTA */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-white">Grow your local business</h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-300">
            Create a profile, browse jobs in your area, and submit bids. Free during beta.
          </p>
          <div className="mt-6">
            <ButtonLink href="/signup/vendor" size="lg">
              Join as a vendor
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
