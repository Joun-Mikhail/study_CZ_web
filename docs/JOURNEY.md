# Visitor journey: from free tools to paid help

Phase 3, Step 0. Part 1 maps what is on the site today (checked against the code on `main` on 12 October 2026). Part 2 proposes the changes, with exact English and Arabic copy, for John to approve before anything is built. Part 3 lists the decisions only John can make.

Tool pages use Egyptian Arabic. The parents page and anything legal use light Modern Standard Arabic. Prices are never typed: `{price:x}` below means `<PriceTag k="x">` / `price("x")`.

---

## Part 1: The journey today

### Summary

- **8 places send visitors straight to Stripe** from free content: 3 `ContextualCTA`s (cost of living, application guide, preparatory year), 4 stage pages and the eligibility result. None of them show who helps, what happens after paying, or how long it takes. Only one (the "choosing" stage page) shows a refund line.
- **The eligibility result's loudest button sells the most expensive service:** Full Journey step 1, straight to Stripe, after a free quiz. Its "timeline is tight" advice also offers the Full Journey.
- **The fear copy lives in three places:** `contextual-ctas.ts`, `stages.ts` (`paidService.fearTrigger`) and `ServicesClient.tsx` (`fearTrigger` and `triggerLine`). The services page also contains stories and statistics that aren't sourced (see Part 3, question 7).
- **"Our team" appears in the application guide** (EN and AR). That breaks "a person, not a company".
- **Nothing a visitor does is kept,** except programmes they save. The eligibility result, matcher results and budget disappear on reload. My Journey only knows about saved programmes.
- **Analytics only sees the end of two tools.** There is no "started" event. `checkout_click` doesn't know which section the click came from.
- **Unused copy with a typed price:** `translations.ts` → `matcher.ctaButton` (AR) says "احجز مراجعة طلب بـ300 كرونة". It isn't rendered, but it breaks rule 1. I'll delete it.

### Tool by tool

Notes for this table:
- "Stripe" means a direct `buy.stripe.com` link through `PAYMENT_LINKS`.
- `checkout_click` and `whatsapp_click` fire on every page through the global listener in `umami.tsx`, so they aren't repeated in each row.
- The floating WhatsApp button is on every page (it appears after scrolling, never opens anything by itself).

| Tool / page | What the visitor gets at the end | Offers and calls to action today (exact EN copy → destination) | Own events |
|---|---|---|---|
| **Eligibility** `/eligibility/` | A readiness % ring and 5 categories (academics, documents, finances, timeline, language), each pass / warning / fail. Warnings and fails expand to advice. | <ul><li>Per category: a free guide link, then "Or get a consultation — €7.50", "Or get your documents reviewed — €12.50", "Or get full application assistance — €75 to start" (timeline warning) → `/services/`</li><li>"Email me my result" → Brevo (hidden until `NEXT_PUBLIC_EMAIL_ENABLED`)</li><li>Three buttons: "I'll handle it myself" → `/qa/`; "I need help with specific things" → `/services/`; **"I want someone to guide me through everything — Start with €75"** → **Stripe, Full Journey step 1** (primary style)</li><li>"Want this report sent to you? … Message me on WhatsApp" → WhatsApp ("Hi John, I have a question about my eligibility results")</li></ul> | `eligibility_completed` |
| **Matcher** `/university-matcher/` | Ranked list of matching programmes (cards link to programme pages). | <ul><li>"Found your programme? Let's check if you're ready to apply." → `/eligibility/`</li><li>Brevo deadline alerts for the top 5 (hidden until enabled)</li><li>"Deadline Tracker" → `/deadlines/`</li></ul>No paid offer. Results aren't saved. | `matcher_completed {field}` |
| **Cost of living** `/cost-of-living/` | Monthly range for a city and lifestyle, one-time costs, a city guide and a part-time work calculator showing the shortfall. There's no field for the visitor's own budget. | <ul><li>`ContextualCTA consultation` (shown to everyone, mid-page): "If you're stuck on this · Ask Me Anything: 30 Minutes · The answer that takes you 3 weeks of forum scrolling takes me 3 minutes. · Book a Call (€7.50)" → **Stripe**</li><li>"Get the free document checklist" → Brevo</li></ul> | none |
| **Deadlines** `/deadlines/` | Filterable list of programmes with deadline status, days left and "under 30 days" warnings. | "Check official page" → university; "Browse universities"; "Check my eligibility". No save, no reminder, no offer. | none |
| **Programme page** `/programmes/<id>/` | Fees, deadline, documents, entrance exam, verified source. | <ul><li>"Save" → My Journey (localStorage)</li><li>"Remind me before the deadline" → Brevo (hidden until enabled)</li><li>"Visit official page"</li><li>"Compare"</li></ul>No paid offer. | none |
| **Application guide** `/application-guide/` | Step-by-step guide, from choosing a programme to the visa. | <ul><li>After the "authenticate" step: `ContextualCTA documentCheck`: "Document Check: Before You Submit · I've seen students rejected for a missing apostille, a wrong date format, or a translation that used the wrong legal term. Don't be that student. · Get My Documents Reviewed (€12.50)" → **Stripe**</li><li>Bottom: "Overwhelmed by the paperwork? Let **our team** review your documents… · Book a Document Review (€12.50)" → `/services/`</li></ul>The same service is offered twice on one page. | none |
| **Preparatory year** `/preparatory-year/` | Programmes, costs and visa documents for a language year. | After the visa section: `ContextualCTA interviewPrep`: "Embassy Interview Prep: Don't Walk In Unprepared · The interview lasts 10 minutes. The wrong answer lasts 6 months. · Book My Mock Interview — €19.50" → **Stripe** | none |
| **Recognition guides** `/recognition/{egypt,jordan,saudi-arabia}/` | A sourced, step-by-step equivalence procedure. | "Want your documents checked before you send them? I go through every page the way the embassy officer will, before you submit. · See the document review" → `/services/#svc-documentReview` | none |
| **Parents** `/for-parents/` | Cost, safety, how payment and refunds work (Full Journey explained as two steps, factually). | WhatsApp ("studying in Czechia (I'm a parent)") and email. No Stripe. **Already the model we want.** | none |
| **Stage pages** `/stage/<slug>/` (from the homepage stage router) | Free guides and FAQs for that stage. | One `paidService` per stage, with the same fear copy as `ContextualCTA`, as a large primary button → **Stripe** (consultation, documentReview, interviewPrep, arrivalSupport) | none |
| **My Journey** `/my-journey/` | Saved programmes, each with a checklist and a progress bar. | At 60–99 % progress: "You're almost there! Need help reviewing your documents before you submit? · Document Review" → `/services/`. Empty state → `/programmes/`, `/university-matcher/`. | none |
| **Services, course, interview prep, arrival** | Sales pages | Direct Stripe buttons with the refund line underneath. Out of scope for the help sheet (people there have decided), except for the copy rewrite in A5. | `purchase` on `/thanks/` |

---

## Part 2: Proposed changes

### 2.1 Risk → help mapping (needs your OK)

The eligibility quiz finds five kinds of risk. Each risk gets a free fix first and at most one paid service: the cheapest one that fixes it.

| Risk the tool finds | Free fix (shown first) | Matched service (via the help sheet) |
|---|---|---|
| **Documents:** apostille not done or unknown, translation missing, passport expiring | Application guide, apostille step; the recognition guide for their country | Document review |
| **Finances:** proof of funds "can arrange" or "no" | Cost of living calculator; preparatory year (Czech-taught degrees are tuition-free); scholarships | 30-minute call |
| **Timeline:** starting this semester with gaps | Application guide; deadline tracker | 30-minute call (**was Full Journey**) |
| **Academics:** grade below the usual threshold | Preparatory year guide; the "no entrance exam" list | 30-minute call |
| **Academics:** education level missing | Application guide | none |
| **Language:** no certificate | Q&A on language requirements | none (nothing I sell fixes it) |
| **Embassy interview** (My Journey at the visa stage; the prep-year visa section) | Interview prep guide (`/interview-prep/`, free part) | Mock interview |
| **Two or more fails**, or the visitor picks "someone with me" (see question 4) | Everything above | **Full Journey**, worded as "step 1 now, step 2 only after a university accepts you" |
| **"I'll do it myself"** | Free guides + My Journey | The course, **only after arrival** (see question 3) |

Rules the component enforces:
- The same service never appears twice in one result.
- Risks are ordered by fail before warning, then documents → finances → timeline → academics → language.
- At most three risks are shown.

### 2.2 Eligibility result: new structure and copy

The order becomes: verdict → top three risks → timeline → save/email/send → start over. The three-button menu is removed. The Full Journey appears only under the condition above.

**Headings and verdict**

| Element | Before (EN / AR) | After (EN) | After (AR, Egyptian) |
|---|---|---|---|
| Title | Your Eligibility Assessment / شوف وضعك | Your plan | خطتك |
| Verdict: no fails, ≤ 1 warning | (none) | You're in a good position to apply. | وضعك كويس وتقدر تقدم. |
| Verdict: no more than one fail | (none) | You can apply. Fix these first. | تقدر تقدم، بس صلّح الحاجات دي الأول. |
| Verdict: two or more fails | (none) | Not yet, but here's how to get there. | لسه مش دلوقتي، بس دي الطريقة اللي توصلك. |
| Risks heading | (none) | The three things to work on | أهم 3 حاجات تشتغل عليها |
| Free-fix label | (varies) | Do it yourself: {existing freeLabel} | اعملها بنفسك: {freeLabel} |
| Service link (opens the help sheet) | "Or get your documents reviewed — €12.50" → `/services/` | Or I can check your documents for you | أو أراجعلك أوراقك بنفسي |
| | "Or book a consultation — €7.50" / "Or get full application assistance — €75 to start" | Or let's plan it together in a 30-minute call | أو نخططها مع بعض في مكالمة 30 دقيقة |

**Advice lines rewritten to drop the threats (facts kept)**

| Category | Before (EN) | After (EN) | After (AR) |
|---|---|---|---|
| Documents, fail | The embassy does not tell you what is wrong — they just say "rejected." You will not know which document killed your application unless someone checks before you submit. | An apostille you're unsure about, or a passport that expires too soon, can hold up the whole application. Both are fixable. Start with the apostille: it usually takes 4–8 weeks. | الأبوستيل اللي مش متأكد منه، أو جواز سفر هيخلص بدري، ممكن يوقفوا الطلب كله. والاتنين ليهم حل. ابدأ بالأبوستيل لإنه غالبًا بياخد من 4 لـ8 أسابيع. |
| Finances, fail | Without proof of financial support, your visa will almost certainly be rejected. This is one of the most common reasons for denial. | The embassy asks for proof of about €5,500 a year before it grants a student visa, so this needs a plan before you apply. The calculator shows what you'll really need; cheaper cities and scholarships can close the gap. | السفارة بتطلب إثبات حوالي 5,500 يورو في السنة قبل ما تدي فيزا الطالب، فده محتاج خطة قبل ما تقدم. الحاسبة هتوريك محتاج كام فعلًا، والمدن الأرخص والمنح ممكن يسدوا الفرق. |
| Timeline, fail | …applying this semester risks a rejection that goes on your record… | With this timeline and a few gaps still open, the next intake gives you time to apply properly instead of in a rush. | بالوقت ده ومع النواقص اللي لسه مفتوحة، الدفعة الجاية هتديك وقت تقدم صح بدل ما تقدم على عجلة. |

The other advice lines are factual already and stay as they are.

**Full Journey (only for two or more fails, or "someone with me")**

| EN | AR |
|---|---|
| **Several things need work at once.** If you'd rather not juggle them alone, I can go through the whole process with you. You pay step 1 ({price:fullPackageStep1}) now. Step 2 ({price:fullPackageStep2}) is only due after a university accepts you. | **في كذا حاجة محتاجة شغل في نفس الوقت.** لو مش عايز تشيلهم لوحدك، أقدر أمشي معاك في العملية كلها. بتدفع المرحلة الأولى ({price:fullPackageStep1}) دلوقتي، والتانية ({price:fullPackageStep2}) بس بعد ما جامعة تقبلك. |
| Button: See how the Full Journey works (opens the help sheet) | شوف الرحلة الكاملة بتمشي إزاي |

**Timeline to their intake**

These are relative steps, not invented dates. Real dates come from the deadline tracker.

| EN | AR |
|---|---|
| **Your timeline** | **الجدول بتاعك** |
| 1. Now: start the apostille and translations (4–8 weeks). | 1. دلوقتي: ابدأ الأبوستيل والترجمة (من 4 لـ8 أسابيع). |
| 2. Pick your programmes and note their deadlines → Deadline tracker | 2. اختار برامجك واكتب مواعيدها ← متتبع المواعيد |
| 3. Apply before each programme's deadline. | 3. قدّم قبل آخر ميعاد لكل برنامج. |
| 4. After you're accepted: book the embassy appointment. A decision on a study visa can take up to 60 days.¹ | 4. بعد القبول: احجز ميعاد السفارة. قرار فيزا الدراسة ممكن ياخد لحد 60 يوم.¹ |
| 5. When you arrive: register with the foreign police within 3 working days.¹ | 5. أول ما توصل: سجّل في شرطة الأجانب خلال 3 أيام عمل.¹ |
| *If they chose "this semester" and have two or more fails:* Aim for the next intake. It gives you time to do this properly. | خلي هدفك الدفعة الجاية، هتديك وقت تعملها صح. |

¹ Before building, I'll verify both figures against mvcr.cz and link the source next to them, as rule 6 requires. If I can't source a figure, it doesn't ship.

**Actions**

| Button | EN | AR | What it does |
|---|---|---|---|
| Save | Save to My Journey | احفظ في رحلتي | Stores the verdict and risks in localStorage, then links to `/my-journey/`. Fires `plan_saved {tool}`. |
| Email | Email me this plan | ابعتلي الخطة على الإيميل | The existing Brevo form, hidden until it's configured. |
| WhatsApp | Send my plan to John | ابعت خطتي لجون | Opens WhatsApp with a summary (below). Fires `plan_sent_whatsapp {tool}`. |
| Reset | Start over | ابدأ من الأول | unchanged |

The prefilled WhatsApp message contains only answers, never the name or email they typed:

- EN: `Hi John, here's my plan from the eligibility check. Readiness: 60%. To work on: documents (apostille not done), finances (can arrange funds). Starting: next academic year. Can you help me with the next step?`
- AR: `أهلًا جون، دي خطتي من اختبار الأهلية. الجاهزية: 60%. محتاج أشتغل على: الأوراق (لسه ماعملتش أبوستيل)، الفلوس (أقدر أرتبها). عايز أبدأ: السنة الدراسية الجاية. ممكن تساعدني في الخطوة الجاية؟`

**Removed:** the three buttons ("I'll handle it myself" / "I need help with specific things" / "I want someone to guide me… Start with €75") and the separate "Want this report sent to you?" box, which is replaced by "Send my plan to John".

### 2.3 The help sheet

It opens only when the visitor taps. It's a bottom sheet on phones and a side panel on desktop, with a focus trap, Escape to close, and full RTL support. Closing it is one tap: "Not now".

**Shared copy**

| Element | EN | AR (tools, Egyptian) | AR (parents page, MSA) |
|---|---|---|---|
| John's line | I'm John. I'll do this with you myself, on WhatsApp. | أنا جون، وهعمل ده معاك بنفسي على واتساب. | أنا جون، وسأتابع ذلك معكم بنفسي عبر واتساب. |
| What you get | What you get | هتاخد إيه | ما الذي تحصلون عليه |
| After paying | What happens after you pay | إيه اللي بيحصل بعد ما تدفع | ماذا يحدث بعد الدفع |
| Time | How long it takes | بياخد قد إيه | المدة |
| Refund | Refund rule | قاعدة الاسترداد | قاعدة الاسترداد |
| Primary button | Continue to secure payment · {PriceTag} | كمّل للدفع الآمن · {PriceTag} | المتابعة إلى الدفع الآمن · {PriceTag} |
| Secondary button | Ask me first on WhatsApp | اسألني الأول على واتساب | اسألوني أولًا عبر واتساب |
| Close | Not now | مش دلوقتي | ليس الآن |

**Per service.** Bullets are taken from the existing `included` lists on `/services/`, the steps from `/thanks/` and the refund rules from `REFUND_COPY.perService`. Nothing new is promised.

| Service | 3 bullets (EN) | How long (EN) |
|---|---|---|
| 30-minute call | 30-minute video or voice call, your choice · I look at your situation before the call · A written summary afterwards, plus 48 hours of WhatsApp follow-up | At a time we agree on WhatsApp **(question 5)** |
| Document review | A full review of your whole document package · A written report: what's right, what to fix, what's missing · One follow-up round to confirm you're good | Written report within 5 business days of receiving your documents |
| Mock interview | A 45-minute mock interview by video · Feedback on your answers and confidence · A written sheet of the 15 most common questions | One session at a time we agree; WhatsApp support until your interview |
| Arrival plan | A first-two-weeks checklist for your city · Foreign police and bank account walkthrough · 14 days of WhatsApp support | **Question 5** |
| Full Journey | Choosing universities and programmes that fit you · Documents, translations, visa and a mock interview · WhatsApp with me throughout, plus 30 days after you arrive | First session at a time we agree; step 2 only after acceptance |

The Arabic bullets are the existing Arabic `included` lines from `ServicesClient.tsx`, trimmed to the same three.

**Where the help sheet replaces a direct Stripe link:** eligibility, cost of living, programme pages, My Journey, `ContextualCTA` (application guide, prep year) and the recognition guides. Stage pages are added for approval (they're content, and they link straight to Stripe today). Services, course, interview-prep and arrival keep their direct buttons (question 8).

### 2.4 `fearTrigger` → `stuckLine` (ContextualCTA, stage pages, services)

| Service | Before (EN) | After (EN) | After (AR, Egyptian) |
|---|---|---|---|
| Call: title | Ask Me Anything: 30 Minutes | *(unchanged)* | *(unchanged)* |
| Call: line | The answer that takes you 3 weeks of forum scrolling takes me 3 minutes. | Stuck on one question you can't get a straight answer to? Ask me in a 30-minute call, and I'll tell you what I'd do in your place. | واقف عند سؤال مش لاقيله إجابة واضحة؟ اسألني في مكالمة 30 دقيقة، وهقولك أنا كنت هعمل إيه مكانك. |
| Documents: title | Document Check: Before You Submit | *(unchanged)* | *(unchanged)* |
| Documents: line | I've seen students rejected for a missing apostille, a wrong date format, or a translation that used the wrong legal term. Don't be that student. | Stuck on the apostille or the translations? Send me your documents and I'll check every page before you submit. | واقف عند الأبوستيل أو الترجمة؟ ابعتلي أوراقك وأنا أراجع كل صفحة قبل ما تقدم. |
| Interview: title | Embassy Interview Prep: Don't Walk In Unprepared | Embassy interview: let's practise it first | مقابلة السفارة: نتدرب عليها الأول |
| Interview: line | The interview lasts 10 minutes. The wrong answer lasts 6 months. | Nervous about the embassy interview? Let's practise it together with the questions embassies ask, so nothing on the day surprises you. | قلقان من مقابلة السفارة؟ يلا نتدرب عليها مع بعض بالأسئلة اللي السفارات بتسألها، عشان مافيش حاجة تفاجئك يومها. |
| Arrival: title | Landed in Czechia? I've Got You. | *(unchanged)* | *(unchanged)* |
| Arrival: line | Your first 2 weeks will be overwhelming. Bank account, foreign police, insurance, transport, phone, and everything is in Czech. | The first two weeks are a lot: foreign police, bank, insurance, transport, a SIM card, mostly in Czech. I'll give you a checklist for your city and answer your questions while you settle in. | أول أسبوعين فيهم حاجات كتير: شرطة الأجانب، البنك، التأمين، المواصلات، الشريحة، ومعظمها بالتشيكي. هديك قائمة لمدينتك وهرد على أسئلتك وأنت بتستقر. |
| Full Journey: line | For students who don't want to figure it out alone… | *(unchanged, not fear copy)* | *(unchanged)* |
| Kicker above every block | If you're stuck on this / لو لسه واقف عند ده | *(unchanged)* | *(unchanged)* |
| Icon | `ShieldAlert` (warning shield) | John's photo | John's photo |

The button labels stay the same, but they open the help sheet instead of Stripe.

**`triggerLine` on `/services/`.** Four of these are stories or statistics I can't source. They stay unless you confirm they're true (question 7). These are the replacements if you don't:

| Service | Before | After (EN) | After (AR) |
|---|---|---|---|
| Call | One wrong assumption about your visa documents can delay your application by 6 months… | Not sure about one thing? Asking is usually faster than searching. | مش متأكد من حاجة واحدة؟ السؤال غالبًا أسرع من البحث. |
| Documents | The embassy doesn't tell you what's wrong… | It's much easier to fix a document before you submit it than after. | تصليح الورقة قبل ما تقدمها أسهل بكتير من بعدها. |
| Interview | Last year, a student was rejected because he couldn't explain his study plan… | Interview questions usually centre on your study plan: why this programme, why Czechia, how you'll pay. That's exactly what we practise. | أسئلة المقابلة غالبًا بتدور حوالين خطتك الدراسية: ليه البرنامج ده، ليه التشيك، وهتصرف إزاي. وده بالظبط اللي هنتدرب عليه. |
| Arrival | A student last semester missed his foreign police deadline… | You have 3 working days after arrival to register with the foreign police. I'll tell you where to go and what to bring. | قدامك 3 أيام عمل بعد وصولك تسجل في شرطة الأجانب، وهقولك تروح فين وتاخد معاك إيه. |
| Full Journey | Students who go through this process alone spend an average of 3 months longer… | For when several things need work at once and you'd rather have one person with you for all of it. | لما يكون في كذا حاجة محتاجة شغل في نفس الوقت، وتحب يكون معاك شخص واحد في كل ده. |

### 2.5 Other tools

| Place | Before | After (EN) | After (AR) |
|---|---|---|---|
| Matcher results | (no offer; results lost on reload) | **Save these to My Journey** | **احفظهم في رحلتي** |
| | | Not sure between these? Let's pick together in 30 minutes. → help sheet (call) | محتار بينهم؟ يلا نختار مع بعض في 30 دقيقة. |
| Cost of living | `ContextualCTA consultation` shown to everyone, mid-page | New input: **Your monthly budget (CZK)**. The offer appears only when there's a gap, after the free fixes: | **ميزانيتك في الشهر (بالكرونة)** |
| | | Your budget is about {gap} a month short of a realistic total in {city}. Ways to close it: a cheaper city · a preparatory year, then a tuition-free Czech-taught degree · scholarships · part-time work (calculator below) | ميزانيتك ناقصة حوالي {gap} في الشهر عن التكلفة الواقعية في {city}. ودي طرق تسد الفرق: مدينة أرخص · سنة تحضيرية وبعدها دراسة بالتشيكي ببلاش · منح · شغل بارت تايم (الحاسبة تحت) |
| | | Want to go through your numbers together? → help sheet (call) | عايز نراجع أرقامك مع بعض؟ |
| | | Save my budget to My Journey | احفظ ميزانيتي في رحلتي |
| Deadlines list | no save | A save button on each card. **No offers on the list** (one per card would be a menu). | |
| Programme page | Save + Remind me | Unchanged, plus, **only when a verified deadline is under 8 weeks away:** {N} days to the deadline. Want me to check your documents before you submit? → help sheet (document review) | فاضل {N} يوم على آخر ميعاد. تحب أراجع أوراقك قبل ما تقدم؟ |
| Application guide, bottom | Overwhelmed by the paperwork? Let our team review your documents… · Book a Document Review (€12.50) | **Removed as an offer** (the mid-guide one stays, at the apostille step where people get stuck). Replaced by free next steps: Check where you stand (2 minutes) → eligibility · Save your progress → My Journey | شوف وضعك في دقيقتين · احفظ اللي وصلتله في رحلتي |
| Recognition guides | See the document review → `/services/` | Same copy (already first person, MSA); the button opens the help sheet | (unchanged) |
| Parents | WhatsApp + email | Unchanged, plus the founder card | |
| My Journey, at 60–99 % | You're almost there! Need help reviewing your documents… → `/services/` | Replaced by the "Your next step" card (2.6) | |

### 2.6 My Journey: "Your next step"

The first rule that matches wins. Each step shows **Do it yourself** (free) and **Do it with John** (help sheet).

| State | Next step (EN) | AR | Free | With John |
|---|---|---|---|---|
| No eligibility result | Check where you stand. It takes 2 minutes. | شوف وضعك، هياخد دقيقتين. | `/eligibility/` | none |
| Eligibility has an open risk | Work on: {top risk} | اشتغل على: {أهم نقطة} | The risk's guide | The risk's service (2.1) |
| No saved programmes | Find programmes that fit you | لاقي البرامج اللي تناسبك | `/university-matcher/` | Call |
| Saved programme with a verified deadline under 8 weeks and its checklist not done | {programme}: {N} days to the deadline | {البرنامج}: فاضل {N} يوم | Application guide | Document review |
| Stage = visa | Get ready for the embassy interview | جهّز نفسك لمقابلة السفارة | `/interview-prep/` | Mock interview |
| Stage = arrived | Your first two weeks | أول أسبوعين ليك | `/arrival/` | Arrival plan |
| Otherwise | Keep going through your checklists | كمّل في قوائمك | | none |

Labels: "Do it yourself" / "اعملها بنفسك"; "Do it with John" / "اعملها مع جون". The "Send my plan to John" and "Email me my plan" buttons appear here too.

### 2.7 Analytics events (A6)

No personal data: no names, emails, numbers or free text.

| Event | Data | Fires when | Status |
|---|---|---|---|
| `tool_started` | `{tool}` | First answer or first input in eligibility, matcher, cost of living | new |
| `tool_completed` | `{tool}` | Result shown | new; replaces `eligibility_completed` and `matcher_completed` (their history stays in Umami; reports will note the switch date) |
| `plan_saved` | `{tool}` | Save to My Journey | new |
| `plan_sent_whatsapp` | `{tool}` | Send my plan to John | new |
| `help_sheet_open` | `{service, source}` | Help sheet opened | new |
| `checkout_click` | `{product, source}` | Stripe link clicked. `source` is the tool or section (e.g. `eligibility:documents`), `page` when there's none | `source` added |
| `email_signup`, `purchase`, `whatsapp_click` | unchanged | | exist |

Funnel: `tool_completed → help_sheet_open → checkout_click → purchase`. Traffic is too low for A/B tests, so reports compare four-week periods before and after each change.

---

## Part 3: Decisions only John can make

1. **Merge #54.** Its checks are green, but my merge was blocked by the session's permission rules. Please merge it, or allow me to.
2. **Approve, or edit, the copy and the mapping in 2.1–2.6.**
3. **The course as the do-it-yourself companion.** "Your First 90 Days in Czechia" covers life after arrival, not applying. Offering it to someone who just finished the eligibility quiz would sell them something that doesn't help yet. My proposal is to offer it only from the visa and arrived stages (My Journey, stage pages, arrival guide). OK?
4. **"I want someone with me."** Nothing in the quiz asks this. Should I add an optional last question, "How would you like to do this? By myself / With help on specific steps / With someone the whole way", whose third answer unlocks the Full Journey block? Without it, the Full Journey shows only for two or more fails.
5. **Delivery times** for the help sheet. The call and the arrival plan: how soon after payment? The Full Journey: how soon is the first session? Until you tell me, the help sheet says "at a time we agree on WhatsApp".
6. **Founder card.** `/about/` only says you started the Facebook group (11,000+ members) and that the site is built by a student who has been through it. The services page also says "I live here" and "I'm in Brno, 20 minutes from the foreign police office". May I use those in the card too?
7. **Unsourced claims on `/services/`:**
   - "I've seen students rejected for…";
   - "Last year, a student was rejected…";
   - "A student last semester missed his foreign police deadline…";
   - "spend an average of 3 months longer";
   - "Agencies often charge €1,500–€3,000".

   Are these true and from your own experience? If not, I'll use the replacements in 2.4 (and drop the agency price unless you have a source).
8. **The interview-prep and arrival pages** link straight to Stripe from the hero. I'd treat them like `/services/` and keep the direct buttons, adding the "after you pay" steps under each button. OK, or should they use the help sheet?
9. **Stage pages:** use the help sheet there too (my recommendation)?

When 2, 3, 4 and 9 are answered I'll start B0 (token rename) and A1 (help sheet). Questions 5–8 can come later, before the copy PR.

---

## Decisions taken (12 October 2026)

John asked me to continue without waiting for answers, so the build follows these defaults. Any of them can be reversed in a later PR.

1. #54: merged.
2. Copy and mapping: built as proposed in 2.1–2.6.
3. Course: offered only at the visa and arrived stages, never right after the eligibility quiz.
4. Eligibility gets an optional last question, "How would you like to do this?" Its third answer unlocks the Full Journey block.
5. Delivery times: the sheet says "at a time we agree on WhatsApp". No new promises.
6. Founder card: only facts already on `/about/` (the Facebook group and its size; built by a student who has been through it).
7. Unsourced stories and statistics on `/services/`: replaced with the factual lines in 2.4. The agency price range is dropped.
8. Interview-prep and arrival pages: keep their direct buttons.
9. Stage pages: use the help sheet.
