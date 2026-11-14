/**
 * Official pages the site sends students to, by topic.
 *
 * The official Study in Czechia portal now lives at studyin.gov.cz. Addresses
 * on the old studyin.cz domain redirect there by path, and several old paths
 * (tuition fees, visas, living costs, FAQ) no longer exist on the new site, so
 * they end in "page not found". Every URL below returned HTTP 200 on
 * OFFICIAL_SOURCES_CHECKED. Re-check them with `node tools/check-official-links.mjs`
 * and update the date when you do.
 */
export const OFFICIAL_SOURCES_CHECKED = "2026-11-11";

export const OFFICIAL_PORTAL = "https://studyin.gov.cz";

type Text = { en: string; ar: string };

export type OfficialTopic = {
  id: string;
  topic: Text;
  /** Page on the official portal. */
  officialUrl: string;
  /** Our own guide on the same topic (internal path, trailing slash). */
  guide: { href: string; label: Text };
};

const P = (path: string) => `${OFFICIAL_PORTAL}${path}`;

export const OFFICIAL_TOPICS: OfficialTopic[] = [
  { id: "programmes", topic: { en: "Finding a programme", ar: "البحث عن برنامج دراسي" }, officialUrl: P("/plan-your-studies/find-your-programme/"), guide: { href: "/programmes/", label: { en: "English-taught programmes with fees", ar: "البرامج بالإنجليزية مع الرسوم" } } },
  { id: "universities", topic: { en: "List of universities", ar: "قائمة الجامعات" }, officialUrl: P("/plan-your-studies/universities/"), guide: { href: "/universities/", label: { en: "Czech universities", ar: "الجامعات التشيكية" } } },
  { id: "apply", topic: { en: "How to apply", ar: "طريقة التقديم" }, officialUrl: P("/plan-your-studies/how-to-apply/"), guide: { href: "/application-guide/", label: { en: "Application guide, step by step", ar: "دليل التقديم خطوة بخطوة" } } },
  { id: "fees", topic: { en: "Tuition fees and finances", ar: "الرسوم الدراسية والتمويل" }, officialUrl: P("/plan-your-studies/scholarships-and-finances/"), guide: { href: "/what-it-costs/", label: { en: "What studying in Czechia costs", ar: "تكاليف الدراسة في التشيك" } } },
  { id: "scholarships", topic: { en: "Scholarships", ar: "المنح الدراسية" }, officialUrl: P("/scholarships/"), guide: { href: "/scholarships/", label: { en: "Scholarships", ar: "المنح الدراسية" } } },
  { id: "czech", topic: { en: "Studying in Czech without tuition", ar: "الدراسة بالتشيكية بلا رسوم دراسية" }, officialUrl: P("/plan-your-studies/learn-czech-study-tuition-free/"), guide: { href: "/preparatory-year/", label: { en: "Preparatory year", ar: "السنة التحضيرية" } } },
  { id: "visa", topic: { en: "Visas and residence permits", ar: "التأشيرات وتصاريح الإقامة" }, officialUrl: P("/get-ready-for-czechia/visas-and-permits/"), guide: { href: "/student-visa-egypt/", label: { en: "Student visa from Egypt", ar: "تأشيرة الدراسة من مصر" } } },
  { id: "living", topic: { en: "Living costs", ar: "تكاليف المعيشة" }, officialUrl: P("/get-ready-for-czechia/living-costs/"), guide: { href: "/cost-of-living/", label: { en: "Cost of living", ar: "تكاليف المعيشة" } } },
  { id: "housing", topic: { en: "Accommodation", ar: "السكن" }, officialUrl: P("/get-ready-for-czechia/accommodation/"), guide: { href: "/student-housing/", label: { en: "University dorm prices", ar: "أسعار السكن الجامعي" } } },
  { id: "work", topic: { en: "Working during your studies", ar: "العمل أثناء الدراسة" }, officialUrl: P("/get-ready-for-czechia/work-during-studies/"), guide: { href: "/work-while-studying/", label: { en: "Working while studying", ar: "العمل أثناء الدراسة" } } },
  { id: "arrival", topic: { en: "Arriving in Czechia", ar: "الوصول إلى التشيك" }, officialUrl: P("/get-ready-for-czechia/your-arrival-guide/"), guide: { href: "/arrival/", label: { en: "Your first weeks", ar: "أول أسابيع لك هناك" } } },
];

/** Old studyin.cz paths that ended in "page not found" on OFFICIAL_SOURCES_CHECKED. */
export const MOVED_EXAMPLES = [
  "studyin.cz/plan-your-studies/tuition-fees/",
  "studyin.cz/plan-your-studies/visas/",
  "studyin.cz/live-work/living-costs/",
  "studyin.cz/faq",
];

export type Authority = { id: string; name: Text; decides: Text; url: string };

export const AUTHORITIES: Authority[] = [
  {
    id: "faculty",
    name: { en: "The university or faculty you apply to", ar: "الجامعة أو الكلية التي تتقدم إليها" },
    decides: { en: "Admission, entrance exams, tuition fees and deadlines. Its own website is the only binding source for these.", ar: "القبول، وامتحانات القبول، والرسوم الدراسية، والمواعيد. موقعها هو المصدر الملزم الوحيد لهذه الأمور." },
    url: P("/plan-your-studies/universities/"),
  },
  {
    id: "embassy-cairo",
    name: { en: "Embassy of the Czech Republic in Cairo", ar: "سفارة جمهورية التشيك في القاهرة" },
    decides: { en: "Where Egyptian residents file a long-term study visa application, and which documents and fee it asks for.", ar: "الجهة التي يقدّم لديها المقيمون في مصر طلب تأشيرة الدراسة طويلة الأمد، والمستندات والرسوم المطلوبة." },
    url: "https://mzv.gov.cz/cairo/en/visa_and_consular_information/long_term_visa/study_long_term_visa_to_the_czech/index.html",
  },
  {
    id: "moi",
    name: { en: "Ministry of the Interior (information portal for foreigners)", ar: "وزارة الداخلية (بوابة معلومات الأجانب)" },
    decides: { en: "Residence rules, proof of funds and what happens after you arrive.", ar: "قواعد الإقامة، وإثبات القدرة المالية، وما يلي الوصول." },
    url: "https://ipc.gov.cz/en/",
  },
  {
    id: "mfa",
    name: { en: "Ministry of Foreign Affairs", ar: "وزارة الخارجية" },
    decides: { en: "General rules for long-stay visas for study.", ar: "القواعد العامة لتأشيرات الإقامة الطويلة بغرض الدراسة." },
    url: "https://mzv.gov.cz/jnp/en/information_for_aliens/long_stay_visa/study_long_term.html",
  },
  {
    id: "msmt",
    name: { en: "Ministry of Education, Youth and Sports", ar: "وزارة التعليم والشباب والرياضة" },
    decides: { en: "Government scholarships and the legal framework for higher education.", ar: "المنح الحكومية والإطار القانوني للتعليم العالي." },
    url: "https://msmt.gov.cz/en/scholarships/government-scholarships-developing-countries",
  },
  {
    id: "dzs",
    name: { en: "Czech National Agency for International Education and Research (DZS)", ar: "الوكالة الوطنية التشيكية للتعليم الدولي والبحث (DZS)" },
    decides: { en: "Runs the official Study in Czechia portal.", ar: "تدير البوابة الرسمية Study in Czechia." },
    url: "https://www.dzs.cz/en",
  },
];
