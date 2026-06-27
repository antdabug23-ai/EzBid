import { requireCustomer } from "@/lib/auth/current-user";
import { getCustomerJobs } from "@/lib/services/jobs";
import { PageHeader, EmptyState } from "@/components/shared/states";
import { JobCard } from "@/components/jobs/JobCard";
import { ButtonLink } from "@/components/ui/Button";

export default async function CustomerJobsPage() {
  const { profile } = await requireCustomer();
  const jobs = await getCustomerJobs(profile.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My jobs"
        description="All the jobs you've posted."
        action={<ButtonLink href="/customer/jobs/new">Post a job</ButtonLink>}
      />

      {jobs.length === 0 ? (
        <EmptyState
          title="No jobs posted yet"
          description="When you post a job, it will appear here with its bids and status."
          action={<ButtonLink href="/customer/jobs/new">Post your first job</ButtonLink>}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              href={`/customer/jobs/${job.id}`}
              title={job.title}
              categoryName={job.serviceCategory.name}
              town={job.town}
              state={job.state}
              status={job.status}
              description={job.description}
              budgetMin={job.budgetMin}
              budgetMax={job.budgetMax}
              requestedServiceDate={job.requestedServiceDate}
              preferredServiceWindow={job.preferredServiceWindow}
              urgencyLevel={job.urgencyLevel}
              bidCount={job._count.bids}
            />
          ))}
        </div>
      )}
    </div>
  );
}
