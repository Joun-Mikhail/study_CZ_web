// ConvertKit public embed-form endpoint: no API key in client code. Tags and
// sequences are assigned inside ConvertKit (form -> automation), not here.
// NOTE: this request shape follows ConvertKit's documented embed-form pattern
// but has not yet been tested against a real form ID.
export async function submitToConvertKit(
  formId: string,
  email: string,
  fields: Record<string, string> = {}
): Promise<boolean> {
  try {
    const body = new FormData();
    body.set("email_address", email);
    for (const [key, value] of Object.entries(fields)) {
      body.set(`fields[${key}]`, value);
    }
    const res = await fetch(`https://app.convertkit.com/forms/${formId}/subscriptions`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body,
    });
    const data = await res.json().catch(() => null);
    return res.ok && !!data && data.status !== "error" && !data.errors;
  } catch {
    return false;
  }
}
