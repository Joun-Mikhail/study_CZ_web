import { nextStep, journeySummary } from "@/lib/journey-plan";
import type { JourneyData } from "@/lib/journey-store";
import type { Programme } from "@/data/types";

// Far in the future: getDeadlineStatus() compares with the real clock.
const NOW = Date.parse("2030-01-20T12:00:00Z");

const prog = {
  id: "test-prog",
  name: { en: "Test Programme", ar: "برنامج تجريبي" },
  applicationDeadline: "2030-03-01",
  deadlineType: "fixed",
  verification: { status: "verified", lastVerified: "2026-10-01", sourceUrl: "https://example.org" },
} as unknown as Programme;
const getProgramme = (id: string) => (id === prog.id ? prog : undefined);

const base: JourneyData = { version: 1, name: "", savedProgrammes: [], eligibilityDone: false, updatedAt: "" };
const withProg = (done: boolean): JourneyData => ({
  ...base,
  savedProgrammes: [{ programmeId: prog.id, addedAt: "", notes: "", checklist: [{ id: "apply", label: { en: "", ar: "" }, done }] }],
});
const goodAnswers = {
  highestEducation: "highschool", gpa: "85%", apostille: "yes", translation: "english", passportValid: "yes",
  proofOfFunds: "available", startWhen: "nextYear", englishCert: "yes",
};

describe("My Journey next step", () => {
  it("starts with the eligibility check when nothing is saved", () => {
    const s = nextStep(null, "en", getProgramme, NOW);
    expect(s.id).toBe("eligibility");
    expect(s.john).toBeUndefined();
  });

  it("follows the stage first: visa → mock interview, arrived → arrival plan and the course", () => {
    expect(nextStep({ ...base, stage: "visa" }, "en", getProgramme, NOW).john).toBe("interviewPrep");
    const arrived = nextStep({ ...base, stage: "arrived" }, "en", getProgramme, NOW);
    expect(arrived.john).toBe("arrivalSupport");
    expect(arrived.extra?.href).toBe("/courses");
  });

  it("offers the document review only for a verified deadline under 8 weeks with open tasks", () => {
    const urgent = nextStep(withProg(false), "en", getProgramme, NOW);
    expect(urgent.id).toBe("deadline");
    expect(urgent.john).toBe("documentReview");
    expect(urgent.title).toContain("40 days");
    expect(nextStep(withProg(true), "en", getProgramme, NOW).id).not.toBe("deadline");
    const far = Date.parse("2029-10-01T00:00:00Z");
    expect(nextStep(withProg(false), "en", getProgramme, far).id).not.toBe("deadline");
  });

  it("points at the top eligibility risk with its free guide and matched service", () => {
    const j = { ...base, eligibility: { answers: { ...goodAnswers, apostille: "unknown" }, savedAt: "" } };
    const s = nextStep(j, "en", getProgramme, NOW);
    expect(s.id).toBe("risk");
    expect(s.diy?.href).toBe("/application-guide");
    expect(s.john).toBe("documentReview");
  });

  it("sends no personal data in the summary", () => {
    const j = { ...withProg(false), stage: "documents" as const, eligibility: { answers: goodAnswers, savedAt: "" } };
    const text = journeySummary(j, "en", getProgramme);
    expect(text).toContain("Stage: Preparing documents");
    expect(text).toContain("Test Programme (2030-03-01)");
    expect(text).not.toMatch(/@|\+\d/);
  });
});
