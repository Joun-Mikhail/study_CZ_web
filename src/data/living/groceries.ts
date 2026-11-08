/**
 * A month of groceries and toiletries for one student who cooks at home,
 * priced on Rohlik.cz, an online supermarket that delivers in Prague, Brno and
 * Ostrava. Each item is a real product with its regular price (no member or
 * welcome discounts) on the day we checked. Delivery fees are not included.
 *
 * The quantities are our own assumption, not a statistic: about 2,300 kcal a day,
 * built on rice, pasta, bread, potatoes, chicken, eggs, dairy, lentils, fruit and
 * vegetables. Change them here and every total follows.
 */
export type BasketItem = {
  /** Rohlik product id; the product page is https://www.rohlik.cz/<id>-<slug>. */
  id: number;
  slug: string;
  /** Product name as Rohlik lists it. */
  product: string;
  label: { en: string; ar: string };
  /** Pack size as Rohlik lists it. */
  pack: string;
  packCzk: number;
  /** Packs used in a month; a fraction means one pack lasts several months. */
  packsPerMonth: number;
};

export const ROHLIK_CHECKED_ON = "2026-11-08";

export const rohlikUrl = (item: BasketItem) => `https://www.rohlik.cz/${item.id}-${item.slug}`;

export const FOOD_BASKET: BasketItem[] = [
  { id: 1454462, slug: "kitchin-ryze-dlouhozrnna", product: "Kitchin Rýže dlouhozrnná", label: { en: "Long-grain rice", ar: "أرز طويل الحبة" }, pack: "1 kg", packCzk: 29.9, packsPerMonth: 2 },
  { id: 1440333, slug: "kitchin-spaghetti-n-5", product: "Kitchin Spaghetti N. 5", label: { en: "Spaghetti", ar: "مكرونة سباجيتي" }, pack: "500 g", packCzk: 15.9, packsPerMonth: 4 },
  { id: 1286389, slug: "pekarna-brod-chleb-konzumni", product: "Pekárna Brod Chléb konzumní", label: { en: "Bread", ar: "خبز" }, pack: "1.2 kg", packCzk: 44.9, packsPerMonth: 4 },
  { id: 1328143, slug: "brambory-neprane-konzumni-pozdni-baleni", product: "Brambory neprané konzumní pozdní, balení", label: { en: "Potatoes", ar: "بطاطس" }, pack: "5 kg", packCzk: 119.9, packsPerMonth: 1 },
  { id: 1406564, slug: "kureci-stehna-od-ceskeho-vyrobce", product: "Kuřecí stehna od českého výrobce", label: { en: "Chicken thighs", ar: "أوراك دجاج" }, pack: "about 500 g", packCzk: 49.95, packsPerMonth: 6 },
  { id: 1394444, slug: "schubert-podestylkova-vejce-cerstva-m", product: "Schubert Podestýlková vejce čerstvá M", label: { en: "Eggs", ar: "بيض" }, pack: "10 eggs", packCzk: 59.9, packsPerMonth: 3 },
  { id: 1441840, slug: "miil-trvanlive-polotucne-mleko-1-5", product: "Miil Trvanlivé polotučné mléko 1,5%", label: { en: "Milk", ar: "حليب" }, pack: "1 l", packCzk: 13.9, packsPerMonth: 8 },
  { id: 1406914, slug: "miil-kremovy-jogurt-bily-3-7-tuku", product: "Miil Krémový jogurt bílý 3,7 % tuku", label: { en: "Plain yoghurt", ar: "زبادي سادة" }, pack: "400 g", packCzk: 17.9, packsPerMonth: 6 },
  { id: 1413425, slug: "miil-eidam-30-blocek", product: "Miil Eidam 30% bloček", label: { en: "Cheese (Edam)", ar: "جبن إيدام" }, pack: "250 g", packCzk: 43.9, packsPerMonth: 4 },
  { id: 1455386, slug: "kitchin-cocka", product: "Kitchin Čočka", label: { en: "Lentils", ar: "عدس" }, pack: "500 g", packCzk: 33.9, packsPerMonth: 2 },
  { id: 1298821, slug: "cibule-zluta-sit", product: "Cibule žlutá, síť", label: { en: "Onions", ar: "بصل" }, pack: "1 kg", packCzk: 24.9, packsPerMonth: 2 },
  { id: 1289717, slug: "mrkev-prana-cerstva-baleni", product: "Mrkev praná čerstvá, balení", label: { en: "Carrots", ar: "جزر" }, pack: "1 kg", packCzk: 29.9, packsPerMonth: 2 },
  { id: 1457810, slug: "kitchin-passata-di-pomodoro-loupana-pasirovana-rajcata", product: "Kitchin Passata di pomodoro", label: { en: "Tomato passata", ar: "صلصة طماطم" }, pack: "500 g", packCzk: 19.9, packsPerMonth: 4 },
  { id: 1407981, slug: "bohemia-apple-golden-golden-delicious-jablka-nestandard-bedynka", product: "Bohemia Apple Golden delicious jablka, bedýnka", label: { en: "Apples", ar: "تفاح" }, pack: "5 kg", packCzk: 169.9, packsPerMonth: 1 },
  { id: 1375865, slug: "banany-baleni", product: "Banány, balení", label: { en: "Bananas", ar: "موز" }, pack: "about 0.68 kg", packCzk: 34.02, packsPerMonth: 3 },
  { id: 1462230, slug: "kitchin-slunecnicovy-olej", product: "Kitchin Slunečnicový olej", label: { en: "Sunflower oil", ar: "زيت عباد الشمس" }, pack: "1 l", packCzk: 36.9, packsPerMonth: 1 },
  { id: 1466508, slug: "kitchin-cukr-krystal", product: "Kitchin Cukr krystal", label: { en: "Sugar", ar: "سكر" }, pack: "1 kg", packCzk: 17.9, packsPerMonth: 1 },
];

export const HOUSEHOLD_BASKET: BasketItem[] = [
  { id: 1469051, slug: "moddia-toaletni-papir-2vrstvy-8-ks", product: "Moddia Toaletní papír 2vrstvý, 8 ks", label: { en: "Toilet paper", ar: "ورق تواليت" }, pack: "8 rolls", packCzk: 64.9, packsPerMonth: 1 },
  { id: 1296449, slug: "odol-classic-zubni-pasta-pro-beznou-peci", product: "Odol Classic zubní pasta", label: { en: "Toothpaste", ar: "معجون أسنان" }, pack: "75 ml", packCzk: 43.9, packsPerMonth: 1 },
  { id: 1448094, slug: "isana-sampon-pro-hedvabny-lesk", product: "ISANA Šampon pro hedvábný lesk", label: { en: "Shampoo", ar: "شامبو" }, pack: "300 ml", packCzk: 29.9, packsPerMonth: 1 },
  { id: 1456379, slug: "laguna-praci-gel-na-detske-pradlo-1-5-l", product: "Laguna Prací gel (1,5 l)", label: { en: "Laundry gel (42 washes)", ar: "جل غسيل (42 غسلة)" }, pack: "1.5 l", packCzk: 144.9, packsPerMonth: 0.25 },
  { id: 1456894, slug: "domol-prostredek-na-nadobi-orange", product: "Domol Prostředek na nádobí Orange", label: { en: "Washing-up liquid", ar: "سائل غسيل أطباق" }, pack: "1 l", packCzk: 39.9, packsPerMonth: 0.5 },
];

export const basketCzk = (items: BasketItem[]) => items.reduce((sum, i) => sum + i.packCzk * i.packsPerMonth, 0);
