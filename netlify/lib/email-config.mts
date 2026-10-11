import { env } from "./http.mjs";

/** Brevo settings from Netlify environment variables, or null if incomplete. */
export function emailConfig() {
  const key = env("BREVO_API_KEY");
  const secret = env("EMAIL_LINK_SECRET");
  const fromEmail = env("EMAIL_FROM_ADDRESS");
  if (!key || !secret || !fromEmail || secret.length < 32) return null;
  return { key, secret, sender: { email: fromEmail, name: env("EMAIL_FROM_NAME") ?? "Study Czechia" } };
}
