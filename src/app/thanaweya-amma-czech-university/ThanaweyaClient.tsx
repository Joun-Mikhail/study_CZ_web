"use client";

import { RecognitionGuide, type GuideCopy } from "../recognition/RecognitionGuide";
import { OFFICIAL } from "@/lib/study-costs";

/** Every fact on this page comes from one of these official pages, checked on CHECKED. */
const SOURCES = {
  studyin: "https://studyin.gov.cz/plan-your-studies/how-to-apply/",
  embassy: "https://mzv.gov.cz/cairo/en/visa_and_consular_information/consular_services_1/legalization_of_documents/index.html",
  fees: OFFICIAL.superlegalisationCairoEgp.url,
  msmt: "https://msmt.gov.cz/vzdelavani/uznavani-zahranicniho-a-ceskeho-studia/uznani-zahranicniho-vzdelani-s-vyjimkou-vs",
  muni: "https://www.muni.cz/en/admissions/bachelors-and-masters-studies/verification-of-the-condition-for-admission",
  cuni: "https://admission.cuni.cz/ADM-18.html",
} as const;

const CHECKED = { en: "7 November 2026", ar: "7 نوفمبر 2026" };
const FEE = OFFICIAL.superlegalisationCairoEgp.value.toLocaleString("en-US");

const en: GuideCopy = {
  title: "From Thanaweya Amma to a Czech university",
  subtitle:
    "How to get your Egyptian secondary certificate legalised and recognised so you can apply for a Czech bachelor's or long-cycle master's degree, from official sources only.",
  checked: `Checked against the official pages on ${CHECKED.en}. Rules and fees can change, so open the source links before you act.`,
  shortTitle: "The short answer",
  short: [
    { text: "To start a bachelor's or a long-cycle master's degree such as medicine, you need completed secondary education, recognised in Czechia if it was issued abroad.", source: "studyin" },
    { text: "There are two ways: recognition by the faculty, valid only for its own admissions, or nostrification at a Czech regional authority, valid everywhere but slower.", source: "studyin" },
    { text: "For nostrification, your Thanaweya Amma must first be legalised in Egypt and then superlegalised at the Czech Embassy in Cairo.", source: "msmt" },
    { text: "Nostrification costs 3,000 CZK and is decided within 30 days of a complete application.", source: "msmt" },
    { text: "Start 6 to 9 months before your studies begin.", source: "studyin" },
    { text: "Having your future Czech degree recognised back in Egypt is a separate process.", link: { href: "/recognition/egypt", label: "Recognition in Egypt" } },
    { text: "This is one step of studying in Czechia from Egypt.", link: { href: "/study-in-czechia-from-egypt", label: "See every step" } },
  ],
  sections: [
    {
      id: "appointment",
      title: "1. Legalise the certificate: Egypt, then the Czech Embassy",
      intro: "Superlegalisation makes an Egyptian document valid in Czechia. The embassy accepts originals only, not copies.",
      items: [
        { text: "First, the competent Egyptian authority, usually the Ministry of Foreign Affairs, confirms the signature on the document with a stamp or sticker.", source: "embassy" },
        { text: "A document with several pages must be bound together and sealed by the Ministry of Foreign Affairs, or carry a legalisation stamp and signature on every page.", source: "embassy" },
        { text: "Have the document translated from Arabic into Czech.", source: "embassy" },
        { text: "Book by email only, to cairo.consulate@mzv.gov.cz: one email per applicant, with \"Superlegalization\" in the subject, the document name and your full name as in your passport.", source: "embassy" },
        { text: "Requests are accepted on Sundays, 9:00 to 11:30. Bring the printed confirmation email, the filled-in application form, a copy of your passport, the original document and the fee.", source: "embassy" },
        { text: `The fee is ${FEE} EGP per document.`, source: "fees" },
        { text: "It usually takes one week: hand it in on a Sunday and collect it the next Sunday between 14:00 and 15:00.", source: "embassy" },
      ],
    },
    {
      id: "during",
      title: "2. Route A: recognition by the faculty",
      intro: "Faster, but it counts only for admission to the faculty that checks it.",
      items: [
        { text: "You submit your foreign certificate, with any other documents the faculty asks for, and the faculty checks that it entitles you to bachelor's study. This check may cost a fee.", source: "muni" },
        { text: "It is not a confirmation of equivalence and applies only to that faculty's admissions. Its advantage is that it takes less time than nostrification.", source: "muni" },
        { text: "Charles University, for example, recognises foreign secondary education for admission to its own programmes only.", source: "cuni" },
        { text: "Each faculty sets its own documents and deadlines, so read the admissions page of the faculty you apply to.", source: "muni" },
      ],
    },
    {
      id: "after",
      title: "3. Route B: nostrification at a regional authority",
      intro: "Valid permanently and for any purpose, including any university, but more complex and slower.",
      items: [
        { text: "Apply to the education department of the regional authority (krajský úřad) for the place where you live in Czechia. If that cannot be determined, the place where you submit the application decides.", source: "msmt" },
        { text: "Attach the original certificate or a certified copy, a document showing the content and scope of your studies, and proof that your school is recognised by the Egyptian state if the certificate does not show it.", source: "msmt" },
        { text: "Add a certified Czech translation of these documents, made by a translator registered in the Czech Republic.", source: "msmt" },
        { text: "The signatures and stamps must be verified by the Czech embassy and the Egyptian Ministry of Foreign Affairs: the superlegalisation in step 1.", source: "msmt" },
        { text: "Include proof of where you live in Czechia, and a power of attorney if someone applies for you.", source: "msmt" },
        { text: "The administrative fee is 3,000 CZK.", source: "msmt" },
        { text: "The authority decides within 30 days of receiving a complete application, or up to 30 days more in complex cases.", source: "msmt" },
        { text: "If your studies differ in part from the Czech equivalent, you first take a nostrification exam. If they differ substantially, the application is refused. You can appeal to the Ministry of Education within 15 days.", source: "msmt" },
      ],
    },
  ],
  noteTitle: "Two different recognitions",
  note: "Nostrification recognises your Thanaweya Amma so you can enter a Czech university. Getting your future Czech degree recognised back in Egypt is a separate process with Egypt's Supreme Council of Universities, linked in the short answer above.",
  reviewTitle: "Want your documents checked first?",
  reviewBody: "I go through your certificate, translation and stamps before you send them, so nothing comes back.",
  reviewCta: "See the document review",
  sourcesTitle: "Sources",
  sourceNames: {
    studyin: "Study in Czechia (Czech government): How to apply",
    embassy: "Czech Embassy in Cairo: Superlegalization of documents",
    fees: "Czech Embassy in Cairo: Consular and visa fees",
    msmt: "Czech Ministry of Education: Recognition of foreign education except higher education (in Czech)",
    muni: "Masaryk University: Verification of the condition for admission",
    cuni: "Charles University: How to apply",
  },
  source: "Source",
};

const ar: GuideCopy = {
  title: "من الثانوية العامة إلى جامعة تشيكية",
  subtitle:
    "كيف تصدّق شهادة الثانوية العامة المصرية وتعادلها لتتقدم إلى البكالوريوس أو الماجستير الطويل في التشيك، من المصادر الرسمية فقط.",
  checked: `راجعنا هذه المعلومات على الصفحات الرسمية بتاريخ ${CHECKED.ar}. القواعد والرسوم قد تتغير، لذا افتح روابط المصادر قبل أي خطوة.`,
  shortTitle: "الإجابة المختصرة",
  short: [
    { text: "لبدء البكالوريوس أو ماجستير طويل مثل الطب، تحتاج إلى شهادة ثانوية مكتملة، ومعادلة في التشيك إذا صدرت في الخارج.", source: "studyin" },
    { text: "هناك طريقان: اعتراف الكلية، وهو صالح لقبولها فقط، أو المعادلة (النوستريفيكاتسي) لدى مكتب الإقليم التشيكي، وهي صالحة في كل مكان لكنها أبطأ.", source: "studyin" },
    { text: "للمعادلة، يجب أولًا تصديق شهادة الثانوية العامة في مصر، ثم التصديق الأعلى في السفارة التشيكية بالقاهرة.", source: "msmt" },
    { text: "رسوم المعادلة 3,000 كرونة، ويصدر القرار خلال 30 يومًا من تقديم طلب مكتمل.", source: "msmt" },
    { text: "ابدأ قبل بداية الدراسة بـ 6 إلى 9 أشهر.", source: "studyin" },
    { text: "معادلة شهادتك الجامعية التشيكية لاحقًا في مصر إجراء منفصل.", link: { href: "/recognition/egypt", label: "المعادلة في مصر" } },
    { text: "هذه خطوة من خطوات الدراسة في التشيك من مصر.", link: { href: "/study-in-czechia-from-egypt", label: "كل الخطوات" } },
  ],
  sections: [
    {
      id: "appointment",
      title: "1. تصديق الشهادة: في مصر ثم في السفارة التشيكية",
      intro: "التصديق الأعلى يجعل المستند المصري صالحًا في التشيك. السفارة تقبل الأصول فقط، لا النسخ.",
      items: [
        { text: "أولًا تصدّق الجهة المصرية المختصة، وغالبًا وزارة الخارجية، على التوقيع في المستند بختم أو ملصق.", source: "embassy" },
        { text: "إذا كان المستند من عدة صفحات، يجب ربطها معًا وختمها من وزارة الخارجية، أو وضع ختم وتوقيع التصديق على كل صفحة.", source: "embassy" },
        { text: "ترجم المستند من العربية إلى التشيكية.", source: "embassy" },
        { text: "الحجز بالبريد الإلكتروني فقط إلى cairo.consulate@mzv.gov.cz: رسالة واحدة لكل متقدم، وفي العنوان كلمة \"Superlegalization\"، مع اسم المستند واسمك الكامل كما في الجواز.", source: "embassy" },
        { text: "تُستقبل الطلبات يوم الأحد من 9:00 إلى 11:30. أحضر رسالة التأكيد مطبوعة، واستمارة الطلب مملوءة، ونسخة من الجواز، والمستند الأصلي، والرسوم.", source: "embassy" },
        { text: `الرسوم ${FEE} جنيهًا للمستند الواحد.`, source: "fees" },
        { text: "يستغرق عادةً أسبوعًا: تسلّمه يوم أحد وتستلمه الأحد التالي بين 14:00 و15:00.", source: "embassy" },
      ],
    },
    {
      id: "during",
      title: "2. الطريق الأول: اعتراف الكلية",
      intro: "أسرع، لكنه صالح فقط للقبول في الكلية التي تراجع الشهادة.",
      items: [
        { text: "تقدّم شهادتك الأجنبية مع أي مستندات أخرى تطلبها الكلية، وتتحقق الكلية من أنها تؤهلك لدراسة البكالوريوس. قد يكون لهذا التحقق رسوم.", source: "muni" },
        { text: "ليس إقرارًا بالمعادلة، ويسري فقط على القبول في تلك الكلية. ميزته أنه يستغرق وقتًا أقل من المعادلة.", source: "muni" },
        { text: "جامعة تشارلز مثلًا تعترف بالتعليم الثانوي الأجنبي للقبول في برامجها هي فقط.", source: "cuni" },
        { text: "كل كلية تحدد مستنداتها ومواعيدها، فاقرأ صفحة القبول في الكلية التي تتقدم إليها.", source: "muni" },
      ],
    },
    {
      id: "after",
      title: "3. الطريق الثاني: المعادلة لدى مكتب الإقليم",
      intro: "صالحة بشكل دائم ولأي غرض، بما في ذلك أي جامعة، لكنها أعقد وأبطأ.",
      items: [
        { text: "قدّم إلى قسم التعليم في مكتب الإقليم (krajský úřad) التابع لمكان إقامتك في التشيك. إذا تعذّر تحديده، يُعتمد مكان تقديم الطلب.", source: "msmt" },
        { text: "أرفق الشهادة الأصلية أو نسخة موثقة، ومستندًا يبيّن محتوى دراستك ونطاقها، وإثباتًا أن مدرستك معترف بها من الدولة المصرية إذا لم تذكر الشهادة ذلك.", source: "msmt" },
        { text: "أضف ترجمة تشيكية موثقة لهذه المستندات، من مترجم مسجّل في التشيك.", source: "msmt" },
        { text: "يجب أن تكون التوقيعات والأختام مصدّقة من السفارة التشيكية ومن وزارة الخارجية المصرية: أي التصديق في الخطوة 1.", source: "msmt" },
        { text: "أرفق إثبات مكان إقامتك في التشيك، وتوكيلًا إذا قدّم أحد الطلب نيابةً عنك.", source: "msmt" },
        { text: "الرسوم الإدارية 3,000 كرونة.", source: "msmt" },
        { text: "يصدر القرار خلال 30 يومًا من استلام طلب مكتمل، ويمكن مدّها 30 يومًا أخرى في الحالات المعقدة.", source: "msmt" },
        { text: "إذا اختلفت دراستك جزئيًا عن المقابل التشيكي، تؤدي أولًا امتحان معادلة. وإذا اختلفت اختلافًا جوهريًا، يُرفض الطلب. يمكنك التظلم إلى وزارة التعليم خلال 15 يومًا.", source: "msmt" },
      ],
    },
  ],
  noteTitle: "معادلتان مختلفتان",
  note: "المعادلة هنا تخص شهادة الثانوية العامة لتدخل جامعة تشيكية. أما معادلة شهادتك الجامعية التشيكية لاحقًا في مصر فهي إجراء آخر لدى المجلس الأعلى للجامعات، ورابطه في الإجابة المختصرة أعلاه.",
  reviewTitle: "تريد مراجعة مستنداتك أولًا؟",
  reviewBody: "أراجع شهادتك والترجمة والأختام قبل الإرسال، حتى لا يعود شيء.",
  reviewCta: "تفاصيل مراجعة المستندات",
  sourcesTitle: "المصادر",
  sourceNames: {
    studyin: "Study in Czechia (الحكومة التشيكية): كيف تتقدم",
    embassy: "السفارة التشيكية بالقاهرة: التصديق الأعلى للمستندات",
    fees: "السفارة التشيكية بالقاهرة: الرسوم القنصلية ورسوم التأشيرات",
    msmt: "وزارة التعليم التشيكية: معادلة التعليم الأجنبي عدا الجامعي (بالتشيكية)",
    muni: "جامعة ماساريك: التحقق من شرط القبول",
    cuni: "جامعة تشارلز: كيف تتقدم",
  },
  source: "المصدر",
};

export default function ThanaweyaClient() {
  return <RecognitionGuide sources={SOURCES} en={en} ar={ar} placement="thanaweya" />;
}
