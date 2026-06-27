import type { UserRole, FinderFeeStatus } from "@prisma/client";

export interface LocationViewer {
  role: UserRole;
  /** The viewer's CustomerProfile id, if they are a customer. */
  customerProfileId?: string | null;
  /** The viewer's VendorProfile id, if they are a vendor. */
  vendorProfileId?: string | null;
}

export interface JobLocationContext {
  /** The CustomerProfile id that owns the job. */
  customerId: string;
  /** The accepted bid for the job, if any. */
  acceptedBid: { vendorId: string } | null;
  /** The finder fee for the job, if any. */
  finderFee: { status: FinderFeeStatus } | null;
}

/**
 * Core privacy rule: who can see the exact street address & customer contact.
 *
 * - Admins: always.
 * - Owning customer: always (their own job).
 * - The accepted vendor: only once the finder fee is CONFIRMED.
 * - Everyone else: never.
 */
export function canViewExactJobLocation(
  viewer: LocationViewer,
  job: JobLocationContext
): boolean {
  if (viewer.role === "ADMIN") return true;

  if (viewer.role === "CUSTOMER") {
    return Boolean(viewer.customerProfileId) && viewer.customerProfileId === job.customerId;
  }

  if (viewer.role === "VENDOR") {
    if (!viewer.vendorProfileId) return false;
    if (!job.acceptedBid) return false;
    if (job.acceptedBid.vendorId !== viewer.vendorProfileId) return false;
    return job.finderFee?.status === "CONFIRMED";
  }

  return false;
}
