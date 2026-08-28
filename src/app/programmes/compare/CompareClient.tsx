"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { GlassCard } from "@/components/ui/glass-card";
import { programmes, getDeadlineStatus } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { Programme } from "@/data/types";
import {
  X,
  Plus,
  ExternalLink,
  Search,
  ArrowRight,
} from "lucide-react";

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
        €{p.tuitionEurPerYear.toLocaleString()}/yr
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <GlassCard className="w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-text-primary">Add programme to compare</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-raised transition-colors">
            <X className="w-4 h-4 text-text-muted" />
          </button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search programmes..."
            className="w-full ps-9 pe-3 py-2 rounded-lg bg-surface-raised border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
            autoFocus
          />
        </div>
        <div className="overflow-y-auto flex-1 -mx-2">
          {filtered.length === 0 && (
            <p className="text-sm text-text-muted px-2 py-4 text-center">No programmes found.</p>
          )}
          {filtered.map((p) => {
            const uni = getUni(p.universityId);
            return (
              <button
                key={p.id}
                onClick={() => onSelect(p.id)}
                className="w-full text-start px-3 py-2.5 rounded-lg hover:bg-surface-raised transition-colors"
              >
                <p className="text-sm font-medium text-text-primary">{p.name.en}</p>
                <p className="text-xs text-text-muted">
                  {uni?.name ?? p.universityId} · {p.degree} · {p.language} · €{p.tuitionEurPerYear.toLocaleString()}/yr
                </p>
              </button>
            );
          })}
        </div>
      </GlassCard>
    </div>
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
      <div className="text-center py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">Compare Programmes</h1>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Select up to {MAX_COMPARE} programmes to compare side by side: tuition, deadlines, exams, and more.
        </p>
        <button
          onClick={() => setShowSelector(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-background font-medium text-sm hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add a programme
        </button>
        <p className="text-xs text-text-muted mt-6">
          Or{" "}
          <Link href="/universities" className="text-accent hover:underline underline-offset-2">
            browse programmes
          </Link>{" "}
          and use the compare button on each card.
        </p>
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Compare Programmes</h1>
        {selected.length < MAX_COMPARE && (
          <button
            onClick={() => setShowSelector(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-background font-medium text-sm hover:bg-accent/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        )}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          {/* Header: programme names */}
          <thead>
            <tr>
              <th className="text-start p-3 min-w-[120px] sticky start-0 bg-background z-10" />
              {selected.map((p) => (
                <th key={p.id} className="text-start p-3 min-w-[200px] align-top">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/programmes/${p.id}`}
                      className="font-semibold text-text-primary hover:text-accent transition-colors text-base leading-snug"
                    >
                      {p.name.en}
                    </Link>
                    <button
                      onClick={() => removeProgramme(p.id)}
                      className="p-1 rounded-lg hover:bg-surface-raised transition-colors shrink-0"
                      aria-label={`Remove ${p.name.en}`}
                    >
                      <X className="w-3.5 h-3.5 text-text-muted" />
                    </button>
                  </div>
                </th>
              ))}
              {selected.length < MAX_COMPARE && (
                <th className="p-3 min-w-[200px] align-top">
                  <button
                    onClick={() => setShowSelector(true)}
                    className="w-full h-20 rounded-xl border-2 border-dashed border-border-subtle hover:border-accent/40 transition-colors flex items-center justify-center gap-2 text-text-muted hover:text-accent"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add programme</span>
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-border-subtle">
                <td className="p-3 text-text-muted font-medium whitespace-nowrap sticky start-0 bg-background z-10">
                  {row.label}
                </td>
                {selected.map((p) => (
                  <td key={p.id} className={`p-3 text-text-primary ${row.highlight ? "font-medium" : ""}`}>
                    {row.render(p)}
                  </td>
                ))}
                {selected.length < MAX_COMPARE && <td className="p-3" />}
              </tr>
            ))}
            {/* Action row */}
            <tr className="border-t border-border-subtle">
              <td className="p-3 sticky start-0 bg-background z-10" />
              {selected.map((p) => (
                <td key={p.id} className="p-3">
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/programmes/${p.id}`}
                      className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline underline-offset-2"
                    >
                      View details <ArrowRight className="w-3 h-3" />
                    </Link>
                    <a
                      href={p.programmeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary"
                    >
                      Official page <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </td>
              ))}
              {selected.length < MAX_COMPARE && <td className="p-3" />}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-text-muted mt-8 text-center">
        Our database is growing, currently covering {programmes.length} verified programmes.
      </p>

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
