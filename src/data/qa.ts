export type QaEntry = {
  id: string;
  category: "visa" | "documents" | "bank" | "university" | "housing" | "costs" | "embassy" | "scams" | "prep";
  q: { en: string; ar: string };
  a: { en: string; ar: string };
  source?: { url: string; label: { en: string; ar: string } };
};

export type QaCategory = {
  key: QaEntry["category"];
  label: { en: string; ar: string };
};

export const qaCategories: QaCategory[] = [
  { key: "visa", label: { en: "Visa & Travel Permits", ar: "الفيزا وتصاريح السفر" } },
  { key: "embassy", label: { en: "Embassy & Interview", ar: "السفارة والمقابلة" } },
  { key: "documents", label: { en: "Documents & Translation", ar: "الأوراق والترجمة" } },
  { key: "bank", label: { en: "Bank Account", ar: "الحساب البنكي" } },
  { key: "university", label: { en: "University & Admission", ar: "الجامعة والقبول" } },
  { key: "housing", label: { en: "Housing", ar: "السكن" } },
  { key: "costs", label: { en: "Costs & Working", ar: "المصاريف والشغل" } },
  { key: "scams", label: { en: "Avoiding Scams", ar: "تجنب النصب" } },
  { key: "prep", label: { en: "Before You Travel", ar: "قبل ما تسافر" } },
];

export const qaEntries: QaEntry[] = [
  // Visa & travel permits
  {
    id: "visa-decision-delayed",
    category: "visa",
    q: {
      en: "The embassy's response is delayed and my studies have already started — what do I do?",
      ar: "رد السفارة اتأخر والدراسة بدأت، أعمل إيه؟",
    },
    a: {
      en: "Contacting the embassy directly usually won't help — your file is now with the Czech Ministry of the Interior, not the embassy, and they'll only respond once a decision is made. You can ask your university to add you to \"student mode\" if that's possible, which can speed things along, or ask the university to follow up with the ministry directly. Delays of 90–120 days after the embassy interview are common and normal as long as you're still within 90 days of your study start date.",
      ar: "أي محاولة تتواصل مع السفارة مالهاش لازمة لأن ورقك الآن في وزارة الداخلية التشيكية مش معاهم، وهيردوا لما يوصلهم الرد. تقدر تطلب من جامعتك تضيفك على الـ student mode لو ممكن، وده هيسرع الأمور، أو تطلب من الجامعة تتواصل مع الوزارة مباشرة. التأخير لـ90 أو 120 يوم بعد مقابلة السفارة حاجة طبيعية جدًا طالما معداش 90 يوم على معاد بداية دراستك.",
    },
  },
  {
    id: "visa-reapply-after-rejection",
    category: "visa",
    q: {
      en: "If my visa application is rejected, can I reapply with the same documents?",
      ar: "لو اترفضت، أقدر أقدم بنفس الورق تاني؟",
    },
    a: {
      en: "No — unfortunately you cannot resubmit the exact same application after a rejection.",
      ar: "للأسف لأ، مش ممكن تقدم بنفس الأوراق تاني بعد الرفض.",
    },
  },
  {
    id: "visa-refund-after-rejection",
    category: "visa",
    q: {
      en: "If I'm rejected, do I get my money back?",
      ar: "لو اترفضت، فلوسي بترجعلي؟",
    },
    a: {
      en: "Visa and document-processing fees are not refundable. University fees depend entirely on the university's own policy — some refund 90%, some 75%, and some don't refund anything at all.",
      ar: "مصاريف الفيزا والأوراق مش بترجع. مصاريف الكلية بتختلف حسب كل كلية: في كليات بترجع 90% من المبلغ، وكليات بترجع 75%، وكليات مبترجعش خالص.",
    },
  },
  {
    id: "visa-appeal",
    category: "visa",
    q: {
      en: "How do I appeal a rejection?",
      ar: "لو اترفضت، أعمل تظلم إزاي؟",
    },
    a: {
      en: "The appeal must be filed within two weeks of receiving the rejection, and it needs to be written in Czech — it's best to get someone to help you with it.",
      ar: "التظلم بيتعمل خلال أسبوعين من استلام الرفض، ولازم يكون مكتوب بالتشيكي، ويستحسن تلاقي حد يساعدك فيه.",
    },
  },
  {
    id: "visa-validity",
    category: "visa",
    q: {
      en: "How long is the tourist travel permit valid, and can it be reused?",
      ar: "تصريح السفر السياحة مدته كم، وينفع أستخدمه أكثر من مرة؟",
    },
    a: {
      en: "As of the latest update, the travel permit is valid for only 15 days from the date it's issued, and it can be used only once.",
      ar: "بعد آخر تحديث، تصريح السفر مدته 15 يوم بس من تاريخ استخراجه، وصالح للاستخدام مرة واحدة فقط لا غير.",
    },
  },
  {
    id: "visa-90-day-vs-long-term",
    category: "visa",
    q: {
      en: "What's the difference between the 90-day (short-term) visa and a long-term residence permit?",
      ar: "إيه الفرق بين تأشيرة الـ90 يوم وتصريح الإقامة طويل المدى؟",
    },
    a: {
      en: "A long-term visa lets you stay in the Czech Republic for more than 90 days, valid for up to one year, for a single entry. A long-term residence permit is a plastic biometric card issued after you're already in the country (typically after a long-term visa), valid up to 2 years, and lets you re-enter freely for the same purpose.",
      ar: "التأشيرة طويلة المدى تخليك تقيم في التشيك أكثر من 90 يوم، وصالحة لمدة سنة كحد أقصى، ولدخول واحد بس. تصريح الإقامة طويل المدى بطاقة بيومترية بتتصدر وانت موجود بالفعل في البلد (عادة بعد التأشيرة طويلة المدى)، وصالحة لحد سنتين، وبتسمحلك بالدخول والخروج بحرية لنفس الغرض.",
    },
    source: {
      url: "https://www.mvcr.cz/mvcren/article/third-country-nationals-general-information.aspx",
      label: { en: "Czech Ministry of Interior", ar: "وزارة الداخلية التشيكية" },
    },
  },

  // Embassy & interview
  {
    id: "interview-language",
    category: "embassy",
    q: {
      en: "Should the embassy interview be in Arabic or English?",
      ar: "يفضل أعمل المقابلة بالعربي ولا الإنجليزي؟",
    },
    a: {
      en: "It's strongly preferred to do the interview in English, not your mother tongue.",
      ar: "يفضل ألا تعمل المقابلة بالعربي، واعملها بالإنجليزي.",
    },
  },
  {
    id: "interview-common-questions",
    category: "embassy",
    q: {
      en: "What kinds of questions does the embassy usually ask?",
      ar: "إيه أشهر الأسئلة اللي بتسألها السفارة؟",
    },
    a: {
      en: "Common questions include: why you chose the Czech Republic, whether you considered other countries, why this specific university, how you found and applied to it, what documents you submitted, whether you have the original acceptance letter, what you'll study, your English/Czech level, your financial situation and who supports you, where you'll live, and general knowledge about the Czech Republic (currency, EU membership since 2004, Prague landmarks). Prepare specific, confident answers rather than vague ones.",
      ar: "من أشهر الأسئلة: ليه اخترت التشيك، هل فكرت في دول تانية، ليه اخترت الجامعة دي بالذات، إزاي قدمت، إيه الأوراق اللي قدمتها، هل معاك أصل القبول، هتدرس إيه، مستوى لغتك الإنجليزية/التشيكية، وضعك المادي ومين اللي هيصرف عليك، هتسكن فين، ومعلومات عامة عن التشيك (العملة، عضوية الاتحاد الأوروبي من 2004، معالم براغ). جهز إجابات محددة وواثقة مش عمومية.",
    },
  },
  {
    id: "embassy-booking-appointment",
    category: "embassy",
    q: {
      en: "How do I book the embassy visa appointment and legalize my documents?",
      ar: "أحجز معاد السفارة وأوثق أوراقي إزاي؟",
    },
    a: {
      en: "Visit the official Czech Embassy website for your country. There's usually a dedicated page for document legalization with a booking link, and a separate page for booking the visa interview appointment (the confirmation form is normally at the bottom of that page). Requirements and process are broadly the same across embassies, though the exact link differs by country.",
      ar: "ادخل على الموقع الرسمي لسفارة التشيك في بلدك. هتلاقي صفحة مخصصة لتوثيق الأوراق فيها لينك الحجز، وصفحة تانية لحجز معاد مقابلة الفيزا (نموذج التأكيد عادة في آخر الصفحة). المتطلبات والخطوات متشابهة في كل السفارات لكن اللينك بيختلف حسب بلدك.",
    },
  },

  // Documents & translation
  {
    id: "docs-czech-vs-english",
    category: "documents",
    q: {
      en: "Which documents need to be translated into Czech, and which into English?",
      ar: "إيه الأوراق اللي بتترجم تشيكي وإيه اللي بتترجم إنجليزي؟",
    },
    a: {
      en: "Into Czech: proof of sufficient financial means (bank statement), criminal record extract from your home country and any country you lived in continuously for 6+ months in the last 3 years, proof of health requirements (medical certificate), and your educational certificates from the last 4 years. Into English: credit-hours documentation, bachelor's-eligibility certificate, and any correspondence with the university. If you're studying in Czech, translate everything into Czech instead.",
      ar: "بالتشيكي: إثبات المصادر المالية الكافية (كشف الحساب)، مستخرج من سجل السوابق من بلدك وأي بلد أقمت فيه بصورة مستمرة أكثر من 6 أشهر خلال آخر 3 سنين، إثبات استيفاء الشروط الصحية (شهادة طبية)، وشهاداتك الدراسية لآخر 4 سنين. بالإنجليزي: مستند عدد الساعات الدراسية، شهادة أهلية للبكالوريوس، وأي مراسلات مع الجامعة. لو هتدرس بالتشيكي، ترجم كل حاجة تشيكي بدل الإنجليزي.",
    },
  },
  {
    id: "docs-passport-required",
    category: "documents",
    q: {
      en: "What passport requirements apply before traveling?",
      ar: "إيه شروط جواز السفر قبل السفر؟",
    },
    a: {
      en: "Your passport must be valid. If you're under 15, you must be registered on a parent's passport, or have your own. To get a long-term visa, the passport must have been issued less than 10 years ago, contain at least 2 blank pages, and be valid for at least 3 months beyond the visa's validity period.",
      ar: "لازم يكون جواز سفرك ساري. لو عمرك أقل من 15 سنة، لازم تكون مسجل في جواز أحد والديك أو يكون عندك جواز خاص بيك. للحصول على تأشيرة طويلة المدى، لازم يكون الجواز صادر من أقل من 10 سنين، وفيه صفحتين فاضيتين على الأقل، وصالح لمدة 3 أشهر على الأقل بعد نهاية صلاحية التأشيرة.",
    },
  },
  {
    id: "docs-nostrification",
    category: "documents",
    q: {
      en: "What is \"nostrification\" and what documents does it need?",
      ar: "إيه هي \"المعادلة\" (nostrification) وإيه الأوراق المطلوبة ليها؟",
    },
    a: {
      en: "Nostrification confirms that your educational background is equivalent to that of Czech students. You'll need your verified school-leaving certificate, a study plan showing hours per subject over the last 4 years, original annual grade reports (stamped and signed), and a verified copy of your school's license to operate. It usually takes about 30 days to process.",
      ar: "المعادلة (nostrification) بتأكد إن مؤهلك الدراسي معادل لمؤهل الطلاب التشيك. هتحتاج شهادتك الدراسية موثقة، خطة دراسية بعدد الساعات لكل مادة على مدار آخر 4 سنين، تقارير الدرجات السنوية الأصلية (مختومة وموقعة)، ونسخة موثقة من ترخيص المدرسة. بتاخد حوالي 30 يوم للمعالجة.",
    },
  },

  // Bank account
  {
    id: "bank-minimum-amount",
    category: "bank",
    q: {
      en: "How much money do I need to show in my bank account, and for how long?",
      ar: "أحتاج أحط قد إيه في الحساب البنكي، ولمدة قد إيه؟",
    },
    a: {
      en: "The published minimum on the embassy's official site is around 115,810 CZK. This must sit in a current (checking) account — not a certificate of deposit or savings certificate — for at least 6 months before your interview, and cover accommodation, food, insurance, travel, and other living costs. If you're under 21 and can't open an account in your own name, you can deposit it in a parent's account with a bank signature verification or a notarized affidavit (usually ~0.5% of the amount as a fee). Always check the embassy's official page for the current figure — it changes with the exchange rate.",
      ar: "الحد الأدنى المعلن على موقع السفارة الرسمي حوالي 115,810 كرونة تشيكية. لازم يكون المبلغ في حساب جاري — مش شهادات أو ودايع — لمدة 6 أشهر على الأقل قبل المقابلة، ويغطي السكن والأكل والتأمين والسفر ومصاريف الحياة التانية. لو عمرك أقل من 21 ومش هتقدر تفتح حساب بأسمك، تقدر تحطهم في حساب والدك أو والدتك مع صحة توقيع من البنك أو إقرار من الشهر العقاري (بتدفع عادة حوالي 0.5% من قيمة المبلغ كرسوم). دايمًا تابع الصفحة الرسمية للسفارة عشان الرقم بيتغير مع سعر الصرف.",
    },
  },

  // University & admission
  {
    id: "med-preparatory-year",
    category: "university",
    q: {
      en: "Is the preparatory year mandatory for studying medicine?",
      ar: "السنة التحضيرية إجبارية لدراسة الطب؟",
    },
    a: {
      en: "No, it's not mandatory at all. If you already know Czech and have studied the admission subjects yourself, you can take the entrance exam directly. But be realistic: learning the language well enough typically takes about two years of dedicated study, and language courses cost roughly €5,000/year.",
      ar: "لا، مش إجبارية أبدًا. لو عندك تشيكي ومذاكر مواد القبول بنفسك، تقدر تمتحن مباشرة. بس لازم تكون واقعي: تعلم اللغة كويس بياخد حوالي سنتين تفرغ كمل، وتكلفة كورسات اللغة حوالي 5,000 يورو في السنة.",
    },
  },
  {
    id: "med-language-level",
    category: "university",
    q: {
      en: "What language level is required for medicine and dentistry?",
      ar: "إيه مستوى اللغة المطلوب للطب وطب الأسنان؟",
    },
    a: {
      en: "B2 for Charles University's Plzeň branch and Ostrava University's medicine program; C1 for Charles University's Prague and Hradec Králové branches. Masaryk University (Brno) and Palacký University don't require a language certificate for medicine — you just need the high school equivalency certificate and to pass the entrance exam. Pharmacy doesn't require a language certificate at all, only the entrance exam.",
      ar: "B2 لفرع بلزن من جامعة تشارلز وطب جامعة أوسترافا؛ C1 لفرع براغ وهرادتس كرالوفه من جامعة تشارلز. جامعة مساريك (برنو) وجامعة بالاتسكي مش مطلوب فيهم شهادة لغة للطب — بس معادلة الثانوية واجتياز امتحان القبول. الصيدلة مش مطلوب فيها شهادة لغة خالص، بس اجتياز امتحان القبول.",
    },
  },
  {
    id: "med-entrance-exam-subjects",
    category: "university",
    q: {
      en: "What subjects are on the medicine entrance exam?",
      ar: "إيه مواد امتحان القبول للطب؟",
    },
    a: {
      en: "Biology, Physics, and Chemistry for human medicine or dentistry across the Czech Republic. For pharmacy, it's just Chemistry and Biology. Admission is based purely on the entrance exam result plus your equivalency certificate — not your high school GPA.",
      ar: "أحياء، فيزياء، وكيمياء للطب البشري وطب الأسنان في كل التشيك. للصيدلة، كيمياء وأحياء بس. القبول بيعتمد على نتيجة امتحان القبول ومعادلة الثانوية بس — مش على مجموع الثانوية.",
    },
  },
  {
    id: "how-to-choose-university",
    category: "university",
    q: {
      en: "How do I choose a university and program?",
      ar: "أختار الجامعة والتخصص إزاي؟",
    },
    a: {
      en: "Use the official Study in Czechia portal to browse institutions, then filter by major and degree level (bachelor's/master's). Compare tuition across a shortlist — for example, one student found engineering programs ranging from about €1,000 to €2,000/year across different universities — and check each program's entrance requirements before committing.",
      ar: "استخدم بوابة Study in Czechia الرسمية لتصفح الجامعات، وبعدين فلتر حسب التخصص ومستوى الدرجة (بكالوريوس/ماجستير). قارن الرسوم بين شورت ليست — مثلًا طالب لقى برامج هندسة تتراوح من 1,000 لـ2,000 يورو في السنة في جامعات مختلفة — وراجع شروط القبول لكل برنامج قبل ما تلتزم.",

    },
  },

  {
    id: "study-in-czech-free",
    category: "university",
    q: {
      en: "Can I study in Czech for free?",
      ar: "ممكن أدرس مجانًا بالتشيك؟",
    },
    a: {
      en: "Yes — public universities charge no tuition for programmes taught in Czech. You usually need B2+ Czech, often achieved via a one-year foundation/preparatory programme (costs ~€2,000–€5,000). You still pay living costs (~€500–€800/month).",
      ar: "أيوه — الجامعات الحكومية مابتاخدش رسوم على البرامج اللي بتتدرّس بالتشيكي. عادة بيُطلب مستوى تشيكي حوالي B2 أو أعلى، والطلبة بياخدوا سنة تحضيرية بتكلف تقريبًا 2,000–5,000 يورو. هتتحمّل مصاريف المعيشة برضه (حوالي 500–800 يورو في الشهر).",
    },
  },

  {
    id: "bologna-system",
    category: "university",
    q: {
      en: "What's the Bologna system and why does it matter?",
      ar: "نظام بولونيا إيه وليه هو مهم؟",
    },
    a: {
      en: "Czech degrees follow the European Bologna structure: a 3-year Bachelor's, a 2-year Master's, and a 3-year PhD. This means your degree is recognised across EU/EEA countries and usually transfers cleanly to other European universities.",
      ar: "الدرجات في التشيك ماشية على نظام بولونيا الأوروبي: بكالوريوس 3 سنين، ماجستير 2 سنين، ودكتوراه ~3 سنين. ده بيخلي شهادتك متعترفة في دول الاتحاد الأوروبي والمنطقة الاقتصادية الأوروبية، وسهل تحويلها أو قبولها في جامعات تانية هناك.",
    },
  },

  {
    id: "english-program-count",
    category: "university",
    q: {
      en: "How many English-taught programmes are available?",
      ar: "كم برنامج بيتدرّس بالإنجليزي؟",
    },
    a: {
      en: "There are over 400 Bachelor's and Master's programmes taught fully in English across 60+ Czech universities — the exact number grows each year as universities add international offerings.",
      ar: "في أكثر من 400 برنامج بكالوريوس وماجستير يُدرَّس بالكمل باللغة الإنجليزية عبر أكثر من 60 جامعة تشيكية — ويزداد هذا العدد سنويًا مع إضافة برامج دولية جديدة.",
    },
  },

  // Housing
  {
    id: "housing-priority-system",
    category: "housing",
    q: {
      en: "How does student dormitory priority work?",
      ar: "نظام أولوية سكن الجامعة بيشتغل إزاي؟",
    },
    a: {
      en: "Each faculty has its own set of dormitory buildings. Priority goes first to students of that same faculty, then to students from other faculties, then to students from institutes. If your faculty's building is full, you'll need to apply to another university's dormitories — VŠE's dormitories in Prague are the most popular fallback and are consistently well-rated.",
      ar: "كل كلية ليها عدد من المباني السكنية. الأولوية بتكون أولًا لطلبة نفس الكلية، وبعدين طلبة الكليات التانية، وبعدين طلبة المعاهد. لو مبنى كليتك مليان، هتحتاج تقدم على سكن جامعة تانية — سكن VŠE في براغ أشهر بديل ومقيّم كويس باستمرار.",
    },
  },
  {
    id: "housing-how-to-apply",
    category: "housing",
    q: {
      en: "How do I apply for student housing?",
      ar: "أقدم على سكن الطلبة إزاي؟",
    },
    a: {
      en: "Applications are made online through the ISKAM system, or in person at the Central Accommodation Office. If your faculty has no space available, look into other dormitory buildings or check apartment rental groups on Facebook and sites like Sreality.",
      ar: "التقديم يتم عبر الإنترنت من خلال نظام ISKAM، أو شخصيًا في مكتب Central Accommodation. إذا لم تتوفر سكن في كليتك، ابحث عن مباني سكن بديلة أو مجموعات تأجير الشقق على فيسبوك ومواقع مثل Sreality.",
    },
  },

  // Costs & work
  {
    id: "costs-breakdown",
    category: "costs",
    q: {
      en: "What are typical monthly living costs as a student in the Czech Republic?",
      ar: "المصاريف الشهرية للطالب في التشيك بتكون قد إيه تقريبًا؟",
    },
    a: {
      en: "Tuition (English-taught programs): 15,000–250,000 CZK/year, depending on program and university (Czech-taught programs are free). Health insurance: 13,000–19,000 CZK/year. Accommodation deposit: 5,000–15,000 CZK. Dorm rent: 4,500–6,500 CZK/month (shared room); private rentals start around 8,000 CZK/month. Food: from 2,500 CZK/month. Mobile top-up: from 300 CZK/month. Laundry: 40–70 CZK/load. Transport (student discount): 140–200 CZK/month.",
      ar: "الرسوم الدراسية (بالإنجليزي): من 15,000 لـ250,000 كرونة تشيكية في السنة حسب البرنامج والجامعة (البرامج بالتشيكي مجانية). التأمين الصحي: 13,000–19,000 كرونة تشيكية في السنة. تأمين السكن: 5,000–15,000 كرونة تشيكية. إيجار السكن الجامعي: 4,500–6,500 كرونة تشيكية شهريًا (غرفة مشتركة)؛ الإيجار الخاص من 8,000 كرونة تشيكية شهريًا. الأكل: من 2,500 كرونة تشيكية شهريًا. شحن الموبايل: من 300 كرونة تشيكية شهريًا. الغسيل: 40–70 كرونة تشيكية للمرة. المواصلات (خصم طالب): 140–200 كرونة تشيكية شهريًا.",
    },
  },
  {
    id: "costs-work-hours",
    category: "costs",
    q: {
      en: "How many hours can I legally work while studying, and how much will I earn?",
      ar: "أقدر أشتغل قد إيه قانونيًا وأنا بدرس، وهكسب قد إيه؟",
    },
    a: {
      en: "Students with a residence permit for the purpose of \"study\" have free access to the Czech labour market — no work permit needed and no fixed hour limit. Verify your specific visa type, as other residence purposes may carry restrictions. Entry-level wages (e.g. restaurant work) start around 120–180 CZK/hour. Work in your field pays according to industry — check sites like Indeed or Salary Explorer. English alone can get you work, but Czech usually unlocks better pay and more options.",
      ar: "الطلاب اللي عندهم إقامة بغرض \"دراسة\" عندهم حق الوصول الحر لسوق العمل التشيكي — مش محتاج تصريح عمل ومفيش حد ساعات ثابت. تأكد من نوع إقامتك، لأن أغراض الإقامة التانية ممكن يكون عليها قيود. أجور المستوى المبتدئ (زي شغل المطاعم) بتبدأ من 120–180 كرونة تشيكية في الساعة. الشغل في تخصصك بيدفع حسب المجال — راجع مواقع زي Indeed أو Salary Explorer. الإنجليزي وحده ممكن يديك شغل، لكن التشيكي غالبًا بيفتحلك فرص وأجور أحسن.",
    },
    source: {
      url: "https://www.mvcr.cz/mvcren/article/employment-and-doing-business.aspx",
      label: { en: "Czech Ministry of Interior", ar: "وزارة الداخلية التشيكية" },
    },
  },

  // Scams
  {
    id: "scams-avoid-agencies",
    category: "scams",
    q: {
      en: "How do I avoid getting scammed by study agencies?",
      ar: "أتجنب النصب من مكاتب الدراسة إزاي؟",
    },
    a: {
      en: "This isn't like other destinations where someone takes €100 and hands you a university acceptance the next day — it's genuinely difficult, takes real time and effort, and requires a solid language level. Be very wary of any office promising to \"handle everything\" for a large flat fee (some scams have charged around €1,000) — do the steps yourself where you can, and only use vetted, community-recommended offices for translation and document help.",
      ar: "الموضوع مش زي بلاد تانية حد ياخد منك 100 يورو وباكر يبقى معاك قبول جامعة — الموضوع صعب فعلًا وبياخد وقت ومجهود كبير ومحتاج مستوى لغة كويس. احذر جدًا من أي مكتب بيوعدك \"هخلصلك كل حاجة\" مقابل مبلغ كبير (في مكاتب نصب أخذت حوالي ألف يورو) — اعمل الخطوات بنفسك قد ما تقدر، واستخدم بس مكاتب ترجمة موثوقة ومرشحة من المجتمع.",
    },
  },

  // Before you travel
  {
    id: "prep-military-travel-permit",
    category: "prep",
    q: {
      en: "I'm still enrolled in an Egyptian university and haven't registered my military deferral yet — how do I get a tourist travel permit?",
      ar: "لسه مقيد في جامعة مصرية ومسجلتش بعثة، أطلع تصريح سفر سياحة إزاي؟",
    },
    a: {
      en: "You'll need a recent enrollment certificate from your college for the current academic year (issued within the last 3 months), plus a valid national ID and a copy of it. Go to the recruitment (conscription) office you're registered under in your governorate. At the inquiries desk, say you need a tourist travel permit for students; they'll stamp your enrollment certificate. Hand in your phone at the lockers, then get the travel permit application form (costs around 270 EGP), fill it in — if you're actually flying via Vienna or Budapest, put that as your destination on the form (say you're traveling for tourism, not study — this matters). Submit the form, get fingerprinted, and you'll receive a paper with a link to collect the permit online the same evening (around 6 PM) using your national ID number. As of the latest update, the permit is valid for only 15 days from issue and can be used once.",
      ar: "هتحتاج شهادة اثبات قيد حديثة من الكلية للعام الدراسي الحالي (معداش عليها 3 شهور)، وبطاقة شخصية سارية وصورة منها. روح منطقة التجنيد اللي انت تابع عليها في محافظتك. في الاستعلامات قول انك محتاج تصريح سفر سياحة للطلبة، هيختملولك بيان القيد. سلم موبايلك في الأمانات، وبعدين هات نموذج تصريح سفر السياحة (بـ270 جنيه تقريبًا) واملأ البيانات — لو انت مسافر فعليًا عن طريق فيينا أو بودابست، اكتب الوجهة دي في التصريح (وقول للعسكري انك مسافر سياحة مش دراسة، ودي حاجة مهمة جدًا). سلم الورق، وابصم، وهيديلك ورقة فيها لينك الاستلام. الاستلام بيكون بليل نفس اليوم (حوالي الساعة 6 مساءً) أونلاين بالرقم القومي. بعد آخر تحديث، مدة التصريح 15 يوم بس وصالح لاستخدام واحد فقط.",
    },
  },
  {
    id: "prep-packing-checklist",
    category: "prep",
    q: {
      en: "What documents and items should I bring with me from Egypt?",
      ar: "إيه الأوراق والحاجات اللي لازم أجيبها معايا من مصر؟",
    },
    a: {
      en: "Keep the originals of everything you had authenticated and translated — your passport, provisional university acceptance letter, translated and legalized education certificates (last 4 years), criminal record extract, bank statement, health certificate, passport-size photos, and your Czech visa/residence permit sticker itself. Also worth bringing: a copy of your accommodation contract, proof of health insurance, and enough cash for your first few days before you sort out a local bank account. Keep digital scans of everything as backup, and don't pack these documents in checked luggage — carry them with you.",
      ar: "احتفظ بأصل كل حاجة وثقتها وترجمتها — جواز السفر، خطاب القبول المبدئي، الشهادات الدراسية (آخر 4 سنين) مترجمة وموثقة، الفيش والتشبيه، كشف الحساب البنكي، الشهادة الصحية، صور شخصية، وطبعًا ملصق الفيزا أو تصريح الإقامة نفسه. كمان يفضل تجيب نسخة من عقد السكن، إثبات التأمين الصحي، وفلوس كاش تكفيك أول كم يوم لحد ما تفتح حساب بنكي هناك. احتفظ بنسخ سكانر من كل حاجة كباك أب، ولا تحط الأوراق دي في الشنطة اللي بتتسجل في الطيران — خليها معاك في شنطة اليد.",
    },
  },
];
