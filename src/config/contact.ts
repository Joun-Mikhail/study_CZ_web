import stripeConfig from "../../stripe-links.json";

export const CONTACT_EMAIL = "Study.Czechia1@gmail.com";

export const WHATSAPP_URL = "https://wa.me/420703982237";

export const INSTAPAY_HANDLE = "+201282244587";

export const FACEBOOK_GROUP_URL = "https://www.facebook.com/groups/351187011113360";

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
