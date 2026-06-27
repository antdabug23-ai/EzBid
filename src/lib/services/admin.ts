import "server-only";
import { prisma } from "@/lib/db/prisma";
import { NotFoundError, ServiceError } from "./errors";

/** Manually confirm a finder fee (MVP). This unlocks the address for the vendor. */
export async function markFinderFeeConfirmed(finderFeeId: string) {
  const fee = await prisma.finderFee.findUnique({ where: { id: finderFeeId } });
  if (!fee) throw new NotFoundError("Finder fee not found.");
  if (fee.status === "CONFIRMED" || fee.status === "PAID") {
    throw new ServiceError("This finder fee is already confirmed.");
  }
  return prisma.finderFee.update({
    where: { id: finderFeeId },
    data: { status: "CONFIRMED", confirmedAt: new Date() },
  });
}

export async function getAdminDashboardData() {
  const [
    totalUsers,
    totalCustomers,
    totalVendors,
    pendingDocuments,
    openJobs,
    acceptedBids,
    pendingFees,
    recentReviews,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.user.count({ where: { role: "VENDOR" } }),
    prisma.vendorDocument.count({ where: { status: "PENDING" } }),
    prisma.job.count({ where: { status: { in: ["OPEN", "BIDDING"] } } }),
    prisma.bid.count({ where: { status: "ACCEPTED" } }),
    prisma.finderFee.count({ where: { status: "PENDING" } }),
    prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        vendor: { select: { businessName: true } },
        customer: { select: { firstName: true } },
      },
    }),
  ]);

  return {
    totalUsers,
    totalCustomers,
    totalVendors,
    pendingDocuments,
    openJobs,
    acceptedBids,
    pendingFees,
    recentReviews,
  };
}

export function getAllUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      customerProfile: { select: { firstName: true, lastName: true } },
      vendorProfile: { select: { businessName: true, verificationStatus: true } },
    },
  });
}

export function getAllCustomers() {
  return prisma.customerProfile.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { email: true } }, _count: { select: { jobs: true } } },
  });
}

export function getAllVendors() {
  return prisma.vendorProfile.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true } },
      _count: { select: { bids: true, documents: true } },
    },
  });
}

export function getAllJobs() {
  return prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      serviceCategory: { select: { name: true } },
      customer: { select: { firstName: true, lastName: true } },
      _count: { select: { bids: true } },
    },
  });
}

export function getAllBids() {
  return prisma.bid.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      vendor: { select: { businessName: true } },
      job: { select: { title: true } },
    },
  });
}

export function getPendingVerification() {
  return prisma.vendorProfile.findMany({
    where: { documents: { some: { status: "PENDING" } } },
    orderBy: { updatedAt: "desc" },
    include: {
      user: { select: { email: true } },
      documents: { orderBy: { createdAt: "desc" } },
    },
  });
}

export function getAllVendorsForVerification() {
  return prisma.vendorProfile.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      user: { select: { email: true } },
      documents: { orderBy: { createdAt: "desc" } },
    },
  });
}

export function getFinderFees() {
  return prisma.finderFee.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      vendor: { select: { businessName: true } },
      job: { select: { title: true } },
    },
  });
}

export function getAllReviews() {
  return prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      vendor: { select: { businessName: true } },
      customer: { select: { firstName: true } },
      job: { select: { title: true } },
    },
  });
}
