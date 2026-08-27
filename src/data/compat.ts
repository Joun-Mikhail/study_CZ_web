import type { University } from "./universities";
import type { UniversityV2, DegreeLevel } from "./types";
import { universitiesV2 } from "./universities-v2";
import { programmes, getProgrammesByUniversity } from "./programmes";

export function toV1(uni: UniversityV2): University {
  const progs = getProgrammesByUniversity(uni.id);
  const languages = Array.from(
    new Set(progs.length > 0 ? progs.map((p) => p.language) : ["English", "Czech"] as const)
  ) as ("English" | "Czech")[];

  const tuitions = progs.map((p) => p.tuitionEurPerYear);
  const tuitionRange: [number, number] = tuitions.length > 0
    ? [Math.min(...tuitions), Math.max(...tuitions)]
    : [0, 0];

  const degrees = Array.from(
    new Set(progs.length > 0 ? progs.map((p) => p.degree) : ["Bachelor", "Master"] as const)
  ).filter((d): d is "Bachelor" | "Master" => d === "Bachelor" || d === "Master");

  return {
    id: uni.id,
    name: uni.name,
    city: uni.city,
    languages,
    fields: uni.fields,
    tuitionEurPerYear: tuitionRange,
    degreeLevels: degrees,
    blurb: uni.blurb,
    founded: uni.founded,
    website: uni.website,
    contactEmail: uni.contactEmail,
    programs: progs.map((p) => ({
      name: p.name,
      degree: p.degree as "Bachelor" | "Master",
      language: p.language,
    })),
    englishProgramCount: progs.filter((p) => p.language === "English").length || undefined,
  };
}

export function getAllUniversitiesV1(): University[] {
  return universitiesV2.map(toV1);
}

export function getUniversityV2(id: string): UniversityV2 | undefined {
  return universitiesV2.find((u) => u.id === id);
}
