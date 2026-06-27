import "server-only";
import { prisma } from "@/lib/db/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import type { CustomerSignupInput, VendorSignupInput } from "@/lib/validations/auth";
import { ServiceError } from "./errors";

async function assertEmailAvailable(email: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new ServiceError("An account with that email already exists.");
}

export async function registerCustomer(input: CustomerSignupInput) {
  const email = input.email.toLowerCase().trim();
  await assertEmailAvailable(email);
  const passwordHash = await hashPassword(input.password);

  return prisma.user.create({
    data: {
      email,
      passwordHash,
      role: "CUSTOMER",
      customerProfile: {
        create: {
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone || null,
          town: input.town || null,
          state: input.state || null,
        },
      },
    },
  });
}

export async function registerVendor(input: VendorSignupInput) {
  const email = input.email.toLowerCase().trim();
  await assertEmailAvailable(email);
  const passwordHash = await hashPassword(input.password);

  return prisma.user.create({
    data: {
      email,
      passwordHash,
      role: "VENDOR",
      vendorProfile: {
        create: {
          businessName: input.businessName,
          phone: input.phone || null,
          email,
          town: input.town || null,
          state: input.state || null,
        },
      },
    },
  });
}

/** Verify credentials. Returns the user or null (no info leak on which failed). */
export async function authenticate(emailRaw: string, password: string) {
  const email = emailRaw.toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return null;
  return user;
}
