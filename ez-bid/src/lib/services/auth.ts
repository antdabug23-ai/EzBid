import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import type { CustomerSignupInput, VendorSignupInput } from "@/lib/validations/auth";
import { DUPLICATE_EMAIL_MESSAGE, ServiceError } from "./errors";

async function assertEmailAvailable(email: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new ServiceError(DUPLICATE_EMAIL_MESSAGE);
}

function rethrowDuplicateEmail(err: unknown): never {
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    throw new ServiceError(DUPLICATE_EMAIL_MESSAGE);
  }
  throw err;
}

export async function registerCustomer(input: CustomerSignupInput) {
  const email = input.email.toLowerCase().trim();
  await assertEmailAvailable(email);
  const passwordHash = await hashPassword(input.password);

  try {
    return await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: "CUSTOMER",
        customerProfile: {
          create: {
            firstName: input.firstName.trim(),
            lastName: input.lastName.trim(),
            phone: input.phone?.trim() || null,
            town: input.town?.trim() || null,
            state: input.state?.trim() || null,
          },
        },
      },
    });
  } catch (err) {
    rethrowDuplicateEmail(err);
  }
}

export async function registerVendor(input: VendorSignupInput) {
  const email = input.email.toLowerCase().trim();
  await assertEmailAvailable(email);
  const passwordHash = await hashPassword(input.password);

  try {
    return await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: "VENDOR",
        vendorProfile: {
          create: {
            businessName: input.businessName.trim(),
            phone: input.phone?.trim() || null,
            email,
            town: input.town?.trim() || null,
            state: input.state?.trim() || null,
          },
        },
      },
    });
  } catch (err) {
    rethrowDuplicateEmail(err);
  }
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
