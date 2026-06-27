import "server-only";
import { prisma } from "@/lib/db/prisma";
import type { VendorProfileInput } from "@/lib/validations/profile";
import { canViewExactJobLocation } from "./authorization";
import { NotFoundError } from "./errors";

export async function upsertVendorProfile(userId: string, input: VendorProfileInput) {
  const data = {
    businessName: input.businessName,
    description: input.description || null,
    phone: input.phone || null,
    email: input.email || null,
    website: input.website || null,
    town: input.town || null,
    state: input.state || null,
    serviceAreaDescription: input.serviceAreaDescription || null,
  };

  const profile = await prisma.vendorProfile.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  });

  // Sync service categories.
  await prisma.vendorServiceCategory.deleteMany({ where: { vendorId: profile.id } });
  if (input.serviceCategoryIds.length > 0) {
    await prisma.vendorServiceCategory.createMany({
      data: input.serviceCategoryIds.map((serviceCategoryId) => ({
        vendorId: profile.id,
        serviceCategoryId,
      })),
      skipDuplicates: true,
    });
  }

  return profile;
}

export async function getVendorProfileWithCategories(userId: string) {
  return prisma.vendorProfile.findUnique({
    where: { userId },
    include: {
      serviceCategories: { include: { serviceCategory: true } },
      documents: { orderBy: { createdAt: "desc" } },
      workPhotos: { orderBy: { createdAt: "desc" } },
    },
  });
}

/** Public-facing vendor profile (safe for customers to view). */
export async function getPublicVendorProfile(vendorProfileId: string) {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { id: vendorProfileId },
    select: {
      id: true,
      businessName: true,
      description: true,
      website: true,
      town: true,
      state: true,
      serviceAreaDescription: true,
      logoUrl: true,
      verificationStatus: true,
      averageRating: true,
      reviewCount: true,
      serviceCategories: { include: { serviceCategory: { select: { name: true } } } },
      workPhotos: { select: { id: true, url: true, caption: true } },
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          overallRating: true,
          writtenReview: true,
          createdAt: true,
          customer: { select: { firstName: true } },
        },
      },
    },
  });
  if (!vendor) throw new NotFoundError("Vendor not found.");
  return vendor;
}

/**
 * Job detail for a vendor. Strips exact address & customer contact unless the
 * vendor has unlocked it (accepted bid + confirmed finder fee).
 */
export async function getJobViewForVendor(vendorProfileId: string, jobId: string) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      serviceCategory: true,
      photos: true,
      finderFee: true,
      acceptedBid: { select: { vendorId: true } },
      customer: {
        select: { id: true, firstName: true, lastName: true, phone: true, town: true, state: true, user: { select: { email: true } } },
      },
      bids: {
        where: { vendorId: vendorProfileId },
        select: { id: true, amount: true, status: true },
      },
    },
  });
  if (!job) throw new NotFoundError("Job not found.");

  const unlocked = canViewExactJobLocation(
    { role: "VENDOR", vendorProfileId },
    {
      customerId: job.customerId,
      acceptedBid: job.acceptedBid ? { vendorId: job.acceptedBid.vendorId } : null,
      finderFee: job.finderFee ? { status: job.finderFee.status } : null,
    }
  );

  const myBid = job.bids[0] ?? null;

  return {
    unlocked,
    myBid,
    job: {
      id: job.id,
      title: job.title,
      description: job.description,
      town: job.town,
      state: job.state,
      budgetMin: job.budgetMin,
      budgetMax: job.budgetMax,
      requestedServiceDate: job.requestedServiceDate,
      preferredServiceWindow: job.preferredServiceWindow,
      isDateFlexible: job.isDateFlexible,
      urgencyLevel: job.urgencyLevel,
      status: job.status,
      createdAt: job.createdAt,
      serviceCategory: job.serviceCategory,
      photos: job.photos,
      finderFee: job.finderFee,
      // Locked fields are null until unlocked (consistent shape for the UI).
      exactAddress: unlocked ? job.exactAddress : null,
      customerContact: {
        firstName: job.customer.firstName,
        lastName: unlocked ? job.customer.lastName : null,
        phone: unlocked ? job.customer.phone : null,
        email: unlocked ? job.customer.user.email : null,
      },
    },
  };
}

export async function addWorkPhoto(vendorProfileId: string, url: string, caption?: string) {
  return prisma.vendorWorkPhoto.create({
    data: { vendorId: vendorProfileId, url, caption: caption || null },
  });
}
