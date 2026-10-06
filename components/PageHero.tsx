import Image from "next/image";
import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";
import type { SiteImage } from "@/lib/images";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  image?: SiteImage;
};

export function PageHero({ title, subtitle, breadcrumbs, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-white">
      {image && (
        <div
          className="hero-photo pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block"
          aria-hidden
        >
          <Image
            src={image.src}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 46vw, 0px"
            className="object-cover"
            style={{ objectPosition: image.position }}
          />
        </div>
      )}
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className={`reveal-up border-l-4 border-highlight pl-5 md:pl-7 ${image ? "md:max-w-[60%]" : ""}`}>
          <h1 className="font-display max-w-3xl text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-body md:text-lg">
              {subtitle}
            </p>
          )}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mt-6">
              <ol className="flex flex-wrap items-center gap-1 text-xs uppercase tracking-wide text-body/80">
                {breadcrumbs.map((item, i) => (
                  <li key={item.path} className="flex items-center gap-1">
                    {i > 0 && <span aria-hidden className="text-border">/</span>}
                    {i === breadcrumbs.length - 1 ? (
                      <span className="text-ink">{item.name}</span>
                    ) : (
                      <Link href={item.path} className="hover:text-highlight">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
      </div>
      {image && (
        <div className="hero-photo-band relative h-36 md:hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            placeholder="blur"
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: image.position }}
          />
        </div>
      )}
    </section>
  );
}
