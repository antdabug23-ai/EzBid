import { getAllVendors } from "@/lib/services/admin";
import { PageHeader } from "@/components/shared/states";
import { Table, Td } from "@/components/admin/Table";
import { VerificationBadge } from "@/components/vendors/VerificationBadge";
import { RatingDisplay } from "@/components/reviews/RatingDisplay";
import { formatDate } from "@/lib/utils/format";

export default async function AdminVendorsPage() {
  const vendors = await getAllVendors();

  return (
    <div className="space-y-6">
      <PageHeader title="Vendors" description="All vendor businesses." />
      <Table
        headers={["Business", "Email", "Verification", "Rating", "Bids", "Joined"]}
        rowCount={vendors.length}
        empty={{ title: "No vendors yet" }}
      >
        {vendors.map((v) => (
          <tr key={v.id}>
            <Td className="font-medium text-slate-900">{v.businessName}</Td>
            <Td>{v.user.email}</Td>
            <Td>
              <VerificationBadge status={v.verificationStatus} />
            </Td>
            <Td>
              <RatingDisplay rating={v.averageRating} count={v.reviewCount} size="sm" />
            </Td>
            <Td>{v._count.bids}</Td>
            <Td>{formatDate(v.createdAt)}</Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
