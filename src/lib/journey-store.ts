import type { Programme } from "@/data/types";

export type ChecklistItem = {
  id: string;
  label: { en: string; ar: string };
  done: boolean;
};

export type SavedProgramme = {
  programmeId: string;
  addedAt: string;
  checklist: ChecklistItem[];
  notes: string;
};

export type JourneyData = {
  version: 1;
  name: string;
  savedProgrammes: SavedProgramme[];
  eligibilityDone: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "studyczechia-journey";

const DEFAULT_CHECKLIST: Omit<ChecklistItem, "done">[] = [
  { id: "apostille", label: { en: "Get diploma apostilled", ar: "صدّق شهادتك (أبوستيل)" } },
  { id: "translate", label: { en: "Translate documents to Czech", ar: "ترجم أوراقك للتشيكي" } },
  { id: "passport", label: { en: "Valid passport (6+ months)", ar: "جواز ساري (6 شهور على الأقل)" } },
  { id: "motivation", label: { en: "Write motivation letter", ar: "اكتب جواب الدافع" } },
  { id: "cv", label: { en: "Prepare CV / resume", ar: "جهّز السيرة الذاتية" } },
  { id: "language", label: { en: "Language certificate (if required)", ar: "شهادة لغة (لو مطلوبة)" } },
  { id: "funds", label: { en: "Proof of funds for visa", ar: "إثبات إن معاك فلوس كفاية للفيزا" } },
  { id: "apply", label: { en: "Submit application", ar: "ابعت طلب القبول" } },
  { id: "fee", label: { en: "Pay application fee", ar: "ادفع رسوم التقديم" } },
  { id: "visa", label: { en: "Apply for student visa", ar: "قدّم على فيزا طالب" } },
];

function freshChecklist(): ChecklistItem[] {
  return DEFAULT_CHECKLIST.map((c) => ({ ...c, done: false }));
}

export function loadJourney(): JourneyData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as JourneyData;
  } catch {
    return null;
  }
}

export function saveJourney(data: JourneyData): void {
  try {
    data.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

export function initJourney(name?: string): JourneyData {
  const data: JourneyData = {
    version: 1,
    name: name || "",
    savedProgrammes: [],
    eligibilityDone: false,
    updatedAt: new Date().toISOString(),
  };
  saveJourney(data);
  return data;
}

export function addProgrammeToJourney(programmeId: string): JourneyData {
  let data = loadJourney() || initJourney();
  if (data.savedProgrammes.some((p) => p.programmeId === programmeId)) return data;
  data.savedProgrammes.push({
    programmeId,
    addedAt: new Date().toISOString(),
    checklist: freshChecklist(),
    notes: "",
  });
  saveJourney(data);
  return data;
}

export function removeProgrammeFromJourney(programmeId: string): JourneyData {
  let data = loadJourney() || initJourney();
  data.savedProgrammes = data.savedProgrammes.filter((p) => p.programmeId !== programmeId);
  saveJourney(data);
  return data;
}

export function toggleChecklistItem(programmeId: string, itemId: string): JourneyData {
  let data = loadJourney() || initJourney();
  const prog = data.savedProgrammes.find((p) => p.programmeId === programmeId);
  if (prog) {
    const item = prog.checklist.find((c) => c.id === itemId);
    if (item) item.done = !item.done;
  }
  saveJourney(data);
  return data;
}

export function getJourneyProgress(saved: SavedProgramme): number {
  if (saved.checklist.length === 0) return 0;
  const done = saved.checklist.filter((c) => c.done).length;
  return Math.round((done / saved.checklist.length) * 100);
}

export function isProgrammeSaved(programmeId: string): boolean {
  const data = loadJourney();
  if (!data) return false;
  return data.savedProgrammes.some((p) => p.programmeId === programmeId);
}

export function getDaysUntilDeadline(deadline: string | undefined): number | null {
  if (!deadline) return null;
  const d = new Date(deadline);
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
