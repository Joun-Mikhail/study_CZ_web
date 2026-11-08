/**
 * Figures copied from official pages, each with its source and the date it
 * was checked. Kept in its own module (re-exported by src/lib/study-costs.ts)
 * so pages that need only these don't pull in the programmes list.
 */
export const OFFICIAL = {
  czechFree: {
    url: "https://studyin.gov.cz/plan-your-studies/learn-czech-study-tuition-free/",
    checked: "2026-10-18",
  },
  proofOfFundsYearCzk: {
    value: 115810,
    url: "https://frs.gov.cz/en/forms-and-documents/documents/proof-of-funds-for-the-residence-finances/",
    checked: "2026-10-18",
  },
  visaFeeCairoEgp: {
    value: 6412,
    validFrom: { en: "1 November 2026", ar: "1 نوفمبر 2026" },
    url: "https://mzv.gov.cz/cairo/en/visa_and_consular_information/consular_and_visa_fees/index.html",
    checked: "2026-11-07",
  },
  superlegalisationCairoEgp: {
    value: 3078,
    url: "https://mzv.gov.cz/cairo/en/visa_and_consular_information/consular_and_visa_fees/index.html",
    checked: "2026-11-07",
  },
  /** Full-time students of an accredited university programme need no separate work permit. */
  workFreeAccess: {
    url: "https://ipc.gov.cz/en/life-in-the-czech-republic/free-access-to-the-labour-market/",
    checked: "2026-11-07",
  },
} as const;
