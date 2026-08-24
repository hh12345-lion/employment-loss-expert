import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";

type PageHeroProps = {
 title: string;
 subtitle?: string;
 breadcrumbs?: BreadcrumbItem[];
};

export function PageHero({ title, subtitle, breadcrumbs }: PageHeroProps) {
 return (
 <section className="border-b border-border bg-white">
 <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
 {breadcrumbs && breadcrumbs.length > 0 && (
 <nav aria-label="Breadcrumb" className="mb-5">
 <ol className="flex flex-wrap items-center gap-1 text-xs uppercase tracking-wide text-body/70">
 {breadcrumbs.map((item, i) => (
 <li key={item.path} className="flex items-center gap-1">
 {i > 0 && <span aria-hidden className="text-border">/</span>}
 {i === breadcrumbs.length - 1 ? (
 <span className="text-ink">{item.name}</span>
 ) : (
 <Link href={item.path} className="hover:text-accent">
 {item.name}
 </Link>
 )}
 </li>
 ))}
 </ol>
 </nav>
 )}
 <div className="reveal-up border-l-4 border-accent pl-5 md:pl-7">
 <h1 className="font-display max-w-3xl text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-[2.75rem] lg:leading-tight">
 {title}
 </h1>
 {subtitle && (
 <p className="mt-4 max-w-2xl text-base leading-relaxed text-body md:text-lg">
 {subtitle}
 </p>
 )}
 </div>
 </div>
 </section>
 );
}
