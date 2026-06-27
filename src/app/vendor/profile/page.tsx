import { requireRole } from "@/lib/auth/current-user";
import { getActiveServiceCategories } from "@/lib/services/categories";
import { getVendorProfileWithCategories } from "@/lib/services/vendors";
import { PageHeader, Alert } from "@/components/shared/states";
import { VendorProfileForm } from "@/components/profile/VendorProfileForm";

export default async function VendorProfilePage({
  searchParams,
}: {
  searchParams: { setup?: string };
}) {
  const user = await requireRole("VENDOR");
  const [categories, profile] = await Promise.all([
    getActiveServiceCategories(),
    getVendorProfileWithCategories(user.id),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Business profile"
        description="Your public profile that customers see with their bids."
      />
      {searchParams.setup ? (
        <Alert tone="info">Complete your business profile to start bidding on jobs.</Alert>
      ) : null}
      <VendorProfileForm
        categories={categories}
        defaults={{
          businessName: profile?.businessName,
          description: profile?.description,
          phone: profile?.phone,
          email: profile?.email,
          website: profile?.website,
          town: profile?.town,
          state: profile?.state,
          serviceAreaDescription: profile?.serviceAreaDescription,
          serviceCategoryIds: profile?.serviceCategories.map((sc) => sc.serviceCategoryId) ?? [],
        }}
      />
    </div>
  );
}
