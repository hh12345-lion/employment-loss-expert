export const BRAND_NAME = "EmploymentLossExpert";

export type LeadFormType = "contact" | "instruct";

export type LeadSubmission = {
  fullName: string;
  email: string;
  phone: string;
  formType: LeadFormType;
  description: string;
};

export type LeadPayload = Partial<LeadSubmission> & {
  fullName?: string;
  email?: string;
  phone?: string;
  formType?: LeadFormType;
  description?: string;
  message?: string;
};
