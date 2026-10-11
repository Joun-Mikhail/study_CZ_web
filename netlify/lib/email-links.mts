/**
 * Signed unsubscribe links: /api/email/unsubscribe?e=<email>&s=<scope>&t=<hmac>
 * HMAC-SHA256 over "<email>|<scope>" with EMAIL_LINK_SECRET.
 */
import { SITE_URL } from "./http.mjs";

export type UnsubscribeScope = "tips" | "all";

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toBase64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value))));
}

export async function unsubscribeToken(email: string, scope: UnsubscribeScope, secret: string): Promise<string> {
  return sign(`${email.toLowerCase()}|${scope}`, secret);
}

export async function unsubscribeUrl(email: string, scope: UnsubscribeScope, secret: string): Promise<string> {
  const params = new URLSearchParams({ e: email.toLowerCase(), s: scope, t: await unsubscribeToken(email, scope, secret) });
  return `${SITE_URL}/api/email/unsubscribe?${params}`;
}

export async function verifyUnsubscribe(email: string, scope: string, token: string, secret: string): Promise<boolean> {
  if (scope !== "tips" && scope !== "all") return false;
  const expected = await unsubscribeToken(email, scope, secret);
  if (expected.length !== token.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  return diff === 0;
}
