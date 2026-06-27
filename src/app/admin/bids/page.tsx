import { getAllBids } from "@/lib/services/admin";
import { PageHeader } from "@/components/shared/states";
import { Table, Td } from "@/components/admin/Table";
import { BidStatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export default async function AdminBidsPage() {
  const bids = await getAllBids();

  return (
    <div className="space-y-6">
      <PageHeader title="Bids" description="All bids submitted by vendors." />
      <Table
        headers={["Job", "Vendor", "Amount", "Status", "Date"]}
        rowCount={bids.length}
        empty={{ title: "No bids yet" }}
      >
        {bids.map((b) => (
          <tr key={b.id}>
            <Td className="font-medium text-slate-900">{b.job.title}</Td>
            <Td>{b.vendor.businessName}</Td>
            <Td>{formatCurrency(b.amount)}</Td>
            <Td>
              <BidStatusBadge status={b.status} />
            </Td>
            <Td>{formatDate(b.createdAt)}</Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
