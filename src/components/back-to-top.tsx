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
 * "Back to top": appears once the page has scrolled 500 px, sits above the
 * WhatsApp button, and scrolls smoothly up (instantly with reduced motion).
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
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          className="btn-vivid fixed bottom-[5.75rem] end-6 z-40 flex h-12 w-12 items-center justify-center rounded-full shadow-[0_12px_30px_-10px_rgba(124,58,237,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
