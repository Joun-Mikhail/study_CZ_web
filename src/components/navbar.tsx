"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "@/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      <div
        className={`absolute top-full start-0 mt-2 min-w-[220px] rounded-xl border border-border-subtle bg-midnight/95 backdrop-blur-xl shadow-xl py-1.5 z-50 transition-all duration-150 ${
          open
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-1 invisible pointer-events-none"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`block px-4 py-2.5 text-sm transition-colors whitespace-nowrap ${
              currentPath === item.href
                ? "text-amber bg-amber/5 font-medium"
                : "text-text-secondary hover:text-text-primary hover:bg-white/5"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
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
      className="fixed inset-0 z-[60] bg-midnight/80 backdrop-blur-sm flex items-start justify-center pt-24"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-lg mx-4"
      >
        <form action="/search" method="get" role="search">
          <div className="relative">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              ref={inputRef}
              name="q"
              placeholder={locale === "ar" ? "ابحث عن الجامعات، الأدلة، الخدمات..." : "Search universities, guides, services..."}
              className="w-full ps-12 pe-4 py-4 rounded-2xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:border-amber/50 transition-colors"
              autoComplete="off"
            />
          </div>
          <p className="text-xs text-text-muted mt-2 text-center">
            {locale === "ar" ? "اضغط Esc للإغلاق" : "Press Esc to close"}
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}

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

  // Close dropdown when clicking outside the nav
  useEffect(() => {
    if (!openDropdown) return;
    function handleOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    // Use setTimeout so the opening click finishes before we start listening
    const id = setTimeout(() => {
      document.addEventListener("click", handleOutside);
    }, 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("click", handleOutside);
    };
  }, [openDropdown]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const dropdowns: Record<string, DropdownGroup> = {
    uni: {
      label: locale === "ar" ? "الجامعات" : "Universities",
      items: [
        { href: "/universities", label: t.nav.universities },
        { href: "/university-matcher", label: t.nav.matcher },
        { href: "/preparatory-year", label: t.nav.prep },
        { href: "/scholarships", label: t.nav.scholarships },
      ],
    },
    tools: {
      label: locale === "ar" ? "أدوات" : "Tools",
      items: [
        { href: "/cost-of-living", label: t.nav.costOfLiving },
        { href: "/eligibility", label: locale === "ar" ? "تقييم الأهلية" : "Eligibility Check" },
        { href: "/deadlines", label: locale === "ar" ? "مواعيد التقديم" : "Deadline Tracker" },
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

  const toggleLang = () => setLocale(locale === "en" ? "ar" : "en");

  const handleNavigate = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-border-subtle bg-midnight/95 backdrop-blur-xl shadow-lg"
            : "border-transparent bg-midnight/70 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleNavigate}
            className="text-2xl font-extrabold tracking-tight text-text-primary shrink-0 min-w-[160px] hover:opacity-90 transition-opacity"
          >
            Study <span className="text-[#d42127]">Czechia</span>
          </Link>

          {/* Desktop nav — visible at lg+ */}
          <div className="hidden lg:flex items-center gap-6 ms-10 text-sm">
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

          {/* Spacer */}
          <div className="flex-1" />

          {/* Utility cluster */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={locale === "ar" ? "بحث" : "Search"}
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <ThemeToggle />

            <button
              onClick={toggleLang}
              aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors border border-border-subtle"
            >
              {locale === "en" ? "ع" : "EN"}
            </button>

            {/* Hamburger — visible below lg */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors border border-border-subtle ms-1"
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
              className="lg:hidden overflow-hidden border-t border-border-subtle bg-midnight/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 max-h-[calc(100dvh-4rem)] overflow-y-auto">
                {/* Mobile search */}
                <form action="/search" method="get" role="search" className="mb-4">
                  <div className="relative">
                    <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      name="q"
                      placeholder={locale === "ar" ? "ابحث..." : "Search..."}
                      className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-transparent border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber/50 transition-colors"
                    />
                  </div>
                </form>

                {/* Grouped nav items */}
                {Object.entries(dropdowns).map(([key, group]) => (
                  <div key={key} className="mb-3">
                    <p className="px-3 py-1.5 text-xs font-semibold text-amber uppercase tracking-wider">
                      {group.label}
                    </p>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleNavigate}
                        className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          isActive(item.href)
                            ? "text-amber bg-amber/5 font-medium"
                            : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}

                {/* Direct links */}
                <div className="border-t border-border-subtle pt-3 mt-1">
                  <Link
                    href="/courses"
                    onClick={handleNavigate}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive("/courses")
                        ? "text-amber bg-amber/5"
                        : "text-text-primary hover:bg-white/5"
                    }`}
                  >
                    {locale === "ar" ? "الكورس" : "The Course"}
                  </Link>
                  <Link
                    href="/services"
                    onClick={handleNavigate}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive("/services")
                        ? "text-amber bg-amber/5"
                        : "text-amber hover:bg-white/5"
                    }`}
                  >
                    {t.nav.services}
                  </Link>
                </div>
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
