import { readFileSync } from "node:fs";
import { AR_PAGE_META } from "@/i18n/ar-metadata";

// People search for the brand ("Study Czechia"). The official programme is
// called "Study in Czechia" (studyin.gov.cz), so a homepage title that only says
// "Study in Czechia" competes for its name instead of ours.
describe("homepage titles name the brand", () => {
  it("English homepage title starts with Study Czechia", () => {
    const layout = readFileSync("src/app/layout.tsx", "utf8");
    const title = layout.match(/default:\s*"([^"]+)"/)?.[1] ?? "";
    expect(title.startsWith("Study Czechia")).toBe(true);
    expect(title).not.toMatch(/^Study in Czechia/);
    expect(title.length).toBeLessThanOrEqual(60);
  });

  it("Arabic homepage title keeps its keyword and adds the brand", () => {
    const { title } = AR_PAGE_META["/"];
    expect(title.startsWith("الدراسة في التشيك")).toBe(true);
    expect(title.endsWith("| Study Czechia")).toBe(true);
  });
});
