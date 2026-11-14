"use client";

import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { CalendarCheck, ExternalLink } from "lucide-react";
import { AUTHORITIES, MOVED_EXAMPLES, OFFICIAL_PORTAL, OFFICIAL_TOPICS } from "@/data/official-sources";

export type FeeCounts = { total: number; verified: number };

const en = {
  title: "Official sources for studying in Czechia: an independent guide to them",
  subtitle:
    "Study Czechia is an independent guide. These are the official pages behind it: where each topic lives on the official portal, which authority decides what, and how we check what we publish.",
  independent:
    "This is not an official website. Study Czechia is run by a student and is not affiliated with, endorsed by or acting for any Czech ministry, embassy, university, DZS or the official Study in Czechia programme. The links below lead to their websites, which are the only authoritative sources.",
  checked: "Every link on this page opened correctly when we checked it on 11 November 2026.",
  movedTitle: "The official Study in Czechia portal is now at studyin.gov.cz",
  movedBody:
    "The official portal, run by the Czech National Agency for International Education and Research (DZS), now lives at studyin.gov.cz. Links to the older studyin.cz address are sent there, but several older pages no longer exist on the new site, so the link ends on a “page not found” screen. When we checked, that was the case for these old addresses:",
  movedAfter: "If a link you saved or found on another website stops working, use the table below to find the same topic.",
  portal: "Open the official portal",
  topicsTitle: "Where each topic is now",
  colGuide: "Our guide",
  officialLink: "Official page",
  authTitle: "Who decides what",
  authBody: "No guide, including this one, can decide your admission or visa. These bodies do:",
  methodTitle: "How we check what we publish",
  method: (c: FeeCounts) => [
    "Every fee, deadline and visa figure on the site links to the page it came from, with the date we last read it.",
    `A tuition fee is marked as verified only when the university's own fee page states that exact amount, in that currency, for the stated academic year. Today that is true for ${c.verified} of the ${c.total} English-taught programmes we list. The others show their source and are marked as being re-checked.`,
    "Living costs, dorm prices and visa amounts come from official price lists and government pages, not from estimates.",
    "If a page here disagrees with an official source, the official source is right. Tell us and we will correct it.",
  ],
  correction: "Report a correction",
  about: "About Study Czechia",
  citeTitle: "Linking to or quoting this site",
  citeBody:
    "You are welcome to quote figures from Study Czechia with a link to the page they come from. Please mention the “last verified” date shown next to the figure, and send readers to the official source for anything they will rely on.",
};

const ar: typeof en = {
  title: "المصادر الرسمية للدراسة في التشيك: دليل مستقل إليها",
  subtitle:
    "Study Czechia دليل مستقل. هذه هي الصفحات الرسمية التي يعتمد عليها: أين يوجد كل موضوع على البوابة الرسمية، وأي جهة تقرر ماذا، وكيف نراجع ما ننشره.",
  independent:
    "هذا ليس موقعًا رسميًا. Study Czechia يديره طالب، وهو غير تابع لأي وزارة تشيكية أو سفارة أو جامعة أو للوكالة DZS أو لبرنامج Study in Czechia الرسمي، ولا يمثل أيًّا منها ولا يحظى بتزكيتها. الروابط التالية تقود إلى مواقع تلك الجهات، وهي وحدها المصادر المعتمدة.",
  checked: "كل رابط في هذه الصفحة كان يعمل عندما راجعناه بتاريخ 11 نوفمبر 2026.",
  movedTitle: "البوابة الرسمية Study in Czechia أصبحت على studyin.gov.cz",
  movedBody:
    "البوابة الرسمية، التي تديرها الوكالة الوطنية التشيكية للتعليم الدولي والبحث (DZS)، أصبحت على العنوان studyin.gov.cz. الروابط إلى العنوان القديم studyin.cz تُحوَّل إليها، لكن بعض الصفحات القديمة لم تعد موجودة على الموقع الجديد، فينتهي الرابط بصفحة «غير موجودة». عند مراجعتنا كان هذا حال العناوين القديمة التالية:",
  movedAfter: "إذا توقف رابط حفظته أو وجدته في موقع آخر عن العمل، فاستخدم الجدول التالي للوصول إلى الموضوع نفسه.",
  portal: "افتح البوابة الرسمية",
  topicsTitle: "أين يوجد كل موضوع الآن",
  colGuide: "دليلنا",
  officialLink: "الصفحة الرسمية",
  authTitle: "من يقرر ماذا",
  authBody: "لا يستطيع أي دليل، ومنه هذا الدليل، أن يقرر قبولك أو تأشيرتك. هذه الجهات هي التي تقرر:",
  methodTitle: "كيف نراجع ما ننشره",
  method: (c: FeeCounts) => [
    "كل رسم وموعد ورقم خاص بالتأشيرة في الموقع مربوط بالصفحة التي أُخذ منها، مع تاريخ آخر قراءة لها.",
    `لا نصف الرسم الدراسي بأنه «موثَّق» إلا إذا ذكرت صفحة الرسوم في الجامعة نفسها المبلغ نفسه، بالعملة نفسها، للعام الدراسي المذكور. ينطبق ذلك اليوم على ${c.verified} من ${c.total} برنامجًا بالإنجليزية في الموقع. البرامج الأخرى تعرض مصدرها ومكتوب عليها أنها قيد إعادة المراجعة.`,
    "تكاليف المعيشة وأسعار السكن الجامعي ومبالغ التأشيرة مأخوذة من قوائم الأسعار الرسمية والصفحات الحكومية، لا من تقديرات.",
    "إذا اختلفت صفحة هنا مع مصدر رسمي فالمصدر الرسمي هو الصحيح. أخبرنا وسنصحح الخطأ.",
  ],
  correction: "أبلغ عن تصحيح",
  about: "عن Study Czechia",
  citeTitle: "الإشارة إلى الموقع أو الاقتباس منه",
  citeBody:
    "يمكنك اقتباس الأرقام من Study Czechia مع رابط إلى الصفحة المأخوذة منها. نرجو ذكر تاريخ «آخر تحقق» الظاهر بجانب الرقم، وتوجيه القراء إلى المصدر الرسمي في كل ما سيعتمدون عليه.",
};

const ext = "inline-flex items-center gap-1 font-medium text-brand hover:underline";

export default function SourcesClient({ counts }: { counts: FeeCounts }) {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{t.title}</h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-4">{t.subtitle}</p>
            <p role="note" className="mb-4 rounded-xl border border-border-subtle bg-bg-subtle p-4 text-sm font-medium leading-relaxed text-text-primary">
              {t.independent}
            </p>
            <p className="flex items-start gap-2 text-sm text-text-muted">
              <CalendarCheck className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              {t.checked}
            </p>
          </header>

          <GlassCard className="mb-8">
            <h2 className="text-lg font-semibold text-text-primary mb-2">{t.movedTitle}</h2>
            <p className="text-sm text-text-secondary leading-relaxed">{t.movedBody}</p>
            <ul className="mt-3 space-y-1 text-sm text-text-secondary">
              {MOVED_EXAMPLES.map((u) => (
                <li key={u}>
                  <bdi dir="ltr" className="break-all">{u}</bdi>
                </li>
              ))}
            </ul>
            <p className="text-sm text-text-secondary leading-relaxed mt-3">{t.movedAfter}</p>
            <p className="text-sm mt-3">
              <a href={`${OFFICIAL_PORTAL}/`} target="_blank" rel="noopener noreferrer" className={ext}>
                {t.portal}
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </p>
          </GlassCard>

          <section aria-labelledby="sources-topics" className="mb-8">
            <h2 id="sources-topics" className="text-xl font-semibold text-text-primary mb-3">{t.topicsTitle}</h2>
            <ul className="divide-y divide-border-subtle rounded-2xl border border-border-subtle">
              {OFFICIAL_TOPICS.map((row) => (
                <li key={row.id} className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                  <h3 className="text-base font-semibold text-text-primary">{row.topic[locale]}</h3>
                  <p className="text-sm mt-1 sm:mt-0">
                    <a href={row.officialUrl} target="_blank" rel="noopener noreferrer" className={ext}>
                      {t.officialLink}
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </p>
                  <p className="text-sm mt-1 sm:mt-0">
                    <span className="text-text-muted">{t.colGuide}: </span>
                    <Link href={row.guide.href} className="font-medium text-brand hover:underline">
                      {row.guide.label[locale]}
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="sources-authorities" className="mb-8">
            <h2 id="sources-authorities" className="text-xl font-semibold text-text-primary mb-2">{t.authTitle}</h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">{t.authBody}</p>
            <div className="space-y-3">
              {AUTHORITIES.map((a) => (
                <GlassCard key={a.id}>
                  <h3 className="text-base font-semibold text-text-primary">
                    <a href={a.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 hover:text-brand hover:underline">
                      {a.name[locale]}
                      <ExternalLink className="w-3.5 h-3.5 mt-1 shrink-0" aria-hidden="true" />
                    </a>
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mt-1">{a.decides[locale]}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          <section aria-labelledby="sources-method" className="mb-8">
            <h2 id="sources-method" className="text-xl font-semibold text-text-primary mb-3">{t.methodTitle}</h2>
            <ul className="space-y-2 text-sm text-text-secondary leading-relaxed list-disc ps-5">
              {t.method(counts).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                { href: "/contact/", label: t.correction },
                { href: "/about/", label: t.about },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center px-3 py-1.5 rounded-full border border-border-subtle text-sm text-text-secondary hover:text-brand hover:border-brand/40 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <GlassCard>
            <h2 className="text-lg font-semibold text-text-primary mb-2">{t.citeTitle}</h2>
            <p className="text-sm text-text-secondary leading-relaxed">{t.citeBody}</p>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
