"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/context";

export default function UniversityCorrectionForm({ uniId }: { uniId: string }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/university-corrections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ universityId: uniId, email: email || null, message: message.trim() }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h4 className="text-sm font-medium mb-2">{t.university.correctionTitle}</h4>

      <label className="text-xs text-text-secondary">{t.university.correctionEmailLabel} (optional)</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="you@example.com"
        className="w-full mt-1 mb-3 px-3 py-2 border rounded-md"
      />

      <label className="text-xs text-text-secondary">{t.university.correctionPlaceholderLabel}</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        placeholder={t.university.correctionPlaceholder}
        className="w-full mt-1 px-3 py-2 border rounded-md"
      />

      <div className="mt-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-4 py-2 bg-amber text-black rounded-md font-medium disabled:opacity-60"
        >
          {status === "sending" ? t.university.correctionSubmitting : t.university.correctionSubmit}
        </button>
        {status === "success" && <span className="ml-3 text-sm text-success">{t.university.correctionSuccess}</span>}
        {status === "error" && <span className="ml-3 text-sm text-amber">{t.university.correctionError}</span>}
      </div>
    </form>
  );
}
