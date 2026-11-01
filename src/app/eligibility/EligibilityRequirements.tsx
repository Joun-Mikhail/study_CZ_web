"use client";

import type { ReactNode } from "react";
import Link from "@/components/locale-link";
import { RECOGNITION_EGYPT_SOURCES as EG } from "@/data/recognition-egypt-sources";

/** Official pages behind every statement in this section, checked on CHECKED_ON. */
export const REQUIREMENT_SOURCES = {
  howToApply: "https://studyin.gov.cz/plan-your-studies/how-to-apply/",
  czechFree: "https://studyin.gov.cz/plan-your-studies/learn-czech-study-tuition-free/",
  cuniApply: "https://admission.cuni.cz/ADM-18.html",
  muniVerify: "https://www.muni.cz/en/admissions/bachelors-and-masters-studies/verification-of-the-condition-for-admission",
  embassyLegalisation: EG.embassyLegalisation,
} as const;

const CHECKED_ON = { en: "27 October 2026", ar: "27 أكتوبر 2026" };

const linkClass = "font-medium text-brand hover:underline";
const h3Class = "text-base font-semibold text-text-primary mt-8 mb-3";
const listClass = "space-y-2 text-sm text-text-secondary leading-relaxed list-disc ps-5";

/** An inline "(source)" link to an official page. */
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

function Go({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

/**
 * What Czech universities usually ask of applicants, shown under the quiz.
 * General rules only: no grade or test-score thresholds, since those differ per
 * programme. Every point links the official page it comes from.
 */
export function EligibilityRequirements({ locale }: { locale: "en" | "ar" }) {
  const ar = locale === "ar";
  const S = REQUIREMENT_SOURCES;

  return (
    <section aria-labelledby="eligibility-requirements" className="max-w-2xl mx-auto mt-16">
      <h2 id="eligibility-requirements" className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
        {ar ? "شروط القبول في الجامعات التشيكية" : "Admission requirements at Czech universities"}
      </h2>
      <p className="text-sm text-text-secondary leading-relaxed mb-3">
        {ar
          ? "كل جامعة ليها شروطها، بس أغلب برامج البكالوريوس والماجستير الطويل (زي الطب) بتطلب نفس الأربع حاجات"
          : "Each university sets its own rules, but most bachelor's and long master's programmes (such as medicine) ask for the same four things"}
        <Src href={S.howToApply} ar={ar} />:
      </p>
      <ol className="space-y-2 text-sm text-text-secondary leading-relaxed list-decimal ps-5 marker:text-text-muted">
        <li>
          {ar
            ? "شهادة ثانوية تسمحلك تدخل الجامعة في بلدك."
            : "A secondary-school certificate that would let you enter university in your own country."}
        </li>
        <li>{ar ? "معادلة الشهادة دي في التشيك، لو طالعة من بره." : "Recognition of that certificate in Czechia, if it was issued abroad."}</li>
        <li>{ar ? "إثبات إنك بتعرف لغة الدراسة." : "Proof that you know the language of study."}</li>
        <li>
          {ar
            ? "امتحان قبول أو مقابلة أو ملف أعمال، لو البرنامج بيطلبه."
            : "An entrance exam, interview or portfolio, if the programme asks for one."}
        </li>
      </ol>

      <h3 id="requirements-recognition" className={h3Class}>
        {ar ? "معادلة شهادة الثانوية" : "Getting your secondary certificate recognised"}
      </h3>
      <ul className={listClass}>
        <li>
          {ar
            ? "فيه طريقين: النوستريفيكيشن عند الجهة التشيكية المختصة، وده معترف بيه في كل مكان بس بياخد وقت أطول، أو الاعتراف جوه إجراءات القبول نفسها، وده غالبًا بيكون للجامعة دي بس."
            : "There are two routes: nostrification at the relevant Czech authority, which is valid everywhere but slower, or recognition within the admission procedure, which usually counts only at that university."}
          <Src href={S.howToApply} ar={ar} />
        </li>
        <li>
          {ar
            ? "جامعة مساريك مثلًا بتقدر تراجع شهادتك بنفسها عشان القبول عندها، وأحيانًا برسوم."
            : "Masaryk University, for example, can check your certificate itself for its own admissions, sometimes for a fee."}
          <Src href={S.muniVerify} ar={ar} />
        </li>
        <li>
          {ar ? "شهادة الثانوية العامة المصرية لازم تتوثق الأول. التفاصيل في " : "An Egyptian thanaweya amma certificate has to be legalised first. See "}
          <Go href="/recognition/egypt/">{ar ? "دليل المعادلة لمصر" : "the Egypt recognition guide"}</Go>
          {ar ? " و" : " and "}
          <Go href="/qa/#docs-nostrification">{ar ? "أسئلة النوستريفيكيشن" : "the nostrification questions"}</Go>.
        </li>
      </ul>

      <h3 id="requirements-language" className={h3Class}>
        {ar ? "لغة الدراسة" : "Language of study"}
      </h3>
      <ul className={listClass}>
        <li>
          {ar
            ? "البرامج اللي بالإنجليزي غالبًا بتطلب إثبات للإنجليزي، واللي بالتشيكي ممكن تطلب إثبات للتشيكي. المستوى المطلوب بيختلف من جامعة للتانية."
            : "English-taught programmes usually ask for proof of English, and Czech-taught ones may ask for proof of Czech. The level depends on the university."}
          <Src href={S.howToApply} ar={ar} />
        </li>
        <li>
          {ar
            ? "برامج كتير بالتشيكي محتاجة مستوى B2 على الأقل. لو عايز الطريق ده شوف "
            : "Many Czech-taught programmes need at least B2. If that is your route, see "}
          <Go href="/preparatory-year/">{ar ? "السنة التحضيرية" : "the preparatory year"}</Go>.
          <Src href={S.czechFree} ar={ar} />
        </li>
      </ul>

      <h3 id="requirements-exam" className={h3Class}>
        {ar ? "امتحان القبول" : "Entrance exam"}
      </h3>
      <ul className={listClass}>
        <li>
          {ar
            ? "بيختلف حسب البرنامج: امتحان مكتوب، أو مقابلة، أو ملف أعمال."
            : "It depends on the programme: a written test, an interview or a portfolio."}
          <Src href={S.howToApply} ar={ar} />
        </li>
        <li>
          {ar
            ? "في جامعة تشارلز، إجراءات القبول في البرامج الإنجليزي بتكون بالإنجليزي."
            : "At Charles University, the admission procedure for English-taught programmes is held in English."}
          <Src href={S.cuniApply} ar={ar} />
        </li>
        <li>
          {ar ? "لو هتقدم طب، مواعيد ومواد امتحان كل كلية في " : "If you are applying for medicine, each faculty's exam subjects and dates are in "}
          <Go href="/study/medicine-in-czech-republic/">{ar ? "دليل دراسة الطب" : "the medicine guide"}</Go>.
        </li>
      </ul>

      <h3 id="requirements-documents" className={h3Class}>
        {ar ? "الأوراق" : "Documents"}
      </h3>
      <ul className={listClass}>
        <li>
          {ar
            ? "بعض الأوراق لازم تتعمد أو تتترجم أو تتوثق، فابدأ بدري."
            : "Some documents must be certified, translated or legalised, so start early."}
          <Src href={S.howToApply} ar={ar} />
        </li>
        <li>
          {ar
            ? "الأوراق العربي محتاجة ترجمة تشيكي. الأوراق الإنجليزي اللي مش للفيزا مش محتاجة ترجمة."
            : "Documents in Arabic need a Czech translation. Documents in English that are not for the visa do not."}
          <Src href={S.embassyLegalisation} ar={ar} />
        </li>
      </ul>

      <h3 id="requirements-timeline" className={h3Class}>
        {ar ? "الجدول الزمني المعتاد" : "The usual timeline"}
      </h3>
      <ol className="space-y-2 text-sm text-text-secondary leading-relaxed list-decimal ps-5 marker:text-text-muted">
        <li>{ar ? "قبل الدراسة بـ9 لـ12 شهر: راجع شروط البرامج اللي عايزها." : "9 to 12 months before: check the requirements of the programmes you want."}</li>
        <li>{ar ? "قبلها بـ6 لـ9 شهور: جهّز الأوراق وابدأ المعادلة." : "6 to 9 months before: prepare your documents and start recognition."}</li>
        <li>{ar ? "من فبراير لأبريل: مواعيد تقديم كتير بتقفل." : "February to April: many application deadlines."}</li>
        <li>{ar ? "الربيع أو أول الصيف: امتحانات القبول." : "Spring or early summer: entrance exams."}</li>
        <li>{ar ? "يونيو ويوليو: النتايج." : "June and July: results."}</li>
        <li>{ar ? "بعد القبول: أكّد مكانك وقدّم على الفيزا." : "After admission: confirm your place and apply for the visa."}</li>
      </ol>
      <p className="text-sm text-text-secondary leading-relaxed mt-3">
        {ar ? "الجدول ده عام" : "This is a general pattern"}
        <Src href={S.howToApply} ar={ar} />
        {ar ? ". المواعيد الفعلية في " : ". For real dates see "}
        <Go href="/deadlines/">{ar ? "مواعيد التقديم" : "the deadlines"}</Go>
        {ar ? "، والخطوات بالتفصيل في " : ", and for each step "}
        <Go href="/application-guide/">{ar ? "دليل التقديم" : "the application guide"}</Go>
        {ar ? " و" : " and "}
        <Go href="/student-visa-egypt/">{ar ? "دليل الفيزا من مصر" : "the student visa guide for Egypt"}</Go>.
      </p>

      <p className="text-xs text-text-muted mt-6">
        {ar
          ? `راجعنا المصادر الرسمية دي يوم ${CHECKED_ON.ar}. شروط كل برنامج بالتفصيل على موقع الجامعة نفسها.`
          : `We checked these official sources on ${CHECKED_ON.en}. Each programme's exact requirements are on the university's own site.`}
      </p>
    </section>
  );
}
