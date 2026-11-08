/**
 * Comprehensive health insurance, which students from outside the EU need for a
 * stay longer than 90 days. PVZP, the main insurer, publishes no price list: its
 * online calculator asks for contact details first. So this one line is NOT an
 * official price. It is the range students report, the same figure the site used
 * before, and the page says so and links to PVZP for an exact quote.
 */
export const HEALTH_INSURANCE = {
  reportedMonthCzk: [1100, 1600] as [number, number],
  official: false,
  quoteUrl: "https://www.pvzp.cz/en/products/foreigners-medical-insurance/",
  requirementUrl: "https://cuni.cz/UKEN-2105.html",
  checkedOn: "2026-11-08",
};
