import { BRAND_NAME } from "./leads/types";
import { getSiteDomain } from "./seo";

export type LeadWebhookInput = {
  fullName: string;
  email: string;
  phone: string;
};

/** POST the standard five-key JSON payload to Lead_notification_url. */
export async function notifyLeadWebhook(lead: LeadWebhookInput): Promise<boolean> {
  const webhookUrl =
    process.env.Lead_notification_url || process.env.LEAD_NOTIFICATION_URL;

  if (!webhookUrl) return false;

  const outbound = {
    "Full Name": lead.fullName,
    Email: lead.email,
    "Phone Number": lead.phone || "",
    "Brand name": BRAND_NAME,
    domain: getSiteDomain(),
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(outbound),
  });

  return response.ok;
}
