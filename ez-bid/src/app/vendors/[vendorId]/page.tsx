import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublicVendorProfile } from "@/lib/services/vendor";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VendorRatingBadge } from "@/components/vendor/VendorRatingBadge";

export const metadata: Metadata = {
  title: "Vendor profile — EZ Bid",
};

function formatMonthYear(date: Date | null | undefined): string | null {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function reviewerName(firstName: string, lastName: string): string {
  const initial = lastName ? `${lastName.charAt(0)}.` : "";
  return `${firstName} ${initial}`.trim();
}

function starString(rating: number): string {
  const rounded = Math.min(5, Math.max(0, Math.round(rating)));
  return "\u2605".repeat(rounded) + "\u2606".repeat(5 - rounded);
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
  const hasReviews = vendor.reviewCount > 0;
  const maxBreakdown = Math.max(1, ...[5, 4, 3, 2, 1].map((s) => vendor.breakdown[s as 1 | 2 | 3 | 4 | 5]));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        {/* Identity */}
        <Card>
          <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                {vendor.businessName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900">{vendor.businessName}</h1>
                  <VendorRatingBadge
                    averageRating={vendor.averageRating}
                    reviewCount={vendor.reviewCount}
                  />
                  <Badge tone="green">Free during beta</Badge>
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

        {/* Overall score */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Customer Rating</CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            {hasReviews ? (
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="text-center sm:w-40 sm:shrink-0">
                  <p className="text-4xl font-bold text-slate-900">
                    {vendor.averageRating.toFixed(1)}
                    <span className="text-lg font-medium text-slate-400"> / 5</span>
                  </p>
                  <p className="mt-1 text-lg text-amber-500" aria-hidden="true">
                    {starString(vendor.averageRating)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {vendor.reviewCount} {vendor.reviewCount === 1 ? "review" : "reviews"}
                  </p>
                </div>

                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = vendor.breakdown[star as 1 | 2 | 3 | 4 | 5];
                    const pct = Math.round((count / maxBreakdown) * 100);
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="w-12 shrink-0 text-slate-500">{star} star</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-amber-400"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-6 shrink-0 text-right text-slate-600">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
                <p className="text-sm font-semibold text-slate-700">New vendor</p>
                <p className="mt-1 text-sm text-slate-500">No reviews yet</p>
              </div>
            )}
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

        {/* Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>
              Customer Reviews{hasReviews ? ` (${vendor.reviewCount})` : ""}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            {vendor.reviews.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                No customer reviews yet. Reviews can only be left after a confirmed job is
                completed.
              </p>
            ) : (
              <ul className="space-y-4">
                {vendor.reviews.map((review) => (
                  <li key={review.id} className="border-b border-slate-100 pb-4 last:border-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800">
                        {reviewerName(review.customer.firstName, review.customer.lastName)}
                      </span>
                      <span className="text-amber-500" aria-hidden="true">
                        {starString(review.overallRating)}
                      </span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      {review.job?.serviceCategory?.name ? (
                        <Badge tone="neutral">{review.job.serviceCategory.name}</Badge>
                      ) : null}
                      <span>{formatDate(review.createdAt)}</span>
                    </div>
                    {review.writtenReview ? (
                      <p className="mt-2 text-sm text-slate-600">{review.writtenReview}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}

            {/* Review creation is gated until the job-completion flow exists. */}
            <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-center text-xs text-slate-500">
              Review becomes available after the job is completed.
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Only customers who completed a confirmed job with this vendor can leave a review.
            </p>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
