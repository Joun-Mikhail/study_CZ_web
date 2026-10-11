"use client";

import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CONTACT_EMAIL } from "@/config/contact";
import { LAUNCH_OFFER, OFFER_ACTIVE, OFFER_END_LABEL, eur, fullPackageTotal, price, type PriceKey } from "@/config/pricing";

const P = (k: PriceKey) => price(k);
const PA = (k: PriceKey) => price(k, "ar");
const offerEn = OFFER_ACTIVE
  ? ` Launch offer: until ${OFFER_END_LABEL.en}, every price is ${LAUNCH_OFFER.percentOff}% below the regular price, which is shown crossed out next to it.`
  : "";
const offerAr = OFFER_ACTIVE
  ? ` عرض الإطلاق: حتى ${OFFER_END_LABEL.ar}، كل الأسعار أقل بنسبة ${LAUNCH_OFFER.percentOff}% من السعر العادي، والسعر العادي ظاهر بجانبها مشطوبًا.`
  : "";

const sections = {
  en: [
    {
      title: "Terms of Service",
      updated: "Last updated: 11 October 2026",
      blocks: [
        {
          heading: "1. Who we are",
          body: "Study Czechia (studyczechia.com) is an independent, student-built information platform run by its founder, John, a student in Brno, Czech Republic. It is not affiliated with any Czech embassy, government ministry or university, or with the official Study in Czechia programme (studyin.cz). Content is for guidance only and is not legal, immigration or financial advice.",
        },
        {
          heading: "2. No guarantees",
          body: "We do not guarantee university admission, visa approval or any specific outcome. Decisions on admission and visas are made solely by the relevant Czech authorities and institutions.",
        },
        {
          heading: "3. Paid services and prices",
          body: `Quick consultation (30 min): ${P("consultation")}. Document review: ${P("documentReview")}. Embassy mock interview: ${P("interviewPrep")}. Arrival plan: ${P("arrivalSupport")}. Full Journey: ${eur(fullPackageTotal())} in two payments. Course "Your First 90 Days in Czechia": ${P("course")}. All prices are in EUR and paid through Stripe, or InstaPay for students in Egypt.${offerEn}`,
        },
        {
          heading: "4. Full Journey payments",
          body: `The Full Journey is paid in two steps. Step 1 (${P("fullPackageStep1")}) is paid when we start. Step 2 (${P("fullPackageStep2")}) is due only after a university accepts you. If no university accepts you, step 2 is never due.`,
        },
        {
          heading: "5. Refund rules per service",
          body: `Consultation and embassy mock interview: full refund if the session does not take place, or if you cancel at least 24 hours before it. Cancellations under 24 hours are not refunded.\nDocument review: full refund until we start the review, or if the written report is not delivered within 5 business days of receiving your documents. Once the report is delivered, the service is complete.\nArrival plan: full refund until we send your personal checklist.\nFull Journey: step 1 is refundable in full until our first session. After that, if we fail to deliver what was agreed, the unused part is refunded. Step 2 is only due after acceptance (section 4).\nCourse: it is a pre-order and opens on 1 January 2027. If it is not available by then, you get a full refund. After it opens, you can ask for a full refund within 14 days of it opening, as long as you have completed less than 20% of the lessons.\nTo ask for a refund, message us on WhatsApp or by email. Refunds go back to the original payment method.`,
        },
        {
          heading: "6. Your right to withdraw",
          body: "If you are a consumer in the EU, you may withdraw from a purchase within 14 days without giving a reason. If you ask us to start a service within those 14 days and then withdraw, you pay only for the part already delivered; once a service is fully delivered at your request, the right to withdraw ends. The refund rules in section 5 apply on top of this right, never instead of it.",
        },
        {
          heading: "7. Accuracy",
          body: "We make every effort to keep information accurate and up to date. Important facts are marked with a verification date and linked to official sources. However, visa rules, fees and deadlines change. Always verify critical information with the relevant official source before acting on it.",
        },
        {
          heading: "8. Your data and documents",
          body: "We collect only the data you choose to give us (for example your name, email and WhatsApp number). Documents you send for a service (such as passports, transcripts or bank statements) are used only for that service and deleted within 90 days after it ends, or sooner if you ask. We do not sell or share your data. The eligibility checker runs only in your browser. See the Privacy Policy for details.",
        },
        {
          heading: "9. Contact",
          body: `Questions about these terms: ${CONTACT_EMAIL}`,
        },
      ],
    },
  ],
  ar: [
    {
      title: "شروط الخدمة",
      updated: "آخر تحديث: 11 أكتوبر 2026",
      blocks: [
        {
          heading: "1. من نحن",
          body: "Study Czechia (studyczechia.com) منصة معلومات مستقلة أنشأها طالب، ويديرها مؤسسها جون، وهو طالب في برنو، جمهورية التشيك. المنصة غير تابعة لأي سفارة تشيكية أو وزارة حكومية أو جامعة، ولا لبرنامج Study in Czechia الرسمي (studyin.cz). المحتوى للاسترشاد فقط، وليس استشارة قانونية أو استشارة هجرة أو استشارة مالية.",
        },
        {
          heading: "2. لا ضمانات",
          body: "لا نضمن القبول في الجامعة أو الموافقة على التأشيرة أو أي نتيجة محددة. قرارات القبول والتأشيرة تتخذها الجهات والمؤسسات التشيكية المختصة وحدها.",
        },
        {
          heading: "3. الخدمات المدفوعة والأسعار",
          body: `استشارة سريعة (30 دقيقة): ${PA("consultation")}. مراجعة الأوراق: ${PA("documentReview")}. مقابلة سفارة تجريبية: ${PA("interviewPrep")}. خطة الوصول: ${PA("arrivalSupport")}. الرحلة الكاملة: ${eur(fullPackageTotal(), "ar")} على دفعتين. كورس "أول 90 يوم في التشيك": ${PA("course")}. كل الأسعار باليورو، والدفع عبر Stripe، أو عبر InstaPay للطلاب في مصر.${offerAr}`,
        },
        {
          heading: "4. دفعات الرحلة الكاملة",
          body: `تُدفع الرحلة الكاملة على خطوتين. الخطوة الأولى (${PA("fullPackageStep1")}) عند البدء. الخطوة الثانية (${PA("fullPackageStep2")}) لا تُستحق إلا بعد قبولك في جامعة. إذا لم تقبلك أي جامعة، لا تُستحق الخطوة الثانية أبدًا.`,
        },
        {
          heading: "5. قواعد الاسترداد لكل خدمة",
          body: `الاستشارة والمقابلة التجريبية: استرداد كامل إذا لم تتم الجلسة، أو إذا ألغيت قبلها بـ24 ساعة على الأقل. الإلغاء قبل أقل من 24 ساعة لا يُسترد.\nمراجعة الأوراق: استرداد كامل حتى نبدأ المراجعة، أو إذا لم يُسلَّم التقرير المكتوب خلال 5 أيام عمل من استلام أوراقك. بعد تسليم التقرير تُعتبر الخدمة مكتملة.\nخطة الوصول: استرداد كامل حتى نرسل لك قائمتك الشخصية.\nالرحلة الكاملة: الخطوة الأولى قابلة للاسترداد بالكامل حتى أول جلسة. بعد ذلك، إذا لم نقدم ما اتفقنا عليه، يُسترد الجزء غير المستخدم. الخطوة الثانية لا تُستحق إلا بعد القبول (البند 4).\nالكورس: حجز مسبق، ويفتح في 1 يناير 2027. إذا لم يكن متاحًا بحلول هذا التاريخ، تسترد المبلغ كاملًا. بعد فتحه، يمكنك طلب استرداد كامل خلال 14 يومًا من فتحه، بشرط أن تكون أكملت أقل من 20% من الدروس.\nلطلب الاسترداد، راسلنا على واتساب أو بالبريد الإلكتروني. يُعاد المبلغ إلى وسيلة الدفع الأصلية.`,
        },
        {
          heading: "6. حقك في الانسحاب",
          body: "إذا كنت مستهلكًا داخل الاتحاد الأوروبي، يحق لك الانسحاب من الشراء خلال 14 يومًا دون ذكر السبب. إذا طلبت منا بدء خدمة خلال هذه المدة ثم انسحبت، تدفع فقط مقابل الجزء الذي قُدِّم بالفعل؛ وعند تقديم الخدمة كاملة بناءً على طلبك ينتهي حق الانسحاب. قواعد الاسترداد في البند 5 تُضاف إلى هذا الحق ولا تحل محله.",
        },
        {
          heading: "7. الدقة",
          body: "نبذل كل جهد لتكون المعلومات دقيقة ومحدّثة. الحقائق المهمة مُعلَّمة بتاريخ التحقق ومرتبطة بمصادر رسمية. لكن قواعد التأشيرة والرسوم والمواعيد تتغير، لذا تأكد دائمًا من المعلومات المهمة من المصدر الرسمي قبل التصرف.",
        },
        {
          heading: "8. بياناتك ومستنداتك",
          body: "نجمع فقط البيانات التي تختار أن تعطيها لنا (مثل الاسم والبريد الإلكتروني ورقم واتساب). المستندات التي ترسلها لخدمة ما (مثل جواز السفر أو كشف الدرجات أو كشف الحساب البنكي) تُستخدم لتلك الخدمة فقط، وتُحذف خلال 90 يومًا من انتهائها، أو قبل ذلك إذا طلبت. لا نبيع بياناتك ولا نشاركها. أداة \"هل أنا مؤهل؟\" تعمل داخل متصفحك فقط. التفاصيل في سياسة الخصوصية.",
        },
        {
          heading: "9. التواصل",
          body: `أسئلة عن هذه الشروط: ${CONTACT_EMAIL}`,
        },
      ],
    },
  ],
};

export default function LegalClient() {
  const { locale } = useTranslation();
  const content = (sections[locale] || sections.en)[0];

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            {content.title}
          </h1>
          <p className="text-sm text-text-muted mb-10">{content.updated}</p>

          <div className="space-y-8">
            {content.blocks.map((block) => (
              <section key={block.heading}>
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  {block.heading}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                  {block.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
