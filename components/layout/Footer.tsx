import Link from "next/link";
import { SITE_EMAIL } from "@/lib/site";
import { FooterLegalLinks } from "./FooterLegalLinks";

const practiceLinks = [
  { href: "/services", label: "Services" },
  { href: "/practice-areas", label: "Practice areas" },
  { href: "/case-types", label: "Case types" },
  { href: "/how-loss-is-calculated", label: "How loss is calculated" },
  { href: "/contact", label: "Request referral" },
];

const learnLinks = [
  { href: "/guides", label: "Guides" },
  { href: "/faq", label: "FAQ" },
  { href: "/glossary", label: "Glossary" },
  { href: "/how-to-instruct", label: "How to instruct" },
  { href: "/qualifications", label: "Qualifications" },
  { href: "/what-is-an-employment-loss-expert", label: "What is an employment expert?" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-section-alt">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)] lg:gap-16">
          <div>
            <p className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Employment loss
              <span className="block text-accent">expert referrals.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-body">
              Matching attorneys with independent employment loss expert witnesses for personal
              injury, employment damages, and family-law matters. Not a law firm.
            </p>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="mt-6 inline-block font-display text-lg italic text-ink underline decoration-highlight decoration-2 underline-offset-4 hover:text-accent"
            >
              {SITE_EMAIL}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <dl>
              <dt className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-highlight">
                Practice
              </dt>
              <dd>
                <ul className="space-y-2.5">
                  {practiceLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-body transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>

            <dl>
              <dt className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-highlight">
                Learn
              </dt>
              <dd>
                <ul className="space-y-2.5">
                  {learnLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-body transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} EmploymentLossExpert
          </p>
          <FooterLegalLinks variant="dark" />
        </div>
      </div>
    </footer>
  );
}
