"use client";

import type { ReactNode } from "react";
import Link from "@/components/locale-link";
import { cities, totalRange } from "@/data/costs";
import { ADMISSIONS_INTAKE, MEDICINE_ADMISSIONS, MEDICINE_GUIDE_SOURCES as SRC } from "@/data/medicine-admissions";
import { RECOGNITION_EGYPT_SOURCES as EG } from "@/data/recognition-egypt-sources";
import { feeVerified } from "@/lib/fee-source";
import { feeRange, formatDate, formatMoney, type MedicineRow } from "@/lib/medicine-guide";

const linkClass = "font-medium text-brand hover:underline";
const h2Class = "text-xl font-semibold text-text-primary mt-10 mb-4";
const listClass = "space-y-3 text-sm text-text-secondary leading-relaxed";

/** An inline "(source)" link to an official page, as in the guide's FAQ. */
function Src({ href, ar }: { href: string; ar: boolean }) {
  return (
    <>
      {" "}
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {ar ? "(المصدر)" : "(source)"}
      </a>
    </>
  );
}

function RouteCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-4">
      <h3 className="text-base font-semibold text-text-primary mb-2">{title}</h3>
      <ul className="space-y-2 text-sm text-text-secondary leading-relaxed list-disc ps-5">{children}</ul>
    </div>
  );
}

/**
 * Admission, timeline, cost and recognition sections of the medicine guide.
 * Fees come from src/data/programmes.ts, admission rounds from
 * src/data/medicine-admissions.ts, and every other fact links its official page.
 */
export function MedicineDetails({ locale, rows }: { locale: "en" | "ar"; rows: MedicineRow[] }) {
  const ar = locale === "ar";
  const eur = (n: number) => formatMoney(n, "EUR", locale);
  const czk = (n: number) => formatMoney(n, "CZK", locale);
  const medicine = feeRange(rows, "General Medicine");
  const dentistry = feeRange(rows, "Dentistry");
  const verified = rows.filter((r) => feeVerified(r.programme)).length;
  const checked = formatDate(MEDICINE_ADMISSIONS[0].checkedOn, locale);
  const where = (id: string) => rows.find((r) => r.programme.id === id)?.where[locale] ?? id;

  return (
    <>
      {/* 1. The two routes */}
      <h2 id="medicine-routes" className={h2Class}>
        {ar ? "الإنجليزي برسوم أم التشيكي مجانًا؟" : "English with fees, or Czech for free?"}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <RouteCard title={ar ? "بالإنجليزية: برسوم دراسية" : "In English: with tuition fees"}>
          {medicine && (
            <li>
              {ar ? (
                <>
                  الطب العام من <span dir="ltr">{eur(medicine.min)}</span> إلى <span dir="ltr">{eur(medicine.max)}</span> في السنة.
                  تحققنا من {verified} من أصل {rows.length} رسوم في الجدول أعلاه.
                </>
              ) : (
                <>
                  General Medicine costs {eur(medicine.min)} to {eur(medicine.max)} a year. {verified} of the {rows.length} fees in
                  the table above are verified.
                </>
              )}
            </li>
          )}
          <li>
            {ar
              ? "امتحان قبول تكتبه كل كلية في المواد العلمية المذكورة في الجدول."
              : "Each faculty sets a written entrance exam in the sciences listed in the table."}
          </li>
          <li>{ar ? "تبدأ البرنامج مباشرة، ومدته مذكورة في الجدول." : "You start the degree straight away; the table shows how long it takes."}</li>
        </RouteCard>
        <RouteCard title={ar ? "بالتشيكية: بدون رسوم دراسية" : "In Czech: tuition-free"}>
          <li>
            {ar
              ? "مجانية في الجامعات الحكومية لكل الجنسيات."
              : "Free at public universities, for every nationality."}
            <Src href={SRC.czechFree} ar={ar} />
          </li>
          <li>
            {ar
              ? "كثير من البرامج بالتشيكية تطلب مستوى B2 على الأقل في اللغة التشيكية، والجامعة تتحقق من لغتك عند التقديم."
              : "Many Czech-taught programmes need at least B2 Czech, and the university checks your Czech when you apply."}
            <Src href={SRC.czechFree} ar={ar} />
          </li>
          <li>
            {ar ? (
              <>
                كثير من الطلاب الدوليين يصلون إلى B2 خلال سنة من برنامج تحضيري مكثف
                <Src href={SRC.czechFree} ar={ar} />. التفاصيل في{" "}
                <Link href="/preparatory-year/" className={linkClass}>دليل السنة التحضيرية</Link>.
              </>
            ) : (
              <>
                Many international students reach B2 within one year of an intensive preparatory programme
                <Src href={SRC.czechFree} ar={ar} />. See the{" "}
                <Link href="/preparatory-year/" className={linkClass}>preparatory year guide</Link>.
              </>
            )}
          </li>
        </RouteCard>
      </div>

      {/* 2. Admission requirements */}
      <h2 id="medicine-admission" className={h2Class}>
        {ar ? "شروط القبول" : "Admission requirements"}
      </h2>
      <p className="text-sm text-text-secondary leading-relaxed mb-3">
        {ar ? (
          <>
            كل كلية تدير القبول بنفسها. كلية الطب في بلزن مثلًا تحدد أربعة شروط: التقديم إلكترونيًا قبل الموعد النهائي، واجتياز
            امتحان القبول، وإثبات إتمام التعليم الثانوي، ودفع الرسوم الدراسية
            <Src href={SRC.plzenAdmission} ar={ar} />. باقي الكليات تطلب أشياء من النوع نفسه، والتفاصيل في صفحة كل كلية أدناه.
          </>
        ) : (
          <>
            Each faculty runs its own admission. The Faculty of Medicine in Pilsen, for example, lists four requirements: apply
            online before the deadline, pass the entrance exam, prove you completed secondary school, and pay the tuition fee
            <Src href={SRC.plzenAdmission} ar={ar} />. The other faculties ask for the same kinds of things; each one&apos;s page is
            linked below.
          </>
        )}
      </p>
      <ul className={`${listClass} list-disc ps-5`}>
        <li>
          {ar ? (
            <>
              يمكنك دخول امتحان القبول مرة واحدة فقط في كل سنة قبول في ماساريك
              <Src href={SRC.muniAdmission} ar={ar} /> وهراديتس كرالوفي
              <Src href={SRC.hkAdmission} ar={ar} /> وأولوموتس
              <Src href={SRC.upolAdmission} ar={ar} />.
            </>
          ) : (
            <>
              You can sit the entrance exam only once per admission year at Masaryk
              <Src href={SRC.muniAdmission} ar={ar} />, Hradec Králové
              <Src href={SRC.hkAdmission} ar={ar} /> and Olomouc
              <Src href={SRC.upolAdmission} ar={ar} />.
            </>
          )}
        </li>
        <li>
          {ar ? (
            <>
              يجب أن تكون شهادة الثانوية مصدّقة، وفي مصر يعني ذلك التصديق المزدوج:{" "}
              <Link href="/recognition/egypt/" className={linkClass}>التصديق خطوة بخطوة</Link>. كلية بلزن لا ترسل خطاب القبول
              الرسمي إلا بعد استلام أوراق الثانوية مصدّقة بالكامل
              <Src href={SRC.plzenAdmission} ar={ar} />، وماساريك تشترط معادلة التعليم الثانوي في التشيك قبل التسجيل برسوم{" "}
              {czk(990)}
              <Src href={SRC.muniAdmission} ar={ar} />.
            </>
          ) : (
            <>
              Your secondary school certificate must be legalised; from Egypt, that means superlegalisation:{" "}
              <Link href="/recognition/egypt/" className={linkClass}>legalisation step by step</Link>. Pilsen sends the official
              acceptance letter only once it has your fully legalised secondary school documents
              <Src href={SRC.plzenAdmission} ar={ar} />, and Masaryk requires your secondary education to be recognised in
              Czechia before enrolment, for a {czk(990)} fee
              <Src href={SRC.muniAdmission} ar={ar} />.
            </>
          )}
        </li>
        <li>
          {ar ? (
            <>
              الكليات تتعامل مع ممثلين ووكلاء رسميين ينظمون الامتحان في الخارج، وخدماتهم بمقابل. ولست مضطرًا لهم: يمكنك التقديم
              في بلزن بنفسك
              <Src href={SRC.plzenAdmission} ar={ar} />، ومواعيد امتحان أولوموتس أونلاين مفتوحة للمتقدمين المستقلين
              <Src href={SRC.upolAdmission} ar={ar} />.
            </>
          ) : (
            <>
              Faculties work with official representatives and agencies that run exams abroad, and their services are charged.
              You don&apos;t need one: you can apply to Pilsen yourself
              <Src href={SRC.plzenAdmission} ar={ar} />, and Olomouc&apos;s online exam dates are open to independent applicants
              <Src href={SRC.upolAdmission} ar={ar} />.
            </>
          )}
        </li>
      </ul>

      {/* 3. Timeline */}
      <h2 id="medicine-timeline" className={h2Class}>
        {ar ? `الجدول الزمني من مصر لدفعة ${ADMISSIONS_INTAKE}` : `Timeline from Egypt for the ${ADMISSIONS_INTAKE} intake`}
      </h2>
      <ol className={`${listClass} list-decimal ps-5`}>
        <li>
          {ar ? (
            <>
              ابدأ تصديق أوراق الثانوية الآن. كلية بلزن تنصح بالبدء في أسرع وقت حتى تلحق موعدها النهائي
              <Src href={SRC.plzenAdmission} ar={ar} />. الخطوات في{" "}
              <Link href="/recognition/egypt/" className={linkClass}>دليل المعادلة والتصديق</Link>.
            </>
          ) : (
            <>
              Start legalising your secondary school documents now. Pilsen recommends starting as soon as possible so you meet
              its deadline
              <Src href={SRC.plzenAdmission} ar={ar} />. The steps are in our{" "}
              <Link href="/recognition/egypt/" className={linkClass}>recognition and legalisation guide</Link>.
            </>
          )}
        </li>
        <li>
          {ar
            ? "قدّم في فترة التقديم الخاصة بكليتك وادفع رسوم الطلب (القائمة أدناه)."
            : "Apply within your faculty's window and pay the application fee (list below)."}
        </li>
        <li>
          {ar ? (
            <>
              ادخل الامتحان. أولوموتس تنصح المتقدمين من خارج الاتحاد الأوروبي باختيار موعد لا يتأخر عن مايو، لأن تصريح الإقامة
              التشيكي قد يستغرق حتى ثلاثة أشهر
              <Src href={SRC.upolAdmission} ar={ar} />.
            </>
          ) : (
            <>
              Sit the exam. Olomouc advises non-EU applicants to choose an exam date no later than May, because arranging a
              Czech residence permit can take up to three months
              <Src href={SRC.upolAdmission} ar={ar} />.
            </>
          )}
        </li>
        <li>
          {ar ? (
            <>
              بعد القبول، قدّم على تأشيرة الدراسة في السفارة التشيكية بالقاهرة. قرار وزارة الداخلية قد يستغرق حتى 60 يومًا
              <Src href={EG.embassyStudyVisa} ar={ar} />. التفاصيل في{" "}
              <Link href="/student-visa-egypt/" className={linkClass}>دليل التأشيرة من مصر</Link>.
            </>
          ) : (
            <>
              Once accepted, apply for the student visa at the Czech Embassy in Cairo. The Ministry of the Interior&apos;s decision
              can take up to 60 days
              <Src href={EG.embassyStudyVisa} ar={ar} />. See our{" "}
              <Link href="/student-visa-egypt/" className={linkClass}>student visa guide for Egypt</Link>.
            </>
          )}
        </li>
        <li>
          {ar ? (
            <>
              التسجيل في سبتمبر: في ماساريك يكون التسجيل لسنة {ADMISSIONS_INTAKE} في سبتمبر 2027، في الأسبوع السابق لبداية
              الفصل الدراسي الأول
              <Src href={SRC.muniAdmission} ar={ar} />.
            </>
          ) : (
            <>
              Enrol in September: at Masaryk, enrolment for {ADMISSIONS_INTAKE} is in September 2027, the week before the autumn
              semester begins
              <Src href={SRC.muniAdmission} ar={ar} />.
            </>
          )}
        </li>
      </ol>

      <h3 className="text-base font-semibold text-text-primary mt-6 mb-1">
        {ar ? `فترات التقديم لسنة ${ADMISSIONS_INTAKE}` : `Application windows for ${ADMISSIONS_INTAKE}`}
      </h3>
      <p className="text-xs text-text-muted mb-3">
        {ar
          ? `كما تنشرها كل كلية، وراجعناها على صفحاتها بتاريخ ${checked}.`
          : `As each faculty publishes them, checked on their pages on ${checked}.`}
      </p>
      <ul className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-surface text-sm">
        {MEDICINE_ADMISSIONS.map((round) => (
          <li key={round.sourceUrl} className="px-4 py-3">
            <a href={round.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-text-primary hover:text-brand">
              {where(round.programmeIds[0])}
              <span className="sr-only">{ar ? " (صفحة الكلية، تفتح في نافذة جديدة)" : " (faculty page, opens in a new tab)"}</span>
            </a>
            <p className="text-text-secondary mt-1">
              {round.applyUntil ? (
                round.applyFrom ? (
                  ar ? `من ${formatDate(round.applyFrom, locale)} إلى ${formatDate(round.applyUntil, locale)}` : `${formatDate(round.applyFrom, locale)} to ${formatDate(round.applyUntil, locale)}`
                ) : (
                  ar ? `حتى ${formatDate(round.applyUntil, locale)}` : `Until ${formatDate(round.applyUntil, locale)}`
                )
              ) : (
                <span className="text-text-muted">{ar ? "لم تُنشر المواعيد بعد" : "Not published yet"}</span>
              )}
              {round.applicationFee && (
                <>
                  {ar ? " · رسوم الطلب " : " · application fee "}
                  {round.applicationFee.currency === "EUR" ? (
                    <span dir="ltr">{formatMoney(round.applicationFee.amount, "EUR", locale)}</span>
                  ) : (
                    formatMoney(round.applicationFee.amount, round.applicationFee.currency, locale)
                  )}
                </>
              )}
            </p>
            {round.note && <p className="text-xs text-text-muted mt-1">{round.note[locale]}</p>}
          </li>
        ))}
      </ul>

      {/* 4. Cost over the whole degree */}
      <h2 id="medicine-total-cost" className={h2Class}>
        {ar ? "التكلفة الواقعية لكل سنوات الدراسة" : "A realistic cost for the whole degree"}
      </h2>
      <ul className={`${listClass} list-disc ps-5`}>
        {medicine && (
          <li>
            {ar ? (
              <>
                <strong className="text-text-primary">الرسوم الدراسية:</strong> الطب العام من <span dir="ltr">{eur(medicine.min)}</span> إلى{" "}
                <span dir="ltr">{eur(medicine.max)}</span> في السنة، أي من <span dir="ltr">{eur(medicine.min * medicine.years)}</span> إلى{" "}
                <span dir="ltr">{eur(medicine.max * medicine.years)}</span> على مدى {medicine.years} سنوات إذا بقيت الرسوم كما هي
                {dentistry && (
                  <>
                    ، وطب الأسنان من <span dir="ltr">{eur(dentistry.min * dentistry.years)}</span> إلى{" "}
                    <span dir="ltr">{eur(dentistry.max * dentistry.years)}</span> على مدى {dentistry.years} سنوات
                  </>
                )}
                . تحققنا من {verified} من أصل {rows.length} رسوم، والجدول يوضح حالة كل رسم.
              </>
            ) : (
              <>
                <strong className="text-text-primary">Tuition:</strong> General Medicine is {eur(medicine.min)} to {eur(medicine.max)} a
                year, so {eur(medicine.min * medicine.years)} to {eur(medicine.max * medicine.years)} over {medicine.years} years if fees
                stay the same
                {dentistry && (
                  <>
                    ; Dentistry is {eur(dentistry.min * dentistry.years)} to {eur(dentistry.max * dentistry.years)} over{" "}
                    {dentistry.years} years
                  </>
                )}
                . {verified} of the {rows.length} fees are verified; the table shows each one&apos;s status.
              </>
            )}
          </li>
        )}
        <li>
          {ar ? (
            <>
              <strong className="text-text-primary">المعيشة في الشهر:</strong>{" "}
              {cities.map((c, i) => {
                const [min, max] = totalRange(c.key);
                return (
                  <span key={c.key}>
                    {i > 0 && "، "}
                    {c.label.ar} من {czk(min)} إلى {czk(max)}
                  </span>
                );
              })}
              ، تشمل غرفة مشتركة في السكن الجامعي والأكل والمواصلات والتأمين الصحي والموبايل ومصاريف صغيرة. هذه متوسطات يذكرها
              الطلاب وليست إحصاءات رسمية، ولا تشمل بلزن وهراديتس كرالوفي وأولوموتس. احسب ميزانيتك في{" "}
              <Link href="/cost-of-living/" className={linkClass}>حاسبة تكلفة المعيشة</Link>.
            </>
          ) : (
            <>
              <strong className="text-text-primary">Living costs a month:</strong>{" "}
              {cities.map((c, i) => {
                const [min, max] = totalRange(c.key);
                return (
                  <span key={c.key}>
                    {i > 0 && ", "}
                    {c.label.en} {czk(min)} to {czk(max)}
                  </span>
                );
              })}
              , for a shared dorm room, food, transport, health insurance, phone and small costs. These are community-reported
              averages, not official statistics, and they don&apos;t cover Pilsen, Hradec Králové or Olomouc. Work out your own
              budget with the <Link href="/cost-of-living/" className={linkClass}>cost of living calculator</Link>.
            </>
          )}
        </li>
        <li>
          {ar ? (
            <>
              <strong className="text-text-primary">قبل السفر:</strong> رسوم الطلب (القائمة أعلاه)، ورسوم التصديق والتأشيرة (في{" "}
              <Link href="/student-visa-egypt/" className={linkClass}>دليل التأشيرة</Link>). وللتأشيرة يجب أن تُثبت{" "}
              {czk(115810)} على الأقل عن سنة دراسية واحدة، وهذا مبلغ تمتلكه وليس رسومًا
              <Src href={SRC.fundsInterior} ar={ar} />.
            </>
          ) : (
            <>
              <strong className="text-text-primary">Before you arrive:</strong> the application fee (list above), and the legalisation
              and visa fees (see the <Link href="/student-visa-egypt/" className={linkClass}>visa guide</Link>). For the visa you
              must also show at least {czk(115810)} for one academic year; that is money you hold, not a fee
              <Src href={SRC.fundsInterior} ar={ar} />.
            </>
          )}
        </li>
      </ul>
      <p className="text-xs text-text-muted mt-3">
        {ar
          ? "الرسوم الدراسية باليورو ومصاريف المعيشة هنا بالكرونة التشيكية. لا نحوّلها لأن سعر الصرف يتغير."
          : "Tuition is set in euros and living costs here are in Czech crowns. We don't convert them because the exchange rate changes."}
      </p>

      {/* 5. Recognition and licensing in Egypt */}
      <h2 id="medicine-egypt-recognition" className={h2Class}>
        {ar ? "المعادلة والترخيص في مصر" : "Recognition and licensing in Egypt"}
      </h2>
      <ul className={`${listClass} list-disc ps-5`}>
        <li>
          {ar
            ? "في مصر، المجلس الأعلى للجامعات هو الجهة الوحيدة التي تعادل الشهادة الأجنبية، حالة بحالة بعد التخرج. لا أحد يستطيع أن يضمن النتيجة مسبقًا."
            : "In Egypt, only the Supreme Council of Universities (SCU) can make a foreign degree equivalent, case by case after you graduate. Nobody can promise the result in advance."}
          <Src href={EG.scuFaq} ar={ar} />
        </li>
        <li>
          {ar
            ? "يشترط المجلس أن تكون الجامعة معترفًا بها من وزارة التعليم في بلدها: ابحث عنها في سجل الجامعات لدى وزارة التعليم التشيكية."
            : "The SCU requires the university to be recognised by its own country's education ministry: look it up in the Czech Ministry of Education's register of universities."}
          <Src href={EG.czRegister} ar={ar} />
        </li>
        <li>
          {ar
            ? "الطب تخصص عملي، فيشترط المجلس الدراسة بانتظام كامل (Full Time)."
            : "Medicine is a practical subject, so the SCU requires full-time study."}
          <Src href={EG.scuFaq} ar={ar} />
        </li>
        <li>
          {ar
            ? "المعادلة تخص الشهادة نفسها. أما العمل طبيبًا أو طبيب أسنان في مصر فيحتاج أيضًا إلى ترخيص له قواعده الخاصة لدى الجهات الصحية المصرية. راجع شروطها الحالية قبل أن تختار البرنامج."
            : "Equivalency is about the degree. Working as a doctor or dentist in Egypt also needs a licence, with its own rules set by the Egyptian health authorities. Check their current requirements before you choose a programme."}
        </li>
      </ul>
      <p className="text-sm text-text-secondary mt-3">
        {ar ? (
          <>
            كل الخطوات والمستندات والرسوم في{" "}
            <Link href="/recognition/egypt/" className={linkClass}>دليل معادلة الشهادة التشيكية في مصر</Link>.
          </>
        ) : (
          <>
            Every step, document and fee is in our{" "}
            <Link href="/recognition/egypt/" className={linkClass}>guide to recognition in Egypt</Link>.
          </>
        )}
      </p>
    </>
  );
}
