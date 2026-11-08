import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

/** Arabic titles and descriptions for the static pages (Modern Standard Arabic for search). */
export const AR_PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    // The homepage title skips the "| Study Czechia" template, so it names the brand itself.
    title: "الدراسة في التشيك: شروط القبول والمواعيد والتكاليف | Study Czechia",
    description:
      "دليل مستقل ومجاني للدراسة في التشيك: القبول والمواعيد والتكاليف. الدراسة بالتشيكية في الجامعات العامة بلا رسوم دراسية مع استثناءات ورسوم أخرى، وبالإنجليزية غالبًا برسوم.",
  },
  "/about/": {
    title: "من نحن: منصة مستقلة للطلاب العرب في التشيك",
    description: "Study Czechia منصة مستقلة أنشأها طالب لمساعدة الطلاب العرب في التقديم للجامعات التشيكية. غير تابعة لأي سفارة أو جامعة.",
  },
  "/application-guide/": {
    title: "دليل التقديم للجامعات التشيكية خطوة بخطوة",
    description: "كل خطوات التقديم للجامعات في التشيك: اختيار التخصص، والأوراق، ومعادلة الشهادة، والتأشيرة، والوصول.",
  },
  "/for-parents/": {
    title: "لأولياء الأمور: التكلفة والأمان وطريقة الدفع",
    description: "تكلفة الدراسة في التشيك، ومستوى الأمان، ومن يدير Study Czechia، وكيف يتم الدفع مقابل المساعدة: الدفع على مرحلتين، والاسترداد، والإيصالات، والتواصل المباشر مع جون.",
  },
  "/recognition/": {
    title: "أدلة معادلة الشهادات التشيكية",
    description: "هل ستُعادَل شهادتك التشيكية في بلدك؟ أدلة لكل دولة مبنية فقط على صفحات الوزارات والسفارات الرسمية، مع تاريخ المراجعة.",
  },
  "/recognition/jordan/": {
    title: "معادلة الشهادة التشيكية في الأردن خطوة بخطوة",
    description: "كيف تعادل الوزارة في الأردن الشهادة التشيكية: الجامعات المعترف بها، وشرطا لغة الدراسة والإقامة، والوثائق، والرسوم، وطريقة التقديم. من المصادر الرسمية فقط.",
  },
  "/recognition/saudi-arabia/": {
    title: "معادلة الشهادة التشيكية في السعودية خطوة بخطوة",
    description: "كيف تعادل وزارة التعليم السعودية الشهادة التشيكية: الموافقة المسبقة للدراسة على الحساب الخاص، والجامعات المصنفة، والدراسة الحضورية، والتقديم. من المصادر الرسمية.",
  },
  "/recognition/egypt/": {
    title: "معادلة الشهادة التشيكية في مصر خطوة بخطوة",
    description: "كيف يعادل المجلس الأعلى للجامعات في مصر الشهادة التشيكية: الشروط، والتصديقات، والمستندات، والرسوم، وعنوان الإرسال. من المصادر الرسمية فقط، مع تاريخ المراجعة.",
  },
  "/study-in-czechia-from-egypt/": {
    title: "الدراسة في التشيك للمصريين: التكاليف والتأشيرة وخطوات القبول",
    description: "للطلاب المصريين: من الثانوية العامة حتى أول أسبوع في التشيك. شروط القبول، والدراسة بالتشيكية أو الإنجليزية، والمواعيد، والتكاليف، وتأشيرة القاهرة، ومعادلة الشهادة.",
  },
  "/thanaweya-amma-czech-university/": {
    title: "الثانوية العامة المصرية والجامعات التشيكية: التصديق والمعادلة",
    description: "شهادة الثانوية العامة للجامعات التشيكية: التصديق في السفارة بالقاهرة، واعتراف الكلية أو المعادلة لدى الإقليم (3,000 كرونة، 30 يومًا)، من المصادر الرسمية.",
  },
  "/work-while-studying/": {
    title: "العمل أثناء الدراسة في التشيك: القواعد للطلاب الأجانب",
    description: "هل يمكن للطلاب الأجانب العمل في التشيك؟ حرية الوصول إلى سوق العمل لطلاب الدوام الكامل، وتصريح البحث عن عمل لمدة 9 أشهر بعد التخرج.",
  },
  "/student-housing/": {
    title: "السكن الطلابي في التشيك: أسعار السكن الجامعي في براغ وبرنو",
    description: "كم يكلف السرير في السكن الجامعي في براغ وبرنو: قوائم أسعار جامعة تشارلز وČVUT وماساريك وVUT، في الليلة وللشهر، من المصادر الرسمية.",
  },
  "/student-visa-egypt/": {
    title: "تأشيرة الدراسة في التشيك من مصر: المستندات والمبلغ المطلوب والموعد",
    description: "تأشيرة الدراسة في التشيك من مصر: المستندات، وإثبات 115,810 كرونة، وحجز موعد السفارة بالقاهرة بالبريد الإلكتروني، والرسوم ومدة الانتظار. من المصادر الرسمية فقط.",
  },
  "/arrival/": {
    title: "أول أسبوعين بعد الوصول إلى التشيك",
    description: "شرطة الأجانب، والحساب البنكي، وشريحة الهاتف، والمواصلات، والتأمين: خطة واضحة لأول أسبوعين في التشيك.",
  },
  "/contact/": {
    title: "تواصل معنا",
    description: "تواصل مع Study Czechia عبر البريد الإلكتروني أو واتساب أو مجموعة فيسبوك، أو أرسل رسالة من الموقع، بخصوص الدراسة في الجامعات التشيكية.",
  },
  "/cost-of-living/": {
    title: "تكلفة المعيشة في التشيك للطلاب: الأسعار والرواتب في براغ وبرنو",
    description: "كم تكلف معيشة الطالب في براغ وبرنو وأوسترافا، وكم تدفع وظائف العمل أثناء الدراسة بالساعة، وأسعار السوبر ماركت في التشيك. أرقام حقيقية مع مصادرها.",
  },
  "/courses/": {
    title: "كورس أول 90 يوم في التشيك",
    description:
      "اللغة والثقافة والتحضير لمقابلة السفارة وكل ما لا يخبرك به أحد، بالعربي من طالب يعيش في التشيك. احجز الآن، ويفتح الكورس في 1 يناير 2027.",
  },
  "/courses/learn/": { title: "لوحة الكورس", description: "دروس كورس أول 90 يوم في التشيك." },
  "/courses/welcome/": {
    title: "أهلًا بك في الكورس",
    description: "نتحقق من شراء الكورس، وتفتح هذه الصفحة كورس أول 90 يوم في التشيك على هذا الجهاز.",
  },
  "/deadlines/": {
    title: "مواعيد التقديم في جامعات التشيك 2027",
    description: "مواعيد التقديم في جامعات التشيك، وأغلبها نهاية فبراير. تابع البرامج بالإنجليزية وخطط للدراسة بالمجان باللغة التشيكية قبل السفر للتشيك.",
  },
  "/eligibility/": {
    title: "شروط القبول في جامعات التشيك واختبار الأهلية",
    description: "اعرف أهليتك للقبول في الجامعات التشيكية خلال 5 دقائق: الدرجات، والأوراق، والإثبات المالي، والجدول الزمني للتأشيرة.",
  },
  "/interview-prep/": {
    title: "التحضير لمقابلة السفارة التشيكية",
    description: "مقابلة تجريبية مباشرة لمدة 45 دقيقة بأسئلة حقيقية من مقابلات السفارة التشيكية، مع ملاحظات وورقة بأهم الأسئلة.",
  },
  "/my-journey/": { title: "رحلتي", description: "تابع خطواتك والبرامج التي حفظتها في رحلة التقديم للتشيك." },
  "/preparatory-year/": {
    title: "الدراسة بالمجان في التشيك: السنة التحضيرية",
    description: "الدراسة مجانًا في الجامعات الحكومية في التشيك باللغة التشيكية: دليل السنة التحضيرية لتعلم اللغة، بأسعار حقيقية من المعاهد، والفيزا وخطوات التسجيل.",
  },
  "/privacy/": {
    title: "سياسة الخصوصية",
    description: "سياسة الخصوصية في Study Czechia: البيانات التي نجمعها، والمستندات التي ترسلها إلينا، وكيفية استخدامها، والجهات الخارجية، وحقوقك وطريقة التواصل معنا.",
  },
  "/programmes/": {
    title: "البرامج الدراسية بالإنجليزية في التشيك",
    description: "ابحث وقارن البرامج الإنجليزية في الجامعات التشيكية حسب التخصص والمدينة والميزانية.",
  },
  "/programmes/compare/": { title: "مقارنة البرامج", description: "قارن البرامج التي حفظتها جنبًا إلى جنب." },
  "/qa/": {
    title: "أسئلة وأجوبة عن الدراسة في التشيك",
    description: "التأشيرة، والأوراق، والسكن، ومقابلة السفارة: إجابات من طلاب عاشوا التجربة.",
  },
  "/questions-to-ask/": {
    title: "توب اديو أو MSM Academy أو أي وكالة: 8 أسئلة قبل أن تدفع",
    description: "تقارن بين وكالات الدراسة في التشيك مثل توب اديو (Top Edu) وMSM Academy؟ ثمانية أسئلة اسألها لأي وكالة قبل أن تدفع، بما فيها نحن. ولا علاقة لنا بهذه الشركات.",
  },
  "/scholarships/": {
    title: "منح دراسية في التشيك: منح الحكومة والجامعات",
    description: "منح دراسية في التشيك: منح الحكومة التشيكية والجامعات للطلاب الدوليين والعرب.",
  },
  "/search/": { title: "البحث", description: "ابحث في الجامعات التشيكية بالاسم أو المدينة أو التخصص." },
  "/services/": {
    title: "خدمات شخصية للتقديم في التشيك",
    description:
      "مراجعة الأوراق، والتحضير لمقابلة السفارة، وخطة الوصول، والمساعدة الكاملة في التقديم للطلاب العرب. الدفعة الثانية بعد القبول فقط.",
  },
  "/study/cheapest-programmes/": {
    title: "أرخص البرامج الإنجليزية في التشيك",
    description: "أرخص البرامج الدراسية بالإنجليزية في الجامعات التشيكية، مرتبة حسب الرسوم السنوية، مع رابط إلى صفحة الجامعة الرسمية لكل برنامج.",
  },
  "/terms/": {
    title: "شروط الخدمة",
    description: "شروط خدمة Study Czechia: الخدمات المدفوعة وأسعارها، ودفعات الرحلة الكاملة، وقواعد الاسترداد لكل خدمة، وحق الانسحاب، وما لا نضمنه، والتعامل مع مستنداتك.",
  },
  // Stage pages: their titles are each stage's h1 (src/app/ar/stage/[slug]/page.tsx); the
  // descriptions list the free tools each stage page links (src/data/stages.ts).
  "/stage/considering/": {
    title: "تشيكيا فعلاً حل مناسب ليا؟",
    description: "هل الدراسة في التشيك مناسبة لك؟ أدوات مجانية بلا تسجيل: تكاليف المعيشة، والتكلفة الكاملة للدراسة، والمنح، والسنة التحضيرية، وأسئلة تطرحها على أي وكالة.",
  },
  "/stage/documents/": {
    title: "أوراقي سليمة؟",
    description: "تحقق من أوراقك مجانًا قبل التقديم: فحص الأهلية، ودليل التقديم خطوة بخطوة، وإجابات عن الأسئلة الشائعة حول المستندات وما يُرفض منها فعلًا.",
  },
  "/stage/visa/": {
    title: "هيسألوني إيه في السفارة؟",
    description: "استعد مجانًا لمقابلة السفارة التشيكية: دليل تجهيز المقابلة، ودليل التقديم، وأسئلة طُرحت فعلًا في مقابلات طلاب سابقين.",
  },
  "/stage/arrived/": {
    title: "لسه واصل. دلوقتي أعمل إيه؟",
    description: "وصلت إلى التشيك؟ كل ما تحتاجه في أيامك الأولى، بدءًا بالموعد الوحيد الذي لا يجب أن يفوتك، مع دليل الوصول المجاني ودليل التقديم.",
  },
  "/universities/": {
    title: "جامعات التشيك: البرامج والمصاريف والمواعيد",
    description: "جامعات التشيك الحكومية والخاصة، مثل جامعة تشارلز وVUT وČVUT: البرامج بالإنجليزي، والمصاريف من مواقع الجامعات الرسمية، ومواعيد التقديم.",
  },
  "/university-matcher/": {
    title: "اختر جامعتك في التشيك: برامج مجانية وبالإنجليزية",
    description: "أجب عن أسئلة قليلة لتجد برنامجك في جامعات التشيك حسب تخصصك وميزانيتك ومدينتك، بالإنجليزية أو بالتشيكية مجانًا في الجامعات الحكومية.",
  },
  "/verify/": { title: "التحقق من الشهادة", description: "تحقق من شهادة إتمام كورس Study Czechia." },
  "/why-czechia/": {
    title: "لماذا الدراسة في التشيك؟ جامعات مجانية في أوروبا",
    description:
      "لماذا يختار الطلاب الدوليون التشيك: رسوم مجانية أو منخفضة، وبرامج بالإنجليزية، ومدن آمنة، وشهادة أوروبية. حقائق وأرقام موثقة، وبرامج حسب التخصص والمدينة.",
  },
  "/thanks/": {
    title: "تم استلام الدفع",
    description: "شكرًا على الدفع. هذه هي الخطوة التالية في خدمتك مع Study Czechia.",
  },
  "/what-it-costs/": {
    title: "تكاليف ومصاريف الدراسة في التشيك 2027: الرسوم والمعيشة والتأشيرة",
    description: "كم تكلف الدراسة في التشيك: الرسوم بالإنجليزية حسب الدرجة، والمعيشة الشهرية في براغ وبرنو وأوسترافا، ومبلغ التأشيرة ورسومها، وتقدير لتكلفة الدراسة كلها، مع المصادر.",
  },
};

export const FIELD_AR: Record<string, string> = {
  Medicine: "الطب",
  "Veterinary Medicine": "الطب البيطري",
  Pharmacy: "الصيدلة",
  Business: "إدارة الأعمال",
  Economics: "الاقتصاد",
  Finance: "المالية",
  Engineering: "الهندسة",
  IT: "تكنولوجيا المعلومات",
  "Computer Science": "علوم الحاسب",
  Chemistry: "الكيمياء",
  "Social Sciences": "العلوم الاجتماعية",
  "International Relations": "العلاقات الدولية",
  Law: "القانون",
  Architecture: "العمارة",
  Sciences: "العلوم",
  Agriculture: "الزراعة",
  "Environmental Science": "العلوم البيئية",
  Education: "التربية",
  Design: "التصميم",
  Humanities: "العلوم الإنسانية",
  Art: "الفنون",
  Psychology: "علم النفس",
  "Development Studies": "دراسات التنمية",
  "Media Studies": "الإعلام",
  Geology: "الجيولوجيا",
};

export const CITY_AR: Record<string, string> = {
  Prague: "براغ",
  Brno: "برنو",
  Olomouc: "أولوموتس",
  "Zlín": "زلين",
  "Plzeň": "بلزن",
  "Hradec Králové": "هراديتس كرالوفيه",
  Ostrava: "أوسترافا",
  Liberec: "ليبيريتس",
  "Ústí nad Labem": "أوستي ناد لابم",
  Pardubice: "باردوبيتسه",
  "České Budějovice": "تشيسكي بوديوفيتسه",
  "Mladá Boleslav": "ملادا بوليسلاف",
  Opava: "أوبافا",
  Jihlava: "ييهلافا",
};

export const DEGREE_AR: Record<string, string> = { Bachelor: "البكالوريوس", Master: "الماجستير" };
/** Degree and language as plain labels (no article), for badges and table cells. */
export const DEGREE_VALUE_AR: Record<string, string> = { Bachelor: "بكالوريوس", Master: "ماجستير", PhD: "دكتوراه" };
export const LANGUAGE_AR: Record<string, string> = { English: "الإنجليزية", Czech: "التشيكية" };

function withSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * Metadata for the Arabic twin of an English page. Keeps the English page's
 * robots settings, swaps in Arabic title/description where known, and points
 * canonical + og:url at the /ar/ URL.
 */
export function arabicMetadata(
  enPath: string,
  en: Metadata = {},
  override?: { title?: string; description?: string; absolute?: boolean }
): Metadata {
  const path = withSlash(enPath);
  const known = AR_PAGE_META[path];
  const title = override?.title ?? known?.title ?? en.title ?? undefined;
  const description = override?.description ?? known?.description ?? en.description ?? undefined;
  const arPath = path === "/" ? "/ar/" : `/ar${path}`;
  const isHome = path === "/";
  return {
    ...en,
    title: isHome || override?.absolute ? { absolute: String(title) } : title,
    description,
    alternates: { canonical: arPath },
    openGraph: {
      siteName: "Study Czechia",
      type: "website",
      locale: "ar_AR",
      url: arPath,
      ...(typeof title === "string" ? { title } : {}),
      ...(description ? { description } : {}),
      images: [{ url: `${SITE_URL}/og-cover.jpg`, width: 1200, height: 630, alt: "Study Czechia: your path to studying in the Czech Republic" }],
    },
  };
}
