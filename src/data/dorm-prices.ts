/**
 * University dormitory prices, copied from each dormitory operator's official
 * price list. Prices are CZK per bed per night, including VAT, as the lists
 * state them. Each entry keeps its source, the date the list is valid from,
 * and the date we checked it.
 */
import type { CityKey } from "@/data/costs";

export type DormPriceList = {
  id: string;
  university: { en: string; ar: string };
  cityKey: CityKey;
  city: { en: string; ar: string };
  /** Lowest and highest nightly price per bed, by room type. Omitted when the list has none. */
  single?: [number, number];
  double: [number, number];
  validFrom: { en: string; ar: string };
  conditions: { en: string; ar: string };
  sourceUrl: string;
  checkedOn: string;
};

export const DORM_PRICES: DormPriceList[] = [
  {
    id: "cuni",
    university: { en: "Charles University", ar: "جامعة تشارلز" },
    cityKey: "prague",
    city: { en: "Prague", ar: "براغ" },
    single: [156, 444],
    double: [126, 310],
    validFrom: { en: "1 May 2026", ar: "1 مايو 2026" },
    conditions: {
      en: "Price for stays of 1 to 300 nights. Stays shorter than 60 days also pay the local accommodation fee.",
      ar: "السعر للإقامة من ليلة إلى 300 ليلة. الإقامات الأقصر من 60 يومًا تدفع أيضًا رسوم الإقامة المحلية.",
    },
    sourceUrl: "https://kam.cuni.cz/KAM-477.html",
    checkedOn: "2026-11-07",
  },
  {
    id: "ctu",
    university: { en: "Czech Technical University (ČVUT)", ar: "جامعة التشيك التقنية (ČVUT)" },
    cityKey: "prague",
    city: { en: "Prague", ar: "براغ" },
    single: [144, 280],
    double: [118, 254],
    validFrom: { en: "1 September 2026", ar: "1 سبتمبر 2026" },
    conditions: {
      en: "Minimum stay of 30 nights, for students of Czech universities with proof of student status.",
      ar: "أقل مدة 30 ليلة، لطلاب الجامعات التشيكية مع إثبات صفة الطالب.",
    },
    sourceUrl: "https://www.suz.cvut.cz/en/dormitory-accommodation/price-list-documents",
    checkedOn: "2026-11-07",
  },
  {
    id: "muni",
    university: { en: "Masaryk University", ar: "جامعة ماساريك" },
    cityKey: "brno",
    city: { en: "Brno", ar: "برنو" },
    single: [195, 323],
    double: [170, 255],
    validFrom: { en: "1 February 2026 (2025/26 list, the latest published)", ar: "1 فبراير 2026 (قائمة 2025/26، أحدث قائمة منشورة)" },
    conditions: {
      en: "Price for stays of at least one month.",
      ar: "السعر للإقامة لمدة شهر على الأقل.",
    },
    sourceUrl: "https://www.skm.muni.cz/en/accommodation/long-term-accomodation",
    checkedOn: "2026-11-07",
  },
  {
    id: "but",
    university: { en: "Brno University of Technology (VUT)", ar: "جامعة برنو التقنية (VUT)" },
    cityKey: "brno",
    city: { en: "Brno", ar: "برنو" },
    double: [164, 164],
    validFrom: { en: "current price list", ar: "قائمة الأسعار الحالية" },
    conditions: {
      en: "Pod Palackého vrchem hall, which houses foreign students, including self-paying students of English programmes. A bed in a three-bed room with its own bathroom is 155 CZK.",
      ar: "سكن Pod Palackého vrchem للطلاب الأجانب، ومنهم طلاب البرامج الإنجليزية على حسابهم. السرير في غرفة ثلاثية بحمّام خاص 155 كرونة.",
    },
    sourceUrl: "https://www.kam.vutbr.cz/english/?p=PPV",
    checkedOn: "2026-11-07",
  },
  {
    id: "vsb",
    university: { en: "VŠB – Technical University of Ostrava", ar: "جامعة VŠB التقنية في أوسترافا" },
    cityKey: "ostrava",
    city: { en: "Ostrava", ar: "أوسترافا" },
    single: [180, 250],
    double: [120, 175],
    validFrom: { en: "1 July 2026", ar: "1 يوليو 2026" },
    conditions: {
      en: "Long-term stays for the whole academic year. Basic rate when the room is full; it is higher if a bed stays empty.",
      ar: "إقامة طويلة للعام الدراسي كله. السعر الأساسي عندما تكون الغرفة ممتلئة، ويرتفع إذا بقي سرير فارغًا.",
    },
    sourceUrl: "https://www.vsb.cz/ubytovani/en/student/pricelist/long-termaccommodation/",
    checkedOn: "2026-11-08",
  },
];

/** Nights in the "about a month" column. */
export const NIGHTS_PER_MONTH = 30;
