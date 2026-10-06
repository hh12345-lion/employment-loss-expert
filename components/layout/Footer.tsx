import Image from "next/image";
import Link from "next/link";
import { SITE_EMAIL } from "@/lib/site";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsButton";

const practiceLinks = [
  { href: "/services", label: "Services" },
  { href: "/practice-areas", label: "Practice areas" },
  { href: "/case-types", label: "Case types" },
  { href: "/how-loss-is-calculated", label: "How loss is calculated" },
  { href: "/era-2025", label: "ERA 2025" },
];

const learnLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/guides", label: "Guides" },
  { href: "/faq", label: "FAQ" },
  { href: "/glossary", label: "Glossary" },
  { href: "/how-to-instruct", label: "How to instruct" },
  { href: "/qualifications", label: "Qualifications" },
  { href: "/what-is-an-employment-loss-expert", label: "What is an employment expert?" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/terms", label: "Terms" },
];

const headingClass = "mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-section-alt/70";
const linkClass = "text-sm text-white/75 transition-colors hover:text-white";

function LinkColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className={headingClass}>{title}</p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <Link href="/" aria-label="Employment Loss Expert home" className="inline-block">
              <Image
                src="/brand/logo-light.svg"
                alt="Employment Loss Expert"
                width={903}
                height={174}
                className="h-12! w-auto"
                unoptimized
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/75">
              Matching attorneys with independent employment loss expert witnesses for personal
              injury, employment damages, and family-law matters. Not a law firm.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <LinkColumn title="Practice" links={practiceLinks} />
            <LinkColumn title="Learn" links={learnLinks} />
            <LinkColumn title="Legal" links={legalLinks} />
            <div>
              <p className={headingClass}>Contact</p>
              <ul className="space-y-2.5">
                <li>
                  <a href={`mailto:${SITE_EMAIL}`} className={`${linkClass} break-all`}>
                    {SITE_EMAIL}
                  </a>
                </li>
                <li>
                  <Link href="/contact" className={linkClass}>
                    Request a referral
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} EmploymentLossExpert
          </p>
          <CookieSettingsButton className="text-white/70! hover:text-white!" />
        </div>
      </div>
    </footer>
  );
}
