/**
 * POST /api/email/subscribe
 * { email, locale, source: "eligibility" | "deadline" | "checklist" | "matcher",
 *   marketing: boolean, answers?: {...}, programmeIds?: string[], website?: "" }
 *
 * Saves the contact in Brevo and immediately sends what the visitor asked
 * for (their eligibility result, the deadline-reminder confirmation, or the
 * document checklist). Promotional tips only go to people who ticked the box.
 * Email content is generated from site data; nothing from the request body is
 * echoed into an email except the recipient address.
 */
import { Brevo } from "../lib/brevo.mjs";
import { json } from "../lib/http.mjs";
import { emailConfig } from "../lib/email-config.mjs";
import { unsubscribeUrl } from "../lib/email-links.mjs";
import {
  render,
  sanitizeAnswers,
  eligibilityResultEmail,
  knownProgrammeIds,
  daysUntilDeadline,
  deadlineConfirmBlocks,
  checklistBlocks,
  type Locale,
  type FooterKind,
} from "../lib/email-templates.mjs";

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const SOURCES = new Set(["eligibility", "deadline", "checklist", "matcher"]);

function mergeCsv(existing: unknown, add: string[]): string {
  const set = new Set(typeof existing === "string" && existing ? existing.split(",") : []);
  for (const a of add) set.add(a);
  return [...set].slice(0, 20).join(",");
}

export default async function handler(req: Request) {
  const config = emailConfig();
  if (!config) return json({ error: "not_configured" }, 503);

  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {}
  if (typeof body.website === "string" && body.website !== "") return json({ ok: true }); // honeypot: pretend success

  const email = String(body.email ?? "").trim().toLowerCase();
  const locale: Locale = body.locale === "ar" ? "ar" : "en";
  const source = String(body.source ?? "");
  const marketing = body.marketing === true;
  if (!EMAIL.test(email)) return json({ error: "bad_email" }, 400);
  if (!SOURCES.has(source)) return json({ error: "bad_source" }, 400);

  const programmeIds = knownProgrammeIds(body.programmeIds);
  const answers = source === "eligibility" ? sanitizeAnswers(body.answers) : null;
  if (source === "eligibility" && !answers) return json({ error: "bad_answers" }, 400);
  if (source === "deadline" && programmeIds.length === 0) return json({ error: "bad_programmes" }, 400);

  const brevo = new Brevo(config.key);
  try {
    await brevo.ensureSetup();
    const existing = await brevo.getContact(email);
    const attrs = existing?.attributes ?? {};
    const listKeys: ("reminders" | "tips")[] = [];
    if (programmeIds.length) listKeys.push("reminders");
    if (marketing) listKeys.push("tips");

    let blocks;
    let subject: string;
    let pct: number | undefined;
    if (source === "eligibility") {
      const r = eligibilityResultEmail(answers!, locale);
      blocks = r.blocks;
      subject = r.subject;
      pct = r.pct;
    } else if (programmeIds.length) {
      ({ subject, blocks } = deadlineConfirmBlocks(programmeIds, locale));
    } else {
      ({ subject, blocks } = checklistBlocks(locale));
    }

    await brevo.upsertContact(
      email,
      {
        LOCALE: locale,
        SOURCE: typeof attrs.SOURCE === "string" && attrs.SOURCE ? attrs.SOURCE : source,
        ...(marketing ? { MARKETING: true } : {}),
        ...(programmeIds.length ? { PROGRAMMES: mergeCsv(attrs.PROGRAMMES, programmeIds) } : {}),
        // Deadlines already confirmed at signup are in the confirmation email,
        // so the daily job must not send a separate "deadline confirmed" one.
        ...(programmeIds.some((id) => daysUntilDeadline(id) !== null)
          ? { REMINDERS_SENT: mergeCsv(attrs.REMINDERS_SENT, programmeIds.filter((id) => daysUntilDeadline(id) !== null).map((id) => `${id}:published`)) }
          : {}),
        ...(marketing && !attrs.SIGNUP_DATE ? { SIGNUP_DATE: new Date().toISOString().slice(0, 10), SERIES_STEP: 0 } : {}),
        ...(pct !== undefined ? { ELIG_PCT: pct } : {}),
      },
      listKeys
    );

    const kind: FooterKind = programmeIds.length ? "reminders" : "requested";
    const unsubAll = await unsubscribeUrl(email, "all", config.secret);
    const unsubTips = marketing ? await unsubscribeUrl(email, "tips", config.secret) : undefined;
    const message = render(locale, subject, blocks, { kind, unsubscribeTips: unsubTips, unsubscribeAll: unsubAll });
    await brevo.sendEmail({
      to: email,
      sender: config.sender,
      subject: message.subject,
      html: message.html,
      text: message.text,
      tags: [`subscribe_${source}`],
      headers: { "List-Unsubscribe": `<${unsubAll}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    });
    return json({ ok: true });
  } catch (err) {
    // Never log the address itself.
    console.error("email-subscribe failed", err instanceof Error ? err.message : "unknown");
    return json({ error: "unavailable" }, 502);
  }
}

export const config = {
  path: "/api/email/subscribe",
  method: "POST",
  rateLimit: { windowLimit: 8, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
