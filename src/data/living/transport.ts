/**
 * Student public-transport passes, copied from each city's official tariff.
 * Prices are CZK for an electronic, personal pass valid in the whole city.
 * The student discount ends on the 26th birthday; older students pay the full fare.
 */
import type { CityKey } from "@/data/costs";

export type StudentPass = {
  network: string;
  /** One month (30 days) for a student. */
  monthCzk: number;
  /** The cheapest long pass for a student, and how many months it covers. */
  longPass: { czk: number; months: number };
  eligibility: { en: string; ar: string };
  validFrom: { en: string; ar: string };
  sourceUrl: string;
  checkedOn: string;
};

export const STUDENT_TRANSPORT: Record<CityKey, StudentPass> = {
  prague: {
    network: "PID (Prague public transport)",
    monthCzk: 130,
    longPass: { czk: 1280, months: 12 },
    eligibility: {
      en: "Full-time students aged 18 to 26 with an ISIC card or a confirmation from their university.",
      ar: "طلاب الدوام الكامل من 18 إلى 26 سنة ببطاقة ISIC أو شهادة من الجامعة.",
    },
    validFrom: { en: "current PID tariff", ar: "تعريفة PID الحالية" },
    sourceUrl: "https://pid.cz/en/tickets-and-fare/",
    checkedOn: "2026-11-08",
  },
  brno: {
    network: "IDS JMK (Brno zones 100 + 101)",
    monthCzk: 275,
    longPass: { czk: 2375, months: 12 },
    eligibility: {
      en: "Full-time students aged 18 to 26, proven with an ISIC card.",
      ar: "طلاب الدوام الكامل من 18 إلى 26 سنة، بإثبات ببطاقة ISIC.",
    },
    validFrom: { en: "1 July 2024 (the current price list)", ar: "1 يوليو 2024 (قائمة الأسعار الحالية)" },
    sourceUrl: "https://content.idsjmk.cz/cenik/Cenik.pdf",
    checkedOn: "2026-11-08",
  },
  ostrava: {
    network: "ODIS (Ostrava city zone)",
    monthCzk: 275,
    longPass: { czk: 1600, months: 12 },
    eligibility: {
      en: "Students aged 15 to 26. The 12-month student pass runs from September to August.",
      ar: "الطلاب من 15 إلى 26 سنة. اشتراك الطلاب لمدة 12 شهرًا يسري من سبتمبر إلى أغسطس.",
    },
    validFrom: { en: "14 December 2025", ar: "14 ديسمبر 2025" },
    sourceUrl: "https://kodis-files.s3.eu-central-1.amazonaws.com/Soubor_ceniku_14_12_2025_ec909f447d.pdf",
    checkedOn: "2026-11-08",
  },
};
