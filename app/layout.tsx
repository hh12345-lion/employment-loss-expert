import type { Metadata } from "next";
import { Literata, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import { ConsentModeInit } from "@/components/cookies/ConsentModeInit";

const sourceSans = Source_Sans_3({
 subsets: ["latin"],
 variable: "--font-source-sans",
 display: "swap",
});

const literata = Literata({
 subsets: ["latin"],
 variable: "--font-literata",
 display: "swap",
});

export const metadata: Metadata = {
 metadataBase: new URL(SITE_URL),
 title: "Employment Loss Expert Witness | EmploymentLossExpert.com",
 description:
 "Employment loss expert witness referral for attorneys. Loss of earnings, employment damages, and family-law economic evidence.",
 verification: {
 google: process.env.GOOGLE_SITE_VERIFICATION,
 other: process.env.BING_SITE_VERIFICATION
 ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
 : undefined,
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="en-US" className={`${sourceSans.variable} ${literata.variable} h-full`}>
 <body className="flex min-h-full flex-col font-sans antialiased">
 <ConsentModeInit />
 <CookieConsentProvider>{children}</CookieConsentProvider>
 </body>
 </html>
 );
}
