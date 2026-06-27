import { getAdminDashboardData } from "@/lib/services/admin";
import { PageHeader } from "@/components/shared/states";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { RatingDisplay } from "@/components/reviews/RatingDisplay";
import { formatDate } from "@/lib/utils/format";

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();

  return (
    <div className="space-y-8">
      <PageHeader title="Admin overview" description="Platform activity at a glance." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total users" value={data.totalUsers} href="/admin/users" />
        <StatCard label="Vendors" value={data.totalVendors} href="/admin/vendors" />
        <StatCard label="Customers" value={data.totalCustomers} href="/admin/customers" />
        <StatCard label="Open jobs" value={data.openJobs} href="/admin/jobs" />
        <StatCard
          label="Pending documents"
          value={data.pendingDocuments}
          href="/admin/verification"
        />
        <StatCard label="Accepted bids" value={data.acceptedBids} href="/admin/bids" />
        <StatCard label="Pending finder fees" value={data.pendingFees} href="/admin/finder-fees" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent reviews</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3">
          {data.recentReviews.length === 0 ? (
            <p className="text-sm text-slate-500">No reviews yet.</p>
          ) : (
            data.recentReviews.map((r) => (
              <div key={r.id} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                <div>
                  <RatingDisplay rating={r.overallRating} showNumber={false} size="sm" />
                  <p className="text-sm text-slate-600">
                    {r.customer.firstName} → {r.vendor.businessName}
                  </p>
                </div>
                <span className="text-xs text-slate-400">{formatDate(r.createdAt)}</span>
              </div>
            ))
          )}
        </CardBody>
      </Card>
    </div>
  );
}
