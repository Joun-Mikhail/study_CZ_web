"use client";

import { useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import { useTranslation } from "@/i18n/context";
import { contextualCtas, type ContextualCtaService } from "@/data/contextual-ctas";

let mountedCount = 0;

export function ContextualCTA({ service }: { service: ContextualCtaService }) {
  const { locale } = useTranslation();
  const config = contextualCtas[service];

  useEffect(() => {
    mountedCount += 1;
    if (mountedCount > 1 && process.env.NODE_ENV !== "production") {
      console.warn(
        `[ContextualCTA] ${mountedCount} instances mounted at once. Max one per page -- check this page for a duplicate.`
      );
    }
    return () => {
      mountedCount -= 1;
    };
  }, []);

  return (
    <div className="my-8 rounded-2xl border border-amber/20 bg-amber/[0.04] p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-text-muted mb-1">
            {locale === "ar" ? "لو لسه واقف عند ده" : "If you're stuck on this"}
          </p>
          <p className="text-sm font-semibold text-text-primary mb-1">{config.title[locale]}</p>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            {config.fearTrigger[locale]}
          </p>
          <a
            href={config.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber hover:text-amber/80 transition-colors"
          >
            {config.cta[locale]}
            <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
