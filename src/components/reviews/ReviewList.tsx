import { Card, CardBody } from "@/components/ui/Card";
import { RatingDisplay } from "./RatingDisplay";
import { EmptyState } from "@/components/shared/states";
import { formatDate } from "@/lib/utils/format";

interface ReviewItem {
  id: string;
  overallRating: number;
  writtenReview: string | null;
  createdAt: Date;
  customer: { firstName: string };
  job?: { title: string } | null;
}

export function ReviewList({ reviews }: { reviews: ReviewItem[] }) {
  if (reviews.length === 0) {
    return <EmptyState title="No reviews yet" description="Completed jobs with reviews will appear here." />;
  }
  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <Card key={r.id}>
          <CardBody className="space-y-2">
            <div className="flex items-center justify-between">
              <RatingDisplay rating={r.overallRating} showNumber={false} size="sm" />
              <span className="text-xs text-slate-400">{formatDate(r.createdAt)}</span>
            </div>
            {r.writtenReview ? <p className="text-sm text-slate-700">{r.writtenReview}</p> : null}
            <p className="text-xs text-slate-500">
              — {r.customer.firstName}
              {r.job ? ` · ${r.job.title}` : ""}
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
