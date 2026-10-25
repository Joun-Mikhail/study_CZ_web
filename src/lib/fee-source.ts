import type { Programme } from "@/data/types";
import { universitiesV2 } from "@/data/universities-v2";
import { FEE_CHECKS } from "@/data/fee-checks";

/**
 * How well a programme's displayed fee is backed by its linked source:
 * - verified: a recorded check found this exact amount, currency and academic year on the source;
 * - pending: the source is relevant, but the exact fee has not been confirmed on it;
 * - unverified: the source is a directory, a home page, broken, or no longer about the fee.
 * No record in programmes.ts is changed, so the next source-verification pass can
 * fix the sources and the labels follow.
 */
export type FeeStatus = "verified" | "pending" | "unverified";

/** Listing pages that name universities or programmes but show no fees. */
export const DIRECTORY_SOURCES = new Set(["https://studyin.gov.cz/plan-your-studies/universities/"]);

/**
 * Cited source pages that returned HTTP 404 when checked on 2026-10-25.
 * Remove an entry once its programmes point to a working fee page.
 */
export const BROKEN_SOURCES = new Set([
  "https://www.vse.cz/english/admissions/bachelor-programs/",
  "https://www.vse.cz/english/admissions/master-programs/",
  "https://www.cvut.cz/en/admissions",
  "https://fit.cvut.cz/en/study/bachelor-programs",
  "https://www.vutbr.cz/en/admission",
  "https://www.fit.vut.cz/study/program/.en",
  "https://www.vscht.cz/EN/study/programs",
  "https://www.vsb.cz/en/study/study-programmes/",
]);

/** Academic years a verified fee may apply to; a fee checked for an older year is only pending. */
export const APPLICABLE_ACADEMIC_YEARS = new Set(["2026/2027"]);

const trimSlash = (u: string) => u.replace(/\/+$/, "");

/** A university's home page is not a fee page either. */
function isHomePage(p: Programme): boolean {
  const uni = universitiesV2.find((u) => u.id === p.universityId);
  const src = trimSlash(p.verification.sourceUrl);
  if (uni?.website && src === trimSlash(uni.website)) return true;
  try {
    return new URL(p.verification.sourceUrl).pathname.replace(/\/+$/, "") === "";
  } catch {
    return true;
  }
}

export function feeStatus(p: Programme): FeeStatus {
  const src = p.verification.sourceUrl;
  if (!src || DIRECTORY_SOURCES.has(src) || BROKEN_SOURCES.has(src) || isHomePage(p)) return "unverified";
  const check = FEE_CHECKS[p.id];
  // A check only counts while the programme still shows what was checked.
  if (!check || check.sourceUrl !== src) return "pending";
  if (check.status !== "verified") return check.status;
  const matches =
    check.currency === "EUR" &&
    check.amount === p.tuitionEurPerYear &&
    !!check.academicYear &&
    APPLICABLE_ACADEMIC_YEARS.has(check.academicYear);
  return matches ? "verified" : "pending";
}

/** Only these fees may be labelled "Verified" or stated as a price in structured data. */
export const feeVerified = (p: Programme) => feeStatus(p) === "verified";
