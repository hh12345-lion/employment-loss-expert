import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import { getBlogBySlug, getBlogSlugs } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | ${SITE_NAME}`;
  const images = post.image
    ? [{ url: post.image, alt: post.imageAlt || post.title }]
    : undefined;

  return {
    title: { absolute: title },
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const html = markdownToHtml(post.content);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    inLanguage: "en",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: url,
    url,
  };

  return (
    <PageLayout>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), articleLd]} />
      {post.image ? (
        <div className="relative mx-auto h-[min(28rem,55vw)] w-full max-w-6xl border-b border-border">
          <Image
            src={post.image}
            alt={post.imageAlt || post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <article className="prose-content mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 not-prose">
          <ol className="flex flex-wrap items-center gap-1 text-xs uppercase tracking-wide text-body/70">
            {breadcrumbs.map((item, i) => (
              <li key={item.path} className="flex items-center gap-1">
                {i > 0 && (
                  <span aria-hidden className="text-border">
                    /
                  </span>
                )}
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

        <p className="not-prose text-[11px] font-semibold uppercase tracking-widest text-body/70">
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
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-body">{post.description}</p>

        <div className="mt-10" dangerouslySetInnerHTML={{ __html: html }} />

        <p className="not-prose mt-12 border-t border-border pt-8 text-sm">
          <Link href="/blog" className="font-semibold text-accent hover:underline">
            ← Back to the blog
          </Link>
          <span className="mx-3 text-body/50">·</span>
          <Link href="/contact" className="font-semibold text-accent hover:underline">
            Request a referral
          </Link>
        </p>
      </article>
    </PageLayout>
  );
}
