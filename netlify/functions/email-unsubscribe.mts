/**
 * GET/POST /api/email/unsubscribe?e=<email>&s=tips|all&t=<signature>
 * Signed one-click unsubscribe (also used by the List-Unsubscribe header).
 * "tips" stops the tips series; "all" also stops deadline reminders.
 */
import { Brevo } from "../lib/brevo.mjs";
import { env } from "../lib/http.mjs";
import { verifyUnsubscribe } from "../lib/email-links.mjs";

function page(status: number, en: string, ar: string, form = ""): Response {
  const body = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Study Czechia</title></head><body style="font-family:Tahoma,Arial,sans-serif;max-width:520px;margin:40px auto;padding:0 18px;color:#1e293b;line-height:1.6"><p style="font-size:20px;font-weight:800"><span style="color:#1e3a8a">Study</span> <span style="color:#dc2626">Czechia</span></p><p>${en}</p><p dir="rtl" lang="ar">${ar}</p>${form}<p><a href="https://studyczechia.com/" style="color:#b45309">studyczechia.com</a></p></body></html>`;
  return new Response(body, { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}

export default async function handler(req: Request) {
  const key = env("BREVO_API_KEY");
  const secret = env("EMAIL_LINK_SECRET");
  if (!key || !secret) return page(503, "Unsubscribing is temporarily unavailable. Please reply to the email instead.", "إلغاء الاشتراك مش متاح دلوقتي. رد على الإيميل وأنا هلغيه.");

  const url = new URL(req.url);
  const email = (url.searchParams.get("e") ?? "").toLowerCase();
  const scope = url.searchParams.get("s") ?? "";
  const token = url.searchParams.get("t") ?? "";
  if (!email || !(await verifyUnsubscribe(email, scope, token, secret))) {
    return page(400, "This unsubscribe link isn't valid. Please reply to any email and I'll remove you.", "اللينك ده مش صالح. رد على أي إيميل وأنا هشيلك من القائمة.");
  }

  // Mail scanners open links automatically, so a plain GET only asks for
  // confirmation; the button (and one-click List-Unsubscribe) is a POST.
  if (req.method === "GET") {
    const action = `${url.pathname}${url.search}`.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
    const button = scope === "all" ? "Unsubscribe from everything / إلغاء الاشتراك في كل حاجة" : "Stop tips and offers / وقّف النصايح والعروض";
    return page(
      200,
      scope === "all" ? "Unsubscribe from all Study Czechia emails?" : "Stop tips and offers from Study Czechia?",
      scope === "all" ? "عايز تلغي اشتراكك في كل إيميلات Study Czechia؟" : "عايز توقف النصايح والعروض من Study Czechia؟",
      `<form method="post" action="${action}"><button type="submit" style="background:#f59e0b;border:0;border-radius:10px;padding:12px 20px;font-weight:bold;cursor:pointer">${button}</button></form>`
    );
  }

  const brevo = new Brevo(key);
  try {
    await brevo.ensureSetup();
    if (await brevo.getContact(email)) {
      if (scope === "all") await brevo.updateContact(email, { MARKETING: false, PROGRAMMES: "" }, ["tips", "reminders"]);
      else await brevo.updateContact(email, { MARKETING: false }, ["tips"]);
    }
  } catch (err) {
    console.error("email-unsubscribe failed", err instanceof Error ? err.message : "unknown");
    return page(502, "Something went wrong. Please try again, or reply to any email and I'll remove you.", "حصلت مشكلة. جرب تاني، أو رد على أي إيميل وأنا هشيلك.");
  }
  return scope === "all"
    ? page(200, "You're unsubscribed. You won't get any more emails from Study Czechia.", "تم إلغاء اشتراكك. مش هيوصلك أي إيميل تاني من Study Czechia.")
    : page(200, "Done: no more tips or offers. Deadline reminders you asked for will still arrive.", "تمام: مفيش نصايح أو عروض تاني. تذكيرات المواعيد اللي طلبتها هتفضل توصلك.");
}

export const config = { path: "/api/email/unsubscribe", method: ["GET", "POST"] };
