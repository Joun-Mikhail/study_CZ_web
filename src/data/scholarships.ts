export type Scholarship = {
  id: string;
  name: { en: string; ar: string };
  provider: { en: string; ar: string };
  eligibility: { en: string; ar: string };
  coverage: { en: string; ar: string };
  deadline: { en: string; ar: string };
  link?: string;
};

export const scholarships: Scholarship[] = [
  {
    id: "cz-gov-scholarship",
    name: {
      en: "Czech Government Scholarship (DZS / MEYS)",
      ar: "منح الحكومة التشيكية (DZS / MEYS)",
    },
    provider: {
      en: "Ministry of Education, Youth and Sports (via DZS)",
      ar: "وزارة التعليم عبر DZS",
    },
    eligibility: {
      en: "Citizens of eligible developing countries nominated through bilateral agreements — check the official DZS list.",
      ar: "لمواطني بعض دول العالم الثالث حسب اتفاقيات ثنائية — شوف قائمة DZS الرسمية.",
    },
    coverage: {
      en: "Typically covers tuition at public universities and a living stipend for the study period. Exact coverage varies by agreement.",
      ar: "عادة بتغطي رسوم الدراسة في الجامعات الحكومية ومخصص شهري للمعيشة طوال فترة الدراسة. التفصيل بيختلف حسب الاتفاقية.",
    },
    deadline: {
      en: "Deadlines vary by sending country and agreement — check the DZS page each year.",
      ar: "المواعيد بتختلف حسب البلد والاتفاقية — تابع صفحة DZS كل سنة.",
    },
    link: "https://www.studyin.cz/",
  },

  {
    id: "study-in-czech-free-path",
    name: {
      en: "Study in Czech — Czech-language free-tuition path",
      ar: "طريق الدراسة مجانًا (برامج بالتشيكي)",
    },
    provider: {
      en: "Public Czech universities",
      ar: "الجامعات الحكومية التشيكية",
    },
    eligibility: {
      en: "Students who enrol in and pass programmes taught in Czech (usually require B2+ Czech or successful completion of a preparatory year).",
      ar: "الطلاب اللي بيدخلوا برامج بالتشيكي ونجحوا فيها (عادة مطلوب مستوى تشيكي B2 أو نجاح في سنة تحضيرية).",
    },
    coverage: {
      en: "Tuition is €0 for public universities for programmes taught in Czech. Students remain responsible for living costs and any preparatory-year fees.",
      ar: "الرسوم الدراسية صفر يورو في الجامعات الحكومية للبرامج المُدرَّسة بالتشيكي. الطالب هو اللي بيتحمل مصاريف المعيشة وأي رسوم للسنة التحضيرية.",
    },
    deadline: {
      en: "Application deadlines depend on the university and programme — check each university's admissions page.",
      ar: "مواعيد التقديم حسب الجامعة والبرنامج — راجع صفحة القبول لكل جامعة.",
    },
    link: "https://www.studyin.cz/",
  },

  {
    id: "erasmus",
    name: { en: "Erasmus+ / Erasmus Mundus", ar: "إيراسموس+ / إيراسموس مونديوس" },
    provider: { en: "European Commission / Partner universities", ar: "المفوضية الأوروبية/ الجامعات الشريكة" },
    eligibility: {
      en: "Students registered at partner institutions in participating countries (calls and eligibility differ by programme and year).",
      ar: "الطلاب المسجلين في جامعات شريكة في دول مشاركة (الشروط والمواعيد تختلف حسب البرنامج والسنة).",
    },
    coverage: {
      en: "Mobility grants for study or traineeship periods, sometimes full scholarships for Erasmus Mundus joint programmes covering tuition and living costs.",
      ar: "منح للتنقل خلال فترات الدراسة أو التدريب، وفي بعض برامج إيراسموس مونديوس بتكون منح كاملة بتغطي الرسوم ومصاريف المعيشة.",
    },
    deadline: {
      en: "Deadlines published annually by each participating consortium or university.",
      ar: "المواعيد بتتنشر سنويًا من قبل كل اتحاد مشارك أو جامعة.",
    },
    link: "https://ec.europa.eu/programmes/erasmus-plus/",
  },

  {
    id: "university-merit",
    name: { en: "University merit & fee-waiver scholarships", ar: "منح الجامعات للمتفوقين/إعفاء الرسوم" },
    provider: { en: "Individual Czech universities", ar: "كل جامعة على حدة" },
    eligibility: {
      en: "High-performing applicants at many public universities may receive tuition reductions or waivers — criteria vary by university and programme.",
      ar: "الطلاب المتفوقين في بعض الجامعات الحكومية ممكن يحصلوا على تخفيض أو إعفاء من الرسوم — الشروط بتختلف حسب الجامعة والبرنامج.",
    },
    coverage: {
      en: "Ranges from partial fee waivers to full tuition coverage for top-ranked applicants; check each university's scholarship page for details.",
      ar: "من خصم جزئي للرسوم لحد إعفاء كامل للمتفوقين — شوف صفحة المنح في كل جامعة للتفاصيل.",
    },
    deadline: {
      en: "Deadlines and application procedures are set by each university.",
      ar: "المواعيد وإجراءات التقديم بتحددها كل جامعة.",
    },
    link: "https://www.studyin.cz/",
  },
];
