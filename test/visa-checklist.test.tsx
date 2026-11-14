import { fireEvent } from "@testing-library/react";
import ChecklistClient from "@/app/student-visa-egypt/checklist/ChecklistClient";
import { SOURCES, en } from "@/app/student-visa-egypt/StudentVisaEgyptClient";
import { renderAt } from "./render";

const sourced = en.sections.reduce((n, s) => n + s.items.filter((i) => i.source).length, 0);

describe("visa checklist", () => {
  it("lists every sourced item of the visa guide, each with its official source", () => {
    const { container } = renderAt(<ChecklistClient />, "/student-visa-egypt/checklist/");
    expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(sourced);
    const official = new Set<string>(Object.values(SOURCES));
    const links = [...container.querySelectorAll("main li a[target=_blank]")].map((a) => a.getAttribute("href")!);
    expect(links).toHaveLength(sourced);
    for (const href of links) expect(official.has(href), href).toBe(true);
    expect(container.textContent).toContain("115,810 CZK");
    expect(container.textContent).toContain("independent student guide, not the embassy");
  });

  it("counts ticked items and remembers them on the device", () => {
    localStorage.clear();
    const { container, getByText } = renderAt(<ChecklistClient />, "/student-visa-egypt/checklist/");
    fireEvent.click(container.querySelector('input[type="checkbox"]')!);
    expect(getByText(`1 of ${sourced} ready`)).toBeTruthy();
    expect(JSON.parse(localStorage.getItem("visa-checklist-egypt")!)).toEqual({ "before-0": true });
  });

  it("is in Arabic on the Arabic page", () => {
    const { container } = renderAt(<ChecklistClient />, "/ar/student-visa-egypt/checklist/");
    expect(container.querySelector("h1")!.textContent).toContain("قائمة مستندات فيزا الدراسة");
  });
});
