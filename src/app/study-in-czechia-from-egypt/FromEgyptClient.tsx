"use client";

import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, ExternalLink } from "lucide-react";
import { OFFICIAL } from "@/lib/study-costs";
import { DORM_PRICES } from "@/data/dorm-prices";

// A hub for students applying from Egypt. It adds no new facts: every step
// repeats what the linked page already says (and sources) and sends the
// reader there.
type Step = { title: string; body: string; links: { href: string; label: string }[] };

const n = (v: number) => v.toLocaleString("en-US");
const VISA_FEE = n(OFFICIAL.visaFeeCairoEgp.value);
const FUNDS = n(OFFICIAL.proofOfFundsYearCzk.value);
const SUPERLEG = n(OFFICIAL.superlegalisationCairoEgp.value);
const DORM_FROM = n(Math.min(...DORM_PRICES.map((d) => d.double[0])));
const MSMT_NOSTRIFICATION =
  "https://msmt.gov.cz/vzdelavani/uznavani-zahranicniho-a-ceskeho-studia/uznani-zahranicniho-vzdelani-s-vyjimkou-vs";

/** Key figures, each repeated from the page or data file that sources it. */
const FACTS = [
  { key: "free", url: OFFICIAL.czechFree.url },
  { key: "visa", url: OFFICIAL.visaFeeCairoEgp.url },
  { key: "funds", url: OFFICIAL.proofOfFundsYearCzk.url },
  { key: "superleg", url: OFFICIAL.superlegalisationCairoEgp.url },
  { key: "nostrification", url: MSMT_NOSTRIFICATION },
  { key: "dorm", href: "/student-housing" },
] as const;

const en = {
  title: "Study in Czechia from Egypt: the whole path",
  subtitle:
    "Eight steps from your Thanaweya Amma to your first week in Czechia. Each one links to the full guide, built from official university, embassy and ministry pages.",
  steps: [
    {
      title: "Check that you can apply",
      body: "Your Thanaweya Amma certificate has to be legalised first, then recognised in Czechia: by nostrification, or within a university's admission procedure.",
      links: [
        { href: "/thanaweya-amma-czech-university", label: "Thanaweya Amma step by step" },
        { href: "/eligibility", label: "Eligibility check" },
        { href: "/qa/#docs-nostrification", label: "Nostrification questions" },
      ],
    },
    {
      title: "Choose Czech or English",
      body: "A degree taught in Czech at a public university is free, but you need the language first, for example through a Czech preparatory year. Degrees taught in English charge tuition.",
      links: [
        { href: "/preparatory-year", label: "Preparatory year" },
        { href: "/study/cheapest-programmes", label: "Cheapest English programmes" },
      ],
    },
    {
      title: "Pick a programme and a university",
      body: "Compare programmes by field, city and fee. Every fee shows its source.",
      links: [
        { href: "/university-matcher", label: "University matcher" },
        { href: "/programmes", label: "All programmes" },
        { href: "/study/medicine-in-czech-republic", label: "Medicine in English" },
      ],
    },
    {
      title: "Apply before the deadline",
      body: "Most Czech universities close applications at the end of February, and every programme has an entrance exam.",
      links: [
        { href: "/deadlines", label: "Deadline tracker" },
        { href: "/application-guide", label: "Application guide" },
      ],
    },
    {
      title: "Plan the money",
      body: "Tuition, monthly living costs, the money the visa asks you to show, and the scholarships open to you.",
      links: [
        { href: "/what-it-costs", label: "What it costs" },
        { href: "/cost-of-living", label: "Cost of living" },
        { href: "/student-housing", label: "Dorm prices" },
        { href: "/scholarships", label: "Scholarships" },
        { href: "/work-while-studying", label: "Working while studying" },
      ],
    },
    {
      title: "Get the student visa in Cairo",
      body: "Documents, proof of funds, booking the appointment at the Czech Embassy in Cairo by email, the fee and the waiting time.",
      links: [
        { href: "/student-visa-egypt", label: "Student visa from Egypt" },
        { href: "/interview-prep", label: "Embassy interview practice" },
      ],
    },
    {
      title: "Make sure your degree will count in Egypt",
      body: "Check the Supreme Council of Universities' conditions before you choose a university, not after you graduate.",
      links: [{ href: "/recognition/egypt", label: "Recognition in Egypt" }],
    },
    {
      title: "Your first weeks",
      body: "Registering with the foreign police, a bank account, a SIM card, transport and insurance.",
      links: [{ href: "/arrival", label: "Arrival guide" }],
    },
  ] as Step[],
  parents: "Parents: what it costs, how safe it is and how paying for help works.",
  parentsLink: "For parents",
  factsTitle: "Key numbers for Egyptian students",
  facts: {
    free: { label: "Tuition, taught in Czech at a public university", value: "Free" },
    visa: { label: "Student visa fee at the Czech Embassy in Cairo", value: `${VISA_FEE} EGP` },
    funds: { label: "Money to show for one year of study", value: `${FUNDS} CZK` },
    superleg: { label: "Superlegalisation, per document", value: `${SUPERLEG} EGP` },
    nostrification: { label: "Nostrification of Thanaweya Amma", value: "3,000 CZK, 30 days" },
    dorm: { label: "Bed in a university dorm, from", value: `${DORM_FROM} CZK a night` },
  } as Record<(typeof FACTS)[number]["key"], { label: string; value: string }>,
  source: "Source",
  details: "Details",
  faqTitle: "Questions Egyptian students ask",
  faq: [
    {
      q: "Can Egyptians study in Czechia for free?",
      a: "Yes, if the degree is taught in Czech at a public university, for every nationality. Degrees taught in English charge tuition.",
      href: "/what-it-costs",
      label: "What it costs",
    },
    {
      q: "Is the Thanaweya Amma accepted by Czech universities?",
      a: "Yes, once it is legalised in Egypt and at the Czech Embassy in Cairo, then recognised by the faculty or by nostrification at a Czech regional authority.",
      href: "/thanaweya-amma-czech-university",
      label: "Thanaweya Amma guide",
    },
    {
      q: "How much money do I need for the Czech student visa?",
      a: `You must show at least ${FUNDS} CZK for one year, and the visa fee in Cairo is ${VISA_FEE} EGP.`,
      href: "/student-visa-egypt",
      label: "Student visa from Egypt",
    },
    {
      q: "Can I work while I study in Czechia?",
      a: "Full-time students of an accredited university programme have free access to the Czech labour market, with no separate work permit.",
      href: "/work-while-studying",
      label: "Working while studying",
    },
    {
      q: "Will my Czech degree be recognised in Egypt?",
      a: "Egypt's Supreme Council of Universities decides. Check its conditions before you choose a university.",
      href: "/recognition/egypt",
      label: "Recognition in Egypt",
    },
  ],
};

const ar: typeof en = {
  title: "الدراسة في التشيك من مصر: الطريق كامل",
  subtitle:
    "ثماني خطوات من الثانوية العامة حتى أول أسبوع في التشيك. كل خطوة توصلك إلى الدليل الكامل، المبني على صفحات الجامعات والسفارة والوزارات الرسمية.",
  steps: [
    {
      title: "تأكد أنك تقدر تقدم",
      body: "شهادة الثانوية العامة لازم تتوثق الأول، وبعدها تتعادل في التشيك: إما بالنوستريفيكيشن، أو داخل إجراءات القبول في الجامعة.",
      links: [
        { href: "/thanaweya-amma-czech-university", label: "الثانوية العامة خطوة بخطوة" },
        { href: "/eligibility", label: "أقدر أقدم؟" },
        { href: "/qa/#docs-nostrification", label: "أسئلة النوستريفيكيشن" },
      ],
    },
    {
      title: "اختار: تشيكي ولا إنجليزي",
      body: "الدراسة بالتشيكية في جامعة حكومية مجانية، بس لازم تتعلم اللغة الأول، مثلًا في سنة تحضيرية. الدراسة بالإنجليزية بمصاريف.",
      links: [
        { href: "/preparatory-year", label: "السنة التحضيرية" },
        { href: "/study/cheapest-programmes", label: "أرخص البرامج بالإنجليزية" },
      ],
    },
    {
      title: "اختار البرنامج والجامعة",
      body: "قارن البرامج حسب التخصص والمدينة والمصاريف. كل رسوم مكتوب جنبها مصدرها.",
      links: [
        { href: "/university-matcher", label: "اختيار الجامعة" },
        { href: "/programmes", label: "كل البرامج" },
        { href: "/study/medicine-in-czech-republic", label: "الطب بالإنجليزية" },
      ],
    },
    {
      title: "قدم قبل آخر ميعاد",
      body: "أغلب الجامعات التشيكية بتقفل التقديم آخر فبراير، وكل برنامج له امتحان قبول.",
      links: [
        { href: "/deadlines", label: "مواعيد التقديم" },
        { href: "/application-guide", label: "دليل التقديم" },
      ],
    },
    {
      title: "رتب الفلوس",
      body: "المصاريف الدراسية، وتكاليف المعيشة الشهرية، والمبلغ اللي الفيزا بتطلب تثبته، والمنح المتاحة ليك.",
      links: [
        { href: "/what-it-costs", label: "التكاليف الحقيقية" },
        { href: "/cost-of-living", label: "تكاليف المعيشة" },
        { href: "/student-housing", label: "أسعار السكن الجامعي" },
        { href: "/scholarships", label: "المنح" },
        { href: "/work-while-studying", label: "الشغل أثناء الدراسة" },
      ],
    },
    {
      title: "فيزا الدراسة من القاهرة",
      body: "الأوراق، وإثبات المبلغ، وحجز الموعد في السفارة التشيكية بالقاهرة بالإيميل، والرسوم ومدة الانتظار.",
      links: [
        { href: "/student-visa-egypt", label: "تأشيرة الدراسة من مصر" },
        { href: "/interview-prep", label: "تدريب على مقابلة السفارة" },
      ],
    },
    {
      title: "اتأكد إن شهادتك هتتعادل في مصر",
      body: "اعرف شروط المجلس الأعلى للجامعات قبل ما تختار الجامعة، مش بعد التخرج.",
      links: [{ href: "/recognition/egypt", label: "المعادلة في مصر" }],
    },
    {
      title: "أول أسابيع ليك هناك",
      body: "التسجيل في شرطة الأجانب، والحساب البنكي، وشريحة الموبايل، والمواصلات، والتأمين.",
      links: [{ href: "/arrival", label: "دليل الوصول" }],
    },
  ],
  parents: "لأولياء الأمور: التكلفة، والأمان، وطريقة الدفع مقابل المساعدة.",
  parentsLink: "لأولياء الأمور",
  factsTitle: "أرقام مهمة للطلاب المصريين",
  facts: {
    free: { label: "المصاريف للدراسة بالتشيكية في جامعة حكومية", value: "مجانًا" },
    visa: { label: "رسوم فيزا الدراسة في السفارة التشيكية بالقاهرة", value: `${VISA_FEE} جنيه` },
    funds: { label: "المبلغ المطلوب إثباته لسنة دراسية", value: `${FUNDS} كرونة` },
    superleg: { label: "التصديق في السفارة، للمستند الواحد", value: `${SUPERLEG} جنيه` },
    nostrification: { label: "معادلة الثانوية العامة (نوستريفيكيشن)", value: "3,000 كرونة، 30 يوم" },
    dorm: { label: "سرير في السكن الجامعي، يبدأ من", value: `${DORM_FROM} كرونة في الليلة` },
  },
  source: "المصدر",
  details: "التفاصيل",
  faqTitle: "أسئلة الطلاب المصريين",
  faq: [
    {
      q: "هل يقدر المصري يدرس في التشيك مجانًا؟",
      a: "أيوه، لو الدراسة بالتشيكية في جامعة حكومية، وده لكل الجنسيات. الدراسة بالإنجليزية بمصاريف.",
      href: "/what-it-costs",
      label: "التكاليف الحقيقية",
    },
    {
      q: "هل الجامعات التشيكية بتقبل الثانوية العامة المصرية؟",
      a: "أيوه، بعد ما تتوثق في مصر وفي السفارة التشيكية بالقاهرة، وبعدها تتعادل عن طريق الكلية أو بالنوستريفيكيشن في مكتب الإقليم.",
      href: "/thanaweya-amma-czech-university",
      label: "دليل الثانوية العامة",
    },
    {
      q: "محتاج فلوس قد إيه لفيزا الدراسة في التشيك؟",
      a: `لازم تثبت ${FUNDS} كرونة على الأقل لسنة دراسية، ورسوم الفيزا في القاهرة ${VISA_FEE} جنيه.`,
      href: "/student-visa-egypt",
      label: "تأشيرة الدراسة من مصر",
    },
    {
      q: "أقدر أشتغل وأنا بدرس في التشيك؟",
      a: "طلاب الدوام الكامل في برنامج جامعي معتمد ليهم حرية الشغل في التشيك من غير تصريح عمل منفصل.",
      href: "/work-while-studying",
      label: "الشغل أثناء الدراسة",
    },
    {
      q: "هل شهادتي التشيكية هتتعادل في مصر؟",
      a: "المجلس الأعلى للجامعات هو اللي بيقرر. اعرف شروطه قبل ما تختار الجامعة.",
      href: "/recognition/egypt",
      label: "المعادلة في مصر",
    },
  ],
};

export default function FromEgyptClient() {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{t.title}</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">{t.subtitle}</p>
          <GlassCard className="mb-8">
            <h2 className="text-lg font-semibold text-text-primary mb-3">{t.factsTitle}</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              {FACTS.map((f) => (
                <div key={f.key}>
                  <dt className="text-sm text-text-muted">{t.facts[f.key].label}</dt>
                  <dd className="text-base font-semibold text-text-primary">
                    <bdi>{t.facts[f.key].value}</bdi>{" "}
                    {"url" in f ? (
                      <a href={f.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-xs font-medium text-brand hover:underline">
                        {t.source}
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link href={f.href} className="text-xs font-medium text-brand hover:underline">
                        {t.details}
                      </Link>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </GlassCard>

          <ol className="space-y-4 mb-8">
            {t.steps.map((s, i) => (
              <li key={s.title}>
                <GlassCard>
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-bg text-sm font-semibold"
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-text-primary">{s.title}</h2>
                      <p className="text-sm text-text-secondary leading-relaxed mt-1">{s.body}</p>
                      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2">
                        {s.links.map((l) => (
                          <Link
                            key={l.href}
                            href={l.href}
                            className="inline-flex items-center gap-1 text-sm text-brand font-medium hover:underline"
                          >
                            {l.label}
                            <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </li>
            ))}
          </ol>

          <section aria-labelledby="egypt-faq" className="mb-8">
            <h2 id="egypt-faq" className="text-xl font-bold text-text-primary mb-3">{t.faqTitle}</h2>
            <div className="space-y-3">
              {t.faq.map((item) => (
                <GlassCard key={item.q}>
                  <h3 className="text-base font-semibold text-text-primary">{item.q}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mt-1">
                    {item.a}{" "}
                    <Link href={item.href} className="font-medium text-brand hover:underline">
                      {item.label}
                    </Link>
                  </p>
                </GlassCard>
              ))}
            </div>
          </section>
          <p className="text-sm text-text-secondary">
            {t.parents}{" "}
            <Link href="/for-parents" className="text-brand font-medium hover:underline">
              {t.parentsLink}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
