"use client";

import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CONTACT_EMAIL } from "@/config/contact";

const sections = {
  en: [
    {
      title: "Terms of Service",
      updated: "Last updated: 27 August 2026",
      blocks: [
        {
          heading: "1. What this site is",
          body: "Study Czechia (studyczechia.com) is an independent, student-built information platform. It is not affiliated with any Czech embassy, government ministry, or university. Content is for guidance only and does not constitute legal, immigration, or financial advice.",
        },
        {
          heading: "2. No guarantees",
          body: "We do not guarantee university admission, visa approval, or any specific outcome. Decisions on admission and visas are made solely by the relevant Czech authorities and institutions.",
        },
        {
          heading: "3. Paid services",
          body: "We offer optional paid services including consultations (EUR 15), document reviews (EUR 25), and full application assistance (EUR 350). All payments are processed securely through Stripe. Prices are listed in EUR and charged at checkout.",
        },
        {
          heading: "4. Refund policy",
          body: "Consultations: If we fail to deliver the scheduled call, you receive a full refund. If you cancel more than 24 hours before the scheduled time, you receive a full refund. Cancellations under 24 hours are non-refundable. Document reviews: If we fail to deliver written feedback within 5 business days, you receive a full refund. Once feedback is delivered, the service is considered complete. Full application assistance: The initial payment (EUR 150) is non-refundable once work begins. The remaining balance is due only after university acceptance. If we fail to deliver agreed services, the unused portion is refunded. Course (EUR 49): Refundable within 7 days of purchase if you have not completed more than 20% of the content.",
        },
        {
          heading: "5. Accuracy",
          body: "We make every effort to keep information accurate and up to date. Important facts are marked with a verification date and linked to official sources. However, visa rules, fees, and deadlines change. Always verify critical information with the relevant official source before acting on it.",
        },
        {
          heading: "6. Your data",
          body: "We collect only the data you voluntarily provide (e.g. name, email, WhatsApp number for consultations). We do not sell or share your data with third parties. The eligibility checker processes answers client-side only. See our Privacy Policy for full details.",
        },
        {
          heading: "7. Contact",
          body: `Questions about these terms: ${CONTACT_EMAIL}`,
        },
      ],
    },
  ],
  ar: [
    {
      title: "شروط الخدمة",
      updated: "آخر تحديث: 27 أغسطس 2026",
      blocks: [
        {
          heading: "1. إيه الموقع ده",
          body: "Study Czechia (studyczechia.com) منصة معلومات مستقلة بناها طلاب. مش تابع لأي سفارة تشيكية أو وزارة حكومية أو جامعة. المحتوى للاسترشاد فقط ومش نصيحة قانونية أو هجرة أو مالية.",
        },
        {
          heading: "2. مفيش ضمانات",
          body: "مش بنضمن قبول في جامعة أو موافقة فيزا أو أي نتيجة محددة. قرارات القبول والفيزا بتتاخد بس من الجهات والمؤسسات التشيكية المختصة.",
        },
        {
          heading: "3. الخدمات المدفوعة",
          body: "بنقدم خدمات مدفوعة اختيارية تشمل استشارات (15 يورو)، مراجعة أوراق (25 يورو)، ومساعدة كاملة في التقديم (350 يورو). كل المدفوعات بتتم بأمان من خلال Stripe.",
        },
        {
          heading: "4. سياسة الاسترجاع",
          body: "الاستشارات: لو ما قدرناش نعمل المكالمة المجدولة، بترجعلك فلوسك كاملة. لو لغيت قبل الموعد بأكتر من 24 ساعة، بترجعلك كاملة. الإلغاء في أقل من 24 ساعة مش بيترجع. مراجعة الأوراق: لو ما قدمناش ملاحظات مكتوبة خلال 5 أيام عمل، بترجعلك فلوسك كاملة. بمجرد تسليم الملاحظات، الخدمة تعتبر مكتملة. مساعدة التقديم الكاملة: الدفعة الأولى (150 يورو) مش بتترجع بمجرد بدء العمل. الباقي بيتحسب بس بعد القبول. الكورس (49 يورو): بيترجع خلال 7 أيام من الشراء لو ما كملتش أكتر من 20% من المحتوى.",
        },
        {
          heading: "5. الدقة",
          body: "بنبذل كل جهد عشان المعلومات تكون دقيقة ومحدثة. الحقائق المهمة متعلم عليها بتاريخ تحقق ومربوطة بمصادر رسمية. لكن قوانين الفيزا والرسوم والمواعيد بتتغير. دايما تأكد من المعلومات الحساسة من المصدر الرسمي قبل ما تتصرف.",
        },
        {
          heading: "6. بياناتك",
          body: "بنجمع بس البيانات اللي انت بتقدمها طوعا (مثلا الاسم، الإيميل، رقم واتساب للاستشارات). مش بنبيع أو نشارك بياناتك مع حد تاني. أداة \"أقدر أقدم؟\" بتشتغل على جهازك بس.",
        },
        {
          heading: "7. تواصل",
          body: `أسئلة عن الشروط دي: ${CONTACT_EMAIL}`,
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
