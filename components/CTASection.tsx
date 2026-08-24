import Link from "next/link";

type CTASectionProps = {
 title?: string;
 description?: string;
 primaryHref?: string;
 primaryLabel?: string;
};

export function CTASection({
 title = "Need an employment loss expert?",
 description = "Share a few case details and we will match you with a qualified employment loss expert witness. Typical response within one business day.",
 primaryHref = "/contact",
 primaryLabel = "Request a referral",
}: CTASectionProps) {
 return (
 <section className="border-y border-border bg-section-alt py-14 md:py-16">
 <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
 <div className="max-w-xl">
 <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">{title}</h2>
 <p className="mt-3 text-body">{description}</p>
 </div>
 <Link
 href={primaryHref}
 className="inline-flex min-h-11 shrink-0 items-center justify-center bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
 >
 {primaryLabel}
 </Link>
 </div>
 </section>
 );
}
