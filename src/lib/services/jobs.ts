import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import type { JobInput } from "@/lib/validations/job";
import { AuthorizationError, NotFoundError, ServiceError } from "./errors";
import { PAGE_SIZE } from "@/lib/constants";

/**
 * Fields safe to expose to vendors before bid acceptance.
 * Critically excludes `exactAddress`.
 */
const VENDOR_SAFE_JOB_SELECT = {
  id: true,
  title: true,
  description: true,
  town: true,
  state: true,
  budgetMin: true,
  budgetMax: true,
  requestedServiceDate: true,
  preferredServiceWindow: true,
  isDateFlexible: true,
  urgencyLevel: true,
  status: true,
  createdAt: true,
  serviceCategory: { select: { id: true, name: true } },
  photos: { select: { id: true, url: true } },
  _count: { select: { bids: true } },
} satisfies Prisma.JobSelect;

export async function createJob(customerProfileId: string, input: JobInput) {
  return prisma.job.create({
    data: {
      customerId: customerProfileId,
      serviceCategoryId: input.serviceCategoryId,
      title: input.title,
      description: input.description,
      town: input.town,
      state: input.state,
      exactAddress: input.exactAddress,
      budgetMin: input.budgetMin ?? null,
      budgetMax: input.budgetMax ?? null,
      requestedServiceDate: input.requestedServiceDate ?? null,
      preferredServiceWindow: input.preferredServiceWindow,
      isDateFlexible: input.isDateFlexible,
      urgencyLevel: input.urgencyLevel,
      status: "OPEN",
    },
  });
}

export async function updateJob(
  customerProfileId: string,
  jobId: string,
  input: JobInput
) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new NotFoundError("Job not found.");
  if (job.customerId !== customerProfileId) {
    throw new AuthorizationError("You can only edit your own jobs.");
  }
  if (!["OPEN", "BIDDING"].includes(job.status)) {
    throw new ServiceError("This job can no longer be edited.");
  }

  return prisma.job.update({
    where: { id: jobId },
    data: {
      serviceCategoryId: input.serviceCategoryId,
      title: input.title,
      description: input.description,
      town: input.town,
      state: input.state,
      exactAddress: input.exactAddress,
      budgetMin: input.budgetMin ?? null,
      budgetMax: input.budgetMax ?? null,
      requestedServiceDate: input.requestedServiceDate ?? null,
      preferredServiceWindow: input.preferredServiceWindow,
      isDateFlexible: input.isDateFlexible,
      urgencyLevel: input.urgencyLevel,
    },
  });
}

export async function addJobPhoto(
  customerProfileId: string,
  jobId: string,
  url: string
) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new NotFoundError("Job not found.");
  if (job.customerId !== customerProfileId) {
    throw new AuthorizationError("You can only add photos to your own jobs.");
  }
  return prisma.jobPhoto.create({ data: { jobId, url } });
}

export async function getCustomerJobs(customerProfileId: string) {
  return prisma.job.findMany({
    where: { customerId: customerProfileId },
    orderBy: { createdAt: "desc" },
    include: {
      serviceCategory: { select: { id: true, name: true } },
      photos: { select: { id: true, url: true } },
      _count: { select: { bids: { where: { status: "SUBMITTED" } } } },
    },
  });
}

/** Full job detail for the owning customer (includes exact address + bids). */
export async function getCustomerJobDetail(customerProfileId: string, jobId: string) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      serviceCategory: true,
      photos: true,
      finderFee: true,
      review: true,
      bids: {
        orderBy: { amount: "asc" },
        include: {
          vendor: {
            select: {
              id: true,
              businessName: true,
              verificationStatus: true,
              averageRating: true,
              reviewCount: true,
            },
          },
        },
      },
    },
  });
  if (!job) throw new NotFoundError("Job not found.");
  if (job.customerId !== customerProfileId) {
    throw new AuthorizationError("You can only view your own jobs.");
  }
  return job;
}

export interface VendorJobFilters {
  serviceCategoryId?: string;
  town?: string;
  state?: string;
  page?: number;
}

/** Open jobs visible to vendors. Returns approximate-location-only data. */
export async function getAvailableJobsForVendor(filters: VendorJobFilters = {}) {
  const page = Math.max(1, filters.page ?? 1);
  const where: Prisma.JobWhereInput = {
    status: { in: ["OPEN", "BIDDING"] },
    ...(filters.serviceCategoryId ? { serviceCategoryId: filters.serviceCategoryId } : {}),
    ...(filters.town ? { town: { contains: filters.town, mode: "insensitive" } } : {}),
    ...(filters.state ? { state: { contains: filters.state, mode: "insensitive" } } : {}),
  };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      select: VENDOR_SAFE_JOB_SELECT,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.job.count({ where }),
  ]);

  return { jobs, total, page, pageSize: PAGE_SIZE };
}

export async function markJobInProgress(customerProfileId: string, jobId: string) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new NotFoundError("Job not found.");
  if (job.customerId !== customerProfileId) throw new AuthorizationError();
  if (job.status !== "ACCEPTED") {
    throw new ServiceError("Only accepted jobs can be moved to in progress.");
  }
  return prisma.job.update({ where: { id: jobId }, data: { status: "IN_PROGRESS" } });
}

export async function markJobCompleted(customerProfileId: string, jobId: string) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new NotFoundError("Job not found.");
  if (job.customerId !== customerProfileId) throw new AuthorizationError();
  if (!["ACCEPTED", "IN_PROGRESS"].includes(job.status)) {
    throw new ServiceError("Only accepted or in-progress jobs can be completed.");
  }
  return prisma.job.update({ where: { id: jobId }, data: { status: "COMPLETED" } });
}

export async function cancelJob(customerProfileId: string, jobId: string) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new NotFoundError("Job not found.");
  if (job.customerId !== customerProfileId) throw new AuthorizationError();
  if (["COMPLETED", "CANCELLED"].includes(job.status)) {
    throw new ServiceError("This job can no longer be cancelled.");
  }
  return prisma.job.update({ where: { id: jobId }, data: { status: "CANCELLED" } });
}
