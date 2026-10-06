import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/lib/images";

type PhotoCardProps = {
  href: string;
  title: string;
  description: string;
  image: SiteImage;
  cta: string;
  /** Limit the description to three lines. */
  clamp?: boolean;
  /** Heading level for the title; cards under a section h2 should use h3. */
  as?: "h2" | "h3";
};

export function PhotoCard({ href, title, description, image, cta, clamp, as: Heading = "h2" }: PhotoCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col border border-border bg-white transition-colors hover:border-primary"
    >
      <div className="card-photo relative aspect-[16/10] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
          style={{ objectPosition: image.position }}
        />
        <span className="absolute bottom-0 left-0 h-1.5 w-20 bg-highlight" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="font-display text-lg font-semibold text-ink">{title}</Heading>
        <p className={`mt-2 text-sm leading-relaxed text-body ${clamp ? "line-clamp-3" : ""}`}>
          {description}
        </p>
        <span className="mt-auto pt-4 text-sm font-semibold text-accent group-hover:underline">
          {cta} →
        </span>
      </div>
    </Link>
  );
}
