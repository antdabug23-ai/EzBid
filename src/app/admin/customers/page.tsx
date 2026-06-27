import { getAllCustomers } from "@/lib/services/admin";
import { PageHeader } from "@/components/shared/states";
import { Table, Td } from "@/components/admin/Table";
import { formatDate } from "@/lib/utils/format";

export default async function AdminCustomersPage() {
  const customers = await getAllCustomers();

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description="Everyone who posts jobs." />
      <Table
        headers={["Name", "Email", "Location", "Jobs", "Joined"]}
        rowCount={customers.length}
        empty={{ title: "No customers yet" }}
      >
        {customers.map((c) => (
          <tr key={c.id}>
            <Td className="font-medium text-slate-900">
              {c.firstName} {c.lastName}
            </Td>
            <Td>{c.user.email}</Td>
            <Td>{[c.town, c.state].filter(Boolean).join(", ") || "—"}</Td>
            <Td>{c._count.jobs}</Td>
            <Td>{formatDate(c.createdAt)}</Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
