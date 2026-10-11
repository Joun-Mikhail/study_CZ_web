/**
 * Manual grants (e.g. InstaPay buyers) and per-buyer revocations, kept in a
 * site-wide Netlify Blobs store. Keys: "grant/<email>", "revoked/<subject>".
 * Reads use strong consistency so a revocation applies immediately.
 *
 * Note: site-wide stores are shared with deploy previews, which is what we
 * want for real grants; never use a preview to test destructive actions.
 */
import { getStore } from "@netlify/blobs";

export type Grant = { email: string; note: string; date: string };
export type Revocation = { subject: string; note: string; date: string };

export interface AccessStore {
  getGrant(email: string): Promise<Grant | null>;
  setGrant(grant: Grant): Promise<void>;
  listGrants(): Promise<Grant[]>;
  isRevoked(subject: string): Promise<boolean>;
  revoke(rev: Revocation): Promise<void>;
  unrevoke(subject: string): Promise<void>;
  listRevoked(): Promise<Revocation[]>;
}

const key = (prefix: "grant" | "revoked", id: string) => `${prefix}/${id.trim().toLowerCase()}`;

function blobsStore(): AccessStore {
  const store = getStore({ name: "course-access", consistency: "strong" });
  const listJson = async <T,>(prefix: string): Promise<T[]> => {
    const { blobs } = await store.list({ prefix });
    const items: unknown[] = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })));
    return items.filter((x) => x !== null) as T[];
  };
  return {
    getGrant: async (email) => (await store.get(key("grant", email), { type: "json" })) as Grant | null,
    setGrant: async (grant) => void (await store.setJSON(key("grant", grant.email), grant)),
    listGrants: () => listJson<Grant>("grant/"),
    isRevoked: async (subject) => (await store.get(key("revoked", subject))) !== null,
    revoke: async (rev) => void (await store.setJSON(key("revoked", rev.subject), rev)),
    unrevoke: async (subject) => store.delete(key("revoked", subject)),
    listRevoked: () => listJson<Revocation>("revoked/"),
  };
}

/** In-memory store for tests. */
export function memoryStore(): AccessStore {
  const grants = new Map<string, Grant>();
  const revoked = new Map<string, Revocation>();
  return {
    getGrant: async (email) => grants.get(email.toLowerCase()) ?? null,
    setGrant: async (g) => void grants.set(g.email.toLowerCase(), g),
    listGrants: async () => [...grants.values()],
    isRevoked: async (s) => revoked.has(s.toLowerCase()),
    revoke: async (r) => void revoked.set(r.subject.toLowerCase(), r),
    unrevoke: async (s) => void revoked.delete(s.toLowerCase()),
    listRevoked: async () => [...revoked.values()],
  };
}

let current: AccessStore | null = null;

export function accessStore(): AccessStore {
  current ??= blobsStore();
  return current;
}

export function setAccessStoreForTests(store: AccessStore | null) {
  current = store;
}
