import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import { SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy | EmploymentLossExpert.com",
  description: "Privacy policy for EmploymentLossExpert.com.",
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <PageLayout showCTA={false}>
      <PageHero title="Privacy Policy" />
      <article className="prose-content mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p>Last updated: August 2026</p>

        <h2>Who We Are</h2>
        <p>
          EmploymentLossExpert.com (&quot;we&quot;, &quot;us&quot;) operates a referral service connecting
          attorneys with qualified employment loss expert witnesses. We are the data controller for
          personal data submitted through this website.
        </p>

        <h2>Data We Collect</h2>
        <p>
          When you submit our contact form, we collect: your name, email, phone number (optional),
          and any case notes you provide voluntarily.
        </p>

        <h2>Lawful Basis</h2>
        <p>
          We process your data on the basis of legitimate interests (responding to your enquiry and
          matching you with an appropriate expert) and, where applicable, pre-contractual steps at
          your request.
        </p>

        <h2>How We Use Your Data</h2>
        <p>
          We use your data to respond to your enquiry, match you with employment loss expert
          witnesses, and improve our service. We do not sell your personal data.
        </p>

        <h2>Data Sharing</h2>
        <p>
          We may share your enquiry details with qualified expert witnesses for the purpose of
          responding to your instruction request. Submissions are processed through our secure API
          and may be stored in Google Sheets and/or sent to our notification webhook when configured.
          We may use analytics providers if you consent to cookies.
        </p>

        <h2>Retention</h2>
        <p>
          We retain enquiry data for up to 6 years for business and legal purposes, unless you request
          earlier deletion and we have no overriding legal obligation to retain it.
        </p>

        <h2>Your Rights</h2>
        <p>
          Depending on applicable law, you may have rights to access, correct, delete, or restrict
          processing of your personal data. Contact us at{" "}
          <a href={`mailto:${SITE_EMAIL}`} className="font-semibold text-accent">
            {SITE_EMAIL}
          </a>{" "}
          to exercise your rights.
        </p>

        <h2>Cookies</h2>
        <p>
          We may use essential cookies and, with consent, analytics cookies (Google Analytics if
          configured). You can manage cookie preferences through the Cookie Settings control on this
          site.
        </p>

        <h2>Security</h2>
        <p>
          We implement appropriate technical and organisational measures to protect your data.
          Form submissions are transmitted over HTTPS.
        </p>
      </article>
    </PageLayout>
  );
}
