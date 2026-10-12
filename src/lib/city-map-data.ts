// Data for <CityMap>: programmes per university city, and dorm rent where
// src/data/costs.ts has a sourced figure (Prague, Brno, Ostrava).
import { programmes } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { costCategories, type CityKey } from "@/data/costs";
import { CITY_COORDS } from "@/data/czech-map";
import type { MapCity } from "@/components/city-map";

const COST_KEY: Record<string, CityKey> = { Prague: "prague", Brno: "brno", Ostrava: "ostrava" };

export function cityMapData(): MapCity[] {
  const dorm = costCategories.find((c) => c.key === "dorm");
  return Object.keys(CITY_COORDS).map((name) => {
    const uniIds = new Set(universitiesV2.filter((u) => u.city === name).map((u) => u.id));
    const key = COST_KEY[name];
    return {
      name,
      programmes: programmes.filter((p) => uniIds.has(p.universityId)).length,
      ...(key && dorm ? { rent: dorm.monthlyCzk[key] } : {}),
    };
  });
}
