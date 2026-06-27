import { prisma } from "@/lib/prisma";
import { calculateFinderFee } from "./finder-fee";

const BIDDABLE_JOB_STATUSES = ["OPEN", "BIDDING"];

export interface AcceptedBidSummary {
  bidId: string;
  jobId: string;
  vendorId: string;
  acceptedBidAmount: number;
  feeAmount: number;
}

/**
 * Accept a bid. Runs atomically so the job, bids, and finder fee stay consistent.
 *
 *  - verifies the caller owns the job
 *  - verifies the job is still open / bidding (not already accepted/closed)
 *  - verifies the bid belongs to the job and is still submittable
 *  - marks the chosen bid ACCEPTED and all other submitted bids DECLINED
 *  - sets the job to ACCEPTED and records acceptedBidId
 *  - calculates the finder's fee and creates a PENDING FinderFee record
 *
 * The exact address stays locked until the finder fee is CONFIRMED
 * (see `canViewExactJobLocation`).
 */
export async function acceptBid(
  customerProfileId: string,
  jobId: string,
  bidId: string
): Promise<AcceptedBidSummary> {
  return prisma.$transaction(async (tx) => {
    const job = await tx.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new Error("Job not found.");
    }
    if (job.customerId !== customerProfileId) {
      throw new Error("You can only accept bids on your own jobs.");
    }
    if (!BIDDABLE_JOB_STATUSES.includes(job.status)) {
      throw new Error("This job already has an accepted bid or is closed.");
    }

    const bid = await tx.bid.findUnique({ where: { id: bidId } });
    if (!bid || bid.jobId !== jobId) {
      throw new Error("That bid does not belong to this job.");
    }
    if (bid.status !== "SUBMITTED") {
      throw new Error("That bid can no longer be accepted.");
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
