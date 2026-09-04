const DEFAULT_SITE_URL = "https://employmentlossexpert.com";

/** Canonical origin for SEO — strips www; ignores localhost/netlify preview env. */
export function getPublicSiteUrl(): string {
  const fallback = DEFAULT_SITE_URL;
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return fallback;
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    if (
      u.hostname === "localhost" ||
      u.hostname === "127.0.0.1" ||
      u.hostname.endsWith(".netlify.app")
    ) {
      return fallback;
    }
    u.hostname = u.hostname.replace(/^www\./i, "");
    return u.origin.replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

export const SITE_URL = getPublicSiteUrl();
export const SITE_NAME = "EmploymentLossExpert";
export const SITE_EMAIL = "contact@employmentlossexpert.com";
export const SITE_REGION = "US";
/** Short label — avoid repeating country names in marketing copy. */
export const SITE_REGION_LABEL = "nationwide";
export const LINKEDIN_URL =
  "https://www.linkedin.com/company/employment-loss-expert";

export const COLORS = {
  primary: "#0F3D3E",
  accent: "#1A6B6C",
  highlight: "#C45C26",
  background: "#F7FAFA",
  sectionAlt: "#EEF6F6",
  border: "#C5D9D9",
  heading: "#0A2425",
  body: "#3F4F4F",
} as const;
