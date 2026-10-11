import { screen } from "@testing-library/react";
import UniversityListClient from "@/app/universities/UniversityListClient";
import { renderAt } from "./render";

describe("UniversityListClient", () => {
  it("renders the search box and a list of programme links", () => {
    const { container } = renderAt(<UniversityListClient />, "/universities/");
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(container.querySelectorAll('a[href*="/programmes/"]').length).toBeGreaterThan(0);
  });

  it("keeps links inside /ar/ on the Arabic page", () => {
    const { container } = renderAt(<UniversityListClient />, "/ar/universities/");
    const links = [...container.querySelectorAll<HTMLAnchorElement>('a[href*="/programmes/"]')];
    expect(links.length).toBeGreaterThan(0);
    expect(links.every((a) => a.getAttribute("href")!.startsWith("/ar/"))).toBe(true);
  });
});
