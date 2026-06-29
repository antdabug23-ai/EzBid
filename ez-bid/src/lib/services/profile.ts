import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { ServiceError } from "./errors";
import type { CustomerProfileInput, VendorProfileInput } from "@/lib/validations/profile";

/** Update the logged-in customer's own profile. Scoped by userId. */
export async function updateCustomerProfile(userId: string, input: CustomerProfileInput) {
  return prisma.customerProfile.update({
    where: { userId },
    data: {
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      phone: input.phone?.trim() || null,
      town: input.town?.trim() || null,
      state: input.state?.trim() || null,
    },
  });
}

/** Service category names the vendor currently offers. */
export async function getVendorServiceNames(vendorProfileId: string): Promise<string[]> {
  const rows = await prisma.vendorServiceCategory.findMany({
    where: { vendorId: vendorProfileId },
    select: { serviceCategory: { select: { name: true } } },
  });
  return rows.map((r) => r.serviceCategory.name);
}

/**
 * Update the logged-in vendor's own profile and the set of services they offer.
 * Scoped by userId. Never touches private documents or verification status.
 */
export async function updateVendorProfile(
  userId: string,
  input: VendorProfileInput,
  serviceCategoryNames: string[]
) {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!vendor) throw new ServiceError("Vendor profile not found.");

  const uniqueNames = Array.from(new Set(serviceCategoryNames.map((n) => n.trim()).filter(Boolean)));

  await prisma.$transaction(async (tx) => {
    await tx.vendorProfile.update({
      where: { userId },
      data: {
        businessName: input.businessName.trim(),
        phone: input.phone?.trim() || null,
        town: input.town?.trim() || null,
        state: input.state?.trim() || null,
        description: input.description?.trim() || null,
        serviceAreaDescription: input.serviceAreaDescription?.trim() || null,
        website: input.website?.trim() || null,
      },
    });

    await tx.vendorServiceCategory.deleteMany({ where: { vendorId: vendor.id } });

    for (const name of uniqueNames) {
      const category = await tx.serviceCategory.upsert({
        where: { name },
        update: {},
        create: { name },
      });
      await tx.vendorServiceCategory.create({
        data: { vendorId: vendor.id, serviceCategoryId: category.id },
      });
    }
  });
}

/**
 * Change the logged-in user's own password. Verifies the current password
 * against the stored hash, then stores a new bcrypt hash. Never logs secrets.
 */
export async function changeUserPassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { passwordHash: true },
  });
  if (!user) throw new ServiceError("Unable to update password right now.");

  const valid = await verifyPassword(currentPassword, user.passwordHash);
  if (!valid) throw new ServiceError("Current password is incorrect.");

  const passwordHash = await hashPassword(newPassword);
  await prisma.user.update({ where: { id: userId }, data: { passwordHash } });
}
