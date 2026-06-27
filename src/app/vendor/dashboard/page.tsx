import { requireVendor } from "@/lib/auth/current-user";
import { getAvailableJobsForVendor } from "@/lib/services/jobs";
import { getVendorBids } from "@/lib/services/bids";
import { PageHeader } from "@/components/shared/states";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { VerificationBadge } from "@/components/vendors/VerificationBadge";
import { RatingDisplay } from "@/components/reviews/RatingDisplay";
import { Alert } from "@/components/shared/states";

export default async function VendorDashboardPage() {
  const { profile } = await requireVendor();
  const [available, bids] = await Promise.all([
    getAvailableJobsForVendor(),
    getVendorBids(profile.id),
  ]);

  const submitted = bids.filter((b) => b.status === "SUBMITTED").length;
  const accepted = bids.filter((b) => b.status === "ACCEPTED").length;

  return (
    <div className="space-y-8">
      <PageHeader
        title={profile.businessName}
        description="Find local jobs and track your bids."
        action={<ButtonLink href="/vendor/profile" variant="outline">Edit profile</ButtonLink>}
      />

      {profile.verificationStatus === "NOT_VERIFIED" ? (
        <Alert tone="info">
          Upload verification documents to earn a trust badge and win more bids.{" "}
          <a href="/vendor/documents" className="font-medium underline">
            Upload now
          </a>
        </Alert>
      ) : null}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Available jobs" value={available.total} href="/vendor/jobs" />
        <StatCard label="Submitted bids" value={submitted} href="/vendor/bids" />
        <StatCard label="Accepted jobs" value={accepted} href="/vendor/accepted-jobs" />
        <StatCard label="Reviews" value={profile.reviewCount} href="/vendor/reviews" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Verification status</CardTitle>
          </CardHeader>
          <CardBody className="flex items-center justify-between">
            <VerificationBadge status={profile.verificationStatus} />
            <ButtonLink href="/vendor/documents" variant="ghost" size="sm">
              Manage documents
            </ButtonLink>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your rating</CardTitle>
          </CardHeader>
          <CardBody>
            <RatingDisplay rating={profile.averageRating} count={profile.reviewCount} />
          </CardBody>
        </Card>
      </div>

      <div>
        <ButtonLink href="/vendor/jobs">Browse available jobs</ButtonLink>
      </div>
    </div>
  );
}
