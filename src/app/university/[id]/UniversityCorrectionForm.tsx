"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { CONTACT_EMAIL } from "@/config/contact";
import { CheckCircle } from "lucide-react";

export default function UniversityCorrectionForm({ uniId }: { uniId: string }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    const subject = encodeURIComponent(`Correction for university: ${uniId}`);
    const body = encodeURIComponent(`University ID: ${uniId}\nFrom: ${email || "anonymous"}\n\n${message.trim()}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("success"), 500);
    setEmail("");
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t border-border-subtle">
      <h4 className="text-sm font-semibold text-text-primary mb-3">{t.university.correctionTitle}</h4>

      <label className="block text-xs text-text-secondary mb-1">{t.university.correctionEmailLabel} (optional)</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="you@example.com"
        className="w-full mb-3 px-3 py-2.5 rounded-xl border border-border-subtle bg-transparent text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-amber/50 transition-colors"
      />

      <label className="block text-xs text-text-secondary mb-1">{t.university.correctionPlaceholderLabel}</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        placeholder={t.university.correctionPlaceholder}
        className="w-full px-3 py-2.5 rounded-xl border border-border-subtle bg-transparent text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-amber/50 transition-colors resize-none"
      />

      <div className="mt-3 flex items-center gap-3">
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-amber hover:bg-amber-hover text-white text-sm font-medium transition-colors"
        >
          {t.university.correctionSubmit}
        </button>
        {status === "success" && (
          <span className="flex items-center gap-1.5 text-sm text-success">
            <CheckCircle className="w-4 h-4" />
            {t.university.correctionSuccess}
          </span>
        )}
      </div>
    </form>
  );
}
