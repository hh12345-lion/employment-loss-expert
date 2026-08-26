import { appendRow, isGoogleSheetsConfigured } from "@/lib/google-sheets";
import { notifyLeadWebhook } from "@/lib/leadNotification";
import { formatLeadRow } from "./formatLeadRow";
import { parseLeadPayload } from "./parseLeadPayload";
import type { LeadPayload } from "./types";

async function writeToGoogleSheets(
  lead: ReturnType<typeof parseLeadPayload> & object
): Promise<boolean> {
  if (!isGoogleSheetsConfigured()) return false;

  try {
    await appendRow(formatLeadRow(lead));
    return true;
  } catch (error) {
    console.error("Google Sheets write failed:", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return false;
  }
}

export type ProcessLeadResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

export async function processLeadSubmission(body: LeadPayload): Promise<ProcessLeadResult> {
  const lead = parseLeadPayload(body);

  if (!lead) {
    return { ok: false, status: 400, error: "fullName and email are required" };
  }

  const sheetsOk = await writeToGoogleSheets(lead);
  let webhookOk = false;

  try {
    webhookOk = await notifyLeadWebhook({
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
    });
  } catch (error) {
    console.error("Webhook delivery failed:", error);
  }

  if (!sheetsOk && !webhookOk) {
    const hasWebhook = Boolean(
      process.env.Lead_notification_url || process.env.LEAD_NOTIFICATION_URL
    );
    const hasSheets = isGoogleSheetsConfigured();

    if (!hasWebhook && !hasSheets) {
      return { ok: false, status: 500, error: "Lead storage is not configured" };
    }

    return { ok: false, status: 502, error: "Failed to save your enquiry" };
  }

  return { ok: true };
}
