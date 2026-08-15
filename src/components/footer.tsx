"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/context";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border-subtle mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <p className="text-sm text-text-secondary mb-1">{t.footer.tagline}</p>
        <p className="text-xs text-text-muted mb-4">{t.footer.rights}</p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg bg-amber text-black font-medium hover:bg-amber-hover"
          >
            Contact us
          </Link>

          <a
            href="mailto:hello@study-in-czechia.example"
            className="px-4 py-2 rounded-lg border border-border-subtle text-text-secondary hover:text-text-primary"
          >
            Email
          </a>

          <a
            href="https://wa.me/201234567890"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg border border-border-subtle text-text-secondary hover:text-text-primary"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
