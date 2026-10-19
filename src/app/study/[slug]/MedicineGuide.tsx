"use client";

import { useMemo } from "react";
import { ArrowRight, Clock, FileText, MapPin } from "lucide-react";
import Link from "@/components/locale-link";
import { ContextualCTA } from "@/components/contextual-cta";
import { CITY_AR } from "@/i18n/ar-metadata";
import { examSubjects, feeRange, medicineRows } from "@/lib/medicine-guide";
import { fieldToSlug } from "@/lib/seo-utils";

/** Western digits; the euro sign goes after the number in Arabic, as elsewhere on the site. */
/** Official Study in Czechia page: Czech-taught degrees at public universities are free for all nationalities. */
const CZECH_FREE_SOURCE = "https://studyin.gov.cz/plan-your-studies/learn-czech-study-tuition-free/";
const qClass = "text-base font-semibold text-text-primary mb-1";

const eur = (n: number, locale: "en" | "ar" = "en") =>
  locale === "ar" ? `${n.toLocaleString("en-US")}€` : `€${n.toLocaleString("en-US")}`;

/**
 * Extra guide content on /study/medicine-in-czech-republic/. Every number is
 * computed from src/data/programmes.ts, so it follows the verified fees.
 */
export function MedicineGuide({ locale }: { locale: "en" | "ar" }) {
  const ar = locale === "ar";
  const rows = useMemo(() => medicineRows(), []);
  const medicine = feeRange(rows, "General Medicine");
  const dentistry = feeRange(rows, "Dentistry");
  const exams = examSubjects(rows);
  const mathsOption = rows.some((r) => r.programme.entranceExamDetails?.en.toLowerCase().includes("mathematics"));
  const lastVerified = rows.map((r) => r.programme.verification.lastVerified).sort()[0];

  const linkClass = "font-medium text-brand hover:underline";

  return (
    <section aria-labelledby="medicine-numbers" className="mb-10">
      <h2 id="medicine-numbers" className="text-xl font-semibold text-text-primary mb-2">
        {ar ? "الطب وطب الأسنان بالإنجليزية: الأرقام" : "Medicine and dentistry in English: the numbers"}
      </h2>
      <p className="text-sm text-text-secondary mb-4">
        {ar ? (
          <>
            رسوم السنة الأولى كما تنشرها كل كلية، من الأرخص للأغلى. تم التحقق من كل رسم في{" "}
            <span dir="ltr">{lastVerified}</span> أو بعده. اضغط على أي برنامج لترى المصدر.
          </>
        ) : (
          `First-year tuition as each faculty publishes it, cheapest first. Each fee was checked on ${lastVerified} or later. Tap a programme to see its source.`
        )}
      </p>

      <ul className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-surface">
        {rows.map(({ programme: p, where, city }) => (
          <li key={p.id}>
            <Link href={`/programmes/${p.id}`} className="flex items-start justify-between gap-3 p-4 hover:bg-brand/[0.04] transition-colors">
              <div className="min-w-0">
                <p className="font-semibold text-text-primary">{p.name[locale] || p.name.en}</p>
                <p className="text-xs text-text-secondary mt-0.5">{ar ? where.ar : where.en}</p>
                <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted mt-1.5">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    {ar ? CITY_AR[city] ?? city : city}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {p.durationYears} {ar ? "سنوات" : "years"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FileText className="w-3 h-3" aria-hidden="true" />
                    {p.entranceExamDetails
                      ? p.entranceExamDetails[locale] ?? p.entranceExamDetails.en
                      : ar
                      ? "امتحان قبول، لم تُنشر مواده بعد"
                      : "Entrance exam, subjects not published yet"}
                  </span>
                </p>
              </div>
              <p className="shrink-0 text-end">
                <span className="block font-bold text-text-primary" dir="ltr">{eur(p.tuitionEurPerYear, locale)}</span>
                <span className="block text-[11px] text-text-muted">{ar ? "في السنة" : "per year"}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold text-text-primary mt-10 mb-4">
        {ar ? "أسئلة شائعة عن دراسة الطب في التشيك" : "Common questions about studying medicine in Czechia"}
      </h2>
      <ul className="space-y-6 text-sm text-text-secondary leading-relaxed">
        {medicine && (
          <li>
            <h3 className={qClass}>{ar ? "كم تكلفة دراسة الطب في التشيك؟" : "How much does it cost to study medicine in Czechia?"}</h3>
            {ar ? (
              <>
                رسوم الطب العام بين <span dir="ltr">{eur(medicine.min, "ar")}</span> و<span dir="ltr">{eur(medicine.max, "ar")}</span> في
                السنة، أي حوالي <span dir="ltr">{eur(medicine.min * medicine.years, "ar")}</span> إلى{" "}
                <span dir="ltr">{eur(medicine.max * medicine.years, "ar")}</span> على مدى {medicine.years} سنوات إذا بقيت الرسوم كما هي.
                {dentistry && (
                  <>
                    {" "}وطب الأسنان بين <span dir="ltr">{eur(dentistry.min, "ar")}</span> و<span dir="ltr">{eur(dentistry.max, "ar")}</span> في
                    السنة لمدة {dentistry.years} سنوات.
                  </>
                )}{" "}
                تحدد الكليات رسومها كل سنة، ومصاريف المعيشة تُضاف فوقها:{" "}
                <Link href="/cost-of-living" className={linkClass}>حاسبة تكلفة المعيشة</Link>.
              </>
            ) : (
              <>
                General Medicine costs {eur(medicine.min)} to {eur(medicine.max)} a year in tuition, so about{" "}
                {eur(medicine.min * medicine.years)} to {eur(medicine.max * medicine.years)} over {medicine.years} years if
                fees stay the same.
                {dentistry && (
                  <>
                    {" "}Dentistry is {eur(dentistry.min)} to {eur(dentistry.max)} a year for {dentistry.years} years.
                  </>
                )}{" "}
                Faculties set their fees every year, and living costs come on top:{" "}
                <Link href="/cost-of-living" className={linkClass}>cost of living calculator</Link>.
              </>
            )}
          </li>
        )}
        {medicine && (
          <li>
            <h3 className={qClass}>{ar ? "كم سنة مدة دراسة الطب في التشيك؟" : "How many years does it take?"}</h3>
            {ar ? (
              <>
                الطب العام {medicine.years} سنوات{dentistry ? `، وطب الأسنان ${dentistry.years} سنوات` : ""}. البرامج في الجدول أعلاه كلها
                بالإنجليزية من أول سنة لآخر سنة.
              </>
            ) : (
              <>
                General Medicine takes {medicine.years} years{dentistry ? ` and Dentistry ${dentistry.years}` : ""}. Every programme in the table
                above is taught in English from the first year to the last.
              </>
            )}
          </li>
        )}
        <li>
          <h3 className={qClass}>{ar ? "هل يمكن دراسة الطب في التشيك مجانًا؟" : "Can I study medicine in Czechia for free?"}</h3>
          {ar ? (
            <>
              نعم، إذا درست بالتشيكية: البرامج التي تُدرَّس بالتشيكية في الجامعات الحكومية مجانية لكل الجنسيات{" "}
              <a href={CZECH_FREE_SOURCE} target="_blank" rel="noopener noreferrer" className={linkClass}>(المصدر)</a>. تقدّم على امتحان
              القبول بالتشيكية، والسنة التحضيرية تُعلّمك اللغة ومواد الامتحان:{" "}
              <Link href="/preparatory-year" className={linkClass}>دليل السنة التحضيرية</Link>.
            </>
          ) : (
            <>
              Yes, if you study in Czech: degree programmes taught in Czech at public universities are free of charge for every
              nationality{" "}
              <a href={CZECH_FREE_SOURCE} target="_blank" rel="noopener noreferrer" className={linkClass}>(source)</a>. You take the
              faculty&apos;s admission in Czech, and a preparatory year teaches the language and the exam subjects:{" "}
              <Link href="/preparatory-year" className={linkClass}>preparatory year guide</Link>.
            </>
          )}
        </li>
        {exams.withSubjects > 0 && (
          <li>
            <h3 className={qClass}>{ar ? "هل يوجد امتحان قبول لدراسة الطب في التشيك؟" : "Is there an entrance exam?"}</h3>
            {ar ? (
              <>
                كل كلية تضع امتحانها الخاص. من {exams.withSubjects} برامج نُشرت مواد امتحانها، {exams.biology} تختبر الأحياء و
                {exams.chemistry} تختبر الكيمياء و{exams.physics} تختبر الفيزياء
                {mathsOption ? "، وبعضها يسمح بالرياضيات بدل الفيزياء" : ""}. إذا درست هذه المواد بالعربية، اقرأ{" "}
                <Link href="/preparatory-year" className={linkClass}>دليل السنة التحضيرية</Link>.
              </>
            ) : (
              <>
                Each faculty sets its own exam. Of the {exams.withSubjects} programmes that publish their subjects,{" "}
                {exams.biology} test biology, {exams.chemistry} test chemistry and {exams.physics} test physics
                {mathsOption ? ", and some let you take mathematics instead of physics" : ""}. If you studied these
                subjects in Arabic, see the <Link href="/preparatory-year" className={linkClass}>preparatory year guide</Link>.
              </>
            )}
          </li>
        )}
        <li>
          <h3 className={qClass}>{ar ? "متى آخر موعد للتقديم؟" : "When are the application deadlines?"}</h3>
          {ar ? (
            <>
              مواعيد التقديم والامتحانات تختلف من كلية لأخرى.{" "}
              <Link href="/deadlines" className={linkClass}>متتبع المواعيد</Link> يعرض كل موعد بمجرد أن تنشره الكلية.
            </>
          ) : (
            <>
              Application and exam dates differ by faculty. The <Link href="/deadlines" className={linkClass}>deadline tracker</Link>{" "}
              shows each one as soon as the faculty publishes it.
            </>
          )}
        </li>
        <li>
          <h3 className={qClass}>{ar ? "هل تُعادَل شهادة الطب التشيكية في بلدي؟" : "Will my medical degree be recognised at home?"}</h3>
          {ar ? (
            <>
              قبل التقديم، تأكد كيف تعادل بلدك شهادة الطب الأجنبية وما المطلوب لتمارس المهنة هناك:{" "}
              <Link href="/recognition/egypt" className={linkClass}>مصر</Link> ·{" "}
              <Link href="/recognition/jordan" className={linkClass}>الأردن</Link> ·{" "}
              <Link href="/recognition/saudi-arabia" className={linkClass}>السعودية</Link>.
            </>
          ) : (
            <>
              Before you apply, check how your country recognises a foreign medical degree and what you need to practise
              there: <Link href="/recognition/egypt" className={linkClass}>Egypt</Link> ·{" "}
              <Link href="/recognition/jordan" className={linkClass}>Jordan</Link> ·{" "}
              <Link href="/recognition/saudi-arabia" className={linkClass}>Saudi Arabia</Link>.
            </>
          )}
        </li>
      </ul>

      <p className="mt-6 text-sm text-text-secondary">
        {ar ? "تخصصات قريبة: " : "Related fields: "}
        <Link href="/programmes/cuni-faf-pharmacy" className={`${linkClass} inline-flex items-center gap-1`}>
          {ar ? "الصيدلة" : "Pharmacy"}
          <ArrowRight className="w-3 h-3 rtl:rotate-180" aria-hidden="true" />
        </Link>{" "}
        ·{" "}
        <Link href={`/study/${fieldToSlug("Veterinary Medicine")}`} className={`${linkClass} inline-flex items-center gap-1`}>
          {ar ? "الطب البيطري" : "Veterinary Medicine"}
          <ArrowRight className="w-3 h-3 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </p>

      <ContextualCTA service="consultation" />
    </section>
  );
}
