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
    placeholder: "your@email.com",
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
    placeholder: "your@email.com",
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
};

export function EmailSignup({ source, answers, programmeIds, className, compact }: Props) {
  const { locale } = useTranslation();
  const t = COPY[locale];
  const c = t[source];
  const [email, setEmail] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error" | "badEmail">("idle");

  if (!EMAIL_ENABLED) return null;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, locale, source, marketing, answers, programmeIds, website }),
      });
      if (res.ok) {
        setStatus("done");
        track("email_signup", { source, tips: marketing ? "yes" : "no" });
      } else {
        setStatus(res.status === 400 ? "badEmail" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  const Icon = source === "deadline" || source === "matcher" ? Bell : Mail;

  if (status === "done") {
    return (
      <div className={cn("rounded-2xl border border-green-500/30 bg-green-500/5 p-5 flex items-start gap-3", className)} role="status">
        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
        <p className="text-sm text-text-primary">{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={cn("relative rounded-2xl border border-amber/25 bg-amber/[0.04] p-5", className)}>
      <div className="flex items-start gap-3 mb-3">
        <Icon className="w-5 h-5 text-amber shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-text-primary">{c.title}</p>
          {!compact && <p className="text-xs text-text-secondary mt-1">{c.text}</p>}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="sr-only" htmlFor={`email-${source}`}>
          Email
        </label>
        <input
          id={`email-${source}`}
          type="email"
          required
          autoComplete="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-amber/60"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber text-midnight text-sm font-semibold hover:bg-amber/90 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
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
        className="absolute -left-[9999px] w-px h-px opacity-0"
        aria-hidden="true"
      />
      <label className="flex items-start gap-2 mt-3 text-xs text-text-secondary cursor-pointer">
        <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-0.5 accent-amber" />
        <span>{t.tips}</span>
      </label>
      <p className="text-[11px] text-text-muted mt-2">
        {t.privacy}{" "}
        <Link href="/privacy" className="underline hover:text-amber">
          {t.privacyLink}
        </Link>
        .
      </p>
      {(status === "error" || status === "badEmail") && (
        <p className="text-xs text-red-400 mt-2" role="alert">
          {status === "badEmail" ? t.badEmail : t.error}
        </p>
      )}
    </form>
  );
}
