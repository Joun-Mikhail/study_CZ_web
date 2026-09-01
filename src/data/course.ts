// ─── Course Data Structure ──────────────────────────────────────────────────
// Each module has lessons and a quiz. Lessons can have a video URL (Vimeo/Bunny embed),
// text content, and downloadable resources. Quizzes have multiple-choice questions.

export type LessonResource = {
  title: { en: string; ar: string };
  url: string;
  type: "pdf" | "audio" | "cheatsheet";
};

export type Lesson = {
  id: string;
  title: { en: string; ar: string };
  duration: string; // e.g. "8 min"
  videoUrl: string | null; // Vimeo/Bunny embed URL — null = coming soon
  content: { en: string; ar: string }; // lesson text/notes (supports markdown-like formatting)
  resources: LessonResource[];
  isFree: boolean; // free preview lessons
};

export type QuizQuestion = {
  id: string;
  question: { en: string; ar: string };
  options: { en: string; ar: string }[];
  correctIndex: number;
  explanation: { en: string; ar: string };
};

export type Quiz = {
  title: { en: string; ar: string };
  passingScore: number; // percentage, e.g. 70
  questions: QuizQuestion[];
};

export type CourseModule = {
  id: string;
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  icon: string; // lucide icon name
  lessons: Lesson[];
  quiz: Quiz;
};

export type CourseData = {
  title: { en: string; ar: string };
  modules: CourseModule[];
};

export const COURSE: CourseData = {
  title: {
    en: "Your First 90 Days in Czechia",
    ar: "أول 90 يوم في التشيك",
  },
  modules: [
    // ═══════════════════════════════════════════════════════════════════════
    // MODULE 1: Czechia Before You Arrive
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "before-arrival",
      title: { en: "Czechia Before You Arrive", ar: "التشيك قبل ما توصل" },
      subtitle: {
        en: "Embassy interview prep + country knowledge",
        ar: "تجهيز مقابلة السفارة + معرفة عن البلد",
      },
      icon: "Globe",
      lessons: [
        {
          id: "embassy-questions",
          title: {
            en: "What the Embassy Actually Asks",
            ar: "السفارة بتسأل إيه بالظبط",
          },
          duration: "12 min",
          videoUrl: null,
          content: {
            en: "The embassy interview is where most students fail. Not because they're unqualified, but because they don't understand what the officer is really testing. In this lesson, we cover 12+ real questions from Czech embassy interviews, model answers, and the psychology behind each question.\n\nYou'll learn:\n• The 4 categories of embassy questions\n• What the officer is actually evaluating\n• Model answers that sound natural, not scripted\n• Red flags that get applications rejected\n• How to handle unexpected follow-up questions",
            ar: "مقابلة السفارة هي المكان اللي أغلب الطلاب بيفشلوا فيه. مش عشان مش مؤهلين، لكن عشان مش فاهمين الأوفيسر بيختبر إيه بالظبط. في الدرس ده، هنغطي أكتر من 12 سؤال حقيقي من مقابلات السفارة التشيكية، إجابات نموذجية، والمنطق ورا كل سؤال.\n\nهتتعلم:\n• الأربع أنواع من أسئلة السفارة\n• الأوفيسر بيقيّم إيه فعلًا\n• إجابات نموذجية تبان طبيعية مش محفوظة\n• الحاجات اللي بتسبب رفض الطلب\n• تتصرف إزاي لو جالك سؤال مكنتش متوقعه",
          },
          resources: [],
          isFree: true,
        },
        {
          id: "czech-geography-politics",
          title: {
            en: "Czech Geography, Politics & Culture Basics",
            ar: "جغرافيا وسياسة وثقافة التشيك",
          },
          duration: "10 min",
          videoUrl: null,
          content: {
            en: "The embassy expects you to know basic facts about Czechia. This lesson covers exactly what you need — nothing more, nothing less.\n\n• Where Czechia is and its neighboring countries\n• Capital, major cities, population\n• Government system and current president\n• Currency and economy basics\n• Key cultural facts that impress in interviews",
            ar: "السفارة بتتوقع إنك تعرف معلومات أساسية عن التشيك. الدرس ده بيغطي بالظبط اللي محتاجه — لا أكتر ولا أقل.\n\n• التشيك فين والدول اللي جنبها\n• العاصمة، أكبر المدن، عدد السكان\n• نظام الحكومة والرئيس الحالي\n• العملة وأساسيات الاقتصاد\n• معلومات ثقافية بتعمل انطباع كويس في المقابلة",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "education-system",
          title: {
            en: "Czech Education System vs. Your Country",
            ar: "نظام التعليم التشيكي مقارنة ببلدك",
          },
          duration: "8 min",
          videoUrl: null,
          content: {
            en: "Understanding how Czech universities work — and how they differ from what you're used to.\n\n• Bachelors, Masters, PhD structure\n• Semester system and exam periods\n• ECTS credits explained simply\n• Public vs private universities\n• Language of instruction options",
            ar: "فهم إزاي الجامعات التشيكية شغالة — وإيه الفرق بينها وبين اللي إنت متعود عليه.\n\n• هيكل البكالوريوس والماجستير والدكتوراه\n• نظام الفصول الدراسية وفترات الامتحانات\n• نقاط ECTS بشرح بسيط\n• الجامعات الحكومية مقابل الخاصة\n• لغات الدراسة المتاحة",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "study-plan-explanation",
          title: {
            en: "Your Study Plan: Sound Prepared, Not Scripted",
            ar: "خطة دراستك: ابان جاهز مش محفظ",
          },
          duration: "9 min",
          videoUrl: null,
          content: {
            en: "How to explain your study plan in a way that sounds genuine and well-researched.\n\n• Structuring your motivation story\n• Connecting your background to your chosen programme\n• Why this specific university and programme\n• Future career plans that make sense\n• Practice script with natural variations",
            ar: "إزاي تشرح خطتك الدراسية بطريقة تبان حقيقية ومبنية على بحث.\n\n• تنظيم قصة دوافعك\n• ربط خلفيتك بالبرنامج اللي اخترته\n• ليه الجامعة دي والبرنامج ده بالذات\n• خطط مستقبلية مهنية منطقية\n• سكريبت للتدريب مع تنويعات طبيعية",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "embassy-mistakes",
          title: {
            en: "Common Embassy Mistakes That Get People Rejected",
            ar: "أخطاء السفارة الشائعة اللي بتسبب الرفض",
          },
          duration: "7 min",
          videoUrl: null,
          content: {
            en: "Real stories of students who got rejected — and exactly what they did wrong.\n\n• The 5 most common rejection reasons\n• Documents that are often missing or wrong\n• Body language and attitude mistakes\n• What to do if your application is rejected\n• Timeline for reapplication",
            ar: "قصص حقيقية لطلاب اترفضوا — وإيه بالظبط اللي غلطوا فيه.\n\n• أكتر 5 أسباب شائعة للرفض\n• الأوراق اللي غالبًا بتبقى ناقصة أو غلط\n• أخطاء لغة الجسد والتصرفات\n• تعمل إيه لو طلبك اترفض\n• الجدول الزمني لإعادة التقديم",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "document-checklist",
          title: {
            en: "Complete Document Checklist & Preparation",
            ar: "قائمة الأوراق الكاملة والتجهيز",
          },
          duration: "11 min",
          videoUrl: null,
          content: {
            en: "Every single document you need, how to get it, and how to prepare it correctly.\n\n• Full visa application document list\n• Apostille — what it is and how to get it\n• Translation requirements\n• Bank statement format and minimum amounts\n• Insurance requirements and approved providers\n• Accommodation proof options",
            ar: "كل ورقة محتاجها، إزاي تجيبها، وإزاي تجهزها صح.\n\n• قائمة أوراق طلب الفيزا الكاملة\n• التصديق الحكومي (Apostille) — يعني إيه وإزاي تعمله\n• شروط الترجمة\n• كشف حساب البنك — الشكل المطلوب والمبلغ الأدنى\n• شروط التأمين والشركات المقبولة\n• إثبات السكن والخيارات المتاحة",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "visa-application-walkthrough",
          title: {
            en: "Visa Application Step-by-Step",
            ar: "طلب الفيزا خطوة بخطوة",
          },
          duration: "10 min",
          videoUrl: null,
          content: {
            en: "Walking through the entire visa application process from start to finish.\n\n• Online application form walkthrough\n• Booking your embassy appointment\n• What happens on interview day\n• Processing times by country\n• How to track your application status",
            ar: "مشي في عملية طلب الفيزا من الأول للآخر.\n\n• شرح استمارة الطلب أونلاين\n• حجز موعد السفارة\n• إيه اللي بيحصل يوم المقابلة\n• مدة المعالجة حسب البلد\n• إزاي تتابع حالة طلبك",
          },
          resources: [],
          isFree: false,
        },
      ],
      quiz: {
        title: {
          en: "Module 1 Quiz: Embassy & Pre-Arrival",
          ar: "اختبار الوحدة 1: السفارة وقبل السفر",
        },
        passingScore: 70,
        questions: [
          {
            id: "m1q1",
            question: {
              en: "When the embassy asks 'Why did you choose Czechia?', what are they really testing?",
              ar: "لما السفارة تسألك 'ليه اخترت التشيك؟'، هم فعلًا بيختبروا إيه؟",
            },
            options: [
              { en: "Your English skills", ar: "مهاراتك في الإنجليزي" },
              { en: "Whether you specifically researched Czechia and have a real reason", ar: "هل فعلًا بحثت عن التشيك بالذات وعندك سبب حقيقي" },
              { en: "How much money you have", ar: "عندك فلوس قد إيه" },
              { en: "Your grades from school", ar: "درجاتك في المدرسة" },
            ],
            correctIndex: 1,
            explanation: {
              en: "The officer wants to see you chose Czechia specifically, not just any country. Generic answers like 'good education' aren't enough.",
              ar: "الأوفيسر عايز يشوف إنك اخترت التشيك بالذات، مش أي بلد. إجابات عامة زي 'التعليم كويس' مش كفاية.",
            },
          },
          {
            id: "m1q2",
            question: {
              en: "What is an Apostille?",
              ar: "يعني إيه Apostille (تصديق حكومي)؟",
            },
            options: [
              { en: "A type of student visa", ar: "نوع من فيزا الطلاب" },
              { en: "An official government certification that authenticates your documents for international use", ar: "تصديق حكومي رسمي بيخلّي أوراقك معتمدة للاستخدام الدولي" },
              { en: "A Czech language test", ar: "امتحان لغة تشيكية" },
              { en: "A university entrance exam", ar: "امتحان قبول الجامعة" },
            ],
            correctIndex: 1,
            explanation: {
              en: "An Apostille is an official government stamp that authenticates documents like diplomas and birth certificates for use in another country.",
              ar: "التصديق الحكومي (Apostille) هو ختم رسمي من الحكومة بيصدّق على أوراقك زي الشهادات وشهادة الميلاد عشان تستخدمها في بلد تاني.",
            },
          },
          {
            id: "m1q3",
            question: {
              en: "What should you NOT do when asked 'Do you plan to return home after studies?'",
              ar: "إيه اللي المفروض ما تعملوش لما يسألوك 'بتخطط ترجع بلدك بعد الدراسة؟'",
            },
            options: [
              { en: "Mention your family ties back home", ar: "تتكلم عن ارتباطك بعيلتك في بلدك" },
              { en: "Say 'No, I want to stay in Europe forever'", ar: "تقول 'لا، أنا عايز أفضل في أوروبا للأبد'" },
              { en: "Talk about career plans in your home country", ar: "تتكلم عن خططك المهنية في بلدك" },
              { en: "Explain how your studies connect to job opportunities at home", ar: "تشرح إزاي دراستك مرتبطة بفرص شغل في بلدك" },
            ],
            correctIndex: 1,
            explanation: {
              en: "Saying you want to stay permanently raises immigration risk red flags. Show ties to your home country while being honest about your plans.",
              ar: "لو قلت إنك عايز تفضل للأبد ده بيرفع علامات خطر الهجرة. بيّن ارتباطك ببلدك وأنت بتبقى صادق عن خططك.",
            },
          },
          {
            id: "m1q4",
            question: {
              en: "How many ECTS credits is a typical bachelor's degree?",
              ar: "البكالوريوس عادةً بيبقى كام نقطة ECTS؟",
            },
            options: [
              { en: "60 credits", ar: "60 نقطة" },
              { en: "120 credits", ar: "120 نقطة" },
              { en: "180 credits", ar: "180 نقطة" },
              { en: "240 credits", ar: "240 نقطة" },
            ],
            correctIndex: 2,
            explanation: {
              en: "A standard bachelor's degree in the European system is 180 ECTS credits (3 years × 60 credits per year).",
              ar: "البكالوريوس العادي في النظام الأوروبي هو 180 نقطة ECTS (3 سنين × 60 نقطة في السنة).",
            },
          },
          {
            id: "m1q5",
            question: {
              en: "What is the most common reason for Czech visa rejection?",
              ar: "إيه أكتر سبب شائع لرفض الفيزا التشيكية؟",
            },
            options: [
              { en: "Bad grades", ar: "درجات وحشة" },
              { en: "Incomplete or incorrect documents", ar: "أوراق ناقصة أو غلط" },
              { en: "Being too old", ar: "إنك كبير في السن" },
              { en: "Not speaking Czech", ar: "إنك مش بتتكلم تشيكي" },
            ],
            correctIndex: 1,
            explanation: {
              en: "The #1 reason is documentation issues — missing papers, wrong translations, expired documents, or insufficient bank statements.",
              ar: "السبب رقم 1 هو مشاكل في الأوراق — أوراق ناقصة، ترجمة غلط، أوراق منتهية الصلاحية، أو كشف حساب بنكي مش كافي.",
            },
          },
        ],
      },
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODULE 2: Your First Week Survival Kit
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "first-week",
      title: { en: "Your First Week Survival Kit", ar: "حقيبة النجاة لأول أسبوع" },
      subtitle: {
        en: "Everything from airport to settled",
        ar: "كل حاجة من المطار لحد ما تستقر",
      },
      icon: "MapPin",
      lessons: [
        {
          id: "airport-to-home",
          title: {
            en: "Airport to Your Accommodation",
            ar: "من المطار لمكان سكنك",
          },
          duration: "8 min",
          videoUrl: null,
          content: {
            en: "Step-by-step guide from the moment you land.\n\n• What to do at passport control\n• Best transport from Prague airport (bus 119 + metro vs taxi vs Bolt)\n• How to buy a transport ticket at the airport\n• What to have ready on your phone\n• Getting to Brno or other cities from Prague",
            ar: "دليل خطوة بخطوة من لحظة ما تنزل.\n\n• تعمل إيه في الجوازات\n• أحسن طريقة من مطار براغ (باص 119 + مترو ولا تاكسي ولا Bolt)\n• إزاي تشتري تذكرة مواصلات في المطار\n• إيه اللي لازم يبقى جاهز على موبايلك\n• إزاي توصل برنو أو مدن تانية من براغ",
          },
          resources: [],
          isFree: true,
        },
        {
          id: "foreign-police",
          title: {
            en: "Foreign Police Registration",
            ar: "تسجيل شرطة الأجانب",
          },
          duration: "9 min",
          videoUrl: null,
          content: {
            en: "You must register within 3 days of arrival. Here's exactly how.\n\n• Where to go and when\n• Documents you need to bring\n• What the registration form looks like\n• Common mistakes that cause problems later\n• What happens if you miss the deadline",
            ar: "لازم تسجّل خلال 3 أيام من وصولك. هنا بالظبط إزاي.\n\n• تروح فين وإمتى\n• الأوراق اللي محتاج تاخدها معاك\n• استمارة التسجيل شكلها إيه\n• أخطاء شائعة بتسبب مشاكل بعدين\n• إيه اللي بيحصل لو فاتك الميعاد",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "first-day-checklist",
          title: {
            en: "SIM, Bank, Transport Pass — First Day Checklist",
            ar: "شريحة موبايل، بنك، اشتراك مواصلات — قائمة أول يوم",
          },
          duration: "10 min",
          videoUrl: null,
          content: {
            en: "The essential setup tasks for your first 48 hours.\n\n• Best Czech SIM card providers and plans for students\n• Opening a bank account: which bank and what documents\n• Getting your transport pass (Lítačka in Prague)\n• Essential apps to download\n• Setting up your Czech phone number for everything",
            ar: "المهام الأساسية اللي لازم تعملها في أول 48 ساعة.\n\n• أحسن شركات شرائح موبايل وباقات للطلاب\n• فتح حساب بنكي: أنهي بنك وإيه الأوراق المطلوبة\n• استخراج اشتراك المواصلات (Lítačka في براغ)\n• تطبيقات ضرورية تنزّلها\n• تفعيل رقمك التشيكي لكل حاجة",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "first-grocery-run",
          title: {
            en: "Your First Grocery Run",
            ar: "أول مشوار سوبر ماركت",
          },
          duration: "7 min",
          videoUrl: null,
          content: {
            en: "Navigate Czech supermarkets like a local from day one.\n\n• Albert vs Lidl vs Billa vs Kaufland — which is cheapest\n• Reading Czech food labels\n• Finding halal and familiar food options\n• Average grocery budget per week\n• Where to find Middle Eastern shops",
            ar: "اتحرك في السوبر ماركتات التشيكية زي الناس المحلية من أول يوم.\n\n• Albert ولا Lidl ولا Billa ولا Kaufland — أنهي أرخص\n• قراءة التسميات على الأكل بالتشيكي\n• لاقي أكل حلال وأكل مألوف\n• ميزانية البقالة في الأسبوع\n• أماكن محلات الأكل الشرق أوسطي",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "emergency-phrases",
          title: {
            en: "Emergency Czech Phrases",
            ar: "جمل تشيكي طوارئ",
          },
          duration: "12 min",
          videoUrl: null,
          content: {
            en: "The 30 most critical Czech phrases you need in your first week. Audio included.\n\n• Greetings and basic politeness\n• 'I don't speak Czech' and 'Do you speak English?'\n• Numbers 1–10 and prices\n• Asking for help and directions\n• Emergency phrases (police, hospital, fire)",
            ar: "أهم 30 جملة تشيكية محتاجها في أول أسبوع. مع صوت.\n\n• التحيات والكلام المهذب الأساسي\n• 'أنا مش بتكلم تشيكي' و'بتتكلم إنجليزي؟'\n• الأرقام من 1 لـ 10 والأسعار\n• طلب المساعدة والاتجاهات\n• جمل طوارئ (شرطة، مستشفى، حريق)",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "accommodation-tips",
          title: {
            en: "Accommodation: Dorms vs Rent",
            ar: "السكن: سكن جامعي ولا إيجار",
          },
          duration: "8 min",
          videoUrl: null,
          content: {
            en: "Understanding your housing options and how to secure them.\n\n• University dormitories: how to apply, costs, pros and cons\n• Renting a room or flat: average prices by city\n• Czech rental scams to watch out for\n• Websites and Facebook groups for finding accommodation\n• Your rights as a tenant in Czechia",
            ar: "فهم خيارات السكن وإزاي تحجز.\n\n• السكن الجامعي: إزاي تقدم، التكاليف، المميزات والعيوب\n• إيجار أوضة أو شقة: متوسط الأسعار حسب المدينة\n• نصب الإيجارات التشيكي اللي لازم تاخد بالك منه\n• مواقع وجروبات فيسبوك لإيجاد سكن\n• حقوقك كمستأجر في التشيك",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "weather-packing",
          title: {
            en: "Czech Weather & What to Pack",
            ar: "طقس التشيك وإيه اللي تاخده معاك",
          },
          duration: "6 min",
          videoUrl: null,
          content: {
            en: "Czech winters are brutal if you're not prepared. Here's what you actually need.\n\n• Month-by-month weather expectations\n• Essential clothing for Czech winter\n• What NOT to pack (buy it cheaper in Czechia)\n• Where to buy affordable winter clothes\n• Dealing with seasonal darkness and cold",
            ar: "شتاء التشيك صعب لو مش مجهّز. هنا اللي فعلًا محتاجه.\n\n• توقعات الطقس شهر بشهر\n• الهدوم الأساسية لشتاء التشيك\n• إيه اللي ما تاخدوش معاك (اشتريه أرخص هناك)\n• أماكن شراء هدوم شتوية بسعر كويس\n• التعامل مع البرد والضلمة في الشتاء",
          },
          resources: [],
          isFree: false,
        },
      ],
      quiz: {
        title: {
          en: "Module 2 Quiz: First Week Survival",
          ar: "اختبار الوحدة 2: النجاة في أول أسبوع",
        },
        passingScore: 70,
        questions: [
          {
            id: "m2q1",
            question: {
              en: "Within how many days of arrival must you register with the Foreign Police?",
              ar: "لازم تسجل في شرطة الأجانب خلال كام يوم من وصولك؟",
            },
            options: [
              { en: "1 day", ar: "يوم واحد" },
              { en: "3 days", ar: "3 أيام" },
              { en: "7 days", ar: "7 أيام" },
              { en: "30 days", ar: "30 يوم" },
            ],
            correctIndex: 1,
            explanation: {
              en: "You must register within 3 working days of arriving in Czechia. Your university dorm may do this for you automatically.",
              ar: "لازم تسجل خلال 3 أيام عمل من وصولك التشيك. سكن الجامعة ممكن يعملها تلقائيًا.",
            },
          },
          {
            id: "m2q2",
            question: {
              en: "What is the cheapest way to get from Prague Airport to the city center?",
              ar: "إيه أرخص طريقة توصل من مطار براغ لوسط المدينة؟",
            },
            options: [
              { en: "Taxi", ar: "تاكسي" },
              { en: "Bus 119 + Metro", ar: "باص 119 + مترو" },
              { en: "Uber", ar: "أوبر" },
              { en: "Airport Express bus", ar: "باص Airport Express" },
            ],
            correctIndex: 1,
            explanation: {
              en: "Bus 119 to Nádraží Veleslavín metro station, then take the green line. Costs about 40 CZK (~€1.60) with a regular ticket.",
              ar: "باص 119 لمحطة مترو Nádraží Veleslavín، وبعدين الخط الأخضر. بيكلف حوالي 40 كرونة (~1.60€) بتذكرة عادية.",
            },
          },
          {
            id: "m2q3",
            question: {
              en: "Which supermarket chain is generally the cheapest in Czechia?",
              ar: "أنهي سلسلة سوبر ماركت عمومًا الأرخص في التشيك؟",
            },
            options: [
              { en: "Albert", ar: "Albert" },
              { en: "Billa", ar: "Billa" },
              { en: "Lidl", ar: "Lidl" },
              { en: "Marks & Spencer", ar: "Marks & Spencer" },
            ],
            correctIndex: 2,
            explanation: {
              en: "Lidl is generally the cheapest, followed by Kaufland. Albert and Billa tend to be slightly more expensive.",
              ar: "Lidl عمومًا الأرخص، وبعده Kaufland. Albert و Billa بيبقوا أغلى شوية.",
            },
          },
          {
            id: "m2q4",
            question: {
              en: "What is 'Lítačka' in Prague?",
              ar: "إيه هي 'Lítačka' في براغ؟",
            },
            options: [
              { en: "A food delivery app", ar: "تطبيق توصيل أكل" },
              { en: "A public transport card/app", ar: "كارت/تطبيق مواصلات عامة" },
              { en: "A student dormitory", ar: "سكن جامعي" },
              { en: "A Czech greeting", ar: "تحية تشيكية" },
            ],
            correctIndex: 1,
            explanation: {
              en: "Lítačka is Prague's public transport card and app. Students get discounted passes — around 130 CZK/month.",
              ar: "Lítačka هو كارت وتطبيق المواصلات العامة في براغ. الطلاب بياخدوا تخفيض — حوالي 130 كرونة في الشهر.",
            },
          },
          {
            id: "m2q5",
            question: {
              en: "What should you do FIRST when you arrive at your accommodation?",
              ar: "إيه أول حاجة لازم تعملها لما توصل مكان سكنك؟",
            },
            options: [
              { en: "Go sightseeing", ar: "تروح تتفرج على المعالم" },
              { en: "Buy winter clothes", ar: "تشتري هدوم شتوية" },
              { en: "Connect to WiFi and contact your family", ar: "تتوصل بالواي فاي وتتواصل مع عيلتك" },
              { en: "Register at the university", ar: "تسجل في الجامعة" },
            ],
            correctIndex: 2,
            explanation: {
              en: "First priority is getting connected — WiFi, SIM card, and letting your family know you arrived safely.",
              ar: "الأولوية الأولى إنك تتوصل — واي فاي، شريحة موبايل، وتطمّن عيلتك إنك وصلت بالسلامة.",
            },
          },
        ],
      },
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODULE 3: Daily Life Conversations
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "daily-life",
      title: { en: "Daily Life Conversations", ar: "محادثات الحياة اليومية" },
      subtitle: {
        en: "Restaurant, supermarket, transport, doctor, university",
        ar: "مطعم، سوبر ماركت، مواصلات، دكتور، جامعة",
      },
      icon: "Coffee",
      lessons: [
        {
          id: "ordering-food",
          title: {
            en: "Ordering Food & Drinks",
            ar: "طلب أكل وشرب",
          },
          duration: "10 min",
          videoUrl: null,
          content: {
            en: "Real Czech phrases for restaurants, cafés, and fast food. Not textbook Czech — actual phrases people use.\n\n• How to get a table and order\n• Understanding Czech menus\n• Asking about ingredients (especially for halal/dietary needs)\n• Paying the bill and tipping culture\n• Common Czech dishes you should try",
            ar: "جمل تشيكية حقيقية للمطاعم والكافيهات والأكل السريع. مش تشيكي من الكتب — جمل الناس بتستخدمها فعلًا.\n\n• إزاي تاخد ترابيزة وتطلب\n• فهم المنيو التشيكي\n• السؤال عن المكونات (خصوصًا للأكل الحلال/الحمية)\n• دفع الحساب وثقافة البقشيش\n• أكلات تشيكية لازم تجربها",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "shopping-pharmacy",
          title: {
            en: "Supermarket & Pharmacy",
            ar: "سوبر ماركت وصيدلية",
          },
          duration: "8 min",
          videoUrl: null,
          content: {
            en: "Reading Czech labels, finding what you need, asking for help.\n\n• Essential grocery vocabulary\n• Reading ingredient lists and allergen info\n• Pharmacy basics: what you can buy without prescription\n• Asking for specific items\n• Self-checkout machines in Czech",
            ar: "قراءة التسميات التشيكية، إيجاد اللي محتاجه، طلب مساعدة.\n\n• مفردات البقالة الأساسية\n• قراءة قائمة المكونات ومعلومات الحساسية\n• أساسيات الصيدلية: إيه اللي ممكن تشتريه من غير روشتة\n• السؤال عن منتجات معينة\n• ماكينات الدفع الذاتي بالتشيكي",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "public-transport",
          title: {
            en: "Public Transport Conversations",
            ar: "محادثات المواصلات العامة",
          },
          duration: "8 min",
          videoUrl: null,
          content: {
            en: "Buying tickets, understanding announcements, asking for help.\n\n• How Prague/Brno transport systems work\n• Buying tickets: machines, apps, SMS\n• Understanding station announcements\n• Asking 'Does this tram go to...?'\n• What happens if you get caught without a ticket",
            ar: "شراء تذاكر، فهم الإعلانات، طلب مساعدة.\n\n• إزاي مواصلات براغ/برنو شغالة\n• شراء تذاكر: ماكينات، تطبيقات، رسائل SMS\n• فهم إعلانات المحطات\n• السؤال 'الترام ده بيروح لـ...؟'\n• إيه اللي بيحصل لو اتمسكت من غير تذكرة",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "at-the-doctor",
          title: {
            en: "At the Doctor",
            ar: "عند الدكتور",
          },
          duration: "9 min",
          videoUrl: null,
          content: {
            en: "How to explain symptoms and understand medical instructions in Czech.\n\n• Registering with a GP (general practitioner)\n• How Czech healthcare works for students\n• Body parts and symptom vocabulary\n• Common phrases at the doctor\n• Emergency numbers and what to say",
            ar: "إزاي تشرح الأعراض وتفهم التعليمات الطبية بالتشيكي.\n\n• التسجيل عند دكتور عام\n• إزاي النظام الصحي التشيكي شغال للطلاب\n• أسماء أجزاء الجسم والأعراض\n• جمل شائعة عند الدكتور\n• أرقام الطوارئ وتقول إيه",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "university-admin",
          title: {
            en: "University Admin & Registration",
            ar: "إدارة الجامعة والتسجيل",
          },
          duration: "9 min",
          videoUrl: null,
          content: {
            en: "Navigate university bureaucracy like a pro.\n\n• Registration day: what to expect\n• Getting your ISIC student card\n• Using the university information system (IS/STAG)\n• Library registration and access\n• Exam registration and grading system",
            ar: "اتعامل مع بيروقراطية الجامعة زي المحترفين.\n\n• يوم التسجيل: توقع إيه\n• استخراج كارت ISIC\n• استخدام نظام معلومات الجامعة (IS/STAG)\n• تسجيل المكتبة والدخول\n• تسجيل الامتحانات ونظام الدرجات",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "landlord-neighbors",
          title: {
            en: "Talking to Your Landlord & Neighbors",
            ar: "الكلام مع صاحب البيت والجيران",
          },
          duration: "7 min",
          videoUrl: null,
          content: {
            en: "Essential phrases for housing situations.\n\n• Reporting problems (heating, water, noise)\n• Understanding your lease basics\n• Greeting neighbors properly\n• Trash sorting rules (this is serious in Czechia)\n• Building rules and quiet hours",
            ar: "جمل أساسية لمواقف السكن.\n\n• الإبلاغ عن مشاكل (تدفئة، مية، دوشة)\n• فهم أساسيات عقد الإيجار\n• تحية الجيران بشكل مناسب\n• قواعد فرز الزبالة (ده موضوع جدي في التشيك)\n• قواعد العمارة وساعات الهدوء",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "phone-calls-emails",
          title: {
            en: "Phone Calls & Formal Emails in Czech",
            ar: "مكالمات تليفون وإيميلات رسمية بالتشيكي",
          },
          duration: "8 min",
          videoUrl: null,
          content: {
            en: "Templates and phrases for formal communication.\n\n• How to answer the phone in Czech\n• Making appointments (doctor, office, etc.)\n• Email templates for university professors\n• Formal vs informal address (ty vs vy)\n• Common formal phrases you'll need",
            ar: "قوالب وجمل للتواصل الرسمي.\n\n• إزاي ترد على التليفون بالتشيكي\n• حجز مواعيد (دكتور، مكتب، إلخ)\n• قوالب إيميل لأساتذة الجامعة\n• الفرق بين الكلام الرسمي والعادي (ty مقابل vy)\n• جمل رسمية شائعة هتحتاجها",
          },
          resources: [],
          isFree: false,
        },
      ],
      quiz: {
        title: {
          en: "Module 3 Quiz: Daily Life",
          ar: "اختبار الوحدة 3: الحياة اليومية",
        },
        passingScore: 70,
        questions: [
          {
            id: "m3q1",
            question: {
              en: "What is the tipping culture in Czech restaurants?",
              ar: "ثقافة البقشيش إيه في المطاعم التشيكية؟",
            },
            options: [
              { en: "No tipping expected", ar: "مفيش بقشيش متوقع" },
              { en: "Round up to the nearest 10 or add 10%", ar: "تكمّل لأقرب 10 أو تزود 10%" },
              { en: "Always tip 20%", ar: "دايمًا بقشيش 20%" },
              { en: "Leave coins on the table", ar: "سيب فكة على الترابيزة" },
            ],
            correctIndex: 1,
            explanation: {
              en: "Czechs typically round up or add about 10%. You tell the waiter the total amount when paying, rather than leaving money on the table.",
              ar: "التشيك عادةً بيكمّلوا لأقرب رقم أو يزودوا حوالي 10%. بتقول للجرسون المبلغ الكلي وإنت بتدفع، بدل ما تسيب فلوس على الترابيزة.",
            },
          },
          {
            id: "m3q2",
            question: {
              en: "What is the penalty for riding without a ticket in Prague?",
              ar: "إيه الغرامة لو ركبت من غير تذكرة في براغ؟",
            },
            options: [
              { en: "Warning only", ar: "إنذار بس" },
              { en: "200 CZK", ar: "200 كرونة" },
              { en: "1,500 CZK on the spot", ar: "1,500 كرونة فوري" },
              { en: "Arrest", ar: "اعتقال" },
            ],
            correctIndex: 2,
            explanation: {
              en: "The fine is 1,500 CZK if paid on the spot (or within 15 days). Inspectors carry ID and can check tickets at any time.",
              ar: "الغرامة 1,500 كرونة لو دفعت فورًا (أو خلال 15 يوم). المفتشين معاهم هوية وممكن يفتشوا التذاكر في أي وقت.",
            },
          },
          {
            id: "m3q3",
            question: {
              en: "What does 'vy' mean in Czech formal address?",
              ar: "يعني إيه 'vy' في الكلام الرسمي التشيكي؟",
            },
            options: [
              { en: "The informal 'you' for friends", ar: "'أنت' العادية للأصحاب" },
              { en: "The formal 'you' for strangers and elders", ar: "'حضرتك' للغرباء والكبار" },
              { en: "A greeting word", ar: "كلمة تحية" },
              { en: "A farewell word", ar: "كلمة وداع" },
            ],
            correctIndex: 1,
            explanation: {
              en: "'Vy' is the formal/polite 'you'. Use it with professors, officials, and people you don't know well. 'Ty' is informal, for friends.",
              ar: "'Vy' هي 'حضرتك' الرسمية/المهذبة. استخدمها مع الأساتذة والمسؤولين والناس اللي ما تعرفهمش كويس. 'Ty' عادية، للأصحاب.",
            },
          },
          {
            id: "m3q4",
            question: {
              en: "Where should you register first as a student to access healthcare?",
              ar: "لازم تسجل فين الأول كطالب عشان تقدر تروح الدكتور؟",
            },
            options: [
              { en: "The nearest hospital", ar: "أقرب مستشفى" },
              { en: "A general practitioner (GP)", ar: "دكتور عام (GP)" },
              { en: "The embassy", ar: "السفارة" },
              { en: "Your university", ar: "جامعتك" },
            ],
            correctIndex: 1,
            explanation: {
              en: "You need to register with a GP (praktický lékař) who becomes your primary doctor. They refer you to specialists when needed.",
              ar: "لازم تسجل عند دكتور عام (praktický lékař) اللي بيبقى دكتورك الأساسي. هو بيحولك لمتخصصين لما تحتاج.",
            },
          },
        ],
      },
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODULE 4: Understanding Czech People
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "czech-culture",
      title: { en: "Understanding Czech People", ar: "فهم الشعب التشيكي" },
      subtitle: {
        en: "Culture, making friends, avoiding common mistakes",
        ar: "ثقافة، صداقات، تجنب الأخطاء الشائعة",
      },
      icon: "Heart",
      lessons: [
        {
          id: "czech-social-norms",
          title: {
            en: "Why Czechs Seem Cold (They're Not)",
            ar: "ليه التشيك بيبانوا باردين (بس مش كده)",
          },
          duration: "9 min",
          videoUrl: null,
          content: {
            en: "Understanding Czech communication style and social norms.\n\n• Why Czechs don't smile at strangers (it's not rudeness)\n• Direct communication vs Arabic indirect style\n• How Czechs build friendships (slowly but deeply)\n• Personal space and physical contact differences\n• The Czech sense of humor (dry, sarcastic, brilliant)",
            ar: "فهم أسلوب التواصل والعادات الاجتماعية التشيكية.\n\n• ليه التشيك مش بيبتسموا للغرباء (مش قلة أدب)\n• التواصل المباشر مقابل الأسلوب العربي غير المباشر\n• إزاي التشيك بيبنوا صداقات (ببطء بس بعمق)\n• فرق المساحة الشخصية والتلامس\n• الحس الكوميدي التشيكي (ساخر وذكي)",
          },
          resources: [],
          isFree: true,
        },
        {
          id: "arab-czech-differences",
          title: {
            en: "Arab vs Czech Cultural Differences",
            ar: "فروق بين الثقافة العربية والتشيكية",
          },
          duration: "10 min",
          videoUrl: null,
          content: {
            en: "The biggest cultural gaps and how to bridge them.\n\n• Hospitality expectations (Arab generosity vs Czech privacy)\n• Time culture: being late means different things\n• Food and dining differences\n• Religious practice in a secular country\n• Gender norms and dating culture",
            ar: "أكبر الفجوات الثقافية وإزاي تتعامل معاها.\n\n• توقعات الضيافة (الكرم العربي مقابل خصوصية التشيك)\n• ثقافة الوقت: التأخير معناه حاجات مختلفة\n• فروق الأكل والأكل على السفرة\n• ممارسة الدين في بلد علمانية\n• عادات العلاقات والجنسين",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "making-czech-friends",
          title: {
            en: "How to Actually Make Czech Friends",
            ar: "إزاي فعلًا تعمل صحاب تشيك",
          },
          duration: "8 min",
          videoUrl: null,
          content: {
            en: "Practical strategies that work, not generic advice.\n\n• Join these specific types of activities\n• The pub (hospoda) as Czech social headquarters\n• Study groups and sports clubs\n• Conversation starters that work with Czechs\n• The 'buddy system' at Czech universities",
            ar: "استراتيجيات عملية بتنفع، مش نصايح عامة.\n\n• اشترك في الأنواع دي من الأنشطة\n• البار (hospoda) كمقر اجتماعي تشيكي\n• مجموعات دراسة ونوادي رياضية\n• كلام بيفتح محادثة مع التشيك\n• نظام الـ 'buddy' في الجامعات التشيكية",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "cultural-misunderstandings",
          title: {
            en: "Common Cultural Misunderstandings",
            ar: "سوء الفهم الثقافي الشائع",
          },
          duration: "8 min",
          videoUrl: null,
          content: {
            en: "Real stories and how to avoid these situations.\n\n• The shoe situation (always remove shoes indoors)\n• Noise levels and neighbor complaints\n• Cooking smells in shared accommodation\n• Public behavior expectations\n• How to apologize when you make a mistake",
            ar: "قصص حقيقية وإزاي تتجنب المواقف دي.\n\n• موضوع الجزم (دايمًا اخلعها جوه البيت)\n• مستوى الصوت وشكاوى الجيران\n• ريحة الأكل في السكن المشترك\n• التصرف المتوقع في الأماكن العامة\n• إزاي تعتذر لما تغلط",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "holidays-traditions",
          title: {
            en: "Czech Holidays & Traditions",
            ar: "أعياد وتقاليد التشيك",
          },
          duration: "7 min",
          videoUrl: null,
          content: {
            en: "Major holidays and what to expect.\n\n• Christmas Czech-style (carp, potato salad, presents on Dec 24)\n• Easter traditions (the pomlázka!)\n• Czech national holidays and days off\n• University-specific celebrations\n• How to participate as a foreigner",
            ar: "الأعياد الكبيرة وتوقع إيه.\n\n• الكريسماس بالطريقة التشيكية (سمك الكارب، سلطة بطاطس، هدايا يوم 24 ديسمبر)\n• تقاليد عيد الفصح (الـ pomlázka!)\n• الأعياد الوطنية التشيكية والإجازات\n• احتفالات خاصة بالجامعة\n• إزاي تشارك كأجنبي",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "dealing-with-homesickness",
          title: {
            en: "Dealing with Homesickness & Culture Shock",
            ar: "التعامل مع الحنين للبلد وصدمة الثقافة",
          },
          duration: "8 min",
          videoUrl: null,
          content: {
            en: "It's normal, and here's how to handle it.\n\n• The 4 stages of culture shock\n• Practical strategies that actually help\n• Building a support network\n• When to seek professional help\n• Finding Arab community events in Czechia",
            ar: "ده طبيعي، وهنا إزاي تتعامل معاه.\n\n• الأربع مراحل لصدمة الثقافة\n• استراتيجيات عملية بتساعد فعلًا\n• بناء شبكة دعم\n• إمتى تطلب مساعدة متخصصة\n• لاقي فعاليات الجالية العربية في التشيك",
          },
          resources: [],
          isFree: false,
        },
      ],
      quiz: {
        title: {
          en: "Module 4 Quiz: Czech Culture",
          ar: "اختبار الوحدة 4: الثقافة التشيكية",
        },
        passingScore: 70,
        questions: [
          {
            id: "m4q1",
            question: {
              en: "Why don't Czechs typically smile at strangers?",
              ar: "ليه التشيك عادةً مش بيبتسموا للغرباء؟",
            },
            options: [
              { en: "They are rude people", ar: "هم ناس قليلة أدب" },
              { en: "It's not part of their communication style — smiling is reserved for genuine moments", ar: "مش جزء من أسلوب تواصلهم — الابتسامة للمواقف الحقيقية بس" },
              { en: "They don't like foreigners", ar: "مش بيحبوا الأجانب" },
              { en: "It's illegal to smile in public", ar: "ممنوع الابتسام في الأماكن العامة" },
            ],
            correctIndex: 1,
            explanation: {
              en: "In Czech culture, smiling at strangers is seen as insincere. Czechs reserve genuine smiles for people they know. It's a cultural norm, not rudeness.",
              ar: "في الثقافة التشيكية، الابتسام للغرباء بيبان مش حقيقي. التشيك بيبتسموا بجد للناس اللي يعرفوهم. دي عادة ثقافية، مش قلة أدب.",
            },
          },
          {
            id: "m4q2",
            question: {
              en: "What should you ALWAYS do when entering a Czech home?",
              ar: "إيه اللي لازم دايمًا تعمله لما تدخل بيت تشيكي؟",
            },
            options: [
              { en: "Bring flowers", ar: "تجيب ورد" },
              { en: "Remove your shoes", ar: "تخلع جزمتك" },
              { en: "Bow", ar: "تنحني" },
              { en: "Clap three times", ar: "تصفق 3 مرات" },
            ],
            correctIndex: 1,
            explanation: {
              en: "Removing shoes when entering a home is very important in Czech culture. Most hosts will offer you house slippers (přezůvky).",
              ar: "خلع الجزمة لما تدخل بيت حاجة مهمة جدًا في الثقافة التشيكية. أغلب الناس هيقدمولك شبشب بيت (přezůvky).",
            },
          },
          {
            id: "m4q3",
            question: {
              en: "When is Christmas celebrated in Czechia?",
              ar: "الكريسماس بيتحتفل بيه إمتى في التشيك؟",
            },
            options: [
              { en: "December 25", ar: "25 ديسمبر" },
              { en: "December 24 (evening)", ar: "24 ديسمبر (بالليل)" },
              { en: "January 7", ar: "7 يناير" },
              { en: "December 31", ar: "31 ديسمبر" },
            ],
            correctIndex: 1,
            explanation: {
              en: "Czechs celebrate Christmas Eve (Štědrý den) on December 24 with a big dinner and gift exchange in the evening.",
              ar: "التشيك بيحتفلوا بليلة الكريسماس (Štědrý den) يوم 24 ديسمبر بعشاء كبير وتبادل هدايا بالليل.",
            },
          },
          {
            id: "m4q4",
            question: {
              en: "What is a 'hospoda' in Czech culture?",
              ar: "يعني إيه 'hospoda' في الثقافة التشيكية؟",
            },
            options: [
              { en: "A hospital", ar: "مستشفى" },
              { en: "A traditional pub — the social center of Czech life", ar: "بار تقليدي — المركز الاجتماعي للحياة التشيكية" },
              { en: "A church", ar: "كنيسة" },
              { en: "A university building", ar: "مبنى جامعي" },
            ],
            correctIndex: 1,
            explanation: {
              en: "The hospoda (pub) is central to Czech social life. It's where friends meet, discuss, and bond. Beer culture is a big part of Czech identity.",
              ar: "الـ hospoda (البار) هو مركز الحياة الاجتماعية التشيكية. هو المكان اللي الأصحاب بيتقابلوا فيه ويتكلموا ويقربوا من بعض. ثقافة البيرة جزء كبير من الهوية التشيكية.",
            },
          },
        ],
      },
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODULE 5: Building Your Life Here
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "building-life",
      title: { en: "Building Your Life Here", ar: "بناء حياتك هنا" },
      subtitle: {
        en: "Work, money, travel, visa renewal",
        ar: "شغل، فلوس، سفر، تجديد الفيزا",
      },
      icon: "Briefcase",
      lessons: [
        {
          id: "student-jobs",
          title: {
            en: "Student Jobs: Legal, Where, How Much",
            ar: "وظائف الطلاب: إيه القانوني وفين وبكام",
          },
          duration: "10 min",
          videoUrl: null,
          content: {
            en: "Everything about working as a student in Czechia.\n\n• Legal work hours and restrictions for student visa holders\n• Types of jobs available to students\n• Average pay rates by job type\n• Where to find job listings\n• Czech CV format and job application tips",
            ar: "كل حاجة عن الشغل كطالب في التشيك.\n\n• ساعات الشغل القانونية والقيود لحاملي فيزا الطلاب\n• أنواع الشغل المتاحة للطلاب\n• متوسط المرتبات حسب نوع الشغل\n• فين تلاقي إعلانات الوظائف\n• شكل السيرة الذاتية التشيكي ونصايح التقديم",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "managing-money",
          title: {
            en: "Managing Your Money in Czechia",
            ar: "إدارة فلوسك في التشيك",
          },
          duration: "9 min",
          videoUrl: null,
          content: {
            en: "Czech banking, fees, and sending money home.\n\n• Best banks for students (comparing fees)\n• Using Wise/Revolut for international transfers\n• Monthly budgeting as a student\n• Student discounts you should know about\n• Tax basics for working students",
            ar: "البنوك التشيكية والرسوم وتحويل الفلوس للبلد.\n\n• أحسن البنوك للطلاب (مقارنة الرسوم)\n• استخدام Wise/Revolut للتحويلات الدولية\n• ميزانية شهرية كطالب\n• تخفيضات الطلاب اللي لازم تعرفها\n• أساسيات الضرائب للطلاب اللي بيشتغلوا",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "weekend-travel",
          title: {
            en: "Weekend Trips & Cheap European Travel",
            ar: "رحلات ويك إند وسفر أوروبي رخيص",
          },
          duration: "8 min",
          videoUrl: null,
          content: {
            en: "Czechia is in the heart of Europe — take advantage.\n\n• Best budget destinations from Czechia\n• FlixBus, RegioJet, and budget airlines\n• Student travel cards and discounts\n• Day trips from Prague and Brno\n• Schengen travel rules on a student visa",
            ar: "التشيك في قلب أوروبا — استغل ده.\n\n• أحسن الوجهات الرخيصة من التشيك\n• FlixBus و RegioJet وشركات طيران رخيصة\n• كروت سفر الطلاب والتخفيضات\n• رحلات يوم واحد من براغ وبرنو\n• قواعد السفر في منطقة شنغن بفيزا طالب",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "visa-renewal",
          title: {
            en: "Visa Renewal: What's Different the Second Time",
            ar: "تجديد الفيزا: إيه المختلف المرة التانية",
          },
          duration: "10 min",
          videoUrl: null,
          content: {
            en: "Renewing your visa is different from the first application.\n\n• When to start the renewal process\n• Documents needed (what's new, what's the same)\n• The renewal interview: different questions\n• What happens if your renewal is late\n• Switching from student visa to work permit",
            ar: "تجديد الفيزا مختلف عن أول طلب.\n\n• إمتى تبدأ عملية التجديد\n• الأوراق المطلوبة (إيه الجديد وإيه نفسه)\n• مقابلة التجديد: أسئلة مختلفة\n• إيه اللي بيحصل لو تأخرت في التجديد\n• التحويل من فيزا طالب لتصريح شغل",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "staying-after-graduation",
          title: {
            en: "Staying After Graduation",
            ar: "البقاء بعد التخرج",
          },
          duration: "9 min",
          videoUrl: null,
          content: {
            en: "Your options for building a permanent life in Czechia.\n\n• Job-seeker visa after graduation\n• Employee card (zaměstnanecká karta)\n• Permanent residence requirements\n• Czech citizenship path\n• Entrepreneurship options (trade license/živnostenský list)",
            ar: "خياراتك لبناء حياة دائمة في التشيك.\n\n• فيزا البحث عن شغل بعد التخرج\n• كارت الموظف (zaměstnanecká karta)\n• شروط الإقامة الدائمة\n• مسار الجنسية التشيكية\n• خيارات ريادة الأعمال (رخصة تجارية/živnostenský list)",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "mental-health-wellbeing",
          title: {
            en: "Mental Health & Well-being Abroad",
            ar: "الصحة النفسية والرفاهية في الغربة",
          },
          duration: "7 min",
          videoUrl: null,
          content: {
            en: "Taking care of yourself is not optional.\n\n• Free counseling services at Czech universities\n• Signs you need to talk to someone\n• Building healthy routines abroad\n• Staying connected with family\n• Finding Arabic-speaking therapists in Czechia",
            ar: "الاهتمام بنفسك مش اختياري.\n\n• خدمات إرشاد نفسي مجانية في الجامعات التشيكية\n• علامات إنك محتاج تتكلم مع حد\n• بناء روتين صحي في الغربة\n• البقاء متواصل مع العيلة\n• لاقي معالجين نفسيين بيتكلموا عربي في التشيك",
          },
          resources: [],
          isFree: false,
        },
        {
          id: "czech-language-learning",
          title: {
            en: "Next Steps: Learning Czech Beyond Survival",
            ar: "الخطوة الجاية: تعلم تشيكي أبعد من النجاة",
          },
          duration: "8 min",
          videoUrl: null,
          content: {
            en: "How to continue learning Czech after the basics.\n\n• Free and paid Czech language courses\n• Language exchange (tandem) programs\n• Best apps and resources for Czech learners\n• Czech language exam levels (A1 to C2)\n• Why learning Czech opens doors in your career",
            ar: "إزاي تكمل تعلم تشيكي بعد الأساسيات.\n\n• كورسات لغة تشيكية مجانية ومدفوعة\n• برامج تبادل لغوي (tandem)\n• أحسن التطبيقات والمصادر لمتعلمي التشيكي\n• مستويات امتحان اللغة التشيكية (A1 لـ C2)\n• ليه تعلم التشيكي بيفتحلك أبواب في حياتك المهنية",
          },
          resources: [],
          isFree: false,
        },
      ],
      quiz: {
        title: {
          en: "Module 5 Quiz: Building Your Life",
          ar: "اختبار الوحدة 5: بناء حياتك",
        },
        passingScore: 70,
        questions: [
          {
            id: "m5q1",
            question: {
              en: "How many hours per week can a student visa holder work in Czechia?",
              ar: "حامل فيزا الطالب ممكن يشتغل كام ساعة في الأسبوع في التشيك؟",
            },
            options: [
              { en: "10 hours", ar: "10 ساعات" },
              { en: "20 hours", ar: "20 ساعة" },
              { en: "No limit during semester, full-time during breaks", ar: "مفيش حد أثناء الفصل الدراسي، دوام كامل في الإجازات" },
              { en: "Students cannot work at all", ar: "الطلاب مش ممكن يشتغلوا خالص" },
            ],
            correctIndex: 2,
            explanation: {
              en: "Students in Czechia have no strict hourly limit — they can work alongside studies and full-time during semester breaks. But don't let it affect your studies!",
              ar: "الطلاب في التشيك مفيش حد ساعات صارم — ممكن يشتغلوا جنب الدراسة ودوام كامل في إجازات الفصل. بس ما تخليش ده يأثر على دراستك!",
            },
          },
          {
            id: "m5q2",
            question: {
              en: "Which service is best for sending money from Czechia to your home country cheaply?",
              ar: "إيه أحسن خدمة لتحويل الفلوس من التشيك لبلدك بسعر رخيص؟",
            },
            options: [
              { en: "Your Czech bank's wire transfer", ar: "حوالة بنكك التشيكي" },
              { en: "Western Union", ar: "ويسترن يونيون" },
              { en: "Wise (formerly TransferWise)", ar: "Wise (كان اسمه TransferWise)" },
              { en: "PayPal", ar: "باي بال" },
            ],
            correctIndex: 2,
            explanation: {
              en: "Wise offers the best exchange rates and lowest fees for international transfers. Czech banks charge much higher fees for international wires.",
              ar: "Wise بيقدم أحسن سعر صرف وأقل رسوم للتحويلات الدولية. البنوك التشيكية بتاخد رسوم أعلى بكتير للحوالات الدولية.",
            },
          },
          {
            id: "m5q3",
            question: {
              en: "When should you start the visa renewal process?",
              ar: "لازم تبدأ عملية تجديد الفيزا إمتى؟",
            },
            options: [
              { en: "1 week before expiry", ar: "قبل انتهاء الصلاحية بأسبوع" },
              { en: "At least 120 days before expiry", ar: "قبل انتهاء الصلاحية بـ 120 يوم على الأقل" },
              { en: "After it expires", ar: "بعد ما تنتهي" },
              { en: "Exactly 30 days before", ar: "قبلها بـ 30 يوم بالظبط" },
            ],
            correctIndex: 1,
            explanation: {
              en: "Start at least 120 days (4 months) before expiry. Processing can take 60+ days, and you need time to gather updated documents.",
              ar: "ابدأ قبل انتهاء الصلاحية بـ 120 يوم (4 شهور) على الأقل. المعالجة ممكن تاخد أكتر من 60 يوم، ومحتاج وقت تجمع الأوراق المحدثة.",
            },
          },
          {
            id: "m5q4",
            question: {
              en: "What is a 'živnostenský list' in Czechia?",
              ar: "يعني إيه 'živnostenský list' في التشيك؟",
            },
            options: [
              { en: "A residence permit", ar: "تصريح إقامة" },
              { en: "A trade license for self-employment/freelancing", ar: "رخصة تجارية للعمل الحر" },
              { en: "A driver's license", ar: "رخصة قيادة" },
              { en: "A student ID", ar: "كارنيه طالب" },
            ],
            correctIndex: 1,
            explanation: {
              en: "A živnostenský list (trade license) allows you to work as a freelancer or run a small business in Czechia. Many graduates use this path.",
              ar: "الـ živnostenský list (رخصة تجارية) بتسمحلك تشتغل فريلانسر أو تدير بيزنس صغير في التشيك. كتير من الخريجين بيستخدموا الطريق ده.",
            },
          },
          {
            id: "m5q5",
            question: {
              en: "Can you travel to other EU countries on a Czech student visa?",
              ar: "ممكن تسافر لدول أوروبية تانية بفيزا طالب تشيكية؟",
            },
            options: [
              { en: "No, only within Czechia", ar: "لا، جوه التشيك بس" },
              { en: "Yes, up to 90 days in any 180-day period within the Schengen Area", ar: "أيوا، لحد 90 يوم في أي فترة 180 يوم في منطقة شنغن" },
              { en: "Yes, unlimited travel anywhere in Europe", ar: "أيوا، سفر غير محدود في أي مكان في أوروبا" },
              { en: "Only with a separate travel visa", ar: "بفيزا سفر منفصلة بس" },
            ],
            correctIndex: 1,
            explanation: {
              en: "Your Czech long-term visa/residence permit allows travel within the Schengen Area for up to 90 days in any 180-day period.",
              ar: "الفيزا/تصريح الإقامة التشيكي بيسمحلك بالسفر في منطقة شنغن لحد 90 يوم في أي فترة 180 يوم.",
            },
          },
        ],
      },
    },
  ],
};

// Helper to count total lessons
export function getTotalLessons(): number {
  return COURSE.modules.reduce((sum, m) => sum + m.lessons.length, 0);
}

// Helper to get flat list of all lessons with module context
export type FlatLesson = {
  moduleId: string;
  moduleTitle: { en: string; ar: string };
  moduleIndex: number;
  lessonIndex: number;
  lesson: Lesson;
};

export function getFlatLessons(): FlatLesson[] {
  return COURSE.modules.flatMap((mod, mi) =>
    mod.lessons.map((lesson, li) => ({
      moduleId: mod.id,
      moduleTitle: mod.title,
      moduleIndex: mi,
      lessonIndex: li,
      lesson,
    }))
  );
}

// Get next/prev lesson
export function getAdjacentLessons(moduleId: string, lessonId: string) {
  const flat = getFlatLessons();
  const idx = flat.findIndex(
    (f) => f.moduleId === moduleId && f.lesson.id === lessonId
  );
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    current: flat[idx] ?? null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}
