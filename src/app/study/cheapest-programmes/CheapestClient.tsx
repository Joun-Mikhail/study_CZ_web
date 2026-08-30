"use client";

import { useMemo } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GlassCard } from "@/components/ui/glass-card";
import { SaveProgrammeButton } from "@/components/ui/save-programme-button";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { programmes } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { SeoCrosslinks } from "@/components/seo-crosslinks";
import {
  GraduationCap,
  Euro,
  Clock,
  ExternalLink,
  TrendingDown,
  Building2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheapestClient() {
  const { locale } = useTranslation();

  const sorted = useMemo(
    () => [...programmes].sort((a, b) => a.tuitionEurPerYear - b.tuitionEurPerYear),
    []
  );

  const cheapest = sorted[0];
  const median = sorted[Math.floor(sorted.length / 2)];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <Breadcrumbs
          items={[
            { label: locale === "ar" ? "البرامج" : "Programmes", href: "/programmes" },
            { label: locale === "ar" ? "أرخص البرامج" : "Cheapest Programmes" },
          ]}
        />

        <div className="relative w-full h-[120px] sm:h-[160px] rounded-2xl overflow-hidden mb-6">
          <Image
            src="/images/university-campus.jpg"
            alt="University campus"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/30 to-transparent" />
          <div className="absolute bottom-4 start-4 z-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {locale === "ar"
                ? "أرخص البرامج باللغة الإنجليزية"
                : "Cheapest English-Taught Programmes"}
            </h1>
            <p className="text-xs text-white/70 mt-1">
              {locale === "ar"
                ? `${sorted.length} برنامج مرتب حسب الرسوم — من الأرخص للأغلى`
                : `${sorted.length} programmes sorted by tuition — lowest first`}
            </p>
          </div>
        </div>

        {/* Quick insights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <GlassCard className="text-center py-3">
            <div className="text-2xl font-bold text-success">
              €{cheapest.tuitionEurPerYear.toLocaleString()}
            </div>
            <div className="text-xs text-text-muted">
              {locale === "ar" ? "أقل رسوم / سنة" : "Lowest tuition / yr"}
            </div>
          </GlassCard>
          <GlassCard className="text-center py-3">
            <div className="text-2xl font-bold text-text-primary">
              €{median.tuitionEurPerYear.toLocaleString()}
            </div>
            <div className="text-xs text-text-muted">
              {locale === "ar" ? "متوسط الرسوم" : "Median tuition"}
            </div>
          </GlassCard>
          <GlassCard className="text-center py-3 col-span-2 sm:col-span-1">
            <div className="text-2xl font-bold text-amber">{sorted.length}</div>
            <div className="text-xs text-text-muted">
              {locale === "ar" ? "برامج موثقة" : "Verified programmes"}
            </div>
          </GlassCard>
        </div>

        {/* Sorted list */}
        <div className="space-y-3">
          {sorted.map((prog, i) => {
            const uni = universitiesV2.find((u) => u.id === prog.universityId);
            return (
              <GlassCard key={prog.id} className="group" hoverEffect="border">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-border-subtle text-sm font-bold text-text-muted shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/programmes/${prog.id}`} className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-text-primary group-hover:text-amber transition-colors">
                          {prog.name[locale] || prog.name.en}
                        </h3>
                        <p className="text-xs text-text-secondary mt-0.5">
                          {uni?.name} · {uni?.city} · {prog.degree}
                        </p>
                      </Link>
                      <SaveProgrammeButton programmeId={prog.id} locale={locale} />
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-text-secondary">
                      <span className="inline-flex items-center gap-1 font-semibold text-success">
                        <Euro className="w-3 h-3" />
                        €{prog.tuitionEurPerYear.toLocaleString()}/{locale === "ar" ? "سنة" : "yr"}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-text-muted" />
                        {prog.durationYears} {locale === "ar" ? "سنوات" : prog.durationYears === 1 ? "year" : "years"}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-text-muted" />
                        {prog.language}
                      </span>
                    </div>
                    <div className="mt-2">
                      <VerifiedBadge
                        date={prog.verification.lastVerified}
                        sourceUrl={prog.verification.sourceUrl}
                        label={locale === "ar" ? "تم التحقق:" : "Verified:"}
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <SeoCrosslinks locale={locale} exclude={{ type: "intent", value: "cheapest" }} />

        <div className="mt-10 text-center">
          <MagneticButton variant="primary" size="md" href="/programmes">
            <GraduationCap className="w-4 h-4" />
            {locale === "ar" ? "تصفح كل البرامج" : "Browse All Programmes"}
          </MagneticButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}
