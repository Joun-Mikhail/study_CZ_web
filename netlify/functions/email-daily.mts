/**
 * Scheduled daily at 06:00 UTC (07:00 Prague in winter, 08:00 in summer).
 *
 * 1. Deadline reminders for contacts on the reminders list: "deadline
 *    confirmed" once a followed programme gets a verified deadline, then
 *    30, 7 and 1 days before it. Sent reminders are recorded in REMINDERS_SENT
 *    so nothing is sent twice.
 * 2. The tips series for contacts who opted in (MARKETING true), one email
 *    per SERIES_DAYS step, tracked in SERIES_STEP.
 *
 * Brevo's free plan allows 300 emails a day, so a run sends at most
 * MAX_PER_RUN, reminders first.
 */
import { Brevo, type BrevoContact } from "../lib/brevo.mjs";
import { emailConfig } from "../lib/email-config.mjs";
import { unsubscribeUrl } from "../lib/email-links.mjs";
import {
  render,
  daysUntilDeadline,
  deadlineReminderBlocks,
  deadlinePublishedBlocks,
  seriesBlocks,
  SERIES_DAYS,
  type Locale,
} from "../lib/email-templates.mjs";

export const MAX_PER_RUN = 250;
export const REMINDER_DAYS = [30, 7, 1] as const;

/** What a reminders-list contact is due today, as REMINDERS_SENT keys. */
export function dueReminders(contact: BrevoContact, now = Date.now()): { id: string; kind: "published" | number }[] {
  const followed = String(contact.attributes.PROGRAMMES ?? "").split(",").filter(Boolean);
  const sent = new Set(String(contact.attributes.REMINDERS_SENT ?? "").split(",").filter(Boolean));
  const due: { id: string; kind: "published" | number }[] = [];
  for (const id of followed) {
    const days = daysUntilDeadline(id, now);
    if (days === null || days < 1) continue;
    if (!sent.has(`${id}:published`) && days > 30) {
      due.push({ id, kind: "published" });
      continue;
    }
    // The tightest reminder window we're inside and haven't sent yet.
    const window = [...REMINDER_DAYS].reverse().find((d) => days <= d);
    if (window !== undefined && !sent.has(`${id}:${window}`)) due.push({ id, kind: window });
  }
  return due;
}

/** The series step due today for an opted-in contact, or null. */
export function dueSeriesStep(contact: BrevoContact, now = Date.now()): number | null {
  if (contact.attributes.MARKETING !== true) return null;
  const signup = Date.parse(String(contact.attributes.SIGNUP_DATE ?? ""));
  if (Number.isNaN(signup)) return null;
  const step = Number(contact.attributes.SERIES_STEP ?? 0);
  if (!Number.isInteger(step) || step < 0 || step >= SERIES_DAYS.length) return null;
  const daysSince = Math.floor((now - signup) / 86_400_000);
  return daysSince >= SERIES_DAYS[step] ? step : null;
}

export default async function handler() {
  const config = emailConfig();
  if (!config) {
    console.log("email-daily: not configured, skipping");
    return;
  }
  const brevo = new Brevo(config.key);
  await brevo.ensureSetup();
  let sent = 0;
  let failed = 0;

  const send = async (contact: BrevoContact, subject: string, blocks: Parameters<typeof render>[2], kind: "reminders" | "tips", tag: string) => {
    const locale: Locale = contact.attributes.LOCALE === "ar" ? "ar" : "en";
    const unsubAll = await unsubscribeUrl(contact.email, "all", config.secret);
    const unsubTips = kind === "tips" ? await unsubscribeUrl(contact.email, "tips", config.secret) : undefined;
    const msg = render(locale, subject, blocks, { kind, unsubscribeTips: unsubTips, unsubscribeAll: unsubAll });
    await brevo.sendEmail({
      to: contact.email,
      sender: config.sender,
      subject: msg.subject,
      html: msg.html,
      text: msg.text,
      tags: [tag],
      headers: { "List-Unsubscribe": `<${unsubTips ?? unsubAll}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    });
    sent++;
  };

  // 1. Deadline reminders.
  for await (const contact of brevo.listContacts("reminders")) {
    if (sent >= MAX_PER_RUN) break;
    const due = dueReminders(contact);
    if (!due.length) continue;
    const locale: Locale = contact.attributes.LOCALE === "ar" ? "ar" : "en";
    const record = new Set(String(contact.attributes.REMINDERS_SENT ?? "").split(",").filter(Boolean));
    for (const item of due) {
      if (sent >= MAX_PER_RUN) break;
      try {
        const { subject, blocks } =
          item.kind === "published" ? deadlinePublishedBlocks(item.id, locale) : deadlineReminderBlocks(item.id, daysUntilDeadline(item.id)!, locale);
        await send(contact, subject, blocks, "reminders", item.kind === "published" ? "deadline_published" : `deadline_${item.kind}`);
        record.add(`${item.id}:${item.kind}`);
      } catch (err) {
        failed++;
        console.error("email-daily reminder failed", err instanceof Error ? err.message : "unknown");
      }
    }
    await brevo.updateContact(contact.email, { REMINDERS_SENT: [...record].slice(-60).join(",") }).catch(() => failed++);
  }

  // 2. Tips series.
  for await (const contact of brevo.listContacts("tips")) {
    if (sent >= MAX_PER_RUN) break;
    const step = dueSeriesStep(contact);
    if (step === null) continue;
    const locale: Locale = contact.attributes.LOCALE === "ar" ? "ar" : "en";
    const email = seriesBlocks(step, locale);
    if (!email) continue;
    try {
      await send(contact, email.subject, email.blocks, "tips", `tips_${step + 1}`);
      await brevo.updateContact(contact.email, { SERIES_STEP: step + 1 });
    } catch (err) {
      failed++;
      console.error("email-daily tip failed", err instanceof Error ? err.message : "unknown");
    }
  }

  console.log(`email-daily: sent ${sent}, failed ${failed}`);
}

export const config = { schedule: "0 6 * * *" };
