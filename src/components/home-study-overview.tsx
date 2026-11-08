"use client";

import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";

// A short orientation to the existing guides, not a second admissions guide.
// No live prices, deadlines or new claims of source verification belong here.
const COPY = {
  en: {
    title: "Study in Czechia: the essentials",
    intro: "Studying in Czechia (the Czech Republic) starts with choosing a programme, its teaching language and a realistic budget. Use these decisions to plan your next step.",
    decisions: [
      {
        title: "Czech or English?",
        body: "Czech-taught study at public universities is generally tuition-free, regardless of nationality. Application and extended-study fees can still apply. English-taught programmes usually charge tuition, and language preparation is a separate cost to consider.",
        links: [
          { href: "/programmes/", label: "Compare English-taught programmes" },
          { href: "/preparatory-year/", label: "Understand the Czech-language route" },
        ],
      },
      {
        title: "What do you need for admission?",
        body: "Each faculty sets its own qualifications, language requirements, entrance exams and deadlines. Your previous qualification may need recognition. Choose a programme first, then check its requirements before preparing documents.",
        links: [
          { href: "/application-guide/", label: "Follow the application steps" },
          { href: "/deadlines/", label: "Check programme deadlines" },
        ],
      },
      {
        title: "What will the whole degree cost?",
        body: "Look beyond annual tuition: budget for housing, living expenses, insurance, applications and document preparation. Scholarship eligibility varies; check the conditions before counting funding towards your budget.",
        links: [
          { href: "/what-it-costs/", label: "Plan your total study budget" },
          { href: "/scholarships/", label: "Check scholarship eligibility" },
        ],
      },
      {
        title: "Applying from Egypt?",
        body: "Plan document legalisation, qualification recognition and the student visa alongside admission. A university offer is not a visa approval. Our Egypt guide puts the steps in order, with a timeline for a September start.",
        links: [
          { href: "/study-in-czechia-from-egypt/#egypt-timeline", label: "See the Egyptian applicant timeline" },
          { href: "/student-visa-egypt/", label: "Prepare for the Cairo embassy process" },
        ],
      },
    ],
    trustTitle: "Student experience, with sources you can check",
    trustBody: "StudyCzechia grew out of a student-led community. The guides combine experience of studying and living in Czechia with links to university and public-authority sources. Always confirm current requirements with the institution making the decision.",
    about: "Who is behind this guide?",
    corrections: "Suggest a correction",
    identity: "We are an independent student guide, separate from the official national programme:",
    official: "Study in Czechia (studyin.cz)",
  },
  ar: {
    title: "الدراسة في التشيك: الأساسيات",
    intro: "تبدأ الدراسة في التشيك، أو جمهورية التشيك، باختيار البرنامج ولغة الدراسة ووضع ميزانية واقعية. تساعدك هذه القرارات على تحديد خطوتك التالية.",
    decisions: [
      {
        title: "بالتشيكية أم بالإنجليزية؟",
        body: "الدراسة بالتشيكية في الجامعات العامة معفاة عمومًا من الرسوم الدراسية، بغض النظر عن الجنسية. قد تُفرض رسوم للتقديم أو تجاوز المدة الدراسية المحددة. أما البرامج بالإنجليزية فعادةً برسوم، ويجب احتساب تكلفة الإعداد اللغوي على حدة.",
        links: [
          { href: "/programmes/", label: "قارن البرامج المتاحة بالإنجليزية" },
          { href: "/preparatory-year/", label: "تعرّف على مسار الدراسة بالتشيكية" },
        ],
      },
      {
        title: "ما المطلوب للقبول؟",
        body: "تحدد كل كلية المؤهلات المطلوبة وشروط اللغة وامتحانات القبول ومواعيد التقديم. وقد تحتاج إلى الاعتراف بمؤهلك السابق. اختر البرنامج أولًا، ثم راجع متطلباته قبل تجهيز المستندات.",
        links: [
          { href: "/application-guide/", label: "اتبع خطوات التقديم" },
          { href: "/deadlines/", label: "راجع مواعيد التقديم للبرامج" },
        ],
      },
      {
        title: "ما تكلفة الدراسة حتى التخرج؟",
        body: "لا تقتصر الميزانية على الرسوم السنوية؛ أضف السكن والمعيشة والتأمين ورسوم التقديم وتجهيز المستندات. تختلف شروط المنح، لذا تحقق من أهليتك قبل الاعتماد عليها في ميزانيتك.",
        links: [
          { href: "/what-it-costs/", label: "خطط لميزانية الدراسة كاملة" },
          { href: "/scholarships/", label: "راجع شروط الأهلية للمنح" },
        ],
      },
      {
        title: "هل تتقدم من مصر؟",
        body: "خطط لتوثيق المستندات والاعتراف بالمؤهلات وتأشيرة الدراسة بالتوازي مع التقديم للجامعة. القبول الجامعي لا يعني الموافقة على التأشيرة. يرتب دليلنا للمصريين هذه الخطوات، مع جدول زمني لبدء الدراسة في سبتمبر.",
        links: [
          { href: "/study-in-czechia-from-egypt/#egypt-timeline", label: "اطلع على الجدول الزمني للمتقدمين من مصر" },
          { href: "/student-visa-egypt/", label: "استعد لإجراءات السفارة في القاهرة" },
        ],
      },
    ],
    trustTitle: "خبرة طلابية ومصادر يمكنك مراجعتها",
    trustBody: "نشأ StudyCzechia من مجتمع يقوده الطلاب. تجمع الأدلة بين خبرة الدراسة والمعيشة في التشيك وروابط إلى مصادر الجامعات والجهات الرسمية. تأكد دائمًا من المتطلبات الحالية لدى الجهة صاحبة القرار.",
    about: "من يقف وراء هذا الدليل؟",
    corrections: "اقترح تصحيحًا",
    identity: "نحن دليل طلابي مستقل ولسنا تابعين للبرنامج الوطني الرسمي:",
    official: "Study in Czechia (studyin.cz)",
  },
};

const linkClass = "text-sm font-semibold text-brand underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

export function HomeStudyOverview() {
  const { locale } = useTranslation();
  const c = COPY[locale];
  return (
    <section aria-labelledby="study-essentials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
      <div className="max-w-3xl mb-8">
        <h2 id="study-essentials" className="text-3xl sm:text-4xl font-semibold text-text-primary mb-3">{c.title}</h2>
        <p className="text-text-secondary leading-relaxed">{c.intro}</p>
      </div>
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
        {c.decisions.map((decision) => (
          <div key={decision.title} className="border-s-2 border-brand/25 ps-5">
            <h3 className="text-lg font-semibold text-text-primary mb-2">{decision.title}</h3>
            <p className="text-sm leading-relaxed text-text-secondary">{decision.body}</p>
            <ul className="mt-3 space-y-2">
              {decision.links.map(({ href, label }) => (
                <li key={href}><Link href={href} className={linkClass}>{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <aside aria-labelledby="student-perspective" className="mt-10 rounded-2xl border border-border-subtle bg-bg-subtle p-5 sm:p-6">
        <h3 id="student-perspective" className="font-semibold text-text-primary mb-2">{c.trustTitle}</h3>
        <p className="max-w-4xl text-sm text-text-secondary leading-relaxed">{c.trustBody}</p>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
          <li><Link href="/about/" className={linkClass}>{c.about}</Link></li>
          <li><Link href="/contact/" className={linkClass}>{c.corrections}</Link></li>
        </ul>
        <p className="mt-4 text-sm text-text-secondary leading-relaxed">
          {c.identity}{" "}<a href="https://www.studyin.cz/" className={linkClass} lang="en" dir="ltr">{c.official}</a>.
        </p>
      </aside>
    </section>
  );
}
