// Every photo on the site, with where it came from. Use photos through
// <SiteImage id="..."> (src/components/site-image.tsx) so alt text, sizes and
// credits stay in one place. Credits for Commons photos are listed on
// /why-czechia/ and /about/ (<PhotoCredits />).
//
// Honesty rule: stock photos of people are never presented as our students.
// John's own photos replace stock as they arrive (docs/PHOTOS.md).

export type ImageOrigin = "own" | "stock" | "commons";

export type SiteImageEntry = {
  src: string;
  width: number;
  height: number;
  alt: { en: string; ar: string };
  /** Author, as the source asks to be credited. */
  credit: string;
  license: string;
  licenseUrl?: string;
  sourceUrl?: string;
  origin: ImageOrigin;
  /** Dominant colour, painted while the photo loads (far cheaper than a blur image in the JS bundle). */
  color: string;
};

const STOCK = { credit: "Unsplash / Pexels", license: "Unsplash / Pexels free licence", origin: "stock" as const };

export const IMAGES = {
  "prague-cityscape": { src: "/images/prague-cityscape.jpg", color: "#c8c8c8", width: 1400, height: 933, alt: { en: "Prague rooftops and the Vltava", ar: "أسطح براغ ونهر الفلتافا" }, ...STOCK },
  "prague-bridge": { src: "/images/prague-bridge.jpg", color: "#d8e8e8", width: 1280, height: 854, alt: { en: "Prague rooftops", ar: "أسطح براغ" }, ...STOCK },
  "prague-scenic": { src: "/images/prague-scenic.jpg", color: "#281818", width: 1280, height: 1920, alt: { en: "A Prague street", ar: "شارع في براغ" }, ...STOCK },
  "prague-architecture": { src: "/images/prague-architecture.jpg", color: "#a89898", width: 1400, height: 933, alt: { en: "Prague riverside architecture", ar: "مباني براغ على النهر" }, ...STOCK },
  "prague-old-town": { src: "/images/prague-old-town.jpg", color: "#a8b8b8", width: 1400, height: 933, alt: { en: "Prague Old Town", ar: "البلدة القديمة في براغ" }, ...STOCK },
  "university-campus": { src: "/images/university-campus.jpg", color: "#080808", width: 1400, height: 933, alt: { en: "A university building", ar: "مبنى جامعة" }, ...STOCK },
  "students-group": { src: "/images/students-group.jpg", color: "#b8b8a8", width: 1400, height: 2100, alt: { en: "A group of students (stock photo)", ar: "مجموعة طلاب (صورة توضيحية)" }, ...STOCK },
  "students-studying": { src: "/images/students-studying.jpg", color: "#c8c8c8", width: 1400, height: 933, alt: { en: "Students studying together (stock photo)", ar: "طلاب بيذاكروا مع بعض (صورة توضيحية)" }, ...STOCK },
  john: { src: "/images/john.jpg", color: "#98b8e8", width: 3024, height: 4032, alt: { en: "John", ar: "جون" }, credit: "John", license: "Own photo", origin: "own" as const },
  "city-prague": {
    src: "/images/cities/prague.jpg", color: "#b8a888",
    width: 1600,
    height: 1200,
    alt: { en: "Bridges over the Vltava in Prague at dusk", ar: "جسور نهر الفلتافا في براغ وقت الغروب" },
    credit: "john mcsporran from Trossachs, Scotland",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Prague_(16651316979).jpg",
    origin: "commons",
  },
  "city-brno": {
    src: "/images/cities/brno.jpg", color: "#5888c8",
    width: 1600,
    height: 1200,
    alt: { en: "Brno from Špilberk, with the Cathedral of St Peter and Paul", ar: "برنو من قلعة شبيلبيرك، ومعاها كاتدرائية القديسين بطرس وبولس" },
    credit: "Petr.adamek",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Brno-%C5%A0pilberk_1.jpg",
    origin: "commons",
  },
  "city-ostrava": {
    src: "/images/cities/ostrava.jpg", color: "#c8c8e8",
    width: 1600,
    height: 1181,
    alt: { en: "Masaryk Square in the centre of Ostrava", ar: "ميدان ماساريك في وسط أوسترافا" },
    credit: "Palickap",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ostrava,_Masarykovo_n%C3%A1m%C4%9Bst%C3%AD_(1).jpg",
    origin: "commons",
  },
  "city-hradec-kralove": {
    src: "/images/cities/hradec-kralove.jpg", color: "#68b8f8",
    width: 1600,
    height: 1173,
    alt: { en: "The Great Square in Hradec Králové", ar: "الميدان الكبير في هراديتس كرالوفيه" },
    credit: "Palickap",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hradec_Kr%C3%A1lov%C3%A9,_Velk%C3%A9_n%C3%A1m%C4%9Bst%C3%AD_z%C3%A1pad.jpg",
    origin: "commons",
  },
  "city-ceske-budejovice": {
    src: "/images/cities/ceske-budejovice.jpg", color: "#7898b8",
    width: 1600,
    height: 1200,
    alt: { en: "Colourful houses on the main square of České Budějovice", ar: "بيوت ملونة في الميدان الرئيسي في تشيسكي بوديوفيتسه" },
    credit: "Pudelek (Marcin Szala)",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:N%C3%A1m%C4%9Bst%C3%AD_P%C5%99emysla_Otakara_II_(%C4%8Cesk%C3%A9_Bud%C4%9Bjovice)_-_houses.jpg",
    origin: "commons",
  },
  "city-plzen": {
    src: "/images/cities/plzen.jpg", color: "#887878",
    width: 1600,
    height: 1067,
    alt: { en: "Plzeň old town seen from the cathedral tower", ar: "البلدة القديمة في بلزن من برج الكاتدرائية" },
    credit: "Gerd Eichmann",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Plze%C5%88-N%C3%A1m%C4%9Bst%C3%AD_Republiky-60-vom_Bartholomaeuskirchturm-2012-gje.jpg",
    origin: "commons",
  },
  "city-olomouc": {
    src: "/images/cities/olomouc.jpg", color: "#7888a8",
    width: 1600,
    height: 1074,
    alt: { en: "The Upper Square in Olomouc", ar: "الميدان العلوي في أولوموتس" },
    credit: "Pudelek",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Olomouc,_Horn%C3%AD_n%C3%A1m%C4%9Bst%C3%AD_(2017).jpg",
    origin: "commons",
  },
  "city-usti-nad-labem": {
    src: "/images/cities/usti-nad-labem.jpg", color: "#080808",
    width: 1600,
    height: 1200,
    alt: { en: "Panorama of Ústí nad Labem", ar: "منظر عام لأوستي ناد لابم" },
    credit: "Artur Kroc",
    license: "Public domain",
    licenseUrl: "",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Usti_nad_Labem_panorama.JPG",
    origin: "commons",
  },
  "city-zlin": {
    src: "/images/cities/zlin.jpg", color: "#181808",
    width: 1600,
    height: 1200,
    alt: { en: "The Baťa skyscraper in Zlín at night", ar: "ناطحة سحاب باتا في زلين بالليل" },
    credit: "Palickap",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Zl%C3%ADn,_Ba%C5%A5%C5%AFv_mrakodrap_v_noci.jpg",
    origin: "commons",
  },
  "city-pardubice": {
    src: "/images/cities/pardubice.jpg", color: "#f8f8f8",
    width: 1600,
    height: 1200,
    alt: { en: "Pernštýn Square in Pardubice", ar: "ميدان بيرنشتين في باردوبيتسه" },
    credit: "Palickap",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Pardubice,_Pern%C5%A1t%C3%BDnsk%C3%A9_n%C3%A1m%C4%9Bst%C3%AD_(2).jpg",
    origin: "commons",
  },
  "city-opava": {
    src: "/images/cities/opava.jpg", color: "#c8c8c8",
    width: 1600,
    height: 901,
    alt: { en: "The Upper Square in Opava", ar: "الميدان العلوي في أوبافا" },
    credit: "Vojtěch Dočkal",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Opava,_Horn%C3%AD_n%C3%A1m%C4%9Bst%C3%AD_(srpen_2022).jpg",
    origin: "commons",
  },
  "city-mlada-boleslav": {
    src: "/images/cities/mlada-boleslav.jpg", color: "#080818",
    width: 1600,
    height: 1200,
    alt: { en: "The Old Town Square in Mladá Boleslav", ar: "ميدان البلدة القديمة في ملادا بوليسلاف" },
    credit: "Vojtěch Dočkal",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mlad%C3%A1_Boleslav,_Starom%C4%9Bstsk%C3%A9_n%C3%A1m%C4%9Bst%C3%AD.jpg",
    origin: "commons",
  },
  "city-liberec": {
    src: "/images/cities/liberec.jpg", color: "#f8f8f8",
    width: 1600,
    height: 1200,
    alt: { en: "Liberec town hall", ar: "مبنى بلدية ليبيريتس" },
    credit: "Hardric",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Radnice_m%C4%9Bsta_Liberec-ze_strany.JPG",
    origin: "commons",
  },
  "city-jihlava": {
    src: "/images/cities/jihlava.jpg", color: "#786868",
    width: 1600,
    height: 1200,
    alt: { en: "St Ignatius Church on Masaryk Square in Jihlava", ar: "كنيسة القديس إغناطيوس في ميدان ماساريك في ييهلافا" },
    credit: "Ladis62",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kostel_Sv.Ign%C3%A1ce_na_Masarykov%C4%9B_n%C3%A1m%C4%9Bst%C3%AD-Jihlava.JPG",
    origin: "commons",
  },
  "uni-ctu": {
    src: "/images/universities/ctu.jpg", color: "#f8f8f8",
    width: 1600,
    height: 1067,
    alt: { en: "The CTU Faculty of Architecture building in Dejvice, Prague", ar: "مبنى كلية العمارة في جامعة براغ التقنية (ČVUT) في ديفيتسه" },
    credit: "Krokodyl",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:CVUT_Fakulta_architektury_Dejvice_6528.JPG",
    origin: "commons",
  },
  "uni-cuni": {
    src: "/images/universities/cuni.jpg", color: "#f8f8f8",
    width: 1600,
    height: 1200,
    alt: { en: "A Charles University building in Prague", ar: "مبنى من مباني جامعة تشارلز في براغ" },
    credit: "Rémi Diligent",
    license: "Public domain",
    licenseUrl: "",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Prague_Charles_University.JPG",
    origin: "commons",
  },
  "uni-cuni-hradec": {
    src: "/images/universities/cuni-hradec.jpg", color: "#d8e8f8",
    width: 1600,
    height: 1189,
    alt: { en: "The Faculty of Medicine building in Hradec Králové", ar: "مبنى كلية الطب في هراديتس كرالوفيه" },
    credit: "Palickap",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hradec_Kr%C3%A1lov%C3%A9,_l%C3%A9ka%C5%99sk%C3%A1_fakulta.jpg",
    origin: "commons",
  },
  "uni-cuni-plzen": {
    src: "/images/universities/cuni-plzen.jpg", color: "#f8f8f8",
    width: 1600,
    height: 1134,
    alt: { en: "The Faculty of Medicine in Plzeň", ar: "كلية الطب في بلزن" },
    credit: "Ing. Ladislav Coufal",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sou%C4%8Dasn%C3%A1_L%C3%A9ka%C5%99sk%C3%A1_fakulta_Univerzity_Karlovy,_bo%C4%8Dn%C3%AD_vchod.jpg",
    origin: "commons",
  },
  "uni-mendelu": {
    src: "/images/universities/mendelu.jpg", color: "#a8d8f8",
    width: 1600,
    height: 961,
    alt: { en: "A Mendel University building in Brno", ar: "مبنى من مباني جامعة مندل في برنو" },
    credit: "VitVit",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Brno_MendelUni_6.jpg",
    origin: "commons",
  },
  "uni-uct": {
    src: "/images/universities/uct.jpg", color: "#f8f8f8",
    width: 1600,
    height: 1200,
    alt: { en: "A University of Chemistry and Technology building in Prague", ar: "مبنى من مباني جامعة الكيمياء والتكنولوجيا في براغ" },
    credit: "Marie Čcheidzeová",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Technick%C3%A1_5.jpg",
    origin: "commons",
  },
  "uni-uvb": {
    src: "/images/universities/uvb.jpg", color: "#f8f8f8",
    width: 1600,
    height: 1067,
    alt: { en: "The rectorate of the University of Veterinary Sciences Brno", ar: "مبنى رئاسة جامعة العلوم البيطرية في برنو" },
    credit: "Martin Strachoň",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Brno,_VFU,_rektor%C3%A1t_(7262).jpg",
    origin: "commons",
  },
  "uni-vsb": {
    src: "/images/universities/vsb.jpg", color: "#986868",
    width: 1600,
    height: 900,
    alt: { en: "VŠB – Technical University of Ostrava, Centre for Advanced Innovation Technologies", ar: "جامعة VŠB التقنية في أوسترافا، مركز التكنولوجيا المتقدمة" },
    credit: "V0lkanic",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Centrum_pokro%C4%8Dil%C3%BDch_inova%C4%8Dn%C3%ADch_technologi%C3%AD.jpg",
    origin: "commons",
  },
  "uni-vse": {
    src: "/images/universities/vse.jpg", color: "#f8f8f8",
    width: 1600,
    height: 663,
    alt: { en: "The old building of the Prague University of Economics and Business", ar: "المبنى القديم لجامعة براغ للاقتصاد والأعمال (VŠE)" },
    credit: "Ludek",
    license: "CC BY-SA 3.0",
    licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Vysoka_skola_ekonomicka_stara_budova.jpg",
    origin: "commons",
  },
  "uni-but": {
    src: "/images/universities/but.jpg", color: "#f8d8b8",
    width: 1600,
    height: 1071,
    alt: { en: "The Faculty of Civil Engineering, Brno University of Technology", ar: "كلية الهندسة المدنية في جامعة برنو التقنية (VUT)" },
    credit: "Jan Symon",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Faculty_of_Civil_Engineering1.jpg",
    origin: "commons",
  },
  "uni-muni": {
    src: "/images/universities/muni.jpg", color: "#88a8c8",
    width: 1600,
    height: 1067,
    alt: { en: "The Masaryk University campus in Brno from above", ar: "حرم جامعة ماساريك في برنو من فوق" },
    credit: "Aleš Ležatka",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Masaryk_University_Campus_Brno.jpg",
    origin: "commons",
  },
  "uni-osu": {
    src: "/images/universities/osu.jpg", color: "#787868",
    width: 1600,
    height: 1200,
    alt: { en: "A University of Ostrava faculty building", ar: "مبنى كلية من كليات جامعة أوسترافا" },
    credit: "Qasinka",
    license: "CC0",
    licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2023_Ostrava_Sokolsk%C3%A1_17_FUOU.jpg",
    origin: "commons",
  },
  "uni-tbu": {
    src: "/images/universities/tbu.jpg", color: "#c8c8c8",
    width: 1600,
    height: 1068,
    alt: { en: "The Tomas Bata University campus in Zlín", ar: "حرم جامعة توماش باتا في زلين" },
    credit: "Jan Salač",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Univerzita_Tom%C3%A1%C5%A1e_Bati_ve_Zl%C3%ADn%C4%9B.jpg",
    origin: "commons",
  },
  "uni-zcu": {
    src: "/images/universities/zcu.jpg", color: "#e8e8e8",
    width: 1600,
    height: 1067,
    alt: { en: "The University of West Bohemia campus in Plzeň", ar: "حرم جامعة غرب بوهيميا في بلزن" },
    credit: "ZČU Vnější vztahy",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:ZCU-kampus-vlajky.jpg",
    origin: "commons",
  },
} satisfies Record<string, SiteImageEntry>;

export type ImageId = keyof typeof IMAGES;

/** City name (as in universities-v2.ts) → its photo. All 14 university cities. */
export const CITY_IMAGE: Record<string, ImageId> = {
  "Prague": "city-prague",
  "Brno": "city-brno",
  "Ostrava": "city-ostrava",
  "Hradec Králové": "city-hradec-kralove",
  "České Budějovice": "city-ceske-budejovice",
  "Plzeň": "city-plzen",
  "Olomouc": "city-olomouc",
  "Ústí nad Labem": "city-usti-nad-labem",
  "Zlín": "city-zlin",
  "Pardubice": "city-pardubice",
  "Opava": "city-opava",
  "Mladá Boleslav": "city-mlada-boleslav",
  "Liberec": "city-liberec",
  "Jihlava": "city-jihlava",
};

/** University id (universities-v2.ts) → its building photo, where we have one. */
export const UNIVERSITY_IMAGE: Record<string, ImageId> = {
  "ctu": "uni-ctu",
  "cuni": "uni-cuni",
  "cuni-hradec": "uni-cuni-hradec",
  "cuni-plzen": "uni-cuni-plzen",
  "mendelu": "uni-mendelu",
  "uct": "uni-uct",
  "uvb": "uni-uvb",
  "vsb": "uni-vsb",
  "vse": "uni-vse",
  "but": "uni-but",
  "muni": "uni-muni",
  "osu": "uni-osu",
  "tbu": "uni-tbu",
  "zcu": "uni-zcu",
};

/** A university's own photo, else its city's, else nothing. */
export function universityImage(id: string, city?: string): ImageId | undefined {
  return UNIVERSITY_IMAGE[id] ?? (city ? CITY_IMAGE[city] : undefined);
}

export function cityImage(city: string): ImageId | undefined {
  return CITY_IMAGE[city];
}

/** Photos that need a visible credit line (Creative Commons). */
export function creditedImages(): (SiteImageEntry & { id: string })[] {
  return Object.entries(IMAGES)
    .filter(([, e]) => e.origin === "commons")
    .map(([id, e]) => ({ id, ...(e as SiteImageEntry) }));
}
