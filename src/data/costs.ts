// Baseline figures are community-reported general averages for the Czech Republic
// (dorm rent, food, insurance, transport, phone, laundry). Per-city figures apply
// commonly observed relative cost differences between Prague/Brno/Ostrava and are
// approximations, not official statistics — always confirm current numbers with
// your specific university and city before budgeting.

export type CityKey = "prague" | "brno" | "ostrava";

export type CostCategory = {
  key: string;
  label: { en: string; ar: string };
  monthlyCzk: Record<CityKey, [number, number]>; // [min, max] CZK per month
};

export const cities: { key: CityKey; label: { en: string; ar: string } }[] = [
  { key: "prague", label: { en: "Prague", ar: "براغ" } },
  { key: "brno", label: { en: "Brno", ar: "برنو" } },
  { key: "ostrava", label: { en: "Ostrava", ar: "أوسترافا" } },
];

export const costCategories: CostCategory[] = [
  {
    key: "dorm",
    label: { en: "Dorm rent (shared room)", ar: "إيجار السكن الجامعي (غرفة مشتركة)" },
    monthlyCzk: { prague: [4500, 6500], brno: [3800, 5500], ostrava: [3200, 4800] },
  },
  {
    key: "food",
    label: { en: "Food & groceries", ar: "الأكل والمشتريات" },
    monthlyCzk: { prague: [2800, 4500], brno: [2500, 4000], ostrava: [2200, 3600] },
  },
  {
    key: "transport",
    label: { en: "Transport (student discount)", ar: "المواصلات (خصم طالب)" },
    monthlyCzk: { prague: [150, 200], brno: [140, 190], ostrava: [130, 180] },
  },
  {
    key: "insurance",
    label: { en: "Health insurance", ar: "التأمين الصحي" },
    monthlyCzk: { prague: [1100, 1600], brno: [1100, 1600], ostrava: [1100, 1600] },
  },
  {
    key: "phone",
    label: { en: "Mobile plan", ar: "شحن الموبايل" },
    monthlyCzk: { prague: [300, 500], brno: [300, 500], ostrava: [300, 500] },
  },
  {
    key: "misc",
    label: { en: "Laundry & misc.", ar: "الغسيل ومصاريف متنوعة" },
    monthlyCzk: { prague: [400, 700], brno: [350, 650], ostrava: [300, 600] },
  },
];

export function totalRange(city: CityKey): [number, number] {
  return costCategories.reduce(
    (acc, cat) => {
      const [min, max] = cat.monthlyCzk[city];
      return [acc[0] + min, acc[1] + max];
    },
    [0, 0] as [number, number]
  );
}

export const oneTimeCosts = {
  accommodationDeposit: [5000, 15000] as [number, number],
  minBankBalance: 115810,
  tuitionEnglishPerYear: [15000, 250000] as [number, number],
};
