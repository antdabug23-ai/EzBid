import { prisma } from "@/lib/prisma";
import {
  budgetToRange,
  urgencyToLevel,
  type CreateJobInput,
} from "@/lib/validations/job";

/**
 * Create a new job for a customer.
 *
 * Privacy: only town/state (approximate location) are collected in this phase.
 * `exactAddress` is required by the schema but is intentionally stored empty
 * here and never exposed to vendors. No exact address is collected yet.
 */
export async function createCustomerJob(customerProfileId: string, input: CreateJobInput) {
  const { min: budgetMin, max: budgetMax } = budgetToRange(input.budget);
  const urgencyLevel = urgencyToLevel(input.urgency);
  const requestedServiceDate = new Date(input.serviceDate);
  const isDateFlexible = input.urgency === "FLEXIBLE";

  const job = await prisma.job.create({
    data: {
      title: input.title,
      description: input.description,
      town: input.town,
      state: input.state,
      exactAddress: "",
      budgetMin,
      budgetMax,
      requestedServiceDate,
      isDateFlexible,
      urgencyLevel,
      status: "OPEN",
      customer: { connect: { id: customerProfileId } },
      serviceCategory: {
        connectOrCreate: {
          where: { name: input.serviceCategory },
          create: { name: input.serviceCategory },
        },
      },
    },
    select: { id: true },
  });

  return job;
}

/** List the logged-in customer's own jobs (newest first). */
export async function listCustomerJobs(customerProfileId: string) {
  return prisma.job.findMany({
    where: { customerId: customerProfileId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      town: true,
      state: true,
      status: true,
      requestedServiceDate: true,
      createdAt: true,
      serviceCategory: { select: { name: true } },
      _count: { select: { bids: true } },
    },
  });
}

/** Fetch a single job, scoped to its owner. Returns null if not found or not owned. */
export async function getCustomerJob(customerProfileId: string, jobId: string) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      customerId: true,
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
    },
  });

  if (!job || job.customerId !== customerProfileId) return null;
  return job;
}
