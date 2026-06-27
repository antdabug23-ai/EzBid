import Link from "next/link";
import { getCurrentUser, dashboardPathForRole } from "@/lib/auth/current-user";
import { ButtonLink } from "@/components/ui/Button";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
              EZ
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">EZ Bid</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/how-it-works"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              How it works
            </Link>
            {user ? (
              <ButtonLink href={dashboardPathForRole(user.role)} size="sm">
                Dashboard
              </ButtonLink>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Log in
                </Link>
                <ButtonLink href="/signup/customer" size="sm">
                  Get started
                </ButtonLink>
              </>
            )}
          </nav>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} EZ Bid. Local services made simple.</p>
          <div className="flex gap-4">
            <Link href="/how-it-works" className="hover:text-slate-700">
              How it works
            </Link>
            <Link href="/signup/vendor" className="hover:text-slate-700">
              Become a vendor
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
