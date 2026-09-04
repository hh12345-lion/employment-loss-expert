/**
 * Netlify serverless handler for /api/submit-lead.
 * Outbound webhook uses the standard five-key JSON (see Lead_notification_setup.md).
 */
const { google } = require("googleapis");

const BRAND_NAME = "EmploymentLossExpert";

function sanitize(value) {
  if (value == null) return "";
  return String(value).replace(/<[^>]*>/g, "").trim();
}

function getSiteDomain() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL || "https://employmentlossexpert.com";
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

function parseLead(body) {
  const fullName = sanitize(body.fullName);
  const email = sanitize(body.email).toLowerCase();
  const phone = sanitize(body.phone);
  const formType = sanitize(body.formType).toLowerCase() === "instruct" ? "instruct" : "contact";
  const description = sanitize(body.description || body.message);

  if (!fullName || !email) return null;

  return { fullName, email, phone, formType, description };
}

function formatRow(lead) {
  return [
    new Date().toISOString(),
    BRAND_NAME,
    lead.fullName,
    lead.email,
    lead.phone,
    lead.formType,
    lead.description,
  ];
}

function normalizePrivateKey(raw) {
  if (!raw) return undefined;
  let key = String(raw).trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n");
}

function sheetsConfigured() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_SHEET_ID
  );
}

async function writeToSheets(lead) {
  if (!sheetsConfigured()) return false;

  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const tab = process.env.GOOGLE_SHEET_TAB_NAME || "Sheet14";
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${tab}!A:G`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [formatRow(lead)] },
    });
    return true;
  } catch (error) {
    console.error("Google Sheets write failed:", error);
    return false;
  }
}

async function postToWebhook(lead) {
  const webhookUrl =
    process.env.Lead_notification_url || process.env.LEAD_NOTIFICATION_URL;
  if (!webhookUrl) return false;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "Full Name": lead.fullName,
      Email: lead.email,
      "Phone Number": lead.phone || "",
      "Brand name": BRAND_NAME,
      domain: getSiteDomain(),
    }),
  });
  return response.ok;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const lead = parseLead(body);
  if (!lead) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "fullName and email are required" }),
    };
  }

  const sheetsOk = await writeToSheets(lead);
  let webhookOk = false;
  try {
    webhookOk = await postToWebhook(lead);
  } catch (error) {
    console.error("Webhook delivery failed:", error);
  }

  if (!sheetsOk && !webhookOk) {
    const hasWebhook = Boolean(
      process.env.Lead_notification_url || process.env.LEAD_NOTIFICATION_URL
    );
    const hasSheets = sheetsConfigured();
    if (!hasWebhook && !hasSheets) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Lead storage is not configured" }),
      };
    }
    return {
      statusCode: 502,
      body: JSON.stringify({ error: "Failed to save your enquiry" }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  };
};
