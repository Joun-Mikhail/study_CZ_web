"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { CONTACT_EMAIL, WHATSAPP_URL, FACEBOOK_GROUP_URL } from "@/config/contact";

export function Footer() {
  const { t, locale } = useTranslation();

  return (
    <footer className="border-t border-border-subtle mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <Link href="/" className="text-lg font-bold tracking-tight text-text-primary">
              study<span className="text-[#d42127]">.</span><span className="text-[#d42127]">czechia</span>
            </Link>
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">{t.footer.tagline}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">{t.footer.exploreLabel}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses" className="text-text-secondary hover:text-text-primary transition-colors">{t.nav.courses}</Link></li>
              <li><Link href="/universities" className="text-text-secondary hover:text-text-primary transition-colors">{t.nav.universities}</Link></li>
              <li><Link href="/university-matcher" className="text-text-secondary hover:text-text-primary transition-colors">{t.nav.matcher}</Link></li>
              <li><Link href="/scholarships" className="text-text-secondary hover:text-text-primary transition-colors">{t.nav.scholarships}</Link></li>
              <li><Link href="/preparatory-year" className="text-text-secondary hover:text-text-primary transition-colors">{t.nav.prep}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">{t.footer.resourcesLabel}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cost-of-living" className="text-text-secondary hover:text-text-primary transition-colors">{t.nav.costOfLiving}</Link></li>
              <li><Link href="/application-guide" className="text-text-secondary hover:text-text-primary transition-colors">{t.nav.guide}</Link></li>
              <li><Link href="/qa" className="text-text-secondary hover:text-text-primary transition-colors">{t.nav.qa}</Link></li>
              <li><Link href="/services" className="text-text-secondary hover:text-text-primary transition-colors">{t.nav.services}</Link></li>
              <li><Link href="/eligibility" className="text-text-secondary hover:text-text-primary transition-colors">{locale === "ar" ? "تقييم الأهلية" : "Eligibility Check"}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">{t.footer.connectLabel}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-text-secondary hover:text-text-primary transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={FACEBOOK_GROUP_URL} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-text-primary transition-colors">
                  {t.footer.contactLink}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-subtle pt-6 text-center">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} study.czechia — {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
