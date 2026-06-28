import { prisma } from "@/lib/prisma";
import { ServiceError } from "./errors";
import type { SubmitBidInput } from "@/lib/validations/bid";

const BIDDABLE_JOB_STATUSES = ["OPEN", "BIDDING"] as const;

/** Public/safe job fields only — never selects exactAddress or customer contact info. */
const SAFE_JOB_SELECT = {
  id: true,
  title: true,
  description: true,
  town: true,
  state: true,
  budgetMin: true,
  budgetMax: true,
  requestedServiceDate: true,
  urgencyLevel: true,
  status: true,
  createdAt: true,
  serviceCategory: { select: { name: true } },
  _count: { select: { bids: true } },
} as const;

/** Open jobs any vendor can bid on (newest first). Safe fields only. */
export async function listAvailableJobs() {
  return prisma.job.findMany({
    where: { status: { in: [...BIDDABLE_JOB_STATUSES] } },
    orderBy: { createdAt: "desc" },
    select: SAFE_JOB_SELECT,
  });
}

/** Fetch a single job for a vendor to view/bid on. Safe fields only. */
export async function getJobForVendor(jobId: string) {
  return prisma.job.findUnique({
    where: { id: jobId },
    select: SAFE_JOB_SELECT,
  });
}

/** The vendor's existing bid on a job, if any. */
export async function getVendorBidForJob(vendorProfileId: string, jobId: string) {
  return prisma.bid.findUnique({
    where: { jobId_vendorId: { jobId, vendorId: vendorProfileId } },
    select: {
      id: true,
      amount: true,
      description: true,
      proposedServiceDate: true,
      estimatedTimeline: true,
      status: true,
      createdAt: true,
    },
  });
}

/**
 * Create or update a vendor's bid for a job (one bid per vendor per job).
 * Does not accept the job. Moves an OPEN job to BIDDING on first activity.
 * Never touches exact address or customer contact info.
 */
export async function submitVendorBid(
  vendorProfileId: string,
  jobId: string,
  input: SubmitBidInput
) {
  const description = input.notes
    ? `${input.message}\n\nNotes: ${input.notes}`
    : input.message;
  const proposedServiceDate = new Date(input.startDate);

  return prisma.$transaction(async (tx) => {
    const job = await tx.job.findUnique({
      where: { id: jobId },
      select: { id: true, status: true },
    });
    if (!job) throw new ServiceError("This job is no longer available.");
    if (!BIDDABLE_JOB_STATUSES.includes(job.status as (typeof BIDDABLE_JOB_STATUSES)[number])) {
      throw new ServiceError("This job is no longer accepting bids.");
    }

    const bid = await tx.bid.upsert({
      where: { jobId_vendorId: { jobId, vendorId: vendorProfileId } },
      create: {
        jobId,
        vendorId: vendorProfileId,
        amount: input.amount,
        description,
        proposedServiceDate,
        estimatedTimeline: input.timeline,
        status: "SUBMITTED",
      },
      update: {
        amount: input.amount,
        description,
        proposedServiceDate,
        estimatedTimeline: input.timeline,
        status: "SUBMITTED",
      },
      select: { id: true },
    });

    if (job.status === "OPEN") {
      await tx.job.update({ where: { id: jobId }, data: { status: "BIDDING" } });
    }

    return bid;
  });
}

/** List the logged-in vendor's bids (newest first). Safe job fields only. */
export async function listVendorBids(vendorProfileId: string) {
  return prisma.bid.findMany({
    where: { vendorId: vendorProfileId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      amount: true,
      status: true,
      createdAt: true,
      proposedServiceDate: true,
      job: {
        select: {
          id: true,
          title: true,
          town: true,
          state: true,
          serviceCategory: { select: { name: true } },
        },
      },
    },
  });
}

export type RatingBreakdown = Record<1 | 2 | 3 | 4 | 5, number>;

/**
 * Public vendor profile (safe fields only).
 * Never selects vendor documents, work files, internal notes, phone, or email.
 * Returns a real star breakdown computed from Review records, or null if no vendor.
 */
export async function getPublicVendorProfile(vendorId: string) {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { id: vendorId },
    select: {
      id: true,
      businessName: true,
      description: true,
      serviceAreaDescription: true,
      town: true,
      state: true,
      averageRating: true,
      reviewCount: true,
      verificationStatus: true,
      createdAt: true,
      serviceCategories: {
        select: { serviceCategory: { select: { name: true } } },
      },
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          overallRating: true,
          writtenReview: true,
          createdAt: true,
          customer: { select: { firstName: true, lastName: true } },
          job: { select: { serviceCategory: { select: { name: true } } } },
        },
      },
    },
  });

  if (!vendor) return null;

  const grouped = await prisma.review.groupBy({
    by: ["overallRating"],
    where: { vendorId },
    _count: { _all: true },
  });

  const breakdown: RatingBreakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const row of grouped) {
    const star = Math.min(5, Math.max(1, Math.round(row.overallRating))) as 1 | 2 | 3 | 4 | 5;
    breakdown[star] += row._count._all;
  }

  return { ...vendor, breakdown };
}

/** Counts for the vendor dashboard stat cards. */
export async function getVendorStats(vendorProfileId: string) {
  const [availableJobs, bidsSubmitted, jobsWon, completedJobs] = await Promise.all([
    prisma.job.count({ where: { status: { in: [...BIDDABLE_JOB_STATUSES] } } }),
    prisma.bid.count({ where: { vendorId: vendorProfileId } }),
    prisma.bid.count({ where: { vendorId: vendorProfileId, status: "ACCEPTED" } }),
    prisma.bid.count({
      where: { vendorId: vendorProfileId, status: "ACCEPTED", job: { status: "COMPLETED" } },
    }),
  ]);

  return { availableJobs, bidsSubmitted, jobsWon, completedJobs };
}
