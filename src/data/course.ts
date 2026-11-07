// ─── Course structure (public) ─────────────────────────────────────────────
// Titles, durations and order of every lesson, plus the full text of the free
// preview lessons. Paid lesson text, videos, files and quiz questions are NOT
// here: they live in the private course repository and are served only to
// buyers by the course API (netlify/functions/course-*.mts).

export type Bilingual = { en: string; ar: string };

export type LessonResource = {
  title: Bilingual;
  url: string;
  type: "pdf" | "audio" | "cheatsheet";
};

export type Lesson = {
  id: string;
  title: Bilingual;
  duration: string; // e.g. "8 min"
  isFree: boolean; // free preview lessons
  /** Whether a video has been uploaded (paid videos are served by the API). */
  hasVideo: boolean;
  /** Free lessons only; null for paid lessons (loaded from the API). */
  content: Bilingual | null;
  /** Free lessons only (Bunny/Vimeo embed URL), null otherwise. */
  videoUrl: string | null;
  /** Free lessons only; paid lesson files come from the API. */
  resources: LessonResource[];
};

export type QuizQuestion = {
  id: string;
  question: Bilingual;
  options: Bilingual[];
  correctIndex: number;
  explanation: Bilingual;
};

export type Quiz = {
  title: Bilingual;
  passingScore: number; // percentage, e.g. 70
  questions: QuizQuestion[];
};

/** Public quiz summary; the questions come from the API. */
export type QuizSummary = {
  title: Bilingual;
  passingScore: number;
  questionCount: number;
};

export type CourseModule = {
  id: string;
  title: Bilingual;
  subtitle: Bilingual;
  icon: string; // lucide icon name
  lessons: Lesson[];
  quiz: QuizSummary;
};

export type CourseData = {
  title: Bilingual;
  modules: CourseModule[];
};

export const COURSE: CourseData = {
  "title": {
    "en": "Your First 90 Days in Czechia",
    "ar": "أول 90 يوم في التشيك"
  },
  "modules": [
    {
      "id": "before-arrival",
      "title": {
        "en": "Czechia Before You Arrive",
        "ar": "التشيك قبل ما توصل"
      },
      "subtitle": {
        "en": "Embassy interview prep + country knowledge",
        "ar": "تجهيز مقابلة السفارة + معرفة عن البلد"
      },
      "icon": "Globe",
      "lessons": [
        {
          "id": "embassy-questions",
          "title": {
            "en": "What the Embassy Actually Asks",
            "ar": "السفارة بتسأل إيه بالظبط"
          },
          "duration": "12 min",
          "isFree": true,
          "hasVideo": false,
          "content": {
            "en": "The embassy interview is where most students fail. Not because they're unqualified, but because they don't understand what the officer is really testing. In this lesson, we cover 12+ real questions from Czech embassy interviews, model answers, and the psychology behind each question.\n\nYou'll learn:\n• The 4 categories of embassy questions\n• What the officer is actually evaluating\n• Model answers that sound natural, not scripted\n• Red flags that get applications rejected\n• How to handle unexpected follow-up questions",
            "ar": "مقابلة السفارة هي المكان اللي أغلب الطلاب بيفشلوا فيه. مش عشان مش مؤهلين، لكن عشان مش فاهمين الأوفيسر بيختبر إيه بالظبط. في الدرس ده، هنغطي أكتر من 12 سؤال حقيقي من مقابلات السفارة التشيكية، إجابات نموذجية، والمنطق ورا كل سؤال.\n\nهتتعلم:\n• الأربع أنواع من أسئلة السفارة\n• الأوفيسر بيقيّم إيه فعلًا\n• إجابات نموذجية تبان طبيعية مش محفوظة\n• الحاجات اللي بتسبب رفض الطلب\n• تتصرف إزاي لو جالك سؤال مكنتش متوقعه"
          },
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "czech-geography-politics",
          "title": {
            "en": "Czech Geography, Politics & Culture Basics",
            "ar": "جغرافيا وسياسة وثقافة التشيك"
          },
          "duration": "10 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "education-system",
          "title": {
            "en": "Czech Education System vs. Your Country",
            "ar": "نظام التعليم التشيكي مقارنة ببلدك"
          },
          "duration": "8 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "study-plan-explanation",
          "title": {
            "en": "Your Study Plan: Sound Prepared, Not Scripted",
            "ar": "خطة دراستك: ابان جاهز مش محفظ"
          },
          "duration": "9 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "embassy-mistakes",
          "title": {
            "en": "Common Embassy Mistakes That Get People Rejected",
            "ar": "أخطاء السفارة الشائعة اللي بتسبب الرفض"
          },
          "duration": "7 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "document-checklist",
          "title": {
            "en": "Complete Document Checklist & Preparation",
            "ar": "قائمة الأوراق الكاملة والتجهيز"
          },
          "duration": "11 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "visa-application-walkthrough",
          "title": {
            "en": "Visa Application Step-by-Step",
            "ar": "طلب الفيزا خطوة بخطوة"
          },
          "duration": "10 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        }
      ],
      "quiz": {
        "title": {
          "en": "Module 1 Quiz: Embassy & Pre-Arrival",
          "ar": "اختبار الوحدة 1: السفارة وقبل السفر"
        },
        "passingScore": 70,
        "questionCount": 5
      }
    },
    {
      "id": "first-week",
      "title": {
        "en": "Your First Week Survival Kit",
        "ar": "حقيبة النجاة لأول أسبوع"
      },
      "subtitle": {
        "en": "Everything from airport to settled",
        "ar": "كل حاجة من المطار لحد ما تستقر"
      },
      "icon": "MapPin",
      "lessons": [
        {
          "id": "airport-to-home",
          "title": {
            "en": "Airport to Your Accommodation",
            "ar": "من المطار لمكان سكنك"
          },
          "duration": "8 min",
          "isFree": true,
          "hasVideo": false,
          "content": {
            "en": "Step-by-step guide from the moment you land.\n\n• What to do at passport control\n• Best transport from Prague airport (bus 119 + metro vs taxi vs Bolt)\n• How to buy a transport ticket at the airport\n• What to have ready on your phone\n• Getting to Brno or other cities from Prague",
            "ar": "دليل خطوة بخطوة من لحظة ما تنزل.\n\n• تعمل إيه في الجوازات\n• أحسن طريقة من مطار براغ (باص 119 + مترو ولا تاكسي ولا Bolt)\n• إزاي تشتري تذكرة مواصلات في المطار\n• إيه اللي لازم يبقى جاهز على موبايلك\n• إزاي توصل برنو أو مدن تانية من براغ"
          },
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "foreign-police",
          "title": {
            "en": "Foreign Police Registration",
            "ar": "تسجيل شرطة الأجانب"
          },
          "duration": "9 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "first-day-checklist",
          "title": {
            "en": "SIM, Bank, Transport Pass — First Day Checklist",
            "ar": "شريحة موبايل، بنك، اشتراك مواصلات — قائمة أول يوم"
          },
          "duration": "10 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "first-grocery-run",
          "title": {
            "en": "Your First Grocery Run",
            "ar": "أول مشوار سوبر ماركت"
          },
          "duration": "7 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "emergency-phrases",
          "title": {
            "en": "Emergency Czech Phrases",
            "ar": "جمل تشيكي طوارئ"
          },
          "duration": "12 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "accommodation-tips",
          "title": {
            "en": "Accommodation: Dorms vs Rent",
            "ar": "السكن: سكن جامعي ولا إيجار"
          },
          "duration": "8 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "weather-packing",
          "title": {
            "en": "Czech Weather & What to Pack",
            "ar": "طقس التشيك وإيه اللي تاخده معاك"
          },
          "duration": "6 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        }
      ],
      "quiz": {
        "title": {
          "en": "Module 2 Quiz: First Week Survival",
          "ar": "اختبار الوحدة 2: النجاة في أول أسبوع"
        },
        "passingScore": 70,
        "questionCount": 5
      }
    },
    {
      "id": "daily-life",
      "title": {
        "en": "Daily Life Conversations",
        "ar": "محادثات الحياة اليومية"
      },
      "subtitle": {
        "en": "Restaurant, supermarket, transport, doctor, university",
        "ar": "مطعم، سوبر ماركت، مواصلات، دكتور، جامعة"
      },
      "icon": "Coffee",
      "lessons": [
        {
          "id": "ordering-food",
          "title": {
            "en": "Ordering Food & Drinks",
            "ar": "طلب أكل وشرب"
          },
          "duration": "10 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "shopping-pharmacy",
          "title": {
            "en": "Supermarket & Pharmacy",
            "ar": "سوبر ماركت وصيدلية"
          },
          "duration": "8 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "public-transport",
          "title": {
            "en": "Public Transport Conversations",
            "ar": "محادثات المواصلات العامة"
          },
          "duration": "8 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "at-the-doctor",
          "title": {
            "en": "At the Doctor",
            "ar": "عند الدكتور"
          },
          "duration": "9 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "university-admin",
          "title": {
            "en": "University Admin & Registration",
            "ar": "إدارة الجامعة والتسجيل"
          },
          "duration": "9 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "landlord-neighbors",
          "title": {
            "en": "Talking to Your Landlord & Neighbors",
            "ar": "الكلام مع صاحب البيت والجيران"
          },
          "duration": "7 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "phone-calls-emails",
          "title": {
            "en": "Phone Calls & Formal Emails in Czech",
            "ar": "مكالمات تليفون وإيميلات رسمية بالتشيكي"
          },
          "duration": "8 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        }
      ],
      "quiz": {
        "title": {
          "en": "Module 3 Quiz: Daily Life",
          "ar": "اختبار الوحدة 3: الحياة اليومية"
        },
        "passingScore": 70,
        "questionCount": 4
      }
    },
    {
      "id": "czech-culture",
      "title": {
        "en": "Understanding Czech People",
        "ar": "فهم الشعب التشيكي"
      },
      "subtitle": {
        "en": "Culture, making friends, avoiding common mistakes",
        "ar": "ثقافة، صداقات، تجنب الأخطاء الشائعة"
      },
      "icon": "Heart",
      "lessons": [
        {
          "id": "czech-social-norms",
          "title": {
            "en": "Why Czechs Seem Cold (They're Not)",
            "ar": "ليه التشيك بيبانوا باردين (بس مش كده)"
          },
          "duration": "9 min",
          "isFree": true,
          "hasVideo": false,
          "content": {
            "en": "Understanding Czech communication style and social norms.\n\n• Why Czechs don't smile at strangers (it's not rudeness)\n• Direct communication vs Arabic indirect style\n• How Czechs build friendships (slowly but deeply)\n• Personal space and physical contact differences\n• The Czech sense of humor (dry, sarcastic, brilliant)",
            "ar": "فهم أسلوب التواصل والعادات الاجتماعية التشيكية.\n\n• ليه التشيك مش بيبتسموا للغرباء (مش قلة أدب)\n• التواصل المباشر مقابل الأسلوب العربي غير المباشر\n• إزاي التشيك بيبنوا صداقات (ببطء بس بعمق)\n• فرق المساحة الشخصية والتلامس\n• الحس الكوميدي التشيكي (ساخر وذكي)"
          },
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "arab-czech-differences",
          "title": {
            "en": "Arab vs Czech Cultural Differences",
            "ar": "فروق بين الثقافة العربية والتشيكية"
          },
          "duration": "10 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "making-czech-friends",
          "title": {
            "en": "How to Actually Make Czech Friends",
            "ar": "إزاي فعلًا تعمل صحاب تشيك"
          },
          "duration": "8 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "cultural-misunderstandings",
          "title": {
            "en": "Common Cultural Misunderstandings",
            "ar": "سوء الفهم الثقافي الشائع"
          },
          "duration": "8 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "holidays-traditions",
          "title": {
            "en": "Czech Holidays & Traditions",
            "ar": "أعياد وتقاليد التشيك"
          },
          "duration": "7 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "dealing-with-homesickness",
          "title": {
            "en": "Dealing with Homesickness & Culture Shock",
            "ar": "التعامل مع الحنين للبلد وصدمة الثقافة"
          },
          "duration": "8 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        }
      ],
      "quiz": {
        "title": {
          "en": "Module 4 Quiz: Czech Culture",
          "ar": "اختبار الوحدة 4: الثقافة التشيكية"
        },
        "passingScore": 70,
        "questionCount": 4
      }
    },
    {
      "id": "building-life",
      "title": {
        "en": "Building Your Life Here",
        "ar": "بناء حياتك هنا"
      },
      "subtitle": {
        "en": "Work, money, travel, visa renewal",
        "ar": "شغل، فلوس، سفر، تجديد الفيزا"
      },
      "icon": "Briefcase",
      "lessons": [
        {
          "id": "student-jobs",
          "title": {
            "en": "Student Jobs: Legal, Where, How Much",
            "ar": "وظائف الطلاب: إيه القانوني وفين وبكام"
          },
          "duration": "10 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "managing-money",
          "title": {
            "en": "Managing Your Money in Czechia",
            "ar": "إدارة فلوسك في التشيك"
          },
          "duration": "9 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "weekend-travel",
          "title": {
            "en": "Weekend Trips & Cheap European Travel",
            "ar": "رحلات ويك إند وسفر أوروبي رخيص"
          },
          "duration": "8 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "visa-renewal",
          "title": {
            "en": "Visa Renewal: What's Different the Second Time",
            "ar": "تجديد الفيزا: إيه المختلف المرة التانية"
          },
          "duration": "10 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "staying-after-graduation",
          "title": {
            "en": "Staying After Graduation",
            "ar": "البقاء بعد التخرج"
          },
          "duration": "9 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "mental-health-wellbeing",
          "title": {
            "en": "Mental Health & Well-being Abroad",
            "ar": "الصحة النفسية والرفاهية في الغربة"
          },
          "duration": "7 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        },
        {
          "id": "czech-language-learning",
          "title": {
            "en": "Next Steps: Learning Czech Beyond Survival",
            "ar": "الخطوة الجاية: تعلم تشيكي أبعد من النجاة"
          },
          "duration": "8 min",
          "isFree": false,
          "hasVideo": false,
          "content": null,
          "videoUrl": null,
          "resources": []
        }
      ],
      "quiz": {
        "title": {
          "en": "Module 5 Quiz: Building Your Life",
          "ar": "اختبار الوحدة 5: بناء حياتك"
        },
        "passingScore": 70,
        "questionCount": 5
      }
    }
  ]
};

// Helper to count total lessons
export function getTotalLessons(): number {
  return COURSE.modules.reduce((sum, m) => sum + m.lessons.length, 0);
}

// Helper to get flat list of all lessons with module context
export type FlatLesson = {
  moduleId: string;
  moduleTitle: { en: string; ar: string };
  moduleIndex: number;
  lessonIndex: number;
  lesson: Lesson;
};

export function getFlatLessons(): FlatLesson[] {
  return COURSE.modules.flatMap((mod, mi) =>
    mod.lessons.map((lesson, li) => ({
      moduleId: mod.id,
      moduleTitle: mod.title,
      moduleIndex: mi,
      lessonIndex: li,
      lesson,
    }))
  );
}

// Get next/prev lesson
export function getAdjacentLessons(moduleId: string, lessonId: string) {
  const flat = getFlatLessons();
  const idx = flat.findIndex(
    (f) => f.moduleId === moduleId && f.lesson.id === lessonId
  );
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    current: flat[idx] ?? null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}
