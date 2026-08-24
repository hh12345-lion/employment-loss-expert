"use client";

import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsButton";

type FooterLegalLinksProps = {
  variant?: "light" | "dark";
};

export function FooterLegalLinks({ variant = "light" }: FooterLegalLinksProps) {
  const linkClass =
    variant === "dark"
      ? "text-white/70 transition-colors hover:text-white"
      : "text-body/80 transition-colors hover:text-ink";

  const buttonClass = variant === "dark" ? "text-white/70 hover:text-white" : undefined;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      <Link href="/privacy" className={linkClass}>
        Privacy
      </Link>
      <Link href="/cookies" className={linkClass}>
        Cookies
      </Link>
      <Link href="/terms" className={linkClass}>
        Terms
      </Link>
      <CookieSettingsButton className={buttonClass} />
    </div>
  );
}
