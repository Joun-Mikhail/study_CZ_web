const AR_MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "8 November 2026" / "8 نوفمبر 2026", with Western digits on both. */
export function fmtDate(iso: string, locale: "en" | "ar"): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${(locale === "ar" ? AR_MONTHS : EN_MONTHS)[m - 1]} ${y}`;
}

/**
 * Wrap a left-to-right fragment ("1,704 CZK", "15.21 CZK (-10 % pro vás)") in
 * Unicode directional isolates so it keeps its order inside an Arabic
 * sentence. Invisible, and harmless in English.
 */
export const iso = (s: string) => `⁦${s}⁩`;
