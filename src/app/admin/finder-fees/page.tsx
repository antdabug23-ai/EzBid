import { getFinderFees } from "@/lib/services/admin";
import { markFinderFeeConfirmedAction } from "@/lib/actions/admin";
import { PageHeader } from "@/components/shared/states";
import { Table, Td } from "@/components/admin/Table";
import { FinderFeeStatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export default async function AdminFinderFeesPage() {
  const fees = await getFinderFees();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finder's fee records"
        description="Confirm fees to unlock customer details for the winning vendor."
      />
      <Table
        headers={["Job", "Vendor", "Bid amount", "Fee", "Status", "Created", "Action"]}
        rowCount={fees.length}
        empty={{ title: "No finder fees yet", description: "Fees appear when customers accept bids." }}
      >
        {fees.map((f) => (
          <tr key={f.id}>
            <Td className="font-medium text-slate-900">{f.job.title}</Td>
            <Td>{f.vendor.businessName}</Td>
            <Td>{formatCurrency(f.acceptedBidAmount)}</Td>
            <Td className="font-semibold">{formatCurrency(f.feeAmount)}</Td>
            <Td>
              <FinderFeeStatusBadge status={f.status} />
            </Td>
            <Td>{formatDate(f.createdAt)}</Td>
            <Td>
              {f.status === "PENDING" ? (
                <form action={markFinderFeeConfirmedAction}>
                  <input type="hidden" name="finderFeeId" value={f.id} />
                  <Button type="submit" size="sm">
                    Mark confirmed
                  </Button>
                </form>
              ) : (
                <span className="text-xs text-slate-400">
                  {f.confirmedAt ? `Confirmed ${formatDate(f.confirmedAt)}` : "—"}
                </span>
              )}
            </Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
