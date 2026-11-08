/**
 * Student price of a hot lunch at a university canteen (menza), from each
 * university's own page. The student price needs a student card; guests pay more.
 */
import type { CityKey } from "@/data/costs";

export type CanteenPrice = {
  operator: { en: string; ar: string };
  /** Student price of the cheapest main dish (CZK). */
  mealCzk: number;
  note: { en: string; ar: string };
  sourceUrl: string;
  checkedOn: string;
};

export const CANTEENS: Record<CityKey, CanteenPrice> = {
  prague: {
    operator: { en: "Charles University canteens", ar: "مطاعم جامعة تشارلز" },
    mealCzk: 88,
    note: {
      en: "Cheapest student main dish on the menu for Monday 9 November 2026; the others cost up to 105 CZK. Soup is extra.",
      ar: "أرخص طبق رئيسي للطلاب في قائمة الإثنين 9 نوفمبر 2026، والباقي يصل إلى 105 كرونات. الشوربة بسعر إضافي.",
    },
    sourceUrl: "https://kam-septim-fe.is.cuni.cz/menu?canteen=1&date=2026-11-09&view=day",
    checkedOn: "2026-11-08",
  },
  brno: {
    operator: { en: "Masaryk University canteens", ar: "مطاعم جامعة ماساريك" },
    mealCzk: 85,
    note: {
      en: "The student menu price, unchanged from the spring 2026 semester. Soup is now sold separately.",
      ar: "سعر وجبة الطلاب، دون تغيير منذ فصل ربيع 2026. الشوربة تُباع الآن منفصلة.",
    },
    sourceUrl: "https://www.skm.muni.cz/en/news/changes-to-the-student-dining-offer",
    checkedOn: "2026-11-08",
  },
  ostrava: {
    operator: { en: "VŠB – Technical University of Ostrava canteen", ar: "مطعم جامعة VŠB التقنية" },
    mealCzk: 40,
    note: {
      en: "VŠB's own page says “approximately 40 CZK” and gives no date. Current prices are only shown after logging in, so expect more.",
      ar: "صفحة الجامعة نفسها تقول «حوالي 40 كرونة» بدون تاريخ. الأسعار الحالية تظهر فقط بعد تسجيل الدخول، فتوقّع أكثر.",
    },
    sourceUrl: "https://www.vsb.cz/en/study/study-at-vsb-tuo/catering",
    checkedOn: "2026-11-08",
  },
};
