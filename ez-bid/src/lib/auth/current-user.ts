import { redirect } from "next/navigation";
import type { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getSession } from "./session";

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    include: { customerProfile: true, vendorProfile: true },
  });
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

export async function requireCustomer() {
  const user = await requireRole("CUSTOMER");
  if (!user.customerProfile) redirect("/customer/profile?setup=1");
  return { user, profile: user.customerProfile };
}

export async function requireVendor() {
  const user = await requireRole("VENDOR");
  if (!user.vendorProfile) redirect("/vendor/profile?setup=1");
  return { user, profile: user.vendorProfile };
}

export async function requireAdmin() {
  return requireRole("ADMIN");
}

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
