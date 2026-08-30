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
  CheckCircle2,
  FileX,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NoExamClient() {
  const { locale } = useTranslation();

  const noExam = useMemo(
    () =>
      programmes
        .filter((p) => !p.entranceExam)
        .sort((a, b) => a.tuitionEurPerYear - b.tuitionEurPerYear),
    []
  );

  const withExam = programmes.length - noExam.length;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <Breadcrumbs
          items={[
            { label: locale === "ar" ? "البرامج" : "Programmes", href: "/programmes" },
            { label: locale === "ar" ? "بدون امتحان قبول" : "No Entrance Exam" },
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
                ? "برامج بدون امتحان قبول"
                : "No Entrance Exam Required"}
            </h1>
            <p className="text-xs text-white/70 mt-1">
              {locale === "ar"
                ? `${noExam.length} برنامج يقبل بالمستندات فقط — بدون امتحان`
                : `${noExam.length} programmes accept document-based applications — no exam needed`}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <GlassCard className="text-center py-3">
            <div className="text-2xl font-bold text-success">{noExam.length}</div>
            <div className="text-xs text-text-muted">
              {locale === "ar" ? "بدون امتحان" : "No exam"}
            </div>
          </GlassCard>
          <GlassCard className="text-center py-3">
            <div className="text-2xl font-bold text-text-secondary">{withExam}</div>
            <div className="text-xs text-text-muted">
              {locale === "ar" ? "يتطلب امتحان" : "Require exam"}
            </div>
          </GlassCard>
          <GlassCard className="text-center py-3 col-span-2 sm:col-span-1">
            <div className="text-2xl font-bold text-amber">
              {Math.round((noExam.length / programmes.length) * 100)}%
            </div>
            <div className="text-xs text-text-muted">
              {locale === "ar" ? "من البرامج" : "Of all programmes"}
            </div>
          </GlassCard>
        </div>

        {/* Info box */}
        <GlassCard className="mb-8 border-success/20 bg-success/[0.03]">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-semibold text-text-primary mb-1">
                {locale === "ar" ? "كيف يعمل التقديم بدون امتحان؟" : "How does document-based admission work?"}
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed">
                {locale === "ar"
                  ? "هذه البرامج تقيّم طلبك بناءً على مستنداتك: الشهادات، خطاب الدافع، والسيرة الذاتية. لا حاجة لامتحان قبول — لكن القبول ليس مضمونًا ويعتمد على استيفاء متطلبات البرنامج."
                  : "These programmes evaluate your application based on submitted documents: transcripts, motivation letter, and CV. No entrance exam is needed — but admission depends on meeting the programme's requirements and is not automatic."}
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Programme list */}
        {noExam.length === 0 && (
          <GlassCard className="text-center py-12 mb-8">
            <GraduationCap className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {locale === "ar"
                ? "جميع البرامج الحالية تتطلب امتحان قبول"
                : "All current programmes require an entrance exam"}
            </h3>
            <p className="text-sm text-text-secondary max-w-md mx-auto">
              {locale === "ar"
                ? "قاعدة بياناتنا تنمو — سنضيف برامج بدون امتحان قبول فور التحقق منها."
                : "Our database is growing — we'll add no-exam programmes as we verify them. Browse all programmes to see what's available."}
            </p>
          </GlassCard>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {noExam.map((prog) => {
            const uni = universitiesV2.find((u) => u.id === prog.universityId);
            return (
              <GlassCard key={prog.id} className="group" hoverEffect="border">
                <div className="flex items-start justify-between gap-3">
                  <Link href={`/programmes/${prog.id}`} className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-text-primary group-hover:text-amber transition-colors">
                      {prog.name[locale] || prog.name.en}
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {uni?.name} · {uni?.city}
                    </p>
                  </Link>
                  <SaveProgrammeButton programmeId={prog.id} locale={locale} />
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-0.5 rounded-full bg-amber/10 text-amber text-[11px] font-medium border border-amber/20">
                    {prog.degree}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[11px] font-medium border border-success/20">
                    {locale === "ar" ? "بدون امتحان" : "No exam"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-text-secondary">
                  <span className="inline-flex items-center gap-1">
                    <Euro className="w-3 h-3 text-amber/70" />
                    €{prog.tuitionEurPerYear.toLocaleString()}/{locale === "ar" ? "سنة" : "yr"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-text-muted" />
                    {prog.durationYears} {locale === "ar" ? "سنوات" : prog.durationYears === 1 ? "year" : "years"}
                  </span>
                </div>
                {prog.applicationDeadline && (
                  <p className="text-xs font-medium text-amber mt-2">
                    {locale === "ar" ? "آخر موعد:" : "Deadline:"} {prog.applicationDeadline}
                  </p>
                )}
                <div className="mt-3 pt-3 border-t border-border-subtle">
                  <VerifiedBadge
                    date={prog.verification.lastVerified}
                    sourceUrl={prog.verification.sourceUrl}
                    label={locale === "ar" ? "تم التحقق:" : "Verified:"}
                  />
                </div>
              </GlassCard>
            );
          })}
        </div>

        <SeoCrosslinks locale={locale} exclude={{ type: "intent", value: "no-exam" }} />

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
