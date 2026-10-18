import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

/** Arabic titles and descriptions for the static pages (Modern Standard Arabic for search). */
export const AR_PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "الدراسة في التشيك 2027 | جامعات مجانية، شروط القبول، والمواعيد النهائية",
    description:
      "دليلك الشامل والموثوق للدراسة في جمهورية التشيك. اعرف شروط القبول، مواعيد التقديم، الدراسة المجانية باللغة التشيكية في جامعات مثل جامعة تشارلز و VUT، وتكاليف المعيشة. بدون رسوم وكالات.",
  },
  "/about/": {
    title: "من نحن",
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
    description: "كيف تعادل الوزارة في الأردن الشهادة التشيكية: الجامعات التشيكية المعترف بها، وشرطا لغة الدراسة والإقامة، والوثائق، والرسوم، وطريقة التقديم. من المصادر الرسمية فقط، مع تاريخ المراجعة.",
  },
  "/recognition/saudi-arabia/": {
    title: "معادلة الشهادة التشيكية في السعودية خطوة بخطوة",
    description: "كيف تعادل وزارة التعليم السعودية الشهادة التشيكية: الموافقة المسبقة للدراسة على الحساب الخاص، والجامعات المصنفة، والدراسة الحضورية، والتقديم الإلكتروني. من المصادر الرسمية فقط، مع تاريخ المراجعة.",
  },
  "/recognition/egypt/": {
    title: "معادلة الشهادة التشيكية في مصر خطوة بخطوة",
    description: "كيف يعادل المجلس الأعلى للجامعات في مصر الشهادة التشيكية: الشروط، والتصديقات، والمستندات، والرسوم، وعنوان الإرسال. من المصادر الرسمية فقط، مع تاريخ المراجعة.",
  },
  "/student-visa-egypt/": {
    title: "تأشيرة الدراسة في التشيك من مصر: المستندات والمبلغ المطلوب والموعد",
    description: "كيف تقدّم على تأشيرة الدراسة طويلة الأجل في السفارة التشيكية بالقاهرة: المستندات، وإثبات 115,810 كرونة، وقواعد حجز الموعد بالبريد الإلكتروني، والرسوم ومدة الانتظار. من المصادر الرسمية فقط، مع تاريخ المراجعة.",
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
    title: "تكاليف المعيشة في براغ والتشيك للطلاب",
    description: "تكاليف السكن والأكل والمواصلات في براغ وبرنو وأوسترافا بأرقام حقيقية من طالب يعيش هناك.",
  },
  "/courses/": {
    title: "كورس أول 90 يوم في التشيك",
    description:
      "اللغة والثقافة والتحضير لمقابلة السفارة وكل ما لا يخبرك به أحد، بالعربي من طالب يعيش في التشيك. احجز الآن، ويفتح الكورس في 1 يناير 2027.",
  },
  "/courses/learn/": { title: "لوحة الكورس", description: "دروس كورس أول 90 يوم في التشيك." },
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
    title: "توب اديو أو MSM Academy أو أي وكالة: 8 أسئلة قبل أن تدفع",
    description: "تقارن بين وكالات الدراسة في التشيك مثل توب اديو (Top Edu) وMSM Academy؟ ثمانية أسئلة اسألها لأي وكالة قبل أن تدفع، بما فيها نحن. Study Czechia لا علاقة لها بهذه الشركات.",
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
    description: "برامج إنجليزية في الجامعات التشيكية مرتبة حسب الرسوم الدراسية.",
  },
  "/terms/": { title: "شروط الخدمة", description: "الأسعار وقواعد الاسترداد وحقوقك." },
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
    description: "كم تكلف الدراسة في التشيك فعلًا: الرسوم الدراسية بالإنجليزية حسب الدرجة، وتكاليف المعيشة الشهرية في براغ وبرنو وأوسترافا، والمبلغ المطلوب للتأشيرة ورسومها، وتقدير لتكلفة الدراسة كلها. كل رقم مع مصدره.",
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
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Study Czechia" }],
    },
  };
}
