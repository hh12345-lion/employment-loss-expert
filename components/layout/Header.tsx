"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_EMAIL } from "@/lib/site";
import { HeaderNavPanel } from "./HeaderNavPanel";
import { MobileNavSheet } from "./MobileNavSheet";

const primaryLinks = [
  { href: "/services", label: "Services" },
  { href: "/practice-areas", label: "Practice areas" },
  { href: "/how-loss-is-calculated", label: "Loss calculation" },
  { href: "/case-types", label: "Case types" },
  { href: "/era-2025", label: "ERA 2025", highlight: true },
  { href: "/guides", label: "Guides" },
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
      <header className="relative z-50">
        <div className="hidden border-b border-border bg-section-alt sm:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-body sm:px-6 lg:px-8">
            <span className="font-medium tracking-wide text-ink/80">
              Expert witness referrals for employment damages
            </span>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="font-semibold text-accent hover:text-ink"
            >
              {SITE_EMAIL}
            </a>
          </div>
        </div>

        <div className="border-b border-border bg-white">
          <div className="mx-auto flex max-w-6xl items-stretch lg:px-8">
            <Link
              href="/"
              className="flex shrink-0 flex-col justify-center bg-ink px-4 py-4 text-white sm:px-6 sm:py-5 lg:min-w-[15rem]"
              onClick={closeAll}
            >
              <span className="font-display text-lg font-semibold leading-tight sm:text-xl">
                Employment Loss
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                Expert
              </span>
            </Link>

            <div className="flex min-w-0 flex-1 items-center justify-end gap-2 px-3 py-3 sm:px-4 lg:gap-1 lg:px-6">
              <nav
                className="hidden items-center lg:flex"
                aria-label="Main navigation"
              >
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 py-2 text-sm transition-colors xl:px-3 ${
                      link.highlight
                        ? "font-semibold text-highlight"
                        : "text-body hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  className="ml-2 flex min-h-10 items-center gap-1 border border-border px-3 py-2 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                  aria-expanded={indexOpen}
                  aria-controls="site-index-panel"
                  onClick={() => setIndexOpen((v) => !v)}
                >
                  Index
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
                className="hidden min-h-10 items-center bg-highlight px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary lg:inline-flex"
              >
                Referral
              </Link>

              <button
                type="button"
                className="inline-flex min-h-11 min-w-11 items-center justify-center bg-section-alt px-3 text-xs font-bold uppercase tracking-wider text-ink lg:hidden"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-sheet"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? "Close" : "Browse"}
              </button>
            </div>
          </div>

          <HeaderNavPanel open={indexOpen} onClose={() => setIndexOpen(false)} />
        </div>
      </header>

      <MobileNavSheet open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
