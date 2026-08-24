import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import { EraBanner } from "@/components/EraBanner";
import { DataTable } from "@/components/DataTable";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema/organization";
import { homepageServices } from "@/lib/data/services";

export const metadata: Metadata = createMetadata({
 title: "Employment Loss Expert Witness | Loss of Earnings & Employment Damages",
 description:
 "Find a qualified employment loss expert witness. Loss of earnings reports for personal injury, employment damages, discrimination, wrongful dismissal, and divorce.",
 path: "/",
});

export default function HomePage() {
 return (
 <PageLayout>
 <JsonLd data={organizationSchema()} />
 <PageHero
 title="Employment loss expert witnesses for attorneys"
 subtitle="When a case turns on past or future earnings, residual earning capacity, or labour-market evidence, you need precise, defensible expert analysis. We match counsel with employment loss experts for personal injury, employment, and family-law matters."
 />
 <EraBanner />

 <section className="bg-white py-12 md:py-16">
 <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
 <Link
 href="/practice-areas/personal-injury"
 className="inline-flex min-h-11 flex-1 items-center justify-center border border-primary bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent sm:min-w-[200px]"
 >
 Personal Injury
 </Link>
 <Link
 href="/practice-areas/employment-tribunal"
 className="inline-flex min-h-11 flex-1 items-center justify-center border border-primary px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-section-alt sm:min-w-[200px]"
 >
 Employment Damages
 </Link>
 <Link
 href="/practice-areas/family-law"
 className="inline-flex min-h-11 flex-1 items-center justify-center border border-primary px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-section-alt sm:min-w-[200px]"
 >
 Family Law
 </Link>
 </div>
 </div>
 </section>

 <section className="bg-section-alt py-14 md:py-16">
 <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 <h2 className="font-display mb-8 text-2xl font-semibold text-ink md:text-3xl">
 What our employment loss experts cover
 </h2>
 <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
 {homepageServices.map((service) => (
 <Link
 key={service.href}
 href={service.href}
 className="bg-white p-5 transition-colors hover:bg-section-alt"
 >
 <h3 className="font-semibold text-ink">{service.title}</h3>
 </Link>
 ))}
 </div>
 <p className="mt-6">
 <Link href="/services" className="font-semibold text-accent hover:text-ink">
 View all services →
 </Link>
 </p>
 </div>
 </section>

 <section className="py-14 md:py-16">
 <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 <h2 className="font-display mb-8 text-2xl font-semibold text-ink md:text-3xl">
 Employment loss evidence at a glance
 </h2>
 <DataTable
 caption="Key employment loss reference points"
 headers={["Topic", "Figure", "Notes"]}
 rows={[
 [
 "Compensatory award context (historical cap)",
 "Statutory caps vary by jurisdiction",
 "Confirm current rules for your forum",
 ],
 [
 "Discrimination / retaliation exposure",
 "Often uncapped economic loss",
 "Earnings models drive settlement ranges",
 ],
 [
 "Wrongful / constructive dismissal",
 "Contract and mitigation focused",
 "Expert labour-market analysis",
 ],
 [
 "Personal injury earning capacity",
 "Past + future loss",
 "Vocational and economic reports",
 ],
 [
 "Family-law career disruption",
 "Case-specific modelling",
 "Earning capacity for support/property",
 ],
 ]}
 footnote="Figures and procedures depend on the forum and governing law. Verify current rules for your matter."
 />
 </div>
 </section>

 <section className="bg-section-alt py-14 md:py-16">
 <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 <h2 className="font-display mb-8 text-2xl font-semibold text-ink md:text-3xl">
 Which practice area are you in?
 </h2>
 <div className="grid gap-8 md:grid-cols-3">
 <div className="border-t-4 border-accent pt-5">
 <h3 className="mb-3 font-display text-lg font-semibold text-ink">Personal Injury</h3>
 <p className="mb-4 text-body">
 Past and future loss of earnings, residual earning capacity, labour-market analysis,
 and pension loss.
 </p>
 <Link href="/practice-areas/personal-injury" className="font-semibold text-accent">
 Personal injury experts →
 </Link>
 </div>
 <div className="border-t-4 border-accent pt-5">
 <h3 className="mb-3 font-display text-lg font-semibold text-ink">Employment</h3>
 <p className="mb-4 text-body">
 Schedules of loss, discrimination damages, mitigation analysis, and wrongful
 dismissal quantum.
 </p>
 <Link href="/practice-areas/employment-tribunal" className="font-semibold text-accent">
 Employment damages experts →
 </Link>
 </div>
 <div className="border-t-4 border-accent pt-5">
 <h3 className="mb-3 font-display text-lg font-semibold text-ink">Family Law</h3>
 <p className="mb-4 text-body">
 Career disruption, earning capacity, and employment-related economic evidence in
 financial proceedings.
 </p>
 <Link href="/practice-areas/family-law" className="font-semibold text-accent">
 Family law experts →
 </Link>
 </div>
 </div>
 <p className="mt-8 text-body">
 Not sure what an employment loss expert witness does?{" "}
 <Link href="/what-is-an-employment-loss-expert" className="font-semibold text-accent">
 Read our definition guide
 </Link>
 .
 </p>
 <div className="mt-8 flex flex-wrap gap-4">
 <Link href="/how-loss-is-calculated" className="font-semibold text-accent">
 How loss is calculated →
 </Link>
 <Link href="/guides" className="font-semibold text-accent">
 Guides →
 </Link>
 <Link href="/faq" className="font-semibold text-accent">
 FAQ →
 </Link>
 <Link href="/contact" className="font-semibold text-accent">
 Request a referral →
 </Link>
 </div>
 </div>
 </section>
 </PageLayout>
 );
}
