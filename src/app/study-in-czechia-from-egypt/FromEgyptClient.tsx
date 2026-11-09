"use client";

import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { FounderCard } from "@/components/founder-card";
import { ArrowRight, ExternalLink } from "lucide-react";
import { OFFICIAL } from "@/lib/study-costs";
import { DORM_PRICES } from "@/data/dorm-prices";

// A hub for students applying from Egypt. Every step repeats what the linked
// page already says (and sources) and sends the reader there. The scholarship
// answer is the one fact only this page has, so it links its own sources.
type Step = { title: string; body: string; links: { href: string; label: string }[] };
type Costs = {
  bachelorMedian: number;
  medicine: { min: number; max: number } | null;
  brno: [number, number];
  prague: [number, number];
  firstYearEnglish: [number, number];
  firstYearCzech: [number, number];
  checkedFees: { en: string; ar: string };
  checkedFunds: { en: string; ar: string };
};
type Short = { text: string; href: string; label: string };
type Faq = { q: string; a: string; href: string; label: string; sources?: { url: string; label: string }[] };

const n = (v: number) => v.toLocaleString("en-US");
const VISA_FEE = n(OFFICIAL.visaFeeCairoEgp.value);
const FUNDS = n(OFFICIAL.proofOfFundsYearCzk.value);
const SUPERLEG = n(OFFICIAL.superlegalisationCairoEgp.value);
const DORM_FROM = n(Math.min(...DORM_PRICES.map((d) => d.double[0])));
const MSMT_NOSTRIFICATION =
  "https://msmt.gov.cz/vzdelavani/uznavani-zahranicniho-a-ceskeho-studia/uznani-zahranicniho-vzdelani-s-vyjimkou-vs";
const STUDYIN_HOW_TO_APPLY = "https://studyin.gov.cz/plan-your-studies/how-to-apply/";
/** Both read 2026-11-08. The embassy page was last updated in 2018, and the answer says so. */
const DZS_SCHOLARSHIPS = "https://www.dzs.cz/en/program/study-opportunities-foreigners-cr";
const EMBASSY_SCHOLARSHIPS = "https://mzv.gov.cz/cairo/en/culture/education/czech_governmental_scholarships_for_the.html";

/** Key figures, each repeated from the page or data file that sources it. */
const FACTS = [
  { key: "free", url: OFFICIAL.czechFree.url },
  { key: "visa", url: OFFICIAL.visaFeeCairoEgp.url },
  { key: "funds", url: OFFICIAL.proofOfFundsYearCzk.url },
  { key: "superleg", url: OFFICIAL.superlegalisationCairoEgp.url },
  { key: "nostrification", url: MSMT_NOSTRIFICATION },
  { key: "dorm", href: "/student-housing" },
] as const;

const en = {
  title: "Study in Czechia from Egypt: the whole path",
  subtitle:
    "Eight steps from your Thanaweya Amma to your first week in the Czech Republic. Each one links to the full guide, built from official university, embassy and ministry pages.",
  shortTitle: "The short answer",
  short: (c: Costs): Short[] => [
    {
      text: "Yes, you can apply with the Thanaweya Amma, once it is legalised in Egypt and at the Czech Embassy in Cairo, then recognised by the faculty or by nostrification.",
      href: "/thanaweya-amma-czech-university",
      label: "Thanaweya Amma guide",
    },
    {
      text: `A first year in Brno comes to about €${n(c.firstYearEnglish[0])} to €${n(c.firstYearEnglish[1])} on a typical English-taught bachelor's: €${n(c.bachelorMedian)} tuition plus a budget to balanced student month from our cost-of-living calculator. Taught in Czech at a public university, tuition is free, so it comes to about €${n(c.firstYearCzech[0])} to €${n(c.firstYearCzech[1])}. Visa and legalisation fees come on top.`,
      href: "/what-it-costs",
      label: "What it costs",
    },
    {
      text: "Most Czech universities close applications at the end of February, so for a September start, begin by December.",
      href: "/deadlines",
      label: "Deadline tracker",
    },
  ],
  parentsTop: "Paying for it as a parent? See the cost and safety, and whether the degree will count in Egypt.",
  recognitionLink: "Recognition in Egypt",
  checkedNote: (c: Costs) =>
    `Checked against official pages: visa and legalisation fees on ${c.checkedFees.en} (the visa fee is valid from ${OFFICIAL.visaFeeCairoEgp.validFrom.en}), proof of funds on ${c.checkedFunds.en}. Fees can change, so open the source before you pay.`,
  founderTopic: "studying in Czechia from Egypt",
  steps: [
    {
      title: "Check that you can apply",
      body: `Your Thanaweya Amma has to be legalised in Egypt, then superlegalised at the Czech Embassy in Cairo: originals only, ${SUPERLEG} EGP per document, requests on Sundays from 9:00 to 11:30, usually about a week. Then it is recognised in Czechia: by the faculty, which is faster but counts only for its own admission, or by nostrification at a regional authority, which counts everywhere but is slower.`,
      links: [
        { href: "/thanaweya-amma-czech-university", label: "Thanaweya Amma step by step" },
        { href: "/eligibility", label: "Eligibility check" },
        { href: "/qa/#docs-nostrification", label: "Nostrification questions" },
      ],
    },
    {
      title: "Choose Czech or English",
      body: "A degree taught in Czech at a public university is free, but you need the language first, for example through a Czech preparatory year. Degrees taught in English charge tuition.",
      links: [
        { href: "/preparatory-year", label: "Preparatory year" },
        { href: "/study/cheapest-programmes", label: "Cheapest English programmes" },
      ],
    },
    {
      title: "Pick a programme and a university",
      body: "Compare programmes by field, city and fee. Every fee shows its source.",
      links: [
        { href: "/university-matcher", label: "University matcher" },
        { href: "/programmes", label: "All programmes" },
        { href: "/study/medicine-in-czech-republic", label: "Medicine in English" },
      ],
    },
    {
      title: "Apply before the deadline",
      body: "Most Czech universities close applications at the end of February, and every programme has an entrance exam.",
      links: [
        { href: "/deadlines", label: "Deadline tracker" },
        { href: "/application-guide", label: "Application guide" },
      ],
    },
    {
      title: "Plan the money",
      body: "Tuition, monthly living costs, the money the visa asks you to show, and the scholarships open to you.",
      links: [
        { href: "/what-it-costs", label: "What it costs" },
        { href: "/cost-of-living", label: "Cost of living" },
        { href: "/student-housing", label: "Dorm prices" },
        { href: "/scholarships", label: "Scholarships" },
        { href: "/work-while-studying", label: "Working while studying" },
      ],
    },
    {
      title: "Get the student visa in Cairo",
      body: "Book by email only; a valid request is confirmed within 15 days. You apply in person with your acceptance letter, proof of accommodation, bank statements for the last 6 months and a criminal record extract translated into Czech and superlegalised: Arabic or English versions aren't accepted. The Ministry of the Interior can take up to 60 days to decide.",
      links: [
        { href: "/student-visa-egypt", label: "Student visa from Egypt" },
        { href: "/interview-prep", label: "Embassy interview practice" },
      ],
    },
    {
      title: "Make sure your degree will count in Egypt",
      body: "Only Egypt's Supreme Council of Universities can make your degree equivalent. It decides case by case after you graduate, so nobody can promise the result. Before you choose, check that the university is on the Czech Ministry of Education's register. For practical subjects such as medicine, engineering and sciences, the Council requires full-time study.",
      links: [{ href: "/recognition/egypt", label: "Recognition in Egypt" }],
    },
    {
      title: "Your first weeks",
      body: "Registering with the foreign police, a bank account, a SIM card, transport and insurance.",
      links: [{ href: "/arrival", label: "Arrival guide" }],
    },
  ] as Step[],
  parents: "Parents: what it costs, how safe it is and how paying for help works.",
  parentsLink: "For parents",
  timelineTitle: "When to do what, for a September start",
  timelineNote: "The official advice is to start 6 to 9 months before your studies begin. Some universities use other dates, so check your programme.",
  timeline: [
    {
      when: "By December",
      what: "Start legalising your Thanaweya Amma and choose your programmes.",
      href: "/thanaweya-amma-czech-university",
      label: "Thanaweya Amma guide",
    },
    {
      when: "By the end of February",
      what: "Apply. Most Czech universities close applications at the end of February, and every programme has an entrance exam.",
      href: "/deadlines",
      label: "Deadline tracker",
    },
    {
      when: "As soon as you're accepted",
      what: "Prepare your visa documents, then email the Czech Embassy in Cairo for an appointment. A valid request gets a confirmation within 15 days.",
      href: "/student-visa-egypt",
      label: "Student visa from Egypt",
    },
    {
      when: "By the end of June",
      what: "Hand in your visa application. The Ministry of the Interior can take up to 60 days to decide, so this leaves time before September.",
      href: "/student-visa-egypt",
      label: "Student visa from Egypt",
    },
    {
      when: "September",
      what: "Arrive, then register with the foreign police and sort out your bank account, SIM card and insurance.",
      href: "/arrival",
      label: "Arrival guide",
    },
  ],
  factsTitle: "Key numbers for Egyptian students",
  facts: {
    free: { label: "Tuition, taught in Czech at a public university", value: "Free" },
    visa: { label: "Student visa fee at the Czech Embassy in Cairo", value: `${VISA_FEE} EGP` },
    funds: { label: "Money to show for one year of study", value: `${FUNDS} CZK` },
    superleg: { label: "Superlegalisation, per document", value: `${SUPERLEG} EGP` },
    nostrification: { label: "Nostrification of Thanaweya Amma", value: "3,000 CZK, 30 days" },
    dorm: { label: "Bed in a university dorm, from", value: `${DORM_FROM} CZK a night` },
  } as Record<(typeof FACTS)[number]["key"], { label: string; value: string }>,
  source: "Source",
  details: "Details",
  faqTitle: "Questions Egyptian students ask",
  cost: (c: Costs): Faq => ({
    q: "How much does it cost to study in the Czech Republic from Egypt?",
    a: `Taught in Czech at a public university, tuition is free. Taught in English, half of the bachelor's programmes on this site cost €${n(c.bachelorMedian)} a year or less${c.medicine ? `, and General Medicine costs €${n(c.medicine.min)} to €${n(c.medicine.max)} a year` : ""}. A student month costs ${n(c.brno[0])} to ${n(c.brno[1])} CZK in Brno and ${n(c.prague[0])} to ${n(c.prague[1])} CZK in Prague, from a budget month to a balanced one.`,
    href: "/what-it-costs",
    label: "What it costs",
  }),
  faq: [
    {
      q: "Can Egyptians study in Czechia for free?",
      a: "Yes, if the degree is taught in Czech at a public university, for every nationality. Degrees taught in English charge tuition.",
      href: "/what-it-costs",
      label: "What it costs",
    },
    {
      q: "Do Egyptians need a visa to study in the Czech Republic?",
      a: "Yes. You apply in person at the Czech Embassy in Cairo for a long-term visa for study. Nobody can apply or speak for you.",
      href: "/student-visa-egypt",
      label: "Student visa from Egypt",
    },
    {
      q: "Do I need IELTS to study in Czechia?",
      a: "For degrees taught in English, most programmes ask for IELTS 5.5 to 6.5 or an equivalent test, so check your programme's admission page. For degrees taught in Czech you need the language, usually at B2.",
      href: "/eligibility",
      label: "Eligibility check",
    },
    {
      q: "Are there scholarships for Egyptian students?",
      a: "Egypt is on the list for Czech intergovernmental scholarships, but you can't apply to them directly: the Egyptian authorities nominate the candidates. The Czech Embassy in Cairo says applications go through Egypt's Ministry of Higher Education, which also has the deadlines. That embassy page dates from 2018, so ask the ministry about the current round. Egypt is not on the list for the Czech development scholarships.",
      href: "/scholarships",
      label: "All scholarship routes",
      sources: [
        { url: DZS_SCHOLARSHIPS, label: "DZS" },
        { url: EMBASSY_SCHOLARSHIPS, label: "Czech Embassy in Cairo" },
      ],
    },
    {
      q: "Is the Thanaweya Amma accepted by Czech universities?",
      a: "Yes, once it is legalised in Egypt and at the Czech Embassy in Cairo, then recognised by the faculty or by nostrification at a Czech regional authority.",
      href: "/thanaweya-amma-czech-university",
      label: "Thanaweya Amma guide",
    },
    {
      q: "How much money do I need for the Czech student visa?",
      a: `You must show at least ${FUNDS} CZK for one year, and the visa fee in Cairo is ${VISA_FEE} EGP.`,
      href: "/student-visa-egypt",
      label: "Student visa from Egypt",
    },
    {
      q: "Can I work while I study in Czechia?",
      a: "Full-time students of an accredited university programme have free access to the Czech labour market, with no separate work permit.",
      href: "/work-while-studying",
      label: "Working while studying",
    },
    {
      q: "Will my Czech degree be recognised in Egypt?",
      a: "Egypt's Supreme Council of Universities decides. Check its conditions before you choose a university.",
      href: "/recognition/egypt",
      label: "Recognition in Egypt",
    },
  ] as Faq[],
};

const ar: typeof en = {
  title: "الدراسة في التشيك للمصريين: الطريق كامل",
  subtitle:
    "ثماني خطوات من الثانوية العامة حتى أول أسبوع في التشيك. كل خطوة توصلك إلى الدليل الكامل، المبني على صفحات الجامعات والسفارة والوزارات الرسمية.",
  shortTitle: "الإجابة السريعة",
  short: (c: Costs): Short[] => [
    {
      text: "أيوه، تقدر تقدم بالثانوية العامة، بعد ما تتوثق في مصر وفي السفارة التشيكية بالقاهرة، وبعدها تتعادل عن طريق الكلية أو بالنوستريفيكيشن.",
      href: "/thanaweya-amma-czech-university",
      label: "دليل الثانوية العامة",
    },
    {
      text: `أول سنة في برنو بتوصل تقريبًا من ${n(c.firstYearEnglish[0])}€ لـ${n(c.firstYearEnglish[1])}€ في بكالوريوس متوسط بالإنجليزية: ${n(c.bachelorMedian)}€ مصاريف دراسية مع شهر طالب من الاقتصادي للمتوازن حسب حاسبة تكاليف المعيشة عندنا. بالتشيكية في جامعة حكومية الدراسة مجانية، فبتوصل تقريبًا من ${n(c.firstYearCzech[0])}€ لـ${n(c.firstYearCzech[1])}€. ورسوم الفيزا والتصديق غير كده.`,
      href: "/what-it-costs",
      label: "التكاليف الحقيقية",
    },
    {
      text: "أغلب الجامعات التشيكية بتقفل التقديم آخر فبراير، فلو هتبدأ في سبتمبر، ابدأ من ديسمبر.",
      href: "/deadlines",
      label: "مواعيد التقديم",
    },
  ],
  parentsTop: "ولي أمر وهتدفع المصاريف؟ اعرف التكلفة والأمان، وهل الشهادة هتتعادل في مصر.",
  recognitionLink: "المعادلة في مصر",
  checkedNote: (c: Costs) =>
    `راجعناها على الصفحات الرسمية: رسوم الفيزا والتصديق يوم ${c.checkedFees.ar} (رسوم الفيزا سارية من ${OFFICIAL.visaFeeCairoEgp.validFrom.ar})، والمبلغ المطلوب إثباته يوم ${c.checkedFunds.ar}. الرسوم ممكن تتغير، فافتح المصدر قبل ما تدفع.`,
  founderTopic: "الدراسة في التشيك من مصر",
  steps: [
    {
      title: "تأكد أنك تقدر تقدم",
      body: `شهادة الثانوية العامة لازم تتوثق في مصر، وبعدها تتصدق في السفارة التشيكية بالقاهرة: الأصول بس، و${SUPERLEG} جنيه للمستند، والطلبات يوم الأحد من 9:00 لـ11:30، وبتاخد حوالي أسبوع. وبعدها تتعادل في التشيك: عن طريق الكلية، وده أسرع بس بينفع للقبول فيها بس، أو بالنوستريفيكيشن في مكتب الإقليم، وده بينفع في كل مكان بس أبطأ.`,
      links: [
        { href: "/thanaweya-amma-czech-university", label: "الثانوية العامة خطوة بخطوة" },
        { href: "/eligibility", label: "أقدر أقدم؟" },
        { href: "/qa/#docs-nostrification", label: "أسئلة النوستريفيكيشن" },
      ],
    },
    {
      title: "اختار: تشيكي ولا إنجليزي",
      body: "الدراسة بالتشيكية في جامعة حكومية مجانية، بس لازم تتعلم اللغة الأول، مثلًا في سنة تحضيرية. الدراسة بالإنجليزية بمصاريف.",
      links: [
        { href: "/preparatory-year", label: "السنة التحضيرية" },
        { href: "/study/cheapest-programmes", label: "أرخص البرامج بالإنجليزية" },
      ],
    },
    {
      title: "اختار البرنامج والجامعة",
      body: "قارن البرامج حسب التخصص والمدينة والمصاريف. كل رسوم مكتوب جنبها مصدرها.",
      links: [
        { href: "/university-matcher", label: "اختيار الجامعة" },
        { href: "/programmes", label: "كل البرامج" },
        { href: "/study/medicine-in-czech-republic", label: "الطب بالإنجليزية" },
      ],
    },
    {
      title: "قدم قبل آخر ميعاد",
      body: "أغلب الجامعات التشيكية بتقفل التقديم آخر فبراير، وكل برنامج له امتحان قبول.",
      links: [
        { href: "/deadlines", label: "مواعيد التقديم" },
        { href: "/application-guide", label: "دليل التقديم" },
      ],
    },
    {
      title: "رتب الفلوس",
      body: "المصاريف الدراسية، وتكاليف المعيشة الشهرية، والمبلغ اللي الفيزا بتطلب تثبته، والمنح المتاحة ليك.",
      links: [
        { href: "/what-it-costs", label: "التكاليف الحقيقية" },
        { href: "/cost-of-living", label: "تكاليف المعيشة" },
        { href: "/student-housing", label: "أسعار السكن الجامعي" },
        { href: "/scholarships", label: "المنح" },
        { href: "/work-while-studying", label: "الشغل أثناء الدراسة" },
      ],
    },
    {
      title: "فيزا الدراسة من القاهرة",
      body: "الحجز بالإيميل بس، والطلب الصحيح بيتأكد خلال 15 يوم. بتقدم بنفسك ومعاك خطاب القبول، وإثبات السكن، وكشف حساب آخر 6 شهور، وصحيفة الحالة الجنائية مترجمة للتشيكية ومصدقة من السفارة: النسخة العربية أو الإنجليزية مش مقبولة. وزارة الداخلية ممكن تاخد لحد 60 يوم عشان تقرر.",
      links: [
        { href: "/student-visa-egypt", label: "تأشيرة الدراسة من مصر" },
        { href: "/interview-prep", label: "تدريب على مقابلة السفارة" },
      ],
    },
    {
      title: "اتأكد إن شهادتك هتتعادل في مصر",
      body: "المجلس الأعلى للجامعات في مصر هو الوحيد اللي يقدر يعادل شهادتك. بيقرر كل حالة لوحدها بعد التخرج، فمحدش يقدر يوعدك بالنتيجة. قبل ما تختار، اتأكد إن الجامعة موجودة في سجل وزارة التعليم التشيكية. وللتخصصات العملية زي الطب والهندسة والعلوم، المجلس بيشترط الدراسة بدوام كامل.",
      links: [{ href: "/recognition/egypt", label: "المعادلة في مصر" }],
    },
    {
      title: "أول أسابيع ليك هناك",
      body: "التسجيل في شرطة الأجانب، والحساب البنكي، وشريحة الموبايل، والمواصلات، والتأمين.",
      links: [{ href: "/arrival", label: "دليل الوصول" }],
    },
  ],
  parents: "لأولياء الأمور: التكلفة، والأمان، وطريقة الدفع مقابل المساعدة.",
  parentsLink: "لأولياء الأمور",
  timelineTitle: "تعمل إيه وإمتى، لو هتبدأ الدراسة في سبتمبر",
  timelineNote: "النصيحة الرسمية إنك تبدأ قبل الدراسة بـ 6 إلى 9 أشهر. بعض الجامعات مواعيدها مختلفة، فراجع برنامجك.",
  timeline: [
    {
      when: "في ديسمبر",
      what: "ابدأ توثيق الثانوية العامة واختار البرامج.",
      href: "/thanaweya-amma-czech-university",
      label: "دليل الثانوية العامة",
    },
    {
      when: "قبل آخر فبراير",
      what: "قدم. أغلب الجامعات التشيكية بتقفل التقديم آخر فبراير، وكل برنامج له امتحان قبول.",
      href: "/deadlines",
      label: "مواعيد التقديم",
    },
    {
      when: "أول ما تتقبل",
      what: "جهز أوراق الفيزا، وبعدها ابعت إيميل للسفارة التشيكية بالقاهرة تطلب موعد. الطلب الصحيح بيتأكد خلال 15 يوم.",
      href: "/student-visa-egypt",
      label: "تأشيرة الدراسة من مصر",
    },
    {
      when: "قبل آخر يونيو",
      what: "قدم طلب الفيزا. وزارة الداخلية ممكن تاخد لحد 60 يوم عشان تقرر، فكده هيفضل وقت قبل سبتمبر.",
      href: "/student-visa-egypt",
      label: "تأشيرة الدراسة من مصر",
    },
    {
      when: "سبتمبر",
      what: "اوصل، وبعدها سجل في شرطة الأجانب وخلص الحساب البنكي وشريحة الموبايل والتأمين.",
      href: "/arrival",
      label: "دليل الوصول",
    },
  ],
  factsTitle: "أرقام مهمة للطلاب المصريين",
  facts: {
    free: { label: "المصاريف للدراسة بالتشيكية في جامعة حكومية", value: "مجانًا" },
    visa: { label: "رسوم فيزا الدراسة في السفارة التشيكية بالقاهرة", value: `${VISA_FEE} جنيه` },
    funds: { label: "المبلغ المطلوب إثباته لسنة دراسية", value: `${FUNDS} كرونة` },
    superleg: { label: "التصديق في السفارة، للمستند الواحد", value: `${SUPERLEG} جنيه` },
    nostrification: { label: "معادلة الثانوية العامة (نوستريفيكيشن)", value: "3,000 كرونة، 30 يوم" },
    dorm: { label: "سرير في السكن الجامعي، يبدأ من", value: `${DORM_FROM} كرونة في الليلة` },
  },
  source: "المصدر",
  details: "التفاصيل",
  faqTitle: "أسئلة الطلاب المصريين",
  cost: (c: Costs): Faq => ({
    q: "الدراسة في التشيك من مصر بتتكلف قد إيه؟",
    a: `الدراسة بالتشيكية في جامعة حكومية مجانية. بالإنجليزية، نص برامج البكالوريوس على الموقع رسومها ${n(c.bachelorMedian)}€ في السنة أو أقل${c.medicine ? `، والطب العام من ${n(c.medicine.min)}€ لـ${n(c.medicine.max)}€ في السنة` : ""}. شهر الطالب بيتكلف من ${n(c.brno[0])} لـ${n(c.brno[1])} كرونة في برنو، ومن ${n(c.prague[0])} لـ${n(c.prague[1])} كرونة في براغ، من الشهر الاقتصادي للمتوازن.`,
    href: "/what-it-costs",
    label: "التكاليف الحقيقية",
  }),
  faq: [
    {
      q: "هل يقدر المصري يدرس في التشيك مجانًا؟",
      a: "أيوه، لو الدراسة بالتشيكية في جامعة حكومية، وده لكل الجنسيات. الدراسة بالإنجليزية بمصاريف.",
      href: "/what-it-costs",
      label: "التكاليف الحقيقية",
    },
    {
      q: "هل المصريين محتاجين فيزا للدراسة في التشيك؟",
      a: "أيوه. لازم تقدم بنفسك في السفارة التشيكية بالقاهرة على فيزا طويلة الأمد للدراسة، ومحدش يقدر يقدم أو يتكلم بالنيابة عنك.",
      href: "/student-visa-egypt",
      label: "تأشيرة الدراسة من مصر",
    },
    {
      q: "محتاج IELTS عشان أدرس في التشيك؟",
      a: "للدراسة بالإنجليزية، معظم البرامج بتطلب IELTS من 5.5 لـ6.5 أو امتحان يعادله، فراجع صفحة القبول بتاعة برنامجك. للدراسة بالتشيكية لازم تعرف اللغة، وعادة بمستوى B2.",
      href: "/eligibility",
      label: "أقدر أقدم؟",
    },
    {
      q: "هل فيه منح دراسية للطلاب المصريين في التشيك؟",
      a: "مصر ضمن قائمة المنح الحكومية التشيكية بين الدولتين، بس مش بتقدم عليها مباشرة: الجهات المصرية هي اللي بترشح الطلاب. والسفارة التشيكية في القاهرة بتقول إن الطلبات بتعدي الأول على وزارة التعليم العالي المصرية، وهي اللي عندها المواعيد. صفحة السفارة دي من 2018، فاسأل الوزارة عن الدورة الحالية. مصر مش ضمن قائمة منح التنمية التشيكية.",
      href: "/scholarships",
      label: "كل طرق المنح",
      sources: [
        { url: DZS_SCHOLARSHIPS, label: "DZS" },
        { url: EMBASSY_SCHOLARSHIPS, label: "السفارة التشيكية بالقاهرة" },
      ],
    },
    {
      q: "هل الجامعات التشيكية بتقبل الثانوية العامة المصرية؟",
      a: "أيوه، بعد ما تتوثق في مصر وفي السفارة التشيكية بالقاهرة، وبعدها تتعادل عن طريق الكلية أو بالنوستريفيكيشن في مكتب الإقليم.",
      href: "/thanaweya-amma-czech-university",
      label: "دليل الثانوية العامة",
    },
    {
      q: "محتاج فلوس قد إيه لفيزا الدراسة في التشيك؟",
      a: `لازم تثبت ${FUNDS} كرونة على الأقل لسنة دراسية، ورسوم الفيزا في القاهرة ${VISA_FEE} جنيه.`,
      href: "/student-visa-egypt",
      label: "تأشيرة الدراسة من مصر",
    },
    {
      q: "أقدر أشتغل وأنا بدرس في التشيك؟",
      a: "طلاب الدوام الكامل في برنامج جامعي معتمد ليهم حرية الشغل في التشيك من غير تصريح عمل منفصل.",
      href: "/work-while-studying",
      label: "الشغل أثناء الدراسة",
    },
    {
      q: "هل شهادتي التشيكية هتتعادل في مصر؟",
      a: "المجلس الأعلى للجامعات هو اللي بيقرر. اعرف شروطه قبل ما تختار الجامعة.",
      href: "/recognition/egypt",
      label: "المعادلة في مصر",
    },
  ],
};

export default function FromEgyptClient({ costs }: { costs: Costs }) {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;
  const [free, ...rest] = t.faq;
  const faq = [free, t.cost(costs), ...rest];

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{t.title}</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">{t.subtitle}</p>
          <GlassCard className="mb-8">
            <h2 className="text-lg font-semibold text-text-primary mb-3">{t.shortTitle}</h2>
            <ul className="space-y-3">
              {t.short(costs).map((item) => (
                <li key={item.href} className="text-sm text-text-secondary leading-relaxed">
                  {item.text}{" "}
                  <Link href={item.href} className="font-medium text-brand hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-text-secondary leading-relaxed mt-3">
              {t.parentsTop}{" "}
              <Link href="/for-parents" className="font-medium text-brand hover:underline">
                {t.parentsLink}
              </Link>
              {" · "}
              <Link href="/recognition/egypt" className="font-medium text-brand hover:underline">
                {t.recognitionLink}
              </Link>
            </p>
          </GlassCard>
          <GlassCard className="mb-8">
            <h2 className="text-lg font-semibold text-text-primary mb-3">{t.factsTitle}</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              {FACTS.map((f) => (
                <div key={f.key}>
                  <dt className="text-sm text-text-muted">{t.facts[f.key].label}</dt>
                  <dd className="text-base font-semibold text-text-primary">
                    <bdi>{t.facts[f.key].value}</bdi>{" "}
                    {"url" in f ? (
                      <a href={f.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-xs font-medium text-brand hover:underline">
                        {t.source}
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link href={f.href} className="text-xs font-medium text-brand hover:underline">
                        {t.details}
                      </Link>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-text-muted leading-relaxed mt-3">{t.checkedNote(costs)}</p>
          </GlassCard>

          <section aria-labelledby="egypt-timeline" className="mb-8">
            <h2 id="egypt-timeline" className="text-xl font-bold text-text-primary mb-1">{t.timelineTitle}</h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">
              {t.timelineNote}{" "}
              <a href={STUDYIN_HOW_TO_APPLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 font-medium text-brand hover:underline">
                {t.source}
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </p>
            <GlassCard>
              <ol className="space-y-3">
                {t.timeline.map((row) => (
                  <li key={row.when}>
                    <p className="text-base font-semibold text-text-primary">{row.when}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {row.what}{" "}
                      <Link href={row.href} className="font-medium text-brand hover:underline">
                        {row.label}
                      </Link>
                    </p>
                  </li>
                ))}
              </ol>
            </GlassCard>
          </section>

          <ol className="space-y-4 mb-8">
            {t.steps.map((s, i) => (
              <li key={s.title}>
                <GlassCard>
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-bg text-sm font-semibold"
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-text-primary">{s.title}</h2>
                      <p className="text-sm text-text-secondary leading-relaxed mt-1">{s.body}</p>
                      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2">
                        {s.links.map((l) => (
                          <Link
                            key={l.href}
                            href={l.href}
                            className="inline-flex items-center gap-1 text-sm text-brand font-medium hover:underline"
                          >
                            {l.label}
                            <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </li>
            ))}
          </ol>

          <section aria-labelledby="egypt-faq" className="mb-8">
            <h2 id="egypt-faq" className="text-xl font-bold text-text-primary mb-3">{t.faqTitle}</h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <GlassCard key={item.q}>
                  <h3 className="text-base font-semibold text-text-primary">{item.q}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mt-1">
                    {item.a}{" "}
                    <Link href={item.href} className="font-medium text-brand hover:underline">
                      {item.label}
                    </Link>
                    {item.sources?.map((s) => (
                      <span key={s.url}>
                        {" · "}
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 font-medium text-brand hover:underline">
                          {s.label}
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </a>
                      </span>
                    ))}
                  </p>
                </GlassCard>
              ))}
            </div>
          </section>
          <FounderCard topic={t.founderTopic} className="mb-8" />
          <p className="text-sm text-text-secondary">
            {t.parents}{" "}
            <Link href="/for-parents" className="text-brand font-medium hover:underline">
              {t.parentsLink}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
