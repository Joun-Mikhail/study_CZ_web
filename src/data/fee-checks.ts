/**
 * Record of fee-source checks, kept apart from programmes.ts so a check never
 * rewrites a programme's own data or verification date.
 *
 * "verified" means the cited source states this programme's exact amount, in
 * this currency, for the stated academic year. Anything less is "pending"
 * (a relevant source that does not yet show the exact fee) or "unverified"
 * (the source no longer leads to fee information). Programmes on a directory
 * or broken source are classified in src/lib/fee-source.ts and need no entry.
 */
export type FeeCheck = {
  status: "verified" | "pending" | "unverified";
  checkedOn: string;
  sourceUrl: string;
  /** Required for "verified": what the source states. */
  amount?: number;
  currency?: "EUR" | "CZK";
  academicYear?: string;
  note: string;
};

const LF1 = "https://en.lf1.cuni.cz/the-tuition-fee-for-the-academic-year-20252026";
const PLZEN = "https://lfp.cuni.cz/wp-content/uploads/2026/03/OD_3_2026_poplatky_en.pdf";
const HK = "https://www.lfhk.cuni.cz/LFHKEN-182.html";
const MUNI_FEES = "https://www.muni.cz/en/about-us/official-notice-board/study-related-fees";
const CZU = "https://www.pef.czu.cz/en/r-9409-study/r-9675-study-programmes";
const AAU = "https://aauni.edu/admissions";
const D = "2026-10-25";

export const FEE_CHECKS: Record<string, FeeCheck> = {
  "cuni-md-general-medicine": { status: "verified", checkedOn: D, sourceUrl: LF1, amount: 24250, currency: "EUR", academicYear: "2026/2027", note: "Page states 24 250 € (EUR) for General Medicine in English, first-year students, academic year 2026/2027." },
  "cuni-md-dentistry": { status: "verified", checkedOn: D, sourceUrl: LF1, amount: 24250, currency: "EUR", academicYear: "2026/2027", note: "Page states 24 250 € (EUR) for Dentistry in English, first-year students, academic year 2026/2027." },

  "uvb-msc-vet-medicine": { status: "verified", checkedOn: "2026-10-27", sourceUrl: "https://fvl.vetuni.cz/newsletter/fees-for-the-veterinary-medicine-programme-taught-in-english", amount: 7900, currency: "EUR", academicYear: "2026/2027", note: "Faculty page states EUR 7,900 a year for Veterinary Medicine in English, new students in academic year 2026/2027 (four instalments of EUR 1,975). Read in a browser; vetuni.cz blocks automated fetches." },

  "cuni-lf2-md-general-medicine": { status: "pending", checkedOn: D, sourceUrl: "https://www.lf2.cuni.cz/en/applicants/fees-and-funding", note: "Fee page for 2026/2027, but the amount does not appear on it (rendered page checked)." },
  "cuni-plzen-md-general-medicine": { status: "pending", checkedOn: D, sourceUrl: PLZEN, note: "Dean's Measure 3/2026 states 390 000 CZK; the EUR figure shown on the site is a conversion, not on the source." },
  "cuni-plzen-md-dentistry": { status: "pending", checkedOn: D, sourceUrl: PLZEN, note: "Dean's Measure 3/2026 states 390 000 CZK; the EUR figure shown on the site is a conversion, not on the source." },
  "cuni-hradec-md-general-medicine": { status: "pending", checkedOn: D, sourceUrl: HK, note: "Fee page mentions 2026/2027, but the amount does not appear on it (rendered page checked)." },
  "cuni-hradec-md-dentistry": { status: "pending", checkedOn: D, sourceUrl: HK, note: "Fee page mentions 2026/2027, but the amount does not appear on it (rendered page checked)." },
  "cuni-faf-pharmacy": { status: "pending", checkedOn: D, sourceUrl: "https://www.faf.cuni.cz/en/admission/undergraduate/pharmacy/", note: "States 7900 EUR per year for English-taught study, without an academic year." },
  "cuni-ba-economics": { status: "pending", checkedOn: D, sourceUrl: "https://fsv.cuni.cz/en/admissions", note: "General admissions page; the amount does not appear on it." },
  "muni-md-general-medicine": { status: "pending", checkedOn: D, sourceUrl: MUNI_FEES, note: "Fee notice board mentions 2026/2027, but the amount does not appear on it (rendered page checked)." },
  "muni-md-dentistry": { status: "pending", checkedOn: D, sourceUrl: MUNI_FEES, note: "Fee notice board mentions 2026/2027, but the amount does not appear on it (rendered page checked)." },
  "muni-bsc-international-relations": { status: "pending", checkedOn: D, sourceUrl: "https://www.muni.cz/en/admissions", note: "General admissions page; the amount does not appear on it." },
  "upol-md-general-medicine": { status: "pending", checkedOn: D, sourceUrl: "https://www.lf.upol.cz/en/studyat-our-faculty/general-medicine-mudr/", note: "States EUR 12,500 per year for General Medicine, without an academic year." },
  "osu-md-general-medicine": { status: "pending", checkedOn: D, sourceUrl: "https://lf.osu.eu/28769/tuition-fee", note: "States EUR 12,000 for the academic year 2025/2026, not the current intake." },
  "aauni-ba-international-relations": { status: "pending", checkedOn: D, sourceUrl: AAU, note: "Admissions page; the amount does not appear on it (rendered page checked)." },
  "aauni-ba-business-administration": { status: "pending", checkedOn: D, sourceUrl: AAU, note: "Admissions page; the amount does not appear on it (rendered page checked)." },
  "vse-bsc-econ-data-science": { status: "pending", checkedOn: D, sourceUrl: "https://fis.vse.cz/english/admissions/admissions/bc/", note: "Admissions page; the amount does not appear on it (rendered page checked)." },

  "czu-bsc-economics-management": { status: "unverified", checkedOn: D, sourceUrl: CZU, note: "Source now redirects to an unrelated research-group news page." },
  "czu-msc-economics-management": { status: "unverified", checkedOn: D, sourceUrl: CZU, note: "Source now redirects to an unrelated research-group news page." },
};
