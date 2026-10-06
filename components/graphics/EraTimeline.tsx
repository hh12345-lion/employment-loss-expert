const milestones = [
  {
    date: "6 April 2026",
    items: [
      "Whistleblowing: sexual harassment becomes a qualifying disclosure",
      "SSP waiting days and lower earnings limit removed",
      "Protective award doubled to 180 days (April 2026)",
    ],
  },
  {
    date: "1 July 2026",
    items: ["Employees recruited on or before this date gain unfair dismissal rights on 1 January 2027"],
  },
  {
    date: "1 January 2027",
    items: [
      "Unfair dismissal compensation caps removed",
      "Qualifying period falls from 2 years to 6 months",
    ],
    key: true,
  },
];

/** Dated summary of the ERA 2025 changes described on the page. */
export function EraTimeline() {
  return (
    <figure className="not-prose my-10 border border-border bg-white" aria-label="ERA 2025 timeline">
      <ol className="grid md:grid-cols-3" style={{ padding: 0, margin: 0, listStyle: "none" }}>
        {milestones.map((m, i) => (
          <li
            key={m.date}
            className={`relative border-border p-6 pt-10 ${i > 0 ? "border-t md:border-l md:border-t-0" : ""} ${
              m.key ? "bg-ink text-white" : ""
            }`}
            style={{ margin: 0 }}
          >
            <span
              className={`absolute left-6 top-0 h-1.5 w-16 ${m.key ? "bg-highlight" : "bg-primary"}`}
              aria-hidden
            />
            <p
              className={`font-display text-xl font-semibold ${m.key ? "text-white" : "text-ink"}`}
              style={{ margin: 0 }}
            >
              {m.date}
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed" style={{ padding: 0, margin: "0.75rem 0 0", listStyle: "none" }}>
              {m.items.map((item) => (
                <li key={item} className={m.key ? "text-white/85" : "text-body"} style={{ margin: "0 0 0.4rem" }}>
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </figure>
  );
}
