import { OFFICIAL } from "@/data/official-figures";

/**
 * Official 2026 rules behind the earnings simulator. Each figure is copied
 * from the law or the authority that sets it, with the date we checked it.
 * They change every January: update the numbers and `checkedOn` together.
 */

export const RULES_CHECKED_ON = "2026-11-08";

export const MIN_WAGE_2026 = {
  monthlyCzk: 22400,
  hourlyCzk: 134.4,
  validFrom: "2026-01-01",
  url: "https://mpsv.gov.cz/web/cz/minimalni-mzda",
  checkedOn: RULES_CHECKED_ON,
};

/** Agreement to perform work (dohoda o provedení práce). */
export const DPP = {
  /** Monthly pay from one employer at or above which social and health insurance apply (ČSSZ, 2026). */
  insuranceThresholdCzk: 12000,
  maxHoursPerYear: 300,
  insuranceUrl: "https://www.cssz.gov.cz/-/prehled-nejdulezitejsich-udaju-pro-socialni-zabezpeceni-v-roce-2026",
  labourCodeUrl: "https://www.zakonyprolidi.cz/cs/2006-262#p75",
  checkedOn: RULES_CHECKED_ON,
};

/** Agreement to perform activity (dohoda o pracovní činnosti). */
export const DPC = {
  insuranceThresholdCzk: 4500,
  /** At most half of the full-time week on average (Labour Code § 76). */
  maxShareOfFullTime: 0.5,
  fullTimeHoursPerWeek: 40,
  labourCodeUrl: "https://www.zakonyprolidi.cz/cs/2006-262#p76",
  checkedOn: RULES_CHECKED_ON,
};

/** Income Tax Act (586/1992 Sb.). */
export const INCOME_TAX = {
  rate: 0.15,
  /** § 35ba (1)(a): 30,840 Kč a year, applied monthly as 2,570 Kč with a signed declaration. */
  basicCreditYearCzk: 30840,
  basicCreditMonthCzk: 2570,
  url: "https://www.zakonyprolidi.cz/cs/1992-586",
  checkedOn: RULES_CHECKED_ON,
};

/** Full-time students of an accredited programme need no separate work permit. */
export const WORK_ACCESS = OFFICIAL.workFreeAccess;

/** Czech National Bank fixing used for the optional EUR display. */
export const FX = {
  czkPerEur: 24.345,
  date: "2026-11-06",
  url: "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/",
};

/** Civil Code § 2254: a deposit (plus any contractual penalty) may not exceed three months' rent. */
export const DEPOSIT_RULE = {
  maxMonthsRent: 3,
  url: "https://www.zakonyprolidi.cz/cs/2012-89#p2254",
  checkedOn: RULES_CHECKED_ON,
};

/** Weeks in an average month (52 weeks / 12 months). */
export const WEEKS_PER_MONTH = 52 / 12;
