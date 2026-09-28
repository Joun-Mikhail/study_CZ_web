import stripeConfig from "../../stripe-links.json";

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

export const REFUND_WINDOW = "48 hours";
export const REFUND_WINDOW_AR = "48 ساعة";

export const REFUND_COPY = {
  en: {
    inline: "Full refund within 48 hours, no questions asked",
    footer: "💳 All payments via Stripe. Full refund within 48 hours if not satisfied. Also available via InstaPay 🇪🇬 for Egyptian students.",
    comparison: "Message within 48 hours, full refund",
    faq: "Message me within 48 hours of any service and I'll refund you completely. No questions, no forms, no waiting. I'd rather give your money back than have an unhappy student in the community.",
    bundledNote: "The Full Journey includes the course free. The course has its own delivery guarantee (see above). The 48-hour service refund applies to the consulting portion.",
  },
  ar: {
    inline: "استرداد كامل خلال 48 ساعة، بدون أسئلة",
    footer: "💳 كل المدفوعات عبر Stripe. استرداد كامل خلال 48 ساعة لو مش راضي. متاح كمان بـ InstaPay 🇪🇬 للطلاب المصريين.",
    comparison: "راسل خلال 48 ساعة، استرداد كامل",
    faq: "راسلني خلال 48 ساعة وهرجعلك فلوسك كلها. بدون أسئلة، بدون نماذج، بدون انتظار.",
    bundledNote: "الرحلة الكاملة بتشمل الكورس مجانًا. الكورس ليه ضمان تسليم خاص بيه (شوف فوق). استرداد الـ48 ساعة بينطبق على جزء الاستشارات.",
  },
};

export const PRICING = {
  consultation: 15,
  documentReview: 25,
  arrivalSupport: 29,
  interviewPrep: 39,
  course: 49,
  fullPackageStep1: 150,
  fullPackageStep2: 200,
  fullPackageTotal: 350,
};

type StripeLinkKey = keyof typeof stripeConfig.links;

export function getStripeLink(key: string): string {
  if (!(key in stripeConfig.links)) {
    throw new Error(`Unknown Stripe link key: "${key}"`);
  }
  const entry = stripeConfig.links[key as StripeLinkKey];
  if (!entry.public) {
    throw new Error(`Stripe link "${key}" is not public and must not be rendered on the site`);
  }
  return entry.url;
}

export const PAYMENT_LINKS = {
  consultation: getStripeLink("consultation"),
  documentReview: getStripeLink("documentReview"),
  arrivalSupport: getStripeLink("arrivalSupport"),
  interviewPrep: getStripeLink("interviewPrep"),
  course: getStripeLink("course"),
  fullPackageStep1: getStripeLink("fullPackageStep1"),
};
