import "server-only";
import { prisma } from "@/lib/db/prisma";
import type { ReviewInput } from "@/lib/validations/review";
import { AuthorizationError, NotFoundError, ServiceError } from "./errors";

/**
 * Create a review. Rules:
 *  - caller owns the job
 *  - job status is COMPLETED
 *  - the job has an accepted bid (the reviewed vendor)
 *  - the job hasn't been reviewed yet
 * Recomputes the vendor's averageRating + reviewCount afterwards.
 */
export async function createReview(
  customerProfileId: string,
  jobId: string,
  input: ReviewInput
) {
  return prisma.$transaction(async (tx) => {
    const job = await tx.job.findUnique({
      where: { id: jobId },
      include: { acceptedBid: { select: { vendorId: true } }, review: true },
    });
    if (!job) throw new NotFoundError("Job not found.");
    if (job.customerId !== customerProfileId) {
      throw new AuthorizationError("You can only review your own jobs.");
    }
    if (job.status !== "COMPLETED") {
      throw new ServiceError("You can only review a completed job.");
    }
    if (!job.acceptedBid) {
      throw new ServiceError("This job has no accepted vendor to review.");
    }
    if (job.review) {
      throw new ServiceError("You have already reviewed this job.");
    }

    const vendorId = job.acceptedBid.vendorId;

    const review = await tx.review.create({
      data: {
        jobId,
        customerId: customerProfileId,
        vendorId,
        overallRating: input.overallRating,
        qualityRating: input.qualityRating ?? null,
        communicationRating: input.communicationRating ?? null,
        timelinessRating: input.timelinessRating ?? null,
        professionalismRating: input.professionalismRating ?? null,
        writtenReview: input.writtenReview || null,
      },
    });

    const agg = await tx.review.aggregate({
      where: { vendorId },
      _avg: { overallRating: true },
      _count: true,
    });

    await tx.vendorProfile.update({
      where: { id: vendorId },
      data: {
        averageRating: agg._avg.overallRating ?? 0,
        reviewCount: agg._count,
      },
    });

    return review;
  });
}

export async function getVendorReviews(vendorProfileId: string) {
  return prisma.review.findMany({
    where: { vendorId: vendorProfileId },
    orderBy: { createdAt: "desc" },
    include: {
      customer: { select: { firstName: true } },
      job: { select: { title: true } },
    },
  });
}
