import type { LeadFormType, LeadPayload, LeadSubmission } from "./types";

function sanitize(value: unknown): string {
  if (value == null) return "";
  return String(value).replace(/<[^>]*>/g, "").trim();
}

function parseFormType(value: unknown): LeadFormType {
  const raw = sanitize(value).toLowerCase();
  return raw === "instruct" ? "instruct" : "contact";
}

export function parseLeadPayload(body: LeadPayload): LeadSubmission | null {
  const fullName = sanitize(body.fullName);
  const email = sanitize(body.email).toLowerCase();
  const phone = sanitize(body.phone);
  const formType = parseFormType(body.formType);
  const description = sanitize(body.description || body.message);

  if (!fullName || !email) {
    return null;
  }

  return {
    fullName,
    email,
    phone,
    formType,
    description,
  };
}
