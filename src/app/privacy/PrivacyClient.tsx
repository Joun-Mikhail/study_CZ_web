"use client";

import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CONTACT_EMAIL } from "@/config/contact";

const sections = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: 11 October 2026",
    blocks: [
      {
        heading: "What we collect",
        body: "We collect only what you voluntarily provide: your name, email, and WhatsApp number when you book a service or submit a contact form, and your email if you sign up for a checklist or waitlist. The eligibility checker and university matcher process your answers entirely in your browser. Nothing is sent to our servers.",
      },
      {
        heading: "Documents you send us",
        body: "For a document review or the Full Journey you may send passports, transcripts, translations or bank statements by WhatsApp or email. We use them only for your service, never share them, and delete them within 90 days after the service ends, or sooner if you ask.",
      },
      {
        heading: "Analytics",
        body: "We count visits and button clicks with privacy-friendly analytics that do not use cookies and do not identify you. This tells us which pages and tools help students, nothing more.",
      },
      {
        heading: "How we use it",
        body: "Contact information is used solely to deliver the service you requested (consultation, document review, or support). We may send you a follow-up message about your booking. We never send marketing emails unless you explicitly opt in.",
      },
      {
        heading: "Third parties",
        body: "Payments are processed by Stripe. We do not receive or store your card details. If you sign up for an email checklist or waitlist, your email is stored with our email provider (ConvertKit). We do not sell, rent, or share your personal data with any third party for marketing purposes.",
      },
      {
        heading: "Cookies",
        body: "This site does not use advertising cookies. It stores a few preferences in your browser (language, theme, course progress) so the site remembers them.",
      },
      {
        heading: "Your rights",
        body: "You can request deletion of any data we hold about you at any time. Email us and we will delete your information within 7 days.",
      },
      {
        heading: "Contact",
        body: `Privacy questions: ${CONTACT_EMAIL}`,
      },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    updated: "آخر تحديث: 11 أكتوبر 2026",
    blocks: [
      {
        heading: "إيه اللي بنجمعه",
        body: "بنجمع بس اللي انت بتقدمه طوعا: اسمك، إيميلك، ورقم واتسابك لما تحجز خدمة أو تبعت رسالة، وإيميلك لو اشتركت في قائمة أو قائمة انتظار. أداة \"أقدر أقدم؟\" واختيار الجامعة بيشتغلوا بالكامل على جهازك. مفيش حاجة بتتبعت لسيرفراتنا.",
      },
      {
        heading: "الأوراق اللي بتبعتهالنا",
        body: "في مراجعة الأوراق أو الرحلة الكاملة ممكن تبعت جواز سفر أو شهادات أو ترجمات أو كشف حساب على واتساب أو إيميل. بنستخدمها لخدمتك بس، عمرنا ما بنشاركها، وبنمسحها خلال 90 يوم من نهاية الخدمة، أو قبل كده لو طلبت.",
      },
      {
        heading: "الإحصائيات",
        body: "بنعد الزيارات والضغطات على الأزرار بأداة إحصائيات بتحترم الخصوصية، من غير كوكيز ومن غير ما تعرف إنت مين. ده بيورينا أنهي صفحات وأدوات بتفيد الطلاب، مش أكتر.",
      },
      {
        heading: "إزاي بنستخدمه",
        body: "بيانات التواصل بتستخدم بس لتقديم الخدمة اللي طلبتها. ممكن نبعتلك رسالة متابعة عن حجزك. مش بنبعت إيميلات تسويق غير لو وافقت صراحة.",
      },
      {
        heading: "أطراف تالتة",
        body: "المدفوعات بتتم من خلال Stripe. إحنا مش بنستلم أو نخزن بيانات كارتك. لو اشتركت في قائمة بالإيميل، إيميلك بيتخزن عند مزود الإيميل بتاعنا (ConvertKit). مش بنبيع أو نأجر أو نشارك بياناتك الشخصية مع أي طرف تالت.",
      },
      {
        heading: "الكوكيز",
        body: "الموقع مش بيستخدم كوكيز إعلانية. بيحفظ شوية تفضيلات في المتصفح بتاعك (اللغة، الشكل، تقدمك في الكورس) عشان يفتكرها.",
      },
      {
        heading: "حقوقك",
        body: "تقدر تطلب حذف أي بيانات عندنا عنك في أي وقت. راسلنا وهنحذف معلوماتك خلال 7 أيام.",
      },
      {
        heading: "تواصل",
        body: `أسئلة عن الخصوصية: ${CONTACT_EMAIL}`,
      },
    ],
  },
};

export default function PrivacyClient() {
  const { locale } = useTranslation();
  const content = sections[locale] || sections.en;

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
                <p className="text-sm text-text-secondary leading-relaxed">
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
