"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth";

const NAV_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/services", label: "Services" },
  { href: "/for-customers", label: "For Customers" },
  { href: "/for-vendors", label: "For Vendors" },
  { href: "/about", label: "About Us" },
];

const DASHBOARD_PREFIXES = ["/customer", "/vendor", "/admin"];

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10v9h14v-9" />
        <path d="M9.5 19v-4h5v4" />
      </svg>
      <span className="text-xl font-extrabold tracking-tight text-slate-900">
        EZ <span className="text-blue-600">BID</span>
      </span>
    </span>
  );
}

export function AppNav({ dashboardPath }: { dashboardPath: string | null }) {
  const pathname = usePathname();

  const isLinkActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const isDashboardActive = DASHBOARD_PREFIXES.some((p) => pathname.startsWith(p));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="EZ Bid home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isLinkActive(link.href)
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {dashboardPath ? (
            <>
              <Link
                href={dashboardPath}
                className={
                  isDashboardActive
                    ? "rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm"
                    : "rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                }
              >
                Dashboard
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
