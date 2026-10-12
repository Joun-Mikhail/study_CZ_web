import { initial, scoreForm, topRisks, verdictFor, offersFullJourney, planSummary, type FormData } from "@/app/eligibility/eligibility-logic";

const ready: FormData = {
  ...initial,
  firstName: "Sara",
  whatsapp: "+201000000000",
  email: "sara@example.com",
  highestEducation: "highschool",
  gpa: "85%",
  apostille: "yes",
  translation: "english",
  passportValid: "yes",
  proofOfFunds: "available",
  startWhen: "nextYear",
  englishCert: "yes",
};

describe("eligibility plan", () => {
  it("has no risks and a 'ready' verdict when everything passes", () => {
    const { categories } = scoreForm(ready);
    expect(topRisks(categories)).toEqual([]);
    expect(verdictFor(categories)).toBe("ready");
    expect(offersFullJourney(ready, categories)).toBe(false);
  });

  it("puts fails first and matches documents to the document review", () => {
    const form = { ...ready, apostille: "unknown", proofOfFunds: "canArrange" };
    const risks = topRisks(scoreForm(form).categories);
    expect(risks.map((r) => [r.key, r.status, r.service])).toEqual([
      ["documents", "fail", "documentReview"],
      ["finances", "warning", "consultation"],
    ]);
  });

  it("never offers the same service twice and shows at most three risks", () => {
    const form = { ...ready, proofOfFunds: "canArrange", startWhen: "thisSemester", gpa: "55%", englishCert: "plan" };
    const risks = topRisks(scoreForm(form).categories);
    expect(risks).toHaveLength(3);
    expect(risks.filter((r) => r.service === "consultation")).toHaveLength(1);
  });

  it("offers the Full Journey only for two or more fails, or when asked", () => {
    const twoFails = { ...ready, apostille: "unknown", proofOfFunds: "no" };
    expect(offersFullJourney(twoFails, scoreForm(twoFails).categories)).toBe(true);
    const oneFail = { ...ready, apostille: "unknown" };
    expect(offersFullJourney(oneFail, scoreForm(oneFail).categories)).toBe(false);
    const asked = { ...ready, helpStyle: "withMe" };
    expect(offersFullJourney(asked, scoreForm(asked).categories)).toBe(true);
  });

  it("never puts the name, number or email in the WhatsApp summary", () => {
    const form = { ...ready, apostille: "no" };
    for (const locale of ["en", "ar"] as const) {
      const text = planSummary(form, locale);
      expect(text).not.toMatch(/Sara|\+20|example\.com/);
    }
    expect(planSummary(form, "en")).toContain("apostille not done");
  });
});
