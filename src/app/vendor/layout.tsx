import { requireRole } from "@/lib/auth/current-user";
import { DashboardShell } from "@/components/layout/DashboardShell";

const NAV = [
  { href: "/vendor/dashboard", label: "Dashboard" },
  { href: "/vendor/jobs", label: "Browse jobs" },
  { href: "/vendor/bids", label: "My bids" },
  { href: "/vendor/accepted-jobs", label: "Accepted jobs" },
  { href: "/vendor/reviews", label: "Reviews" },
  { href: "/vendor/profile", label: "Profile" },
  { href: "/vendor/documents", label: "Documents" },
];

export default async function VendorLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("VENDOR");
  return (
    <DashboardShell roleLabel="Vendor" email={user.email} navItems={NAV}>
      {children}
    </DashboardShell>
  );
}
