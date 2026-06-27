import { requireRole } from "@/lib/auth/current-user";
import { DashboardShell } from "@/components/layout/DashboardShell";

const NAV = [
  { href: "/customer/dashboard", label: "Dashboard" },
  { href: "/customer/jobs/new", label: "Post a job" },
  { href: "/customer/jobs", label: "My jobs" },
  { href: "/customer/profile", label: "Profile" },
];

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("CUSTOMER");
  return (
    <DashboardShell roleLabel="Customer" email={user.email} navItems={NAV}>
      {children}
    </DashboardShell>
  );
}
