"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { GlassCard } from "@/components/ui/glass-card";
import { FadeIn } from "@/components/ui/fade-in";
import { programmes, getDeadlineStatus } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { Programme } from "@/data/types";
import {
  X,
  Plus,
  ExternalLink,
  Search,
  ArrowRight,
  Sparkles,
  Scale,
  GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MAX_COMPARE = 3;

function getUni(id: string) {
  return universitiesV2.find((u) => u.id === id);
}

function deadlineLabel(p: Programme): string {
  const status = getDeadlineStatus(p);
  if (status === "rolling") return "Rolling";
  if (status === "passed") return `${p.applicationDeadline} (passed)`;
  if (status === "verified") return p.applicationDeadline ?? "—";
  return "Not published";
}

type RowDef = {
  label: string;
  render: (p: Programme) => React.ReactNode;
  highlight?: boolean;
};

const rows: RowDef[] = [
  {
    label: "University",
    render: (p) => {
      const uni = getUni(p.universityId);
      return uni ? (
        <Link href={`/university/${uni.id}`} className="text-accent hover:underline underline-offset-2 text-sm">
          {uni.name}
        </Link>
      ) : p.universityId;
    },
  },
  { label: "Faculty", render: (p) => p.faculty ?? "—" },
  {
    label: "City",
    render: (p) => {
      const uni = getUni(p.universityId);
      return uni ? `${uni.city}` : "—";
    },
  },
  {
    label: "Type",
    render: (p) => {
      const uni = getUni(p.universityId);
      return uni ? (uni.type === "public" ? "Public" : "Private") : "—";
    },
  },
  { label: "Language", render: (p) => p.language },
  { label: "Degree", render: (p) => p.degree },
  {
    label: "Duration",
    render: (p) => `${p.durationYears} year${p.durationYears > 1 ? "s" : ""}`,
  },
  {
    label: "Tuition",
    render: (p) => (
      <span>
        €{p.tuitionEurPerYear.toLocaleString()} per year
        {p.tuitionCzkPerYear && (
          <span className="block text-text-muted text-xs">
            CZK {p.tuitionCzkPerYear.toLocaleString()}
          </span>
        )}
      </span>
    ),
    highlight: true,
  },
  {
    label: "Entrance exam",
    render: (p) => (
      <span>
        {p.entranceExam ? "Yes" : "No"}
        {p.entranceExamDetails && (
          <span className="block text-text-muted text-xs mt-0.5">
            {p.entranceExamDetails.en}
          </span>
        )}
      </span>
    ),
  },
  {
    label: "Application fee",
    render: (p) =>
      p.applicationFeeEur !== undefined ? `€${p.applicationFeeEur}` : "—",
  },
  { label: "Deadline", render: (p) => deadlineLabel(p), highlight: true },
  { label: "Field", render: (p) => p.field },
  {
    label: "Verified",
    render: (p) => p.verification.lastVerified,
  },
];

function ProgrammeSelector({
  exclude,
  onSelect,
  onClose,
}: {
  exclude: string[];
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return programmes.filter((p) => {
      if (exclude.includes(p.id)) return false;
      if (!term) return true;
      const uni = getUni(p.universityId);
      const hay = [p.name.en, p.field, p.degree, p.faculty, uni?.name, uni?.city]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [q, exclude]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <GlassCard className="w-full max-w-md max-h-[80vh] flex flex-col card-shine overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber/10 border border-amber/20">
                  <Plus className="w-3.5 h-3.5 text-amber" />
                </div>
                <h3 className="font-semibold text-text-primary">Add programme to compare</h3>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-raised transition-colors">
                <X className="w-4 h-4 text-text-muted" />
              </button>
            </div>
            <div className="relative mb-3 group">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-amber transition-colors duration-200" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search programmes..."
                className="w-full ps-9 pe-3 py-2.5 rounded-xl bg-white/5 border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber/40 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)] transition-all duration-200"
                autoFocus
              />
            </div>
            <div className="overflow-y-auto flex-1 -mx-2 scrollbar-thin">
              {filtered.length === 0 && (
                <div className="text-center py-8">
                  <GraduationCap className="w-8 h-8 text-text-muted mx-auto mb-2" />
                  <p className="text-sm text-text-muted">No programmes found.</p>
                </div>
              )}
              {filtered.map((p, i) => {
                const uni = getUni(p.universityId);
                return (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.3 }}
                    onClick={() => onSelect(p.id)}
                    className="w-full text-start px-3 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 group/item border border-transparent hover:border-border-subtle"
                  >
                    <p className="text-sm font-medium text-text-primary group-hover/item:text-amber transition-colors duration-200">{p.name.en}</p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {uni?.name ?? p.universityId} · {p.degree} · {p.language} · €{p.tuitionEurPerYear.toLocaleString()} per year
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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const idsParam = params.get("ids") ?? "";
      const ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean).slice(0, MAX_COMPARE);
      if (ids.length > 0) setSelectedIds(ids);
    } catch {}
  }, []);

  const selected = useMemo(
    () => selectedIds.map((id) => programmes.find((p) => p.id === id)).filter(Boolean) as Programme[],
    [selectedIds]
  );

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

  if (selected.length === 0) {
    return (
      <FadeIn>
        <div className="text-center py-16">
          <GlassCard className="max-w-lg mx-auto relative overflow-hidden card-shine">
            <div className="absolute top-0 end-0 w-24 h-24 pointer-events-none opacity-[0.04]">
              <svg viewBox="0 0 96 96" fill="none" className="w-full h-full">
                <circle cx="72" cy="24" r="60" stroke="currentColor" strokeWidth="0.5" className="text-amber" />
                <circle cx="72" cy="24" r="36" stroke="currentColor" strokeWidth="0.5" className="text-amber" />
              </svg>
            </div>
            <div className="p-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber/10 border border-amber/20 mb-4">
                <Scale className="w-7 h-7 text-amber" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">Compare Programmes</h1>
              <p className="text-text-secondary mb-6 max-w-md mx-auto text-sm leading-relaxed">
                Select up to {MAX_COMPARE} programmes to compare side by side: tuition, deadlines, exams, and more.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowSelector(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber text-midnight font-semibold text-sm hover:bg-amber/90 transition-colors shadow-lg shadow-amber/20"
              >
                <Plus className="w-4 h-4" />
                Add a programme
              </motion.button>
              <p className="text-xs text-text-muted mt-6">
                Or{" "}
                <Link href="/programmes" className="text-amber hover:underline underline-offset-2">
                  browse programmes
                </Link>{" "}
                and use the compare button on each card.
              </p>
            </div>
          </GlassCard>
          {showSelector && (
            <ProgrammeSelector
              exclude={selectedIds}
              onSelect={addProgramme}
              onClose={() => setShowSelector(false)}
            />
          )}
        </div>
      </FadeIn>
    );
  }

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber/10 border border-amber/20">
              <Scale className="w-5 h-5 text-amber" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Compare Programmes</h1>
              <p className="text-xs text-text-muted mt-0.5">{selected.length} of {MAX_COMPARE} selected</p>
            </div>
          </div>
          {selected.length < MAX_COMPARE && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowSelector(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber text-midnight font-semibold text-sm hover:bg-amber/90 transition-colors shadow-lg shadow-amber/20"
            >
              <Plus className="w-4 h-4" />
              Add
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
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className="text-start p-4 min-w-[220px] align-top"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/programmes/${p.id}`}
                          className="font-semibold text-text-primary hover:text-amber transition-colors text-base leading-snug"
                        >
                          {p.name.en}
                        </Link>
                        <button
                          onClick={() => removeProgramme(p.id)}
                          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0 group/remove"
                          aria-label={`Remove ${p.name.en}`}
                        >
                          <X className="w-3.5 h-3.5 text-text-muted group-hover/remove:text-red-400 transition-colors" />
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
                        className="w-full h-20 rounded-xl border-2 border-dashed border-border-subtle hover:border-amber/40 transition-all duration-300 flex items-center justify-center gap-2 text-text-muted hover:text-amber group/add"
                      >
                        <Plus className="w-4 h-4 group-hover/add:rotate-90 transition-transform duration-300" />
                        <span className="text-sm">Add programme</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <motion.tr
                    key={row.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 + ri * 0.03, duration: 0.3 }}
                    className="border-t border-border-subtle hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    <td className="p-4 text-text-muted font-medium whitespace-nowrap sticky start-0 bg-surface/80 backdrop-blur-sm z-10 text-xs uppercase tracking-wide">
                      {row.label}
                    </td>
                    {selected.map((p) => (
                      <td key={p.id} className={`p-4 text-text-primary ${row.highlight ? "font-semibold text-amber" : ""}`}>
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
                          className="inline-flex items-center gap-1.5 text-xs text-amber font-medium hover:underline underline-offset-2 group/link"
                        >
                          View details <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                        <a
                          href={p.programmeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors"
                        >
                          Official page <ExternalLink className="w-3 h-3" />
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

      <FadeIn delay={0.2}>
        <p className="text-xs text-text-muted mt-8 text-center">
          Our database is growing — currently covering {programmes.length} verified programmes.
        </p>
      </FadeIn>

      {showSelector && (
        <ProgrammeSelector
          exclude={selectedIds}
          onSelect={addProgramme}
          onClose={() => setShowSelector(false)}
        />
      )}
    </div>
  );
}
