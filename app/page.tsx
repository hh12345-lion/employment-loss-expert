import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { PageLayout } from "@/components/PageLayout";
import { HomeHero } from "@/components/HomeHero";
import { PhotoCard } from "@/components/PhotoCard";
import { LossDiagram } from "@/components/graphics/LossDiagram";
import { siteImages } from "@/lib/images";
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

const practiceAreas = [
  {
    title: "Personal Injury",
    description:
      "Past and future loss of earnings, residual earning capacity, labour-market analysis, and pension loss.",
    href: "/practice-areas/personal-injury",
    cta: "Personal injury experts",
    image: siteImages.siteWorkers,
  },
  {
    title: "Employment",
    description:
      "Schedules of loss, discrimination damages, mitigation analysis, and wrongful dismissal quantum.",
    href: "/practice-areas/employment-tribunal",
    cta: "Employment damages experts",
    image: siteImages.courtColumns,
  },
  {
    title: "Family Law",
    description:
      "Career disruption, earning capacity, and employment-related economic evidence in financial proceedings.",
    href: "/practice-areas/family-law",
    cta: "Family law experts",
    image: siteImages.familyHorizon,
  },
];

const referralSteps = [
  {
    title: "Share the case details",
    text: "Tell us who you are and a little about the matter.",
  },
  {
    title: "We match the right discipline",
    text: "A member of our team reads your enquiry and matches the right expert discipline.",
  },
  {
    title: "We reply by email",
    text: "We aim to reply by email with availability, scope, and next steps for instruction.",
  },
];

const sectionHeading = "font-display text-2xl font-semibold text-ink md:text-3xl";
const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export default function HomePage() {
  return (
    <PageLayout>
      <JsonLd data={organizationSchema()} />
      <HomeHero
        title="Employment loss expert witnesses for attorneys"
        subtitle="When a case turns on past or future earnings, residual earning capacity, or labour-market evidence, you need precise, defensible expert analysis. We match counsel with employment loss experts for personal injury, employment, and family-law matters."
        primaryCta={{ href: "/contact", label: "Request a referral" }}
        secondaryCta={{ href: "/how-loss-is-calculated", label: "How loss is calculated" }}
      />
      <EraBanner />

      <section className="bg-section-alt py-14 md:py-20">
        <div className={container}>
          <h2 className={`${sectionHeading} mb-8`}>Which practice area are you in?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {practiceAreas.map((area) => (
              <PhotoCard key={area.href} as="h3" {...area} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className={container}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className={sectionHeading}>What our employment loss experts cover</h2>
            <Link href="/services" className="font-semibold text-accent hover:text-ink">
              View all services →
            </Link>
          </div>
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {homepageServices.map((service, i) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex flex-col bg-white p-6 transition-colors hover:bg-section-alt"
              >
                <span className="font-display text-sm font-semibold text-primary/60" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{service.summary}</p>
                <span className="mt-auto pt-4 text-sm font-semibold text-accent group-hover:underline">
                  Details →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-section-alt py-14 md:py-20">
        <div className={container}>
          <h2 className={`${sectionHeading} mb-8`}>How a referral works</h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {referralSteps.map((step, i) => (
              <li key={step.title} className="border-t-4 border-primary bg-white p-6">
                <span className="font-display text-3xl font-semibold text-primary" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-14 text-white md:py-20">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14`}>
          <div>
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
              How an earnings loss is built up
            </h2>
            <p className="mt-4 text-white/85">
              Expert evidence compares what would have been earned but for the event with what is
              actually earned, then separates past loss from future loss at the date of assessment.
            </p>
            <Link
              href="/how-loss-is-calculated"
              className="mt-6 inline-flex min-h-11 items-center border border-white/50 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
            >
              How loss is calculated →
            </Link>
          </div>
          <LossDiagram tone="dark" />
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14`}>
          <div>
            <h2 className={sectionHeading}>Employment loss evidence at a glance</h2>
            <p className="mt-4 text-body">
              Not sure what an employment loss expert witness does?{" "}
              <Link href="/what-is-an-employment-loss-expert" className="font-semibold text-accent hover:text-ink">
                Read our definition guide
              </Link>
              , browse the{" "}
              <Link href="/guides" className="font-semibold text-accent hover:text-ink">
                guides
              </Link>
              , or see the{" "}
              <Link href="/faq" className="font-semibold text-accent hover:text-ink">
                FAQ
              </Link>
              .
            </p>
          </div>
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
    </PageLayout>
  );
}
