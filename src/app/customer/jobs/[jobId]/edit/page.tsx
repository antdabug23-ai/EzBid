import { notFound, redirect } from "next/navigation";
import { requireCustomer } from "@/lib/auth/current-user";
import { getCustomerJobDetail } from "@/lib/services/jobs";
import { jobPostingCategories, getServiceCategoryByName } from "@/lib/serviceCategories";
import { NotFoundError } from "@/lib/services/errors";
import { updateJobAction } from "@/lib/actions/jobs";
import { PageHeader } from "@/components/shared/states";
import { JobForm } from "@/components/jobs/JobForm";

function toDateInput(d: Date | null): string | null {
  return d ? d.toISOString().slice(0, 10) : null;
}

export default async function EditJobPage({ params }: { params: { jobId: string } }) {
  const { profile } = await requireCustomer();

  let job;
  try {
    job = await getCustomerJobDetail(profile.id, params.jobId);
  } catch (err) {
    if (err instanceof NotFoundError) notFound();
    throw err;
  }

  if (!["OPEN", "BIDDING"].includes(job.status)) {
    redirect(`/customer/jobs/${job.id}`);
  }

  const categories = jobPostingCategories.map((c) => ({ id: c.slug, name: c.name }));
  const currentSlug = getServiceCategoryByName(job.serviceCategory.name)?.slug ?? "";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader title="Edit job" description="Update your job details." />
      <JobForm
        categories={categories}
        action={updateJobAction}
        jobId={job.id}
        submitLabel="Save changes"
        defaults={{
          serviceCategoryId: currentSlug,
          title: job.title,
          description: job.description,
          town: job.town,
          state: job.state,
          exactAddress: job.exactAddress,
          budgetMin: job.budgetMin,
          budgetMax: job.budgetMax,
          requestedServiceDate: toDateInput(job.requestedServiceDate),
          preferredServiceWindow: job.preferredServiceWindow,
          isDateFlexible: job.isDateFlexible,
          urgencyLevel: job.urgencyLevel,
        }}
      />
    </div>
  );
}
