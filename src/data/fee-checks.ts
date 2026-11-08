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

  // Re-sourced on 2026-11-02 after the old programme links returned 404.
  "muni-msc-health-economics": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.muni.cz/en/bachelors-and-masters-study-programmes/26832-applied-health-economics", note: "Programme page states 120,000 CZK per academic year, without an academic year; charged in CZK." },
  "muni-msc-ai-data": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.muni.cz/en/bachelors-and-masters-study-programmes/27699-artificial-intelligence-and-data-processing", note: "Programme page states €4,500 per academic year, without an academic year." },
  "muni-msc-biochem-cellular": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.muni.cz/en/bachelors-and-masters-study-programmes/27001-biochemical-and-cellular-technologies", note: "Programme page states €3,200 per academic year (was listed as €3,000), without an academic year." },
  "vsb-bsc-it": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.vsb.cz/en/study/degree-students/degree-studies/bachelor-degree/bachelor-degree-detail/?programmeId=771", note: "Programme page states 50,000 CZK per semester; VSB's tuition page says this applies from 2026/2027 (approx. EUR 4,000 a year). Charged in CZK." },
  "vsb-msc-advanced-eng-materials": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.vsb.cz/en/study/degree-students/degree-studies/master-degree/master-degree-detail/?programmeId=849", note: "Programme page states 50,000 CZK per semester; VSB's tuition page says this applies from 2026/2027 (approx. EUR 4,000 a year). Charged in CZK." },
  "vsb-bsc-applied-geology": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.vsb.cz/en/study/degree-students/degree-studies/bachelor-degree/bachelor-degree-detail/?programmeId=1126", note: "Programme page states 50,000 CZK per semester; VSB's tuition page says this applies from 2026/2027 (approx. EUR 4,000 a year). Charged in CZK." },
  // VŠE and BUT re-sourced on 2026-11-02 after the old admission pages returned 404.
  "vse-bba-intl-business": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://admissions.vse.cz/admission-procedure/", note: "States 6,000 EUR/academic year for bachelor programmes, with footnotes: 5,000 EUR for students admitted before 2027/2028, 3,800 EUR before 2023/2024. Applications for 2027/28 open 1 Nov 2026. Another section of the same page still says 5,000 EUR." },
  "vse-msc-intl-business": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://admissions.vse.cz/admission-procedure/", note: "States 6,000 EUR/academic year for master programmes, with footnotes: 5,000 EUR for students admitted before 2027/2028, 3,800 EUR before 2023/2024. Another section of the same page still says 5,000 EUR." },
  "vse-msc-finance-accounting": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://admissions.vse.cz/admission-procedure/", note: "States 6,000 EUR/academic year for master programmes, with footnotes: 5,000 EUR for students admitted before 2027/2028, 3,800 EUR before 2023/2024. Another section of the same page still says 5,000 EUR." },
  "but-msc-information-technology": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.vut.cz/en/study-options/degree-studies-en/study-programmes/programme/10337", note: "Programme page for academic year 2027/2028 states 3000 EUR/academic year for EU and non-EU students; 2027/2028 is not yet an applicable year." },
  "but-bsc-civil-engineering": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.vut.cz/en/study-options/degree-studies-en/study-programmes/programme/10052", note: "Programme page confirms a Bachelor's taught in English (2027/2028) but states no tuition fee; BUT's English-studies page says only that studies in English are paid." },
  // ZČU re-sourced on 2026-11-02 after the old study-programmes page stopped resolving.
  "zcu-msc-materials-electrical": { status: "verified", checkedOn: "2026-11-02", sourceUrl: "https://www.fel.zcu.cz/en/Admission/Master-studies/applying-to-fel.html", amount: 4000, currency: "EUR", academicYear: "2026/2027", note: "Faculty of Electrical Engineering page states: the tuition fee for studying in English in the academic year 2026/27 is 4000 EUR per year. The programme is on the faculty's list of Master programmes in English." },
  "zcu-bsc-mgmt-digital-tech": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.fek.zcu.cz/en/obory.php?id=40", note: "Programme page confirms the English Bachelor's (4 years, with OTH Amberg-Weiden) but states no tuition fee." },
  // UNYP re-sourced on 2026-11-02 after unyp.cz/programs/ returned 404.
  "unyp-bsc-business-admin": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.unyp.cz/tuition-fees/", note: "Tuition overview 2026-2027: international (non-EU/EFTA) students 299,000 CZK (12,369 EUR) a year for European and 311,000 CZK (12,863 EUR) for American bachelor programmes; EU/EFTA 258,500 CZK (10,692 EUR). Charged in CZK; tuition depends on credits taken." },
  "unyp-bsc-communication-media": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.unyp.cz/tuition-fees/", note: "Tuition overview 2026-2027: international (non-EU/EFTA) students 299,000 CZK (12,369 EUR) a year for European and 311,000 CZK (12,863 EUR) for American bachelor programmes; EU/EFTA 258,500 CZK (10,692 EUR). Charged in CZK; tuition depends on credits taken." },
  "unyp-bsc-intl-relations": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.unyp.cz/tuition-fees/", note: "Tuition overview 2026-2027: international (non-EU/EFTA) students 299,000 CZK (12,369 EUR) a year for European and 311,000 CZK (12,863 EUR) for American bachelor programmes; EU/EFTA 258,500 CZK (10,692 EUR). Charged in CZK; tuition depends on credits taken." },
  "unyp-bsc-psychology": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.unyp.cz/tuition-fees/", note: "Tuition overview 2026-2027: international (non-EU/EFTA) students 299,000 CZK (12,369 EUR) a year for European and 311,000 CZK (12,863 EUR) for American bachelor programmes; EU/EFTA 258,500 CZK (10,692 EUR). Charged in CZK; tuition depends on credits taken." },
  "unyp-msc-psychology": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://www.unyp.cz/tuition-fees/", note: "Tuition overview 2026-2027 states 410,000 CZK (16,961 EUR) for the full duration of the Master's in Psychology, which the programme page gives as 2 years. Charged in CZK." },
  // MENDELU re-sourced on 2026-11-02 after mendelu.cz/en/study/ returned 404.
  "mendelu-bsc-economics-mgmt": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://pef.mendelu.cz/en/faculty-of-business-and-economics/student/tuition-fees/", note: "Faculty of Business and Economics fee table lists Economics and Management (bachelor, 3 years) at 80 000 CZK / approximately 3 200 EUR per academic year, without an academic year. Charged in CZK." },
  "mendelu-msc-economics-mgmt": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://pef.mendelu.cz/en/faculty-of-business-and-economics/student/tuition-fees/", note: "Faculty of Business and Economics fee table lists Economics and Management (master, 2 years) at 80 000 CZK / approximately 3 200 EUR per academic year, without an academic year. Charged in CZK." },
  "mendelu-msc-open-informatics": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://pef.mendelu.cz/en/faculty-of-business-and-economics/student/tuition-fees/", note: "Faculty of Business and Economics fee table lists Open Informatics (master, 2 years) at 80 000 CZK / approximately 3 200 EUR per academic year, without an academic year. Charged in CZK." },
  "mendelu-msc-european-forestry": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://ldf.mendelu.cz/en/admission-eufor/", note: "Admission page states Price per academic year 65 000 CZK / approximately 2 700 EUR (master, 2 years), for the intake of 17 September 2026. Charged in CZK." },
  "mendelu-bsc-intl-territorial": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://mendelu.cz/en/studijni-programy/international-territorial-studies/", note: "Programme page confirms the Bachelor (3 years) and lists a paid tuition fee as an admission criterion, but states no amount; MENDELU says fees are shown in the application form." },
  "mendelu-msc-intl-territorial": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://mendelu.cz/en/studijni-programy/international-territorial-studies-2/", note: "Programme page confirms the Master (2 years) and lists a paid tuition fee as an admission criterion, but states no amount; MENDELU says fees are shown in the application form." },
  "mendelu-msc-general-agriculture": { status: "pending", checkedOn: "2026-11-02", sourceUrl: "https://mendelu.cz/en/studijni-programy/general-agriculture/", note: "Programme page confirms the Master (2 years, Faculty of AgriSciences) and lists a paid tuition fee as an admission criterion, but states no amount; MENDELU says fees are shown in the application form." },
};
