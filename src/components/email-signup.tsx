"use client";

import { useState, type FormEvent } from "react";
import Link from "@/components/locale-link";
import { Mail, CheckCircle2, Loader2, Bell } from "lucide-react";
import { useTranslation } from "@/i18n/context";
import { track } from "@/components/umami";
import { cn } from "@/lib/utils";

/** Email sign-up, shown only once Brevo is set up on Netlify. */
export const EMAIL_ENABLED = process.env.NEXT_PUBLIC_EMAIL_ENABLED === "true";

export type EmailSource = "eligibility" | "deadline" | "matcher" | "checklist";

/** Wording for a placement; the source still decides which email is sent. */
export type EmailVariant = "university" | "compare" | "field" | "guide";

const COPY = {
  en: {
    eligibility: { title: "Email me my result", text: "Your result and the next steps, in your inbox to keep.", button: "Email my result" },
    deadline: {
      title: "Remind me before the deadline",
      text: "I'll email you when the deadline is confirmed, then 30, 7 and 1 days before it.",
      button: "Remind me",
    },
    matcher: {
      title: "Get deadline reminders for these programmes",
      text: "I'll email you when each deadline is confirmed, then 30, 7 and 1 days before it.",
      button: "Remind me",
    },
    checklist: { title: "Get the free document checklist", text: "The document steps from the guide, sent to your inbox.", button: "Send it to me" },
    university: {
      title: "Get deadline reminders for this university",
      text: "I'll email you when each programme's deadline is confirmed, then 30, 7 and 1 days before it.",
      button: "Remind me",
    },
    compare: {
      title: "Remind me about these programmes",
      text: "One email when each deadline is confirmed, then 30, 7 and 1 days before it.",
      button: "Remind me",
    },
    field: {
      title: "Follow the deadlines for these programmes",
      text: "I'll email you when each deadline is confirmed, then 30, 7 and 1 days before it.",
      button: "Remind me",
    },
    guide: {
      title: "Get the application document checklist",
      text: "Every document a Czech university asks for, in one email you can come back to.",
      button: "Send it to me",
    },
    placeholder: "your@email.com",
    emailLabel: "Email address",
    pickLegend: "Choose up to 5 programmes to follow",
    nonePicked: "Choose at least one programme.",
    tips: "Also send me occasional tips and offers. Unsubscribe anytime.",
    privacy: "We send emails with Brevo. See the",
    privacyLink: "privacy policy",
    success: "Sent! Check your inbox (and the spam folder, just in case).",
    error: "That didn't work. Please try again in a minute.",
    badEmail: "Please check your email address.",
  },
  ar: {
    eligibility: { title: "ابعتلي النتيجة على الإيميل", text: "نتيجتك والخطوات الجاية في الإيميل عشان ترجعلها.", button: "ابعت النتيجة" },
    deadline: {
      title: "فكرني قبل آخر ميعاد",
      text: "هبعتلك أول ما الميعاد يتأكد، وبعدين قبله بـ30 يوم و7 أيام ويوم.",
      button: "فكرني",
    },
    matcher: {
      title: "تذكير بمواعيد البرامج دي",
      text: "هبعتلك أول ما كل ميعاد يتأكد، وبعدين قبله بـ30 يوم و7 أيام ويوم.",
      button: "فكرني",
    },
    checklist: { title: "قائمة الأوراق ببلاش", text: "خطوات الأوراق من الدليل، على الإيميل.", button: "ابعتهالي" },
    university: {
      title: "تذكير بمواعيد التقديم في الجامعة دي",
      text: "هبعتلك أول ما ميعاد كل برنامج يتأكد، وبعدين قبله بـ30 يوم و7 أيام ويوم.",
      button: "فكرني",
    },
    compare: {
      title: "فكرني بمواعيد البرامج دي",
      text: "إيميل أول ما كل ميعاد يتأكد، وبعدين قبله بـ30 يوم و7 أيام ويوم.",
      button: "فكرني",
    },
    field: {
      title: "تابع مواعيد التقديم للبرامج دي",
      text: "هبعتلك أول ما كل ميعاد يتأكد، وبعدين قبله بـ30 يوم و7 أيام ويوم.",
      button: "فكرني",
    },
    guide: {
      title: "قائمة أوراق التقديم على الإيميل",
      text: "كل الأوراق اللي الجامعة التشيكية بتطلبها، في إيميل واحد ترجعله وقت ما تحتاج.",
      button: "ابعتهالي",
    },
    placeholder: "your@email.com",
    emailLabel: "عنوان الإيميل",
    pickLegend: "اختار لحد 5 برامج تتابعها",
    nonePicked: "اختار برنامج واحد على الأقل.",
    tips: "وابعتلي كمان نصايح وعروض من وقت للتاني. تقدر تلغي في أي وقت.",
    privacy: "بنبعت الإيميلات عن طريق Brevo. شوف",
    privacyLink: "سياسة الخصوصية",
    success: "اتبعت! شوف الإيميل (والسبام كمان احتياطي).",
    error: "محصلش. جرب تاني بعد دقيقة.",
    badEmail: "اتأكد من الإيميل.",
  },
} as const;

type Props = {
  source: EmailSource;
  /** Eligibility answers (source "eligibility"). */
  answers?: Record<string, string>;
  /** Programme IDs to follow (sources "deadline" and "matcher"). */
  programmeIds?: string[];
  className?: string;
  compact?: boolean;
  /** Placement wording (defaults to the source's own). */
  variant?: EmailVariant;
  /** Where the box is, sent with the email_signup event (e.g. "university"). */
  placement?: string;
  /**
   * Programmes the visitor picks from (none ticked to start). Use when there
   * are more than MAX_FOLLOW; otherwise pass them all as programmeIds.
   */
  choices?: { id: string; label: string }[];
};

/** Most programmes one sign-up can follow (the subscribe function's limit). */
export const MAX_FOLLOW = 5;

/** Follow them all when there are few; otherwise let the visitor choose. */
export function followProps<T extends { id: string }>(items: T[], label: (item: T) => string) {
  return items.length <= MAX_FOLLOW
    ? { programmeIds: items.map((i) => i.id) }
    : { choices: items.map((i) => ({ id: i.id, label: label(i) })) };
}

export function EmailSignup({ source, answers, programmeIds, className, compact, variant, placement, choices }: Props) {
  const { locale } = useTranslation();
  const t = COPY[locale];
  const c = t[variant ?? source];
  const [email, setEmail] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [website, setWebsite] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error" | "badEmail" | "nonePicked">("idle");

  if (!EMAIL_ENABLED) return null;

  const togglePick = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length < MAX_FOLLOW ? [...p, id] : p));

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (choices && picked.length === 0) {
      setStatus("nonePicked");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, locale, source, marketing, answers, programmeIds: choices ? picked : programmeIds, website }),
      });
      if (res.ok) {
        setStatus("done");
        track("email_signup", { source, placement: placement ?? source, tips: marketing ? "yes" : "no" });
      } else {
        setStatus(res.status === 400 ? "badEmail" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  const Icon = source === "deadline" || source === "matcher" ? Bell : Mail;
  const inputId = `email-${placement ?? source}`;

  if (status === "done") {
    return (
      <div className={cn("rounded-2xl border border-green-500/30 bg-green-500/5 p-5 flex items-start gap-3", className)} role="status">
        <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
        <p className="text-sm text-text-primary">{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={cn("relative rounded-2xl border border-brand/25 bg-brand/[0.04] p-5", className)}>
      <div className="flex items-start gap-3 mb-3">
        <Icon className="w-5 h-5 text-brand shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-text-primary">{c.title}</p>
          {!compact && <p className="text-xs text-text-secondary mt-1">{c.text}</p>}
        </div>
      </div>
      {choices && (
        <fieldset className="mb-3">
          <legend className="text-xs font-medium text-text-primary mb-1.5">
            {t.pickLegend} <span className="text-text-muted font-normal">({picked.length}/{MAX_FOLLOW})</span>
          </legend>
          <div className="max-h-48 overflow-y-auto rounded-xl border border-border-subtle bg-surface divide-y divide-border-subtle">
            {choices.map((ch) => {
              const on = picked.includes(ch.id);
              return (
                <label key={ch.id} className="flex items-start gap-2 px-3 py-2 text-xs text-text-secondary cursor-pointer has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60">
                  <input
                    type="checkbox"
                    checked={on}
                    disabled={!on && picked.length >= MAX_FOLLOW}
                    onChange={() => togglePick(ch.id)}
                    className="mt-0.5 accent-brand"
                  />
                  <span>{ch.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="sr-only" htmlFor={inputId}>
          {t.emailLabel}
        </label>
        <input
          id={inputId}
          type="email"
          required
          autoComplete="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-brand/60"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-vivid inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand/90 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
          {c.button}
        </button>
      </div>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute top-0 start-0 w-px h-px p-0 -m-px overflow-hidden border-0 opacity-0 pointer-events-none"
        aria-hidden="true"
      />
      <label className="flex items-start gap-2 mt-3 text-xs text-text-secondary cursor-pointer">
        <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-0.5 accent-brand" />
        <span>{t.tips}</span>
      </label>
      <p className="text-[11px] text-text-muted mt-2">
        {t.privacy}{" "}
        <Link href="/privacy" className="underline hover:text-brand">
          {t.privacyLink}
        </Link>
        .
      </p>
      {(status === "error" || status === "badEmail" || status === "nonePicked") && (
        <p className="text-xs text-error mt-2" role="alert">
          {status === "badEmail" ? t.badEmail : status === "nonePicked" ? t.nonePicked : t.error}
        </p>
      )}
    </form>
  );
}
