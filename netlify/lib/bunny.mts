/**
 * Signed Bunny Stream embed URLs (Token Authentication on the video library).
 * token = hex(SHA-256(tokenKey + videoId + expires))
 */
export async function signedBunnyEmbedUrl(
  libraryId: string,
  videoId: string,
  tokenKey: string,
  ttlSeconds = 6 * 60 * 60,
  now: number = Date.now()
): Promise<string> {
  const expires = Math.floor(now / 1000) + ttlSeconds;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(tokenKey + videoId + expires));
  const token = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `https://iframe.mediadelivery.net/embed/${encodeURIComponent(libraryId)}/${encodeURIComponent(videoId)}?token=${token}&expires=${expires}`;
}
