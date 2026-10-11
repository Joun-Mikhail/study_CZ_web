"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { whatsappWithContext } from "@/config/contact";
import { claimAccess } from "@/lib/course-api";
import { hasAccess } from "@/lib/course-store";
import { CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";

type State = "checking" | "ok" | "preorder" | "not-paid" | "unavailable" | "no-session";

/**
 * Stripe sends course buyers here: /courses/welcome/?session_id={CHECKOUT_SESSION_ID}.
 * The course API checks that checkout with Stripe and unlocks this device.
 */
export default function WelcomeClient() {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;
  const [state, setState] = useState<State>("checking");

  useEffect(() => {
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("session_id");
    if (!sessionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL after mount (static export has no request)
      setState(hasAccess() ? "ok" : "no-session");
      return;
    }
    claimAccess(sessionId).then((result) => {
      setState(result);
      if (result === "ok" || result === "preorder") {
        // Drop the session ID from the address bar so it isn't shared by accident.
        url.searchParams.delete("session_id");
        window.history.replaceState(null, "", url.pathname + url.search);
      }
    });
  }, []);

  const help = (
    <MagneticButton variant="secondary" href={whatsappWithContext("my course purchase")} className="w-full">
      <MessageCircle className="w-4 h-4" />
      {t.whatsapp}
    </MagneticButton>
  );

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <GlassCard>
            {state === "checking" && (
              <div className="flex flex-col items-center text-center gap-4 py-6" role="status">
                <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-text-secondary">{t.checking}</p>
              </div>
            )}

            {(state === "ok" || state === "preorder") && (
              <div className="space-y-4 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" aria-hidden="true" />
                <h1 className="text-2xl font-bold text-text-primary">{state === "preorder" ? t.preorder.title : t.ok.title}</h1>
                <p className="text-sm text-text-secondary leading-relaxed">{state === "preorder" ? t.preorder.body : t.ok.body}</p>
                <MagneticButton variant="primary" href="/courses/learn/" className="w-full">
                  {t.ok.start}
                </MagneticButton>
                <p className="text-xs text-text-muted leading-relaxed">{t.ok.otherDevice}</p>
              </div>
            )}

            {(state === "not-paid" || state === "unavailable" || state === "no-session") && (
              <div className="space-y-4 text-center">
                <AlertCircle className="w-12 h-12 text-amber mx-auto" aria-hidden="true" />
                <h1 className="text-2xl font-bold text-text-primary">{t[state].title}</h1>
                <p className="text-sm text-text-secondary leading-relaxed">{t[state].body}</p>
                {help}
              </div>
            )}
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const en = {
  checking: "Checking your payment with Stripe…",
  whatsapp: "Message me on WhatsApp",
  preorder: {
    title: "Payment received",
    body: "The course opens on 1 January 2027 and this device is already unlocked. The free preview lessons are open now.",
  },
  ok: {
    title: "Thank you! Your course is unlocked",
    body: "This device now has access to every lesson and quiz. New lessons and videos appear here as they are published.",
    start: "Go to the course",
    otherDevice:
      "Want it on another phone or laptop later? Message me on WhatsApp with the email you paid with, and I'll send you a personal link.",
  },
  "not-paid": {
    title: "We couldn't find a paid course order",
    body: "If you just paid, wait a minute and reload this page. If it still doesn't work, message me on WhatsApp with the email you paid with.",
  },
  unavailable: {
    title: "We couldn't check your payment right now",
    body: "Your payment is safe. Please reload this page in a few minutes, or message me on WhatsApp and I'll unlock the course for you.",
  },
  "no-session": {
    title: "Open this page from your payment",
    body: "After paying for the course, Stripe brings you back here automatically. Already paid? Message me on WhatsApp with the email you paid with.",
  },
};

const ar: typeof en = {
  checking: "بنتأكد من الدفع مع Stripe…",
  whatsapp: "كلمني على واتساب",
  preorder: {
    title: "الدفع وصل",
    body: "الكورس بيفتح يوم 1 يناير 2027، والجهاز ده اتفتح خلاص. الدروس المجانية متاحة دلوقتي.",
  },
  ok: {
    title: "شكرًا! الكورس اتفتح ليك",
    body: "الجهاز ده دلوقتي يقدر يفتح كل الدروس والاختبارات، والدروس والفيديوهات الجديدة هتظهر هنا أول ما تنزل.",
    start: "ادخل على الكورس",
    otherDevice: "عايز تفتحه على موبايل أو لابتوب تاني بعدين؟ ابعتلي على واتساب الإيميل اللي دفعت بيه، وهبعتلك لينك شخصي.",
  },
  "not-paid": {
    title: "مالقيناش طلب مدفوع للكورس",
    body: "لو لسه دافع، استنى دقيقة واعمل تحديث للصفحة. لو لسه مش شغال، ابعتلي على واتساب الإيميل اللي دفعت بيه.",
  },
  unavailable: {
    title: "مقدرناش نتأكد من الدفع دلوقتي",
    body: "فلوسك في أمان. اعمل تحديث للصفحة بعد شوية، أو ابعتلي على واتساب وأنا هفتحلك الكورس.",
  },
  "no-session": {
    title: "افتح الصفحة دي من الدفع",
    body: "بعد ما تدفع الكورس، Stripe بيرجعك هنا لوحده. دفعت خلاص؟ ابعتلي على واتساب الإيميل اللي دفعت بيه.",
  },
};
