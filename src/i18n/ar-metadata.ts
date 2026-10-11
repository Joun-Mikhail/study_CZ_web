import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

/** Arabic titles and descriptions for the static pages (Modern Standard Arabic for search). */
export const AR_PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "الدراسة في التشيك بدون وكالة",
    description:
      "أدلة مجانية، ومطابقة الجامعات، وحاسبة تكاليف المعيشة من طالب يعيش في التشيك. خدمات شخصية للطلاب العرب: مراجعة الأوراق، والتحضير لمقابلة السفارة، والمساعدة الكاملة في التقديم.",
  },
  "/about/": {
    title: "من نحن",
    description: "Study Czechia منصة مستقلة أنشأها طالب لمساعدة الطلاب العرب في التقديم للجامعات التشيكية. غير تابعة لأي سفارة أو جامعة.",
  },
  "/application-guide/": {
    title: "دليل التقديم للجامعات التشيكية خطوة بخطوة",
    description: "كل خطوات التقديم للجامعات في التشيك: اختيار التخصص، والأوراق، ومعادلة الشهادة، والتأشيرة، والوصول.",
  },
  "/arrival/": {
    title: "أول أسبوعين بعد الوصول إلى التشيك",
    description: "شرطة الأجانب، والحساب البنكي، وشريحة الهاتف، والمواصلات، والتأمين: خطة واضحة لأول أسبوعين في التشيك.",
  },
  "/contact/": {
    title: "تواصل معنا",
    description: "راسلنا على واتساب أو البريد الإلكتروني بخصوص الدراسة في التشيك.",
  },
  "/cost-of-living/": {
    title: "تكاليف المعيشة في التشيك",
    description: "تكاليف السكن والأكل والمواصلات في براغ وبرنو وأوسترافا بأرقام حقيقية من طالب يعيش هناك.",
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
    title: "مواعيد التقديم للجامعات التشيكية",
    description: "تابع مواعيد التقديم للبرامج الإنجليزية في الجامعات التشيكية.",
  },
  "/eligibility/": {
    title: "هل يمكنني الدراسة في التشيك؟ اختبار الأهلية",
    description: "اعرف أهليتك للقبول في الجامعات التشيكية خلال 5 دقائق: الدرجات، والأوراق، والإثبات المالي، والجدول الزمني للتأشيرة.",
  },
  "/interview-prep/": {
    title: "التحضير لمقابلة السفارة التشيكية",
    description: "مقابلة تجريبية مباشرة لمدة 45 دقيقة بأسئلة حقيقية من مقابلات السفارة التشيكية، مع ملاحظات وورقة بأهم الأسئلة.",
  },
  "/my-journey/": { title: "رحلتي", description: "تابع خطواتك والبرامج التي حفظتها في رحلة التقديم للتشيك." },
  "/preparatory-year/": {
    title: "السنة التحضيرية في التشيك",
    description: "دليل السنة التحضيرية لتعلم اللغة التشيكية والدراسة مجانًا في الجامعات الحكومية، بأسعار حقيقية من المعاهد.",
  },
  "/privacy/": { title: "سياسة الخصوصية", description: "كيف نتعامل مع بياناتك ومستنداتك." },
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
    title: "أسئلة اسألها لأي وكالة قبل أن تدفع",
    description: "قائمة الأسئلة التي تكشف إن كانت وكالة الدراسة في التشيك تستحق أموالك.",
  },
  "/scholarships/": {
    title: "المنح الدراسية في التشيك",
    description: "منح الحكومة التشيكية والجامعات للطلاب الدوليين والعرب.",
  },
  "/search/": { title: "البحث", description: "ابحث في الجامعات التشيكية بالاسم أو المدينة أو التخصص." },
  "/services/": {
    title: "خدمات شخصية للتقديم في التشيك",
    description:
      "مراجعة الأوراق، والتحضير لمقابلة السفارة، وخطة الوصول، والمساعدة الكاملة في التقديم للطلاب العرب. الدفعة الثانية بعد القبول فقط.",
  },
  "/study/cheapest-programmes/": {
    title: "أرخص البرامج الإنجليزية في التشيك",
    description: "برامج إنجليزية في الجامعات التشيكية مرتبة حسب الرسوم الدراسية.",
  },
  "/study/no-entrance-exam/": {
    title: "برامج في التشيك بدون امتحان قبول",
    description: "برامج إنجليزية في الجامعات التشيكية تقبل الطلاب بناءً على الأوراق فقط.",
  },
  "/terms/": { title: "شروط الخدمة", description: "الأسعار وقواعد الاسترداد وحقوقك." },
  "/universities/": {
    title: "الجامعات التشيكية",
    description: "الجامعات الحكومية والخاصة في التشيك مع البرامج الإنجليزية والرسوم.",
  },
  "/university-matcher/": {
    title: "اختر جامعتك في التشيك",
    description: "أجب عن أسئلة قليلة واحصل على برامج تناسب تخصصك وميزانيتك ومدينتك.",
  },
  "/verify/": { title: "التحقق من الشهادة", description: "تحقق من شهادة إتمام كورس Study Czechia." },
  "/what-it-costs/": {
    title: "التكلفة الحقيقية للدراسة في التشيك",
    description: "كم تكلف الدراسة في التشيك فعلًا: الرسوم، والمعيشة، والتأشيرة، والتأمين.",
  },
};

export const FIELD_AR: Record<string, string> = {
  Medicine: "الطب",
  "Veterinary Medicine": "الطب البيطري",
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
  override?: { title?: string; description?: string }
): Metadata {
  const path = withSlash(enPath);
  const known = AR_PAGE_META[path];
  const title = override?.title ?? known?.title ?? en.title ?? undefined;
  const description = override?.description ?? known?.description ?? en.description ?? undefined;
  const arPath = path === "/" ? "/ar/" : `/ar${path}`;
  const isHome = path === "/";
  return {
    ...en,
    title: isHome ? { absolute: `Study Czechia: ${title}` } : title,
    description,
    alternates: { canonical: arPath },
    openGraph: {
      siteName: "Study Czechia",
      type: "website",
      locale: "ar_AR",
      url: arPath,
      ...(typeof title === "string" ? { title: isHome ? `Study Czechia: ${title}` : title } : {}),
      ...(description ? { description } : {}),
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Study Czechia" }],
    },
  };
}
