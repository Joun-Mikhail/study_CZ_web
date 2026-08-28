"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { type Locale, getTranslations } from "./translations";

type TranslationContextType = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: ReturnType<typeof getTranslations>;
  toggleLocale: () => void;
  setLocale: (l: Locale) => void;
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((l: Locale) => {
    const body = document.body;
    body.style.opacity = "0";
    body.style.transition = "opacity 150ms ease";
    setTimeout(() => {
      setLocaleState(l);
      document.documentElement.lang = l;
      document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
      requestAnimationFrame(() => {
        body.style.opacity = "1";
      });
    }, 150);
  }, []);

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
