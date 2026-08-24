export const BRAND_NAME = "EmploymentLossExpert";

export type LeadSubmission = {
 fullName: string;
 email: string;
 phone: string;
 description: string;
};

export type LeadPayload = Partial<LeadSubmission> & {
 fullName?: string;
 email?: string;
 phone?: string;
 description?: string;
 message?: string;
};
