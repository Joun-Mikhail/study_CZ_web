"use client";

import { RECOGNITION_EGYPT_SOURCES as SOURCES } from "@/data/recognition-egypt-sources";
import { RecognitionGuide, type GuideCopy } from "../RecognitionGuide";

const QA_LINK = { en: "Nostrification documents (Q&A)", ar: "أوراق النوستريفيكاتسي (الأسئلة الشائعة)" };

const CHECKED = { en: "12 October 2026", ar: "12 أكتوبر 2026" };

const en: GuideCopy = {
  title: "Will my Czech degree count in Egypt?",
  subtitle: "Recognition of Czech university degrees in Egypt, step by step, from official sources only.",
  checked: `Checked against the official pages on ${CHECKED.en}. Rules can change, so open the source links before you act.`,
  shortTitle: "The short answer",
  short: [
    { text: "In Egypt, only the Supreme Council of Universities (SCU) can make a foreign degree equivalent to an Egyptian one.", source: "scuFaq" },
    { text: "It decides case by case, after you graduate and apply with your documents. Nobody can promise the result in advance, including us.", source: "scuFaq" },
    { text: "The SCU requires the university to be recognised by the education ministry of its own country. In Czechia, that is the Ministry of Education's register of universities.", source: "scuFaq" },
    { text: "For practical (scientific) subjects, the SCU requires full-time study.", source: "scuFaq" },
  ],
  sections: [
    {
      id: "before",
      title: "1. Before you leave Egypt: documents for Czechia",
      intro: "Egyptian documents for Czech universities and for the visa go through superlegalisation: a two-step check, first in Egypt, then at the Czech Embassy.",
      items: [
        { text: "First, the Egyptian authorities (usually the Ministry of Foreign Affairs) verify the signature and stamp the document.", source: "embassyLegalisation" },
        { text: "Then the Czech Embassy in Cairo superlegalises it. It accepts originals only, not copies or certified copies.", source: "embassyLegalisation" },
        { text: "Book by email to the embassy's consular department; requests are taken on Sundays, 9:00 to 11:30, and usually take about a week.", source: "embassyLegalisation" },
        { text: "Documents in Arabic need a Czech translation. English documents that are not for the visa don't.", source: "embassyLegalisation" },
        { text: "For the student visa, your criminal record extract from the Ministry of Interior must be translated into Czech and superlegalised. Arabic or English versions are not accepted.", source: "embassyStudyVisa" },
        { text: "Your secondary school certificate is recognised in Czechia by nostrification at a Czech regional authority. Our Q&A lists the documents it needs.", source: "czNostrification", link: { href: "/qa/#docs-nostrification", label: QA_LINK.en } },
      ],
    },
    {
      id: "during",
      title: "2. Before you choose: protect your equivalency",
      items: [
        { text: "Look the university up by name in the Czech Ministry of Education's register of universities.", source: "czRegister" },
        { text: "Choose full-time study if your subject is practical (medicine, engineering, sciences and similar). The SCU requires it.", source: "scuFaq" },
        { text: "Keep your original diploma and transcript safe. The SCU keeps the documents you send and does not return them, so it accepts certified true copies.", source: "scuGuidelines" },
      ],
    },
    {
      id: "after",
      title: "3. After you graduate: equivalency in Egypt",
      items: [
        { text: "Legalise your diploma: first at the Czech Ministry of Education, then either at the Egyptian cultural office in Czechia, or at the Czech Embassy in Cairo followed by the Egyptian Ministry of Foreign Affairs.", source: "scuGuidelines" },
        { text: "Documents must be in Arabic or English, or come with a certified Arabic or English translation. A diploma in Czech needs one.", source: "scuGuidelines" },
        { text: "Apply online on the SCU equivalency system (equ.scu.eg) and pay by card or at Banque Misr. For Egyptians: 1,500 EGP for a bachelor's, 2,500 EGP for a master's, 3,000 EGP for a doctorate. Non-Egyptians pay 300, 400 or 500 USD.", source: "scuGuidelines" },
        { text: "Print the request report and send it by express post (Egypt Post EMS, DHL, Aramex, FedEx…) with the legalised documents (or certified true copies) and the payment receipt to: Equivalency Department, Supreme Council of Universities, Cairo University building, Giza.", source: "scuPortal" },
        { text: "Since 14 April 2023, the SCU only accepts these requests by express post, not in person. Follow your request and ask questions in the online system; replies take about two working days.", source: "scuPortal" },
        { text: "Someone else can handle it for you: a relative whose name shows the relationship, or anyone with a power of attorney.", source: "scuFaq" },
      ],
    },
  ],
  noteTitle: "Medicine and other licensed professions",
  note:
    "Equivalency is about the degree. Working as a doctor, dentist or pharmacist in Egypt also needs a licence, with its own rules set by the Egyptian health authorities. Check their current requirements before you choose a programme.",
  reviewTitle: "Want your documents checked before you send them?",
  reviewBody: "I go through every page the way the embassy officer will, before you submit.",
  reviewCta: "See the document review",
  sourcesTitle: "Sources",
  sourceNames: {
    scuFaq: "Supreme Council of Universities: Equivalency Department (FAQ)",
    scuPortal: "SCU online equivalency system",
    scuGuidelines: "SCU equivalency system: guidelines and fees",
    embassyLegalisation: "Czech Embassy in Cairo: superlegalisation",
    embassyStudyVisa: "Czech Embassy in Cairo: long-term study visa",
    czRegister: "Czech Ministry of Education: register of universities",
    czNostrification: "Czech government portal: who recognises foreign secondary certificates",
  },
  source: "Source",
};

const ar: GuideCopy = {
  title: "هل تُعادَل شهادتي التشيكية في مصر؟",
  subtitle: "معادلة شهادات الجامعات التشيكية في مصر خطوة بخطوة، من المصادر الرسمية فقط.",
  checked: `راجعنا هذه المعلومات على الصفحات الرسمية بتاريخ ${CHECKED.ar}. القواعد قد تتغير، لذا افتح روابط المصادر قبل أي خطوة.`,
  shortTitle: "الإجابة المختصرة",
  short: [
    { text: "في مصر، المجلس الأعلى للجامعات هو الجهة الوحيدة التي تعادل الشهادات الأجنبية بنظيرتها المصرية.", source: "scuFaq" },
    { text: "تتم المعادلة حالة بحالة، بعد التخرج وتقديم الطلب بالمستندات. لا أحد يستطيع أن يضمن النتيجة مسبقًا، ونحن منهم.", source: "scuFaq" },
    { text: "يشترط المجلس أن تكون الجامعة معترفًا بها من وزارة التعليم العالي في بلدها. في التشيك، المرجع هو سجل الجامعات لدى وزارة التعليم.", source: "scuFaq" },
    { text: "في التخصصات العملية يشترط المجلس أن تكون الدراسة بانتظام كامل (Full Time).", source: "scuFaq" },
  ],
  sections: [
    {
      id: "before",
      title: "1. قبل السفر: أوراقك المصرية للتشيك",
      intro: "تمر المستندات المصرية المطلوبة للجامعات التشيكية وللتأشيرة بإجراء التصديق المزدوج (Superlegalisation): تصديق في مصر أولًا، ثم في السفارة التشيكية.",
      items: [
        { text: "أولًا تصدّق الجهات المصرية المختصة (غالبًا وزارة الخارجية) على التوقيع وتختم المستند.", source: "embassyLegalisation" },
        { text: "ثم تصدّقه السفارة التشيكية في القاهرة. السفارة تقبل الأصول فقط، ولا تقبل الصور ولا الصور الموثقة.", source: "embassyLegalisation" },
        { text: "الحجز بالبريد الإلكتروني لقسم القنصلية بالسفارة، والطلبات تُستقبل يوم الأحد من 9:00 إلى 11:30، وتستغرق عادةً نحو أسبوع.", source: "embassyLegalisation" },
        { text: "المستندات العربية تحتاج ترجمة إلى التشيكية، أما المستندات الإنجليزية التي ليست للتأشيرة فلا تحتاج.", source: "embassyLegalisation" },
        { text: "للتأشيرة الدراسية، يجب ترجمة صحيفة الحالة الجنائية الصادرة من وزارة الداخلية إلى التشيكية وتصديقها. النسخة العربية أو الإنجليزية غير مقبولة.", source: "embassyStudyVisa" },
        { text: "شهادة الثانوية تُعادَل في التشيك عن طريق النوستريفيكاتسي لدى مكتب الإقليم التشيكي. صفحة الأسئلة عندنا فيها قائمة الأوراق المطلوبة.", source: "czNostrification", link: { href: "/qa/#docs-nostrification", label: QA_LINK.ar } },
      ],
    },
    {
      id: "during",
      title: "2. قبل أن تختار: احمِ فرصتك في المعادلة",
      items: [
        { text: "ابحث عن الجامعة بالاسم في سجل الجامعات لدى وزارة التعليم التشيكية.", source: "czRegister" },
        { text: "إذا كان تخصصك عمليًا (الطب، الهندسة، العلوم وما يشبهها) فاختر الدراسة بانتظام كامل، لأن المجلس يشترط ذلك.", source: "scuFaq" },
        { text: "احتفظ بأصل الشهادة وكشف الدرجات. المجلس لا يعيد المستندات المرسلة إليه، لذلك يقبل صورًا طبق الأصل.", source: "scuGuidelines" },
      ],
    },
    {
      id: "after",
      title: "3. بعد التخرج: المعادلة في مصر",
      items: [
        { text: "وثّق شهادتك: أولًا من وزارة التعليم التشيكية، ثم إما من المكتب الثقافي المصري في التشيك، أو من السفارة التشيكية في القاهرة ثم وزارة الخارجية المصرية.", source: "scuGuidelines" },
        { text: "تُقدَّم المستندات بالعربية أو الإنجليزية، أو مع ترجمة معتمدة إلى إحداهما. الشهادة المكتوبة بالتشيكية تحتاج ترجمة.", source: "scuGuidelines" },
        { text: "قدّم الطلب إلكترونيًا على نظام معادلة الدرجات العلمية (equ.scu.eg) وادفع بالبطاقة أو في بنك مصر. للمصريين: 1,500 جنيه للبكالوريوس، 2,500 جنيه للماجستير، 3,000 جنيه للدكتوراه. لغير المصريين: 300 أو 400 أو 500 دولار.", source: "scuGuidelines" },
        { text: "اطبع تقرير الطلب وأرسله بالبريد السريع (البريد المصري EMS، DHL، Aramex، FedEx…) مع المستندات الموثقة (أو صور طبق الأصل) وإيصال الدفع إلى: إدارة المعادلات، المجلس الأعلى للجامعات، مبنى جامعة القاهرة، الجيزة.", source: "scuPortal" },
        { text: "منذ 14 أبريل 2023 لا يستقبل المجلس هذه الطلبات إلا بالبريد السريع، وليس حضوريًا. تابع طلبك واسأل عبر النظام الإلكتروني، والرد خلال يومي عمل تقريبًا.", source: "scuPortal" },
        { text: "يمكن أن ينوب عنك قريب يظهر في اسمه صلة القرابة، أو أي شخص بتوكيل.", source: "scuFaq" },
      ],
    },
  ],
  noteTitle: "الطب والمهن التي تحتاج ترخيصًا",
  note:
    "المعادلة تخص الشهادة نفسها. أما العمل طبيبًا أو طبيب أسنان أو صيدليًا في مصر فيحتاج أيضًا إلى ترخيص له قواعده الخاصة لدى الجهات الصحية المصرية. راجع شروطها الحالية قبل أن تختار البرنامج.",
  reviewTitle: "هل تريد مراجعة أوراقك قبل إرسالها؟",
  reviewBody: "أراجع كل صفحة كما سيراجعها موظف السفارة، قبل أن تقدّم.",
  reviewCta: "تفاصيل خدمة مراجعة الأوراق",
  sourcesTitle: "المصادر",
  sourceNames: {
    scuFaq: "المجلس الأعلى للجامعات: الإدارة العامة لمعادلة الدرجات العلمية (الأسئلة الشائعة)",
    scuPortal: "النظام الإلكتروني لمعادلة الدرجات العلمية",
    scuGuidelines: "النظام الإلكتروني للمعادلة: الإرشادات والرسوم",
    embassyLegalisation: "السفارة التشيكية في القاهرة: التصديق (Superlegalization)",
    embassyStudyVisa: "السفارة التشيكية في القاهرة: تأشيرة الدراسة طويلة الأجل",
    czRegister: "وزارة التعليم التشيكية: سجل الجامعات",
    czNostrification: "البوابة الحكومية التشيكية: من يعادل شهادات الثانوية الأجنبية",
  },
  source: "المصدر",
};

export default function RecognitionEgyptClient() {
  return <RecognitionGuide sources={SOURCES} en={en} ar={ar} />;
}
