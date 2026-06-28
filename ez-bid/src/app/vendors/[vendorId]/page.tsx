import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublicVendorProfile } from "@/lib/services/vendor";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";

export const metadata: Metadata = {
  title: "Vendor profile — EZ Bid",
};

function formatMonthYear(date: Date | null | undefined): string | null {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function reviewerName(firstName: string, lastName: string): string {
  const initial = lastName ? `${lastName.charAt(0)}.` : "";
  return `${firstName} ${initial}`.trim();
}

export default async function VendorProfilePage({
  params,
}: {
  params: Promise<{ vendorId: string }>;
}) {
  const { vendorId } = await params;
  const vendor = await getPublicVendorProfile(vendorId);

  if (!vendor) notFound();

  const memberSince = formatMonthYear(vendor.createdAt);
  const services = vendor.serviceCategories.map((s) => s.serviceCategory.name);
  const serviceArea =
    vendor.serviceAreaDescription || [vendor.town, vendor.state].filter(Boolean).join(", ");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        <Card>
          <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                {vendor.businessName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900">{vendor.businessName}</h1>
                  <Badge tone="green">Free during beta</Badge>
                </div>
                <div className="mt-2">
                  <StarRating rating={vendor.averageRating} count={vendor.reviewCount} />
                </div>
                <dl className="mt-3 space-y-1 text-sm">
                  {serviceArea ? (
                    <div className="flex gap-2">
                      <dt className="text-slate-500">Service area:</dt>
                      <dd className="text-slate-800">{serviceArea}</dd>
                    </div>
                  ) : null}
                  {memberSince ? (
                    <div className="flex gap-2">
                      <dt className="text-slate-500">Member since:</dt>
                      <dd className="text-slate-800">{memberSince}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        {vendor.description ? (
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="whitespace-pre-line text-sm text-slate-700">{vendor.description}</p>
            </CardContent>
          </Card>
        ) : null}

        {services.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Services offered</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2">
                {services.map((name) => (
                  <Badge key={name} tone="blue">
                    {name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle>
              Customer reviews{vendor.reviewCount > 0 ? ` (${vendor.reviewCount})` : ""}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            {vendor.reviews.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                No customer reviews yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {vendor.reviews.map((review) => (
                  <li key={review.id} className="border-b border-slate-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800">
                        {reviewerName(review.customer.firstName, review.customer.lastName)}
                      </span>
                      <StarRating
                        rating={review.overallRating}
                        count={1}
                        showCount={false}
                      />
                    </div>
                    {review.writtenReview ? (
                      <p className="mt-1 text-sm text-slate-600">{review.writtenReview}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-xs text-slate-400">
              Reviews can only be left by customers after a confirmed job is completed.
            </p>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
