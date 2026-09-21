"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { BellRing, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslation } from "@/i18n/context";
import { submitToConvertKit } from "@/lib/convertkit";

// Change once a year: the intake the waitlist is for.
const INTAKE = "2027/2028";

const DEFAULT_FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_WAITLIST_FORM_ID;

const COPY = {
  en: {
    headline: `Don't miss the ${INTAKE} application deadlines.`,
    subtext:
      "Applications open months from now. Join the waitlist to get notified as soon as the first major universities open their applications, plus receive our free Document Prep Guide to start getting ready today.",
    emailPlaceholder: "your@email.com",
    countryPlaceholder: "Your country (e.g., Egypt, Jordan)",
    button: "Join the Waitlist & Get the Guide",
    consent:
      "Email me the guide and occasional updates about Czech university deadlines. I can unsubscribe anytime.",
    success:
      "You're on the list! Check your inbox (and spam folder) for the link to your free guide. We'll notify you as soon as the first major universities open applications.",
    error:
      "Couldn't sign you up right now. Please try again in a minute, or message us directly on WhatsApp.",
    privacy: "By submitting, your data is handled per our ",
    privacyLink: "Privacy Policy",
  },
  ar: {
    headline: `متفوتش مواعيد تقديم ${INTAKE}`,
    subtext:
      "التقديم بيفتح بعد شهور. انضم لقائمة الانتظار عشان نبلغك أول ما أوائل الجامعات الكبيرة تفتح التقديم، وهنرسل لك دليل تجهيز الأوراق المجاني عشان تبدأ تجهز من دلوقتي.",
    emailPlaceholder: "بريدك الإلكتروني",
    countryPlaceholder: "بلدك (مثال: مصر، الأردن)",
    button: "انضم للقائمة وهات الدليل",
    consent:
      "أوافق على إرسال الدليل وتحديثات بين حين وآخر عن مواعيد الجامعات التشيكية. يمكنني إلغاء الاشتراك في أي وقت.",
    success:
      "أنت في القائمة! اتأكد من بريدك الإلكتروني (ومجلد السبام) عشان تلاقي رابط الدليل. هنبلغك أول ما أوائل الجامعات الكبيرة تفتح التقديم.",
    error: "حصل مشكلة في التسجيل. حاول تاني بعد دقيقة، أو كلمنا مباشرة على الواتساب.",
    privacy: "بإرسال هذا النموذج، تتم معالجة بياناتك وفق ",
    privacyLink: "سياسة الخصوصية",
  },
} as const;

const INPUT_CLASS =
  "w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-amber/50 transition-colors";

export function WaitlistSignup({
  formId = DEFAULT_FORM_ID,
  className = "",
}: {
  formId?: string;
  className?: string;
}) {
  const { locale } = useTranslation();
  const copy = COPY[locale];

  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // No ConvertKit waitlist form configured for this environment: render nothing.
  if (!formId) return null;

  const canSubmit =
    /\S+@\S+\.\S+/.test(email) && country.trim().length > 1 && consent && status !== "submitting";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("submitting");
    // `language` lets ConvertKit send the English or Arabic version of the sequence.
    const ok = await submitToConvertKit(formId!, email, { country: country.trim(), language: locale });
    setStatus(ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className={className}>
        <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
          <p className="text-sm text-text-primary leading-relaxed">{copy.success}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="rounded-2xl border border-amber/20 bg-amber/[0.04] p-6">
        <div className="flex items-start gap-3 mb-4">
          <BellRing className="w-5 h-5 text-amber shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-text-primary">{copy.headline}</h2>
            <p className="text-sm text-text-secondary leading-relaxed mt-1.5">{copy.subtext}</p>
          </div>
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="email"
              required
              dir="auto"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.emailPlaceholder}
              aria-label={copy.emailPlaceholder}
              className={INPUT_CLASS}
            />
            <input
              type="text"
              required
              dir="auto"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder={copy.countryPlaceholder}
              aria-label={copy.countryPlaceholder}
              className={INPUT_CLASS}
            />
          </div>
  
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
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber text-midnight text-sm font-medium hover:bg-amber/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
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
    </div>
  );
}
