import Link from "next/link";
import { requireVendor } from "@/lib/auth/current-user";
import { getAvailableJobsForVendor } from "@/lib/services/jobs";
import { getActiveServiceCategories } from "@/lib/services/categories";
import { PageHeader, EmptyState } from "@/components/shared/states";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { JobCard } from "@/components/jobs/JobCard";

export default async function VendorJobsPage({
  searchParams,
}: {
  searchParams: { serviceCategoryId?: string; town?: string; state?: string; page?: string };
}) {
  await requireVendor();
  const page = Number(searchParams.page ?? "1") || 1;

  const [categories, result] = await Promise.all([
    getActiveServiceCategories(),
    getAvailableJobsForVendor({
      serviceCategoryId: searchParams.serviceCategoryId || undefined,
      town: searchParams.town || undefined,
      state: searchParams.state || undefined,
      page,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(result.total / result.pageSize));

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (searchParams.serviceCategoryId) params.set("serviceCategoryId", searchParams.serviceCategoryId);
    if (searchParams.town) params.set("town", searchParams.town);
    if (searchParams.state) params.set("state", searchParams.state);
    params.set("page", String(p));
    return `/vendor/jobs?${params.toString()}`;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Available jobs"
        description="Browse open jobs in your area. Exact addresses are hidden until you win a bid."
      />

      <Card>
        <CardBody>
          <form className="grid gap-3 sm:grid-cols-4" method="get">
            <Select name="serviceCategoryId" defaultValue={searchParams.serviceCategoryId ?? ""}>
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
            <Input name="town" placeholder="Town" defaultValue={searchParams.town ?? ""} />
            <Input name="state" placeholder="State" defaultValue={searchParams.state ?? ""} />
            <Button type="submit" variant="outline">
              Filter
            </Button>
          </form>
        </CardBody>
      </Card>

      {result.jobs.length === 0 ? (
        <EmptyState
          title="No available jobs in your area"
          description="Try adjusting your filters or check back soon for new jobs."
        />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {result.jobs.map((job) => (
              <JobCard
                key={job.id}
                href={`/vendor/jobs/${job.id}`}
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

          {totalPages > 1 ? (
            <div className="flex items-center justify-center gap-2 text-sm">
              {page > 1 ? (
                <Link href={pageHref(page - 1)} className="rounded-lg border px-3 py-2 hover:bg-slate-50">
                  Previous
                </Link>
              ) : null}
              <span className="px-2 text-slate-500">
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <Link href={pageHref(page + 1)} className="rounded-lg border px-3 py-2 hover:bg-slate-50">
                  Next
                </Link>
              ) : null}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
