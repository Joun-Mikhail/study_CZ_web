import { universitiesV2 } from "@/data/universities-v2";
import type { Programme } from "@/data/types";

/** "Programme name · University", for pick lists. */
export function programmeLabel(p: Programme, locale: "en" | "ar"): string {
  const uni = universitiesV2.find((u) => u.id === p.universityId);
  const name = p.name[locale] || p.name.en;
  return uni ? `${name} · ${uni.name}` : name;
}
