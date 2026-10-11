"use client";

import { useState } from "react";

type Action = "link" | "grant" | "revoke" | "unrevoke" | "buyers";
type BuyerRow = { email: string; phone: string | null; date: string; product: string; note: string; revoked: boolean };

const ERRORS: Record<string, string> = {
  wrong_password: "Wrong password.",
  bad_email: "That doesn't look like an email address.",
  no_purchase: "No paid course or Full Journey order for this email in Stripe, and no manual grant. Check the spelling, or grant access manually.",
  note_required: "Add a short note (for example 'InstaPay 12 Oct' or 'refunded').",
  revoked: "This buyer's access is revoked. Restore it first if that was a mistake.",
  stripe_unavailable: "Stripe didn't answer. Try again in a minute.",
  unavailable: "Something went wrong. Try again in a minute.",
  not_configured: "Course access isn't set up yet (missing settings on Netlify).",
};

const PRODUCT_LABEL: Record<string, string> = { course: "Course", fullJourney: "Full Journey", manual: "Manual" };

/** Owner-only: personal links, manual grants, revocations and the buyer list. */
export default function CourseAccessAdmin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<Action | null>(null);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [buyers, setBuyers] = useState<BuyerRow[] | null>(null);

  async function run(action: Action) {
    setBusy(action);
    setMessage(null);
    setLink(null);
    try {
      const res = await fetch("/api/course/admin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password, action, email, note }),
      });
      const body = (await res.json().catch(() => ({}))) as { link?: string; error?: string; buyers?: BuyerRow[] };
      if (!res.ok) {
        setMessage({ kind: "error", text: ERRORS[body.error ?? ""] ?? "Something went wrong." });
      } else if (action === "buyers") {
        setBuyers(body.buyers ?? []);
      } else if (body.link) {
        setLink(body.link);
        setMessage({ kind: "ok", text: action === "grant" ? "Access granted and logged." : "Link ready." });
      } else {
        setMessage({ kind: "ok", text: action === "revoke" ? "Access revoked on every device." : "Access restored." });
      }
    } catch {
      setMessage({ kind: "error", text: "Network error. Try again." });
    } finally {
      setBusy(null);
    }
  }

  const copy = (text: string) => navigator.clipboard?.writeText(text).catch(() => {});

  const input =
    "w-full px-4 py-3 rounded-xl bg-midnight/50 border border-border-subtle text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-amber/50";
  const button =
    "px-4 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-midnight";

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Course access</h1>
          <p className="text-sm text-text-secondary mt-2">
            Owner only. Course and Full Journey buyers in Stripe get access automatically; use this page for device changes,
            InstaPay buyers, refunds and the buyer list.
          </p>
        </div>

        <label className="block">
          <span className="block text-sm font-medium text-text-primary mb-1.5">Admin password</span>
          <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
        </label>

        <section className="space-y-3 rounded-xl border border-border-subtle p-4">
          <h2 className="text-base font-semibold text-text-primary">One buyer</h2>
          <label className="block">
            <span className="block text-sm text-text-secondary mb-1.5">Buyer email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} dir="ltr" />
          </label>
          <label className="block">
            <span className="block text-sm text-text-secondary mb-1.5">Note (needed to grant or revoke)</span>
            <input type="text" maxLength={200} value={note} onChange={(e) => setNote(e.target.value)} placeholder="InstaPay 12 Oct / refunded" className={input} />
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={!!busy} onClick={() => run("link")} className={`${button} bg-amber text-midnight`}>
              {busy === "link" ? "Checking Stripe…" : "Create link (device change)"}
            </button>
            <button type="button" disabled={!!busy} onClick={() => run("grant")} className={`${button} border border-amber/40 text-text-primary`}>
              Grant manually (InstaPay)
            </button>
            <button type="button" disabled={!!busy} onClick={() => run("revoke")} className={`${button} border border-red-400/40 text-red-300`}>
              Revoke access
            </button>
            <button type="button" disabled={!!busy} onClick={() => run("unrevoke")} className={`${button} border border-border-subtle text-text-secondary`}>
              Restore access
            </button>
          </div>
          {message && (
            <p role={message.kind === "error" ? "alert" : "status"} className={`text-sm ${message.kind === "error" ? "text-red-400" : "text-green-400"}`}>
              {message.text}
            </p>
          )}
          {link && (
            <div className="space-y-2 rounded-lg bg-surface/60 p-3">
              <p className="text-sm text-text-primary font-medium">Send this link to the buyer only:</p>
              <p className="text-xs text-text-secondary break-all select-all" dir="ltr">
                {link}
              </p>
              <button type="button" onClick={() => copy(link)} className={`${button} border border-border-subtle text-text-primary w-full`}>
                Copy link
              </button>
            </div>
          )}
        </section>

        <section className="space-y-3 rounded-xl border border-border-subtle p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-text-primary">All buyers</h2>
            <button type="button" disabled={!!busy} onClick={() => run("buyers")} className={`${button} border border-amber/40 text-text-primary`}>
              {busy === "buyers" ? "Loading…" : "Load list"}
            </button>
          </div>
          {buyers && (
            <>
              <p className="text-xs text-text-secondary">
                {buyers.filter((b) => !b.revoked).length} with access, {buyers.filter((b) => b.revoked).length} revoked.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copy([...new Set(buyers.filter((b) => !b.revoked && b.email).map((b) => b.email))].join(", "))}
                  className={`${button} border border-border-subtle text-text-primary`}
                >
                  Copy all emails
                </button>
                <button
                  type="button"
                  onClick={() => copy([...new Set(buyers.filter((b) => !b.revoked && b.phone).map((b) => b.phone))].join("\n"))}
                  className={`${button} border border-border-subtle text-text-primary`}
                >
                  Copy all phone numbers
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start" dir="ltr">
                  <thead className="text-text-muted">
                    <tr>
                      <th className="py-2 pe-3 text-left">Date</th>
                      <th className="py-2 pe-3 text-left">Email</th>
                      <th className="py-2 pe-3 text-left">Phone</th>
                      <th className="py-2 pe-3 text-left">Via</th>
                      <th className="py-2 text-left">Note</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    {buyers.map((b, i) => (
                      <tr key={`${b.email}-${i}`} className={b.revoked ? "line-through opacity-60" : ""}>
                        <td className="py-1.5 pe-3 whitespace-nowrap">{b.date}</td>
                        <td className="py-1.5 pe-3">{b.email || "(no email)"}</td>
                        <td className="py-1.5 pe-3 whitespace-nowrap">{b.phone ?? ""}</td>
                        <td className="py-1.5 pe-3">{PRODUCT_LABEL[b.product] ?? b.product}</td>
                        <td className="py-1.5">{b.revoked ? "revoked" : b.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
