"use client";

import Link from "@/components/locale-link";
import { FounderCard } from "@/components/founder-card";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { programmes } from "@/data/programmes";
import { totalRange } from "@/data/costs";
import { price } from "@/config/pricing";
import { CONTACT_EMAIL, FOUNDER_NAME, FOUNDER_NAME_AR, REFUND_COPY, whatsappWithContext } from "@/config/contact";
import { ExternalLink, Mail, MessageCircle, ShieldCheck, Wallet, Receipt, UserRound, Calculator } from "lucide-react";

const GPI_SOURCE = "https://www.visionofhumanity.org/wp-content/uploads/2026/06/Global-Peace-Index-2026-A3-map-poster.pdf";

const n = (x: number) => x.toLocaleString("en-US");
const tuition = programmes.filter((p) => p.language === "English").map((p) => p.tuitionEurPerYear);
const TUITION_MIN = Math.min(...tuition);
const TUITION_MAX = Math.max(...tuition);
const [BRNO_MIN, BRNO_MAX] = totalRange("brno");
const [PRAGUE_MIN, PRAGUE_MAX] = totalRange("prague");
const toEur = (czk: number) => Math.round(czk / 25 / 10) * 10;

const en = {
  title: "For parents: what studying in Czechia involves",
  intro:
    "If your son or daughter is thinking about studying in Czechia, this page answers what parents usually ask us: what it costs, how safe it is, who we are, and how paying for help works.",
  whoTitle: "Who runs Study Czechia",
  who: `Study Czechia is an independent, student-built information platform run by its founder, ${FOUNDER_NAME}, a student in Brno, Czech Republic. It is not affiliated with any Czech embassy, government ministry or university. We do not guarantee university admission or visa approval: those decisions are made only by the Czech authorities and universities.`,
  costTitle: "What a degree costs",
  costItems: [
    `Tuition for the English-taught programmes in our database ranges from €${n(TUITION_MIN)} to €${n(TUITION_MAX)} a year, depending on the university and the subject. Studying in Czech at public universities is free.`,
    `Living costs (a shared dorm room, food, transport, health insurance, phone and laundry) come to about ${n(BRNO_MIN)}–${n(BRNO_MAX)} CZK a month in Brno (≈ €${n(toEur(BRNO_MIN))}–${n(toEur(BRNO_MAX))}) and ${n(PRAGUE_MIN)}–${n(PRAGUE_MAX)} CZK in Prague (≈ €${n(toEur(PRAGUE_MIN))}–${n(toEur(PRAGUE_MAX))}).`,
    "The embassy also asks for proof of funds for the visa. Our cost of living page shows the current amount.",
  ],
  costLinks: [
    { href: "/what-it-costs", label: "Calculate the total for a whole degree" },
    { href: "/cost-of-living", label: "Cost of living by city" },
    { href: "/programmes", label: "Every programme with its fee and source" },
  ],
  safetyTitle: "Safety",
  safety: "Czechia ranks 13th of 163 countries in the Global Peace Index 2026, published by the Institute for Economics & Peace.",
  safetySource: "Global Peace Index 2026",
  payTitle: "If you pay for our help",
  payItems: [
    "All payments go through Stripe by card, or InstaPay for students in Egypt. Prices are in euros and every price is shown before you pay.",
    `The Full Journey is paid in two steps: ${price("fullPackageStep1")} when we start, and ${price("fullPackageStep2")} only after a university accepts your child. If no university accepts them, the second payment is never due.`,
  ],
  refundTitle: "Refunds",
  refund: REFUND_COPY.en.faq,
  withdraw: "If you are a consumer in the EU, the 14-day right of withdrawal applies on top of these rules.",
  termsLink: "Read the full terms",
  receiptTitle: "Receipts and invoices",
  receipt: `Stripe processes every card payment. If you need a receipt or an invoice in a particular name, for example for your employer, tell ${FOUNDER_NAME} before you pay.`,
  docsTitle: "Your child's documents",
  docs: "Documents sent for a service (such as passports, transcripts or bank statements) are used only for that service and deleted within 90 days after it ends, or sooner if you ask.",
  contactTitle: `Talk to ${FOUNDER_NAME} directly`,
  contact: "Parents are welcome to message us themselves, in Arabic or English.",
  whatsapp: "WhatsApp",
  email: "Email",
  waTopic: "studying in Czechia (I'm a parent)",
};

const ar: typeof en = {
  title: "لأولياء الأمور: ماذا تعني الدراسة في التشيك",
  intro:
    "إذا كان ابنك أو ابنتك يفكر في الدراسة في التشيك، تجيب هذه الصفحة عن أكثر ما يسأل عنه أولياء الأمور: التكلفة، والأمان، ومن نحن، وكيف يتم الدفع مقابل المساعدة.",
  whoTitle: "من يدير Study Czechia",
  who: `Study Czechia منصة معلومات مستقلة أسسها ويديرها ${FOUNDER_NAME_AR}، وهو طالب في مدينة برنو بالتشيك. المنصة غير تابعة لأي سفارة تشيكية أو وزارة أو جامعة. ولا نضمن القبول في الجامعة أو الموافقة على التأشيرة، فهذه القرارات تتخذها الجهات والجامعات التشيكية وحدها.`,
  costTitle: "تكلفة الدراسة",
  costItems: [
    `تتراوح رسوم البرامج المدرّسة بالإنجليزية في قاعدة بياناتنا بين ${n(TUITION_MIN)}€ و${n(TUITION_MAX)}€ في السنة، حسب الجامعة والتخصص. أما الدراسة بالتشيكية في الجامعات الحكومية فمجانية.`,
    `تبلغ تكاليف المعيشة (غرفة مشتركة في السكن الجامعي، والطعام، والمواصلات، والتأمين الصحي، والهاتف، والغسيل) نحو ${n(BRNO_MIN)}–${n(BRNO_MAX)} كرونة شهريًا في برنو (≈ ${n(toEur(BRNO_MIN))}–${n(toEur(BRNO_MAX))}€)، و${n(PRAGUE_MIN)}–${n(PRAGUE_MAX)} كرونة في براغ (≈ ${n(toEur(PRAGUE_MIN))}–${n(toEur(PRAGUE_MAX))}€).`,
    "تطلب السفارة أيضًا إثبات توفر مبلغ مالي للتأشيرة، وصفحة تكاليف المعيشة عندنا توضح المبلغ الحالي.",
  ],
  costLinks: [
    { href: "/what-it-costs", label: "احسب التكلفة الكاملة لسنوات الدراسة" },
    { href: "/cost-of-living", label: "تكاليف المعيشة حسب المدينة" },
    { href: "/programmes", label: "كل البرامج مع رسومها ومصادرها" },
  ],
  safetyTitle: "الأمان",
  safety: "تحتل التشيك المرتبة 13 من بين 163 دولة في مؤشر السلام العالمي 2026 الصادر عن معهد الاقتصاد والسلام.",
  safetySource: "مؤشر السلام العالمي 2026",
  payTitle: "إذا دفعتم مقابل مساعدتنا",
  payItems: [
    "تتم كل المدفوعات عبر Stripe بالبطاقة، أو عبر InstaPay للطلاب في مصر. الأسعار باليورو، ويظهر كل سعر قبل الدفع.",
    `تُدفع خدمة الرحلة الكاملة على مرحلتين: ${price("fullPackageStep1", "ar")} عند البدء، و${price("fullPackageStep2", "ar")} فقط بعد قبول ابنكم أو ابنتكم في جامعة. وإذا لم تقبله أي جامعة، فلا تُستحق الدفعة الثانية أبدًا.`,
  ],
  refundTitle: "الاسترداد",
  refund: REFUND_COPY.ar.faq,
  withdraw: "وإذا كنتم مستهلكين داخل الاتحاد الأوروبي، فحق الانسحاب خلال 14 يومًا يسري إضافةً إلى هذه القواعد.",
  termsLink: "اقرأ الشروط كاملة",
  receiptTitle: "الإيصالات والفواتير",
  receipt: `تتم معالجة كل دفعة بالبطاقة عبر Stripe. وإذا احتجتم إيصالًا أو فاتورة باسم معيّن، مثلًا لجهة عملكم، فأخبروا ${FOUNDER_NAME_AR} قبل الدفع.`,
  docsTitle: "مستندات ابنكم أو ابنتكم",
  docs: "المستندات المرسلة لخدمة ما (مثل جواز السفر أو كشوف الدرجات أو كشوف الحساب) تُستخدم لهذه الخدمة فقط، وتُحذف خلال 90 يومًا من انتهائها، أو قبل ذلك إذا طلبتم.",
  contactTitle: `تحدثوا مع ${FOUNDER_NAME_AR} مباشرة`,
  contact: "يسعدنا أن يتواصل أولياء الأمور معنا بأنفسهم، بالعربية أو الإنجليزية.",
  whatsapp: "واتساب",
  email: "البريد الإلكتروني",
  waTopic: "studying in Czechia (I'm a parent)",
};

function Block({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <GlassCard className="mb-6">
      <h2 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
        <Icon className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
        {title}
      </h2>
      <div className="space-y-3 text-sm text-text-secondary leading-relaxed">{children}</div>
    </GlassCard>
  );
}

export default function ParentsClient() {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{t.title}</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">{t.intro}</p>

          <Block icon={UserRound} title={t.whoTitle}>
            <p>{t.who}</p>
          </Block>

          <Block icon={Calculator} title={t.costTitle}>
            <ul className="space-y-2 list-disc ps-5">
              {t.costItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="flex flex-col gap-1.5 pt-1">
              {t.costLinks.map((l) => (
                <Link key={l.href} href={l.href} className="text-brand hover:underline font-medium">
                  {l.label}
                </Link>
              ))}
            </div>
          </Block>

          <Block icon={ShieldCheck} title={t.safetyTitle}>
            <p>
              {t.safety}{" "}
              <a href={GPI_SOURCE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-brand hover:underline whitespace-nowrap">
                {t.safetySource}
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </p>
          </Block>

          <Block icon={Wallet} title={t.payTitle}>
            {t.payItems.map((item) => (
              <p key={item}>{item}</p>
            ))}
            <h3 className="text-sm font-semibold text-text-primary pt-2">{t.refundTitle}</h3>
            <p>{t.refund}</p>
            <p>{t.withdraw}</p>
            <Link href="/terms" className="text-brand hover:underline font-medium">
              {t.termsLink}
            </Link>
          </Block>

          <Block icon={Receipt} title={t.receiptTitle}>
            <p>{t.receipt}</p>
            <h3 className="text-sm font-semibold text-text-primary pt-2">{t.docsTitle}</h3>
            <p>{t.docs}</p>
          </Block>

          <FounderCard whatsapp={false} register="formal" />

          <GlassCard className="text-center">
            <h2 className="text-lg font-semibold text-text-primary mb-1">{t.contactTitle}</h2>
            <p className="text-sm text-text-secondary mb-4">{t.contact}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappWithContext(t.waTopic)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand/90 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {t.whatsapp}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border-subtle text-text-primary font-medium text-sm hover:border-brand/40 transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                {t.email}
              </a>
            </div>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
