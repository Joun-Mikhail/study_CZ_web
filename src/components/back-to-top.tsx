"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "@/i18n/context";

const SHOW_AFTER = 500;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * "Back to top": a quiet round button that fades in once the page has
 * scrolled 500 px, sits above the WhatsApp button, and scrolls smoothly up
 * (instantly with reduced motion).
 */
export function BackToTop() {
  const { locale } = useTranslation();
  // A boolean snapshot, so scrolling only re-renders when it flips.
  const show = useSyncExternalStore(subscribe, () => window.scrollY > SHOW_AFTER, () => false);

  const goTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={goTop}
          aria-label={locale === "ar" ? "ارجع لأول الصفحة" : "Back to top"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-[5.75rem] end-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary shadow-[0_8px_24px_-14px_rgba(26,25,24,0.45)] transition-colors duration-300 hover:border-border-accent hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
