/**
 * Original flat illustrations for the grocery cards. They show what kind of
 * product it is, not the retailer's packaging: the card links to the real
 * product page for that. Decorative (aria-hidden): the card's text names the item.
 */
import type { ReactElement } from "react";

const S = { stroke: "#1f2937", strokeWidth: 2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

const ART: Record<string, ReactElement> = {
  chicken: (
    <>
      <path d="M14 38c0-12 10-22 24-22 8 0 13 5 13 11 0 13-14 23-27 23-6 0-10-5-10-12z" fill="#f6c9a8" {...S} />
      <path d="M22 34c4-6 11-9 19-8" fill="none" {...S} stroke="#d98c5f" />
      <rect x="10" y="44" width="44" height="8" rx="4" fill="#e2e8f0" {...S} />
    </>
  ),
  milk: (
    <>
      <path d="M22 18h20l4 8v28a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V26z" fill="#ffffff" {...S} />
      <path d="M22 10h20v8H22z" fill="#60a5fa" {...S} />
      <path d="M18 34h28v12H18z" fill="#bfdbfe" {...S} />
      <path d="M27 40c2-3 8-3 10 0" fill="none" {...S} />
    </>
  ),
  eggs: (
    <>
      <rect x="8" y="34" width="48" height="16" rx="5" fill="#d6b88f" {...S} />
      <ellipse cx="20" cy="30" rx="7" ry="9" fill="#fff7ed" {...S} />
      <ellipse cx="32" cy="28" rx="7" ry="9" fill="#fde9d1" {...S} />
      <ellipse cx="44" cy="30" rx="7" ry="9" fill="#fff7ed" {...S} />
    </>
  ),
  rice: (
    <>
      <path d="M16 20h32l-3 34H19z" fill="#fef3c7" {...S} />
      <path d="M16 20c4-6 28-6 32 0" fill="#fde68a" {...S} />
      <rect x="22" y="30" width="20" height="12" rx="3" fill="#ffffff" {...S} />
      <path d="M27 36h2m4 0h2m-6 3h2" {...S} />
    </>
  ),
  pasta: (
    <>
      <rect x="14" y="14" width="36" height="40" rx="6" fill="#bfdbfe" {...S} />
      <g fill="#fbbf24" {...S}>
        <path d="M21 24l8-3 2 8-8 3z" />
        <path d="M33 28l8-3 2 8-8 3z" />
        <path d="M23 38l8-3 2 8-8 3z" />
      </g>
    </>
  ),
  potatoes: (
    <>
      <ellipse cx="24" cy="38" rx="13" ry="10" fill="#d4a373" {...S} />
      <ellipse cx="40" cy="34" rx="12" ry="9" fill="#e0b98a" {...S} />
      <circle cx="21" cy="36" r="1.2" fill="#1f2937" />
      <circle cx="27" cy="41" r="1.2" fill="#1f2937" />
      <circle cx="42" cy="32" r="1.2" fill="#1f2937" />
    </>
  ),
  bread: (
    <>
      <path d="M10 38c0-10 10-16 22-16s22 6 22 16v6a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z" fill="#c68642" {...S} />
      <path d="M20 30l4 6m6-8l4 6m6-4l3 5" fill="none" {...S} stroke="#fde3b6" />
    </>
  ),
  yogurt: (
    <>
      <path d="M18 24h28l-4 28H22z" fill="#ffffff" {...S} />
      <ellipse cx="32" cy="24" rx="14" ry="4" fill="#e0f2fe" {...S} />
      <path d="M21 36h22" {...S} stroke="#38bdf8" />
    </>
  ),
  cheese: (
    <>
      <path d="M10 42l34-20 10 8v14H10z" fill="#fcd34d" {...S} />
      <path d="M10 42h44" {...S} />
      <circle cx="26" cy="46" r="2.5" fill="#f59e0b" />
      <circle cx="40" cy="38" r="3" fill="#f59e0b" />
    </>
  ),
  butter: (
    <>
      <rect x="10" y="30" width="44" height="16" rx="3" fill="#fef08a" {...S} />
      <path d="M10 36h44" {...S} />
      <rect x="16" y="22" width="22" height="8" rx="2" fill="#fde68a" {...S} />
    </>
  ),
  apples: (
    <>
      <path d="M32 24c-10-6-20 2-18 14 2 10 10 16 18 12 8 4 16-2 18-12 2-12-8-20-18-14z" fill="#ef4444" {...S} />
      <path d="M32 24c0-6 2-9 6-11" fill="none" {...S} />
      <path d="M36 15c4-2 8 0 9 3-4 2-7 1-9-3z" fill="#22c55e" {...S} />
    </>
  ),
  bananas: (
    <>
      <path d="M12 26c6 18 26 26 42 16-14 2-28-6-34-20z" fill="#fde047" {...S} />
      <path d="M16 20c4 16 22 26 38 22" fill="none" {...S} />
      <path d="M12 26l-2-5 6-1z" fill="#78350f" {...S} />
    </>
  ),
  tomatoes: (
    <>
      <circle cx="32" cy="36" r="16" fill="#ef4444" {...S} />
      <path d="M24 22l8 4 8-4-4 6h-8z" fill="#16a34a" {...S} />
      <path d="M24 34c2-4 6-6 10-6" fill="none" stroke="#fecaca" strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  onions: (
    <>
      <path d="M32 16c-2 6-16 10-16 24 0 8 7 14 16 14s16-6 16-14c0-14-14-18-16-24z" fill="#f4b860" {...S} />
      <path d="M32 22c-3 8-6 16-6 30m6-30c3 8 6 16 6 30" fill="none" {...S} stroke="#c2803b" />
    </>
  ),
  carrots: (
    <>
      <path d="M18 46L42 22c4-4 8 0 4 4L22 50c-2 2-6-2-4-4z" fill="#fb923c" {...S} />
      <path d="M42 22l4-10m-1 13l10-4m-12 1l8-8" fill="none" {...S} stroke="#16a34a" />
      <path d="M28 36l4 4m2-10l4 4" {...S} />
    </>
  ),
  "canned-tomatoes": (
    <>
      <rect x="18" y="16" width="28" height="36" rx="4" fill="#e5e7eb" {...S} />
      <rect x="18" y="24" width="28" height="20" fill="#ef4444" {...S} />
      <circle cx="32" cy="34" r="5" fill="#fca5a5" {...S} />
    </>
  ),
  lentils: (
    <>
      <path d="M14 30h36v16a8 8 0 0 1-8 8H22a8 8 0 0 1-8-8z" fill="#fde68a" {...S} />
      <g fill="#ea580c">
        <circle cx="22" cy="28" r="2.5" /><circle cx="28" cy="26" r="2.5" /><circle cx="34" cy="28" r="2.5" />
        <circle cx="40" cy="26" r="2.5" /><circle cx="25" cy="22" r="2.5" /><circle cx="37" cy="22" r="2.5" /><circle cx="31" cy="20" r="2.5" />
      </g>
    </>
  ),
  oats: (
    <>
      <path d="M14 32h36c0 12-8 20-18 20s-18-8-18-20z" fill="#fef3c7" {...S} />
      <g fill="#d6b88f" {...S} strokeWidth={1.5}>
        <ellipse cx="24" cy="30" rx="4" ry="2.5" /><ellipse cx="33" cy="28" rx="4" ry="2.5" /><ellipse cx="41" cy="30" rx="4" ry="2.5" />
      </g>
    </>
  ),
  flour: (
    <>
      <path d="M18 16h28l4 38H14z" fill="#f8fafc" {...S} />
      <path d="M18 16l4-6h20l4 6" fill="#e2e8f0" {...S} />
      <path d="M32 26v18m-5-14l5 4 5-4m-10 6l5 4 5-4" fill="none" {...S} stroke="#d97706" />
    </>
  ),
  oil: (
    <>
      <path d="M28 8h8v8l6 8v28a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V24l6-8z" fill="#fde047" fillOpacity={0.9} {...S} />
      <rect x="26" y="6" width="12" height="5" rx="2" fill="#16a34a" {...S} />
      <rect x="24" y="32" width="16" height="12" rx="2" fill="#ffffff" {...S} />
    </>
  ),
  sugar: (
    <>
      <rect x="16" y="18" width="32" height="36" rx="4" fill="#ffffff" {...S} />
      <rect x="16" y="18" width="32" height="10" rx="4" fill="#93c5fd" {...S} />
      <g fill="#e2e8f0" {...S} strokeWidth={1.5}>
        <rect x="22" y="36" width="8" height="8" rx="1" /><rect x="34" y="36" width="8" height="8" rx="1" />
      </g>
    </>
  ),
  salt: (
    <>
      <path d="M22 22h20l2 32H20z" fill="#ffffff" {...S} />
      <path d="M24 12h16l2 10H22z" fill="#cbd5e1" {...S} />
      <circle cx="29" cy="16" r="1" fill="#1f2937" /><circle cx="35" cy="16" r="1" fill="#1f2937" />
      <path d="M26 38h12" {...S} stroke="#2d64a5" />
    </>
  ),
  coffee: (
    <>
      <path d="M14 26h30v12a12 12 0 0 1-12 12h-6a12 12 0 0 1-12-12z" fill="#ffffff" {...S} />
      <path d="M44 30h4a5 5 0 0 1 0 10h-5" fill="none" {...S} />
      <path d="M16 28h26v4H16z" fill="#78350f" />
      <path d="M24 12c-2 3 2 5 0 8m8-8c-2 3 2 5 0 8" fill="none" {...S} stroke="#94a3b8" />
    </>
  ),
};

export function GroceryArt({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      {ART[id] ?? <circle cx="32" cy="32" r="16" fill="#e2e8f0" {...S} />}
    </svg>
  );
}

export const hasArt = (id: string) => id in ART;
