/**
 * Minimal Brevo (Sendinblue) API v3 client: contacts, lists and
 * transactional email. Plain fetch, no SDK. Key: BREVO_API_KEY.
 *
 * Lists and contact attributes are created on first use, so the only setup
 * in Brevo is the API key and a verified sender domain.
 */
const API = "https://api.brevo.com/v3";

export const LIST_NAMES = {
  reminders: "Study Czechia - deadline reminders",
  tips: "Study Czechia - tips and offers",
} as const;
export type ListKey = keyof typeof LIST_NAMES;

/** Contact attributes the site uses (created automatically if missing). */
export const ATTRIBUTES: Record<string, "text" | "float" | "date" | "boolean"> = {
  LOCALE: "text",
  SOURCE: "text",
  MARKETING: "boolean",
  PROGRAMMES: "text",
  REMINDERS_SENT: "text",
  SERIES_STEP: "float",
  SIGNUP_DATE: "date",
  ELIG_PCT: "float",
};

export type BrevoContact = {
  email: string;
  attributes: Record<string, string | number | boolean | null | undefined>;
  listIds: number[];
};

export class BrevoError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}

export class Brevo {
  private listIds: Partial<Record<ListKey, number>> = {};
  private ready = false;

  constructor(
    private readonly key: string,
    private readonly fetchImpl: typeof fetch = fetch
  ) {}

  private async call<T>(method: string, path: string, body?: unknown): Promise<T> {
    const res = await this.fetchImpl(`${API}${path}`, {
      method,
      headers: { "api-key": this.key, accept: "application/json", "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (res.status === 204) return undefined as T;
    const data = (await res.json().catch(() => ({}))) as T & { code?: string };
    if (!res.ok) throw new BrevoError(`Brevo ${method} ${path.split("?")[0]}: ${res.status} ${data.code ?? ""}`, res.status);
    return data;
  }

  /** Create the two lists and the contact attributes if they don't exist yet. */
  async ensureSetup(): Promise<void> {
    if (this.ready) return;
    const lists = await this.call<{ lists?: { id: number; name: string }[] }>("GET", "/contacts/lists?limit=50&offset=0");
    for (const [key, name] of Object.entries(LIST_NAMES) as [ListKey, string][]) {
      let found = lists.lists?.find((l) => l.name === name);
      if (!found) {
        const folders = await this.call<{ folders?: { id: number }[] }>("GET", "/contacts/folders?limit=10&offset=0");
        const folderId =
          folders.folders?.[0]?.id ??
          (await this.call<{ id: number }>("POST", "/contacts/folders", { name: "Study Czechia" })).id;
        const created = await this.call<{ id: number }>("POST", "/contacts/lists", { name, folderId });
        found = { id: created.id, name };
      }
      this.listIds[key] = found.id;
    }
    const attrs = await this.call<{ attributes?: { name: string; category: string }[] }>("GET", "/contacts/attributes");
    const existing = new Set((attrs.attributes ?? []).filter((a) => a.category === "normal").map((a) => a.name));
    for (const [name, type] of Object.entries(ATTRIBUTES)) {
      if (!existing.has(name)) await this.call("POST", `/contacts/attributes/normal/${name}`, { type });
    }
    this.ready = true;
  }

  listId(key: ListKey): number {
    const id = this.listIds[key];
    if (id === undefined) throw new Error("Brevo.ensureSetup() must run first");
    return id;
  }

  async getContact(email: string): Promise<BrevoContact | null> {
    try {
      return await this.call<BrevoContact>("GET", `/contacts/${encodeURIComponent(email)}`);
    } catch (err) {
      if (err instanceof BrevoError && err.status === 404) return null;
      throw err;
    }
  }

  async upsertContact(email: string, attributes: BrevoContact["attributes"], listKeys: ListKey[]): Promise<void> {
    await this.call("POST", "/contacts", {
      email,
      attributes,
      listIds: listKeys.map((k) => this.listId(k)),
      updateEnabled: true,
    });
  }

  async updateContact(email: string, attributes: BrevoContact["attributes"], unlinkListKeys: ListKey[] = []): Promise<void> {
    await this.call("PUT", `/contacts/${encodeURIComponent(email)}`, {
      attributes,
      ...(unlinkListKeys.length ? { unlinkListIds: unlinkListKeys.map((k) => this.listId(k)) } : {}),
    });
  }

  async *listContacts(key: ListKey): AsyncGenerator<BrevoContact> {
    const id = this.listId(key);
    for (let offset = 0; offset < 50_000; offset += 500) {
      const page = await this.call<{ contacts?: BrevoContact[] }>(
        "GET",
        `/contacts/lists/${id}/contacts?limit=500&offset=${offset}`
      );
      const contacts = page.contacts ?? [];
      for (const c of contacts) yield c;
      if (contacts.length < 500) return;
    }
  }

  async sendEmail(msg: {
    to: string;
    subject: string;
    html: string;
    text: string;
    sender: { email: string; name: string };
    tags?: string[];
    headers?: Record<string, string>;
  }): Promise<void> {
    await this.call("POST", "/smtp/email", {
      sender: msg.sender,
      to: [{ email: msg.to }],
      subject: msg.subject,
      htmlContent: msg.html,
      textContent: msg.text,
      tags: msg.tags,
      headers: msg.headers,
    });
  }
}
