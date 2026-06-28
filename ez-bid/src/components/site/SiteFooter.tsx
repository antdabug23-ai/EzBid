import Link from "next/link";
import { Logo } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="[&_span]:text-white" />
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Connecting customers with trusted local service vendors for home
              and property projects.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">For Customers</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>
                <a href="/signup" className="hover:text-white">
                  Post a Job
                </a>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white">
                  Browse Services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">For Vendors</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>
                <a href="/signup" className="hover:text-white">
                  Join as a Vendor
                </a>
              </li>
              <li>
                <Link href="/for-vendors" className="hover:text-white">
                  Vendor Benefits
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © 2026 EZ Bid. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
