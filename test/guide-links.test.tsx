import type { ReactElement } from "react";
import ApplicationGuidePage from "@/app/application-guide/page";
import StudentVisaEgyptClient from "@/app/student-visa-egypt/StudentVisaEgyptClient";
import ParentsClient from "@/app/for-parents/ParentsClient";
import ServicesClient from "@/app/services/ServicesClient";
import UniversityMatcherPage from "@/app/university-matcher/page";
import { programmes } from "@/data/programmes";
import { renderAt } from "./render";

const hrefs = (c: HTMLElement) => [...c.querySelectorAll("a")].map((a) => (a.getAttribute("href") ?? "").replace(/\/$/, ""));

describe("links to /arrival/ and /questions-to-ask/", () => {
  it.each<[string, () => ReactElement, string, string]>([
    ["application guide", () => <ApplicationGuidePage />, "/application-guide/", "/arrival"],
    ["Egypt visa guide", () => <StudentVisaEgyptClient />, "/student-visa-egypt/", "/arrival"],
    ["for parents", () => <ParentsClient />, "/for-parents/", "/questions-to-ask"],
    ["services", () => <ServicesClient />, "/services/", "/questions-to-ask"],
  ])("%s links %s in English and Arabic", (_, ui, path, target) => {
    const en = renderAt(ui(), path);
    expect(hrefs(en.container)).toContain(target);
    en.unmount();
    const ar = renderAt(ui(), `/ar${path}`);
    expect(hrefs(ar.container)).toContain(`/ar${target}`);
  });
});

describe("matcher", () => {
  it("explains what it filters and how it orders results, without running it", () => {
    const en = renderAt(<UniversityMatcherPage />, "/university-matcher/");
    expect(en.getByRole("heading", { name: "How the matcher works" })).toBeInTheDocument();
    expect(en.getByText(new RegExp(`only the ${programmes.length} programmes`))).toBeInTheDocument();
    expect(hrefs(en.container)).toContain("/eligibility");
    en.unmount();
    const ar = renderAt(<UniversityMatcherPage />, "/ar/university-matcher/");
    expect(ar.getByRole("heading", { name: "المطابق بيشتغل إزاي" })).toBeInTheDocument();
  });
});
