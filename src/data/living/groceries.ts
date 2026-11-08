/**
 * Supermarket prices for the "What can a day of work buy?" basket.
 *
 * Every price was read from the product's own page on rohlik.cz (an online
 * supermarket that delivers in Prague, Brno, Ostrava and other cities) on
 * CHECKED_ON, with no delivery address set. We store the regular shelf price.
 * When the page also showed an offer, it is recorded in `offerSeen` and shown
 * as a note, never used in the totals:
 *  - `personal`: Rohlík's "-10 % pro vás" style price for a new or logged-out
 *    customer, which not everyone gets;
 *  - `sale`: a public "Akce" with an end date.
 *
 * These are snapshots, not live prices. To refresh: open each `url`, copy the
 * regular price and pack size, update `CHECKED_ON`, run `npx vitest run test/living-data.test.ts`.
 * Discount supermarkets (Lidl, Kaufland, Penny, Albert, Billa) can be cheaper
 * in store; their shelf prices could not be verified automatically, so they
 * are not listed here.
 */

export const GROCERY_CHECKED_ON = "2026-11-08";

export type GroceryCategory = "protein" | "dairy" | "grains" | "produce" | "pantry";

export type GroceryItem = {
  id: string;
  name: { en: string; ar: string };
  /** The product name exactly as the retailer lists it. */
  product: string;
  /** What one tap of "+" adds: a pack, or a weight for loose produce. */
  pack: { en: string; ar: string };
  /** Price of one `pack`, CZK, regular shelf price. */
  priceCzk: number;
  /** Unit price at the regular price (the retailer shows the same figure without an offer). */
  unitPrice: { czk: number; per: "kg" | "l" | "egg" };
  /** Loose produce sold by weight: `priceCzk` is for the stated weight at the per-kg price. */
  byWeight?: boolean;
  offerSeen?: { priceCzk: number; kind: "personal" | "sale"; label: string; until?: string };
  retailer: "Rohlik.cz";
  url: string;
  checkedOn: string;
  category: GroceryCategory;
};

const ROHLIK = "Rohlik.cz" as const;
const c = GROCERY_CHECKED_ON;
const personal10 = (priceCzk: number, until?: string) =>
  ({ priceCzk, kind: "personal", label: "-10 % pro vás", ...(until ? { until } : {}) }) as const;

export const GROCERIES: GroceryItem[] = [
  {
    id: "chicken",
    name: { en: "Chicken breast fillets", ar: "صدور فراخ (فيليه)" },
    product: "Kuřecí prsní řízky od českého výrobce XXL balení",
    pack: { en: "1 kg, sold by weight", ar: "1 كجم، بالوزن" },
    priceCzk: 219.9,
    unitPrice: { czk: 219.9, per: "kg" },
    byWeight: true,
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1354045-kureci-prsni-rizky-od-ceskeho-vyrobce-xxl-baleni",
    checkedOn: c,
    category: "protein",
  },
  {
    id: "milk",
    name: { en: "Fresh semi-skimmed milk", ar: "لبن طازة نصف دسم" },
    product: "Miil Čerstvé mléko polotučné 1,5 % tuku",
    pack: { en: "1 litre", ar: "1 لتر" },
    priceCzk: 16.9,
    unitPrice: { czk: 16.9, per: "l" },
    offerSeen: personal10(15.21),
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1406203-miil-cerstve-mleko-polotucne-1-5-tuku",
    checkedOn: c,
    category: "dairy",
  },
  {
    id: "eggs",
    name: { en: "Eggs, size M", ar: "بيض مقاس M" },
    product: "Schubert Podestýlková vejce čerstvá M",
    pack: { en: "10 eggs", ar: "10 بيضات" },
    priceCzk: 59.9,
    unitPrice: { czk: 5.99, per: "egg" },
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1394444-schubert-podestylkova-vejce-cerstva-m",
    checkedOn: c,
    category: "protein",
  },
  {
    id: "rice",
    name: { en: "Long-grain rice", ar: "رز طويل الحبة" },
    product: "Kitchin Rýže dlouhozrnná",
    pack: { en: "1 kg", ar: "1 كجم" },
    priceCzk: 29.9,
    unitPrice: { czk: 29.9, per: "kg" },
    offerSeen: personal10(26.91),
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1454462-kitchin-ryze-dlouhozrnna",
    checkedOn: c,
    category: "grains",
  },
  {
    id: "pasta",
    name: { en: "Penne pasta", ar: "مكرونة بيني" },
    product: "Kitchin Penne rigate N. 144",
    pack: { en: "500 g", ar: "500 جم" },
    priceCzk: 15.9,
    unitPrice: { czk: 31.8, per: "kg" },
    offerSeen: personal10(14.31),
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1440348-kitchin-penne-rigate-n-144",
    checkedOn: c,
    category: "grains",
  },
  {
    id: "potatoes",
    name: { en: "Potatoes", ar: "بطاطس" },
    product: "Brambory konzumní pozdní přílohové typ B, balení",
    pack: { en: "2 kg bag", ar: "كيس 2 كجم" },
    priceCzk: 49.9,
    unitPrice: { czk: 24.95, per: "kg" },
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1298785-brambory-konzumni-pozdni-prilohove-typ-b-baleni",
    checkedOn: c,
    category: "produce",
  },
  {
    id: "bread",
    name: { en: "Wheat-rye bread", ar: "عيش قمح وشيلم" },
    product: "Pekárna Brod Chléb konzumní",
    pack: { en: "1.2 kg loaf", ar: "رغيف 1.2 كجم" },
    priceCzk: 44.9,
    unitPrice: { czk: 37.42, per: "kg" },
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1286389-pekarna-brod-chleb-konzumni",
    checkedOn: c,
    category: "grains",
  },
  {
    id: "yogurt",
    name: { en: "Plain yogurt", ar: "زبادي سادة" },
    product: "Miil Krémový jogurt bílý 3,7 % tuku",
    pack: { en: "150 g pot", ar: "علبة 150 جم" },
    priceCzk: 7.9,
    unitPrice: { czk: 52.67, per: "kg" },
    offerSeen: personal10(7.11),
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1406908-miil-kremovy-jogurt-bily-3-7-tuku",
    checkedOn: c,
    category: "dairy",
  },
  {
    id: "cheese",
    name: { en: "Edam cheese slices", ar: "جبنة إيدام شرائح" },
    product: "Miil Eidam 30% plátky",
    pack: { en: "100 g", ar: "100 جم" },
    priceCzk: 18.9,
    unitPrice: { czk: 189, per: "kg" },
    offerSeen: personal10(17.01),
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1413424-miil-eidam-30-platky",
    checkedOn: c,
    category: "dairy",
  },
  {
    id: "butter",
    name: { en: "Butter", ar: "زبدة" },
    product: "Miil Máslo 82%",
    pack: { en: "250 g", ar: "250 جم" },
    priceCzk: 36.9,
    unitPrice: { czk: 147.6, per: "kg" },
    offerSeen: personal10(33.21, "2026-12-13"),
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1462148-miil-maslo-82",
    checkedOn: c,
    category: "dairy",
  },
  {
    id: "apples",
    name: { en: "Gala apples", ar: "تفاح جالا" },
    product: "Jablko odr. Gala 1 ks",
    pack: { en: "1 kg, sold by weight", ar: "1 كجم، بالوزن" },
    priceCzk: 49.9,
    unitPrice: { czk: 49.9, per: "kg" },
    byWeight: true,
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1351255-jablko-odr-gala-1-ks",
    checkedOn: c,
    category: "produce",
  },
  {
    id: "bananas",
    name: { en: "Bananas", ar: "موز" },
    product: "Banán 1 ks",
    pack: { en: "1 kg, sold by weight", ar: "1 كجم، بالوزن" },
    priceCzk: 39.9,
    unitPrice: { czk: 39.9, per: "kg" },
    byWeight: true,
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1349777-banan-1-ks",
    checkedOn: c,
    category: "produce",
  },
  {
    id: "tomatoes",
    name: { en: "Tomatoes", ar: "طماطم" },
    product: "Rajče kulaté, volné 1 ks",
    pack: { en: "500 g, sold by weight", ar: "500 جم، بالوزن" },
    priceCzk: 49.95,
    unitPrice: { czk: 99.9, per: "kg" },
    byWeight: true,
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1349779-rajce-kulate-volne-1-ks",
    checkedOn: c,
    category: "produce",
  },
  {
    id: "onions",
    name: { en: "Yellow onions", ar: "بصل أصفر" },
    product: "Cibule žlutá, síť",
    pack: { en: "1 kg net", ar: "شبكة 1 كجم" },
    priceCzk: 24.9,
    unitPrice: { czk: 24.9, per: "kg" },
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1298821-cibule-zluta-sit",
    checkedOn: c,
    category: "produce",
  },
  {
    id: "carrots",
    name: { en: "Carrots", ar: "جزر" },
    product: "Mrkev praná čerstvá, balení",
    pack: { en: "1 kg bag", ar: "كيس 1 كجم" },
    priceCzk: 29.9,
    unitPrice: { czk: 29.9, per: "kg" },
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1289717-mrkev-prana-cerstva-baleni",
    checkedOn: c,
    category: "produce",
  },
  {
    id: "canned-tomatoes",
    name: { en: "Chopped tomatoes, tin", ar: "طماطم مقطعة معلبة" },
    product: "Kitchin Krájená loupaná rajčata v rajčatové šťávě",
    pack: { en: "400 g tin", ar: "علبة 400 جم" },
    priceCzk: 19.9,
    unitPrice: { czk: 49.75, per: "kg" },
    offerSeen: personal10(17.91),
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1440198-kitchin-krajena-loupana-rajcata-v-rajcatove-stave",
    checkedOn: c,
    category: "pantry",
  },
  {
    id: "lentils",
    name: { en: "Lentils", ar: "عدس" },
    product: "Kitchin Čočka",
    pack: { en: "500 g", ar: "500 جم" },
    priceCzk: 33.9,
    unitPrice: { czk: 67.8, per: "kg" },
    offerSeen: personal10(30.51),
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1455386-kitchin-cocka",
    checkedOn: c,
    category: "pantry",
  },
  {
    id: "oats",
    name: { en: "Wholegrain oat flakes", ar: "شوفان حبوب كاملة" },
    product: "Yutto Celozrnné ovesné vločky",
    pack: { en: "500 g", ar: "500 جم" },
    priceCzk: 11.9,
    unitPrice: { czk: 23.8, per: "kg" },
    offerSeen: personal10(10.71),
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1454579-yutto-celozrnne-ovesne-vlocky",
    checkedOn: c,
    category: "grains",
  },
  {
    id: "flour",
    name: { en: "Plain wheat flour", ar: "دقيق قمح" },
    product: "Kitchin Pšeničná mouka hladká",
    pack: { en: "1 kg", ar: "1 كجم" },
    priceCzk: 9.9,
    unitPrice: { czk: 9.9, per: "kg" },
    offerSeen: personal10(8.91),
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1480974-kitchin-psenicna-mouka-hladka",
    checkedOn: c,
    category: "pantry",
  },
  {
    id: "oil",
    name: { en: "Rapeseed cooking oil", ar: "زيت طبخ (كانولا)" },
    product: "Kitchin Řepkový olej",
    pack: { en: "1 litre", ar: "1 لتر" },
    priceCzk: 36.9,
    unitPrice: { czk: 36.9, per: "l" },
    offerSeen: personal10(33.21),
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1462232-kitchin-repkovy-olej",
    checkedOn: c,
    category: "pantry",
  },
  {
    id: "sugar",
    name: { en: "Granulated sugar", ar: "سكر" },
    product: "Kitchin Cukr krystal",
    pack: { en: "1 kg", ar: "1 كجم" },
    priceCzk: 17.9,
    unitPrice: { czk: 17.9, per: "kg" },
    offerSeen: personal10(16.11),
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1466508-kitchin-cukr-krystal",
    checkedOn: c,
    category: "pantry",
  },
  {
    id: "salt",
    name: { en: "Iodised salt", ar: "ملح باليود" },
    product: "Solné Mlýny Olomouc Jedlá sůl kamenná s jódem",
    pack: { en: "1 kg", ar: "1 كجم" },
    priceCzk: 9.9,
    unitPrice: { czk: 9.9, per: "kg" },
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/727667-solne-mlyny-olomouc-jedla-sul-kamenna-s-jodem",
    checkedOn: c,
    category: "pantry",
  },
  {
    id: "coffee",
    name: { en: "Ground coffee", ar: "بن مطحون" },
    product: "Ubomi Intense RFA mletá káva",
    pack: { en: "250 g", ar: "250 جم" },
    priceCzk: 64.9,
    unitPrice: { czk: 259.6, per: "kg" },
    offerSeen: personal10(58.41),
    retailer: ROHLIK,
    url: "https://www.rohlik.cz/1426038-ubomi-intense-rfa-mleta-kava",
    checkedOn: c,
    category: "pantry",
  },
];

export const GROCERY_BY_ID: Record<string, GroceryItem> = Object.fromEntries(GROCERIES.map((g) => [g.id, g]));

/** Quantities are in `pack`s (one tap of "+"). */
export type Basket = Record<string, number>;

export type BasketPresetId = "bigShop" | "cookingWeek" | "budgetWeek" | "comfortWeek";

/**
 * Ready-made baskets. `bigShop` is the list from the brief (3 kg chicken,
 * 12 l milk, 30 eggs...); the weekly ones are what one student might buy in
 * a week of cooking at home. They are illustrations, not diet advice.
 */
export const BASKET_PRESETS: Record<BasketPresetId, Basket> = {
  bigShop: {
    chicken: 3, milk: 12, eggs: 3, rice: 2, pasta: 4, potatoes: 1, sugar: 1, salt: 1, oil: 1,
    yogurt: 4, bread: 1, cheese: 2, apples: 1, bananas: 1, tomatoes: 2, onions: 1, carrots: 1, coffee: 1,
  },
  cookingWeek: {
    chicken: 1, milk: 3, eggs: 1, rice: 1, pasta: 2, potatoes: 1, yogurt: 4, bread: 1, cheese: 1,
    bananas: 1, apples: 1, onions: 1, carrots: 1, lentils: 1, oats: 1, "canned-tomatoes": 2, tomatoes: 1,
  },
  budgetWeek: {
    eggs: 2, lentils: 1, rice: 1, pasta: 2, potatoes: 1, milk: 3, oats: 1, bread: 1, bananas: 1,
    onions: 1, carrots: 1, "canned-tomatoes": 2, yogurt: 2, cheese: 1, chicken: 0.5,
  },
  comfortWeek: {
    chicken: 2, milk: 3, eggs: 1, rice: 1, pasta: 2, potatoes: 1, yogurt: 4, bread: 1, cheese: 2, butter: 1,
    bananas: 1, apples: 1, onions: 1, carrots: 1, lentils: 1, oats: 1, "canned-tomatoes": 2, tomatoes: 1, coffee: 1,
  },
};

/** Loose produce can be added in half-kilo steps; packs in whole units. */
export const stepFor = (item: GroceryItem) => (item.byWeight && item.id === "chicken" ? 0.5 : 1);
