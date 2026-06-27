import { requireCustomer } from "@/lib/auth/current-user";
import { getCustomerJobs } from "@/lib/services/jobs";
import { PageHeader, EmptyState } from "@/components/shared/states";
import { StatCard } from "@/components/shared/StatCard";
import { JobCard } from "@/components/jobs/JobCard";
import { ButtonLink } from "@/components/ui/Button";

export default async function CustomerDashboardPage() {
  const { profile } = await requireCustomer();
  const jobs = await getCustomerJobs(profile.id);

  const active = jobs.filter((j) => ["OPEN", "BIDDING"].includes(j.status));
  const withNewBids = jobs.filter((j) => j._count.bids > 0 && ["OPEN", "BIDDING"].includes(j.status));
  const accepted = jobs.filter((j) => ["ACCEPTED", "IN_PROGRESS"].includes(j.status));
  const completed = jobs.filter((j) => j.status === "COMPLETED");

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome, ${profile.firstName}`}
        description="Manage your jobs and review incoming bids."
        action={<ButtonLink href="/customer/jobs/new">Post a job</ButtonLink>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Active jobs" value={active.length} href="/customer/jobs" />
        <StatCard label="Jobs with bids" value={withNewBids.length} />
        <StatCard label="Accepted" value={accepted.length} />
        <StatCard label="Completed" value={completed.length} />
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Active jobs</h2>
        {active.length === 0 ? (
          <EmptyState
            title="No active jobs"
            description="Post your first job to start receiving bids from local vendors."
            action={<ButtonLink href="/customer/jobs/new">Post a job</ButtonLink>}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {active.map((job) => (
              <JobCard
                key={job.id}
                href={`/customer/jobs/${job.id}`}
                title={job.title}
                categoryName={job.serviceCategory.name}
                town={job.town}
                state={job.state}
                status={job.status}
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
      </section>

      {accepted.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">In progress</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {accepted.map((job) => (
              <JobCard
                key={job.id}
                href={`/customer/jobs/${job.id}`}
                title={job.title}
                categoryName={job.serviceCategory.name}
                town={job.town}
                state={job.state}
                status={job.status}
                budgetMin={job.budgetMin}
                budgetMax={job.budgetMax}
                requestedServiceDate={job.requestedServiceDate}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
