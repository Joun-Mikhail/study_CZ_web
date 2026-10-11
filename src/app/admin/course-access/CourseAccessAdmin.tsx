"use client";

import { useState } from "react";

const ERRORS: Record<string, string> = {
  wrong_password: "Wrong password.",
  bad_email: "That doesn't look like an email address.",
  no_purchase: "No paid course order found for this email in Stripe. Check the spelling, or ask which email they paid with.",
  stripe_unavailable: "Stripe didn't answer. Try again in a minute.",
  not_configured: "Course access isn't set up yet (missing settings on Netlify).",
};

/** Owner-only: create a personal course link for a buyer who changed device. */
export default function CourseAccessAdmin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setLink(null);
    setError(null);
    setCopied(false);
    try {
      const res = await fetch("/api/course/admin-link", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password, email }),
      });
      const body = (await res.json().catch(() => ({}))) as { link?: string; error?: string };
      if (res.ok && body.link) setLink(body.link);
      else setError(ERRORS[body.error ?? ""] ?? "Something went wrong.");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {}
  }

  const input =
    "w-full px-4 py-3 rounded-xl bg-midnight/50 border border-border-subtle text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-amber/50";

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-md mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Course access link</h1>
          <p className="text-sm text-text-secondary mt-2">
            For a buyer who changed phone or laptop. Enter the email they paid with; if Stripe shows a paid course
            order for it, you get a personal link to send them on WhatsApp.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-text-primary mb-1.5">Admin password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={input}
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-text-primary mb-1.5">Buyer email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={input}
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 rounded-xl bg-amber text-midnight font-semibold text-sm disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
          >
            {busy ? "Checking Stripe…" : "Create link"}
          </button>
        </form>

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}

        {link && (
          <div className="space-y-3 rounded-xl border border-border-subtle p-4">
            <p className="text-sm text-text-primary font-medium">Send this link to the buyer:</p>
            <p className="text-xs text-text-secondary break-all select-all">{link}</p>
            <button
              type="button"
              onClick={copy}
              className="w-full py-2.5 rounded-xl border border-border-subtle text-sm text-text-primary hover:border-amber/40"
            >
              {copied ? "Copied" : "Copy link"}
            </button>
            <p className="text-xs text-text-muted">The link opens the course on any device. Only send it to the buyer.</p>
          </div>
        )}
      </div>
    </main>
  );
}
