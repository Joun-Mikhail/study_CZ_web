/**
 * Prepaid mobile plans from Kaktus (T-Mobile's prepaid brand), copied from its
 * own price list. The same prices apply everywhere in Czechia.
 */
export type PhonePlan = {
  name: string;
  monthCzk: number;
  includes: { en: string; ar: string };
};

export const PHONE_SOURCE = {
  operator: "Kaktus",
  /** The price list PDF is dated 29 April 2026. */
  sourceUrl: "https://www.mujkaktus.cz/cenik",
  checkedOn: "2026-11-08",
};

export const PHONE_PLANS = {
  basic: {
    name: "NEŘEŠTO za 250",
    monthCzk: 250,
    includes: { en: "5 GB, 100 minutes or texts", ar: "5 جيجا و100 دقيقة أو رسالة" },
  },
  more: {
    name: "NEŘEŠTO za 350",
    monthCzk: 350,
    includes: { en: "10 GB, then unlimited at 2 Mb/s, 100 minutes or texts", ar: "10 جيجا ثم غير محدود بسرعة 2 ميجابت، و100 دقيقة أو رسالة" },
  },
} satisfies Record<string, PhonePlan>;
