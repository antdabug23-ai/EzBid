import { getAllUsers } from "@/lib/services/admin";
import { PageHeader } from "@/components/shared/states";
import { Badge } from "@/components/ui/Badge";
import { Table, Td } from "@/components/admin/Table";
import { formatDate } from "@/lib/utils/format";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="All accounts on the platform." />
      <Table
        headers={["Email", "Role", "Name / Business", "Joined"]}
        rowCount={users.length}
        empty={{ title: "No users yet" }}
      >
        {users.map((u) => (
          <tr key={u.id}>
            <Td className="font-medium text-slate-900">{u.email}</Td>
            <Td>
              <Badge tone={u.role === "ADMIN" ? "purple" : u.role === "VENDOR" ? "blue" : "neutral"}>
                {u.role}
              </Badge>
            </Td>
            <Td>
              {u.vendorProfile?.businessName ??
                (u.customerProfile
                  ? `${u.customerProfile.firstName} ${u.customerProfile.lastName}`
                  : "—")}
            </Td>
            <Td>{formatDate(u.createdAt)}</Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
