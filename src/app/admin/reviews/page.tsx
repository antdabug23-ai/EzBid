import { getAllReviews } from "@/lib/services/admin";
import { PageHeader } from "@/components/shared/states";
import { Table, Td } from "@/components/admin/Table";
import { RatingDisplay } from "@/components/reviews/RatingDisplay";
import { formatDate } from "@/lib/utils/format";

export default async function AdminReviewsPage() {
  const reviews = await getAllReviews();

  return (
    <div className="space-y-6">
      <PageHeader title="Reviews" description="All customer reviews of vendors." />
      <Table
        headers={["Rating", "Vendor", "Customer", "Job", "Review", "Date"]}
        rowCount={reviews.length}
        empty={{ title: "No reviews yet" }}
      >
        {reviews.map((r) => (
          <tr key={r.id}>
            <Td>
              <RatingDisplay rating={r.overallRating} showNumber={false} size="sm" />
            </Td>
            <Td className="font-medium text-slate-900">{r.vendor.businessName}</Td>
            <Td>{r.customer.firstName}</Td>
            <Td>{r.job.title}</Td>
            <Td className="max-w-xs whitespace-normal text-slate-600">
              {r.writtenReview ?? "—"}
            </Td>
            <Td>{formatDate(r.createdAt)}</Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
