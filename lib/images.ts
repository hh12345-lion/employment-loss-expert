import type { StaticImageData } from "next/image";
import expertAnalysis from "@/public/images/site/expert-analysis.webp";
import lossDocuments from "@/public/images/site/loss-documents.webp";
import earningsChart from "@/public/images/site/earnings-chart.webp";
import signingInstruction from "@/public/images/site/signing-instruction.webp";
import scalesOfJustice from "@/public/images/site/scales-of-justice.webp";
import courtColumns from "@/public/images/site/court-columns.webp";
import siteWorkers from "@/public/images/site/site-workers.webp";
import clinicalRecords from "@/public/images/site/clinical-records.webp";
import lawLibrary from "@/public/images/site/law-library.webp";
import caseConference from "@/public/images/site/case-conference.webp";
import familyHorizon from "@/public/images/site/family-horizon.webp";
import expertWitness from "@/public/images/site/expert-witness.webp";

export type SiteImage = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position for cover crops. */
  position?: string;
};

const defineImages = <K extends string>(images: Record<K, SiteImage>) => images;

/**
 * Site photography. Every file is pre-mapped to the brand duotone
 * (#0D2928 to #1C4948 to #E7F0F0) so photos share the palette.
 */
export const siteImages = defineImages({
  expertAnalysis: {
    src: expertAnalysis,
    alt: "Two analysts reviewing handwritten loss calculations beside open laptops",
  },
  lossDocuments: {
    src: lossDocuments,
    alt: "Earnings and tax documents laid out with a calculator",
  },
  earningsChart: {
    src: earningsChart,
    alt: "A hand-plotted earnings chart with a ruler and pens",
  },
  signingInstruction: {
    src: signingInstruction,
    alt: "A letter of instruction being signed",
    position: "center 35%",
  },
  scalesOfJustice: {
    src: scalesOfJustice,
    alt: "A bronze Lady Justice statue holding scales",
    position: "80% center",
  },
  courtColumns: {
    src: courtColumns,
    alt: "Stone columns of a court building",
  },
  siteWorkers: {
    src: siteWorkers,
    alt: "Construction workers on site, seen from above",
  },
  clinicalRecords: {
    src: clinicalRecords,
    alt: "A stethoscope beside a laptop with medical records",
  },
  lawLibrary: {
    src: lawLibrary,
    alt: "Shelves of bound volumes in a law library",
  },
  caseConference: {
    src: caseConference,
    alt: "Two professionals in a case conference over a laptop",
    position: "center 30%",
  },
  familyHorizon: {
    src: familyHorizon,
    alt: "A family standing together on a shoreline at dusk",
    position: "center 70%",
  },
  expertWitness: {
    src: expertWitness,
    alt: "A professional in a suit fastening a jacket before a hearing",
    position: "center 30%",
  },
});

const caseTypeImages: Record<string, SiteImage> = {
  "personal-injury-loss-of-earnings": siteImages.siteWorkers,
  "clinical-negligence-employment-loss": siteImages.clinicalRecords,
  "fatal-accident-dependency": siteImages.familyHorizon,
  "divorce-loss-of-career": siteImages.familyHorizon,
  "educational-negligence-career-loss": siteImages.lawLibrary,
  "redundancy-settlement-disputes": siteImages.lossDocuments,
  "discrimination-employment-loss": siteImages.scalesOfJustice,
  "whistleblowing-detriment": siteImages.caseConference,
  "wrongful-dismissal": siteImages.signingInstruction,
};

export function imageForCaseType(slug: string): SiteImage {
  return caseTypeImages[slug] ?? siteImages.courtColumns;
}

const guideImages: Record<string, SiteImage> = {
  "ogden-tables-loss-of-earnings-guide": siteImages.lossDocuments,
  "era-2025-et-loss-guide": siteImages.courtColumns,
  "et-schedule-of-loss-guide": siteImages.earningsChart,
  "family-law-employment-reports": siteImages.familyHorizon,
};

export function imageForGuide(slug: string): SiteImage {
  return guideImages[slug] ?? siteImages.lawLibrary;
}
