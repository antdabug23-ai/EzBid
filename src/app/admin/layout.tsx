import { requireAdmin } from "@/lib/auth/current-user";
import { DashboardShell } from "@/components/layout/DashboardShell";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/vendors", label: "Vendors" },
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/bids", label: "Bids" },
  { href: "/admin/verification", label: "Verification" },
  { href: "/admin/finder-fees", label: "Finder fees" },
  { href: "/admin/reviews", label: "Reviews" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  return (
    <DashboardShell roleLabel="Admin" email={user.email} navItems={NAV}>
      {children}
    </DashboardShell>
  );
}
