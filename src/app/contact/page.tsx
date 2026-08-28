"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { WHATSAPP_URL, CONTACT_EMAIL, FACEBOOK_GROUP_URL } from "@/config/contact";
import { Mail, MessageCircle, Users, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactPage() {
  const { t, locale } = useTranslation();
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("sending");
    const mailtoSubject = encodeURIComponent(subject || "Contact from Study.Czechia");
    const mailtoBody = encodeURIComponent(`Name: ${name}\n\n${message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setTimeout(() => setFormState("success"), 1000);
  }

  function resetForm() {
    setFormState("idle");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  }

  const channels = [
    {
      icon: Mail,
      title: t.contact.emailTitle,
      desc: t.contact.emailDesc,
      cta: t.contact.emailCta,
      href: `mailto:${CONTACT_EMAIL}`,
      detail: CONTACT_EMAIL,
      responseTime: t.contact.responseEmail,
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      icon: MessageCircle,
      title: t.contact.whatsappTitle,
      desc: t.contact.whatsappDesc,
      cta: t.contact.whatsappCta,
      href: WHATSAPP_URL,
      detail: "+420 703 982 237",
      responseTime: t.contact.responseWhatsapp,
      color: "text-success",
      bgColor: "bg-success/10",
      external: true,
    },
    {
      icon: Users,
      title: t.contact.facebookTitle,
      desc: t.contact.facebookDesc,
      cta: t.contact.facebookCta,
      href: FACEBOOK_GROUP_URL,
      detail: locale === "ar" ? "+12,000 عضو" : "12,000+ members",
      color: "text-[#1877F2]",
      bgColor: "bg-[#1877F2]/10",
      external: true,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Breadcrumb />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero image */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="relative w-full h-[180px] sm:h-[240px] rounded-2xl overflow-hidden">
            <Image
              src="/images/prague-scenic.jpg"
              alt="Prague scenic view"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-midnight/20 to-transparent" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-3"
          >
            {t.contact.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary leading-relaxed"
          >
            {t.contact.subtitle}
          </motion.p>
        </div>

        {/* Contact channels */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {channels.map((ch, i) => {
            const Icon = ch.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
              >
                <GlassCard hoverEffect="lift" className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${ch.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${ch.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">{ch.title}</h3>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
                    {ch.desc}
                  </p>

                  {ch.detail && (
                    <p className="text-xs text-text-muted mb-3 font-mono">{ch.detail}</p>
                  )}

                  {ch.responseTime && (
                    <div className="flex items-center gap-1.5 text-xs text-text-muted mb-4">
                      <Clock className="w-3 h-3" />
                      <span>{t.contact.responseTime}: {ch.responseTime}</span>
                    </div>
                  )}

                  <a
                    href={ch.href}
                    target={ch.external ? "_blank" : undefined}
                    rel={ch.external ? "noreferrer" : undefined}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber hover:bg-amber-hover text-white text-sm font-medium transition-colors"
                  >
                    {ch.cta}
                  </a>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <GlassCard hoverEffect="border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center">
                <Send className="w-5 h-5 text-amber" />
              </div>
              <h2 className="text-xl font-semibold text-text-primary">{t.contact.formTitle}</h2>
            </div>

            {formState === "success" ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <p className="text-text-primary font-medium mb-2">{t.contact.formSuccess}</p>
                <button
                  onClick={resetForm}
                  className="mt-4 px-4 py-2 rounded-xl border border-border-subtle text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : formState === "error" ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-amber mx-auto mb-4" />
                <p className="text-text-primary font-medium mb-2">{t.contact.formError}</p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-4 px-4 py-2 rounded-xl border border-border-subtle text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {t.contact.tryAgain}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-1.5">{t.contact.formName}</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-border-subtle bg-transparent text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-amber/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1.5">{t.contact.formEmail}</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-border-subtle bg-transparent text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-amber/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-text-secondary mb-1.5">{t.contact.formSubject}</label>
                  <select
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border-subtle bg-transparent text-text-primary text-sm focus:outline-none focus:border-amber/50 transition-colors"
                  >
                    <option value="" disabled>{t.contact.formSubject}</option>
                    {t.contact.formSubjectOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-text-secondary mb-1.5">{t.contact.formMessage}</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.formMessagePlaceholder}
                    className="w-full px-3 py-2.5 rounded-xl border border-border-subtle bg-transparent text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-amber/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber hover:bg-amber-hover text-white font-medium text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {formState === "sending" ? t.contact.formSubmitting : t.contact.formSubmit}
                </button>
              </form>
            )}
          </GlassCard>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
