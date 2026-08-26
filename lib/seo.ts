/**
 * Canonical public hostname for webhook routing (no protocol, no www).
 * Source: NEXT_PUBLIC_SITE_URL
 */
export function getSiteDomain(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.employmentlossexpert.com";

  try {
    return new URL(raw).hostname.replace(/^www\./i, "");
  } catch {
    return raw
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .split("/")[0]
      .trim();
  }
}
