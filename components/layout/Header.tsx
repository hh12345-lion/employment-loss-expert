"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HeaderNavPanel } from "./HeaderNavPanel";
import { MobileNavSheet } from "./MobileNavSheet";

const primaryLinks = [
  { href: "/services", label: "Services" },
  { href: "/practice-areas", label: "Practice areas" },
  { href: "/case-types", label: "Case types" },
  { href: "/how-loss-is-calculated", label: "Loss calculation" },
];

export function Header() {
  const [indexOpen, setIndexOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = () => {
    setIndexOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="border-b border-border bg-white">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label="Employment Loss Expert home"
              onClick={closeAll}
            >
              <Image
                src="/brand/logo.svg"
                alt="Employment Loss Expert"
                width={903}
                height={174}
                className="h-8! w-auto sm:h-10!"
                preload
                unoptimized
              />
            </Link>

            <nav
              className="ml-auto hidden items-center lg:flex"
              aria-label="Main navigation"
            >
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-body transition-colors hover:text-ink"
                  onClick={closeAll}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                className="ml-1 flex min-h-10 items-center gap-1.5 px-3 py-2 text-sm font-medium text-body transition-colors hover:text-ink"
                aria-expanded={indexOpen}
                aria-controls="site-index-panel"
                onClick={() => setIndexOpen((v) => !v)}
              >
                All pages
                <svg
                  className={`h-3.5 w-3.5 transition-transform ${indexOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </nav>

            <Link
              href="/contact"
              className="ml-auto inline-flex min-h-10 items-center bg-highlight px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink lg:ml-2"
              onClick={closeAll}
            >
              <span className="sm:hidden">Referral</span>
              <span className="hidden sm:inline">Request a referral</span>
            </Link>

            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-border text-ink lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-sheet"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
                />
              </svg>
            </button>
          </div>

          <HeaderNavPanel open={indexOpen} onClose={() => setIndexOpen(false)} />
        </div>
      </header>

      <MobileNavSheet open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
