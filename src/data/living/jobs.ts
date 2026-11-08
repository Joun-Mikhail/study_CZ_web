import type { CityKey } from "@/data/costs";

/**
 * Pay in real Czech job ads that students can apply for, read on
 * JOBS_CHECKED_ON from public job boards (jenprace.cz, pracomat.cz, jobs.cz).
 *
 * - Czech ads quote gross pay (hrubá mzda), before tax and insurance. None of
 *   the hourly ads below says tips are included.
 * - `market` rows are the job board's own summary of every live part-time or
 *   brigade ad for that job and city on the day we checked ("from X to Y Kč an
 *   hour, average Z"). `adCount` says how many ads it is based on; a figure
 *   from one ad is not a market average and the page says so.
 * - `ads` are single advertisements, linked so anyone can check them. Ads
 *   expire within weeks; when a link stops working, replace the ad or drop it.
 */

export const JOBS_CHECKED_ON = "2026-11-08";

export type JobAd = {
  /** Title as the ad shows it. */
  title: string;
  employer: string;
  city: CityKey;
  /** Gross hourly pay [from, to]; equal values for a single figure. */
  hourlyCzk?: [number, number];
  /** Gross monthly pay [from, to], for full-time or part-time ads quoted per month. */
  monthlyCzk?: [number, number];
  /** Anything the ad says about language, contract or who it suits, in the ad's words (translated). */
  note?: { en: string; ar: string };
  url: string;
  postedOn?: string;
};

export type MarketSummary = {
  city: CityKey;
  hourlyCzk: [number, number];
  averageCzk: number;
  adCount: number;
  source: { name: string; url: string };
};

export type JobRoleId =
  | "waiter"
  | "barista"
  | "supermarket"
  | "warehouse"
  | "fastFood"
  | "catering"
  | "reception"
  | "cleaning";

export type JobRole = {
  id: JobRoleId;
  name: { en: string; ar: string };
  /** Default for the wage slider: a round figure inside the ads' range, not an average. */
  typicalHourlyCzk: number;
  market: MarketSummary[];
  ads: JobAd[];
  language?: { en: string; ar: string };
};

const PRACOMAT = "Pracomat.cz";
const pracomat = (region: string, slug: string) =>
  `https://www.pracomat.cz/nabidky-prace/hledani/region-${region}/profese-${slug}/`;

export const JOB_ROLES: JobRole[] = [
  {
    id: "waiter",
    name: { en: "Waiter / waitress", ar: "جرسون / ويتر" },
    typicalHourlyCzk: 180,
    market: [
      { city: "prague", hourlyCzk: [135, 220], averageCzk: 164, adCount: 13, source: { name: PRACOMAT, url: pracomat("praha", "cisnik-servirka") } },
      { city: "brno", hourlyCzk: [180, 240], averageCzk: 210, adCount: 1, source: { name: PRACOMAT, url: pracomat("brno", "cisnik-servirka") } },
      { city: "ostrava", hourlyCzk: [140, 200], averageCzk: 164, adCount: 4, source: { name: PRACOMAT, url: pracomat("ostrava", "cisnik-servirka") } },
    ],
    ads: [
      {
        title: "Číšník - Brno - kulturní akce v Brněnském hotelu, 170-187 Kč/hod",
        employer: "Brno hotel (events and company parties)",
        city: "brno",
        hourlyCzk: [170, 187],
        url: "https://www.pracomat.cz/prace/4_1987580-cisnik-brno-kulturni-akce-v-brnenskem-hotelu-170-187-kchod",
      },
      {
        title: "190 Kč/h NA EVENTU 12. 11.",
        employer: "Event catering, Prague",
        city: "prague",
        hourlyCzk: [190, 190],
        note: { en: "One-off event shifts.", ar: "ورديات لحدث واحد." },
        url: "https://www.pracomat.cz/prace/1_3790833-190-kch-na-eventu-12-11",
      },
      {
        title: "Číšník - Praha, 200 Kč/hod. Výplata ihned!",
        employer: "Catering, events around Czechia from Prague",
        city: "prague",
        hourlyCzk: [200, 200],
        url: "https://www.pracomat.cz/prace/4_1989669-cisnik-praha-200-kchod-vyplata-ihned",
      },
      {
        title: "Obsluha v Dobrotéce min. 190 Kč/hod.",
        employer: "Dobrotéka, Žižkov",
        city: "prague",
        hourlyCzk: [190, 190],
        note: { en: "\"Minimum\" 190 Kč an hour.", ar: "\"على الأقل\" 190 كرونة في الساعة." },
        url: "https://www.pracomat.cz/prace/1_3788423-obsluha-v-dobrotece-min-190-kchod",
      },
    ],
    language: {
      en: "Mixed. Some Prague ads ask for fluent Czech, one asks for \"perfect Czech and English\", and one international restaurant works in English.",
      ar: "مختلفة. بعض إعلانات براغ تطلب تشيكية بطلاقة، وإعلان يطلب \"تشيكية وإنجليزية ممتازة\"، ومطعم دولي لغة الشغل فيه إنجليزية.",
    },
  },
  {
    id: "barista",
    name: { en: "Barista", ar: "باريستا" },
    typicalHourlyCzk: 180,
    market: [
      { city: "brno", hourlyCzk: [180, 240], averageCzk: 210, adCount: 1, source: { name: PRACOMAT, url: pracomat("brno", "barista") } },
    ],
    ads: [
      {
        title: "Baristka/servírka v kavárně COFFEE TREE v OC OLYMPIA Brno",
        employer: "Masakava s.r.o.",
        city: "brno",
        monthlyCzk: [40000, 45000],
        note: { en: "Full-time.", ar: "دوام كامل." },
        url: "https://www.jenprace.cz/nabidka/pdgwzc/servirka-baristka-v-kavarne-coffeeshop-company-v-oc-olympia",
        postedOn: "2026-11-04",
      },
    ],
  },
  {
    id: "supermarket",
    name: { en: "Supermarket assistant", ar: "مساعد في سوبر ماركت" },
    typicalHourlyCzk: 190,
    market: [],
    ads: [
      { title: "Brigádník (ž/m) - Brno, Židenice", employer: "Kaufland", city: "brno", hourlyCzk: [190, 190], url: "https://www.jenprace.cz/brigada/crbv9/brigadnik-z-m-brno-zidenice", postedOn: "2026-11-06" },
      { title: "Brigádník (ž/m), Brno - Slatina", employer: "Kaufland", city: "brno", hourlyCzk: [190, 202], url: "https://www.jenprace.cz/brigada/x1pcc/brigadnik-z-m-brno-slatina", postedOn: "2026-11-06" },
      { title: "Brigádník (ž/m) - Brno, Bohunice", employer: "Kaufland", city: "brno", hourlyCzk: [202, 202], url: "https://www.jenprace.cz/brigada/guzwu/brigadnik-z-m-brno-bohunice", postedOn: "2026-11-03" },
      { title: "Brigádník (ž/m), Praha - Stodůlky", employer: "Kaufland", city: "prague", hourlyCzk: [190, 190], url: "https://www.jenprace.cz/brigada/js6oz/brigadnik-z-m-praha-stodulky", postedOn: "2026-11-06" },
      { title: "Brigáda v supermarketu - Doplňování zboží - 175 Kč/hod", employer: "Agentura STUDENT", city: "prague", hourlyCzk: [175, 175], url: "https://www.jenprace.cz/brigada/hbt6o/brigada-v-supermarketu-doplnovani-zbozi-175-kc-hod", postedOn: "2026-11-06" },
    ],
  },
  {
    id: "warehouse",
    name: { en: "Warehouse worker", ar: "عامل مخزن" },
    typicalHourlyCzk: 190,
    market: [],
    ads: [
      {
        title: "Brigáda ve skladu PPL v Líšni – až 209 Kč/hod.",
        employer: "JOBINN & HOSTESSINN (agency)",
        city: "brno",
        hourlyCzk: [190, 209],
        note: { en: "Marked \"suitable for foreigners\".", ar: "مكتوب عليه \"مناسب للأجانب\"." },
        url: "https://www.jenprace.cz/brigada/vytoq/brigada-ve-skladu-ppl-v-lisni-az-209-kc-hod-penize-kazdy-den",
        postedOn: "2026-11-04",
      },
      { title: "BRIGÁDA VE SKLADU V BRNĚ | 180 Kč/hod", employer: "Swiss Automotive Group CZ", city: "brno", hourlyCzk: [180, 180], url: "https://www.jenprace.cz/brigada/q1ic8/brigada-ve-skladu-v-brne-180-kc-hod", postedOn: "2026-11-02" },
      { title: "Sklad s nábytkem - Brno - 179 Kč/h", employer: "Agentura STUDENT", city: "brno", hourlyCzk: [179, 268], url: "https://www.jenprace.cz/brigada/pmhz7/sklad-s-nabytkem-brno-179-kc-h", postedOn: "2026-11-03" },
      { title: "Brigádník: SKLADNÍK / ŘIDIČ (ideální pro studenty prvního ročníku VŠ!)", employer: "ALIFEA", city: "prague", hourlyCzk: [180, 200], url: "https://www.jenprace.cz/brigada/mqvsb/brigadnik-skladnik-ridic-idealni-pro-studenty-prvniho-rocniku-vs" },
      { title: "Sklad s počítačovými komponenty", employer: "Agentura STUDENT", city: "prague", hourlyCzk: [195, 195], url: "https://www.jenprace.cz/brigada/a28zh/sklad-s-pocitacovymi-komponenty", postedOn: "2026-11-06" },
    ],
  },
  {
    id: "fastFood",
    name: { en: "Fast-food crew", ar: "شغل في مطعم وجبات سريعة" },
    typicalHourlyCzk: 160,
    market: [],
    ads: [
      { title: "Brigáda v McDonald’s 170 Kč/hod", employer: "McDonald's", city: "brno", hourlyCzk: [150, 175], url: "https://www.jenprace.cz/brigada/fllh2/nejlepsi-brigada-pro-studenty", postedOn: "2026-11-06" },
      { title: "Raději si vyděláš, než bys spal/a? Směny do 02:30/03:30, 170 Kč/h", employer: "McDonald's", city: "brno", hourlyCzk: [170, 175], note: { en: "Night shifts.", ar: "ورديات ليلية." }, url: "https://www.jenprace.cz/brigada/r2faz/radeji-si-vydelas-nez-bys-spal-a-smeny-do-01-30-03-30-150-kc-h", postedOn: "2026-11-04" },
      { title: "Pracovník v Kornee's občerstvení (m/ž)", employer: "ID Retail Services", city: "brno", hourlyCzk: [150, 180], note: { en: "Marked \"suitable for foreigners\".", ar: "مكتوب عليه \"مناسب للأجانب\"." }, url: "https://www.jenprace.cz/brigada/lw8ig/pracovnik-v-kornee-s-obcerstveni-m-z", postedOn: "2026-11-02" },
      { title: "Brigáda při škole za 150 Kč/h na Holešovicích!", employer: "McDonald's", city: "prague", hourlyCzk: [150, 150], url: "https://www.jenprace.cz/brigada/x94jy/stabilni-a-dlouhodoba-brigada-v-holesovicich" },
      { title: "Brigáda na večerní až noční směny na Edenu až za 154,-kč/hod.", employer: "McDonald's", city: "prague", hourlyCzk: [154, 154], url: "https://www.jenprace.cz/brigada/7o4qf/brigada-na-vecerni-az-nocni-smeny-na-edenu-za-154-kc-hod" },
    ],
  },
  {
    id: "catering",
    name: { en: "Kitchen and catering help", ar: "مساعدة في مطبخ أو كاترينج" },
    typicalHourlyCzk: 200,
    market: [],
    ads: [
      { title: "Brigádník/ce do gastroprovozu v Brně - T Arena (DPP)", employer: "ARAMARK", city: "brno", hourlyCzk: [200, 230], note: { en: "Agreement to perform work (DPP).", ar: "عقد DPP." }, url: "https://www.jenprace.cz/brigada/v0pog/brigadnik-ce-do-gastroprovozu-v-brne-t-arena-dpp", postedOn: "2026-11-06" },
      { title: "Catering Průmyslový palác 11.12.2026/3230Kč za směnu", employer: "AV Production Services", city: "prague", hourlyCzk: [190, 190], note: { en: "Marked \"suitable for foreigners\"; one event day.", ar: "مكتوب عليه \"مناسب للأجانب\"؛ يوم حدث واحد." }, url: "https://www.jenprace.cz/brigada/0zq35/catering-prumyslovy-palac-11-12-2026-3230kc-za-smenu" },
    ],
  },
  {
    id: "reception",
    name: { en: "Hotel or front-desk receptionist", ar: "موظف استقبال" },
    typicalHourlyCzk: 160,
    market: [
      { city: "prague", hourlyCzk: [134, 200], averageCzk: 159, adCount: 22, source: { name: PRACOMAT, url: pracomat("praha", "recepcni") } },
      { city: "brno", hourlyCzk: [150, 150], averageCzk: 150, adCount: 4, source: { name: PRACOMAT, url: pracomat("brno", "recepcni") } },
    ],
    ads: [
      { title: "RECEPČNÍ v hotelu Abito *** na Praze 4 (HPP)", employer: "JLV, a.s.", city: "prague", monthlyCzk: [34000, 37000], note: { en: "Full-time employment contract.", ar: "عقد عمل بدوام كامل." }, url: "https://www.jenprace.cz/nabidka/y4tzzy/recepcni-v-hotelu-abito-na-praze-4-hpp" },
    ],
  },
  {
    id: "cleaning",
    name: { en: "Cleaner", ar: "عامل نظافة" },
    typicalHourlyCzk: 170,
    market: [],
    ads: [
      {
        title: "Uklízeč/ka - Praha 5, K Barrandovu (20 hodin/týden)",
        employer: "Lidl",
        city: "prague",
        monthlyCzk: [14500, 16052],
        note: { en: "Part-time, 20 hours a week, paid per month.", ar: "دوام جزئي 20 ساعة في الأسبوع، مرتب شهري." },
        url: "https://www.jenprace.cz/nabidka/a04nd8/uklizec-ka-praha-5-k-barrandovu-20-hodin-tyden-mzda-po-2-letech-16-052-kc",
      },
    ],
  },
];

export const JOB_BY_ID: Record<JobRoleId, JobRole> = Object.fromEntries(JOB_ROLES.map((j) => [j.id, j])) as Record<JobRoleId, JobRole>;

/** Roles students ask about where we found no hourly pay we could check. Shown as notes, with no number. */
export const UNPRICED_ROLES: { id: string; name: { en: string; ar: string }; note: { en: string; ar: string } }[] = [
  {
    id: "courier",
    name: { en: "Delivery courier", ar: "مندوب توصيل" },
    note: {
      en: "The courier ads we found pay per day, not per hour (for example 2,500 to 4,000 Kč a day for grocery deliveries in Brno, posted by a contractor), and need a driving licence. Some delivery work is self-employed rather than a job, which is a different legal situation for a student. Check the contract type before you start.",
      ar: "إعلانات التوصيل اللي لقيناها بتدفع باليوم مش بالساعة (مثلًا 2,500 لـ 4,000 كرونة في اليوم لتوصيل طلبات بقالة في برنو، من متعهد)، ومحتاجة رخصة قيادة. وبعض شغل التوصيل بيكون عمل حر مش وظيفة، ودا وضع قانوني مختلف للطالب. اتأكد من نوع العقد قبل ما تبدأ.",
    },
  },
  {
    id: "it",
    name: { en: "Junior IT support", ar: "دعم فني IT مبتدئ" },
    note: {
      en: "IT support and helpdesk ads in Brno on the day we checked were full-time, paid per month (for example 30,000 Kč a month for customer support at CENDIS, or 30,000 to 32,000 Kč at Concentrix). We found no part-time student IT ad that stated its pay.",
      ar: "إعلانات الدعم الفني في برنو يوم ما راجعنا كانت دوام كامل بمرتب شهري (مثلًا 30,000 كرونة في الشهر لدعم العملاء في CENDIS، أو 30,000 لـ 32,000 في Concentrix). مالقيناش إعلان IT بدوام جزئي للطلاب مكتوب فيه المرتب.",
    },
  },
  {
    id: "internship",
    name: { en: "Technical or engineering internship", ar: "تدريب هندسي أو تقني" },
    note: {
      en: "Internship ads usually don't state pay. Ask your faculty's career centre: companies often post paid student positions there first.",
      ar: "إعلانات التدريب غالبًا مش بتكتب المرتب. اسأل مركز التوظيف في كليتك: الشركات كتير بتنزل وظائف الطلاب المدفوعة هناك الأول.",
    },
  },
];

/** Source pages for the unpriced notes and full-time examples. */
export const IT_EXAMPLE_ADS = [
  "https://www.jobs.cz/rpd/2001488234/",
  "https://www.jobs.cz/rpd/2001232002/",
];

/** Lowest and highest hourly pay across a role's ads and market summaries, optionally for one city. */
export function hourlyRange(role: JobRole, city?: CityKey): [number, number] | null {
  const ranges = [
    ...role.market.filter((m) => !city || m.city === city).map((m) => m.hourlyCzk),
    ...role.ads.filter((a) => a.hourlyCzk && (!city || a.city === city)).map((a) => a.hourlyCzk as [number, number]),
  ];
  if (!ranges.length) return null;
  return [Math.min(...ranges.map((r) => r[0])), Math.max(...ranges.map((r) => r[1]))];
}
