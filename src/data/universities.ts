export type University = {
  id: string;
  name: string;
  city:
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
  languages: ("English" | "Czech")[];
  fields: string[];
  tuitionEurPerYear: [number, number]; // approximate range
  degreeLevels: ("Bachelor" | "Master")[];
  blurb: { en: string; ar: string };
  founded?: number;
  website?: string;
  contactEmail?: string;
  programs?: { name: { en: string; ar?: string }; degree: "Bachelor" | "Master"; language: "English" | "Czech" }[];
  englishProgramCount?: number;
  ranking?: string;
};

export const universities: University[] = [
  {
    id: "vse",
    name: "Prague University of Economics and Business (VŠE)",
    city: "Prague",
    languages: ["English", "Czech"],
    fields: ["Business", "Finance", "Economics", "IT"],
    tuitionEurPerYear: [3000, 6000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "Central Europe's top-ranked business school, EQUIS/AMBA accredited, in the heart of Prague.",
      ar: "من أفضل كليات إدارة الأعمال في وسط أوروبا، معتمدة دوليًا (EQUIS/AMBA)، في قلب براغ.",
    },
  },
  {
    id: "cuni",
    name: "Charles University",
    city: "Prague",
    languages: ["English", "Czech"],
    fields: ["Medicine", "Law", "Humanities", "Sciences"],
    tuitionEurPerYear: [4000, 15000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "Founded 1348 — one of Europe's oldest and most prestigious universities, strong in medicine and sciences.",
      ar: "تأسست 1348، من أعرق وأرقى جامعات أوروبا، قوية جدًا في الطب والعلوم.",
    },
  },
  {
    id: "ctu",
    name: "Czech Technical University in Prague (CTU)",
    city: "Prague",
    languages: ["English", "Czech"],
    fields: ["Engineering", "IT", "Architecture", "Robotics"],
    tuitionEurPerYear: [3000, 12000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "Established 1707 — a leading technical university for engineering, robotics, and architecture.",
      ar: "تأسست 1707، من أفضل الجامعات التقنية في الهندسة والروبوتات والعمارة.",
    },
  },
  {
    id: "czu",
    name: "Czech University of Life Sciences Prague (CZU)",
    city: "Prague",
    languages: ["English", "Czech"],
    fields: ["Agriculture", "Environmental Science", "Economics", "Forestry"],
    tuitionEurPerYear: [1500, 4000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "Sustainability-focused, affordable programs on a green campus in Prague.",
      ar: "متخصصة في الاستدامة، برامج بأسعار معقولة في حرم جامعي أخضر في براغ.",
    },
  },
  {
    id: "muni",
    name: "Masaryk University",
    city: "Brno",
    languages: ["English", "Czech"],
    fields: ["Medicine", "Humanities", "Sciences", "Social Sciences"],
    tuitionEurPerYear: [3000, 12000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "Founded 1919 — one of Central Europe's most prestigious universities in a very student-friendly city.",
      ar: "تأسست 1919، من أرقى جامعات وسط أوروبا في مدينة مناسبة جدًا للطلاب.",
    },
  },
  {
    id: "but",
    name: "Brno University of Technology (BUT)",
    city: "Brno",
    languages: ["English", "Czech"],
    fields: ["Engineering", "IT", "Architecture", "Business"],
    tuitionEurPerYear: [2500, 8000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "120+ years of technical excellence with strong industry ties in Brno.",
      ar: "أكثر من 120 سنة من التميز التقني وعلاقات قوية مع الصناعة في برنو.",
    },
  },
  {
    id: "mendelu",
    name: "Mendel University in Brno",
    city: "Brno",
    languages: ["English", "Czech"],
    fields: ["Agriculture", "Forestry", "Economics", "Environmental Science"],
    tuitionEurPerYear: [1500, 4000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "Named after Gregor Mendel — sustainability and green-tech focused, on a serene green campus.",
      ar: "سميت على مندل مؤسس علم الوراثة، متخصصة في الاستدامة والتكنولوجيا الخضراء.",
    },
  },
  {
    id: "upol",
    name: "Palacký University Olomouc",
    city: "Olomouc",
    languages: ["English", "Czech"],
    fields: ["Medicine", "Humanities", "Sciences", "Law"],
    tuitionEurPerYear: [3000, 11000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "Established 1573 — over 450 years of tradition in a picturesque, affordable university city.",
      ar: "تأسست عام 1573، أكثر من 450 سنة من التقاليد الأكاديمية في مدينة جميلة واقتصادية.",
    },
  },
  {
    id: "tbu",
    name: "Tomas Bata University in Zlín",
    city: "Zlín",
    languages: ["English", "Czech"],
    fields: ["Business", "Engineering", "Design", "Health Sciences"],
    tuitionEurPerYear: [1500, 4500],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "Practical, entrepreneurship-focused education inspired by the Baťa legacy, in an affordable city.",
      ar: "تعليم عملي وريادي مستوحى من إرث باتا، في مدينة اقتصادية.",
    },
  },
  {
    id: "osu",
    name: "University of Ostrava",
    city: "Ostrava",
    languages: ["English", "Czech"],
    fields: ["Medicine", "Humanities", "Sciences", "Social Sciences"],
    tuitionEurPerYear: [4000, 13000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "One of the Czech Republic's 8 medical faculties, in an affordable industrial city with a growing student scene.",
      ar: "واحدة من 8 كليات طب في التشيك، في مدينة صناعية اقتصادية بحياة طلابية بتكبر.",
    },
  },
  {
    id: "cuni-plzen",
    name: "Charles University — Faculty of Medicine in Plzeň",
    city: "Plzeň",
    languages: ["English", "Czech"],
    fields: ["Medicine"],
    tuitionEurPerYear: [11000, 15000],
    degreeLevels: ["Master"],
    blurb: {
      en: "One of Charles University's medical faculties, requiring B2-level Czech alongside the entrance exam.",
      ar: "واحدة من كليات طب جامعة تشارلز، بتتطلب مستوى B2 تشيكي بالإضافة لامتحان القبول.",
    },
  },
  {
    id: "cuni-hradec",
    name: "Charles University — Faculty of Medicine in Hradec Králové",
    city: "Hradec Králové",
    languages: ["English", "Czech"],
    fields: ["Medicine"],
    tuitionEurPerYear: [11000, 15000],
    degreeLevels: ["Master"],
    blurb: {
      en: "One of Charles University's medical faculties, requiring C1-level Czech alongside the entrance exam.",
      ar: "واحدة من كليات طب جامعة تشارلز، بتتطلب مستوى C1 تشيكي بالإضافة لامتحان القبول.",
    },
  },
  {
    id: "tul",
    name: "Technical University of Liberec",
    city: "Liberec",
    languages: ["English", "Czech"],
    fields: ["Engineering", "IT", "Textiles", "Sciences"],
    tuitionEurPerYear: [1500, 4500],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "A compact technical university in a small, mountain-adjacent city — a quieter, more affordable option.",
      ar: "جامعة تقنية في مدينة صغيرة قريبة من الجبال — خيار أهدأ وأرخص.",
    },
  },
  {
    id: "aauni",
    name: "Anglo-American University (AAU)",
    city: "Prague",
    languages: ["English"],
    fields: ["Business", "Humanities", "Law"],
    tuitionEurPerYear: [3000, 6000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "A private, English-language university in Prague focused on small-class liberal arts and professional programmes.",
      ar: "جامعة خاصة بتدّرس بالإنجليزي في براغ، بتركز على برامج العلوم الإنسانية والأعمال بحجم صف صغير.",
    },
    founded: 1990,
    website: "https://aauni.edu/admissions",
    contactEmail: "admissions@aauni.cz",
    englishProgramCount: 20,
    programs: [
      { name: { en: "International Relations", ar: "العلاقات الدولية" }, degree: "Bachelor", language: "English" },
      { name: { en: "Business Administration", ar: "إدارة الأعمال" }, degree: "Bachelor", language: "English" },
    ],
  },
  {
    id: "skoda-auto",
    name: "ŠKODA AUTO University",
    city: "Mladá Boleslav",
    languages: ["English", "Czech"],
    fields: ["Business", "Logistics", "IT"],
    tuitionEurPerYear: [2000, 4000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "Industry-linked university in the car-manufacturing hub of Mladá Boleslav with strong logistics and business programmes.",
      ar: "جامعة مرتبطة بصناعة السيارات في ملادا بوليسلاف — برامج قوية في اللوجستيات وإدارة الأعمال.",
    },
    founded: 2000,
    website: "https://www.savs.cz/en",
    contactEmail: "info@skoda-auto.cz",
    englishProgramCount: 5,
  },
  {
    id: "mup",
    name: "Metropolitan University Prague",
    city: "Prague",
    languages: ["English", "Czech"],
    fields: ["International Relations", "Media", "Law"],
    tuitionEurPerYear: [2000, 4000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "A Prague-based university with practical programmes in media, diplomacy, and law geared towards international careers.",
      ar: "جامعة في براغ بتركّز على الإعلام والعلاقات الدولية والقانون، وبرامجها عملية ومناسبة لمسارات دولية.",
    },
    founded: 2001,
    website: "https://www.mup.cz/en/",
    englishProgramCount: 8,
  },
  {
    id: "uct",
    name: "University of Chemistry and Technology Prague",
    city: "Prague",
    languages: ["English", "Czech"],
    fields: ["Chemistry", "Biochemistry", "Food Science", "Engineering"],
    tuitionEurPerYear: [1500, 5000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "Specialist technical university strong in chemistry, technology and applied sciences with industry partnerships.",
      ar: "جامعة تقنية متخصصة في الكيمياء والعلوم التطبيقية، وعندها شراكات قوية مع الصناعة.",
    },
    founded: 1952,
    website: "https://www.vscht.cz/EN/",
    englishProgramCount: 30,
  },
  {
    id: "ujep",
    name: "Jan Evangelista Purkyně University",
    city: "Ústí nad Labem",
    languages: ["English", "Czech"],
    fields: ["Education", "Sciences", "Art"],
    tuitionEurPerYear: [1000, 3000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "Regional university offering a range of practical programmes and strong teacher-education tracks.",
      ar: "جامعة إقليمية بتقدّم برامج تطبيقية وقسم قوي لتأهيل المعلمين.",
    },
    founded: 1991,
    website: "https://www.ujep.cz/en/",
    englishProgramCount: 4,
  },
  {
    id: "upce",
    name: "University of Pardubice",
    city: "Pardubice",
    languages: ["English", "Czech"],
    fields: ["Chemistry", "IT", "Transport", "Economics"],
    tuitionEurPerYear: [1500, 4000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "Technical and applied sciences university with notable programmes in transport and chemical engineering.",
      ar: "جامعة تقنية بتقدّم برامج قوية في النقل والهندسة الكيميائية.",
    },
    founded: 1950,
    website: "https://www.upce.cz/en/",
    englishProgramCount: 10,
  },
  {
    id: "jcu",
    name: "University of South Bohemia",
    city: "České Budějovice",
    languages: ["English", "Czech"],
    fields: ["Biology", "Agriculture", "Education", "Fisheries"],
    tuitionEurPerYear: [1500, 3500],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "A green-campus university by the Vltava river, strong in biology, agriculture and environmental sciences.",
      ar: "جامعة بحرم أخضر على نهر فلتافا — قوية في الأحياء والزراعة والعلوم البيئية.",
    },
    founded: 1991,
    website: "https://www.jcu.cz/en/",
    englishProgramCount: 12,
  },
  {
    id: "vsb",
    name: "VSB - Technical University of Ostrava",
    city: "Ostrava",
    languages: ["English", "Czech"],
    fields: ["Engineering", "IT", "Mining", "Economics"],
    tuitionEurPerYear: [2000, 5000],
    degreeLevels: ["Bachelor", "Master"],
    blurb: {
      en: "Historic technical university with strengths in mining, engineering and applied IT linked to regional industry.",
      ar: "جامعة تقنية تاريخية بتركّز على التعدين والهندسة وعلوم الحاسب التطبيقية، ولها علاقة قوية بالصناعة المحلية.",
    },
    founded: 1849,
    website: "https://www.vsb.cz/en/",
    englishProgramCount: 25,
  },
];
