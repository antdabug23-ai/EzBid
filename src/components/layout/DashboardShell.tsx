import * as React from "react";
import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";
import { SidebarNav, type NavItem } from "./SidebarNav";

interface DashboardShellProps {
  roleLabel: string;
  email: string;
  navItems: NavItem[];
  children: React.ReactNode;
}

export function DashboardShell({ roleLabel, email, navItems, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
              EZ
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">EZ Bid</span>
            <span className="ml-1 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              {roleLabel}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:inline">{email}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="lg:w-56 lg:shrink-0">
          <div className="rounded-xl border border-slate-200 bg-white p-2 lg:sticky lg:top-20">
            <SidebarNav items={navItems} />
          </div>
        </aside>
        <main className="min-w-0 flex-1 space-y-6">{children}</main>
      </div>
    </div>
  );
}
