import Image from "next/image";
import Link from "next/link";
import { siteImages } from "@/lib/images";

type HomeHeroProps = {
  title: string;
  subtitle: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

/**
 * Homepage hero. The photo is cut to the upper shape of the brand monogram
 * and the lower shape sits beneath it in terracotta, so the image reads as
 * the logo itself rather than a picture placed next to the copy.
 */
export function HomeHero({ title, subtitle, primaryCta, secondaryCta }: HomeHeroProps) {
  const image = siteImages.expertAnalysis;

  return (
    <section className="overflow-hidden border-b border-border bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-8 lg:py-20">
        <div className="reveal-up border-l-4 border-highlight pl-5 md:pl-7">
          <h1 className="font-display max-w-3xl text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.1]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-body md:text-lg">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center bg-highlight px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex min-h-12 items-center justify-center border border-primary px-7 py-3 text-sm font-semibold text-ink transition-colors hover:bg-section-alt"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>

        <div className="relative mx-auto aspect-[365/362] w-full max-w-sm lg:max-w-none">
          <div className="monogram-photo absolute left-0 top-0 h-[74%] w-[94.6%]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
            />
          </div>
          <svg
            viewBox="56 198 309.5 163.5"
            className="absolute left-[15.4%] top-[54.7%] h-auto w-[84.6%]"
            aria-hidden
          >
            <path
              fill="var(--color-highlight)"
              d="M72.4659 361.219C71.0361 361.219 69.6332 360.787 68.4191 359.978C66.4227 358.629 65.2357 356.39 65.2357 353.989V302.19C63.8058 300.328 62.6727 298.305 61.8634 296.201C58.3292 287.109 56.5486 277.532 56.5486 267.711C56.5486 229.537 87.3041 198.484 125.101 198.484H339.041C341.631 198.484 343.924 198.673 346.757 199.617C353.879 201.992 359.41 207.01 362.269 213.727C365.21 220.58 364.967 228.592 361.622 235.661C331.838 298.683 270.327 340.958 201.073 346.003C200.398 346.057 199.724 346.084 199.076 346.084H174.796C174.121 346.084 173.447 346.084 172.799 346.003C158.743 344.978 144.768 342.388 131.306 338.341L75.1638 360.706C74.3005 361.057 73.3832 361.219 72.4929 361.219H72.4659Z"
            />
          </svg>
          <p className="absolute left-[30%] top-[62%] w-[52%] font-display text-sm font-semibold leading-snug text-white sm:text-base lg:text-lg">
            Precise, defensible expert analysis
          </p>
        </div>
      </div>
    </section>
  );
}
