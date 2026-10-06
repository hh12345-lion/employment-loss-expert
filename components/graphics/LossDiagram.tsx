type LossDiagramProps = {
  /** "dark" for use on the ink band, "light" inside articles. */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Schematic of an earnings-loss claim: the "but for" earnings path against
 * actual earnings, with the gap split into past and future loss at the
 * date of assessment. Illustrative only; it carries no figures.
 */
export function LossDiagram({ tone = "light", className = "" }: LossDiagramProps) {
  const dark = tone === "dark";
  const axis = dark ? "#E7F0F0" : "#0D2928";
  const butFor = dark ? "#E7F0F0" : "#1C4948";
  const muted = dark ? "rgba(231,240,240,0.75)" : "#3D5453";

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 640 380"
        role="img"
        aria-labelledby="loss-diagram-title loss-diagram-desc"
        className="h-auto w-full"
      >
        <title id="loss-diagram-title">How an earnings loss is built up</title>
        <desc id="loss-diagram-desc">
          Earnings over time. A rising line shows earnings but for the event. A lower line shows
          actual earnings after the event. The gap between them is the loss, divided into past
          loss before the date of assessment and future loss after it.
        </desc>

        {/* loss areas */}
        <path d="M200 208 L400 150 L400 262 L200 262 Z" fill="#B25437" opacity="0.9" />
        <path d="M400 150 L590 96 L590 214 L400 262 Z" fill="#B25437" opacity="0.45" />

        {/* axes */}
        <path d="M60 30 V320 H610" fill="none" stroke={axis} strokeWidth="2" />

        {/* event and assessment markers */}
        <path d="M200 40 V320" stroke={axis} strokeWidth="1.5" strokeDasharray="5 6" opacity="0.6" />
        <path d="M400 40 V320" stroke={axis} strokeWidth="1.5" strokeDasharray="5 6" opacity="0.6" />

        {/* but-for earnings */}
        <path d="M60 248 L200 208 L590 96" fill="none" stroke={butFor} strokeWidth="4" strokeLinecap="round" />
        {/* actual earnings */}
        <path
          d="M200 208 L200 262 L400 262 L590 214"
          fill="none"
          stroke={axis}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 8"
        />

        <g fontFamily="var(--font-source-sans), system-ui, sans-serif" fontSize="15">
          <text x="200" y="344" textAnchor="middle" fill={muted}>Event</text>
          <text x="400" y="344" textAnchor="middle" fill={muted}>Date of assessment</text>
          <text x="610" y="344" textAnchor="end" fill={muted}>Time</text>
          <text x="52" y="26" textAnchor="start" fill={muted}>Earnings</text>

          <text x="300" y="226" textAnchor="middle" fill="#fff" fontWeight="700">Past loss</text>
          <text x="496" y="186" textAnchor="middle" fill={dark ? "#fff" : "#0D2928"} fontWeight="700">
            Future loss
          </text>

          <text x="390" y="126" textAnchor="end" fill={butFor} fontWeight="600">
            Earnings but for the event
          </text>
          <text x="300" y="288" textAnchor="middle" fill={muted} fontWeight="600">
            Actual earnings
          </text>
        </g>
      </svg>
    </figure>
  );
}
