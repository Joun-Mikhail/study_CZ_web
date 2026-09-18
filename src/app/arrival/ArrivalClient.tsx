"use client";

import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PAYMENT_LINKS, whatsappWithContext } from "@/config/contact";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Navigation,
  ShieldAlert,
  CheckCircle2,
  MessageCircle,
  AlertTriangle,
} from "lucide-react";

export default function ArrivalClient() {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero image */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative w-full h-[180px] sm:h-[240px] rounded-2xl overflow-hidden">
            <Image
              src="/images/prague-bridge.jpg"
              alt="Prague, Czechia"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-midnight/20 to-transparent" />
          </div>
        </div>

        {/* Hero */}
        <section className="max-w-3xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              {t.hero.title}
            </h1>
            <p className="text-lg text-amber font-medium mb-4">{t.hero.subtitle}</p>
            <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto">
              {t.hero.body}
            </p>
          </motion.div>
        </section>

        {/* Free: what registration is + the deadline */}
        <section className="max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
              {t.free.heading}
            </h2>

            <div className="space-y-4">
              <GlassCard hoverEffect="border">
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-amber" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-1">{t.free.whatIs.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{t.free.whatIs.body}</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hoverEffect="border">
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-amber" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-1">{t.free.deadline.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{t.free.deadline.body}</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hoverEffect="border">
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-amber" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-1">{t.free.whereToGo.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{t.free.whereToGo.body}</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hoverEffect="border">
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-amber" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-text-primary mb-1">{t.free.whatToBring.title}</h3>
                    <ul className="text-sm text-text-secondary space-y-1.5">
                      {t.free.whatToBring.items.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-text-muted italic mt-3">{t.free.whatToBring.note}</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="mt-6 rounded-2xl border border-amber/20 bg-amber/5 p-5 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber shrink-0 mt-0.5" />
              <p className="text-sm text-text-secondary leading-relaxed">{t.free.warning}</p>
            </div>
          </motion.div>
        </section>

        {/* Paid: arrival plan, copy sourced from the Services page */}
        <section className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <GlassCard hoverEffect="glow" className="text-center">
              <ShieldAlert className="w-8 h-8 text-amber mx-auto mb-3" />
              <h2 className="text-xl font-bold text-text-primary mb-2">{t.paid.title}</h2>
              <p className="text-sm text-amber font-medium mb-3">{t.paid.fearTrigger}</p>
              <p className="text-sm text-text-secondary leading-relaxed mb-5 text-start">
                {t.paid.description}
              </p>
              <ul className="text-sm text-text-secondary text-start space-y-2 mb-6 max-w-md mx-auto">
                {t.paid.included.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-text-muted italic mb-6">{t.paid.triggerLine}</p>
              <MagneticButton variant="primary" size="lg" href={PAYMENT_LINKS.arrivalSupport}>
                {t.paid.cta}
              </MagneticButton>
              <p className="text-xs text-text-muted mt-3">{t.paid.postButton}</p>
              <div className="mt-4 pt-4 border-t border-border-subtle">
                <a
                  href={whatsappWithContext("arrival support")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t.paid.whatsapp}
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// ─── English copy ───────────────────────────────────────────────────────────

const en = {
  hero: {
    title: "You Just Landed in Czechia. Here's What to Do First.",
    subtitle: "You don't speak Czech yet, and the foreign police deadline is already running.",
    body:
      "Every sign is confusing, your university's emails are in Czech, and you're not sure where to start. Here's the one thing that actually has a legal deadline — free, no sign-up.",
  },
  free: {
    heading: "The First Thing You Must Do",
    whatIs: {
      title: "What foreign police registration is",
      body:
        "It's registering your address with the Czech Foreign Police (cizinecká policie) so your stay in the country is legally on record. Every non-Czech citizen has to do it, and it's separate from anything your university or landlord does for you unless they explicitly confirm they've handled it.",
    },
    deadline: {
      title: "Your deadline",
      body:
        "You must register within 3 working days of arriving in Czechia — but the count starts the day after you land, and weekends and Czech public holidays don't count. For example: arrive on a Friday, and Saturday/Sunday don't count — Monday is day 1, Tuesday is day 2, Wednesday is day 3, so you must be registered by the end of Wednesday. Getting this exact rule wrong is the #1 reason students miss the deadline. Some university dorms handle registration automatically for their students — check with your dorm or accommodation first before assuming you still need to do it yourself.",
    },
    whereToGo: {
      title: "Where to go",
      body:
        "It's strictly city-specific: you have to go to the Foreign Police (OAMP) office responsible for the district where your accommodation is registered. In Prague, the right office depends on your district (Koněvova, Římská, and others); in Brno it's typically the office on Hudcova. Search \"Foreign Police OAMP [your city]\" to find the exact address and opening hours for your district.",
    },
    whatToBring: {
      title: "What to bring",
      items: [
        "Your valid passport — the original, not a photo",
        "Your valid visa or entry stamp (the sticker or border stamp in your passport)",
        "Proof of accommodation — the document that gets rejected most often. It must be signed by your landlord or dorm manager and clearly show your full name, the exact address, and either the landlord's name and ID number (rodné číslo) or property registration details. A Booking.com-style receipt usually isn't accepted for this.",
        "Health insurance confirmation, if you have it — not always required, but some officers ask for it",
      ],
      note: "The registration form itself is provided at the office — you don't need to bring it filled out. Just bring a pen.",
    },
    warning:
      "A student last semester missed his foreign police deadline because nobody told him it was 3 working days, not 3 calendar days. He spent 2 months fixing it.",
  },
  paid: {
    title: "Landed in Czechia? I've Got You.",
    fearTrigger:
      "Your first 2 weeks will be overwhelming. Bank account, foreign police, insurance, transport, phone, and everything is in Czech.",
    description:
      "You just landed. You don't speak Czech. Every sign is confusing. You need to register at the foreign police within 3 days but you don't know where it is or what to bring. Your university sent you 4 emails in Czech and you have no idea what they say. I've been through all of this. I live here. I'll give you a complete first-week plan and be available on WhatsApp to answer every question you're afraid to ask.",
    included: [
      'Personalized "First 2 Weeks" checklist for your specific city',
      "Foreign police registration walkthrough (what to bring, where to go)",
      "Bank account setup guidance (which bank, what documents)",
      "Czech SIM card recommendation (best plan for students)",
      "Transport pass setup",
      "Health insurance verification",
      "14 days of WhatsApp support, ask me anything, anytime",
    ],
    triggerLine:
      "A student last semester missed his foreign police deadline because nobody told him it was 3 business days, not 3 calendar days. He spent 2 months fixing it.",
    cta: "Get My Arrival Plan (€29)",
    postButton: "🔒 Secure payment via Stripe",
    whatsapp: "Ask on WhatsApp instead",
  },
} as const;

// ─── Arabic copy ────────────────────────────────────────────────────────────

const ar = {
  hero: {
    title: "لسه واصل تشيكيا؟ إليك أول حاجة تعملها.",
    subtitle: "مش بتتكلم تشيكي لسه، وموعد شرطة الأجانب بدأ يعد من دلوقتي.",
    body:
      "كل لافتة محيرة، إيميلات الجامعة بالتشيكي، ومش عارف تبدأ منين. إليك الحاجة الوحيدة اللي ليها موعد قانوني فعلي — ببلاش، بدون تسجيل.",
  },
  free: {
    heading: "أول حاجة لازم تعملها",
    whatIs: {
      title: "تسجيل شرطة الأجانب ده إيه",
      body:
        "هو تسجيل عنوانك عند شرطة الأجانب التشيكية (cizinecká policie) عشان إقامتك تكون مسجلة رسميًا. كل شخص غير تشيكي لازم يعملها، وهي منفصلة عن أي حاجة الجامعة أو الملاك بيعملوها لك إلا لو أكدوا لك صريح إنهم عملوها.",
    },
    deadline: {
      title: "موعدك",
      body:
        "لازم تسجل خلال 3 أيام عمل من وصولك التشيك — بس العد بيبدأ من اليوم اللي بعد ما تنزل، والويكند والعطلات الرسمية التشيكية مش بتتحسب. مثلاً: لو نزلت يوم الجمعة، السبت والحد مش بيتحسبوا — الإتنين يوم 1، الثلاثاء يوم 2، الأربع يوم 3، يعني لازم تكون مسجل قبل ما الأربع يخلص. الغلطة دي هي السبب الأول اللي بيخلي الطلاب يفوتوا الموعد. بعض سكن الجامعات بيعمل التسجيل تلقائي لطلابه — اسأل السكن بتاعك الأول قبل ما تفترض إنك لسه محتاج تعملها بنفسك.",
    },
    whereToGo: {
      title: "تروح فين",
      body:
        "المكتب بيتحدد حسب مدينتك بالظبط — لازم تروح لمكتب شرطة الأجانب (OAMP) المسؤول عن الحي اللي سكنك مسجل فيه. في براج، المكتب بيختلف حسب الحي (Koněvova، Římská، وغيرهم)؛ في برنو غالبًا المكتب في شارع Hudcova. دور على \"Foreign Police OAMP\" وبعدها اسم مدينتك عشان تلاقي العنوان الدقيق ومواعيد الشغل لحيك.",
    },
    whatToBring: {
      title: "الأوراق اللي تجيبها",
      items: [
        "جواز سفرك الساري — الأصل، مش صورة",
        "فيزتك السارية أو ختم الدخول (الاستيكر أو الختم في جوازك)",
        "إثبات السكن — أكتر ورقة بترفض. لازم تكون موقعة من صاحب البيت أو مدير السكن، وتوضح اسمك الكامل والعنوان بالتفصيل، وكمان اسم صاحب البيت ورقمه القومي (rodné číslo) أو بيانات ملكية العقار. إيصال زي Booking.com عادة مش بيتقبل في الحالة دي.",
        "تأكيد التأمين الصحي، لو معاك — مش لازم دايمًا، بس بعض الموظفين بيطلبوه",
      ],
      note: "استمارة التسجيل نفسها موجودة في المكتب — مش لازم تجيبها معبأة. بس جيب معاك قلم.",
    },
    warning:
      "طالب الفصل اللي فات فاته موعد شرطة الأجانب عشان ماحدش قاله إنه 3 أيام عمل، مش 3 أيام عادية. قعد شهرين يصلحها.",
  },
  paid: {
    title: "وصلت التشيك؟ أنا معاك.",
    fearTrigger:
      "أول أسبوعين هيكونوا صعبين. حساب بنكي، شرطة الأجانب، تأمين، مواصلات، موبايل. وكل حاجة بالتشيكي.",
    description:
      "لسه واصل. مش بتتكلم تشيكي. كل لافتة محيرة. أنا عديت كل ده. أنا ساكن هنا. هديك خطة كاملة لأول أسبوع وهكون متاح على واتساب أجاوب على كل سؤال.",
    included: [
      `قائمة "أول أسبوعين" مخصصة لمدينتك`,
      "شرح تسجيل شرطة الأجانب (إيه تجيب، تروح فين)",
      "توجيه فتح حساب بنكي (أي بنك، أي أوراق)",
      "توصية شريحة موبايل (أحسن باقة للطلاب)",
      "إعداد اشتراك المواصلات",
      "تحقق من التأمين الصحي",
      "14 يوم دعم واتساب. اسأل أي حاجة، في أي وقت",
    ],
    triggerLine:
      "طالب الفصل اللي فات فاته موعد شرطة الأجانب عشان ماحدش قاله إنه 3 أيام عمل، مش 3 أيام عادية. قعد شهرين يصلحها.",
    cta: "احصل على خطة وصولي (29€)",
    postButton: "🔒 دفع آمن عبر Stripe",
    whatsapp: "اسأل على واتساب بدل ده",
  },
} as const;
