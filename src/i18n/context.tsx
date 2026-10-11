"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { type Locale, getTranslations } from "./translations";
import { hasArabicVersion, localeFromPath, pathForLocale } from "./paths";

type TranslationContextType = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: ReturnType<typeof getTranslations>;
  toggleLocale: () => void;
  setLocale: (l: Locale) => void;
};

const TranslationContext = createContext<TranslationContextType | null>(null);

const STORAGE_KEY = "locale";

/**
 * The language comes from the URL: /ar/... is Arabic, everything else is
 * English. Each language has its own pre-rendered page, so search engines and
 * shared links see the right language without running JavaScript.
 */
export function TranslationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const locale = localeFromPath(pathname);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  // A student who chose Arabic before lands on Arabic pages from then on.
  useEffect(() => {
    if (locale !== "en" || !hasArabicVersion(pathname)) return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (saved === "ar") {
      router.replace(pathForLocale(pathname, "ar") + window.location.search + window.location.hash);
    }
    // Only on first load of a page, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const setLocale = useCallback(
    (l: Locale) => {
      try {
        localStorage.setItem(STORAGE_KEY, l);
      } catch {}
      if (l === locale) return;
      router.push(pathForLocale(window.location.pathname, l) + window.location.search + window.location.hash);
    },
    [locale, router]
  );

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "ar" : "en");
  }, [setLocale, locale]);

  const dir = locale === "ar" ? "rtl" : "ltr";
  const t = getTranslations(locale);

  return (
    <TranslationContext.Provider value={{ locale, dir, t, toggleLocale, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(TranslationContext);
  if (!ctx)
    throw new Error("useTranslation must be used within TranslationProvider");
  return ctx;
}
