import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import type { CustomerSignupInput, VendorSignupInput } from "@/lib/validations/auth";
import { DUPLICATE_EMAIL_MESSAGE, ServiceError } from "./errors";

type RegisterHooks = {
  onEmailCheckStarted?: () => void;
  onEmailCheckPassed?: () => void;
  onPasswordHashStarted?: () => void;
  onPasswordHashPassed?: () => void;
  onCreateStarted?: () => void;
  onCreatePassed?: () => void;
  onCreateFailed?: (name: string, code?: string) => void;
};

async function assertEmailAvailable(email: string, hooks?: RegisterHooks) {
  hooks?.onEmailCheckStarted?.();
  const existing = await prisma.user.findUnique({ where: { email } });
  hooks?.onEmailCheckPassed?.();
  if (existing) throw new ServiceError(DUPLICATE_EMAIL_MESSAGE);
}

function rethrowDuplicateEmail(err: unknown): never {
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    throw new ServiceError(DUPLICATE_EMAIL_MESSAGE);
  }
  throw err;
}

export async function registerCustomer(input: CustomerSignupInput, hooks?: RegisterHooks) {
  const email = input.email.toLowerCase().trim();
  await assertEmailAvailable(email, hooks);

  hooks?.onPasswordHashStarted?.();
  const passwordHash = await hashPassword(input.password);
  hooks?.onPasswordHashPassed?.();

  hooks?.onCreateStarted?.();
  try {
    const user = await prisma.user.create({
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
    hooks?.onCreatePassed?.();
    return user;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      hooks?.onCreateFailed?.(err.name, err.code);
    } else if (err instanceof Error) {
      hooks?.onCreateFailed?.(err.name);
    } else {
      hooks?.onCreateFailed?.("UnknownError");
    }
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
