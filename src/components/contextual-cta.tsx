"use client";

import { useEffect } from "react";
import Image from "next/image";
import { FOUNDER_NAME, FOUNDER_NAME_AR } from "@/config/contact";
import { useTranslation } from "@/i18n/context";
import { usePathname } from "next/navigation";
import { contextualCtas, type ContextualCtaService } from "@/data/contextual-ctas";
import { HelpLink } from "@/components/help-sheet";

let mountedCount = 0;

export function ContextualCTA({ service }: { service: ContextualCtaService }) {
  const { locale } = useTranslation();
  const config = contextualCtas[service];
  const pathname = usePathname();

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
    <div className="my-8 rounded-2xl border border-brand/20 bg-brand/[0.04] p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <Image src="/images/john.jpg" alt={locale === "ar" ? FOUNDER_NAME_AR : FOUNDER_NAME} width={40} height={40} sizes="40px" className="w-10 h-10 rounded-full object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-text-muted mb-1">
            {locale === "ar" ? "لو لسه واقف عند ده" : "If you're stuck on this"}
          </p>
          <p className="text-sm font-semibold text-text-primary mb-1">{config.title[locale]}</p>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            {config.stuckLine[locale]}
          </p>
          <HelpLink
            service={config.service}
            source={`guide:${pathname}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand/80 transition-colors"
          >
            {config.cta[locale]}
            <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
          </HelpLink>
        </div>
      </div>
    </div>
  );
}
