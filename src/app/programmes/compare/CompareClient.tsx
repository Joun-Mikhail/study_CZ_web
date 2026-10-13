"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { GlassCard } from "@/components/ui/glass-card";
import { FadeIn } from "@/components/ui/fade-in";
import { EmailSignup } from "@/components/email-signup";
import { programmes, getDeadlineStatus } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { Programme } from "@/data/types";
import { CITY_AR, DEGREE_VALUE_AR, FIELD_AR, LANGUAGE_AR } from "@/i18n/ar-metadata";
import {
  X,
  Plus,
  ExternalLink,
  Search,
  ArrowRight,
  Scale,
  GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MAX_COMPARE = 3;

const COPY = {
  en: {
    title: "Compare Programmes",
    intro: `Select up to ${MAX_COMPARE} programmes to compare side by side: tuition, deadlines, exams, and more.`,
    addAProgramme: "Add a programme",
    orBrowse: "Or",
    browse: "browse programmes",
    orBrowseEnd: "and use the compare button on each card.",
    selected: (n: number) => `${n} of ${MAX_COMPARE} selected`,
    add: "Add",
    addProgramme: "Add programme",
    addToCompare: "Add programme to compare",
    close: "Close",
    search: "Search programmes...",
    noResults: "No programmes found.",
    remove: (name: string) => `Remove ${name}`,
    viewDetails: "View details",
    officialPage: "Official page",
    database: (n: number) => `Our database is growing, currently covering ${n} verified programmes.`,
    perYear: "per year",
    rows: {
      university: "University",
      faculty: "Faculty",
      city: "City",
      type: "Type",
      language: "Language",
      degree: "Degree",
      duration: "Duration",
      tuition: "Tuition",
      entranceExam: "Entrance exam",
      applicationFee: "Application fee",
      deadline: "Deadline",
      field: "Field",
      verified: "Verified",
    },
    public: "Public",
    private: "Private",
    yes: "Yes",
    no: "No",
    years: (n: number) => `${n} year${n > 1 ? "s" : ""}`,
    rolling: "Rolling",
    passed: (d: string) => `${d} (passed)`,
    notPublished: "Usually end of February",
  },
  ar: {
    title: "قارن بين البرامج",
    intro: `اختر حتى ${MAX_COMPARE} برامج وقارن بينها جنبًا إلى جنب: الرسوم، والمواعيد، والامتحانات، وغيرها.`,
    addAProgramme: "أضف برنامجًا",
    orBrowse: "أو",
    browse: "تصفح البرامج",
    orBrowseEnd: "واستخدم زر المقارنة في كل بطاقة.",
    selected: (n: number) => `تم اختيار ${n} من ${MAX_COMPARE}`,
    add: "أضف",
    addProgramme: "أضف برنامجًا",
    addToCompare: "أضف برنامجًا للمقارنة",
    close: "إغلاق",
    search: "ابحث عن برنامج...",
    noResults: "لا توجد برامج مطابقة.",
    remove: (name: string) => `إزالة ${name}`,
    viewDetails: "التفاصيل",
    officialPage: "الصفحة الرسمية",
    database: (n: number) => `قاعدة بياناتنا تكبر باستمرار، وتضم الآن ${n} برنامجًا تم التحقق منه.`,
    perYear: "في السنة",
    rows: {
      university: "الجامعة",
      faculty: "الكلية",
      city: "المدينة",
      type: "النوع",
      language: "لغة الدراسة",
      degree: "الدرجة",
      duration: "المدة",
      tuition: "الرسوم الدراسية",
      entranceExam: "امتحان القبول",
      applicationFee: "رسوم التقديم",
      deadline: "آخر موعد",
      field: "المجال",
      verified: "آخر تحقق",
    },
    public: "حكومية",
    private: "خاصة",
    yes: "نعم",
    no: "لا",
    years: (n: number) => (n === 1 ? "سنة واحدة" : n === 2 ? "سنتان" : `${n} سنوات`),
    rolling: "مفتوح طوال العام",
    passed: (d: string) => `${d} (انتهى)`,
    notPublished: "عادةً نهاية فبراير",
  },
};

type Copy = (typeof COPY)["en"];

function getUni(id: string) {
  return universitiesV2.find((u) => u.id === id);
}

function deadlineLabel(p: Programme, c: Copy): string {
  const status = getDeadlineStatus(p);
  if (status === "rolling") return c.rolling;
  if (status === "passed") return c.passed(p.applicationDeadline ?? "");
  if (status === "verified") return p.applicationDeadline ?? "—";
  return c.notPublished;
}

type RowDef = {
  key: string;
  label: string;
  render: (p: Programme) => React.ReactNode;
  highlight?: boolean;
};

function buildRows(c: Copy, ar: boolean): RowDef[] {
  const money = (n: number) => n.toLocaleString("en-US");
  return [
    {
      key: "university",
      label: c.rows.university,
      render: (p) => {
        const uni = getUni(p.universityId);
        return uni ? (
          <Link href={`/university/${uni.id}`} className="text-accent hover:underline underline-offset-2 text-sm">
            {uni.name}
          </Link>
        ) : p.universityId;
      },
    },
    { key: "faculty", label: c.rows.faculty, render: (p) => p.faculty ?? "—" },
    {
      key: "city",
      label: c.rows.city,
      render: (p) => {
        const uni = getUni(p.universityId);
        return uni ? (ar ? CITY_AR[uni.city] ?? uni.city : uni.city) : "—";
      },
    },
    {
      key: "type",
      label: c.rows.type,
      render: (p) => {
        const uni = getUni(p.universityId);
        return uni ? (uni.type === "private" ? c.private : c.public) : "—";
      },
    },
    { key: "language", label: c.rows.language, render: (p) => (ar ? LANGUAGE_AR[p.language] ?? p.language : p.language) },
    { key: "degree", label: c.rows.degree, render: (p) => (ar ? DEGREE_VALUE_AR[p.degree] ?? p.degree : p.degree) },
    { key: "duration", label: c.rows.duration, render: (p) => c.years(p.durationYears) },
    {
      key: "tuition",
      label: c.rows.tuition,
      render: (p) => (
        <span>
          €{money(p.tuitionEurPerYear)} {c.perYear}
          {p.tuitionCzkPerYear && (
            <span className="block text-text-muted text-xs">
              CZK {money(p.tuitionCzkPerYear)}
            </span>
          )}
        </span>
      ),
      highlight: true,
    },
    {
      key: "entranceExam",
      label: c.rows.entranceExam,
      render: (p) => (
        <span>
          {p.entranceExam ? c.yes : c.no}
          {p.entranceExamDetails && (
            <span className="block text-text-muted text-xs mt-0.5">
              {ar && p.entranceExamDetails.ar ? p.entranceExamDetails.ar : p.entranceExamDetails.en}
            </span>
          )}
        </span>
      ),
    },
    {
      key: "applicationFee",
      label: c.rows.applicationFee,
      render: (p) => (p.applicationFeeEur !== undefined ? `€${p.applicationFeeEur}` : "—"),
    },
    { key: "deadline", label: c.rows.deadline, render: (p) => deadlineLabel(p, c), highlight: true },
    { key: "field", label: c.rows.field, render: (p) => (ar ? FIELD_AR[p.field] ?? p.field : p.field) },
    { key: "verified", label: c.rows.verified, render: (p) => p.verification.lastVerified },
  ];
}

function ProgrammeSelector({
  exclude,
  onSelect,
  onClose,
  c,
  ar,
}: {
  exclude: string[];
  onSelect: (id: string) => void;
  onClose: () => void;
  c: Copy;
  ar: boolean;
}) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return programmes.filter((p) => {
      if (exclude.includes(p.id)) return false;
      if (!term) return true;
      const uni = getUni(p.universityId);
      const hay = [p.name.en, p.name.ar, p.field, FIELD_AR[p.field], p.degree, p.faculty, uni?.name, uni?.city, uni && CITY_AR[uni.city]]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [q, exclude]);

  return (
    <AnimatePresence>
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <GlassCard className="w-full max-w-md max-h-[80vh] flex flex-col card-shine overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-brand/10 border border-brand/20">
                  <Plus className="w-3.5 h-3.5 text-brand" />
                </div>
                <h3 className="font-semibold text-text-primary">{c.addToCompare}</h3>
              </div>
              <button onClick={onClose} aria-label={c.close} className="p-1.5 rounded-lg hover:bg-surface-raised transition-colors">
                <X className="w-4 h-4 text-text-muted" />
              </button>
            </div>
            <div className="relative mb-3 group">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand transition-colors duration-200" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={c.search}
                aria-label={c.search}
                className="w-full ps-9 pe-3 py-2.5 rounded-xl bg-white/5 border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)] transition-all duration-200"
                autoFocus
              />
            </div>
            <div className="overflow-y-auto flex-1 -mx-2 scrollbar-thin">
              {filtered.length === 0 && (
                <div className="text-center py-8">
                  <GraduationCap className="w-8 h-8 text-text-muted mx-auto mb-2" />
                  <p className="text-sm text-text-muted">{c.noResults}</p>
                </div>
              )}
              {filtered.map((p, i) => {
                const uni = getUni(p.universityId);
                return (
                  <motion.button
                    key={p.id}
                    initial={{ y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.3 }}
                    onClick={() => onSelect(p.id)}
                    className="w-full text-start px-3 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 group/item border border-transparent hover:border-border-subtle"
                  >
                    <p className="text-sm font-medium text-text-primary group-hover/item:text-brand transition-colors duration-200">
                      {ar && p.name.ar ? p.name.ar : p.name.en}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {uni?.name ?? p.universityId} · {ar ? DEGREE_VALUE_AR[p.degree] ?? p.degree : p.degree} ·{" "}
                      {ar ? LANGUAGE_AR[p.language] ?? p.language : p.language} · €{p.tuitionEurPerYear.toLocaleString("en-US")} {c.perYear}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function CompareClient() {
  const { locale } = useTranslation();
  const ar = locale === "ar";
  const c: Copy = ar ? COPY.ar : COPY.en;
  const rows = useMemo(() => buildRows(c, ar), [c, ar]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const idsParam = params.get("ids") ?? "";
      const ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean).slice(0, MAX_COMPARE);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL query after mount (static export has no request)
      if (ids.length > 0) setSelectedIds(ids);
    } catch {}
  }, []);

  const selected = useMemo(
    () => selectedIds.map((id) => programmes.find((p) => p.id === id)).filter(Boolean) as Programme[],
    [selectedIds]
  );
  const nameOf = (p: Programme) => (ar && p.name.ar ? p.name.ar : p.name.en);

  function addProgramme(id: string) {
    setSelectedIds((prev) => {
      if (prev.length >= MAX_COMPARE || prev.includes(id)) return prev;
      const next = [...prev, id];
      updateUrl(next);
      return next;
    });
    setShowSelector(false);
  }

  function removeProgramme(id: string) {
    setSelectedIds((prev) => {
      const next = prev.filter((x) => x !== id);
      updateUrl(next);
      return next;
    });
  }

  function updateUrl(ids: string[]) {
    const url = new URL(window.location.href);
    if (ids.length > 0) {
      url.searchParams.set("ids", ids.join(","));
    } else {
      url.searchParams.delete("ids");
    }
    window.history.replaceState({}, "", url.toString());
  }

  const selector = showSelector && (
    <ProgrammeSelector exclude={selectedIds} onSelect={addProgramme} onClose={() => setShowSelector(false)} c={c} ar={ar} />
  );

  if (selected.length === 0) {
    return (
      <FadeIn>
        <div className="text-center py-16">
          <GlassCard className="max-w-lg mx-auto relative overflow-hidden card-shine">
            <div className="absolute top-0 end-0 w-24 h-24 pointer-events-none opacity-[0.04]">
              <svg viewBox="0 0 96 96" fill="none" className="w-full h-full">
                <circle cx="72" cy="24" r="60" stroke="currentColor" strokeWidth="0.5" className="text-brand" />
                <circle cx="72" cy="24" r="36" stroke="currentColor" strokeWidth="0.5" className="text-brand" />
              </svg>
            </div>
            <div className="p-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 mb-4">
                <Scale className="w-7 h-7 text-brand" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">{c.title}</h1>
              <p className="text-text-secondary mb-6 max-w-md mx-auto text-sm leading-relaxed">{c.intro}</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowSelector(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-bg font-semibold text-sm hover:bg-brand/90 transition-colors shadow-lg shadow-brand/20"
              >
                <Plus className="w-4 h-4" />
                {c.addAProgramme}
              </motion.button>
              <p className="text-xs text-text-muted mt-6">
                {c.orBrowse}{" "}
                <Link href="/programmes" className="text-brand underline underline-offset-2">
                  {c.browse}
                </Link>{" "}
                {c.orBrowseEnd}
              </p>
            </div>
          </GlassCard>
          {selector}
        </div>
      </FadeIn>
    );
  }

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand/10 border border-brand/20">
              <Scale className="w-5 h-5 text-brand" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">{c.title}</h1>
              <p className="text-xs text-text-muted mt-0.5">{c.selected(selected.length)}</p>
            </div>
          </div>
          {selected.length < MAX_COMPARE && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowSelector(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand text-bg font-semibold text-sm hover:bg-brand/90 transition-colors shadow-lg shadow-brand/20"
            >
              <Plus className="w-4 h-4" />
              {c.add}
            </motion.button>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <GlassCard className="overflow-hidden card-shine p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-start p-4 min-w-[120px] sticky start-0 bg-surface/80 backdrop-blur-sm z-10" />
                  {selected.map((p, i) => (
                    <motion.th
                      key={p.id}
                      initial={{ y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className="text-start p-4 min-w-[220px] align-top"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/programmes/${p.id}`}
                          className="font-semibold text-text-primary hover:text-brand transition-colors text-base leading-snug"
                        >
                          {nameOf(p)}
                        </Link>
                        <button
                          onClick={() => removeProgramme(p.id)}
                          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0 group/remove"
                          aria-label={c.remove(nameOf(p))}
                        >
                          <X className="w-3.5 h-3.5 text-text-muted group-hover/remove:text-error transition-colors" />
                        </button>
                      </div>
                      <p className="text-xs text-text-muted mt-1">
                        {getUni(p.universityId)?.name}
                      </p>
                    </motion.th>
                  ))}
                  {selected.length < MAX_COMPARE && (
                    <th className="p-4 min-w-[220px] align-top">
                      <button
                        onClick={() => setShowSelector(true)}
                        className="w-full h-20 rounded-xl border-2 border-dashed border-border-subtle hover:border-brand/40 transition-all duration-300 flex items-center justify-center gap-2 text-text-muted hover:text-brand group/add"
                      >
                        <Plus className="w-4 h-4 group-hover/add:rotate-90 transition-transform duration-300" />
                        <span className="text-sm">{c.addProgramme}</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <motion.tr
                    key={row.key}
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 + ri * 0.03, duration: 0.3 }}
                    className="border-t border-border-subtle hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    <td className="p-4 text-text-muted font-medium whitespace-nowrap sticky start-0 bg-surface/80 backdrop-blur-sm z-10 text-xs uppercase tracking-wide">
                      {row.label}
                    </td>
                    {selected.map((p) => (
                      <td key={p.id} className={`p-4 text-text-primary ${row.highlight ? "font-semibold text-brand" : ""}`}>
                        {row.render(p)}
                      </td>
                    ))}
                    {selected.length < MAX_COMPARE && <td className="p-4" />}
                  </motion.tr>
                ))}
                <tr className="border-t border-border-subtle">
                  <td className="p-4 sticky start-0 bg-surface/80 backdrop-blur-sm z-10" />
                  {selected.map((p) => (
                    <td key={p.id} className="p-4">
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/programmes/${p.id}`}
                          className="inline-flex items-center gap-1.5 text-xs text-brand font-medium hover:underline underline-offset-2 group/link"
                        >
                          {c.viewDetails}{" "}
                          <ArrowRight className="w-3 h-3 rtl:rotate-180 group-hover/link:translate-x-0.5 rtl:group-hover/link:-translate-x-0.5 transition-transform" />
                        </Link>
                        <a
                          href={p.programmeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors"
                        >
                          {c.officialPage} <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                  ))}
                  {selected.length < MAX_COMPARE && <td className="p-4" />}
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </FadeIn>

      <EmailSignup
        source="deadline"
        variant="compare"
        placement="compare"
        className="mt-6 max-w-2xl mx-auto"
        programmeIds={selected.map((p) => p.id)}
      />

      <FadeIn delay={0.2}>
        <p className="text-xs text-text-muted mt-8 text-center">{c.database(programmes.length)}</p>
      </FadeIn>

      {selector}
    </div>
  );
}
