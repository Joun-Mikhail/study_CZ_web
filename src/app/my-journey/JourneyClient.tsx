"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  loadJourney,
  saveJourney,
  initJourney,
  toggleChecklistItem,
  removeProgrammeFromJourney,
  getJourneyProgress,
  getDaysUntilDeadline,
  type JourneyData,
  type SavedProgramme,
} from "@/lib/journey-store";
import { getProgrammeById, programmes } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import {
  Bookmark,
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  Trash2,
  GraduationCap,
  Compass,
  ArrowRight,
  Sparkles,
  FileText,
  Euro,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Programme } from "@/data/types";

function ProgressRing({ percent, size = 56 }: { percent: number; size?: number }) {
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;
  const color = percent >= 80 ? "#22c55e" : percent >= 40 ? "#f59e0b" : "#64748b";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-text-primary">
        {percent}%
      </span>
    </div>
  );
}

function DeadlineBadge({ deadline, locale }: { deadline: string | undefined; locale: "en" | "ar" }) {
  const days = getDaysUntilDeadline(deadline);
  if (days === null) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-text-muted">
        <Clock className="w-3 h-3" />
        {locale === "ar" ? "لم يُعلن الموعد" : "Deadline not published"}
      </span>
    );
  }
  if (days < 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-red-400">
        <AlertTriangle className="w-3 h-3" />
        {locale === "ar" ? "انتهى الموعد" : "Deadline passed"}
      </span>
    );
  }
  if (days <= 14) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-red-400 font-medium">
        <AlertTriangle className="w-3 h-3" />
        {days} {locale === "ar" ? "يوم متبقي!" : days === 1 ? "day left!" : "days left!"}
      </span>
    );
  }
  if (days <= 30) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber font-medium">
        <Clock className="w-3 h-3" />
        {days} {locale === "ar" ? "يوم متبقي" : "days left"}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-success">
      <Clock className="w-3 h-3" />
      {days} {locale === "ar" ? "يوم متبقي" : "days left"}
    </span>
  );
}

function ProgrammeJourneyCard({
  saved,
  locale,
  onToggle,
  onRemove,
}: {
  saved: SavedProgramme;
  locale: "en" | "ar";
  onToggle: (programmeId: string, itemId: string) => void;
  onRemove: (programmeId: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const prog = getProgrammeById(saved.programmeId);
  if (!prog) return null;
  const uni = universitiesV2.find((u) => u.id === prog.universityId);
  const progress = getJourneyProgress(saved);
  const days = getDaysUntilDeadline(prog.applicationDeadline);

  return (
    <GlassCard className="relative overflow-hidden">
      {days !== null && days <= 14 && days >= 0 && (
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-red-500 via-amber to-red-500" />
      )}
      <div className="flex items-start gap-4">
        <ProgressRing percent={progress} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                href={`/programmes/${prog.id}`}
                className="text-base font-semibold text-text-primary hover:text-amber transition-colors"
              >
                {prog.name[locale] || prog.name.en}
              </Link>
              <p className="text-xs text-text-secondary mt-0.5">
                {uni?.name} · {prog.degree} · {prog.language}
              </p>
            </div>
            <button
              onClick={() => onRemove(saved.programmeId)}
              className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
              aria-label={locale === "ar" ? "إزالة" : "Remove"}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            <DeadlineBadge deadline={prog.applicationDeadline} locale={locale} />
            <span className="inline-flex items-center gap-1 text-xs text-text-muted">
              <Euro className="w-3 h-3" />
              €{prog.tuitionEurPerYear.toLocaleString()} {locale === "ar" ? "في السنة" : "per year"}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary mt-3 transition-colors"
      >
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        {locale === "ar" ? "قائمة المهام" : "Checklist"} ({saved.checklist.filter((c) => c.done).length}/{saved.checklist.length})
      </button>

      {expanded && (
        <div className="mt-3 space-y-1.5">
          {saved.checklist.map((item) => (
            <button
              key={item.id}
              onClick={() => onToggle(saved.programmeId, item.id)}
              className={`flex items-center gap-2.5 w-full text-start px-2.5 py-1.5 rounded-lg transition-colors text-sm ${
                item.done
                  ? "text-text-muted line-through bg-white/[0.02]"
                  : "text-text-secondary hover:bg-white/[0.04]"
              }`}
            >
              {item.done ? (
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-text-muted shrink-0" />
              )}
              {item.label[locale] || item.label.en}
            </button>
          ))}
        </div>
      )}

      {progress >= 60 && progress < 100 && (
        <div className="mt-4 p-3 rounded-xl bg-amber/5 border border-amber/15">
          <p className="text-xs text-amber">
            <Sparkles className="w-3 h-3 inline me-1" />
            {locale === "ar"
              ? "أنت قريب! محتاج مساعدة في مراجعة المستندات قبل التقديم؟"
              : "You're almost there! Need help reviewing your documents before you submit?"}
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-xs font-medium text-amber mt-1.5 hover:underline"
          >
            {locale === "ar" ? "مراجعة المستندات" : "Document Review"}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </GlassCard>
  );
}

function EmptyJourney({ locale }: { locale: "en" | "ar" }) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-border-subtle flex items-center justify-center mx-auto mb-6">
        <Bookmark className="w-10 h-10 text-text-muted" />
      </div>
      <h2 className="text-xl font-bold text-text-primary mb-2">
        {locale === "ar" ? "رحلتك تبدأ هنا" : "Your journey starts here"}
      </h2>
      <p className="text-sm text-text-secondary max-w-md mx-auto mb-8">
        {locale === "ar"
          ? "احفظ البرامج اللي تعجبك وتابع تقدمك في التقديم. كل شي يُحفظ في متصفحك."
          : "Save programmes you're interested in and track your application progress. Everything is stored in your browser."}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <MagneticButton variant="primary" size="md" href="/programmes">
          <GraduationCap className="w-4 h-4" />
          {locale === "ar" ? "تصفح البرامج" : "Browse Programmes"}
        </MagneticButton>
        <MagneticButton variant="secondary" size="md" href="/university-matcher">
          <Compass className="w-4 h-4" />
          {locale === "ar" ? "ابحث عن برنامجك" : "Find Your Match"}
        </MagneticButton>
      </div>
    </div>
  );
}

export default function JourneyClient() {
  const { t, locale } = useTranslation();
  const [journey, setJourney] = useState<JourneyData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const data = loadJourney();
    setJourney(data);
    setLoaded(true);
  }, []);

  const handleToggle = useCallback((programmeId: string, itemId: string) => {
    const updated = toggleChecklistItem(programmeId, itemId);
    setJourney({ ...updated });
  }, []);

  const handleRemove = useCallback((programmeId: string) => {
    const updated = removeProgrammeFromJourney(programmeId);
    setJourney({ ...updated });
  }, []);

  if (!loaded) return null;

  const saved = journey?.savedProgrammes || [];
  const totalItems = saved.reduce((sum, s) => sum + s.checklist.length, 0);
  const doneItems = saved.reduce((sum, s) => sum + s.checklist.filter((c) => c.done).length, 0);
  const overallProgress = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  const urgentDeadlines = saved
    .map((s) => {
      const prog = getProgrammeById(s.programmeId);
      if (!prog) return null;
      const days = getDaysUntilDeadline(prog.applicationDeadline);
      if (days === null || days < 0) return null;
      return { prog, days };
    })
    .filter(Boolean)
    .sort((a, b) => a!.days - b!.days) as { prog: Programme; days: number }[];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <Breadcrumbs items={[{ label: locale === "ar" ? "رحلتي" : "My Journey" }]} />

        <div className="relative w-full h-[120px] sm:h-[160px] rounded-2xl overflow-hidden mb-6">
          <Image
            src="/images/prague-bridge.jpg"
            alt="Prague cityscape"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/30 to-transparent" />
          <div className="absolute bottom-4 start-4 z-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {locale === "ar" ? "رحلتي" : "My Journey"}
            </h1>
          </div>
        </div>

        {saved.length === 0 ? (
          <EmptyJourney locale={locale} />
        ) : (
          <>
            {/* Stats bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <GlassCard className="text-center py-3">
                <div className="text-2xl font-bold text-amber">{saved.length}</div>
                <div className="text-xs text-text-muted">
                  {locale === "ar" ? "برامج محفوظة" : "Saved"}
                </div>
              </GlassCard>
              <GlassCard className="text-center py-3">
                <div className="text-2xl font-bold text-text-primary">{overallProgress}%</div>
                <div className="text-xs text-text-muted">
                  {locale === "ar" ? "مكتمل" : "Complete"}
                </div>
              </GlassCard>
              <GlassCard className="text-center py-3">
                <div className="text-2xl font-bold text-success">{doneItems}</div>
                <div className="text-xs text-text-muted">
                  {locale === "ar" ? "مهام منجزة" : "Tasks Done"}
                </div>
              </GlassCard>
              <GlassCard className="text-center py-3">
                <div className="text-2xl font-bold text-text-secondary">{totalItems - doneItems}</div>
                <div className="text-xs text-text-muted">
                  {locale === "ar" ? "مهام متبقية" : "Remaining"}
                </div>
              </GlassCard>
            </div>

            {/* Urgent deadlines alert */}
            {urgentDeadlines.length > 0 && urgentDeadlines[0].days <= 30 && (
              <div className="mb-6 p-4 rounded-xl bg-amber/5 border border-amber/20">
                <h3 className="text-sm font-semibold text-amber mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {locale === "ar" ? "مواعيد قريبة" : "Upcoming Deadlines"}
                </h3>
                <div className="space-y-1.5">
                  {urgentDeadlines.filter((d) => d.days <= 30).map((d) => (
                    <div key={d.prog.id} className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">{d.prog.name[locale] || d.prog.name.en}</span>
                      <span className={`font-medium ${d.days <= 7 ? "text-red-400" : "text-amber"}`}>
                        {d.days} {locale === "ar" ? "يوم" : d.days === 1 ? "day" : "days"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Programme cards */}
            <div className="space-y-4">
              {saved.map((s) => (
                <ProgrammeJourneyCard
                  key={s.programmeId}
                  saved={s}
                  locale={locale}
                  onToggle={handleToggle}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <MagneticButton variant="secondary" size="md" href="/programmes">
                <GraduationCap className="w-4 h-4" />
                {locale === "ar" ? "أضف المزيد من البرامج" : "Add More Programmes"}
              </MagneticButton>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
