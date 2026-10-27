"use client";

import { RecognitionGuide, type GuideCopy } from "../recognition/RecognitionGuide";

/** Every fact on this page comes from one of these official pages. */
const SOURCES = {
  studyVisa: "https://mzv.gov.cz/cairo/en/visa_and_consular_information/long_term_visa/study_long_term_visa_to_the_czech/index.html",
  appointment: "https://mzv.gov.cz/cairo/en/visa_and_consular_information/long_term_visa/make_an_appointment/index.html",
  fees: "https://mzv.gov.cz/cairo/en/visa_and_consular_information/consular_and_visa_fees/index.html",
  legalisation: "https://mzv.gov.cz/cairo/en/visa_and_consular_information/consular_services_1/legalization_of_documents/index.html",
  fundsInterior: "https://frs.gov.cz/en/forms-and-documents/documents/proof-of-funds-for-the-residence-finances/",
  fundsForeign: "https://mzv.gov.cz/jnp/en/information_for_aliens/supporting_documents_overview/financial_means.html",
} as const;

const CHECKED = { en: "18 October 2026", ar: "18 أكتوبر 2026" };

const en: GuideCopy = {
  title: "Czech student visa from Egypt",
  subtitle: "How to apply for a long-term study visa at the Czech Embassy in Cairo, step by step, from official sources only.",
  checked: `Checked against the official pages on ${CHECKED.en}. Rules and fees can change, so open the source links before you act.`,
  shortTitle: "The short answer",
  short: [
    { text: "You apply in person at the Czech Embassy in Cairo for a long-term visa for study. Nobody can apply or speak for you.", source: "studyVisa" },
    { text: "You book the appointment by email only. If your request is valid, the embassy confirms within 15 days.", source: "appointment" },
    { text: "For one year of study you must show at least 115,810 CZK.", source: "fundsInterior" },
    { text: "The fee is 6,029 EGP (valid from 1 October 2026).", source: "fees" },
    { text: "The Czech Ministry of the Interior decides, and it can take up to 60 days.", source: "studyVisa" },
  ],
  sections: [
    {
      id: "before",
      title: "1. Prepare your documents",
      intro: "Have every document ready before you email for an appointment. If anything is missing, the embassy cannot accept your application.",
      items: [
        { text: "Passport valid for at least 3 months after the visa ends (the visa is given for one year), with at least 2 blank pages. If it will expire, renew it before you apply.", source: "studyVisa" },
        { text: "Two passport photos, 35×45 mm, taken in the last 6 months, on a plain light background (ICAO standard). Glue one to the form; don't staple it.", source: "studyVisa" },
        { text: "The application form, filled in and signed. Your fingerprints are taken when you hand it in.", source: "studyVisa" },
        { text: "The university's letter of acceptance. It comes in English and Czech: you hand in the original Czech letter and keep the English one.", source: "studyVisa" },
        { text: "Proof of accommodation in Czech, in your name: the university's certificate for a dormitory, or a rental contract you signed. Bring the original.", source: "studyVisa" },
        { text: "Bank statements for the last 6 months, stamped and signed by the bank. If they are a parent's, add a financial guarantee letter. Bring an international credit or debit card in your name only as well.", source: "studyVisa" },
        { text: "A criminal record extract from the Egyptian Ministry of Interior, translated into Czech and superlegalised by the embassy, before you apply or on the day. Arabic or English versions are not accepted. It is needed for everyone over 15, and also from any country you lived in for 6 months or more in the last 3 years.", source: "studyVisa" },
        { text: "Book superlegalisation by email to cairo.consulate@mzv.gov.cz. Requests are taken on Sundays, 9:00 to 11:30, and usually take a week.", source: "legalisation", link: { href: "/recognition/egypt", label: "Legalisation step by step" } },
        { text: "Superlegalisation costs 2,894 EGP per document.", source: "fees" },
        { text: "Make A4 copies of everything: one folder of originals and one of copies.", source: "studyVisa" },
      ],
    },
    {
      id: "money",
      title: "2. How much money you must show",
      items: [
        { text: "The rule: 15 times the existential minimum (3,130 CZK), plus twice that amount for every further full month of your stay.", source: "fundsInterior" },
        { text: "One academic year (1 September to 31 August): (15 × 3,130) + (11 × 2 × 3,130) = 115,810 CZK. One semester (September to February): 78,250 CZK.", source: "fundsInterior" },
        { text: "Applicants under 18 show half these amounts.", source: "fundsForeign" },
        { text: "A scholarship or grant under an international agreement the Czech Republic is bound by can replace this proof. If it doesn't cover the full amount, you prove the difference.", source: "fundsForeign" },
        { text: "This is the amount the embassy asks you to prove. For tuition, living costs and the other expenses, see our cost guide.", link: { href: "/what-it-costs/", label: "What studying in Czechia costs" } },
      ],
    },
    {
      id: "appointment",
      title: "3. Book the appointment by email",
      items: [
        { text: "Write only to cairo.longtermvisa@mzv.gov.cz. An email that copies any other embassy address is discarded.", source: "appointment" },
        { text: "Subject line: only the purpose, in one word: Study.", source: "appointment" },
        { text: "Attach PDFs only, 2 MB at most: your passport data page and your enrolment letter or confirmation of study (translated if it isn't in English or Czech).", source: "appointment" },
        { text: "In the email itself write your name, surname, date of birth, nationality, passport number, purpose of stay, phone and email.", source: "appointment" },
        { text: "One applicant, one email. More than one email for the same person disqualifies you, even from different addresses. Parents can include their minor children.", source: "appointment" },
        { text: "A valid request gets a confirmation within 15 days; no reply means it was discarded. Dates are fixed: if you cancel or miss yours, you start again by email.", source: "appointment" },
        { text: "Citizens of Egypt, Sudan, Eritrea, Yemen and Palestine can apply directly. Other nationalities need more than 2 years of non-tourist residence in Egypt.", source: "appointment" },
      ],
    },
    {
      id: "after",
      title: "4. On the day and after",
      items: [
        { text: "Arrive on time with both folders. You apply yourself; nobody can come in your place.", source: "studyVisa" },
        { text: "Pay the fee in cash in Egyptian pounds or by card in Czech crowns. The amount follows the monthly exchange rate.", source: "studyVisa" },
        { text: "The Ministry of the Interior decides, which can take up to 60 days. Don't email the embassy meanwhile: it won't reply. It tells you the decision by email or phone.", source: "studyVisa" },
        { text: "The visa lasts up to one year. Extend your stay with the Czech authorities before it ends, not at the embassy. If it expires first, you start the whole process again.", source: "studyVisa" },
        { text: "Nervous about questions at the embassy? Our free guide covers what students are commonly asked about their study plan.", link: { href: "/interview-prep", label: "Embassy interview prep" } },
      ],
    },
  ],
  noteTitle: "The embassy has the final word",
  note:
    "This page summarises the embassy's and the Interior Ministry's own pages on the date above. They can change the rules or fees at any time, so check the source links before you book or pay.",
  reviewTitle: "Want your visa documents checked first?",
  reviewBody: "I go through every page the way the embassy officer will, before your appointment.",
  reviewCta: "See the document review",
  sourcesTitle: "Sources",
  sourceNames: {
    studyVisa: "Czech Embassy in Cairo: long-term study visa",
    appointment: "Czech Embassy in Cairo: make an appointment",
    fees: "Czech Embassy in Cairo: consular and visa fees",
    legalisation: "Czech Embassy in Cairo: superlegalisation of documents",
    fundsInterior: "Czech Ministry of the Interior: proof of funds",
    fundsForeign: "Czech Ministry of Foreign Affairs: financial means",
  },
  source: "Source",
};

const ar: GuideCopy = {
  title: "تأشيرة الدراسة في التشيك من مصر",
  subtitle: "كيف تقدّم على تأشيرة الدراسة طويلة الأجل في السفارة التشيكية بالقاهرة، خطوة بخطوة، من المصادر الرسمية فقط.",
  checked: `راجعنا هذه المعلومات على الصفحات الرسمية بتاريخ ${CHECKED.ar}. القواعد والرسوم قد تتغير، لذا افتح روابط المصادر قبل أي خطوة.`,
  shortTitle: "الإجابة المختصرة",
  short: [
    { text: "تقدّم بنفسك في السفارة التشيكية بالقاهرة على تأشيرة طويلة الأجل بغرض الدراسة. لا يمكن لأحد أن يقدّم أو يتحدث نيابةً عنك.", source: "studyVisa" },
    { text: "حجز الموعد بالبريد الإلكتروني فقط. إذا كان طلبك صحيحًا، تؤكده السفارة خلال 15 يومًا.", source: "appointment" },
    { text: "لسنة دراسية كاملة يجب أن تُثبت امتلاكك 115,810 كرونة تشيكية على الأقل.", source: "fundsInterior" },
    { text: "رسوم التأشيرة 6,029 جنيهًا مصريًا (سارية من 1 أكتوبر 2026).", source: "fees" },
    { text: "وزارة الداخلية التشيكية هي التي تقرر، وقد يستغرق ذلك حتى 60 يومًا.", source: "studyVisa" },
  ],
  sections: [
    {
      id: "before",
      title: "1. جهّز مستنداتك",
      intro: "جهّز كل المستندات قبل أن ترسل طلب الموعد. إذا نقص أي مستند، لا تستطيع السفارة قبول طلبك.",
      items: [
        { text: "جواز سفر صالح لمدة 3 أشهر على الأقل بعد انتهاء التأشيرة (التأشيرة تُمنح لسنة)، وفيه صفحتان فارغتان على الأقل. إذا كان سينتهي، جدّده قبل التقديم.", source: "studyVisa" },
        { text: "صورتان مقاس 35×45 مم، ملتقطتان خلال آخر 6 أشهر، بخلفية فاتحة سادة (معيار ICAO). الصق واحدة على الاستمارة بالغراء ولا تدبّسها.", source: "studyVisa" },
        { text: "استمارة الطلب مملوءة وموقّعة. تؤخذ بصماتك عند تقديمها.", source: "studyVisa" },
        { text: "خطاب القبول من الجامعة. يصدر بالإنجليزية والتشيكية: تقدّم الأصل التشيكي وتحتفظ بالإنجليزي.", source: "studyVisa" },
        { text: "إثبات سكن باللغة التشيكية وباسمك: شهادة من الجامعة للسكن الجامعي، أو عقد إيجار موقّع منك. أحضر الأصل.", source: "studyVisa" },
        { text: "كشف حساب بنكي لآخر 6 أشهر، مختوم وموقّع من البنك. إذا كان باسم أحد الوالدين، أضف خطاب ضمان مالي. وأحضر معه بطاقة ائتمان أو خصم دولية باسمك أنت فقط.", source: "studyVisa" },
        { text: "صحيفة الحالة الجنائية من وزارة الداخلية المصرية، مترجمة إلى التشيكية ومصدّقة من السفارة، قبل التقديم أو يوم التقديم. النسخة العربية أو الإنجليزية غير مقبولة. مطلوبة لكل من تجاوز 15 عامًا، ومن أي بلد عشت فيه 6 أشهر متصلة أو أكثر خلال آخر 3 سنوات.", source: "studyVisa" },
        { text: "احجز التصديق بالبريد الإلكتروني إلى cairo.consulate@mzv.gov.cz. الطلبات تُستقبل يوم الأحد من 9:00 إلى 11:30، وتستغرق عادةً نحو أسبوع.", source: "legalisation", link: { href: "/recognition/egypt", label: "التصديق خطوة بخطوة" } },
        { text: "رسوم التصديق 2,894 جنيهًا للمستند الواحد.", source: "fees" },
        { text: "اصنع نسخًا بمقاس A4 من كل شيء: ملف للأصول وملف للنسخ.", source: "studyVisa" },
      ],
    },
    {
      id: "money",
      title: "2. كم من المال يجب أن تُثبت",
      items: [
        { text: "القاعدة: 15 ضعف الحد الأدنى للمعيشة (3,130 كرونة)، مضافًا إليها ضعف هذا المبلغ عن كل شهر كامل إضافي من إقامتك.", source: "fundsInterior" },
        { text: "سنة دراسية كاملة (من 1 سبتمبر إلى 31 أغسطس): ‎(15 × 3,130) + (11 × 2 × 3,130) = 115,810 كرونة. فصل دراسي واحد (من سبتمبر إلى فبراير): 78,250 كرونة.", source: "fundsInterior" },
        { text: "من هم دون 18 عامًا يُثبتون نصف هذه المبالغ.", source: "fundsForeign" },
        { text: "يمكن أن تحل محل هذا الإثبات منحة دراسية بموجب اتفاقية دولية تلتزم بها التشيك. إذا لم تغطِّ المبلغ كاملًا، تُثبت الفرق.", source: "fundsForeign" },
        { text: "هذا هو المبلغ الذي تطلب السفارة إثباته. للرسوم الدراسية ومصاريف المعيشة وباقي التكاليف، اقرأ دليل التكاليف.", link: { href: "/what-it-costs/", label: "تكاليف الدراسة في التشيك" } },
      ],
    },
    {
      id: "appointment",
      title: "3. احجز الموعد بالبريد الإلكتروني",
      items: [
        { text: "راسل فقط cairo.longtermvisa@mzv.gov.cz. أي رسالة تضع عنوانًا آخر للسفارة في خانة النسخة (CC) تُستبعد.", source: "appointment" },
        { text: "عنوان الرسالة: الغرض فقط بكلمة واحدة: Study.", source: "appointment" },
        { text: "المرفقات بصيغة PDF فقط، وبحد أقصى 2 ميجابايت: صفحة بيانات الجواز، وخطاب القيد أو تأكيد الدراسة (مع ترجمة إذا لم يكن بالإنجليزية أو التشيكية).", source: "appointment" },
        { text: "في نص الرسالة اكتب: الاسم، اسم العائلة، تاريخ الميلاد، الجنسية، رقم الجواز، غرض الإقامة، الهاتف والبريد الإلكتروني.", source: "appointment" },
        { text: "متقدم واحد = رسالة واحدة. إرسال أكثر من رسالة لنفس الشخص يؤدي إلى الاستبعاد، حتى لو من عناوين مختلفة. يمكن للوالدين إضافة أبنائهم القُصّر.", source: "appointment" },
        { text: "الطلب الصحيح يصله تأكيد خلال 15 يومًا، وعدم الرد يعني أنه استُبعد. المواعيد نهائية: إذا ألغيت موعدك أو فاتك، تبدأ من جديد بالبريد الإلكتروني.", source: "appointment" },
        { text: "مواطنو مصر والسودان وإريتريا واليمن وفلسطين يقدّمون مباشرة. الجنسيات الأخرى تحتاج إقامة غير سياحية في مصر لأكثر من سنتين.", source: "appointment" },
      ],
    },
    {
      id: "after",
      title: "4. يوم الموعد وما بعده",
      items: [
        { text: "احضر في موعدك ومعك الملفان. أنت من يقدّم الطلب، ولا يمكن لأحد أن يحضر بدلًا منك.", source: "studyVisa" },
        { text: "ادفع الرسوم نقدًا بالجنيه المصري أو بالبطاقة بالكرونة التشيكية. المبلغ يتبع سعر الصرف الشهري.", source: "studyVisa" },
        { text: "وزارة الداخلية هي التي تقرر، وقد يستغرق ذلك حتى 60 يومًا. لا تراسل السفارة خلال هذه المدة لأنها لن ترد. ستُبلغك بالقرار بالبريد الإلكتروني أو بالهاتف.", source: "studyVisa" },
        { text: "التأشيرة صالحة لسنة كحد أقصى. مدّد إقامتك لدى السلطات التشيكية قبل انتهائها، وليس في السفارة. إذا انتهت أولًا، تعيد الإجراءات كلها من البداية.", source: "studyVisa" },
        { text: "هل تقلق من أسئلة السفارة؟ دليلنا المجاني يشرح ما يُسأل عنه الطلاب عادةً بخصوص خطتهم الدراسية.", link: { href: "/interview-prep", label: "تجهيز مقابلة السفارة" } },
      ],
    },
  ],
  noteTitle: "الكلمة الأخيرة للسفارة",
  note:
    "تلخص هذه الصفحة صفحات السفارة ووزارة الداخلية نفسها بالتاريخ المذكور أعلاه. يمكنهم تغيير القواعد أو الرسوم في أي وقت، لذا راجع روابط المصادر قبل أن تحجز أو تدفع.",
  reviewTitle: "هل تريد مراجعة أوراق التأشيرة أولًا؟",
  reviewBody: "أراجع كل صفحة كما سيراجعها موظف السفارة، قبل موعدك.",
  reviewCta: "تفاصيل خدمة مراجعة الأوراق",
  sourcesTitle: "المصادر",
  sourceNames: {
    studyVisa: "السفارة التشيكية في القاهرة: تأشيرة الدراسة طويلة الأجل",
    appointment: "السفارة التشيكية في القاهرة: حجز موعد",
    fees: "السفارة التشيكية في القاهرة: الرسوم القنصلية ورسوم التأشيرات",
    legalisation: "السفارة التشيكية في القاهرة: تصديق المستندات",
    fundsInterior: "وزارة الداخلية التشيكية: إثبات الموارد المالية",
    fundsForeign: "وزارة الخارجية التشيكية: الموارد المالية",
  },
  source: "المصدر",
};

export default function StudentVisaEgyptClient() {
  return <RecognitionGuide sources={SOURCES} en={en} ar={ar} placement="student-visa" />;
}
