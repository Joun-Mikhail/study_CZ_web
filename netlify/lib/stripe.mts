/**
 * Read-only Stripe calls for course access, via the REST API (no SDK).
 * Needs a restricted key (STRIPE_COURSE_KEY) with read access to
 * Checkout Sessions and Payment Links (the same read-only key also works).
 */
import stripeLinks from "../../stripe-links.json";

const API = "https://api.stripe.com/v1";

export type AccessProduct = "course" | "fullJourney";

/**
 * Payment Links whose buyers get course access: the course itself and Full
 * Journey step 1 (the course is included free with the Full Journey). Older
 * links stay listed so earlier buyers keep access after a link is replaced.
 */
const HISTORICAL_ACCESS_LINKS: Record<string, AccessProduct> = {
  "https://buy.stripe.com/eVqcN42GK1X0fQvgE7fnO04": "course",
  "https://buy.stripe.com/6oUeVc0yC8lo47N4VpfnO0h": "course",
  "https://buy.stripe.com/bJe5kCa9c7hkeMr4VpfnO0d": "fullJourney",
  "https://buy.stripe.com/9B69ASepsbxA6fV2NhfnO0j": "fullJourney",
};

export function accessLinkUrls(): Record<string, AccessProduct> {
  return {
    ...HISTORICAL_ACCESS_LINKS,
    [stripeLinks.links.course.url]: "course",
    [stripeLinks.links.fullPackageStep1.url]: "fullJourney",
  };
}

export type CheckoutSession = {
  id: string;
  created?: number;
  status: "open" | "complete" | "expired" | null;
  payment_status: "paid" | "unpaid" | "no_payment_required";
  payment_link: string | null;
  customer_details: { email: string | null; phone?: string | null } | null;
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

let cachedLinks: { byId: Map<string, AccessProduct>; at: number } | null = null;

/** Payment Link IDs (plink_...) that grant access, with their product. Cached 10 minutes. */
export async function accessPaymentLinks(key: string, fetchImpl: typeof fetch = fetch): Promise<Map<string, AccessProduct>> {
  if (cachedLinks && Date.now() - cachedLinks.at < 10 * 60_000) return cachedLinks.byId;
  const urls = accessLinkUrls();
  const byId = new Map<string, AccessProduct>();
  let startingAfter = "";
  for (let page = 0; page < 10; page++) {
    const list = await stripeGet<{ data: PaymentLink[]; has_more: boolean }>(
      `/payment_links?limit=100${startingAfter ? `&starting_after=${startingAfter}` : ""}`,
      key,
      fetchImpl
    );
    for (const link of list.data) if (urls[link.url]) byId.set(link.id, urls[link.url]);
    if (!list.has_more || list.data.length === 0) break;
    startingAfter = list.data[list.data.length - 1].id;
  }
  cachedLinks = { byId, at: Date.now() };
  return byId;
}

/** Kept for callers that only need the IDs. */
export async function coursePaymentLinkIds(key: string, fetchImpl: typeof fetch = fetch): Promise<string[]> {
  return [...(await accessPaymentLinks(key, fetchImpl)).keys()];
}

export function resetStripeCache() {
  cachedLinks = null;
}

export async function getCheckoutSession(id: string, key: string, fetchImpl: typeof fetch = fetch) {
  return stripeGet<CheckoutSession>(`/checkout/sessions/${encodeURIComponent(id)}`, key, fetchImpl);
}

export function isPaidCourseSession(session: CheckoutSession, accessLinkIds: string[]): boolean {
  return (
    session.status === "complete" &&
    session.payment_status === "paid" &&
    session.payment_link !== null &&
    accessLinkIds.includes(session.payment_link)
  );
}

/** Whether this email has at least one paid checkout that grants course access. */
export async function emailHasPaidCourse(email: string, key: string, fetchImpl: typeof fetch = fetch): Promise<boolean> {
  const links = await accessPaymentLinks(key, fetchImpl);
  const ids = [...links.keys()];
  for (const linkId of ids) {
    const params = new URLSearchParams({ payment_link: linkId, "customer_details[email]": email, status: "complete", limit: "10" });
    const list = await stripeGet<{ data: CheckoutSession[] }>(`/checkout/sessions?${params}`, key, fetchImpl);
    if (list.data.some((s) => isPaidCourseSession(s, ids))) return true;
  }
  return false;
}

export type Buyer = { email: string; phone: string | null; date: string; product: AccessProduct; source: "stripe" };

/** Every paid checkout that grants course access, newest first. */
export async function listBuyers(key: string, fetchImpl: typeof fetch = fetch): Promise<Buyer[]> {
  const links = await accessPaymentLinks(key, fetchImpl);
  const ids = [...links.keys()];
  const buyers: Buyer[] = [];
  for (const [linkId, product] of links) {
    let startingAfter = "";
    for (let page = 0; page < 20; page++) {
      const params = new URLSearchParams({ payment_link: linkId, status: "complete", limit: "100" });
      if (startingAfter) params.set("starting_after", startingAfter);
      const list = await stripeGet<{ data: CheckoutSession[]; has_more: boolean }>(`/checkout/sessions?${params}`, key, fetchImpl);
      for (const s of list.data) {
        if (!isPaidCourseSession(s, ids)) continue;
        buyers.push({
          email: (s.customer_details?.email ?? "").toLowerCase(),
          phone: s.customer_details?.phone ?? null,
          date: s.created ? new Date(s.created * 1000).toISOString().slice(0, 10) : "",
          product,
          source: "stripe",
        });
      }
      if (!list.has_more || list.data.length === 0) break;
      startingAfter = list.data[list.data.length - 1].id;
    }
  }
  return buyers.sort((a, b) => b.date.localeCompare(a.date));
}
