import { BRAND_NAME, type LeadSubmission } from "./types";

/** Column order for Google Sheet row. */
export function formatLeadRow(lead: LeadSubmission): (string | number)[] {
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

export const SHEET_HEADER_ROW = [
  "Timestamp",
  "Brand name",
  "Full Name",
  "Email",
  "Phone Number",
  "Form Type",
  "Case Description",
];
