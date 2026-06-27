import "server-only";
import { redirect } from "next/navigation";
import type { UserRole } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { getSession } from "./session";

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;

/**
 * Returns the authenticated user with role profiles, or null.
 * Never throws; safe to call from any server component.
 */
export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { customerProfile: true, vendorProfile: true },
  });

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireRole(role: UserRole) {
  const user = await requireUser();
  if (user.role !== role) redirect("/login?error=unauthorized");
  return user;
}

/** Customer with a completed profile. Redirects to profile setup if missing. */
export async function requireCustomer() {
  const user = await requireRole("CUSTOMER");
  if (!user.customerProfile) redirect("/customer/profile?setup=1");
  return { user, profile: user.customerProfile };
}

/** Vendor with a completed profile. Redirects to profile setup if missing. */
export async function requireVendor() {
  const user = await requireRole("VENDOR");
  if (!user.vendorProfile) redirect("/vendor/profile?setup=1");
  return { user, profile: user.vendorProfile };
}

export async function requireAdmin() {
  return requireRole("ADMIN");
}

/** Returns the correct dashboard path for a role. */
export function dashboardPathForRole(role: UserRole): string {
  switch (role) {
    case "CUSTOMER":
      return "/customer/dashboard";
    case "VENDOR":
      return "/vendor/dashboard";
    case "ADMIN":
      return "/admin/dashboard";
    default:
      return "/";
  }
}
