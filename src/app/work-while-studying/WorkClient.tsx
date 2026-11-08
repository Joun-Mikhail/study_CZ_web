"use client";

import { RecognitionGuide, type GuideCopy } from "../recognition/RecognitionGuide";
import { OFFICIAL } from "@/lib/study-costs";

/** Every fact on this page comes from one of these official pages, checked on CHECKED. */
const SOURCES = {
  freeAccess: OFFICIAL.workFreeAccess.url,
  seeking:
    "https://ipc.gov.cz/en/visa-and-residence-permit-types/third-country-nationals/long-term-residence-permits/long-term-residence-permit-for-the-purpose-of-seeking-employment-or-starting-a-business/",
} as const;

const CHECKED = { en: "7 November 2026", ar: "7 نوفمبر 2026" };

const en: GuideCopy = {
  title: "Working while studying in Czechia",
  subtitle:
    "Can a foreign student work in Czechia, and what changes after graduation? The rules for students from outside the EU, from the Czech Ministry of the Interior only.",
  checked: `Checked against the official pages on ${CHECKED.en}. Rules and fees can change, so open the source links before you act.`,
  shortTitle: "The short answer",
  short: [
    { text: "Full-time students of an accredited university study programme have free access to the Czech labour market.", source: "freeAccess" },
    { text: "Free access means you need no separate work authorisation for a job, only your valid residence permit.", source: "freeAccess" },
    { text: "After you graduate, you can apply for a residence permit for seeking employment or starting a business, valid for up to 9 months.", source: "seeking" },
  ],
  sections: [
    {
      id: "during",
      title: "1. While you study",
      items: [
        { text: "Free access applies if you study an accredited university study programme on a full-time basis. Ask your university to confirm that your programme is accredited in Czechia.", source: "freeAccess" },
        { text: "Without a residence permit, a citizen of a country outside the EU cannot be employed in Czechia.", source: "freeAccess" },
        { text: "With free access you can start a job at any time, and neither starting nor changing a job needs approval from the Ministry of the Interior.", source: "freeAccess" },
        { text: "If you hold an employee card with free access, you must report a change of employer to the Ministry of the Interior within 3 working days.", source: "freeAccess" },
      ],
    },
    {
      id: "after",
      title: "2. After you graduate",
      intro: "A residence permit for seeking employment or starting a business lets graduates stay and look for work.",
      items: [
        { text: "You can apply if you hold a long-term residence permit for study and have completed a university-accredited study programme.", source: "seeking" },
        { text: "Apply in person at a Ministry of the Interior office, before your current residence permit expires. While the application is processed you stay legally, even if your permit runs out.", source: "seeking" },
        { text: "Bring the application form, your passport, proof of accommodation, proof of funds, a photograph, comprehensive medical insurance and the document showing you completed your studies.", source: "seeking" },
        { text: "The fee is 2,500 CZK, paid by card at the office. The ministry has 60 days to decide.", source: "seeking" },
        { text: "The permit lasts up to 9 months and cannot be extended. During it you have free access to the labour market and can work or run a business without limits.", source: "seeking" },
        { text: "Holders can also apply for a residence permit for doing business without the usual 5 years of previous residence.", source: "seeking" },
        { text: "Planning to stay after your studies? You must apply for this permit, or for an employee card, before your current residence permit ends.", source: "freeAccess" },
      ],
    },
  ],
  noteTitle: "What this page does not cover",
  note: "Pay, taxes, and health and social insurance on a job depend on the contract. Ask your employer or the university's international office before you sign.",
  reviewTitle: "Want your documents checked before you submit?",
  reviewBody: "I go through every page you plan to submit and tell you what is wrong or missing.",
  reviewCta: "See the document review",
  sourcesTitle: "Sources",
  sourceNames: {
    freeAccess: "Czech Ministry of the Interior (ipc.gov.cz): Free access to the labour market",
    seeking: "Czech Ministry of the Interior (ipc.gov.cz): Residence permit for seeking employment or starting a business",
  },
  source: "Source",
};

const ar: GuideCopy = {
  title: "العمل أثناء الدراسة في التشيك",
  subtitle:
    "هل يمكن للطالب الأجنبي العمل في التشيك، وماذا يتغير بعد التخرج؟ القواعد للطلاب من خارج الاتحاد الأوروبي، من وزارة الداخلية التشيكية فقط.",
  checked: `راجعنا هذه المعلومات على الصفحات الرسمية بتاريخ ${CHECKED.ar}. القواعد والرسوم قد تتغير، لذا افتح روابط المصادر قبل أي خطوة.`,
  shortTitle: "الإجابة المختصرة",
  short: [
    { text: "طلاب الدوام الكامل في برنامج جامعي معتمد لهم حرية الوصول إلى سوق العمل التشيكي.", source: "freeAccess" },
    { text: "حرية الوصول تعني أنك لا تحتاج إلى تصريح عمل منفصل للوظيفة، بل إلى تصريح إقامتك الساري فقط.", source: "freeAccess" },
    { text: "بعد التخرج يمكنك طلب تصريح إقامة بغرض البحث عن عمل أو بدء نشاط تجاري، صالح حتى 9 أشهر.", source: "seeking" },
  ],
  sections: [
    {
      id: "during",
      title: "1. أثناء الدراسة",
      items: [
        { text: "حرية الوصول تنطبق إذا كنت تدرس برنامجًا جامعيًا معتمدًا بدوام كامل. اسأل جامعتك أن تؤكد أن برنامجك معتمد في التشيك.", source: "freeAccess" },
        { text: "بدون تصريح إقامة، لا يمكن توظيف مواطن من خارج الاتحاد الأوروبي في التشيك.", source: "freeAccess" },
        { text: "مع حرية الوصول يمكنك بدء العمل في أي وقت، ولا يحتاج بدء الوظيفة أو تغييرها إلى موافقة وزارة الداخلية.", source: "freeAccess" },
        { text: "إذا كانت لديك بطاقة موظف مع حرية الوصول، يجب إبلاغ وزارة الداخلية بتغيير صاحب العمل خلال 3 أيام عمل.", source: "freeAccess" },
      ],
    },
    {
      id: "after",
      title: "2. بعد التخرج",
      intro: "تصريح الإقامة بغرض البحث عن عمل أو بدء نشاط تجاري يتيح للخريجين البقاء والبحث عن وظيفة.",
      items: [
        { text: "يمكنك التقديم إذا كان لديك تصريح إقامة طويلة الأجل بغرض الدراسة وأنهيت برنامجًا جامعيًا معتمدًا.", source: "seeking" },
        { text: "قدّم بنفسك في أحد مكاتب وزارة الداخلية قبل انتهاء تصريحك الحالي. أثناء دراسة الطلب تبقى إقامتك قانونية حتى لو انتهى التصريح.", source: "seeking" },
        { text: "أحضر استمارة الطلب، وجواز السفر، وإثبات السكن، وإثبات المبلغ المالي، وصورة شخصية، وتأمينًا صحيًا شاملًا، والمستند الذي يثبت إنهاء دراستك.", source: "seeking" },
        { text: "الرسوم 2,500 كرونة تُدفع بالبطاقة في المكتب، والمهلة القانونية للقرار 60 يومًا.", source: "seeking" },
        { text: "التصريح صالح حتى 9 أشهر ولا يمكن تمديده. خلاله لديك حرية الوصول إلى سوق العمل ويمكنك العمل أو إدارة نشاط تجاري بلا قيود.", source: "seeking" },
        { text: "يمكن لحامليه أيضًا طلب تصريح إقامة بغرض النشاط التجاري دون شرط الإقامة السابقة لمدة 5 سنوات.", source: "seeking" },
        { text: "تخطط للبقاء بعد الدراسة؟ يجب أن تطلب هذا التصريح، أو بطاقة موظف، قبل انتهاء تصريح إقامتك الحالي.", source: "freeAccess" },
      ],
    },
  ],
  noteTitle: "ما لا تغطيه هذه الصفحة",
  note: "الأجر والضرائب والتأمين الصحي والاجتماعي في الوظيفة تعتمد على العقد. اسأل صاحب العمل أو المكتب الدولي في الجامعة قبل التوقيع.",
  reviewTitle: "تريد مراجعة أوراقك قبل التقديم؟",
  reviewBody: "أراجع كل صفحة تنوي تقديمها وأخبرك بما فيه خطأ أو ناقص.",
  reviewCta: "تفاصيل مراجعة المستندات",
  sourcesTitle: "المصادر",
  sourceNames: {
    freeAccess: "وزارة الداخلية التشيكية (ipc.gov.cz): حرية الوصول إلى سوق العمل",
    seeking: "وزارة الداخلية التشيكية (ipc.gov.cz): تصريح الإقامة بغرض البحث عن عمل أو بدء نشاط تجاري",
  },
  source: "المصدر",
};

export default function WorkClient() {
  return <RecognitionGuide sources={SOURCES} en={en} ar={ar} placement="work-while-studying" />;
}
