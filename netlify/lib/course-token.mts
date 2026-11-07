/**
 * Course access tokens: `<payload>.<signature>`, both base64url, signed with
 * HMAC-SHA256 using the COURSE_TOKEN_SECRET environment variable.
 * Access is lifetime, so tokens don't expire; changing the secret revokes all.
 */

export type CourseTokenPayload = {
  v: 1;
  /** Buyer email (or Stripe session ID if Stripe had no email). */
  sub: string;
  /** How the token was issued. */
  src: "checkout" | "admin";
  /** Issued at, seconds since epoch. */
  iat: number;
};

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): Uint8Array<ArrayBuffer> {
  const b64 = text.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(text.length / 4) * 4, "=");
  const binary = atob(b64);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

export async function signCourseToken(
  claims: Pick<CourseTokenPayload, "sub" | "src">,
  secret: string,
  now: number = Date.now()
): Promise<string> {
  if (secret.length < 32) throw new Error("COURSE_TOKEN_SECRET must be at least 32 characters");
  const payload: CourseTokenPayload = { v: 1, sub: claims.sub, src: claims.src, iat: Math.floor(now / 1000) };
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await hmacKey(secret), encoder.encode(body)));
  return `${body}.${toBase64Url(sig)}`;
}

export async function verifyCourseToken(token: string, secret: string): Promise<CourseTokenPayload | null> {
  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  const [body, sig] = parts;
  try {
    const sigBytes = fromBase64Url(sig);
    const ok = await crypto.subtle.verify("HMAC", await hmacKey(secret), sigBytes, encoder.encode(body));
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(body))) as CourseTokenPayload;
    if (payload.v !== 1 || typeof payload.sub !== "string" || !payload.sub) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Reads `Authorization: Bearer <token>`. */
export function bearerToken(req: Request): string | null {
  const header = req.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(\S+)$/i.exec(header);
  return match ? match[1] : null;
}
