import { requireRole } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db/prisma";
import { PageHeader, Alert } from "@/components/shared/states";
import { CustomerProfileForm } from "@/components/profile/CustomerProfileForm";

export default async function CustomerProfilePage({
  searchParams,
}: {
  searchParams: { setup?: string };
}) {
  const user = await requireRole("CUSTOMER");
  const profile = await prisma.customerProfile.findUnique({ where: { userId: user.id } });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Your profile"
        description="This information helps vendors and is used for your jobs."
      />
      {searchParams.setup ? (
        <Alert tone="info">Complete your profile to start posting jobs.</Alert>
      ) : null}
      <CustomerProfileForm
        defaults={{
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          phone: profile?.phone,
          town: profile?.town,
          state: profile?.state,
        }}
      />
    </div>
  );
}
