import WhatItCostsClient from "@/app/what-it-costs/WhatItCostsClient";
import { MEDICINE_ADMISSIONS } from "@/data/medicine-admissions";
import { programmes } from "@/data/programmes";
import { feeVerified } from "@/lib/fee-source";
import { formatMoney } from "@/lib/medicine-guide";
import { OFFICIAL, englishTuition, livingByCity } from "@/lib/study-costs";
import { renderAt } from "./render";

const tuition = englishTuition();
const verified = programmes.filter((p) => p.language === "English" && feeVerified(p)).length;
const withFee = MEDICINE_ADMISSIONS.filter((r) => r.applicationFee);

describe("what it costs", () => {
  for (const [locale, path] of [
    ["en", "/what-it-costs/"],
    ["ar", "/ar/what-it-costs/"],
  ] as const) {
    it(`opens with a short answer built from the data, keeping the verified count (${locale})`, () => {
      const { container } = renderAt(<WhatItCostsClient />, path);
      const short = container.querySelector("#cost-short-answer")?.parentElement?.textContent ?? "";
      expect(short).toContain(formatMoney(tuition.bachelor.median, "EUR", locale));
      expect(short).toContain(formatMoney(OFFICIAL.proofOfFundsYearCzk.value, "CZK", locale));
      expect(short).toContain(`${verified}`);
      expect(short).toContain(`${tuition.all.count}`);
    });

    it(`shows the sourced monthly range for every city and links to its sources (${locale})`, () => {
      const { container } = renderAt(<WhatItCostsClient />, path);
      const text = container.textContent ?? "";
      const short = container.querySelector("#cost-short-answer")?.parentElement?.textContent ?? "";
      for (const city of livingByCity()) {
        const [lo, hi] = city.monthlyCzk.map((v) => v.toLocaleString("en-US"));
        expect(text, city.key).toContain(`${lo} – ${hi}`);
        if (city.key !== "ostrava") expect(short, city.key).toContain(`${lo} – ${hi}`);
      }
      const calc = container.querySelectorAll('a[href*="/cost-of-living"]');
      expect(calc.length).toBeGreaterThan(0);
    });

    it(`lists the published medicine application fees with their sources (${locale})`, () => {
      const { container } = renderAt(<WhatItCostsClient />, path);
      for (const round of withFee) {
        const link = container.querySelector(`a[href="${round.sourceUrl}"]`);
        expect(link, round.sourceUrl).not.toBeNull();
        expect(link!.closest("li")?.textContent).toContain(
          formatMoney(round.applicationFee!.amount, round.applicationFee!.currency, locale)
        );
      }
    });

    it(`answers the common questions, citing the official work rule (${locale})`, () => {
      const { container } = renderAt(<WhatItCostsClient />, path);
      const faq = container.querySelector("#cost-faq")!.parentElement!;
      expect(faq.querySelectorAll("h3")).toHaveLength(5);
      expect(faq.querySelector(`a[href="${OFFICIAL.workFreeAccess.url}"]`)).not.toBeNull();
      expect(faq.querySelector(`a[href="${OFFICIAL.czechFree.url}"]`)).not.toBeNull();
    });
  }
});
