"use client";

import Link from "@/components/locale-link";
import { usePathname } from "next/navigation";
import { HelpLink } from "@/components/help-sheet";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { EmailSignup } from "@/components/email-signup";
import { CalendarCheck, ExternalLink, FileCheck2, GraduationCap, Landmark, Plane, AlertTriangle } from "lucide-react";

/** One fact on a recognition guide. `source` is a key of the guide's sources. */
export type GuideItem = { text: string; source?: string; link?: { href: string; label: string } };
export type GuideSection = { id: string; title: string; intro?: string; items: GuideItem[] };

export type GuideCopy = {
  title: string;
  subtitle: string;
  checked: string;
  shortTitle: string;
  short: GuideItem[];
  sections: GuideSection[];
  noteTitle: string;
  note: string;
  reviewTitle: string;
  reviewBody: string;
  reviewCta: string;
  sourcesTitle: string;
  sourceNames: Record<string, string>;
  source: string;
};

const ICONS: Record<string, React.ElementType> = { before: Plane, during: GraduationCap, after: Landmark };

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-brand hover:underline ms-1 whitespace-nowrap"
    >
      {label}
      <ExternalLink className="w-3 h-3" aria-hidden="true" />
    </a>
  );
}

function ItemExtras({ item, sources, label }: { item: GuideItem; sources: Record<string, string>; label: string }) {
  return (
    <>
      {item.source && sources[item.source] && <SourceLink href={sources[item.source]} label={label} />}
      {item.link && (
        <>
          {" "}
          <Link href={item.link.href} className="text-xs text-brand hover:underline whitespace-nowrap">
            {item.link.label}
          </Link>
        </>
      )}
    </>
  );
}

/**
 * Layout shared by the degree recognition guides (/recognition/<country>/).
 * Every line links one of the guide's official sources; the page shows the
 * date the sources were checked.
 */
export function RecognitionGuide({ sources, en, ar }: { sources: Record<string, string>; en: GuideCopy; ar: GuideCopy }) {
  const { locale } = useTranslation();
  const pathname = usePathname();
  const t = locale === "ar" ? ar : en;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{t.title}</h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-4">{t.subtitle}</p>
            <p className="flex items-start gap-2 text-sm text-text-muted">
              <CalendarCheck className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              {t.checked}
            </p>
          </header>

          <GlassCard className="mb-8 border">
            <h2 className="text-lg font-semibold text-text-primary mb-3">{t.shortTitle}</h2>
            <ul className="space-y-2.5">
              {t.short.map((item) => (
                <li key={item.text} className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed">
                  <FileCheck2 className="w-4 h-4 text-brand mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    {item.text}
                    <ItemExtras item={item} sources={sources} label={t.source} />
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {t.sections.map((section) => {
            const Icon = ICONS[section.id] ?? FileCheck2;
            return (
              <section key={section.id} id={section.id} className="mb-8 scroll-mt-24">
                <h2 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
                  <Icon className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
                  {section.title}
                </h2>
                {section.intro && <p className="text-sm text-text-secondary leading-relaxed mb-3">{section.intro}</p>}
                <ol className="space-y-3 list-decimal ps-5 marker:text-text-muted">
                  {section.items.map((item) => (
                    <li key={item.text} className="text-sm text-text-secondary leading-relaxed ps-1">
                      {item.text}
                      <ItemExtras item={item} sources={sources} label={t.source} />
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}

          <GlassCard className="mb-8">
            <h2 className="text-lg font-semibold text-text-primary mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
              {t.noteTitle}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">{t.note}</p>
          </GlassCard>

          <EmailSignup source="checklist" variant="guide" placement="recognition" className="mb-8" />

          <GlassCard className="mb-10 text-center">
            <h2 className="text-lg font-semibold text-text-primary mb-1">{t.reviewTitle}</h2>
            <p className="text-sm text-text-secondary mb-4">{t.reviewBody}</p>
            <HelpLink
              service="documentReview"
              source={`recognition:${pathname}`}
              className="btn-solid inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand/90 transition-colors"
            >
              {t.reviewCta}
            </HelpLink>
          </GlassCard>

          <section aria-labelledby="sources">
            <h2 id="sources" className="text-base font-semibold text-text-primary mb-2">
              {t.sourcesTitle}
            </h2>
            <ul className="space-y-1.5 text-xs">
              {Object.keys(sources).map((k) => (
                <li key={k}>
                  <a href={sources[k]} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-brand underline underline-offset-2">
                    {t.sourceNames[k] ?? sources[k]}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
