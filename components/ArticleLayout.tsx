import type { ReactNode } from "react";
import Link from "next/link";
import { ArticleToc } from "./ArticleToc";

type ArticleLayoutProps = {
  children: ReactNode;
  /** Show the referral box in the side rail. Off for legal pages. */
  referral?: boolean;
};

/** Long-form page body with a sticky side rail: contents list and referral box. */
export function ArticleLayout({ children, referral = true }: ArticleLayoutProps) {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:px-8">
      <article className="min-w-0" data-article>
        {children}
      </article>
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-6">
          <ArticleToc />
          {referral && (
            <div className="bg-ink p-5 text-white">
              <p className="font-display text-lg font-semibold leading-snug">
                Need an employment loss expert?
              </p>
              <p className="mt-2 text-sm text-white/80">
                Share a few case details and we will match you with a qualified expert.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center bg-highlight px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
              >
                Request a referral
              </Link>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
