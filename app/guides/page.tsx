import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import { siteImages, imageForGuide } from "@/lib/images";
import { PhotoCard } from "@/components/PhotoCard";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import { guides } from "@/lib/data/guides";
import { guidesHubLinks } from "@/lib/data/seo-related-links";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { itemListSchema } from "@/lib/schema/itemList";

export const metadata: Metadata = createMetadata({
 title: "Guides: Employment Loss Expert Witnesses | PI, ET & Family Law",
 description:
 "In-depth guides for attorneys on employment loss expert witnesses: loss of earnings, ET compensation, discrimination, and ERA 2025 uncapped awards.",
 path: "/guides",
});

const breadcrumbs = [
 { name: "Home", path: "/" },
 { name: "Guides", path: "/guides" },
];

export default function GuidesHubPage() {
 return (
 <PageLayout>
 <JsonLd
 data={[
 breadcrumbSchema(breadcrumbs),
 itemListSchema({
 name: "Guides on employment loss expert witnesses",
 items: guides.map((g) => ({ name: g.h1, path: `/guides/${g.slug}` })),
 }),
 ]}
 />
 <PageHero
 title="Guides: Employment Loss Expert Witnesses"
 subtitle="In-depth guides for attorneys on employment loss expert evidence across PI, ET, and family law."
 breadcrumbs={breadcrumbs}
 image={siteImages.lawLibrary}
 />
 <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {guides.map((guide) => (
 <PhotoCard
 key={guide.slug}
 href={`/guides/${guide.slug}`}
 title={guide.h1}
 description={`${guide.sections[0].content.slice(0, 120)}...`}
 image={imageForGuide(guide.slug)}
 cta="Read guide"
 />
 ))}
 </div>
 <RelatedLinks title="Related employment loss resources" links={guidesHubLinks} />
 </div>
 </PageLayout>
 );
}
