export type PrepProgram = {
  id: string;
  university: string;
  city: string;
  programs: {
    name: { en: string; ar: string };
    intensity?: string;
    location?: string;
    start?: string;
    priceCzk?: number | null;
    priceEur?: number | null;
    priceNote?: string;
    duration?: string;
  }[];
  contact: { email: string; phone?: string };
  website: { url: string; label: string };
  note?: { en: string; ar: string };
  language: "czech" | "english" | "both";
  isPrivate?: boolean;
};

export const universityPrograms: PrepProgram[] = [
  {
    id: "ujop-czech",
    university: "Charles University — ÚJOP",
    city: "Prague",
    language: "czech",
    programs: [
      { name: { en: "Medicine & Pharmacy COMPLEX", ar: "طب وصيدلة COMPLEX" }, intensity: "35 hr/week", location: "Prague", priceCzk: 169000, priceEur: 7253 },
      { name: { en: "Natural Science COMPLEX", ar: "علوم طبيعية COMPLEX" }, intensity: "35 hr/week", location: "Prague", priceCzk: 169000, priceEur: 7253 },
      { name: { en: "Engineering & IT COMPLEX", ar: "هندسة وتقنية COMPLEX" }, intensity: "35 hr/week", location: "Poděbrady", priceCzk: 167000, priceEur: 7167 },
      { name: { en: "Economics & Business COMPLEX", ar: "اقتصاد وأعمال COMPLEX" }, intensity: "35 hr/week", location: "Poděbrady", priceCzk: 167000, priceEur: 7167 },
      { name: { en: "Humanities COMPLEX", ar: "علوم إنسانية COMPLEX" }, intensity: "35 hr/week", location: "Prague", priceCzk: 167000, priceEur: 7167 },
      { name: { en: "Arts & Architecture COMPLEX", ar: "فنون وعمارة COMPLEX" }, intensity: "35 hr/week", location: "Prague", priceCzk: 167000, priceEur: 7167 },
      { name: { en: "Medicine & Pharmacy PROGRESS", ar: "طب وصيدلة PROGRESS" }, intensity: "25 hr/week", location: "Prague", priceCzk: 122000, priceEur: 5236 },
      { name: { en: "Natural Science PROGRESS", ar: "علوم طبيعية PROGRESS" }, intensity: "25 hr/week", location: "Prague", priceCzk: 122000, priceEur: 5236 },
      { name: { en: "Humanities PROGRESS", ar: "علوم إنسانية PROGRESS" }, intensity: "25 hr/week", location: "Prague", priceCzk: 120000, priceEur: 5150 },
      { name: { en: "Arts & Architecture PROGRESS", ar: "فنون وعمارة PROGRESS" }, intensity: "25 hr/week", location: "Prague", priceCzk: 120000, priceEur: 5150 },
    ],
    contact: { email: "studujop@ujop.cuni.cz", phone: "+420 778 754 481" },
    website: { url: "https://ujop.cuni.cz/UJOPEN-1.html", label: "ujop.cuni.cz" },
    note: { en: "The largest and most established foundation program in Czechia. 90%+ success rate.", ar: "أكبر وأعرق برنامج تحضيري في التشيك. نسبة نجاح أكثر من 90%." },
  },
  {
    id: "ujop-english",
    university: "Charles University — ÚJOP",
    city: "Prague",
    language: "english",
    programs: [
      { name: { en: "Medicine & Pharmacy in English COMPLEX", ar: "طب وصيدلة بالإنجليزية COMPLEX" }, intensity: "35 hr/week", start: "September", location: "Poděbrady", priceCzk: 182000, priceEur: 7811 },
      { name: { en: "Medicine & Pharmacy in English FAST", ar: "طب وصيدلة بالإنجليزية FAST" }, intensity: "25 hr/week", start: "November", location: "Prague", priceCzk: 115000, priceEur: 4936 },
      { name: { en: "Engineering & IT in English FAST", ar: "هندسة وتقنية بالإنجليزية FAST" }, intensity: "25 hr/week", start: "November", location: "Poděbrady", priceCzk: 113000, priceEur: 4850 },
      { name: { en: "Economics & Global Affairs in English FAST", ar: "اقتصاد وعلاقات دولية بالإنجليزية FAST" }, intensity: "25 hr/week", start: "November", location: "Poděbrady", priceCzk: 113000, priceEur: 4850 },
    ],
    contact: { email: "studujop@ujop.cuni.cz", phone: "+420 778 754 481" },
    website: { url: "https://ujop.cuni.cz/UJOPEN-1.html", label: "ujop.cuni.cz" },
  },
  {
    id: "muni-kabcest",
    university: "Masaryk University — Dept. of Czech for Foreigners",
    city: "Brno",
    language: "czech",
    programs: [
      { name: { en: "INTENSIVE+", ar: "مكثف+" }, intensity: "20–25 hr/week", duration: "635 hours", priceCzk: null, priceEur: 4300 },
      { name: { en: "INTENSIVE", ar: "مكثف" }, intensity: "20 hr/week", duration: "570 hours", priceCzk: null, priceEur: 3950 },
      { name: { en: "BASIC", ar: "أساسي" }, intensity: "15 hr/week", duration: "440 hours", priceCzk: null, priceEur: 2850 },
    ],
    contact: { email: "kabcest@phil.muni.cz", phone: "+420 549 49 5970" },
    website: { url: "https://kabcest.phil.muni.cz/en/courses/year-long-preparation", label: "kabcest.phil.muni.cz" },
    note: { en: "Year-long language & professional preparation, accredited under §64b. Visa purpose: \"Study.\" Academic year 2026/27: Sep 14, 2026 – Jun 13, 2027. Dormitory: ~7,500 CZK/month.", ar: "سنة تحضيرية لغوية ومهنية، معتمدة. غرض التأشيرة: \"دراسة\". العام 2026/27: 14 سبتمبر 2026 – 13 يونيو 2027. السكن: ~7,500 كرون/شهر." },
  },
  {
    id: "muni-cjv",
    university: "Masaryk University — Language Centre",
    city: "Brno",
    language: "czech",
    programs: [
      { name: { en: "One-Year Intensive Czech Course", ar: "دورة تشيكي مكثفة لسنة كملة" }, intensity: "20 hr/week", duration: "670 hours (620 in-person + 50 e-learning)", priceCzk: null, priceEur: 3990 },
    ],
    contact: { email: "intensiveczech@cjv.muni.cz", phone: "+420 549 493 530" },
    website: { url: "https://www.cjv.muni.cz/en/courses/one-year-intensive-course-czech-2026", label: "cjv.muni.cz" },
    note: { en: "Language-focused (no specialized subjects). Academic year 2026/27: Sep 1, 2026 – Jun 4, 2027. Mon–Fri 08:30–12:00. Registration deadline: May 31 (visa) / Jul 31 (non-visa).", ar: "تركيز على اللغة فقط (بدون مواد تخصصية). العام 2026/27: 1 سبتمبر 2026 – 4 يونيو 2027. الاثنين–الجمعة 08:30–12:00." },
  },
  {
    id: "vut",
    university: "Brno University of Technology — VUT",
    city: "Brno",
    language: "czech",
    programs: [
      { name: { en: "Two-Semester Intensive Czech Course", ar: "دورة تشيكي مكثفة لفصلين" }, intensity: "16 hr/week", duration: "560 teaching units", priceCzk: 60000, priceEur: 2400 },
    ],
    contact: { email: "prikrylovam@vutbr.cz" },
    website: { url: "https://www.lli.vutbr.cz/english", label: "lli.vutbr.cz" },
    note: { en: "Budget-friendly option. Price does NOT include accommodation. 50% advance payment; refund if visa refused. Registration deadline: June 30.", ar: "الخيار الأرخص. السعر لا يشمل السكن. دفعة مقدمة 50%؛ استرداد إذا رُفضت التأشيرة. آخر موعد للتسجيل: 30 يونيو." },
  },
  {
    id: "cvut",
    university: "Czech Technical University — ČVUT / MIAS",
    city: "Prague",
    language: "both",
    programs: [
      { name: { en: "Czech Preparatory Course", ar: "دورة تحضيرية بالتشيكي" }, priceCzk: 99000, priceEur: 4150 },
      { name: { en: "Business Preparatory Programme (English)", ar: "برنامج أعمال تحضيري (إنجليزي)" }, priceCzk: 95000, priceEur: 3900 },
    ],
    contact: { email: "muvs-uniprep@cvut.cz" },
    website: { url: "https://www.muvs.cvut.cz/en/czech-language/", label: "muvs.cvut.cz" },
    note: { en: "Academic year 2026/27: Sep 21, 2026 – Aug 31, 2027. 560 in-class sessions. Czech course fulfills \"Study\" visa purpose.", ar: "العام 2026/27: 21 سبتمبر 2026 – 31 أغسطس 2027. 560 حصة. الدورة التشيكية تؤهل لتأشيرة \"دراسة\"." },
  },
  {
    id: "vse",
    university: "Prague University of Economics and Business — VŠE",
    city: "Prague",
    language: "czech",
    programs: [
      { name: { en: "One-Year Czech Course", ar: "دورة تشيكي لسنة كملة" }, duration: "1 year", priceCzk: 109000, priceEur: 4350 },
      { name: { en: "Summer Course", ar: "دورة صيفية" }, duration: "3 weeks", priceCzk: null, priceEur: 400 },
    ],
    contact: { email: "kurzy-ceskyjazyk@vse.cz" },
    website: { url: "https://kurzy-ceskyjazyk.vse.cz/english/", label: "kurzy-ceskyjazyk.vse.cz" },
    note: { en: "Focused on economics/business entrance exam preparation. Includes airport transfer, coordinator support, study materials. Requires English at A2+.", ar: "مخصص للتحضير لامتحانات القبول في الاقتصاد والأعمال. يشمل استقبال المطار ودعم منسق ومواد دراسية." },
  },
  {
    id: "uwb",
    university: "University of West Bohemia — UWB",
    city: "Plzeň",
    language: "czech",
    programs: [
      { name: { en: "Half-Year (1 Semester)", ar: "نصف سنة (فصل واحد)" }, duration: "1 semester", priceCzk: 70000, priceEur: 2800 },
      { name: { en: "One Year (2 Semesters)", ar: "سنة كملة (فصلين)" }, duration: "2 semesters", priceCzk: 130000, priceEur: 5200 },
      { name: { en: "Two Years (4 Semesters)", ar: "سنتين (4 فصول)" }, duration: "4 semesters", priceCzk: 230000, priceEur: 9200 },
    ],
    contact: { email: "ujp@ujp.zcu.cz" },
    website: { url: "https://www.ujp.zcu.cz/en/Public/preparatory_courses/index.html", label: "ujp.zcu.cz" },
  },
];

export const otherUniversities = [
  { name: "Tomas Bata University", city: "Zlín", url: "https://czech.utb.cz/index.php?lng=en" },
  { name: "Palacký University", city: "Olomouc", url: "https://cjv.upol.cz/kurzy-a-certifikaty/czech-for-foreigners/" },
  { name: "University of South Bohemia", city: "České Budějovice", url: "https://www.ff.jcu.cz/en/admissions/intensive-czech-language-course-for-foreigners" },
  { name: "University of Ostrava", city: "Ostrava", url: "https://kcj.osu.cz/czech-language-and-culture-kcj-cecin/" },
  { name: "VSB – Technical University of Ostrava", city: "Ostrava", url: "https://www.vsb.cz/712/en" },
  { name: "Mendel University", city: "Brno", url: "https://icv.mendelu.cz/en/czech-for-foreigners/" },
];

export const privatePrograms: PrepProgram[] = [
  {
    id: "msm",
    university: "MSM Academy",
    city: "Prague",
    language: "czech",
    isPrivate: true,
    programs: [
      { name: { en: "1 Year / 6 Months / 3 Months", ar: "سنة / 6 أشهر / 3 أشهر" }, priceNote: "Contact MSM" },
    ],
    contact: { email: "" },
    website: { url: "#", label: "MSM Academy" },
    note: { en: "Cultural program, excursions, coordinator support included. At CTU/CULS campus.", ar: "يشمل برنامج ثقافي ورحلات ودعم منسق. في حرم CTU/CULS." },
  },
  {
    id: "pec",
    university: "Prague Education Center",
    city: "Prague",
    language: "czech",
    isPrivate: true,
    programs: [
      { name: { en: "One-Year Preparatory", ar: "تحضيري لسنة كملة" }, priceNote: "Contact PEC" },
    ],
    contact: { email: "" },
    website: { url: "#", label: "Prague Education Center" },
    note: { en: "Specialized prep for specific universities.", ar: "تحضير متخصص لجامعات محددة." },
  },
  {
    id: "eiasm",
    university: "EIASM / Unicorn University",
    city: "Prague",
    language: "both",
    isPrivate: true,
    programs: [
      { name: { en: "Czech or English Language Prep (2 semesters)", ar: "تحضير لغة تشيكية أو إنجليزية (فصلين)" }, priceEur: 4500, priceNote: "€4,500/year or €2,450/semester" },
    ],
    contact: { email: "" },
    website: { url: "#", label: "EIASM / Unicorn" },
  },
];

export const usefulLinks = [
  { label: { en: "Study in Czechia Portal (Language Courses)", ar: "بوابة الدراسة في التشيك (دورات لغة)" }, url: "https://portal.studyin.cz/en/find-your-study-programme/language-courses/" },
  { label: { en: "Study in Czechia: Language Preparation", ar: "الدراسة في التشيك: التحضير اللغوي" }, url: "https://www.studyin.cz/plan-your-studies/language-preparation/" },
  { label: { en: "Charles University ÚJOP", ar: "جامعة تشارلز ÚJOP" }, url: "https://ujop.cuni.cz/UJOPEN-1.html" },
  { label: { en: "Masaryk University Czech Courses", ar: "دورات التشيكي في جامعة مساريك" }, url: "https://www.muni.cz/en/admissions/bachelors-and-masters-studies/language-courses/czech-language-courses" },
  { label: { en: "VUT Brno Czech Courses", ar: "دورات التشيكي في VUT برنو" }, url: "https://www.lli.vutbr.cz/english" },
  { label: { en: "Visa Information (Ministry of Interior)", ar: "معلومات التأشيرة (وزارة الداخلية)" }, url: "https://ipc.gov.cz/en/" },
  { label: { en: "Visa Information (MFA)", ar: "معلومات التأشيرة (وزارة الخارجية)" }, url: "https://mzv.gov.cz/jnp/en/information_for_aliens/long_stay_visa/study_long_term.html" },
  { label: { en: "Czech Citizenship/Residency Exam Info", ar: "معلومات امتحان الجنسية/الإقامة" }, url: "https://cestina-pro-cizince.cz/?hl=en_US" },
  { label: { en: "Czech Centres Abroad (Learn Czech)", ar: "المراكز التشيكية بالخارج (تعلم التشيكي)" }, url: "https://czechcentres.gov.cz/en/about-us/learn-czech?locale=en" },
  { label: { en: "Integration Centres (Free Czech Courses)", ar: "مراكز الاندماج (دورات تشيكي مجانية)" }, url: "https://www.integracnicentra.cz/aktivity-pro-klienty/?lang=en" },
];
