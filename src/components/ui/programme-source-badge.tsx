"use client";

import { ExternalLink, Info } from "lucide-react";
import type { Programme } from "@/data/types";
import { feeStatus } from "@/lib/fee-source";
import { VerifiedBadge } from "./verified-badge";

/**
 * "Verified: <date>" only when a recorded check found the exact fee on its source;
 * otherwise a neutral "Fee being re-checked". A pending fee links to its (relevant)
 * source, an unverified one to the university's own programme page.
 */
export function ProgrammeSourceBadge({ programme: p, locale, className = "" }: { programme: Programme; locale: "en" | "ar"; className?: string }) {
  const ar = locale === "ar";
  const status = feeStatus(p);
  if (status === "verified") {
    return (
      <VerifiedBadge
        date={p.verification.lastVerified}
        sourceUrl={p.verification.sourceUrl}
        label={ar ? "تم التحقق:" : "Verified:"}
        className={className}
      />
    );
  }
  return (
    <span className={`inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-text-muted ${className}`}>
      <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{ar ? "نراجع الرسوم حاليًا" : "Fee being re-checked"}</span>
      <span aria-hidden="true">·</span>
      <a
        href={status === "pending" ? p.verification.sourceUrl : p.programmeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-text-secondary"
      >
        {ar ? "صفحة الجامعة" : "university page"}
        <ExternalLink className="w-3 h-3" aria-hidden="true" />
        <span className="sr-only">{ar ? " (تفتح في نافذة جديدة)" : " (opens in a new tab)"}</span>
      </a>
    </span>
  );
}
