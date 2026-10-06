import Image from "next/image";
import Link from "next/link";
import { siteImages } from "@/lib/images";

type CTASectionProps = {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function CTASection({
  title = "Need an employment loss expert?",
  description = "Share a few case details and we will match you with a qualified employment loss expert witness.",
  primaryHref = "/contact",
  primaryLabel = "Request a referral",
}: CTASectionProps) {
  const image = siteImages.caseConference;

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="cta-photo pointer-events-none absolute inset-y-0 right-0 w-full md:w-[55%]" aria-hidden>
        <Image
          src={image.src}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 768px) 55vw, 100vw"
          className="object-cover"
          style={{ objectPosition: image.position }}
        />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">{title}</h2>
          <p className="mt-3 text-white/85">{description}</p>
        </div>
        <Link
          href={primaryHref}
          className="inline-flex min-h-11 w-fit items-center justify-center bg-highlight px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
        >
          {primaryLabel}
        </Link>
      </div>
    </section>
  );
}
