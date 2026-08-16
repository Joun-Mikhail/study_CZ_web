export type GuideStep = {
  id: string;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
  tip?: { en: string; ar: string };
};

export const guideSteps: GuideStep[] = [
  {
    id: "major",
    title: { en: "1. Decide on your major", ar: "١. حدد التخصص اللي هتدرسه" },
    body: {
      en: "Start here — for example \"Engineering\" or \"Medicine.\" Everything else (which universities you'll compare, which language level you need) depends on this choice.",
      ar: "ابدأ من هنا — مثلًا \"هندسة\" أو \"طب\". كل حاجة تانية (الجامعات اللي هتقارن بينها، مستوى اللغة المطلوب) بيعتمد على القرار ده.",
    },
  },
  {
    id: "language",
    title: { en: "2. Choose your language of instruction", ar: "٢. اختار لغة الدراسة" },
    body: {
      en: "For most students this will be English. Don't get too excited about studying in Czech for free — Czech is genuinely difficult and typically takes about two years of dedicated study before you're ready to study a full degree in it.",
      ar: "للأغلبية هتكون إنجليزي. متتحمسش قوي لفكرة إنك تدرس بالتشيكي ببلاش — التشيكي صعب فعلًا وبياخد حوالي سنتين تفرغ كمل عشان تبقى جاهز تدرس بيه.",
    },
  },
  {
    id: "language-czech-path",
    title: { en: "2b. Consider the Czech-language path", ar: "٢ب. فكر في طريق الدراسة بالتشيكي" },
    body: {
      en: "If you're willing to invest a year to reach B2 Czech, you can study at public universities with zero tuition. Several universities run official preparatory/foundation programmes (e.g., Charles University, Masaryk University, CTU, ILPS/UJOP). Prep-year costs range from about €2,000–€5,000.",
      ar: "لو مستعد تستثمر سنة عشان توصل مستوى B2 في التشيكي، تقدر تدرس في الجامعات الحكومية من غير رسوم. في جامعات بتقدم سنين تحضيرية رسمية (مثال: جامعة تشارلز، جامعة مساريك، CTU، ILPS/UJOP). تكلفة السنة التحضيرية تقريبًا من 2,000 لـ5,000 يورو.",
    },
  },
  {
    id: "budget",
    title: { en: "4. Work out your budget", ar: "٤. حدد قدرتك المادية" },
    body: {
      en: "Figure out how much you can realistically pay per year for tuition, and decide whether you plan to work alongside your studies.",
      ar: "احسب قد إيه تقدر تدفع كل سنة للرسوم، وقرر هل ناوي تشتغل جنب الدراسة ولا لأ.",
    },
  },
  {
    id: "research",
    title: { en: "5. Research universities offering English-taught programs", ar: "٥. دوّر على جامعات بتقدم برامج بالإنجليزي" },
    body: {
      en: "This is one of the most tedious steps. Compare tuition across a shortlist of universities for your major, and check each program's entrance requirements before committing. Universities have charged anywhere from about €1,000 to €2,000/year for the same major — it's worth comparing.",
      ar: "هذه من أكثر الخطوات المرهقة. قارن الرسوم بين قائمة مختصرة من الجامعات لنفس التخصص، وراجع شروط القبول لكل برنامج قبل الالتزام. وجدنا فروقًا فعلية بين 1,000 و2,000 يورو في السنة لنفس التخصص في جامعات مختلفة — من المفيد المقارنة.",
    },
    tip: {
      en: "Confirm the entrance exam is available online before applying — you likely won't get a visa to travel just to sit an exam.",
      ar: "تأكد إن الامتحان متاح أونلاين قبل ما تقدم — على الأغلب مش هتقدر تجيب فيزا تسافر بيها تمتحن بس.",
    },
  },
  {
    id: "bank",
    title: { en: "6. Prepare your bank account", ar: "٦. جهّز الحساب البنكي" },
    body: {
      en: "The embassy's published minimum is around 115,810 CZK, held in a current (not savings) account in your name for at least 6 months before your interview. If you're under 21 and can't open your own account, deposit it in a parent's account with a bank signature verification or notarized affidavit (~0.5% of the amount as a fee).",
      ar: "الحد الأدنى المعلن من السفارة حوالي 115,810 كرونة تشيكية، في حساب جاري (مش توفير) بأسمك لمدة 6 أشهر على الأقل قبل المقابلة. لو عمرك أقل من 21 ومش هتقدر تفتح حساب بأسمك، حطهم في حساب والدك/والدتك مع صحة توقيع من البنك أو إقرار من الشهر العقاري (حوالي 0.5% من المبلغ كرسوم).",
    },
  },
  {
    id: "documents",
    title: { en: "7. Gather your Egyptian documents", ar: "٧. جهّز أوراقك من مصر" },
    body: {
      en: "You'll need: a valid national ID, your graduation certificate (or enrollment certificate if still studying), three colored passport photos on a white background, your military service status, and your transcript for the last four years. Get a passport from your local police station if you don't already have one.",
      ar: "ستحتاج: بطاقة هوية سارية، شهادة التخرج (أو إثبات القيد إذا كنت لا تزال تدرس)، ثلاث صور شخصية ملونة بخلفية بيضاء، حالة التجنيد، وبيان درجات آخر أربع سنوات. إذا لم يكن معك جواز سفر، قدّمه من مكتب الشرطة التابع لمنطقتك.",
    },
  },
  {
    id: "authenticate",
    title: { en: "8. Authenticate and translate everything", ar: "٨. وثّق وترجم كل الأوراق" },
    body: {
      en: "Take all your documents to the Ministry of Foreign Affairs for authentication, then get them translated into English and Czech by an accredited office.",
      ar: "خد كل أوراقك للخارجية عشان توثقها، وبعدين ترجمها إنجليزي وتشيكي في مكتب معتمد.",
    },
  },
  {
    id: "criminal-record",
    title: { en: "9. Get a criminal record check", ar: "٩. استخرج فيش وتشبيه" },
    body: {
      en: "Visit your nearest police station for a criminal record extract confirming you have no charges against you.",
      ar: "اذهب إلى أقرب مركز شرطة واحصل على كشف جنائي يثبت عدم وجود أحكم قضائية عليك.",
    },
  },
  {
    id: "apply-exams",
    title: { en: "10. Apply to universities and sit the entrance exams", ar: "١٠. قدّم للجامعات وادخل امتحانات القبول" },
    body: {
      en: "Applications typically open in January and close by around March — apply as early as possible in that window, since missing it can mean waiting a full extra year. Exams are usually in May or June. Prepare thoroughly and wait for results.",
      ar: "التقديم غالبًا بيفتح في يناير ويقفل حوالي شهر مارس — قدّم بدري قد ما تقدر لأن لو فاتك الموعد ممكن تستنى سنة كملة تانية. الامتحانات غالبًا في مايو أو يونيو. ذاكر كويس واستنى النتيجة.",
    },
  },
  {
    id: "housing",
    title: { en: "11. Apply for university accommodation", ar: "١١. قدّم على سكن الجامعة" },
    body: {
      en: "As soon as results are out, apply for housing and contact your university's foreign students' office — you'll need the accommodation contract to apply for your visa.",
      ar: "أول ما النتيجة تطلع، قدّم على السكن وتواصل مع مكتب الطلاب الأجانب في جامعتك — هتحتاج عقد السكن عشان تقدم بيه على الفيزا.",
    },
  },
  {
    id: "acceptance",
    title: { en: "12. Get your provisional acceptance letter", ar: "١٢. استلم القبول المبدئي" },
    body: {
      en: "Contact the university to request the provisional acceptance letter and payment details, make the payment, then send them your previous academic records for equivalency.",
      ar: "تواصل مع الجامعة عشان تطلب القبول المبدئي وتفاصيل الدفع، ادفع، وبعدين ابعتلهم شهاداتك السابقة عشان يعادلوها.",
    },
  },
  {
    id: "embassy-legalize",
    title: { en: "13. Legalize your documents at the Czech Embassy", ar: "١٣. وثّق أوراقك في سفارة التشيك" },
    body: {
      en: "Take your provisional acceptance and all prepared documents to the Czech Embassy for authentication. Check the official visa application checklist so you don't miss a document and have to make a separate trip.",
      ar: "خد القبول المبدئي وكل أوراقك المجهزة لسفارة التشيك للتوثيق. راجع قائمة أوراق الفيزا الرسمية عشان متنساش ورقة وتضطر تروح تاني.",
    },
  },
  {
    id: "visa-apply",
    title: { en: "14. Apply for your student visa", ar: "١٤. قدّم على فيزا الدراسة" },
    body: {
      en: "Visit the embassy's official website, confirm you have every required document, and submit your student visa application.",
      ar: "ادخل على موقع السفارة الرسمي، تأكد إن معاك كل الأوراق المطلوبة، وقدّم على فيزا الدراسة.",
    },
  },
  {
    id: "interview",
    title: { en: "15. Prepare for the embassy interview", ar: "١٥. جهّز نفسك للمقابلة" },
    body: {
      en: "You'll get an email with your interview date. Prepare specific, confident answers about your university, finances, and plans — and it's strongly preferred to do the interview in English, not Arabic.",
      ar: "هيوصلك إيميل بمعاد المقابلة. جهّز إجابات محددة وواثقة عن جامعتك ووضعك المادي وخططك — ويفضل تعمل المقابلة بالإنجليزي مش بالعربي.",
    },
  },
  {
    id: "post-approval",
    title: { en: "16. Book your flight, insurance, and collect your visa", ar: "١٦. احجز طيران وتأمين واستلم الفيزا" },
    body: {
      en: "Once approved by email, book a flight ticket, buy health insurance, and send copies of both to the embassy — they'll then send you an appointment to pick up your visa.",
      ar: "أول ما توصلك موافقة بالإيميل، احجز تذكرة طيران واشترِ تأمين صحي وابعت نسخ منهم للسفارة — بعدها هيبعتولك معاد استلام الفيزا.",
    },
  },
  {
    id: "arrival",
    title: { en: "17. Travel and settle in", ar: "١٧. سافر واستقر" },
    body: {
      en: "Pick up your visa, pack your documents (not in checked luggage), and travel. After arrival you'll register with the foreigners' police, open a local bank account, and pick a mobile plan — details worth researching before you land.",
      ar: "استلم الفيزا، جهّز أوراقك (في شنطة اليد مش المسجلة)، وسافر. بعد ما توصل هتسجل في شرطة الأجانب، تفتح حساب بنكي محلي، وتختار خط موبايل — كلها تفاصيل يستاهل تقرا عنها قبل ما توصل.",
    },
  },
];
