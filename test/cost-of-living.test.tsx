import { fireEvent } from "@testing-library/react";
import CostOfLivingPage from "@/app/cost-of-living/page";
import { FOOD_BASKET, rohlikUrl } from "@/data/living/groceries";
import { LIFESTYLE_PRESETS, monthRange, studentMonth } from "@/lib/living-calc";
import { renderAt } from "./render";

const czk = (n: number) => `${n.toLocaleString("en-US")} CZK`;

describe("cost of living", () => {
  for (const [locale, path] of [
    ["en", "/cost-of-living/"],
    ["ar", "/ar/cost-of-living/"],
  ] as const) {
    it(`shows the sourced month for Prague, with every source linked (${locale})`, () => {
      const { container, getByTestId } = renderAt(<CostOfLivingPage />, path);
      const balanced = studentMonth("prague", LIFESTYLE_PRESETS.balanced);
      const [low, high] = monthRange("prague");
      expect(getByTestId("month-total").textContent).toBe(czk(balanced.totalCzk));
      expect(getByTestId("month-range").textContent).toBe(`${czk(low)} – ${czk(high)}`);
      expect(getByTestId("month-lines").querySelectorAll("li[data-line]")).toHaveLength(balanced.lines.length);
      for (const url of balanced.lines.flatMap((l) => l.sources.map((s) => s.url))) {
        expect(container.querySelector(`a[href="${url}"]`), url).not.toBeNull();
      }
      for (const item of FOOD_BASKET) {
        expect(container.querySelector(`a[href="${rohlikUrl(item)}"]`), item.product).not.toBeNull();
      }
    });
  }

  it("switches to the budget month and to another city", () => {
    const { getByTestId, getByRole } = renderAt(<CostOfLivingPage />, "/cost-of-living/");
    fireEvent.click(getByRole("button", { name: /Budget month/ }));
    expect(getByTestId("month-total").textContent).toBe(czk(studentMonth("prague", LIFESTYLE_PRESETS.budget).totalCzk));
    fireEvent.click(getByRole("button", { name: "Ostrava" }));
    expect(getByTestId("month-total").textContent).toBe(czk(studentMonth("ostrava", LIFESTYLE_PRESETS.budget).totalCzk));
  });
});
