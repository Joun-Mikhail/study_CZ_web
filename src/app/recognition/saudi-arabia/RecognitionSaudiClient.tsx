"use client";

import { RecognitionGuide, type GuideCopy } from "../RecognitionGuide";

/** Every fact on this page comes from one of these official pages. */
const SOURCES = {
  moeService: "https://www.moe.gov.sa/ar/knowledgecenter/eservices/pages/certeq.aspx",
  moePortal: "https://eqs.moe.gov.sa/Account/Register",
  hcch: "https://www.hcch.net/en/instruments/conventions/status-table/?cid=41",
  czRegister: "https://regvssp.msmt.cz/registrvssp/",
  czNostrification: "https://portal.gov.cz/en/sluzby-vs/recognition-of-foreign-education-nostrification-provided-by-a-foreign-school-in-agreement-with-the-ministry-S5904",
} as const;

const QA_LINK = { en: "Nostrification documents (Q&A)", ar: "أوراق النوستريفيكاتسي (الأسئلة الشائعة)" };

const en: GuideCopy = {
  title: "Will my Czech degree count in Saudi Arabia?",
  subtitle: "Recognition of Czech university degrees in Saudi Arabia, step by step, from official sources only.",
  checked: "Checked against the official pages on 12 October 2026. Rules can change, so open the source links before you act.",
  shortTitle: "The short answer",
  short: [
    { text: "In Saudi Arabia, the Ministry of Education makes foreign degrees equivalent through an online service. It is free and the stated processing time is five working days.", source: "moeService" },
    { text: "If you study at your own expense, you need the Ministry's prior approval to study abroad before you start. That approval does not oblige the Ministry to make your degree equivalent later.", source: "moeService" },
    { text: "The university and the programme must be on the Ministry's list of classified universities; degrees from institutions not on it are judged case by case.", source: "moeService" },
    { text: "Study must be in person, in the country of study. Distance learning is only accepted under extra conditions, for example a top-200 university and a theoretical subject.", source: "moeService" },
  ],
  sections: [
    {
      id: "before",
      title: "1. Before you choose and leave",
      items: [
        { text: "Get the Ministry's prior approval to study abroad if you are self-funded, and check that your university and programme are on the Ministry's classified list.", source: "moeService" },
        { text: "Saudi Arabia (since 7 December 2022) and Czechia are both parties to the Apostille Convention, so Saudi documents for Czech universities can generally be apostilled instead of superlegalised. Confirm what your university accepts.", source: "hcch" },
        { text: "Your secondary school certificate is recognised in Czechia by nostrification at a Czech regional authority.", source: "czNostrification", link: { href: "/qa/#docs-nostrification", label: QA_LINK.en } },
        { text: "Look the university up by name in the Czech Ministry of Education's register of universities.", source: "czRegister" },
      ],
    },
    {
      id: "during",
      title: "2. While you study",
      items: [
        { text: "Study full time and in person in Czechia; that is the standard the Ministry applies.", source: "moeService" },
        { text: "For a master's: it must follow a bachelor's and last at least one academic year, and you must complete the courses or written research the university requires. Overlap with your bachelor's courses is limited to nine credit hours.", source: "moeService" },
      ],
    },
    {
      id: "after",
      title: "3. After you graduate: equivalency in Saudi Arabia",
      items: [
        { text: "Register on the Ministry's equivalency portal (eqs.moe.gov.sa), choose the degree, and accept the general conditions.", source: "moePortal" },
        { text: "Enter your certificate details, any transferred credit hours and your previous degrees, then upload your national ID, passport, the certificate and your transcript.", source: "moeService" },
        { text: "Your previous certificate must be Saudi or already made equivalent. A degree that doesn't meet the minimum requirements can be made equivalent to the level below it.", source: "moeService" },
        { text: "Follow your request on the portal under “Track requests”. For help, the Ministry's support line is 19996.", source: "moeService" },
      ],
    },
  ],
  noteTitle: "Medicine and other licensed professions",
  note: "Equivalency is about the degree. Working as a doctor, dentist or pharmacist in Saudi Arabia also needs professional registration and a licence, with their own rules set by the Saudi health authorities. Check their current requirements before you choose a programme.",
  reviewTitle: "Want your documents checked before you send them?",
  reviewBody: "I go through every page the way the embassy officer will, before you submit.",
  reviewCta: "See the document review",
  sourcesTitle: "Sources",
  sourceNames: {
    moeService: "Saudi Ministry of Education: equivalency of qualifications from outside the Kingdom",
    moePortal: "Saudi Ministry of Education: equivalency portal",
    hcch: "Hague Conference: Apostille Convention status table",
    czRegister: "Czech Ministry of Education: register of universities",
    czNostrification: "Czech government portal: who recognises foreign secondary certificates",
  },
  source: "Source",
};

const ar: GuideCopy = {
  title: "هل تُعادَل شهادتي التشيكية في السعودية؟",
  subtitle: "معادلة شهادات الجامعات التشيكية في المملكة العربية السعودية خطوة بخطوة، من المصادر الرسمية فقط.",
  checked: "راجعنا هذه المعلومات على الصفحات الرسمية بتاريخ 12 أكتوبر 2026. القواعد قد تتغير، لذا افتح روابط المصادر قبل أي خطوة.",
  shortTitle: "الإجابة المختصرة",
  short: [
    { text: "في السعودية تعادل وزارة التعليم الشهادات الصادرة من الخارج عبر خدمة إلكترونية مجانية، ومدة الخدمة المعلنة خمسة أيام عمل.", source: "moeService" },
    { text: "إذا كنت تدرس على حسابك الخاص، فيجب أن تحصل على الموافقة المسبقة من وزارة التعليم على الدراسة بالخارج قبل أن تبدأ. وهذه الموافقة لا تُلزم الوزارة بالمعادلة بعد التخرج.", source: "moeService" },
    { text: "يجب أن تكون المؤسسة والبرنامج ضمن قائمة الوزارة للجامعات المصنفة، وما ليس في القائمة يُنظر فيه حالة بحالة.", source: "moeService" },
    { text: "يجب أن تكون الدراسة بالانتظام الحضوري في بلد الدراسة. أما التعليم عن بعد فيُقبل بشروط إضافية، مثل أن تكون الجامعة ضمن أفضل 200 جامعة وأن يكون التخصص نظريًا.", source: "moeService" },
  ],
  sections: [
    {
      id: "before",
      title: "1. قبل أن تختار وتسافر",
      items: [
        { text: "احصل على الموافقة المسبقة على الدراسة بالخارج إذا كنت تدرس على حسابك الخاص، وتأكد أن الجامعة والبرنامج ضمن قائمة الوزارة للجامعات المصنفة.", source: "moeService" },
        { text: "السعودية (منذ 7 ديسمبر 2022) والتشيك طرفان في اتفاقية الأبوستيل، لذلك يمكن غالبًا توثيق المستندات السعودية للجامعات التشيكية بالأبوستيل بدل التصديق المزدوج. تأكد مما تقبله جامعتك.", source: "hcch" },
        { text: "شهادة الثانوية تُعادَل في التشيك عن طريق النوستريفيكاتسي لدى مكتب الإقليم التشيكي.", source: "czNostrification", link: { href: "/qa/#docs-nostrification", label: QA_LINK.ar } },
        { text: "ابحث عن الجامعة بالاسم في سجل الجامعات لدى وزارة التعليم التشيكية.", source: "czRegister" },
      ],
    },
    {
      id: "during",
      title: "2. أثناء الدراسة",
      items: [
        { text: "ادرس بانتظام وحضوريًا في التشيك؛ فهذا هو الأصل الذي تطبقه الوزارة.", source: "moeService" },
        { text: "للماجستير: يجب أن تسبقه درجة البكالوريوس، وألا تقل مدته عن سنة دراسية، وأن تُنجز ما تطلبه الجامعة من مقررات أو بحوث مكتوبة. ولا يتجاوز التداخل مع مقررات البكالوريوس تسع ساعات.", source: "moeService" },
      ],
    },
    {
      id: "after",
      title: "3. بعد التخرج: المعادلة في السعودية",
      items: [
        { text: "سجّل في بوابة معادلة الشهادات (eqs.moe.gov.sa)، واختر الدرجة العلمية، ووافق على الشروط العامة.", source: "moePortal" },
        { text: "أدخل بيانات الشهادة والساعات المحوّلة إن وُجدت والدرجات السابقة، ثم ارفع الهوية الوطنية وجواز السفر والشهادة وكشف الدرجات.", source: "moeService" },
        { text: "يجب أن تكون الشهادة السابقة صادرة من المملكة أو معادلة من قبل اللجنة. والدرجة التي لا تستوفي الحد الأدنى من المتطلبات قد تُعادَل بالدرجة التي تسبقها.", source: "moeService" },
        { text: "تابع طلبك من «متابعة الطلبات» في البوابة. وللمساعدة، رقم مركز رعاية المستفيدين في الوزارة 19996.", source: "moeService" },
      ],
    },
  ],
  noteTitle: "الطب والمهن التي تحتاج ترخيصًا",
  note: "المعادلة تخص الشهادة نفسها. أما العمل طبيبًا أو طبيب أسنان أو صيدليًا في السعودية فيحتاج أيضًا إلى تسجيل مهني وترخيص لهما قواعدهما لدى الجهات الصحية السعودية. راجع شروطها الحالية قبل أن تختار البرنامج.",
  reviewTitle: "هل تريد مراجعة أوراقك قبل إرسالها؟",
  reviewBody: "أراجع كل صفحة كما سيراجعها موظف السفارة، قبل أن تقدّم.",
  reviewCta: "تفاصيل خدمة مراجعة الأوراق",
  sourcesTitle: "المصادر",
  sourceNames: {
    moeService: "وزارة التعليم السعودية: معادلة المؤهلات الصادرة من خارج المملكة",
    moePortal: "وزارة التعليم السعودية: بوابة معادلة الشهادات",
    hcch: "مؤتمر لاهاي: جدول الدول الأطراف في اتفاقية الأبوستيل",
    czRegister: "وزارة التعليم التشيكية: سجل الجامعات",
    czNostrification: "البوابة الحكومية التشيكية: من يعادل شهادات الثانوية الأجنبية",
  },
  source: "المصدر",
};

export default function RecognitionSaudiClient() {
  return <RecognitionGuide sources={SOURCES} en={en} ar={ar} />;
}
