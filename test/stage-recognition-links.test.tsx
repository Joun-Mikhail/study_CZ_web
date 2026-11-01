import StagePageClient from "@/app/stage/[slug]/StagePageClient";
import RecognitionJordanClient from "@/app/recognition/jordan/RecognitionJordanClient";
import StudentVisaEgyptClient from "@/app/student-visa-egypt/StudentVisaEgyptClient";
import { stageOrder } from "@/data/stages";
import { renderAt } from "./render";

const hrefs = (c: HTMLElement) => [...c.querySelectorAll("a")].map((a) => (a.getAttribute("href") ?? "").replace(/\/$/, ""));

describe("stage pages", () => {
  it("link every other stage and mark the current one", () => {
    const en = renderAt(<StagePageClient slug="documents" />, "/stage/documents/");
    const links = hrefs(en.container);
    for (const s of stageOrder.filter((s) => s !== "documents")) expect(links).toContain(`/stage/${s}`);
    expect(links).not.toContain("/stage/documents");
    expect(en.getByText("Are my documents right?", { selector: "[aria-current=step]" })).toBeInTheDocument();
    en.unmount();

    const ar = renderAt(<StagePageClient slug="documents" />, "/ar/stage/documents/");
    expect(hrefs(ar.container)).toContain("/ar/stage/visa");
    expect(ar.getByRole("heading", { name: "كل مراحل الرحلة" })).toBeInTheDocument();
  });
});

describe("recognition guides", () => {
  it("link the other countries' guides and the hub", () => {
    const en = renderAt(<RecognitionJordanClient />, "/recognition/jordan/");
    const links = hrefs(en.container);
    expect(links).toEqual(expect.arrayContaining(["/recognition/egypt", "/recognition/saudi-arabia", "/recognition"]));
    expect(links).not.toContain("/recognition/jordan");
    en.unmount();

    const ar = renderAt(<RecognitionJordanClient />, "/ar/recognition/jordan/");
    expect(hrefs(ar.container)).toEqual(expect.arrayContaining(["/ar/recognition/egypt", "/ar/recognition/saudi-arabia"]));
    expect(ar.getByRole("heading", { name: "أدلة المعادلة لدول أخرى" })).toBeInTheDocument();
  });

  it("leave the student visa guide, which shares the layout, without the country list", () => {
    const v = renderAt(<StudentVisaEgyptClient />, "/student-visa-egypt/");
    expect(v.queryByRole("heading", { name: "Recognition guides for other countries" })).toBeNull();
  });
});
