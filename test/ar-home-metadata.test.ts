import { AR_PAGE_META } from "@/i18n/ar-metadata";

describe("Arabic home metadata", () => {
  const { title, description } = AR_PAGE_META["/"];

  it("keeps the main keyword and makes no freshness or free-university claim", () => {
    expect(title.startsWith("الدراسة في التشيك")).toBe(true);
    expect(title).not.toMatch(/20\d\d/);
    expect(title).not.toContain("جامعات مجانية");
  });

  it("separates the free guide from tuition-free Czech-taught study, with its exceptions", () => {
    expect(description).toContain("دليل مستقل ومجاني");
    expect(description).toContain("بالتشيكية في الجامعات العامة بلا رسوم دراسية");
    expect(description).toContain("مع استثناءات ورسوم أخرى");
    expect(description).toContain("بالإنجليزية غالبًا برسوم");
    expect(description).not.toMatch(/الموثوق|جامعات مجانية/);
  });
});
