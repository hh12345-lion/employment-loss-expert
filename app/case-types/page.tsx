import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import { siteImages, imageForCaseType } from "@/lib/images";
import { PhotoCard } from "@/components/PhotoCard";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import { caseTypes } from "@/lib/data/case-types";
import { caseTypesHubLinks } from "@/lib/data/seo-related-links";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { itemListSchema } from "@/lib/schema/itemList";

export const metadata: Metadata = createMetadata({
 title: "Case Types Requiring an Employment Loss Expert Witness | Guide",
 description:
 "Which cases need an employment loss expert witness? Personal injury, discrimination, wrongful dismissal, whistleblowing, divorce, and more explained.",
 path: "/case-types",
});

const breadcrumbs = [
 { name: "Home", path: "/" },
 { name: "Case Types", path: "/case-types" },
];

export default function CaseTypesHubPage() {
 return (
 <PageLayout>
 <JsonLd
 data={[
 breadcrumbSchema(breadcrumbs),
 itemListSchema({
 name: "Case types requiring employment loss expert witnesses",
 items: caseTypes.map((ct) => ({
 name: ct.title,
 path: `/case-types/${ct.slug}`,
 })),
 }),
 ]}
 />
 <PageHero
 title="Case Types Requiring an Employment Loss Expert Witness"
 subtitle="Explore the case types where employment loss expert evidence is essential."
 breadcrumbs={breadcrumbs}
 image={siteImages.clinicalRecords}
 />
 <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {caseTypes.map((ct) => (
 <PhotoCard
 key={ct.slug}
 href={`/case-types/${ct.slug}`}
 title={ct.title}
 description={ct.paragraphs[0]}
 clamp
 image={imageForCaseType(ct.slug)}
 cta="Read guide"
 />
 ))}
 </div>
 <RelatedLinks title="Related employment loss resources" links={caseTypesHubLinks} />
 </div>
 </PageLayout>
 );
}
