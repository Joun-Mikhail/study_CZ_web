/**
 * Spot illustrations for cards: hand-drawn SVG in the site's colour tokens,
 * so they follow light/dark theme, cost no network request and never block
 * the first paint. Decorative (aria-hidden): the card text says what they show.
 */
type ArtProps = { className?: string };

const svg = (className: string | undefined, children: React.ReactNode) => (
  <svg viewBox="0 0 160 120" className={className} aria-hidden="true" focusable="false">
    {children}
  </svg>
);

/** Eligibility: a checklist with a graduation cap. */
export function EligibilityArt({ className }: ArtProps) {
  return svg(
    className,
    <>
      <circle cx="118" cy="30" r="26" fill="var(--color-teal-soft)" />
      <rect x="22" y="18" width="78" height="92" rx="12" fill="var(--color-surface)" stroke="var(--color-teal)" strokeWidth="3" />
      <rect x="42" y="10" width="38" height="16" rx="6" fill="var(--color-teal)" />
      {[38, 60, 82].map((y, i) => (
        <g key={y}>
          <circle cx="40" cy={y + 4} r="7" fill={i < 2 ? "var(--color-teal)" : "var(--color-bg-muted)"} />
          {i < 2 && <path d={`M36.5 ${y + 4} l2.6 2.6 l5 -5.4`} fill="none" stroke="var(--color-surface)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />}
          <rect x="54" y={y} width={i === 2 ? 26 : 34} height="8" rx="4" fill="var(--color-bg-muted)" />
        </g>
      ))}
      <g transform="translate(104 62) rotate(-12)">
        <path d="M0 14 L28 2 L56 14 L28 26 Z" fill="var(--color-brand)" />
        <path d="M12 19 v12 c8 6 24 6 32 0 v-12 l-16 7 Z" fill="var(--color-brand-hover)" />
        <path d="M50 16 v16" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="34" r="3.5" fill="var(--color-gold)" />
      </g>
    </>
  );
}

/** Matcher: a compass pointing at a pin among university blocks. */
export function MatcherArt({ className }: ArtProps) {
  return svg(
    className,
    <>
      <circle cx="40" cy="34" r="24" fill="var(--color-violet-soft)" />
      <rect x="14" y="70" width="34" height="38" rx="5" fill="var(--color-violet-soft)" />
      <rect x="54" y="56" width="40" height="52" rx="5" fill="var(--color-surface)" stroke="var(--color-violet)" strokeWidth="3" />
      <path d="M54 62 L74 46 L94 62" fill="var(--color-violet)" />
      {[66, 80, 94].map((y) => (
        <g key={y}>
          <rect x="62" y={y} width="8" height="8" rx="2" fill="var(--color-violet-soft)" />
          <rect x="78" y={y} width="8" height="8" rx="2" fill="var(--color-violet-soft)" />
        </g>
      ))}
      <circle cx="122" cy="52" r="26" fill="var(--color-surface)" stroke="var(--color-brand)" strokeWidth="3" />
      <path d="M122 32 L128 52 L122 72 L116 52 Z" fill="var(--color-accent-red)" />
      <path d="M122 52 L128 52 L122 72 L116 52 Z" fill="var(--color-brand)" />
      <circle cx="122" cy="52" r="3.5" fill="var(--color-surface)" />
      <path d="M124 92 c0 -10 14 -10 14 0 c0 8 -7 14 -7 14 s-7 -6 -7 -14 Z" fill="var(--color-gold)" />
      <circle cx="131" cy="92" r="3" fill="var(--color-surface)" />
    </>
  );
}

/** Cost of living: coins, a rising bar chart and a wallet. */
export function CostArt({ className }: ArtProps) {
  return svg(
    className,
    <>
      <circle cx="120" cy="34" r="26" fill="var(--color-gold-soft)" />
      {[
        [20, 70, 30],
        [40, 54, 46],
        [60, 40, 60],
        [80, 26, 74],
      ].map(([x, y, h], i) => (
        <rect key={x} x={x} y={y} width="14" height={h} rx="4" fill={i === 3 ? "var(--color-gold)" : "var(--color-gold-soft)"} stroke="var(--color-gold)" strokeWidth="2" />
      ))}
      <path d="M18 64 L44 48 L64 34 L90 18" fill="none" stroke="var(--color-coral)" strokeWidth="3" strokeLinecap="round" />
      <path d="M84 16 L92 17 L90 25" fill="none" stroke="var(--color-coral)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="100" y="66" width="48" height="36" rx="8" fill="var(--color-brand)" />
      <rect x="126" y="76" width="22" height="16" rx="5" fill="var(--color-brand-hover)" />
      <circle cx="134" cy="84" r="3" fill="var(--color-gold)" />
      {[0, 1, 2].map((i) => (
        <ellipse key={i} cx="118" cy={56 - i * 6} rx="14" ry="5" fill="var(--color-gold)" stroke="var(--color-gold-ink)" strokeWidth="1.5" />
      ))}
    </>
  );
}

/** Application guide: a dotted route from documents to a plane. */
export function GuideArt({ className }: ArtProps) {
  return svg(
    className,
    <>
      <circle cx="42" cy="30" r="24" fill="var(--color-coral-soft)" />
      <path d="M34 90 C 60 40, 96 110, 126 44" fill="none" stroke="var(--color-coral)" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
      <rect x="16" y="64" width="38" height="46" rx="6" fill="var(--color-surface)" stroke="var(--color-coral)" strokeWidth="3" />
      {[74, 84, 94].map((y) => (
        <rect key={y} x="24" y={y} width="22" height="5" rx="2.5" fill="var(--color-coral-soft)" />
      ))}
      <circle cx="46" cy="104" r="7" fill="var(--color-accent-red)" />
      <g transform="translate(110 22) rotate(28)">
        <path d="M0 14 L36 14 L44 18 L36 22 L0 22 Z" fill="var(--color-brand)" />
        <path d="M14 14 L22 0 L28 0 L24 14 Z M14 22 L22 36 L28 36 L24 22 Z" fill="var(--color-sky)" />
        <path d="M2 14 L6 6 L10 6 L8 14 Z" fill="var(--color-sky)" />
      </g>
      <circle cx="126" cy="98" r="14" fill="var(--color-teal-soft)" />
      <path d="M120 98 l4 4 l8 -9" fill="none" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}
