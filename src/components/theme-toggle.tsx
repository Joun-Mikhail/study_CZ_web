"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTranslation } from "@/i18n/context";

/** Light is the default; dark is remembered once chosen. */
export default function ThemeToggle() {
  const { locale } = useTranslation();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem("theme");
    } catch {
      /* storage blocked */
    }
    const initial = saved === "dark" ? "dark" : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only state after mount so the static HTML hydrates cleanly
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  }

  const label =
    theme === "dark"
      ? locale === "ar" ? "الوضع الفاتح" : "Switch to light mode"
      : locale === "ar" ? "الوضع الداكن" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
    >
      {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  );
}
