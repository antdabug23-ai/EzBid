import { notFound } from "next/navigation";
import { requireCustomer } from "@/lib/auth/current-user";
import { getPublicVendorProfile } from "@/lib/services/vendors";
import { NotFoundError } from "@/lib/services/errors";
import { PageHeader } from "@/components/shared/states";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RatingDisplay } from "@/components/reviews/RatingDisplay";
import { VerificationBadge } from "@/components/vendors/VerificationBadge";
import { ReviewList } from "@/components/reviews/ReviewList";

export default async function VendorProfileViewPage({
  params,
}: {
  params: { vendorId: string };
}) {
  await requireCustomer();

  let vendor;
  try {
    vendor = await getPublicVendorProfile(params.vendorId);
  } catch (err) {
    if (err instanceof NotFoundError) notFound();
    throw err;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={vendor.businessName}
        description={[vendor.town, vendor.state].filter(Boolean).join(", ") || undefined}
        action={<VerificationBadge status={vendor.verificationStatus} />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardBody className="space-y-4">
              <RatingDisplay rating={vendor.averageRating} count={vendor.reviewCount} />
              {vendor.description ? (
                <p className="whitespace-pre-line text-sm text-slate-700">{vendor.description}</p>
              ) : null}
              {vendor.serviceAreaDescription ? (
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Service area</p>
                  <p className="text-sm text-slate-700">{vendor.serviceAreaDescription}</p>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {vendor.serviceCategories.map((vc) => (
                  <Badge key={vc.serviceCategory.name} tone="blue">
                    {vc.serviceCategory.name}
                  </Badge>
                ))}
              </div>
              {vendor.website ? (
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-brand-700 hover:underline"
                >
                  Visit website
                </a>
              ) : null}
            </CardBody>
          </Card>

          {vendor.workPhotos.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Past work</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {vendor.workPhotos.map((p) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={p.id}
                      src={p.url}
                      alt={p.caption ?? "Work photo"}
                      className="aspect-square w-full rounded-lg border border-slate-200 object-cover"
                    />
                  ))}
                </div>
              </CardBody>
            </Card>
          ) : null}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Reviews ({vendor.reviewCount})</CardTitle>
            </CardHeader>
            <CardBody>
              <ReviewList reviews={vendor.reviews} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
