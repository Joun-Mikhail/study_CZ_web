"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { GlassCard } from "@/components/ui/glass-card";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { getDeadlineStatus } from "@/data/programmes";
import type { Programme, UniversityV2, DeadlineStatus } from "@/data/types";
import {
  GraduationCap,
  MapPin,
  Clock,
  Euro,
  FileText,
  ExternalLink,
  BookOpen,
  Building2,
  ShieldCheck,
  CalendarDays,
  ClipboardList,
  Globe,
  Bookmark,
  AlertCircle,
  GitCompareArrows,
} from "lucide-react";

function DeadlineBadge({ status, date }: { status: DeadlineStatus; date?: string }) {
  const map: Record<DeadlineStatus, { label: string; cls: string }> = {
    verified: { label: date ? `Deadline: ${date}` : "Deadline verified", cls: "bg-success/15 text-success" },
    "not-verified": { label: "Deadline not verified", cls: "bg-warning/15 text-warning" },
    passed: { label: "Deadline passed", cls: "bg-error/15 text-error" },
    rolling: { label: "Rolling admissions", cls: "bg-accent/15 text-accent" },
    "not-published": { label: "Deadline not published yet", cls: "bg-text-muted/15 text-text-muted" },
  };
  const { label, cls } = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${cls}`}>
      <CalendarDays className="w-4 h-4" />
      {label}
    </span>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <GlassCard className="mb-6">
      <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-accent" />
        {title}
      </h2>
      {children}
    </GlassCard>
  );
}

function Row({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon?: React.ElementType }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border-subtle last:border-0">
      {Icon && <Icon className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />}
      <span className="text-sm text-text-muted min-w-[140px] shrink-0">{label}</span>
      <span className="text-sm text-text-primary">{value}</span>
    </div>
  );
}

type Props = {
  programme: Programme;
  university: UniversityV2 | null;
};

export default function ProgrammeDetailClient({ programme: p, university: uni }: Props) {
  const { t, lang } = useTranslation();
  const deadlineStatus = getDeadlineStatus(p);
  const name = lang === "ar" && p.name.ar ? p.name.ar : p.name.en;
  const uniName = uni?.name ?? p.universityId;

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-accent/15 text-accent">
            {p.degree}
          </span>
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-surface-raised text-text-secondary">
            {p.language}
          </span>
          <DeadlineBadge status={deadlineStatus} date={p.applicationDeadline} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">{name}</h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-text-secondary text-sm">
          <span className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            <Link href={`/university/${uni?.id ?? p.universityId}`} className="hover:text-accent transition-colors underline underline-offset-2">
              {uniName}
            </Link>
          </span>
          {p.faculty && (
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              {p.faculty}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {uni?.city ?? "Czech Republic"}{uni ? ` · ${uni.type === "public" ? "Public" : "Private"}` : ""}
          </span>
        </div>

        <div className="mt-4">
          <VerifiedBadge
            date={p.verification.lastVerified}
            sourceUrl={p.verification.sourceUrl}
            label="Verified:"
          />
        </div>
      </div>

      {/* ── Key Facts ─────────────────────────────────────────── */}
      <Section title="Key Facts" icon={ClipboardList}>
        <Row icon={GraduationCap} label="Degree" value={p.degree} />
        <Row icon={Globe} label="Language" value={p.language} />
        <Row icon={Clock} label="Duration" value={`${p.durationYears} year${p.durationYears > 1 ? "s" : ""}`} />
        <Row icon={Euro} label="Tuition" value={
          <span>
            €{p.tuitionEurPerYear.toLocaleString()} / year
            {p.tuitionCzkPerYear && <span className="text-text-muted ms-1">(CZK {p.tuitionCzkPerYear.toLocaleString()})</span>}
            {p.tuitionNote && <span className="text-text-muted ms-1">({p.tuitionNote})</span>}
          </span>
        } />
        {p.applicationFeeEur !== undefined && (
          <Row icon={Euro} label="Application fee" value={`€${p.applicationFeeEur}`} />
        )}
        <Row icon={CalendarDays} label="Application deadline" value={
          p.applicationDeadline
            ? `${p.applicationDeadline}${p.applicationDeadlineRound ? ` (${p.applicationDeadlineRound})` : ""}`
            : p.deadlineType === "rolling" ? "Rolling admissions" : "Not published yet"
        } />
        {p.applicationOpenDate && (
          <Row icon={CalendarDays} label="Applications open" value={p.applicationOpenDate} />
        )}
        <Row icon={FileText} label="Entrance exam" value={
          <span>
            {p.entranceExam ? "Yes" : "No exam required"}
            {p.entranceExamDetails && (
              <span className="text-text-muted block mt-0.5">
                {lang === "ar" && p.entranceExamDetails.ar ? p.entranceExamDetails.ar : p.entranceExamDetails.en}
              </span>
            )}
          </span>
        } />
        {p.entranceExamDate && (
          <Row icon={CalendarDays} label="Exam date" value={p.entranceExamDate} />
        )}
        <Row icon={GraduationCap} label="Field" value={p.field + (p.subfield ? `,${p.subfield}` : "")} />
      </Section>

      {/* ── Application ───────────────────────────────────────── */}
      <Section title="Application" icon={FileText}>
        {p.languageRequirement && (
          <Row icon={Globe} label="Language requirement" value={p.languageRequirement} />
        )}
        {p.requiredDocuments && p.requiredDocuments.length > 0 && (
          <div className="mb-3">
            <h3 className="text-sm font-medium text-text-secondary mb-2 flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4" />
              Required documents
            </h3>
            <ul className="list-disc list-inside text-sm text-text-primary space-y-1 ps-2">
              {p.requiredDocuments.map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </div>
        )}
        {(!p.requiredDocuments || p.requiredDocuments.length === 0) && !p.languageRequirement && (
          <p className="text-sm text-text-muted">
            Check the official programme page for application requirements and required documents.
          </p>
        )}
        <div className="mt-4 pt-4 border-t border-border-subtle">
          <a
            href={p.programmeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-background font-medium text-sm hover:bg-accent/90 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Visit official programme page
          </a>
        </div>
      </Section>

      {/* ── Trust ─────────────────────────────────────────────── */}
      <Section title="Data Sources & Verification" icon={ShieldCheck}>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-success mt-0.5 shrink-0" />
            <div>
              <span className="text-text-primary font-medium">Official university source</span>
              <p className="text-text-muted mt-0.5">
                All information on this page comes from the university&apos;s official website.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CalendarDays className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <div>
              <span className="text-text-primary font-medium">Last verified: {p.verification.lastVerified}</span>
              <p className="text-text-muted mt-0.5">
                Verified by{" "}
                {p.verification.verifiedBy === "studyczechia" ? "Study Czechia" : "community contributor"}.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <ExternalLink className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <div>
              <span className="text-text-primary font-medium">Source</span>
              <p className="text-text-muted mt-0.5">
                <a
                  href={p.verification.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-text-secondary break-all"
                >
                  {p.verification.sourceUrl}
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 pt-2 border-t border-border-subtle">
            <AlertCircle className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />
            <p className="text-text-muted text-xs">
              Universities may update their programmes, fees, or deadlines at any time.
              Always confirm details on the official programme page before applying.
            </p>
          </div>
        </div>
      </Section>

      {/* ── CTAs ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        <a
          href={p.programmeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-background font-semibold hover:bg-accent/90 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Apply / Visit official programme
        </a>
        <Link
          href={`/programmes/compare?ids=${p.id}`}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border-subtle text-text-secondary font-medium text-sm hover:border-accent/40 hover:text-accent transition-colors"
        >
          <GitCompareArrows className="w-4 h-4" />
          Compare with others
        </Link>
      </div>

      {/* ── Database notice ───────────────────────────────────── */}
      <p className="text-xs text-text-muted mt-8 text-center">
        Our database is growing,currently covering 21 verified programmes.
      </p>
    </div>
  );
}
