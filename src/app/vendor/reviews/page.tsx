import { requireVendor } from "@/lib/auth/current-user";
import { getVendorReviews } from "@/lib/services/reviews";
import { PageHeader } from "@/components/shared/states";
import { Card, CardBody } from "@/components/ui/Card";
import { RatingDisplay } from "@/components/reviews/RatingDisplay";
import { ReviewList } from "@/components/reviews/ReviewList";

export default async function VendorReviewsPage() {
  const { profile } = await requireVendor();
  const reviews = await getVendorReviews(profile.id);

  return (
    <div className="space-y-6">
      <PageHeader title="Reviews" description="Feedback from customers you've worked with." />

      <Card>
        <CardBody className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Overall rating</p>
            <RatingDisplay rating={profile.averageRating} count={profile.reviewCount} />
          </div>
        </CardBody>
      </Card>

      <ReviewList reviews={reviews} />
    </div>
  );
}
