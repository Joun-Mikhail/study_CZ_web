// @ts-expect-error: plain JS tool
import { classify } from "../tools/check-official-links.mjs";

const U = "https://example.gov.cz/a/page/";

describe("link checker verdicts", () => {
  it("calls a link broken only when the server says the page is gone", () => {
    expect(classify(U, 404, U)).toBe("broken");
    expect(classify(U, 410, U)).toBe("broken");
  });

  it("does not call refused or rate-limited requests broken", () => {
    for (const s of [401, 403, 429, 451, 405]) expect(classify(U, s, U), String(s)).toBe("blocked");
  });

  it("does not call timeouts, network errors or server errors broken", () => {
    for (const s of [0, 500, 502, 503, 504]) expect(classify(U, s, undefined), String(s)).toBe("unreachable");
  });

  it("accepts ordinary redirects and flags ones that change host or land on a home page", () => {
    expect(classify(U, 200, U)).toBe("ok");
    expect(classify(U, 200, "https://example.gov.cz/a/page")).toBe("ok");
    expect(classify("https://www.example.gov.cz/x/", 200, "https://example.gov.cz/x/")).toBe("ok");
    expect(classify(U, 200, "https://archive.example.gov.cz/a/page/")).toBe("moved");
    expect(classify(U, 200, "https://example.gov.cz/")).toBe("moved");
    expect(classify("https://example.gov.cz/", 200, "https://example.gov.cz/en/")).toBe("ok");
  });
});
