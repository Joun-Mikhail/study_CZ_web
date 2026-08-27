"use client";

import { ShieldCheck } from "lucide-react";

interface VerifiedBadgeProps {
  date: string;
  sourceUrl?: string;
  label?: string;
  className?: string;
}

export function VerifiedBadge({ date, sourceUrl, label, className = "" }: VerifiedBadgeProps) {
  const text = label ? `${label} ${date}` : date;

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs text-text-muted ${className}`}>
      <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" />
      {sourceUrl ? (
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-text-secondary underline underline-offset-2">
          {text}
        </a>
      ) : (
        <span>{text}</span>
      )}
    </span>
  );
}
