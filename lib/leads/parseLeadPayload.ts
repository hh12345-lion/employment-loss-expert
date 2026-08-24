import type { LeadPayload, LeadSubmission } from "./types";

function sanitize(value: unknown): string {
 if (value == null) return "";
 return String(value).replace(/<[^>]*>/g, "").trim();
}

export function parseLeadPayload(body: LeadPayload): LeadSubmission | null {
 const fullName = sanitize(body.fullName);
 const email = sanitize(body.email).toLowerCase();
 const phone = sanitize(body.phone);
 const description = sanitize(body.description || body.message);

 if (!fullName || !email) {
 return null;
 }

 return {
 fullName,
 email,
 phone,
 description,
 };
}
