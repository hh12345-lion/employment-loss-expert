"use client";

import { useCookieConsent } from "./CookieConsentProvider";

type CookieSettingsButtonProps = {
 className?: string;
};

export function CookieSettingsButton({ className = "" }: CookieSettingsButtonProps) {
 const { openSettings } = useCookieConsent();

 return (
 <button
 type="button"
 onClick={openSettings}
 className={`text-left text-sm text-body/80 transition-colors hover:text-ink focus:outline-none focus:underline ${className}`}
 >
 Cookie Settings
 </button>
 );
}
