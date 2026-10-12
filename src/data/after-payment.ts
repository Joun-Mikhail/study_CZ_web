// What happens after each payment. Shown on /thanks/ after Stripe, and in the
// help sheet before paying, so the two can never disagree.

export type PaidProduct = "consultation" | "documentReview" | "interviewPrep" | "arrivalSupport" | "fullPackageStep1";
export const PAID_PRODUCTS: PaidProduct[] = ["consultation", "documentReview", "interviewPrep", "arrivalSupport", "fullPackageStep1"];

const en = {
  title: "Payment received, thank you!",
  refLabel: "Ref",
  nextStep: "What happens next",
  orEmail: "Or email them to",
  generic: "Message me on WhatsApp and we'll take it from there.",
  genericButton: "Message me on WhatsApp",
  products: {
    consultation: {
      name: "Ask-me-anything call (30 min)",
      steps: ["Message me on WhatsApp with two or three times that suit you.", "Add one line about where you're stuck, so I can prepare.", "We talk by voice or video at the time we agree."],
      button: "Book my call on WhatsApp",
      whatsappText: "Hi John, I just paid for the 30-minute call. Times that suit me:",
    },
    documentReview: {
      name: "Document review",
      steps: [
        "Send me every document you plan to submit (application, visa documents, translations, bank statements) as PDFs or clear photos.",
        "I go through each page the way the embassy officer will.",
        "You get a written report within 5 business days of me receiving your documents.",
      ],
      button: "Send my documents on WhatsApp",
      whatsappText: "Hi John, I just paid for the document review. Sending my documents now.",
    },
    interviewPrep: {
      name: "Embassy mock interview",
      steps: ["Message me on WhatsApp with your embassy, your interview date if you have one, and times that suit you.", "We do a full mock interview together.", "You get feedback on your answers before the real one."],
      button: "Book my mock interview on WhatsApp",
      whatsappText: "Hi John, I just paid for the mock interview. My embassy and interview date:",
    },
    arrivalSupport: {
      name: "Arrival plan",
      steps: ["Message me on WhatsApp with your city and arrival date.", "I send you your personal first-week checklist.", "Ask me anything on WhatsApp while you settle in."],
      button: "Start my arrival plan on WhatsApp",
      whatsappText: "Hi John, I just paid for the arrival plan. My city and arrival date:",
    },
    fullPackageStep1: {
      name: "Full Journey, step 1",
      steps: [
        "Message me on WhatsApp to book our first session.",
        "Before it, send me your grades, your rough budget and anything you've already prepared.",
        "In the first session we choose universities and programmes that fit you, and plan your documents and timeline.",
        "Step 2 is only due once a university accepts you. If you're not accepted, you never pay it.",
        "The course \"Your First 90 Days in Czechia\" is included and opens on 1 January 2027.",
      ],
      button: "Book my first session on WhatsApp",
      whatsappText: "Hi John, I just paid for Full Journey step 1. Let's book our first session.",
    },
  },
};

const ar: typeof en = {
  title: "الدفع وصل، شكرًا!",
  refLabel: "رقم مرجعي",
  nextStep: "الخطوة الجاية",
  orEmail: "أو ابعتها على",
  generic: "ابعتلي على واتساب ونكمل من هناك.",
  genericButton: "كلمني على واتساب",
  products: {
    consultation: {
      name: "اسألني أي حاجة (مكالمة 30 دقيقة)",
      steps: ["ابعتلي على واتساب معادين أو تلاتة يناسبوك.", "اكتب سطر عن النقطة اللي واقف عندها عشان أجهز.", "بنتكلم صوت أو فيديو في المعاد اللي نتفق عليه."],
      button: "احجز المكالمة على واتساب",
      whatsappText: "أهلًا جون، لسه دافع للمكالمة (30 دقيقة). المواعيد اللي تناسبني:",
    },
    documentReview: {
      name: "مراجعة الأوراق",
      steps: [
        "ابعتلي كل الأوراق اللي ناوي تقدمها (طلب الجامعة، أوراق الفيزا، الترجمات، كشف الحساب) PDF أو صور واضحة.",
        "براجع كل صفحة زي ما موظف السفارة هيعمل.",
        "التقرير المكتوب بيوصلك خلال 5 أيام عمل من استلامي للأوراق.",
      ],
      button: "ابعت الأوراق على واتساب",
      whatsappText: "أهلًا جون، لسه دافع لمراجعة الأوراق. هبعت الأوراق دلوقتي.",
    },
    interviewPrep: {
      name: "مقابلة السفارة التجريبية",
      steps: ["ابعتلي على واتساب السفارة، وميعاد المقابلة لو عندك، ومواعيد تناسبك.", "بنعمل مقابلة تجريبية كاملة مع بعض.", "بتاخد ملاحظات على إجاباتك قبل المقابلة الحقيقية."],
      button: "احجز المقابلة التجريبية على واتساب",
      whatsappText: "أهلًا جون، لسه دافع للمقابلة التجريبية. السفارة وميعاد المقابلة:",
    },
    arrivalSupport: {
      name: "خطة الوصول",
      steps: ["ابعتلي على واتساب المدينة وميعاد وصولك.", "هبعتلك قائمة أول أسبوع بتاعتك.", "اسألني أي حاجة على واتساب وأنت بتستقر."],
      button: "ابدأ خطة الوصول على واتساب",
      whatsappText: "أهلًا جون، لسه دافع لخطة الوصول. المدينة وميعاد الوصول:",
    },
    fullPackageStep1: {
      name: "المرافقة الكاملة، المرحلة الأولى",
      steps: [
        "ابعتلي على واتساب عشان نحجز أول جلسة.",
        "قبلها ابعتلي مجموعك، ميزانيتك التقريبية، وأي حاجة جهزتها.",
        "في أول جلسة بنختار الجامعات والبرامج المناسبة ليك، ونخطط للأوراق والمواعيد.",
        "المرحلة التانية بتدفعها بس لما جامعة تقبلك، ولو ماتقبلتش مش هتدفعها خالص.",
        "كورس \"أول 90 يوم في التشيك\" معاها، وبيفتح يوم 1 يناير 2027.",
      ],
      button: "احجز أول جلسة على واتساب",
      whatsappText: "أهلًا جون، لسه دافع للمرحلة الأولى من المرافقة الكاملة. يلا نحجز أول جلسة.",
    },
  },
};

export const AFTER_PAYMENT = { en, ar };
