export type ConfidenceLevel = "official" | "university" | "secondary" | "community";

export type Verification = {
  lastVerified: string;
  sourceUrl: string;
  sourceType: ConfidenceLevel;
  verifiedBy: "studyczechia" | "community";
};

export type DegreeLevel = "Bachelor" | "Master" | "PhD";
export type Language = "English" | "Czech";

export type City =
  | "Prague"
  | "Brno"
  | "Olomouc"
  | "Zlín"
  | "Ostrava"
  | "Plzeň"
  | "Hradec Králové"
  | "Liberec"
  | "Mladá Boleslav"
  | "Ústí nad Labem"
  | "Pardubice"
  | "České Budějovice";

export type UniversityType = "public" | "private";

export type UniversityV2 = {
  id: string;
  name: string;
  nameLocal?: string;
  city: City;
  type: UniversityType;
  founded?: number;
  website: string;
  admissionsUrl?: string;
  contactEmail?: string;
  blurb: { en: string; ar: string };
  fields: string[];
  verification: Verification;
};

export type DeadlineType = "regular" | "rolling" | "multiple-rounds";
export type DeadlineStatus = "verified" | "not-verified" | "passed" | "rolling" | "not-published";

export type Programme = {
  id: string;
  universityId: string;
  faculty?: string;
  name: { en: string; ar?: string };
  degree: DegreeLevel;
  language: Language;
  field: string;
  subfield?: string;
  durationYears: number;
  tuitionEurPerYear: number;
  tuitionCzkPerYear?: number;
  tuitionNote?: string;
  applicationDeadline?: string;
  applicationDeadlineRound?: string;
  applicationOpenDate?: string;
  deadlineType?: DeadlineType;
  entranceExamDate?: string;
  applicationFeeEur?: number;
  entranceExam: boolean;
  entranceExamDetails?: { en: string; ar?: string };
  requiredDocuments?: string[];
  languageRequirement?: string;
  programmeUrl: string;
  verification: Verification;
};

export type TrustLevel = "official" | "experience" | "recommendation";
