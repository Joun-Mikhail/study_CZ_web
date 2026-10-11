/**
 * Email content (EN + Egyptian Arabic) built only from site data: the
 * eligibility scoring and copy, programme records, the application guide and
 * pricing.ts. Nothing here takes free text from the visitor, so the subscribe
 * endpoint can't be used to send arbitrary messages.
 */
import { scoreForm, en as eligEn, ar as eligAr, type FormData, type Status } from "../../src/app/eligibility/eligibility-logic";
import { programmes } from "../../src/data/programmes";
import { universitiesV2 } from "../../src/data/universities-v2";
import { guideSteps } from "../../src/data/guide";
import { price, isOfferActiveAt, OFFER_END_LABEL, LAUNCH_OFFER } from "../../src/config/pricing";
import { SITE_URL } from "./http.mjs";

export type Locale = "en" | "ar";
export type Email = { subject: string; html: string; text: string };

const WHATSAPP = "https://wa.me/420703982237";

// ── helpers ──────────────────────────────────────────────────────────────────

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Absolute site link in the right language, with UTM tags for Umami. */
export function siteLink(path: string, locale: Locale, campaign: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const localized = locale === "ar" && !clean.startsWith("/ar/") ? `/ar${clean === "/" ? "/" : clean}` : clean;
  const sep = localized.includes("?") ? "&" : "?";
  return `${SITE_URL}${localized}${sep}utm_source=email&utm_medium=email&utm_campaign=${encodeURIComponent(campaign)}`;
}

type Block =
  | { p: string }
  | { h: string }
  | { list: string[] }
  | { button: { label: string; href: string } }
  | { link: { label: string; href: string } }
  | { card: { title: string; lines: string[]; href?: string; hrefLabel?: string } };

const FOOTER = {
  en: {
    tips: "You're getting this because you asked for study tips on studyczechia.com.",
    reminders: "You're getting this because you asked for deadline reminders on studyczechia.com.",
    requested: "You're getting this because you asked for it on studyczechia.com.",
    unsubscribeTips: "Stop tips and offers",
    unsubscribeAll: "Unsubscribe from everything",
    sign: "Study Czechia · studyczechia.com · Not affiliated with any embassy, university or the official Study in Czechia programme.",
  },
  ar: {
    tips: "وصلك الإيميل ده لأنك طلبت نصايح عن الدراسة على studyczechia.com.",
    reminders: "وصلك الإيميل ده لأنك طلبت تذكير بمواعيد التقديم على studyczechia.com.",
    requested: "وصلك الإيميل ده لأنك طلبته على studyczechia.com.",
    unsubscribeTips: "وقّف النصايح والعروض",
    unsubscribeAll: "إلغاء الاشتراك في كل حاجة",
    sign: "Study Czechia · studyczechia.com · مش تابعين لأي سفارة أو جامعة أو لبرنامج Study in Czechia الرسمي.",
  },
};

export type FooterKind = "tips" | "reminders" | "requested";

export function render(
  locale: Locale,
  subject: string,
  blocks: Block[],
  footer: { kind: FooterKind; unsubscribeTips?: string; unsubscribeAll?: string }
): Email {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const align = locale === "ar" ? "right" : "left";
  const f = FOOTER[locale];
  const html: string[] = [];
  const text: string[] = [];
  for (const b of blocks) {
    if ("p" in b) {
      html.push(`<p style="margin:0 0 14px;line-height:1.6">${escapeHtml(b.p)}</p>`);
      text.push(b.p, "");
    } else if ("h" in b) {
      html.push(`<h2 style="margin:22px 0 10px;font-size:18px;color:#0f172a">${escapeHtml(b.h)}</h2>`);
      text.push(b.h.toUpperCase(), "");
    } else if ("list" in b) {
      html.push(`<ul style="margin:0 0 14px;padding-${align === "left" ? "left" : "right"}:20px;line-height:1.6">${b.list.map((i) => `<li style="margin-bottom:6px">${escapeHtml(i)}</li>`).join("")}</ul>`);
      text.push(...b.list.map((i) => `- ${i}`), "");
    } else if ("button" in b) {
      html.push(`<p style="margin:20px 0"><a href="${escapeHtml(b.button.href)}" style="display:inline-block;background:#f59e0b;color:#0f172a;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:10px">${escapeHtml(b.button.label)}</a></p>`);
      text.push(`${b.button.label}: ${b.button.href}`, "");
    } else if ("link" in b) {
      html.push(`<p style="margin:0 0 14px"><a href="${escapeHtml(b.link.href)}" style="color:#b45309">${escapeHtml(b.link.label)}</a></p>`);
      text.push(`${b.link.label}: ${b.link.href}`, "");
    } else {
      const c = b.card;
      html.push(
        `<div style="border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;margin:0 0 12px"><p style="margin:0 0 6px;font-weight:bold;color:#0f172a">${escapeHtml(c.title)}</p>${c.lines
          .map((l) => `<p style="margin:0 0 6px;line-height:1.5;color:#334155">${escapeHtml(l)}</p>`)
          .join("")}${c.href ? `<p style="margin:6px 0 0"><a href="${escapeHtml(c.href)}" style="color:#b45309">${escapeHtml(c.hrefLabel ?? c.href)}</a></p>` : ""}</div>`
      );
      text.push(c.title, ...c.lines, ...(c.href ? [`${c.hrefLabel ?? ""} ${c.href}`.trim()] : []), "");
    }
  }
  const links: string[] = [];
  if (footer.unsubscribeTips) links.push(`<a href="${escapeHtml(footer.unsubscribeTips)}" style="color:#64748b">${f.unsubscribeTips}</a>`);
  if (footer.unsubscribeAll) links.push(`<a href="${escapeHtml(footer.unsubscribeAll)}" style="color:#64748b">${f.unsubscribeAll}</a>`);
  const footerHtml = `<div style="margin-top:28px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5"><p style="margin:0 0 6px">${f[footer.kind]}</p>${links.length ? `<p style="margin:0 0 6px">${links.join(" · ")}</p>` : ""}<p style="margin:0">${escapeHtml(f.sign)}</p></div>`;
  text.push("--", f[footer.kind]);
  if (footer.unsubscribeTips) text.push(`${f.unsubscribeTips}: ${footer.unsubscribeTips}`);
  if (footer.unsubscribeAll) text.push(`${f.unsubscribeAll}: ${footer.unsubscribeAll}`);
  text.push(f.sign);
  const page = `<!doctype html><html lang="${locale}" dir="${dir}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head><body style="margin:0;background:#f8fafc;font-family:Tahoma,Arial,sans-serif;color:#1e293b"><div style="max-width:600px;margin:0 auto;padding:24px 18px;text-align:${align};direction:${dir}"><p style="margin:0 0 18px;font-size:20px;font-weight:800"><span style="color:#1e3a8a">Study</span> <span style="color:#dc2626">Czechia</span></p>${html.join("")}${footerHtml}</div></body></html>`;
  return { subject, html: page, text: text.join("\n") };
}

function offerLine(locale: Locale, now = Date.now()): Block[] {
  if (!isOfferActiveAt(now)) return [];
  return locale === "ar"
    ? [{ p: `عرض الإطلاق: خصم ${LAUNCH_OFFER.percentOff}% على الخدمات والكورس لحد ${OFFER_END_LABEL.ar} (ما عدا المرحلة التانية من المرافقة الكاملة).` }]
    : [{ p: `Launch offer: ${LAUNCH_OFFER.percentOff}% off the services and the course until ${OFFER_END_LABEL.en} (except Full Journey step 2).` }];
}

// ── eligibility result ───────────────────────────────────────────────────────

const STATUS_LABEL: Record<Locale, Record<Status, string>> = {
  en: { pass: "Ready", warning: "Needs attention", fail: "Missing" },
  ar: { pass: "جاهز", warning: "محتاج اهتمام", fail: "ناقص" },
};

/** Keeps only the answer fields the scoring uses, as short known strings. */
export function sanitizeAnswers(raw: unknown): FormData | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const pick = (k: string, max = 20) => (typeof r[k] === "string" ? (r[k] as string).slice(0, max) : "");
  return {
    firstName: "",
    country: "",
    whatsapp: "",
    email: "",
    highestEducation: pick("highestEducation"),
    gpa: pick("gpa", 8),
    targetLevel: pick("targetLevel"),
    apostille: pick("apostille"),
    translation: pick("translation"),
    passportValid: pick("passportValid"),
    proofOfFunds: pick("proofOfFunds"),
    fundingSource: pick("fundingSource"),
    startWhen: pick("startWhen"),
    appliedBefore: pick("appliedBefore"),
    englishCert: pick("englishCert"),
    czechPrep: pick("czechPrep"),
  };
}

export function eligibilityResultEmail(answers: FormData, locale: Locale): { blocks: Block[]; subject: string; pct: number } {
  const copy = locale === "ar" ? eligAr : eligEn;
  const { categories, pct } = scoreForm(answers);
  const campaign = "eligibility_result";
  const blocks: Block[] = [
    { p: locale === "ar" ? `جاهزيتك للتقديم: ${pct}%` : `Your readiness: ${pct}%` },
    {
      p:
        locale === "ar"
          ? "دي نتيجة اختبار \"أقدر أدرس في التشيك؟\" اللي عملته على الموقع، ومعاها الخطوات اللي تعملها دلوقتي."
          : "Here's the result of the \"Can I study in Czechia?\" check you took on the site, with what to do next.",
    },
  ];
  for (const cat of categories) {
    const info = copy.resultCategories[cat.key as keyof typeof copy.resultCategories];
    if (!info) continue;
    const statusText = info[cat.status as keyof typeof info] as string;
    const advice = cat.status !== "pass" ? info.advice?.[cat.status as "warning" | "fail"] : undefined;
    const lines = [`${STATUS_LABEL[locale][cat.status]}: ${statusText}`];
    if (advice) lines.push(advice.detail);
    blocks.push({
      card: {
        title: info.title,
        lines,
        ...(advice ? { href: siteLink(advice.freeLink, locale, campaign), hrefLabel: advice.freeLabel } : {}),
      },
    });
  }
  blocks.push(
    { h: locale === "ar" ? "الخطوة الجاية" : "Your next step" },
    {
      p:
        locale === "ar"
          ? "ابدأ بالدليل المجاني خطوة بخطوة. ولو عايز حد يراجع وضعك أنت بالتحديد، احجز مكالمة."
          : "Start with the free step-by-step guide. If you'd like someone to look at your specific situation, book a call.",
    },
    { button: { label: locale === "ar" ? "الدليل المجاني" : "Open the free guide", href: siteLink("/application-guide/", locale, campaign) } },
    {
      link: {
        label: locale === "ar" ? `احجز مكالمة (${price("consultation", "ar")})` : `Book a call (${price("consultation")})`,
        href: siteLink("/services/", locale, campaign),
      },
    },
    ...offerLine(locale)
  );
  const subject = locale === "ar" ? `نتيجتك: جاهزيتك للدراسة في التشيك ${pct}%` : `Your result: ${pct}% ready to study in Czechia`;
  return { blocks, subject, pct };
}

// ── programmes and deadlines ─────────────────────────────────────────────────

export function knownProgrammeIds(ids: unknown, max = 5): string[] {
  if (!Array.isArray(ids)) return [];
  const valid = new Set(programmes.map((p) => p.id));
  return [...new Set(ids.filter((i): i is string => typeof i === "string" && valid.has(i)))].slice(0, max);
}

function programmeTitle(id: string, locale: Locale): { name: string; university: string; deadline?: string; href: string } {
  const p = programmes.find((x) => x.id === id)!;
  const uni = universitiesV2.find((u) => u.id === p.universityId);
  return {
    name: (locale === "ar" && p.name.ar) || p.name.en,
    university: uni?.name ?? p.universityId,
    deadline: p.deadlineType === "rolling" ? undefined : p.applicationDeadline,
    href: siteLink(`/programmes/${p.id}/`, locale, "deadline_reminder"),
  };
}

export function formatDate(iso: string, locale: Locale): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale === "ar" ? "ar-EG-u-nu-latn" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Prague" });
}

export function deadlineConfirmBlocks(ids: string[], locale: Locale): { subject: string; blocks: Block[] } {
  const blocks: Block[] = [
    {
      p:
        locale === "ar"
          ? "تمام! هبعتلك تذكير قبل آخر ميعاد للتقديم بـ30 يوم و7 أيام ويوم واحد. لو الميعاد لسه مش متأكد منه، هبعتلك أول ما الجامعة تنشره."
          : "Done! I'll remind you 30 days, 7 days and 1 day before each application deadline. If a deadline isn't confirmed yet, I'll email you as soon as the university publishes it.",
    },
  ];
  for (const id of ids) {
    const t = programmeTitle(id, locale);
    blocks.push({
      card: {
        title: t.name,
        lines: [
          t.university,
          t.deadline
            ? (locale === "ar" ? "آخر ميعاد: " : "Deadline: ") + formatDate(t.deadline, locale)
            : locale === "ar"
              ? "آخر ميعاد: لسه الجامعة ما أكدتهوش. هبعتلك أول ما يتنشر."
              : "Deadline: not confirmed by the university yet. I'll email you when it's published.",
        ],
        href: t.href,
        hrefLabel: locale === "ar" ? "تفاصيل البرنامج" : "Programme details",
      },
    });
  }
  blocks.push({ link: { label: locale === "ar" ? "الدليل المجاني للتقديم" : "Free application guide", href: siteLink("/application-guide/", locale, "deadline_reminder") } });
  return { subject: locale === "ar" ? "تمام، هفكرك بمواعيد التقديم" : "Your deadline reminders are set", blocks };
}

export function deadlineReminderBlocks(id: string, daysLeft: number, locale: Locale): { subject: string; blocks: Block[] } {
  const t = programmeTitle(id, locale);
  const when =
    locale === "ar"
      ? daysLeft === 1
        ? "بكرة آخر يوم"
        : `فاضل ${daysLeft} يوم`
      : daysLeft === 1
        ? "Tomorrow is the last day"
        : `${daysLeft} days left`;
  return {
    subject: locale === "ar" ? `${when} على التقديم: ${t.name}` : `${when} to apply: ${t.name}`,
    blocks: [
      { p: locale === "ar" ? `${when} على آخر ميعاد للتقديم في البرنامج ده:` : `${when} before the application deadline for:` },
      { card: { title: t.name, lines: [t.university, (locale === "ar" ? "آخر ميعاد: " : "Deadline: ") + formatDate(t.deadline!, locale)], href: t.href, hrefLabel: locale === "ar" ? "تفاصيل البرنامج" : "Programme details" } },
      {
        p:
          locale === "ar"
            ? "اتأكد إن أوراقك متوثقة ومترجمة قبل الميعاد. لو عايز حد يراجعها قبل ما تقدم، ده بالظبط دور خدمة مراجعة الأوراق."
            : "Make sure your documents are authenticated and translated before the deadline. If you'd like a second pair of eyes before you submit, that's what the document review is for.",
      },
      {
        link: {
          label: locale === "ar" ? `مراجعة الأوراق (${price("documentReview", "ar")})` : `Document review (${price("documentReview")})`,
          href: siteLink("/services/", locale, "deadline_reminder"),
        },
      },
    ],
  };
}

export function deadlinePublishedBlocks(id: string, locale: Locale): { subject: string; blocks: Block[] } {
  const t = programmeTitle(id, locale);
  return {
    subject: locale === "ar" ? `اتنشر ميعاد التقديم: ${t.name}` : `Deadline confirmed: ${t.name}`,
    blocks: [
      { p: locale === "ar" ? "الجامعة أكدت آخر ميعاد للتقديم في البرنامج اللي طلبت تتابعه:" : "The university has confirmed the application deadline for the programme you're following:" },
      { card: { title: t.name, lines: [t.university, (locale === "ar" ? "آخر ميعاد: " : "Deadline: ") + formatDate(t.deadline!, locale)], href: t.href, hrefLabel: locale === "ar" ? "تفاصيل البرنامج" : "Programme details" } },
      { p: locale === "ar" ? "هبعتلك تذكير قبلها بـ30 يوم و7 أيام ويوم." : "I'll remind you 30 days, 7 days and 1 day before it." },
    ],
  };
}

/** Programmes with a confirmed future deadline, and days left (Prague dates). */
export function daysUntilDeadline(id: string, now = Date.now()): number | null {
  const p = programmes.find((x) => x.id === id);
  if (!p?.applicationDeadline || p.deadlineType === "rolling") return null;
  const end = Date.parse(p.applicationDeadline);
  if (Number.isNaN(end)) return null;
  return Math.ceil((end - now) / 86_400_000);
}

// ── document checklist (from the application guide) ──────────────────────────

export function checklistBlocks(locale: Locale): { subject: string; blocks: Block[] } {
  const ids = ["documents", "authenticate", "criminal-record", "embassy-legalize", "visa-apply"];
  const blocks: Block[] = [
    {
      p:
        locale === "ar"
          ? "دي قائمة الأوراق من دليل التقديم على الموقع. احفظها وارجعلها وأنت بتجهز. كل جامعة ممكن تطلب حاجات زيادة، فاتأكد من صفحتها."
          : "Here's the document checklist from the site's application guide. Save it and come back to it as you prepare. Each university can ask for more, so always check its own page.",
    },
  ];
  for (const id of ids) {
    const s = guideSteps.find((g) => g.id === id);
    if (s) blocks.push({ card: { title: s.title[locale], lines: [s.body[locale]] } });
  }
  blocks.push(
    { button: { label: locale === "ar" ? "الدليل الكامل خطوة بخطوة" : "The full step-by-step guide", href: siteLink("/application-guide/", locale, "checklist") } },
    {
      link: {
        label: locale === "ar" ? `عايز حد يراجع أوراقك؟ (${price("documentReview", "ar")})` : `Want someone to check your documents? (${price("documentReview")})`,
        href: siteLink("/services/", locale, "checklist"),
      },
    },
    ...offerLine(locale)
  );
  return { subject: locale === "ar" ? "قائمة الأوراق المطلوبة للدراسة في التشيك" : "Your document checklist for studying in Czechia", blocks };
}

// ── tips series (only for people who ticked "send me tips") ──────────────────

/** Days after signup on which each tip is sent. */
export const SERIES_DAYS = [1, 3, 6, 10, 15, 21] as const;

export function seriesBlocks(step: number, locale: Locale, now = Date.now()): { subject: string; blocks: Block[] } | null {
  const ar = locale === "ar";
  const c = (campaign: string) => (path: string) => siteLink(path, locale, `tips_${campaign}`);
  switch (step) {
    case 0: {
      const l = c("1_decisions");
      return {
        subject: ar ? "3 قرارات بتسهل كل حاجة بعدها" : "3 decisions that make everything else easier",
        blocks: [
          { p: ar ? "أغلب الناس بتبدأ بالجامعات. الأسهل إنك تبدأ بـ3 قرارات، وكل حاجة بعد كده بتبقى أوضح:" : "Most people start by browsing universities. It's easier to start with three decisions; everything after that gets clearer:" },
          {
            list: ar
              ? ["التخصص: ده اللي بيحدد هتقارن بين أنهي جامعات.", "لغة الدراسة: إنجليزي (برسوم) أو تشيكي (مجاني في الجامعات الحكومية بعد سنة لغة).", "الميزانية: الرسوم والمعيشة مع بعض، مش الرسوم بس."]
              : ["Your field: it decides which universities you compare.", "Language: English (with tuition) or Czech (free at public universities, after a language year).", "Your budget: tuition and living costs together, not tuition alone."],
          },
          { p: ar ? "أداة اختيار البرامج بتعمل ده معاك في دقيقتين:" : "The programme matcher walks you through this in two minutes:" },
          { button: { label: ar ? "جرب أداة اختيار البرامج" : "Try the programme matcher", href: l("/university-matcher/") } },
        ],
      };
    }
    case 1: {
      const l = c("2_costs");
      return {
        subject: ar ? "الدراسة في التشيك بتتكلف كام فعلًا؟" : "What studying in Czechia actually costs",
        blocks: [
          { p: ar ? "ده من أكتر الأسئلة اللي بتتسأل. الإجابة بتختلف حسب المدينة والجامعة، فبدل رقم واحد، الموقع فيه حاسبة بأرقام حقيقية مع تاريخ آخر تحديث لكل رقم." : "It's one of the most common questions. The answer depends on the city and the university, so instead of one number, the site has calculators with real figures and the date each was last checked." },
          { button: { label: ar ? "حاسبة تكاليف المعيشة" : "Cost-of-living calculator", href: l("/cost-of-living/") } },
          { link: { label: ar ? "كل التكاليف: رسوم وفيزا وأوراق" : "Every cost: tuition, visa and documents", href: l("/what-it-costs/") } },
        ],
      };
    }
    case 2: {
      const l = c("3_documents");
      return {
        subject: ar ? "أخطاء الأوراق اللي بتضيع ترم كامل" : "The document mistakes that cost a semester",
        blocks: [
          { p: ar ? "أكتر حاجة بتأخر الطلاب مش الجامعة، الأوراق: توثيق ناقص، ترجمة مش معتمدة، أو ورقة منتهية." : "What delays most students isn't the university, it's the paperwork: a missing authentication, a translation that isn't certified, or an expired document." },
          { p: ar ? "الدليل على الموقع فيه كل خطوة بالترتيب، من الخارجية لحد السفارة:" : "The guide on the site lists every step in order, from the Ministry of Foreign Affairs to the embassy:" },
          { button: { label: ar ? "خطوات الأوراق" : "The document steps", href: l("/application-guide/") } },
          { p: ar ? `ولو عايز حد يراجع ملفك كله زي ما موظف السفارة هيعمل، دي خدمة مراجعة الأوراق (${price("documentReview", "ar")}).` : `And if you'd like someone to go through your whole file the way an embassy officer would, that's the document review (${price("documentReview")}).` },
          { link: { label: ar ? "مراجعة الأوراق" : "Document review", href: l("/services/") } },
          ...offerLine(locale, now),
        ],
      };
    }
    case 3: {
      const l = c("4_interview");
      return {
        subject: ar ? "مقابلة السفارة: إيه اللي بيتسأل فعلًا" : "The embassy interview: what they actually ask",
        blocks: [
          { p: ar ? "المقابلة بتقلق ناس كتير، بس غالبًا بتبقى أسئلة عن خطتك: ليه التشيك، ليه التخصص ده، وهتصرف إزاي." : "The interview worries a lot of people, but it mostly comes down to questions about your plan: why Czechia, why this field, and how you'll pay for it." },
          { button: { label: ar ? "تجهيز المقابلة على الموقع" : "Interview prep on the site", href: l("/interview-prep/") } },
          { p: ar ? `ولو حابب تتمرن على مقابلة تجريبية كاملة قبل الحقيقية (${price("interviewPrep", "ar")}):` : `If you'd like a full mock interview before the real one (${price("interviewPrep")}):` },
          { link: { label: ar ? "المقابلة التجريبية" : "Mock interview", href: l("/services/") } },
          ...offerLine(locale, now),
        ],
      };
    }
    case 4: {
      const l = c("5_arrival");
      return {
        subject: ar ? "أول أسبوع في التشيك" : "Your first week in Czechia",
        blocks: [
          { p: ar ? "أول أسبوع فيه مواعيد مهمة: تسجيل في شرطة الأجانب، تأمين، حساب بنك، شريحة، مواصلات. الموقع فيه خطة الوصول خطوة بخطوة." : "The first week has real deadlines: foreign police registration, insurance, a bank account, a SIM card, transport. The site has the arrival plan step by step." },
          { button: { label: ar ? "خطة الوصول" : "The arrival plan", href: l("/arrival/") } },
          { p: ar ? `وكورس "أول 90 يوم في التشيك" بيغطي اللغة والثقافة والحياة اليومية بالعربي. حجز مسبق بـ${price("course", "ar")}، والكورس بيفتح 1 يناير 2027.` : `The "Your First 90 Days in Czechia" course covers language, culture and daily life, in Arabic. Pre-order for ${price("course")}; it opens on 1 January 2027.` },
          { link: { label: ar ? "شوف الكورس" : "See the course", href: l("/courses/") } },
          ...offerLine(locale, now),
        ],
      };
    }
    case 5: {
      const l = c("6_full_journey");
      return {
        subject: ar ? "لو عايز حد معاك من الأول للآخر" : "If you'd like someone with you all the way",
        blocks: [
          { p: ar ? "كل الأدوات والأدلة هتفضل مجانية. بس لو عايز حد يمشي معاك من اختيار الجامعة لحد الفيزا، دي المرافقة الكاملة." : "All the tools and guides stay free. But if you'd like someone with you from choosing a university to getting your visa, that's the Full Journey." },
          {
            p: ar
              ? `المرحلة الأولى ${price("fullPackageStep1", "ar")} لما نبدأ. المرحلة التانية ${price("fullPackageStep2", "ar")} بتدفعها بس لما جامعة تقبلك، ولو ماتقبلتش مش هتدفعها خالص.`
              : `Step 1 is ${price("fullPackageStep1")} when we start. Step 2 (${price("fullPackageStep2")}) is only due once a university accepts you; if you're not accepted, you never pay it.`,
          },
          { button: { label: ar ? "تفاصيل المرافقة الكاملة" : "Full Journey details", href: l("/services/") } },
          { link: { label: ar ? "أو كلمني على واتساب" : "Or message me on WhatsApp", href: WHATSAPP } },
          ...offerLine(locale, now),
        ],
      };
    }
    default:
      return null;
  }
}
