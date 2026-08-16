"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Globe, Menu, X, Search } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

export function Navbar() {
  const { t, toggleLocale, locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/courses", label: t.nav.courses },
    { href: "/cost-of-living", label: t.nav.costOfLiving },
    { href: "/university-matcher", label: t.nav.matcher },
    { href: "/universities", label: t.nav.universities },
    { href: "/qa", label: t.nav.qa },
    { href: "/scholarships", label: t.nav.scholarships },
    { href: "/preparatory-year", label: t.nav.prep },
    { href: "/application-guide", label: t.nav.guide },
    { href: "/services", label: t.nav.services },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border-subtle bg-midnight/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-text-primary">
          study<span className="text-[#d42127]">.</span><span className="text-[#d42127]">czechia</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-sm text-text-secondary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-text-primary transition-colors">
              {link.label}
            </Link>
          ))}
          <form action="/search" method="get" className="ml-2 flex items-center gap-2">
            <input
              name="q"
              placeholder="Search universities"
              className="px-3 py-1.5 rounded-lg bg-transparent border border-border-subtle text-sm text-text-secondary placeholder:text-text-muted focus:outline-none"
            />
            <button className="px-2 py-1 rounded-lg bg-amber hover:bg-amber-hover text-white text-sm">Search</button>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-text-secondary" />
            <label className="sr-only">Language</label>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg text-sm bg-transparent border border-border-subtle text-text-secondary"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors border border-border-subtle"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-border-subtle bg-midnight/95"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              <form action="/search" method="get" className="flex items-center gap-2 mb-3 px-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    name="q"
                    placeholder={locale === "ar" ? "ابحث عن الجامعات..." : "Search universities..."}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-transparent border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-[#d42127]/50 transition-colors"
                  />
                </div>
                <button className="px-4 py-2.5 rounded-xl bg-amber hover:bg-amber-hover text-white text-sm font-medium transition-colors shrink-0">
                  {locale === "ar" ? "بحث" : "Search"}
                </button>
              </form>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
