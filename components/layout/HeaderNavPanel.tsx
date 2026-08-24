"use client";

import Link from "next/link";
import { mobileNavGroups } from "@/lib/navigation";

type HeaderNavPanelProps = {
  open: boolean;
  onClose: () => void;
};

export function HeaderNavPanel({ open, onClose }: HeaderNavPanelProps) {
  if (!open) return null;

  return (
    <div
      id="site-index-panel"
      className="border-t border-border bg-white"
      role="region"
      aria-label="Site index"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {mobileNavGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-highlight">
              {group.label}
            </p>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors hover:text-accent ${
                      "highlight" in link && link.highlight
                        ? "font-semibold text-highlight"
                        : "text-body"
                    }`}
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
