"use client";

import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { CONTACT_EMAIL, WHATSAPP_URL, FACEBOOK_GROUP_URL } from "@/config/contact";
import { PragueSkyline } from "@/components/ui/prague-skyline";

function SocialIcon({ type }: { type: "whatsapp" | "facebook" | "email" }) {
  const paths = {
    whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
    facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    email: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  };

  return (
    <svg viewBox={type === "email" ? "0 0 24 24" : "0 0 24 24"} fill="currentColor" className="w-5 h-5">
      <path d={paths[type]} />
    </svg>
  );
}

/** Decorative glowing dots: position, size and colour (static class strings). */
const FOOTER_DOTS = [
  { className: "top-10 start-[8%] h-2 w-2 bg-gold shadow-[0_0_14px_3px_rgba(245,158,11,0.55)]" },
  { className: "top-24 end-[12%] h-3 w-3 bg-magenta shadow-[0_0_18px_4px_rgba(236,72,153,0.5)]" },
  { className: "top-1/2 start-[46%] h-1.5 w-1.5 bg-electric shadow-[0_0_12px_3px_rgba(59,130,246,0.6)] hidden sm:block" },
  { className: "bottom-24 start-[22%] h-2.5 w-2.5 bg-orchid shadow-[0_0_16px_4px_rgba(139,92,246,0.55)] hidden sm:block" },
  { className: "bottom-16 end-[30%] h-2 w-2 bg-jade shadow-[0_0_14px_3px_rgba(16,185,129,0.5)] hidden md:block" },
  { className: "top-1/3 end-[4%] h-1.5 w-1.5 bg-coral shadow-[0_0_12px_3px_rgba(249,115,22,0.55)] hidden md:block" },
];

/** Social buttons fill with each brand's own colour on hover or focus. */
const SOCIAL_BASE =
  "w-11 h-11 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center text-text-muted transition-[color,background-color,border-color,box-shadow,transform] duration-300 hover:text-white focus-visible:text-white motion-safe:hover:-translate-y-1";

export function Footer() {
  const { t, locale } = useTranslation();

  return (
    <footer className="surface-ink footer-vivid relative isolate mt-24 overflow-hidden">
      {/* A gradient seam along the top edge. */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orchid to-transparent" />
      {/* Drifting dots of colour (fewer on phones). */}
      {FOOTER_DOTS.map((dot, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`animate-float pointer-events-none absolute -z-10 rounded-full ${dot.className}`}
          style={{ animationDelay: `${-i * 1.3}s`, animationDuration: `${6 + (i % 3) * 2}s` }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block text-xl font-extrabold tracking-tight text-text-primary mb-3">
              <span className="text-white">Study</span> <span className="text-[#f2545b]">Czechia</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-5">{t.footer.tagline}</p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${SOCIAL_BASE} hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-[0_10px_24px_-8px_rgba(37,211,102,0.7)] focus-visible:bg-[#25D366]`}
                aria-label="WhatsApp"
              >
                <SocialIcon type="whatsapp" />
              </a>
              <a
                href={FACEBOOK_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${SOCIAL_BASE} hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_10px_24px_-8px_rgba(24,119,242,0.75)] focus-visible:bg-[#1877F2]`}
                aria-label="Facebook"
              >
                <SocialIcon type="facebook" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={`${SOCIAL_BASE} hover:bg-gradient-to-br hover:from-orchid hover:to-magenta hover:border-transparent hover:shadow-[0_10px_24px_-8px_rgba(236,72,153,0.7)] focus-visible:bg-[#7c3aed]`}
                aria-label="Email"
              >
                <SocialIcon type="email" />
              </a>
            </div>
          </div>

          {/* Explore column */}
          <div>
            <h2 className="font-sans text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-5 h-0.5 rounded-full bg-gradient-to-r rtl:bg-gradient-to-l from-gold to-magenta" />
              {t.footer.exploreLabel}
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/courses" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{t.nav.courses}</Link></li>
              <li><Link href="/universities" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{t.nav.universities}</Link></li>
              <li><Link href="/university-matcher" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{t.nav.matcher}</Link></li>
              <li><Link href="/scholarships" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{t.nav.scholarships}</Link></li>
              <li><Link href="/preparatory-year" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{t.nav.prep}</Link></li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h2 className="font-sans text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-5 h-0.5 rounded-full bg-gradient-to-r rtl:bg-gradient-to-l from-gold to-magenta" />
              {t.footer.resourcesLabel}
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/why-czechia" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{locale === "ar" ? "ليه التشيك" : "Why Czechia"}</Link></li>
              <li><Link href="/cost-of-living" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{t.nav.costOfLiving}</Link></li>
              <li><Link href="/application-guide" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{t.nav.guide}</Link></li>
              <li><Link href="/recognition" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{locale === "ar" ? "معادلة الشهادة" : "Degree Recognition"}</Link></li>
              <li><Link href="/qa" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{t.nav.qa}</Link></li>
              <li><Link href="/services" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{t.nav.services}</Link></li>
              <li><Link href="/for-parents" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{locale === "ar" ? "لأولياء الأمور" : "For Parents"}</Link></li>
              <li><Link href="/eligibility" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{locale === "ar" ? "أقدر أقدم؟" : "Eligibility Check"}</Link></li>
              <li><Link href="/verify" className="text-text-secondary hover:text-[#fcd34d] transition-colors">{locale === "ar" ? "التحقق من شهادة" : "Verify Certificate"}</Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h2 className="font-sans text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-5 h-0.5 rounded-full bg-gradient-to-r rtl:bg-gradient-to-l from-gold to-magenta" />
              {t.footer.connectLabel}
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-text-secondary hover:text-[#fcd34d] transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-[#fcd34d] transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={FACEBOOK_GROUP_URL} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-[#fcd34d] transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-[#fcd34d] transition-colors">
                  {t.footer.contactLink}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Prague skyline decoration */}
        <div className="relative h-[60px] sm:h-[80px] -mx-4 sm:-mx-6 lg:-mx-8 mb-6 opacity-30">
          <PragueSkyline className="w-full h-full" />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-subtle pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted" suppressHydrationWarning>
            © {new Date().getFullYear()} Study Czechia. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/about" className="text-text-muted hover:text-[#fcd34d] transition-colors">
              {locale === "ar" ? "عن المنصة" : "About"}
            </Link>
            <span className="text-border-subtle">·</span>
            <Link href="/terms" className="text-text-muted hover:text-[#fcd34d] transition-colors">
              {locale === "ar" ? "الشروط" : "Terms"}
            </Link>
            <span className="text-border-subtle">·</span>
            <Link href="/privacy" className="text-text-muted hover:text-[#fcd34d] transition-colors">
              {locale === "ar" ? "الخصوصية" : "Privacy"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
