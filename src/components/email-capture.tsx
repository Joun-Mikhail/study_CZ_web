"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslation } from "@/i18n/context";

type Tool = "eligibility" | "matcher";

const FORM_IDS: Record<Tool, string | undefined> = {
  eligibility: process.env.NEXT_PUBLIC_CONVERTKIT_ELIGIBILITY_FORM_ID,
  matcher: process.env.NEXT_PUBLIC_CONVERTKIT_MATCHER_FORM_ID,
};

const COPY = {
  eligibility: {
    en: {
      headline: "Get this result + a checklist by email",
      subtext:
        "We'll email you this result along with a next-steps checklist you can save. No spam, just useful info.",
    },
    ar: {
      headline: "احصل على هذه النتيجة وقائمة تحقق عبر البريد الإلكتروني",
      subtext:
        "سنرسل لك هذه النتيجة إلى بريدك الإلكتروني مع قائمة تحقق بالخطوات التالية يمكنك حفظها. بدون رسائل مزعجة، فقط معلومات مفيدة.",
    },
  },
  matcher: {
    en: {
      headline: "Get your matches + a checklist by email",
      subtext:
        "We'll email you this result along with a next-steps checklist you can save. No spam, just useful info.",
    },
    ar: {
      headline: "احصل على البرامج المطابقة وقائمة تحقق عبر البريد الإلكتروني",
      subtext:
        "سنرسل لك البرامج المطابقة إلى بريدك الإلكتروني مع قائمة تحقق بالخطوات التالية يمكنك حفظها. بدون رسائل مزعجة، فقط معلومات مفيدة.",
    },
  },
} as const;

const SHARED = {
  en: {
    placeholder: "your@email.com",
    button: "Email me this",
    consent:
      "Email me this result, and add me to the list for occasional updates about Czech universities, deadlines, and scholarships. I can unsubscribe anytime.",
    success: "Sent! Check your inbox (and spam folder, just in case).",
    error:
      "Couldn't send that — but your result is still right here. Try again in a minute, or just screenshot this page.",
    privacy: "By submitting, your data is handled per our ",
    privacyLink: "Privacy Policy",
  },
  ar: {
    placeholder: "بريدك الإلكتروني",
    button: "أرسلها إلى بريدي الإلكتروني",
    consent:
      "أوافق على إرسال هذه النتيجة إلى بريدي الإلكتروني وإضافتي إلى القائمة البريدية لتلقي تحديثات بين حين وآخر عن الجامعات التشيكية والمواعيد النهائية والمنح الدراسية. يمكنني إلغاء الاشتراك في أي وقت.",
    success: "تم الإرسال! تحقّق من بريدك الإلكتروني (ومجلد الرسائل غير المرغوب فيها للتأكد).",
    error: "تعذّر الإرسال — لكن نتيجتك ما زالت أمامك هنا. حاول مرة أخرى بعد قليل، أو التقط لقطة شاشة لهذه الصفحة.",
    privacy: "بإرسال هذا النموذج، تتم معالجة بياناتك وفق ",
    privacyLink: "سياسة الخصوصية",
  },
} as const;

export function EmailCapture({ tool }: { tool: Tool }) {
  const { locale } = useTranslation();
  const formId = FORM_IDS[tool];
  const copy = { ...SHARED[locale], ...COPY[tool][locale] };

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // No ConvertKit form configured for this environment yet — render nothing.
  if (!formId) return null;

  const canSubmit = /\S+@\S+\.\S+/.test(email) && consent && status !== "submitting";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("submitting");
    try {
      const body = new FormData();
      body.set("email_address", email);
      const res = await fetch(`https://app.convertkit.com/forms/${formId}/subscriptions`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && data.status !== "error" && !data.errors) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 mb-6 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
        <p className="text-sm text-text-primary">{copy.success}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface/50 p-5 mb-6">
      <div className="flex items-start gap-3 mb-3">
        <Mail className="w-5 h-5 text-amber shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-text-primary">{copy.headline}</p>
          <p className="text-xs text-text-muted mt-1">{copy.subtext}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={copy.placeholder}
          className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-amber/50 transition-colors"
        />

        <label className="flex items-start gap-2.5 text-xs text-text-muted cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-border-subtle accent-amber shrink-0"
          />
          <span>{copy.consent}</span>
        </label>

        {status === "error" && <p className="text-xs text-red-400">{copy.error}</p>}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full px-5 py-2.5 rounded-xl bg-amber text-midnight text-sm font-medium hover:bg-amber/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          {status === "submitting" && <Loader2 className="w-4 h-4 animate-spin" />}
          {copy.button}
        </button>

        <p className="text-[11px] text-text-muted">
          {copy.privacy}
          <Link href="/privacy" className="underline hover:text-text-secondary">
            {copy.privacyLink}
          </Link>
        </p>
      </form>
    </div>
  );
}
