import { getAllJobs } from "@/lib/services/admin";
import { PageHeader } from "@/components/shared/states";
import { Table, Td } from "@/components/admin/Table";
import { JobStatusBadge } from "@/components/shared/StatusBadge";
import { formatDate } from "@/lib/utils/format";

export default async function AdminJobsPage() {
  const jobs = await getAllJobs();

  return (
    <div className="space-y-6">
      <PageHeader title="Jobs" description="All jobs posted on the platform." />
      <Table
        headers={["Title", "Category", "Customer", "Location", "Status", "Bids", "Posted"]}
        rowCount={jobs.length}
        empty={{ title: "No jobs yet" }}
      >
        {jobs.map((j) => (
          <tr key={j.id}>
            <Td className="font-medium text-slate-900">{j.title}</Td>
            <Td>{j.serviceCategory.name}</Td>
            <Td>
              {j.customer.firstName} {j.customer.lastName}
            </Td>
            <Td>
              {j.town}, {j.state}
            </Td>
            <Td>
              <JobStatusBadge status={j.status} />
            </Td>
            <Td>{j._count.bids}</Td>
            <Td>{formatDate(j.createdAt)}</Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
