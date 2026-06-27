import "server-only";
import { prisma } from "@/lib/db/prisma";
import type { BidInput } from "@/lib/validations/bid";
import { calculateFinderFee } from "./finderFees";
import { AuthorizationError, NotFoundError, ServiceError } from "./errors";

const BIDDABLE_JOB_STATUSES = ["OPEN", "BIDDING"];

export async function createBid(
  vendorProfileId: string,
  jobId: string,
  input: BidInput
) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new NotFoundError("Job not found.");
  if (!BIDDABLE_JOB_STATUSES.includes(job.status)) {
    throw new ServiceError("This job is no longer accepting bids.");
  }

  const existing = await prisma.bid.findUnique({
    where: { jobId_vendorId: { jobId, vendorId: vendorProfileId } },
  });
  if (existing && existing.status !== "WITHDRAWN") {
    throw new ServiceError("You have already submitted a bid for this job.");
  }

  const data = {
    amount: input.amount,
    description: input.description || null,
    earliestAvailableDate: input.earliestAvailableDate ?? null,
    proposedServiceDate: input.proposedServiceDate ?? null,
    proposedServiceWindow: input.proposedServiceWindow,
    estimatedTimeline: input.estimatedTimeline || null,
    status: "SUBMITTED" as const,
  };

  const bid = existing
    ? await prisma.bid.update({ where: { id: existing.id }, data })
    : await prisma.bid.create({ data: { ...data, jobId, vendorId: vendorProfileId } });

  // First bid moves an OPEN job into BIDDING.
  if (job.status === "OPEN") {
    await prisma.job.update({ where: { id: jobId }, data: { status: "BIDDING" } });
  }

  return bid;
}

export async function withdrawBid(vendorProfileId: string, bidId: string) {
  const bid = await prisma.bid.findUnique({ where: { id: bidId } });
  if (!bid) throw new NotFoundError("Bid not found.");
  if (bid.vendorId !== vendorProfileId) {
    throw new AuthorizationError("You can only withdraw your own bids.");
  }
  if (bid.status !== "SUBMITTED") {
    throw new ServiceError("Only submitted bids can be withdrawn.");
  }
  return prisma.bid.update({ where: { id: bidId }, data: { status: "WITHDRAWN" } });
}

export interface AcceptedBidSummary {
  bidId: string;
  jobId: string;
  vendorId: string;
  acceptedBidAmount: number;
  feeAmount: number;
}

/**
 * Accept a bid. Runs atomically:
 *  - verifies caller owns the job
 *  - verifies job is still open/bidding
 *  - verifies the bid belongs to the job
 *  - marks chosen bid ACCEPTED, others DECLINED
 *  - sets job ACCEPTED + acceptedBidId
 *  - creates a PENDING finder fee
 */
export async function acceptBid(
  customerProfileId: string,
  jobId: string,
  bidId: string
): Promise<AcceptedBidSummary> {
  return prisma.$transaction(async (tx) => {
    const job = await tx.job.findUnique({ where: { id: jobId } });
    if (!job) throw new NotFoundError("Job not found.");
    if (job.customerId !== customerProfileId) {
      throw new AuthorizationError("You can only accept bids on your own jobs.");
    }
    if (!BIDDABLE_JOB_STATUSES.includes(job.status)) {
      throw new ServiceError("This job already has an accepted bid or is closed.");
    }

    const bid = await tx.bid.findUnique({ where: { id: bidId } });
    if (!bid || bid.jobId !== jobId) {
      throw new NotFoundError("That bid does not belong to this job.");
    }
    if (bid.status !== "SUBMITTED") {
      throw new ServiceError("That bid can no longer be accepted.");
    }

    await tx.bid.update({ where: { id: bidId }, data: { status: "ACCEPTED" } });
    await tx.bid.updateMany({
      where: { jobId, id: { not: bidId }, status: "SUBMITTED" },
      data: { status: "DECLINED" },
    });

    await tx.job.update({
      where: { id: jobId },
      data: { status: "ACCEPTED", acceptedBidId: bidId },
    });

    // Finder fee is recorded behind the scenes for future use, but during the
    // free MVP/beta it is auto-confirmed so nothing is shown to or blocked for
    // customers/vendors (the accepted vendor's address access is not gated).
    const feeAmount = calculateFinderFee(bid.amount);
    await tx.finderFee.create({
      data: {
        jobId,
        bidId,
        vendorId: bid.vendorId,
        acceptedBidAmount: bid.amount,
        feeAmount,
        status: "CONFIRMED",
        confirmedAt: new Date(),
      },
    });

    return {
      bidId,
      jobId,
      vendorId: bid.vendorId,
      acceptedBidAmount: bid.amount,
      feeAmount,
    };
  });
}

export async function getVendorBids(vendorProfileId: string) {
  return prisma.bid.findMany({
    where: { vendorId: vendorProfileId },
    orderBy: { createdAt: "desc" },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          town: true,
          state: true,
          status: true,
          serviceCategory: { select: { name: true } },
        },
      },
    },
  });
}

export async function getVendorAcceptedJobs(vendorProfileId: string) {
  return prisma.bid.findMany({
    where: { vendorId: vendorProfileId, status: "ACCEPTED" },
    orderBy: { updatedAt: "desc" },
    include: {
      job: {
        include: {
          serviceCategory: { select: { name: true } },
          finderFee: true,
          customer: { select: { firstName: true } },
        },
      },
    },
  });
}
