import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { WHATSAPP_URL } from "@/config/contact";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-4">Contact us</h1>
        <p className="text-text-secondary mb-6">If you have questions or want a document review, reach out:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassCard>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-text-secondary mb-3">Send us a message and we'll reply within 48 hours.</p>
            <a href="mailto:hello@study-in-czechia.org" className="text-amber hover:underline">hello@study-in-czechia.org</a>
          </GlassCard>

          <GlassCard>
            <h3 className="font-semibold mb-2">WhatsApp</h3>
            <p className="text-sm text-text-secondary mb-3">Quick questions and booking are easiest over WhatsApp.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-amber hover:underline">Open WhatsApp</a>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
