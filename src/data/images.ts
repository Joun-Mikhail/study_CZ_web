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
  /** Tiny blurred preview shown while the photo loads. */
  blur?: string;
};

const STOCK = { credit: "Unsplash / Pexels", license: "Unsplash / Pexels free licence", origin: "stock" as const };

export const IMAGES = {
  "prague-cityscape": { src: "/images/prague-cityscape.jpg", width: 1400, height: 933, alt: { en: "Prague rooftops and the Vltava", ar: "أسطح براغ ونهر الفلتافا" }, ...STOCK },
  "prague-bridge": { src: "/images/prague-bridge.jpg", width: 1280, height: 854, alt: { en: "Prague rooftops", ar: "أسطح براغ" }, ...STOCK },
  "prague-scenic": { src: "/images/prague-scenic.jpg", width: 1280, height: 1920, alt: { en: "A Prague street", ar: "شارع في براغ" }, ...STOCK },
  "prague-architecture": { src: "/images/prague-architecture.jpg", width: 1400, height: 933, alt: { en: "Prague riverside architecture", ar: "مباني براغ على النهر" }, ...STOCK },
  "prague-old-town": { src: "/images/prague-old-town.jpg", width: 1400, height: 933, alt: { en: "Prague Old Town", ar: "البلدة القديمة في براغ" }, ...STOCK },
  "university-campus": { src: "/images/university-campus.jpg", width: 1400, height: 933, alt: { en: "A university building", ar: "مبنى جامعة" }, ...STOCK },
  "students-group": { src: "/images/students-group.jpg", width: 1400, height: 2100, alt: { en: "A group of students (stock photo)", ar: "مجموعة طلاب (صورة توضيحية)" }, ...STOCK },
  "students-studying": { src: "/images/students-studying.jpg", width: 1400, height: 933, alt: { en: "Students studying together (stock photo)", ar: "طلاب بيذاكروا مع بعض (صورة توضيحية)" }, ...STOCK },
  john: { src: "/images/john.jpg", width: 3024, height: 4032, alt: { en: "John", ar: "جون" }, credit: "John", license: "Own photo", origin: "own" as const },
  "city-prague": {
    src: "/images/cities/prague.jpg",
    width: 1600,
    height: 1200,
    alt: { en: "Bridges over the Vltava in Prague at dusk", ar: "جسور نهر الفلتافا في براغ وقت الغروب" },
    credit: "john mcsporran from Trossachs, Scotland",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Prague_(16651316979).jpg",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAED/8QAIhAAAQMDAwUAAAAAAAAAAAAAAQIDEQAEBRIhMRMiUXGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAWEQEBAQAAAAAAAAAAAAAAAAABABH/2gAMAwEAAhEDEQA/AMmch1FhCbZClHwTA91Hsk4gnRYSImRJHE0JN0pt0aG0DUngTH2hO5K5DYSFkdxBMncSNqmbNC//2Q==",
  },
  "city-brno": {
    src: "/images/cities/brno.jpg",
    width: 1600,
    height: 1200,
    alt: { en: "Brno from Špilberk, with the Cathedral of St Peter and Paul", ar: "برنو من قلعة شبيلبيرك، ومعاها كاتدرائية القديسين بطرس وبولس" },
    credit: "Petr.adamek",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Brno-%C5%A0pilberk_1.jpg",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwIE/8QAIRAAAgEDAwUAAAAAAAAAAAAAAQIDAAQRBRMhEiIxQbH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABkRAAMAAwAAAAAAAAAAAAAAAAABAgMTUf/aAAwDAQACEQMRAD8AWMK5KrGSw9MQv2rMapAJnUKhOB3A1ktp3luYIXOUVgo5PIOPNKLl7XUtiJU2jIB0kZqt99Dwyj//2Q==",
  },
  "city-ostrava": {
    src: "/images/cities/ostrava.jpg",
    width: 1600,
    height: 1181,
    alt: { en: "Masaryk Square in the centre of Ostrava", ar: "ميدان ماساريك في وسط أوسترافا" },
    credit: "Palickap",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ostrava,_Masarykovo_n%C3%A1m%C4%9Bst%C3%AD_(1).jpg",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAHxAAAQMEAwEAAAAAAAAAAAAAAQIDEQAEBRITIXGS/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAYEQACAwAAAAAAAAAAAAAAAAAAAQIREv/aAAwDAQACEQMRAD8AtMZXHvNBxLsSJAI7NIeydjauBG3Io9nUiAPTWKt0IEDjR7qKRxtLMKaR81dSFI//2Q==",
  },
  "city-hradec-kralove": {
    src: "/images/cities/hradec-kralove.jpg",
    width: 1600,
    height: 1173,
    alt: { en: "The Great Square in Hradec Králové", ar: "الميدان الكبير في هراديتس كرالوفيه" },
    credit: "Palickap",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hradec_Kr%C3%A1lov%C3%A9,_Velk%C3%A9_n%C3%A1m%C4%9Bst%C3%AD_z%C3%A1pad.jpg",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAMF/8QAIhAAAgEDBAIDAAAAAAAAAAAAAQIDAAQREiEiQRMxMlHR/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABoRAAICAwAAAAAAAAAAAAAAAAABAhETFCH/2gAMAwEAAhEDEQA/AL2ngYk6xpz8iRjqlteQW07RHGY3QPv0ex91krZxIunkQRjc/lISCFn5RKxx7O5p9iTVMDBG+H//2Q==",
  },
  "city-ceske-budejovice": {
    src: "/images/cities/ceske-budejovice.jpg",
    width: 1600,
    height: 1200,
    alt: { en: "Colourful houses on the main square of České Budějovice", ar: "بيوت ملونة في الميدان الرئيسي في تشيسكي بوديوفيتسه" },
    credit: "Pudelek (Marcin Szala)",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:N%C3%A1m%C4%9Bst%C3%AD_P%C5%99emysla_Otakara_II_(%C4%8Cesk%C3%A9_Bud%C4%9Bjovice)_-_houses.jpg",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAMF/8QAHxABAQAABgMBAAAAAAAAAAAAAQIAAwQREiEUMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAYEQADAQEAAAAAAAAAAAAAAAAAARJBUf/aAAwDAQACEQMRAD8Ajp9d5HG5zOE2pMMi9H7hTqJXZY3PmM7wMmBZbENjvBs1btybeUbldh7fuK7WhTw//9k=",
  },
  "city-plzen": {
    src: "/images/cities/plzen.jpg",
    width: 1600,
    height: 1067,
    alt: { en: "Plzeň old town seen from the cathedral tower", ar: "البلدة القديمة في بلزن من برج الكاتدرائية" },
    credit: "Gerd Eichmann",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Plze%C5%88-N%C3%A1m%C4%9Bst%C3%AD_Republiky-60-vom_Bartholomaeuskirchturm-2012-gje.jpg",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAALABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwL/xAAfEAACAQQCAwAAAAAAAAAAAAABAgQAAxESBSExQbH/xAAUAQEAAAAAAAAAAAAAAAAAAAAC/8QAFhEAAwAAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwBLfJztMmezL6bYZNG3KzLiAicysegpP3qotqNcY6NBOAEckeaNYoj/2Q==",
  },
  "city-olomouc": {
    src: "/images/cities/olomouc.jpg",
    width: 1600,
    height: 1074,
    alt: { en: "The Upper Square in Olomouc", ar: "الميدان العلوي في أولوموتس" },
    credit: "Pudelek",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Olomouc,_Horn%C3%AD_n%C3%A1m%C4%9Bst%C3%AD_(2017).jpg",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAALABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAMF/8QAHxAAAgIDAAIDAAAAAAAAAAAAAQIDEQAEEgUhIjFB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABYRAQEBAAAAAAAAAAAAAAAAAAEAEv/aAAwDAQACEQMRAD8AZsHRVHLTurBOueb/AC/vKamx49FVwTZUNcgJrMqONGYdKGsV8vfrHx6sAQVEooUABi2kcl//2Q==",
  },
  "city-usti-nad-labem": {
    src: "/images/cities/usti-nad-labem.jpg",
    width: 1600,
    height: 1200,
    alt: { en: "Panorama of Ústí nad Labem", ar: "منظر عام لأوستي ناد لابم" },
    credit: "Artur Kroc",
    license: "Public domain",
    licenseUrl: "",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Usti_nad_Labem_panorama.JPG",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwb/xAAjEAABAgUDBQAAAAAAAAAAAAABAgMABAUREhMhQSIjMVHw/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAWEQADAAAAAAAAAAAAAAAAAAAAAhP/2gAMAwEAAhEDEQA/ACYRT7DvC5+9QjipFAx1jv4OO0RzVRm2h0PqHMKmrTyVEiZVci3EXu4Jqf/Z",
  },
  "city-zlin": {
    src: "/images/cities/zlin.jpg",
    width: 1600,
    height: 1200,
    alt: { en: "The Baťa skyscraper in Zlín at night", ar: "ناطحة سحاب باتا في زلين بالليل" },
    credit: "Palickap",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Zl%C3%ADn,_Ba%C5%A5%C5%AFv_mrakodrap_v_noci.jpg",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQIG/8QAHRAAAgIDAAMAAAAAAAAAAAAAARECAwAEEiExkf/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAGxEAAgEFAAAAAAAAAAAAAAAAAAECAwQRIUH/2gAMAwEAAhEDEQA/ABdCinatjCN1YJlz5KWIw1dOtCzZqE0WOmkSMzcoRBYislken9yquJ50F0Y9P//Z",
  },
  "city-pardubice": {
    src: "/images/cities/pardubice.jpg",
    width: 1600,
    height: 1200,
    alt: { en: "Pernštýn Square in Pardubice", ar: "ميدان بيرنشتين في باردوبيتسه" },
    credit: "Palickap",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Pardubice,_Pern%C5%A1t%C3%BDnsk%C3%A9_n%C3%A1m%C4%9Bst%C3%AD_(2).jpg",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAwQFBv/EACMQAAEDAgUFAAAAAAAAAAAAAAECAxEABAUSEyExBhUjYYH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABcRAQADAAAAAAAAAAAAAAAAAAABESH/2gAMAwEAAhEDEQA/ANUMZaF4UKUAzpBWaNwok7H4KMzjFo8IbczHfge6kdistQHy54gr1DJpZXTdi2CoKfJgxLnFFyrH/9k=",
  },
  "city-opava": {
    src: "/images/cities/opava.jpg",
    width: 1600,
    height: 901,
    alt: { en: "The Upper Square in Opava", ar: "الميدان العلوي في أوبافا" },
    credit: "Vojtěch Dočkal",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Opava,_Horn%C3%AD_n%C3%A1m%C4%9Bst%C3%AD_(srpen_2022).jpg",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAJABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQMEBv/EACMQAAEDAwIHAAAAAAAAAAAAAAIAAQMEBUEycQYREiI0UbH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAEAEf/aAAwDAQACEQMRAD8ANHfwamISAYxbtF+vTj0qaniG3PAQSnyJ2cXzhZ2Dx49y+p8ul9lIs5f/2Q==",
  },
  "city-mlada-boleslav": {
    src: "/images/cities/mlada-boleslav.jpg",
    width: 1600,
    height: 1200,
    alt: { en: "The Old Town Square in Mladá Boleslav", ar: "ميدان البلدة القديمة في ملادا بوليسلاف" },
    credit: "Vojtěch Dočkal",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mlad%C3%A1_Boleslav,_Starom%C4%9Bstsk%C3%A9_n%C3%A1m%C4%9Bst%C3%AD.jpg",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAwQFBv/EACAQAAEEAgEFAAAAAAAAAAAAAAECAwQRAAVBIjEyYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//EABgRAAMBAQAAAAAAAAAAAAAAAAABAjES/9oADAMBAAIRAxEAPwAGglQ5VoffDbie9jy+Y1spkaM2CwgvKN8VWYdhakuApJB9ZTYkOLHUqyOcp3U4wOJrUf/Z",
  },
  "city-liberec": {
    src: "/images/cities/liberec.jpg",
    width: 1600,
    height: 1200,
    alt: { en: "Liberec town hall", ar: "مبنى بلدية ليبيريتس" },
    credit: "Hardric",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Radnice_m%C4%9Bsta_Liberec-ze_strany.JPG",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwQG/8QAIRAAAgAFBAMAAAAAAAAAAAAAAQIAAwQRIQUSMTIUJEH/xAAUAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAR/9oADAMBAAIRAxEAPwBq7XX831agokjpjsftxFek65UCrVZ9QJqziAdw6k4BEY0XYm5OecwhXa6lWYEW4MKqwAGX/9k=",
  },
  "city-jihlava": {
    src: "/images/cities/jihlava.jpg",
    width: 1600,
    height: 1200,
    alt: { en: "St Ignatius Church on Masaryk Square in Jihlava", ar: "كنيسة القديس إغناطيوس في ميدان ماساريك في ييهلافا" },
    credit: "Ladis62",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kostel_Sv.Ign%C3%A1ce_na_Masarykov%C4%9B_n%C3%A1m%C4%9Bst%C3%AD-Jihlava.JPG",
    origin: "commons",
    blur: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwT/xAAgEAACAgEDBQAAAAAAAAAAAAABAgMRAAQSEwUhMWKx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAf/EABcRAAMBAAAAAAAAAAAAAAAAAAABAjH/2gAMAwEAAhEDEQA/AC6W8Wt06uqmMvYO3vVfMQQTjkHBcYckOxq7yTTjbGEQlF9CRjSO7IFaRyB4tjg7rRUzh//Z",
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

export function cityImage(city: string): ImageId | undefined {
  return CITY_IMAGE[city];
}

/** Photos that need a visible credit line (Creative Commons). */
export function creditedImages(): (SiteImageEntry & { id: string })[] {
  return Object.entries(IMAGES)
    .filter(([, e]) => e.origin === "commons")
    .map(([id, e]) => ({ id, ...(e as SiteImageEntry) }));
}
