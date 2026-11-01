import { existsSync } from "node:fs";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { renderAt } from "./render";

function trail(pathname: string) {
  const { container } = renderAt(<Breadcrumb />, pathname);
  // Link renders "/recognition"; trailingSlash adds the "/" in the real build.
  const links = [...container.querySelectorAll("nav a")].map((a) => a.getAttribute("href")!.replace(/\/?$/, "/"));
  const jsonLd = JSON.parse(container.querySelector("script[type='application/ld+json']")!.textContent!);
  const items: string[] = jsonLd.itemListElement.map((i: { item: string }) => i.item);
  return { links, items, text: container.querySelector("nav")!.textContent };
}

describe("Breadcrumb", () => {
  it("skips /stage/, which has no page, on stage pages in both languages", () => {
    const en = trail("/stage/visa/");
    expect(en.links).toEqual(["/"]);
    expect(en.items).toEqual(["https://studyczechia.com/", "https://studyczechia.com/stage/visa/"]);
    expect(en.text).toContain("Visa & Interview");

    const ar = trail("/ar/stage/visa/");
    expect(ar.links).toEqual(["/ar/"]);
    expect(ar.items).toEqual(["https://studyczechia.com/ar/", "https://studyczechia.com/ar/stage/visa/"]);
  });

  it("keeps intermediate levels that are real pages", () => {
    const { links, items } = trail("/recognition/egypt/");
    expect(links).toEqual(["/", "/recognition/"]);
    expect(items).toEqual([
      "https://studyczechia.com/",
      "https://studyczechia.com/recognition/",
      "https://studyczechia.com/recognition/egypt/",
    ]);
    expect(existsSync("src/app/recognition/page.tsx")).toBe(true);
    expect(existsSync("src/app/stage/page.tsx")).toBe(false);
  });
});
