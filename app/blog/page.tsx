import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import { getAllBlogPosts } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Blog — Employment Loss Expert Witness Insights",
  description:
    "Articles on employment loss expert evidence, tribunal financial analysis, and when specialist earnings evidence may assist instructing solicitors.",
  path: "/blog",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blog`,
    inLanguage: "en",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated || post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
      image: post.image ? `${SITE_URL}${post.image}` : undefined,
    })),
  };

  return (
    <PageLayout>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), blogLd]} />
      <PageHero
        title="Employment Loss Expert Blog"
        subtitle="Practitioner-facing articles on employment loss evidence, tribunal financial analysis, and instructing employment loss experts."
        breadcrumbs={breadcrumbs}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink"
          >
            Request a referral
          </Link>
          <Link
            href="/guides"
            className="inline-flex min-h-[44px] items-center justify-center border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent"
          >
            Browse guides
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-body">Articles will appear here shortly.</p>
        ) : (
          <ul className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="overflow-hidden rounded-lg border border-border bg-white card-shadow"
              >
                {post.image ? (
                  <Link href={`/blog/${post.slug}`} className="relative block h-52 w-full">
                    <Image
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </Link>
                ) : null}
                <div className="p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-body/70">
                    <time dateTime={post.updated || post.date}>
                      {new Date(post.updated || post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span className="mx-2">·</span>
                    <span className="normal-case tracking-normal">{post.readingTime}</span>
                  </p>
                  <h2 className="mt-3 font-display text-xl font-semibold text-ink">
                    <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-body">{post.description}</p>
                  <p className="mt-5">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-semibold text-accent hover:underline"
                    >
                      Read article →
                    </Link>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageLayout>
  );
}
