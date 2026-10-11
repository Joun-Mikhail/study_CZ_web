/**
 * Read-only Stripe calls for course access, via the REST API (no SDK).
 * Needs a restricted key (STRIPE_COURSE_KEY) with read access to
 * "Checkout Sessions" and "Payment Links" — nothing else.
 */
import stripeLinks from "../../stripe-links.json";

const API = "https://api.stripe.com/v1";

export type CheckoutSession = {
  id: string;
  status: "open" | "complete" | "expired" | null;
  payment_status: "paid" | "unpaid" | "no_payment_required";
  payment_link: string | null;
  customer_details: { email: string | null } | null;
};

type PaymentLink = { id: string; url: string };

export class StripeError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}

async function stripeGet<T>(path: string, key: string, fetchImpl: typeof fetch): Promise<T> {
  const res = await fetchImpl(`${API}${path}`, {
    headers: { Authorization: `Bearer ${key}`, "Stripe-Version": "2024-06-20" },
  });
  if (!res.ok) throw new StripeError(`Stripe ${path.split("?")[0]} failed`, res.status);
  return (await res.json()) as T;
}

/** The course's Payment Link URL(s) from stripe-links.json. */
export function courseLinkUrls(): string[] {
  return [stripeLinks.links.course.url];
}

let cachedLinkIds: { ids: string[]; at: number } | null = null;

/** Payment Link IDs (plink_…) whose URL is the course link. Cached for 10 minutes. */
export async function coursePaymentLinkIds(key: string, fetchImpl: typeof fetch = fetch): Promise<string[]> {
  if (cachedLinkIds && Date.now() - cachedLinkIds.at < 10 * 60_000) return cachedLinkIds.ids;
  const urls = new Set(courseLinkUrls());
  const ids: string[] = [];
  let startingAfter = "";
  for (let page = 0; page < 10; page++) {
    const list = await stripeGet<{ data: PaymentLink[]; has_more: boolean }>(
      `/payment_links?limit=100${startingAfter ? `&starting_after=${startingAfter}` : ""}`,
      key,
      fetchImpl
    );
    for (const link of list.data) if (urls.has(link.url)) ids.push(link.id);
    if (!list.has_more || list.data.length === 0) break;
    startingAfter = list.data[list.data.length - 1].id;
  }
  cachedLinkIds = { ids, at: Date.now() };
  return ids;
}

export function resetStripeCache() {
  cachedLinkIds = null;
}

export async function getCheckoutSession(id: string, key: string, fetchImpl: typeof fetch = fetch) {
  return stripeGet<CheckoutSession>(`/checkout/sessions/${encodeURIComponent(id)}`, key, fetchImpl);
}

export function isPaidCourseSession(session: CheckoutSession, courseLinkIds: string[]): boolean {
  return (
    session.status === "complete" &&
    session.payment_status === "paid" &&
    session.payment_link !== null &&
    courseLinkIds.includes(session.payment_link)
  );
}

/** Whether this email has at least one paid course checkout. */
export async function emailHasPaidCourse(email: string, key: string, fetchImpl: typeof fetch = fetch): Promise<boolean> {
  const linkIds = await coursePaymentLinkIds(key, fetchImpl);
  for (const linkId of linkIds) {
    const params = new URLSearchParams({
      payment_link: linkId,
      "customer_details[email]": email,
      status: "complete",
      limit: "10",
    });
    const list = await stripeGet<{ data: CheckoutSession[] }>(`/checkout/sessions?${params}`, key, fetchImpl);
    if (list.data.some((s) => isPaidCourseSession(s, linkIds))) return true;
  }
  return false;
}
