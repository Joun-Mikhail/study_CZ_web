import { screen, fireEvent, within } from "@testing-library/react";
import CostOfLivingPage from "@/app/cost-of-living/page";
import { renderAt } from "./render";

describe("cost of living page", () => {
  it("renders the English page with one h1 and the main sections", () => {
    renderAt(<CostOfLivingPage />, "/cost-of-living/");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Cost of living in Czechia for students");
    for (const id of ["workday-title", "earn-title", "month-title", "compare-title", "sources-title"]) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });

  it("renders the Arabic twin in Arabic, with the brief's headline", () => {
    renderAt(<CostOfLivingPage />, "/ar/cost-of-living/");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("تكلفة المعيشة في التشيك للطلاب");
    expect(screen.getByRole("heading", { name: "تقدر تشتري إيه بمرتب يوم شغل في التشيك؟" })).toBeInTheDocument();
    // No English section headings leak into the Arabic page.
    expect(screen.queryByText("What can 8 hours of work buy you in Czechia?")).toBeNull();
  });

  it("the basket starts as the big shop and shows the shortfall against an 8-hour shift", () => {
    renderAt(<CostOfLivingPage />, "/cost-of-living/");
    const receipt = screen.getByRole("heading", { name: "Your basket" }).closest("div")!.parentElement!;
    expect(within(receipt).getByText("1,704 CZK")).toBeInTheDocument();
    expect(within(receipt).getByText("Short by")).toBeInTheDocument();
    expect(within(receipt).getByText("264 CZK")).toBeInTheDocument();
  });

  it("adding and removing items changes the real total", () => {
    renderAt(<CostOfLivingPage />, "/cost-of-living/");
    fireEvent.click(screen.getByRole("button", { name: "Empty basket" }));
    fireEvent.click(screen.getByRole("button", { name: "Add Fresh semi-skimmed milk" }));
    fireEvent.click(screen.getByRole("button", { name: "Add Fresh semi-skimmed milk" }));
    const receipt = screen.getByRole("heading", { name: "Your basket" }).closest("div")!.parentElement!;
    expect(within(receipt).getByText("34 CZK")).toBeInTheDocument(); // 2 × 16.90
    expect(within(receipt).getByText("Left over")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Remove one Fresh semi-skimmed milk" }));
    expect(within(receipt).getByText("17 CZK")).toBeInTheDocument();
  });

  it("offers a cheaper basket that fits and applies it", () => {
    renderAt(<CostOfLivingPage />, "/cost-of-living/");
    fireEvent.click(screen.getByRole("button", { name: "Use this basket" }));
    expect(screen.getByText("Left over")).toBeInTheDocument();
  });

  it("net pay: estimated for a small DPP, refused above the threshold", () => {
    renderAt(<CostOfLivingPage />, "/cost-of-living/");
    // Default: 180 Kč × 5 h × 2 shifts × 52/12 weeks ≈ 7,800 Kč, DPP, signed declaration.
    expect(screen.getByText(/No tax: your 2,570 Kč monthly tax credit/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Shifts per week"), { target: { value: "5" } });
    expect(screen.getByText(/social and health insurance apply to the whole DPP pay/)).toBeInTheDocument();
  });

  it("changing the city re-prices the month", () => {
    renderAt(<CostOfLivingPage />, "/cost-of-living/");
    const before = screen.getByText(/Estimated month · Brno/).parentElement!.textContent;
    fireEvent.click(screen.getAllByRole("radio", { name: "Prague" })[0]);
    const after = screen.getByText(/Estimated month · Prague/).parentElement!.textContent;
    expect(after).not.toBe(before);
  });

  it("every outbound source link opens safely", () => {
    renderAt(<CostOfLivingPage />, "/cost-of-living/");
    const external = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'));
    expect(external.length).toBeGreaterThan(30);
    for (const a of external) {
      expect(a.getAttribute("rel") ?? "", a.href).toMatch(/noopener|noreferrer/);
    }
  });
});
