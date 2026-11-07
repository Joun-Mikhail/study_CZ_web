"use client";

import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight } from "lucide-react";

// A hub for students applying from Egypt. It adds no new facts: every step
// repeats what the linked page already says (and sources) and sends the
// reader there.
type Step = { title: string; body: string; links: { href: string; label: string }[] };

const en = {
  title: "Studying in Czechia from Egypt: the whole path",
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
        { href: "/scholarships", label: "Scholarships" },
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
        { href: "/scholarships", label: "المنح" },
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
