"use client";

import Link from "next/link";
import { useEffect } from "react";
import { mobileNavGroups } from "@/lib/navigation";

type MobileNavSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavSheet({ open, onClose }: MobileNavSheetProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60] bg-ink/40 lg:hidden"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        id="mobile-nav-sheet"
        className="fixed inset-x-0 bottom-0 z-[70] max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white shadow-[0_-8px_40px_rgba(10,36,37,0.18)] lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-white px-4 py-4">
          <p className="font-display text-lg font-semibold text-ink">Browse</p>
          <button
            type="button"
            className="min-h-11 px-3 text-sm font-semibold text-accent"
            onClick={onClose}
          >
            Done
          </button>
        </div>

        <div className="space-y-6 px-4 py-6">
          {mobileNavGroups.map((group) => (
            <section key={group.label}>
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-highlight">
                {group.label}
              </h3>
              <ul className="divide-y divide-border border-y border-border">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex min-h-12 items-center text-base ${
                        "highlight" in link && link.highlight
                          ? "font-semibold text-highlight"
                          : "text-ink"
                      }`}
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <Link
            href="/contact"
            className="flex min-h-12 items-center justify-center bg-highlight px-4 text-sm font-semibold text-white"
            onClick={onClose}
          >
            Request referral
          </Link>
        </div>
      </div>
    </>
  );
}
