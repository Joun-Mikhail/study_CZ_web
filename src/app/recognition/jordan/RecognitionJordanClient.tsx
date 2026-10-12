"use client";

import { RecognitionGuide, type GuideCopy } from "../RecognitionGuide";

/** Every fact on this page comes from one of these official pages. */
const SOURCES = {
  rceFaq: "https://rce.mohe.gov.jo/FAQ",
  rceLanguage: "https://rce.mohe.gov.jo/StudyLanguage",
  rceRecognised: "https://rce.mohe.gov.jo/RecognizedUniversities",
  rceDocuments: "https://rce.mohe.gov.jo/Documents",
  rceApp: "https://rceapp.mohe.gov.jo/",
  embassyAmman: "https://mzv.gov.cz/amman/en/visa_and_consular_information/verifications_legalizations_and/index.html",
  czRegister: "https://regvssp.msmt.cz/registrvssp/",
  czNostrification: "https://portal.gov.cz/en/sluzby-vs/recognition-of-foreign-education-nostrification-provided-by-a-foreign-school-in-agreement-with-the-ministry-S5904",
} as const;

const QA_LINK = { en: "Nostrification documents (Q&A)", ar: "أوراق النوستريفيكاتسي (الأسئلة الشائعة)" };

const en: GuideCopy = {
  title: "Will my Czech degree count in Jordan?",
  subtitle: "Recognition of Czech university degrees in Jordan, step by step, from official sources only.",
  checked: "Checked against the official pages on 12 October 2026. Rules can change, so open the source links before you act.",
  shortTitle: "The short answer",
  short: [
    { text: "In Jordan, the Ministry's Directorate of Recognition and Equivalency decides whether a foreign degree is equivalent, and you apply online.", source: "rceFaq" },
    { text: "The university must be on the Ministry's list of recognised universities. For Czechia the list has 22 universities, all public; private Czech universities are not on it. The specialisation must also be recognised by the Czech authorities.", source: "rceRecognised" },
    { text: "Bachelor's taught in English: in countries that don't speak English, Jordan accepts an English programme only if it is taught to local and foreign students together, and you must show you know the local language when you graduate. A programme only for foreign students is not accepted. For master's and doctoral study, English is allowed.", source: "rceLanguage" },
    { text: "You must actually live in Czechia while you study: at least 8 months for each year of a bachelor's, and at least 6 months (two semesters) for a master's, with every stay at least two months in a row or one semester.", source: "rceFaq" },
  ],
  sections: [
    {
      id: "before",
      title: "1. Before you choose and leave",
      items: [
        { text: "Check that your university is on the Ministry's recognised list for Czechia (search by country).", source: "rceRecognised" },
        { text: "Check your Tawjihi average against the Ministry's minimum for studying abroad: 90% for medicine and dentistry; 80% for engineering, architecture, pharmacy and veterinary medicine; 75% for IT specialisations (except computer engineering); 70% for nursing and allied health; 65% for law; 60% for other subjects.", source: "rceFaq" },
        { text: "If you want an English-taught bachelor's, ask the Directorate before you enrol whether that programme meets the language rule, because programmes only for foreign students are not accepted.", source: "rceLanguage" },
        { text: "The Czech Embassy in Amman superlegalises documents by appointment, booked by email, on Sundays, Tuesdays and Thursdays from 9:00 to 12:00. Documents are collected the next consular day. The embassy does not translate; it verifies English–Czech translations.", source: "embassyAmman" },
        { text: "Your Tawjihi is recognised in Czechia by nostrification at a Czech regional authority.", source: "czNostrification", link: { href: "/qa/#docs-nostrification", label: QA_LINK.en } },
      ],
    },
    {
      id: "during",
      title: "2. While you study",
      items: [
        { text: "Keep the passport you use during your studies. The equivalency application asks for it (or your entry and exit record) and for a table of your travel for every semester, to prove the residence rule.", source: "rceDocuments" },
        { text: "If your bachelor's is taught in English, get a document proving you know Czech before you graduate.", source: "rceLanguage" },
        { text: "If you change university, every university you study at must be on the recognised list.", source: "rceFaq" },
      ],
    },
    {
      id: "after",
      title: "3. After you graduate: equivalency in Jordan",
      items: [
        { text: "Have your diploma and transcript stamped by the Jordanian cultural counsellor in Czechia (if there is one), by the Czech Embassy in Jordan, and by the Jordanian Ministry of Foreign Affairs.", source: "rceDocuments" },
        { text: "Documents that are not in Arabic or English need a translation, and if you studied in a language other than Arabic or English, include your preparatory language year.", source: "rceDocuments" },
        { text: "Apply online on the equivalency system (rceapp.mohe.gov.jo), upload your documents and pay through eFAWATEERcom. The Ministry's FAQ lists 50 JD for a bachelor's, 75 JD for a master's and 100 JD for a doctorate for Jordanians, three times as much for non-Jordanians; an older table on its documents page shows lower amounts, so confirm the fee in the system.", source: "rceFaq" },
        { text: "Bring all certified originals when you collect your equivalency. Medicine and pharmacy graduates also need the certified letter for their additional training year.", source: "rceDocuments" },
        { text: "You can appeal a decision within 60 days of being notified, with documents supporting your appeal.", source: "rceDocuments" },
      ],
    },
  ],
  noteTitle: "Medicine and other licensed professions",
  note: "Equivalency is about the degree. Working as a doctor, dentist or pharmacist in Jordan also needs a licence, with its own rules set by the Jordanian health authorities and professional associations. Check their current requirements before you choose a programme.",
  reviewTitle: "Want your documents checked before you send them?",
  reviewBody: "I go through every page the way the embassy officer will, before you submit.",
  reviewCta: "See the document review",
  sourcesTitle: "Sources",
  sourceNames: {
    rceFaq: "Jordan Ministry: Directorate of Recognition and Equivalency, frequently asked questions",
    rceLanguage: "Jordan Ministry: language of study at recognised foreign universities",
    rceRecognised: "Jordan Ministry: recognised foreign universities (search Czechia)",
    rceDocuments: "Jordan Ministry: documents required for equivalency",
    rceApp: "Jordan Ministry: online equivalency application",
    embassyAmman: "Czech Embassy in Amman: verifications and superlegalisations",
    czRegister: "Czech Ministry of Education: register of universities",
    czNostrification: "Czech government portal: who recognises foreign secondary certificates",
  },
  source: "Source",
};

const ar: GuideCopy = {
  title: "هل تُعادَل شهادتي التشيكية في الأردن؟",
  subtitle: "معادلة شهادات الجامعات التشيكية في الأردن خطوة بخطوة، من المصادر الرسمية فقط.",
  checked: "راجعنا هذه المعلومات على الصفحات الرسمية بتاريخ 12 أكتوبر 2026. القواعد قد تتغير، لذا افتح روابط المصادر قبل أي خطوة.",
  shortTitle: "الإجابة المختصرة",
  short: [
    { text: "في الأردن تتولى مديرية الاعتراف ومعادلة الشهادات في الوزارة معادلة الشهادات غير الأردنية، ويُقدَّم الطلب إلكترونيًا.", source: "rceFaq" },
    { text: "يجب أن تكون الجامعة ضمن قائمة الجامعات غير الأردنية المعترف بها لدى الوزارة. تضم القائمة 22 جامعة تشيكية كلها حكومية، والجامعات التشيكية الخاصة ليست عليها. ويُشترط أيضًا اعتراف الجهة المسؤولة عن التعليم العالي في التشيك بالتخصص.", source: "rceRecognised" },
    { text: "البكالوريوس بالإنجليزية: في الدول غير الناطقة بالإنجليزية يُعتمد البرنامج المدرَّس بلغة غير اللغة المحلية فقط إذا كان مشتركًا للطلبة المحليين والأجانب معًا، مع وثيقة تثبت إتقانك لغة البلد عند التخرج. ولا يُعتمد البرنامج الموجَّه للطلبة الأجانب فقط. أما الماجستير والدكتوراه فيُسمح بدراستهما بالإنجليزية.", source: "rceLanguage" },
    { text: "يجب أن تقيم فعليًا في التشيك أثناء الدراسة: 8 أشهر على الأقل عن كل سنة من سنوات البكالوريوس، و6 أشهر على الأقل (فصلان دراسيان) للماجستير، على ألا تقل كل فترة إقامة عن شهرين متصلين أو فصل دراسي.", source: "rceFaq" },
  ],
  sections: [
    {
      id: "before",
      title: "1. قبل أن تختار وتسافر",
      items: [
        { text: "تأكد أن جامعتك ضمن قائمة الجامعات المعترف بها لدى الوزارة في التشيك (البحث حسب الدولة).", source: "rceRecognised" },
        { text: "قارن معدلك في التوجيهي بالحد الأدنى الذي تشترطه الوزارة للدراسة في الخارج: 90% للطب وطب الأسنان، و80% للهندسة والعمارة والصيدلة والطب البيطري، و75% لتخصصات تكنولوجيا المعلومات (عدا هندسة الحاسوب)، و70% للتمريض والعلوم الطبية المساندة، و65% للقانون، و60% لباقي التخصصات.", source: "rceFaq" },
        { text: "إذا كنت تريد بكالوريوس بالإنجليزية، فاسأل المديرية قبل التسجيل هل يحقق البرنامج شرط لغة الدراسة، لأن البرامج الموجَّهة للأجانب فقط لا تُعتمد.", source: "rceLanguage" },
        { text: "تصدّق السفارة التشيكية في عمّان المستندات بموعد مسبق يُحجز بالبريد الإلكتروني، أيام الأحد والثلاثاء والخميس من 9:00 إلى 12:00، وتُستلم في يوم العمل القنصلي التالي. السفارة لا تترجم، بل تصدّق الترجمات بين الإنجليزية والتشيكية.", source: "embassyAmman" },
        { text: "شهادة التوجيهي تُعادَل في التشيك عن طريق النوستريفيكاتسي لدى مكتب الإقليم التشيكي.", source: "czNostrification", link: { href: "/qa/#docs-nostrification", label: QA_LINK.ar } },
      ],
    },
    {
      id: "during",
      title: "2. أثناء الدراسة",
      items: [
        { text: "احتفظ بجواز السفر الذي تستخدمه أثناء الدراسة؛ فطلب المعادلة يطلبه (أو كشف الإقامة والحدود) مع جدول حركات السفر لكل فصل دراسي لإثبات شرط الإقامة.", source: "rceDocuments" },
        { text: "إذا كان البكالوريوس بالإنجليزية، فاحصل قبل التخرج على وثيقة تثبت إتقانك اللغة التشيكية.", source: "rceLanguage" },
        { text: "إذا انتقلت من جامعة إلى أخرى، فيجب أن تكون كل الجامعات التي درست فيها معترفًا بها لدى الوزارة.", source: "rceFaq" },
      ],
    },
    {
      id: "after",
      title: "3. بعد التخرج: المعادلة في الأردن",
      items: [
        { text: "اختم الشهادة وكشف المواد من المستشار الثقافي الأردني في التشيك (إن وُجد)، ثم من سفارة التشيك في الأردن، ثم من وزارة الخارجية الأردنية.", source: "rceDocuments" },
        { text: "المستندات التي ليست بالعربية أو الإنجليزية تحتاج ترجمة، وإذا درست بلغة غير العربية والإنجليزية فأرفق السنة التحضيرية للغة.", source: "rceDocuments" },
        { text: "قدّم الطلب إلكترونيًا على نظام المعادلة (rceapp.mohe.gov.jo)، وارفع المستندات وادفع عبر إي-فواتيركم. تذكر الأسئلة الشائعة في الوزارة 50 دينارًا للبكالوريوس و75 دينارًا للماجستير و100 دينار للدكتوراه للأردني، وثلاثة أمثالها لغير الأردني؛ ويظهر جدول أقدم في صفحة الوثائق بمبالغ أقل، لذا تأكد من الرسوم في النظام عند التقديم.", source: "rceFaq" },
        { text: "أحضر جميع الأصول المصدقة عند استلام المعادلة. وخريجو الطب والصيدلة يحتاجون أيضًا كتاب سنة التدريب الإضافية مصدقًا.", source: "rceDocuments" },
        { text: "يمكنك الاعتراض على القرار خلال 60 يومًا من تاريخ التبليغ، مع الوثائق التي تدعم اعتراضك.", source: "rceDocuments" },
      ],
    },
  ],
  noteTitle: "الطب والمهن التي تحتاج ترخيصًا",
  note: "المعادلة تخص الشهادة نفسها. أما العمل طبيبًا أو طبيب أسنان أو صيدليًا في الأردن فيحتاج أيضًا إلى ترخيص له قواعده الخاصة لدى الجهات الصحية والنقابات المهنية الأردنية. راجع شروطها الحالية قبل أن تختار البرنامج.",
  reviewTitle: "هل تريد مراجعة أوراقك قبل إرسالها؟",
  reviewBody: "أراجع كل صفحة كما سيراجعها موظف السفارة، قبل أن تقدّم.",
  reviewCta: "تفاصيل خدمة مراجعة الأوراق",
  sourcesTitle: "المصادر",
  sourceNames: {
    rceFaq: "الوزارة الأردنية: مديرية الاعتراف ومعادلة الشهادات، الأسئلة الأكثر تكرارًا",
    rceLanguage: "الوزارة الأردنية: لغة الدراسة في الجامعات غير الأردنية المعترف بها",
    rceRecognised: "الوزارة الأردنية: الجامعات غير الأردنية المعترف بها (ابحث عن التشيك)",
    rceDocuments: "الوزارة الأردنية: الوثائق المطلوبة لمعادلة الشهادات",
    rceApp: "الوزارة الأردنية: طلب المعادلة الإلكتروني",
    embassyAmman: "السفارة التشيكية في عمّان: التصديقات",
    czRegister: "وزارة التعليم التشيكية: سجل الجامعات",
    czNostrification: "البوابة الحكومية التشيكية: من يعادل شهادات الثانوية الأجنبية",
  },
  source: "المصدر",
};

export default function RecognitionJordanClient() {
  return <RecognitionGuide sources={SOURCES} en={en} ar={ar} />;
}
