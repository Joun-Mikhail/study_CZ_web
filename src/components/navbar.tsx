"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/components/locale-link";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { pathForLocale, stripLocale } from "@/i18n/paths";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

type DropdownGroup = {
  label: string;
  items: { href: string; label: string }[];
};

function DesktopDropdown({
  label,
  items,
  open,
  onToggle,
  onNavigate,
  currentPath,
}: {
  label: string;
  items: { href: string; label: string }[];
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  currentPath: string;
}) {
  const hasActiveItem = items.some((item) => currentPath === item.href);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`flex items-center gap-1 whitespace-nowrap transition-colors py-1 ${
          hasActiveItem
            ? "text-amber font-medium"
            : "text-text-secondary hover:text-text-primary"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full start-0 mt-3 min-w-[240px] rounded-xl border border-border-subtle bg-surface shadow-[0_18px_40px_-18px_rgba(11,31,58,0.35)] py-2 z-50"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.15 }}
              >
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={`block px-4 py-2.5 text-sm transition-all whitespace-nowrap ${
                    currentPath === item.href
                      ? "text-amber bg-amber/5 font-medium"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchOverlay({ onClose, locale }: { onClose: () => void; locale: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[60] bg-[#0b1f3a]/55 flex items-start justify-center pt-24"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg mx-4"
      >
        <form action="/search" method="get" role="search">
          <div className="relative group">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-amber transition-colors" />
            <input
              ref={inputRef}
              name="q"
              placeholder={locale === "ar" ? "ابحث عن الجامعات، الأدلة، الخدمات..." : "Search universities, guides, services..."}
              className="w-full ps-12 pe-4 py-4 rounded-2xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:border-amber focus:shadow-[0_0_0_4px_rgba(17,69,126,0.12)] transition-all"
              autoComplete="off"
            />
          </div>
          <div className="flex items-center justify-center gap-3 mt-3">
            <kbd className="px-2 py-0.5 rounded-md bg-surface border border-border-subtle text-[10px] text-text-muted font-mono">ESC</kbd>
            <span className="text-xs text-text-muted">
              {locale === "ar" ? "للإغلاق" : "to close"}
            </span>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/** Shown at the top of the mobile menu, so not repeated in its groups. */
const MOBILE_TOP = new Set(["/courses", "/services", "/university-matcher", "/eligibility"]);

export function Navbar() {
  const { t, locale, setLocale } = useTranslation();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openDropdown) return;
    function handleOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    const id = setTimeout(() => {
      document.addEventListener("click", handleOutside);
    }, 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("click", handleOutside);
    };
  }, [openDropdown]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close menus after navigation
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const dropdowns: Record<string, DropdownGroup> = {
    uni: {
      label: locale === "ar" ? "الجامعات" : "Universities",
      items: [
        { href: "/universities", label: t.nav.universities },
        { href: "/programmes", label: locale === "ar" ? "استكشف البرامج" : "Browse Programmes" },
        { href: "/university-matcher", label: t.nav.matcher },
        { href: "/preparatory-year", label: t.nav.prep },
        { href: "/scholarships", label: t.nav.scholarships },
      ],
    },
    tools: {
      label: locale === "ar" ? "أدوات" : "Tools",
      items: [
        { href: "/cost-of-living", label: t.nav.costOfLiving },
        { href: "/eligibility", label: locale === "ar" ? "أقدر أقدم؟" : "Eligibility Check" },
        { href: "/deadlines", label: locale === "ar" ? "مواعيد التقديم" : "Deadline Tracker" },
        { href: "/my-journey", label: locale === "ar" ? "رحلتي" : "My Journey" },
      ],
    },
    guides: {
      label: locale === "ar" ? "أدلة" : "Guides",
      items: [
        { href: "/application-guide", label: t.nav.guide },
        { href: "/qa", label: t.nav.qa },
        { href: "/what-it-costs", label: locale === "ar" ? "التكاليف الحقيقية" : "What It Actually Costs" },
        { href: "/questions-to-ask", label: locale === "ar" ? "أسئلة قبل ما تدفع" : "Questions to Ask Any Agency" },
      ],
    },
  };

  const otherLocale = locale === "en" ? "ar" : "en";
  const switchHref = pathForLocale(pathname || "/", otherLocale);
  const toggleLang = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLocale(otherLocale);
  };

  const handleNavigate = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  const normalize = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);
  const isActive = (href: string) => normalize(stripLocale(pathname || "/")) === normalize(href);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={`fixed top-0 inset-x-0 z-50 border-b border-border-subtle bg-midnight transition-shadow duration-200 ${
          scrolled ? "shadow-[0_10px_30px_-22px_rgba(11,31,58,0.45)]" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleNavigate}
            className="font-sans text-[22px] font-extrabold tracking-tight text-text-primary shrink-0 hover:opacity-90 transition-opacity"
          >
            <span className="text-[#11457e] dark:text-[#9cc3f5]">Study</span> <span className="text-[#d42127] dark:text-[#f2545b]">Czechia</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7 ms-10 text-[15px] font-medium">
            {Object.entries(dropdowns).map(([key, group]) => (
              <DesktopDropdown
                key={key}
                label={group.label}
                items={group.items}
                open={openDropdown === key}
                onToggle={() => setOpenDropdown(openDropdown === key ? null : key)}
                onNavigate={handleNavigate}
                currentPath={pathname}
              />
            ))}
            <Link
              href="/courses"
              onClick={handleNavigate}
              className={`whitespace-nowrap transition-colors py-1 ${
                isActive("/courses")
                  ? "text-amber font-medium"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {locale === "ar" ? "الكورس" : "The Course"}
            </Link>
            <Link
              href="/services"
              onClick={handleNavigate}
              className={`whitespace-nowrap transition-colors py-1 ${
                isActive("/services")
                  ? "text-amber font-medium"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {t.nav.services}
            </Link>
          </div>

          <div className="flex-1" />

          {/* Utility cluster */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={locale === "ar" ? "بحث" : "Search"}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <ThemeToggle />

            <NextLink
              href={switchHref}
              onClick={toggleLang}
              hrefLang={otherLocale}
              aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
              className="flex items-center justify-center min-w-10 h-10 px-2 rounded-lg text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              {locale === "en" ? "ع" : "EN"}
            </NextLink>

            <Link
              href="/eligibility"
              onClick={handleNavigate}
              className="hidden md:inline-flex items-center h-10 px-4 ms-2 rounded-lg bg-amber text-midnight text-sm font-semibold hover:bg-amber-hover transition-colors"
            >
              {locale === "ar" ? "أقدر أقدم؟" : "Check eligibility"}
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-text-primary hover:bg-surface-hover transition-colors border border-border-subtle ms-1"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-border-subtle bg-midnight shadow-[0_20px_30px_-20px_rgba(11,31,58,0.4)]"
            >
              <div className="px-4 py-4 max-h-[calc(100dvh-4rem)] overflow-y-auto">
                {/* Mobile search */}
                <form action="/search" method="get" role="search" className="mb-4">
                  <div className="relative group">
                    <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-amber transition-colors" />
                    <input
                      name="q"
                      placeholder={locale === "ar" ? "ابحث..." : "Search..."}
                      className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-transparent border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber focus:shadow-[0_0_0_4px_rgba(17,69,126,0.12)] transition-all"
                    />
                  </div>
                </form>
                {/* Most-used first: Course, Services, Matcher, Eligibility */}
                <div className="mb-3 pb-3 border-b border-border-subtle">
                  {[
                    { href: "/courses", label: locale === "ar" ? "الكورس" : "The Course" },
                    { href: "/services", label: t.nav.services },
                    { href: "/university-matcher", label: t.nav.matcher },
                    { href: "/eligibility", label: locale === "ar" ? "أقدر أقدم؟" : "Eligibility Check" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleNavigate}
                      className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.href) ? "text-amber bg-amber/5" : "text-text-primary hover:bg-surface-hover"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>


                {/* Grouped nav items */}
                {Object.entries(dropdowns).map(([key, group]) => (
                  <div key={key} className="mb-3">
                    <p className="px-3 py-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                      {group.label}
                    </p>
                    {group.items.filter((item) => !MOBILE_TOP.has(item.href)).map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleNavigate}
                        className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          isActive(item.href)
                            ? "text-amber bg-amber/5 font-medium"
                            : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <SearchOverlay onClose={() => setSearchOpen(false)} locale={locale} />
        )}
      </AnimatePresence>
    </>
  );
}
