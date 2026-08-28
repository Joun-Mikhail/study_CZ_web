import { CityKey } from "./costs";

export type CityGuide = {
  key: CityKey;
  name: { en: string; ar: string };
  overview: { en: string; ar: string };
  housing: { en: string; ar: string };
  transport: { en: string; ar: string };
  nightlife: { en: string; ar: string };
  avgRentMonthly: number;
  tips: { en: string[]; ar: string[] };
};

export const cityGuides: Record<CityKey, CityGuide> = {
  prague: {
    key: "prague",
    name: { en: "Prague", ar: "براغ" },
    overview: {
      en: "Prague is the capital and largest city, offering the richest cultural life and broadest job market for students.",
      ar: "براغ هي العاصمة وأكبر مدينة، وتوفر حياة ثقافية غنية وسوق عمل واسع للطلاب.",
    },
    housing: {
      en: "Expect higher rents in central neighborhoods; student dorms and shared flats further out are cheaper.",
      ar: "توقع إيجارات أعلى في وسط المدينة؛ السكن الجامعي والشقق المشتركة في الضواحي أرخص.",
    },
    transport: {
      en: "Excellent public transport with metro, trams and buses; student passes are affordable.",
      ar: "شبكة مواصلات عامة ممتازة (مترو، ترام، حافلات)؛ تصاريح الطلاب بأسعار معقولة.",
    },
    nightlife: {
      en: "Vibrant nightlife with cafes, bars and cultural events year-round.",
      ar: "حياة ليلية نشطة مع مقاهي وبارات وفعاليات ثقافية طوال العام.",
    },
    avgRentMonthly: 6500,
    tips: {
      en: [
        "Look for dorm applications early, waiting lists fill fast.",
        "Avoid the most tourist-heavy streets when renting to save money.",
      ],
      ar: [
        "قدّم على السكن الجامعي مبكرًا، القوائم تمتلئ سريعًا.",
        "تجنب الشوارع المزدحمة بالسياح عند البحث عن سكن لتوفير المال.",
      ],
    },
  },
  brno: {
    key: "brno",
    name: { en: "Brno", ar: "برنو" },
    overview: {
      en: "Brno is a student city with a strong academic scene and lower living costs than Prague.",
      ar: "برنو مدينة طلابية ذات مشهد أكاديمي قوي وتكاليف معيشة أقل من براغ.",
    },
    housing: {
      en: "More affordable rentals and plenty of student neighborhoods close to universities.",
      ar: "إيجارات أكثر قابلية للتحمل والعديد من الأحياء الطلابية القريبة من الجامعات.",
    },
    transport: {
      en: "Compact city center: many students cycle or use buses and trams.",
      ar: "مركز مدينة مدمج، العديد من الطلاب يركبون الدراجات أو يستخدمون الحافلات والترام.",
    },
    nightlife: {
      en: "Good student-focused cafes and cultural spots; lively but smaller than Prague.",
      ar: "مقاهي ووجهات ثقافية موجهة للطلاب؛ حيوية لكنها أصغر من براغ.",
    },
    avgRentMonthly: 4500,
    tips: {
      en: ["Try shared flats near campus to keep commuting short.", "Check local Facebook groups for room listings."],
      ar: ["ابحث عن شقق مشتركة بالقرب من الحرم لتقليل التنقل.", "تحقق من مجموعات فيسبوك المحلية لإعلانات الغرف."],
    },
  },
  ostrava: {
    key: "ostrava",
    name: { en: "Ostrava", ar: "أوسترافا" },
    overview: {
      en: "Ostrava offers the lowest living costs of the three and a growing student community.",
      ar: "أوسترافا تقدم أقل تكاليف معيشة من بين الثلاث ولديها مجتمع طلابي متنامٍ.",
    },
    housing: {
      en: "Very affordable rent; expect older buildings and quieter neighborhoods.",
      ar: "إيجارات ميسورة للغاية؛ توقع مباني أقدم وأحياء أهدأ.",
    },
    transport: {
      en: "Smaller public network but commuting distances are short; student discounts apply.",
      ar: "شبكة مواصلات عامة أصغر لكن مسافات التنقل قصيرة؛ تنطبق خصومات الطلاب.",
    },
    nightlife: {
      en: "Calmer nightlife with local pubs and cultural festivals; good for focused study.",
      ar: "حياة ليلية أهدأ مع حانات محلية ومهرجانات ثقافية؛ مناسبة للدراسة الجادة.",
    },
    avgRentMonthly: 3600,
    tips: {
      en: ["Use local student services for housing help.", "Budget extra for occasional trips to Prague or Brno."],
      ar: ["استخدم خدمات الطلاب المحلية للمساعدة في السكن.", "خصص ميزانية لرحلات إلى براغ أو برنو من حين لآخر."],
    },
  },
};

export default cityGuides;
