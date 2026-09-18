/** Map site-specific free-text field names to universal `message`. */
function resolveLeadMessage(body) {
  if (!body || typeof body !== "object") return "";
  const keys = [
    "message",
    "Message",
    "description",
    "enquiry",
    "details",
    "summary",
    "notes",
    "matter",
    "caseSummary",
    "additionalInfo",
    "additional_info",
    "caseDetails",
    "enquiryDetails",
  ];
  for (const key of keys) {
    if (body[key] != null && String(body[key]).trim()) {
      return String(body[key]).trim();
    }
  }
  return "";
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
