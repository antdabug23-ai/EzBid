import { notFound, redirect } from "next/navigation";
import { requireCustomer } from "@/lib/auth/current-user";
import { getCustomerJobDetail } from "@/lib/services/jobs";
import { NotFoundError } from "@/lib/services/errors";
import { PageHeader, Alert } from "@/components/shared/states";
import { ReviewForm } from "@/components/reviews/ReviewForm";

export default async function LeaveReviewPage({ params }: { params: { jobId: string } }) {
  const { profile } = await requireCustomer();

  let job;
  try {
    job = await getCustomerJobDetail(profile.id, params.jobId);
  } catch (err) {
    if (err instanceof NotFoundError) notFound();
    throw err;
  }

  if (job.review) redirect(`/customer/jobs/${job.id}`);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader title="Leave a review" description={job.title} />
      {job.status !== "COMPLETED" ? (
        <Alert tone="warning">
          You can only review a job once it&rsquo;s marked completed.
        </Alert>
      ) : (
        <ReviewForm jobId={job.id} />
      )}
    </div>
  );
}
