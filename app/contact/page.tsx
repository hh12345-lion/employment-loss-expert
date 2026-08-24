import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import { SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = createMetadata({
 title: "Request an Employment Loss Expert Witness | Contact",
 description:
 "Share a few case details to be matched with a qualified employment loss expert witness. Typical response within one business day.",
 path: "/contact",
});

const breadcrumbs = [
 { name: "Home", path: "/" },
 { name: "Contact", path: "/contact" },
];

const intakePaths = [
 {
 title: "Personal Injury",
 description: "Loss of earnings, residual earning capacity, labour-market analysis.",
 href: "/practice-areas/personal-injury",
 },
 {
 title: "Employment",
 description: "Schedules of loss, discrimination damages, wrongful dismissal quantum.",
 href: "/practice-areas/employment-tribunal",
 },
 {
 title: "Family Law",
 description: "Career disruption and earning capacity in financial proceedings.",
 href: "/practice-areas/family-law",
 },
];

const trustPoints = [
 "Personal injury, employment, and family-law matters",
 "Matched to case type and timeline",
 "Independent expert witnesses",
 "Response within one business day",
];

export default function ContactPage() {
 return (
 <PageLayout>
 <JsonLd data={breadcrumbSchema(breadcrumbs)} />
 <PageHero
 title="Request an employment loss expert"
 subtitle="Tell us who you are and a little about the matter. We will follow up with a referral match."
 breadcrumbs={breadcrumbs}
 />
 <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
 <div className="mb-12 grid gap-6 border-b border-border pb-10 md:grid-cols-3">
 {intakePaths.map((path) => (
 <div key={path.title}>
 <h2 className="font-display font-semibold text-ink">{path.title}</h2>
 <p className="mt-2 text-sm text-body">{path.description}</p>
 <Link href={path.href} className="mt-3 inline-block text-sm font-semibold text-accent">
 Learn more →
 </Link>
 </div>
 ))}
 </div>

 <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
 <div>
 <h2 className="font-display mb-6 text-xl font-semibold text-ink">Enquiry form</h2>
 <ContactForm />
 </div>
 <aside className="border-l-4 border-accent bg-section-alt p-6 lg:self-start">
 <h2 className="font-display text-lg font-semibold text-ink">Why instruct through us?</h2>
 <ul className="mt-4 space-y-3">
 {trustPoints.map((point) => (
 <li key={point} className="text-sm text-body">
 {point}
 </li>
 ))}
 </ul>
 <div className="mt-6 border-t border-border pt-6">
 <p className="text-sm font-semibold text-ink">Email</p>
 <a
 href={`mailto:${SITE_EMAIL}`}
 className="mt-2 block text-sm font-medium text-accent hover:text-ink"
 >
 {SITE_EMAIL}
 </a>
 </div>
 </aside>
 </div>
 </div>
 </PageLayout>
 );
}
