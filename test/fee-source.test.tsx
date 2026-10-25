import { screen } from "@testing-library/react";
import { programmes } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { FEE_CHECKS } from "@/data/fee-checks";
import { APPLICABLE_ACADEMIC_YEARS, DIRECTORY_SOURCES, feeStatus, feeVerified } from "@/lib/fee-source";
import { ProgrammeSourceBadge } from "@/components/ui/programme-source-badge";
import ProgrammeDetailClient from "@/app/programmes/[slug]/ProgrammeDetailClient";
import { renderAt } from "./render";

const verified = programmes.find(feeVerified)!;
const pending = programmes.find((p) => feeStatus(p) === "pending")!;
const unverified = programmes.find((p) => feeStatus(p) === "unverified")!;
const uniOf = (id: string) => universitiesV2.find((u) => u.id === id) ?? null;

describe("fee status", () => {
  it("never verifies a fee whose source is a directory, portal or home page", () => {
    for (const p of programmes) {
      const url = new URL(p.verification.sourceUrl);
      const website = uniOf(p.universityId)?.website?.replace(/\/+$/, "");
      const generic =
        DIRECTORY_SOURCES.has(p.verification.sourceUrl) ||
        url.hostname.endsWith("studyin.gov.cz") ||
        url.pathname.replace(/\/+$/, "") === "" ||
        p.verification.sourceUrl.replace(/\/+$/, "") === website;
      if (generic) expect(feeStatus(p), `${p.id} cites ${p.verification.sourceUrl}`).toBe("unverified");
    }
  });

  it("verifies only fees with a recorded check of the exact amount, currency and academic year", () => {
    for (const p of programmes.filter(feeVerified)) {
      const check = FEE_CHECKS[p.id];
      expect(check?.status).toBe("verified");
      expect(check?.sourceUrl).toBe(p.verification.sourceUrl);
      expect(check?.currency).toBe("EUR");
      expect(check?.amount).toBe(p.tuitionEurPerYear);
      expect(APPLICABLE_ACADEMIC_YEARS.has(check!.academicYear!)).toBe(true);
    }
  });

  it("drops a verified fee to pending when the displayed amount no longer matches the check", () => {
    expect(feeStatus({ ...verified, tuitionEurPerYear: verified.tuitionEurPerYear + 1 })).toBe("pending");
  });

  it("does not verify a fee checked for an earlier academic year", () => {
    const check = FEE_CHECKS[verified.id];
    FEE_CHECKS[verified.id] = { ...check, academicYear: "2025/2026" };
    try {
      expect(feeStatus(verified)).toBe("pending");
    } finally {
      FEE_CHECKS[verified.id] = check;
    }
  });

  it("never auto-verifies a programme without a check record", () => {
    const fresh = { ...verified, id: "not-in-fee-checks" };
    expect(feeStatus(fresh)).toBe("pending");
  });

  it("matches the source checks of 25 Oct 2026 (update when sources are re-verified)", () => {
    const count = (s: string) => programmes.filter((p) => feeStatus(p) === s).length;
    expect({ verified: count("verified"), pending: count("pending"), unverified: count("unverified") }).toEqual({
      verified: 2,
      pending: 15,
      unverified: 74,
    });
  });
});

describe("ProgrammeSourceBadge", () => {
  it("labels a verified fee as verified, linking its source", () => {
    renderAt(<ProgrammeSourceBadge programme={verified} locale="en" />, "/");
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent(`Verified: ${verified.verification.lastVerified}`);
    expect(link).toHaveAttribute("href", verified.verification.sourceUrl);
  });

  it("does not call a pending fee verified, and links its relevant source", () => {
    const { container } = renderAt(<ProgrammeSourceBadge programme={pending} locale="en" />, "/");
    expect(container.textContent).toContain("Fee being re-checked");
    expect(container.textContent).not.toContain("Verified");
    expect(screen.getByRole("link")).toHaveAttribute("href", pending.verification.sourceUrl);
  });

  it("does not call an unverified fee verified, in either language, and links the university page", () => {
    const { container, unmount } = renderAt(<ProgrammeSourceBadge programme={unverified} locale="en" />, "/");
    expect(container.textContent).toContain("Fee being re-checked");
    expect(container.textContent).not.toContain("Verified");
    expect(screen.getByRole("link")).toHaveAttribute("href", unverified.programmeUrl);
    unmount();
    const ar = renderAt(<ProgrammeSourceBadge programme={unverified} locale="ar" />, "/ar/");
    expect(ar.container.textContent).toContain("نراجع الرسوم حاليًا");
    expect(ar.container.textContent).not.toContain("تم التحقق");
  });
});

describe("ProgrammeDetailClient source section", () => {
  for (const [label, p] of [["pending", () => pending], ["unverified", () => unverified]] as const) {
    it(`drops the official-source claim for a ${label} fee`, () => {
      const prog = p();
      const { container } = renderAt(
        <ProgrammeDetailClient programme={prog} university={uniOf(prog.universityId)} total={programmes.length} />,
        `/programmes/${prog.id}/`,
      );
      expect(container.textContent).toContain("We have not yet matched this fee to the university's own fee page");
      expect(container.textContent).not.toContain("All information on this page comes from the university's official website");
      expect(container.textContent).not.toContain("Verified by Study Czechia");
    });
  }

  it("keeps it for a verified fee", () => {
    const { container } = renderAt(
      <ProgrammeDetailClient programme={verified} university={uniOf(verified.universityId)} total={programmes.length} />,
      `/programmes/${verified.id}/`,
    );
    expect(container.textContent).toContain("All information on this page comes from the university's official website");
    expect(container.textContent).toContain(`Verified: ${verified.verification.lastVerified}`);
  });
});
