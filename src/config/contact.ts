import { priceOf, fullPackageTotal, checkoutLink } from "./pricing";

// TODO: switch to a domain address (e.g. john@studyczechia.com) once the mailbox exists.
export const CONTACT_EMAIL = "Study.Czechia1@gmail.com";

export const WHATSAPP_URL = "https://wa.me/420703982237";

export function whatsappWithContext(page: string): string {
  const text = encodeURIComponent(`Hi ${FOUNDER_NAME}, I have a question about ${page}`);
  return `https://wa.me/420703982237?text=${text}`;
}

export const INSTAPAY_HANDLE = "+201282244587";

export const FOUNDER_NAME = "John";
export const FOUNDER_NAME_AR = "جون";

export const FACEBOOK_GROUP_URL = "https://www.facebook.com/groups/351187011113360";

// TODO: confirm actual current count before shipping
export const COMMUNITY_SIZE = "11,000+";
export const COMMUNITY_SIZE_AR = "+11,000";

/**
 * Refund rules are per service (see /terms for the full text). Every place
 * that talks about refunds reads from here so the site never contradicts
 * itself.
 */
export const REFUND_COPY = {
  en: {
    inline: "A written refund rule for every service, before you pay",
    footer: "💳 All payments via Stripe (or InstaPay 🇪🇬 for Egyptian students). Each service shows its refund rule under the button; the full rules are in the Terms.",
    comparison: "A written refund rule for every service",
    faq: "Every service has a clear refund rule, written before you pay. Calls and mock interviews: full refund if they don't happen or you cancel at least 24 hours before. Document review: full refund until I start, or if the report is later than 5 business days. Arrival plan: full refund until I send your checklist. Full Journey: the first payment is refundable until our first session, and the second payment is only due after you're accepted. The full rules are in the Terms.",
    bundledNote: "The course is included free and opens on 1 January 2027.",
    perService: {
      consultation: "Full refund if the call doesn't happen or you cancel 24 h before",
      documentReview: "Full refund until I start, or if the report takes over 5 business days",
      interviewPrep: "Full refund if the session doesn't happen or you cancel 24 h before",
      arrivalSupport: "Full refund until I send your personal checklist",
      fullPackage: "Step 1 refundable until our first session · Step 2 only after you're accepted",
      course: "Full refund if it isn't ready by 1 Jan 2027, or within 14 days of it opening",
    },
  },
  ar: {
    inline: "قاعدة استرداد مكتوبة لكل خدمة قبل ما تدفع",
    footer: "💳 كل المدفوعات عبر Stripe (أو InstaPay 🇪🇬 للطلاب المصريين). قاعدة الاسترداد مكتوبة تحت زرار كل خدمة، والتفاصيل كاملة في الشروط.",
    comparison: "قاعدة استرداد مكتوبة لكل خدمة",
    faq: "كل خدمة ليها قاعدة استرداد واضحة ومكتوبة قبل ما تدفع. المكالمة والمقابلة التجريبية: استرداد كامل لو ماتمتش أو لغيت قبلها بـ24 ساعة. مراجعة الأوراق: استرداد كامل لحد ما أبدأ، أو لو التقرير اتأخر أكتر من 5 أيام عمل. خطة الوصول: استرداد كامل لحد ما أبعتلك القائمة بتاعتك. الرحلة الكاملة: الدفعة الأولى بترجع لحد أول جلسة، والدفعة التانية مش بتدفعها غير بعد ما تتقبل. التفاصيل كاملة في الشروط.",
    bundledNote: "الكورس مجانًا معاها، وبيفتح يوم 1 يناير 2027.",
    perService: {
      consultation: "استرداد كامل لو المكالمة ماتمتش أو لغيت قبلها بـ24 ساعة",
      documentReview: "استرداد كامل لحد ما أبدأ، أو لو التقرير اتأخر أكتر من 5 أيام عمل",
      interviewPrep: "استرداد كامل لو الجلسة ماتمتش أو لغيت قبلها بـ24 ساعة",
      arrivalSupport: "استرداد كامل لحد ما أبعتلك القائمة بتاعتك",
      fullPackage: "الدفعة 1 بترجع لحد أول جلسة · الدفعة 2 بعد قبولك بس",
      course: "استرداد كامل لو ماجهزش يوم 1 يناير 2027، أو خلال 14 يوم من فتحه",
    },
  },
};

/** Current prices (launch offer applied when it is live). */
export const PRICING = {
  consultation: priceOf("consultation"),
  documentReview: priceOf("documentReview"),
  arrivalSupport: priceOf("arrivalSupport"),
  interviewPrep: priceOf("interviewPrep"),
  course: priceOf("course"),
  fullPackageStep1: priceOf("fullPackageStep1"),
  fullPackageStep2: priceOf("fullPackageStep2"),
  fullPackageTotal: fullPackageTotal(),
};

export const PAYMENT_LINKS = {
  consultation: checkoutLink("consultation"),
  documentReview: checkoutLink("documentReview"),
  arrivalSupport: checkoutLink("arrivalSupport"),
  interviewPrep: checkoutLink("interviewPrep"),
  course: checkoutLink("course"),
  fullPackageStep1: checkoutLink("fullPackageStep1"),
};
