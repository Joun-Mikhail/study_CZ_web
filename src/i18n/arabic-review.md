Arabic Translation Review — suggested Standard Arabic (MSA) corrections

Overview
--------
This document extracts the Arabic strings currently in `src/i18n/translations.ts` and provides suggested corrections aimed at Modern Standard Arabic (MSA) and consistent tone. Many current strings use colloquial Egyptian Arabic (e.g., "أريد", "مجموعة", "أكثر") or informal spellings ("بالضبط") which may feel inconsistent across the site.

Plan
----
- I will apply corrections after you review and confirm the suggestions below.
- If you prefer keeping a colloquial tone for friendliness, tell me which sections (course, CTAs) should remain colloquial.

Suggested corrections (key path → current → suggested)
-----------------------------------------------------

- `nav.language`
  - current: "English"
  - suggestion: keep as-is (language label shows target language)

- `glance.stats.universities`
  - current: "أكثر من 60 جامعة"
  - suggestion: "أكثر من 60 جامعة"
  - note: replace "أكثر" → "أكثر"

- `glance.stats.programs`
  - current: "أكثر من 400 برنامج بالإنجليزي"
  - suggestion: "أكثر من 400 برنامج باللغة الإنجليزية"

- `glance.stats.students`
  - current: "أكثر من 50,000 طالب دولي"
  - suggestion: "أكثر من 50,000 طالب دولي"

- `glance.stats.cost`
  - current: "500–800€ شهريًا متوسط مصاريف المعيشة"
  - suggestion: "متوسط مصاريف المعيشة: 500–800€ شهريًا"

- `bento.cost.description`
  - current: "اعرف بالضبط هتصرف كم."
  - suggestion: "اعرف بالضبط كم ستنفق."
  - note: replace "بالضبط" → "بالضبط"; use formal verb phrasing

- `bento.matcher.description`
  - current: "جاوب على 3 أسئلة واحصل على ترشيح مخصص. بدون رسوم مكاتب أو نصب."
  - suggestion: "أجب عن 3 أسئلة واحصل على ترشيح مخصص. بدون رسوم وكالات أو عمليات احتيال."

- `glossary`/founder.story (tone and nouns)
  - current: uses "مجموعة" and colloquial phrasing "اللي بيحاولوا يفهموا" and "الآن بقى".
  - suggestion: replace with MSA: "مجموعة فيسبوك"; "الطلاب الذين يحاولون فهم"; "أصبح الآن".

- `scam.text`
  - current: "نحن مش بنطلب فلوس على أي رقم واتساب غير رسمي أو رسائل خاصة بتدعي إنها منّا. تأكد من أي خدمة مدفوعة بس من خلال روابط التواصل الرسمية على الموقع ده."
  - suggestion: "نحن لا نطلب مبالغ عبر أرقام واتساب غير رسمية أو رسائل خاصة تدّعي أنها منا. يرجى التحقق من أي خدمة مدفوعة عبر روابط التواصل الرسمية الموجودة على الموقع فقط."

- `guide.c taButton`
  - current: "احجز مراجعة أوراق — ٥٠٠ كرونة تشيكية"
  - suggestion: "احجز مراجعة الوثائق — 500 كرونة تشيكية تشيكية"
  - note: use Arabic-Indic digits consistency? Keep Arabic numerals for readability; here use Western numerals for compatibility.

- `services.tiers[*].price` and price strings
  - current: uses Arabic numerals in Arabic context ("٣٠٠ كرونة تشيكية", "٥٠٠ كرونة تشيكية"). Consider consistency: either use Western numerals ("300 كرونة تشيكية") or Arabic-Indic (٣٠٠). Suggest keeping Western numerals for technical clarity: "300 كرونة تشيكية".

- `founder.badge`
  - current: "مين ورا الموقع ده"
  - suggestion: "من وراء هذا الموقع" or "من يقف وراء الموقع" (more formal)

- `courses.subtitle`
  - current: "متعبش نفسك تتعلم تشيكي عن طريق الإنجليزي."
  - suggestion: "لا تُجهد نفسك بتعلّم التشيكية عن طريق الإنجليزية."

- `courses.curriculum[*].desc`
  - many entries use colloquial phrasing — suggest converting to formal MSA, e.g. "اتقان" → "إتقان" (normalize orthography), ensure consistent use of Arabic definite articles and terms.

- `courses.payment.copy` and `copied`
  - current: "نسخ", "اتنسخ!"
  - suggestion: "نسخ", "تم النسخ!"

- `guide.could-be-polished`
  - current: several informal words "امسك الأخطاء قبل ما السفارة تمسكها." Suggest: "نكتشف الأخطاء قبل أن تكتشفها السفارة." or "نتجنب رفض الطلبات باكتشاف الأخطاء مبكراً."

General rules to apply across file
--------------------------------
- Replace colloquial verbs like "أريد" → "هل تريد/تريد" or use "هل ترغب" depending on context.
- Replace "أكثر" → "أكثر".
- Replace informal nouns like "مجموعة" → "مجموعة".
- Use consistent numerals (recommend Western digits for amounts and counts).
- Prefer "كرونة تشيكية تشيكية" when mentioning the currency once in context.

Next steps
----------
1. Confirm you want MSA changes applied site-wide or only in specific sections.
2. I will produce a patch updating `src/i18n/translations.ts` with the approved corrections.
3. Optionally run an automated spellcheck and ask a native reviewer for final review.

If you're happy, reply "apply MSA fixes" and I'll apply the changes across `translations.ts`.
