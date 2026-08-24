import Link from "next/link";

export function EraBanner() {
  return (
    <div className="border-y border-border bg-ink px-4 py-4 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p className="text-sm font-medium md:text-base">
          ERA 2025: unfair dismissal compensation caps change from January 2027. Precise expert
          evidence of actual financial loss remains essential in significant employment damages
          matters.
        </p>
        <Link
          href="/era-2025"
          className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
        >
          Learn more →
        </Link>
      </div>
    </div>
  );
}
