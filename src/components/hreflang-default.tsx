"use client";

import { usePathname } from "next/navigation";
import { hasArabicVersion, localeFromPath, pathForLocale, stripLocale } from "@/i18n/paths";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

// Pages that are noindexed / not part of the public site get no alternates.
const SKIP_PREFIXES = ["/courses/learn", "/admin", "/404", "/_not-found", "/search", "/programmes/compare"];

function withSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * Every public page exists in English (/x/) and Arabic (/ar/x/). This links
 * the two for search engines (hreflang) and gives English pages an og:url
 * (Arabic pages get theirs from their own metadata).
 */
export function HreflangDefault() {
  const pathname = usePathname();
  if (!pathname) return null;
  const enPath = withSlash(stripLocale(pathname));
  if (SKIP_PREFIXES.some((p) => enPath.startsWith(p))) return null;

  const en = `${SITE_URL}${enPath}`;
  const ar = hasArabicVersion(enPath) ? `${SITE_URL}${withSlash(pathForLocale(enPath, "ar"))}` : null;
  const isEnglishPage = localeFromPath(pathname) === "en";

  return (
    <>
      <link rel="alternate" hrefLang="en" href={en} />
      {ar && <link rel="alternate" hrefLang="ar" href={ar} />}
      <link rel="alternate" hrefLang="x-default" href={en} />
      {isEnglishPage && <meta property="og:url" content={en} />}
    </>
  );
}
