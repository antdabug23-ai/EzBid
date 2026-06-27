import { requireCustomer } from "@/lib/auth/current-user";
import { jobPostingCategories } from "@/lib/serviceCategories";
import { createJobAction } from "@/lib/actions/jobs";
import { PageHeader } from "@/components/shared/states";
import { JobForm } from "@/components/jobs/JobForm";

export default async function NewJobPage() {
  await requireCustomer();
  const categories = jobPostingCategories.map((c) => ({ id: c.slug, name: c.name }));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Post a job"
        description="Describe the work. Your exact address stays private until you accept a bid."
      />
      <JobForm categories={categories} action={createJobAction} submitLabel="Post job" />
    </div>
  );
}
