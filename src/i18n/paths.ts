import type { Locale } from "./translations";

/** Paths that have no Arabic twin (admin tools). */
const NO_ARABIC_PREFIXES = ["/admin"];

export function localeFromPath(pathname: string | null | undefined): Locale {
  if (!pathname) return "en";
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

/** "/ar/services/" -> "/services/", "/ar" -> "/" */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/ar(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

export function hasArabicVersion(pathname: string): boolean {
  const en = stripLocale(pathname);
  return !NO_ARABIC_PREFIXES.some((p) => en === p || en.startsWith(`${p}/`));
}

/** The same page in the other language. */
export function pathForLocale(pathname: string, locale: Locale): string {
  const en = stripLocale(pathname);
  if (locale === "en" || !hasArabicVersion(en)) return en;
  return en === "/" ? "/ar/" : `/ar${en}`;
}

const FILE_EXTENSION = /\.[a-z0-9]{2,5}($|[?#])/i;

/** Prefix an internal link with /ar when the current page is Arabic. */
export function localizeHref(href: string, locale: Locale): string {
  if (locale !== "ar") return href;
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (localeFromPath(href) === "ar") return href;
  if (FILE_EXTENSION.test(href)) return href;
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const rest = cut === -1 ? "" : href.slice(cut);
  if (!hasArabicVersion(path)) return href;
  return pathForLocale(path, "ar") + rest;
}
