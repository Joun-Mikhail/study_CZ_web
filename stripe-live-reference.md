# Stripe — Live Links + Final Descriptions
## Study in Czechia

---

## PART 1 — LINK MAPPING

All 7 validated: live mode (no `test_`), correct domain, no duplicates.

| # | Product | Price | Config key | Public? |
|---|---|---|---|---|
| 1 | Quick Consultation | €15 | `consultation` | Yes |
| 2 | Document Review | €25 | `documentReview` | Yes |
| 3 | Post-Arrival Support | €29 | `arrivalSupport` | Yes |
| 4 | Embassy Interview Prep | €39 | `interviewPrep` | Yes |
| 5 | First 90 Days Course | €49 | `course` | Yes |
| 6 | Full Assistance Step 1 | €150 | `fullPackageStep1` | Yes |
| 7 | Full Assistance Step 2 | €200 | `fullPackageStep2` | **No — private** |

The JSON config file is ready to drop into your repo at `config/stripe-links.json`.

---

## ⚠️ VERIFY BEFORE SHIPPING

I mapped links to products by the order you sent them. I can't see inside your Stripe dashboard, so **open each of the 7 links and confirm the product name and price match the table above.** If two got swapped, someone pays €15 for the €150 package and you find out from an angry customer.

Two minutes of clicking. Do it now, before the site goes live.

---

## PART 2 — DESCRIPTIONS UNDER 500 CHARS

All verified. Longest is 432. Copy exactly, including the blank line between Arabic and English.

---

### 1 · Quick Consultation · €15 · 340 chars

**Product name**
```
استشارة سريعة — ٣٠ دقيقة | Quick Consultation
```

**Description**
```
مكالمة ٣٠ دقيقة عن حالتك إنت بالتحديد — مش كلام عام. براجع تفاصيلك قبل المكالمة، ونتكلم صوت أو فيديو زي ما تحب، وبعدها تستلم ملخص مكتوب. ومعاها ٤٨ ساعة تسألني فيهم أي سؤال على الواتساب.

A focused 30-minute call about your specific situation. Includes pre-call review, the call itself, a written summary, and 48 hours of WhatsApp follow-up.
```

**Statement descriptor** · `STUDYCZECHIA CALL`

---

### 2 · Document Review · €25 · 393 chars

**Product name**
```
مراجعة الأوراق — فحص كامل | Document Review
```

**Description**
```
تبعتلي كل ورقة ناوي تقدّمها — الاستمارات، الترجمات، الأبوستيل، كشف الحساب — وأراجعها بنفس الطريقة اللي موظف السفارة هيراجعها بيها. هتستلم تقرير مكتوب: إيه صح، إيه محتاج تعديل، وإيه ناقص. وبعد ما تظبّط، ابعتها تاني وأأكدلك إنك تمام.

I review every document you plan to submit, the same way the embassy officer will. You get a detailed written report plus one follow-up check after corrections.
```

**Statement descriptor** · `STUDYCZECHIA DOCS`

---

### 3 · Post-Arrival Support · €29 · 349 chars

**Product name**
```
مساعدة بعد الوصول — أول أسبوعين | Post-Arrival Support
```

**Description**
```
خطة مخصوصة لأول أسبوعين في مدينتك: تسجيل الشرطة الأجنبية، فتح حساب بنكي، شريحة الموبايل، اشتراك المواصلات، والتأكد إن تأمينك مظبوط. ومعاها ١٤ يوم واتساب مفتوح من ساعة ما تنزل من الطيارة.

A personalised first-two-weeks plan for your city: foreign police, bank account, SIM card, transport pass, insurance check. Includes 14 days of WhatsApp support.
```

**Statement descriptor** · `STUDYCZECHIA ARRIVAL`

---

### 4 · Embassy Interview Prep · €39 · 373 chars

**Product name**
```
تجهيز مقابلة السفارة — مقابلة تجريبية | Embassy Interview Prep
```

**Description**
```
مقابلة تجريبية ٤٥ دقيقة بأسئلة حقيقية من مقابلات سفارة حقيقية. بعدها بقولك إجاباتك ضعيفة فين وإزاي تظبّطها. ومعاك ورقة فيها أكتر ١٥ سؤال بيتكرروا بالإجابات النموذجية، والواتساب مفتوح لحد يوم مقابلتك.

A 45-minute mock interview with real embassy questions, personal feedback, a written cheat sheet of the 15 most common questions, and WhatsApp support until your interview.
```

**Statement descriptor** · `STUDYCZECHIA PREP`

---

### 5 · Course · €49 · 375 chars

**Product name**
```
أول ٩٠ يوم في تشيكيا — الكورس كامل | Your First 90 Days in Czechia
```

**Description**
```
خمس موديولز: تجهيز مقابلة السفارة، خطة أول أسبوع، محادثات تشيكي يومية حقيقية، ثقافة الناس التشيك وإزاي تعمل صداقات فعلاً، وبناء حياتك هنا على المدى الطويل. الكورس كله بالعربي، ومعاك مدى الحياة بكل التحديثات.

Five modules: embassy prep, first-week survival, daily Czech conversations, Czech culture and making friends, and building your life here. In Arabic. Lifetime access.
```

**Statement descriptor** · `STUDYCZECHIA COURSE`

---

### 6 · Full Assistance Step 1 · €150 · 432 chars

**Product name**
```
المرافقة الكاملة — المرحلة الأولى | Full Assistance Step 1 of 2
```

**Description**
```
النص الأول من المرافقة الكاملة: اختيار الجامعة والبرنامج على أساس مجموعك وميزانيتك، خطة كاملة لأوراقك، وجدول زمني شخصي. وواتساب مفتوح معايا طول الفترة. المرحلة التانية (٢٠٠ يورو) بتتدفع بعدين، لما أوراقك تتراجع وتبقى جاهز للفيزا.

Step 1 of 2: university and program selection, full document plan, personal timeline, and direct WhatsApp access. Step 2 (EUR 200) is paid later, only when you're ready to submit your visa application.
```

**Statement descriptor** · `STUDYCZECHIA FULL1`

> This one has the least headroom (68 chars). If Stripe rejects it, delete the second English sentence — the Arabic already states the €200 condition.

---

### 7 · Full Assistance Step 2 · €200 · 351 chars

**Product name**
```
المرافقة الكاملة — المرحلة التانية | Full Assistance Step 2 of 2
```

**Description**
```
النص التاني من المرافقة: تقديم الفيزا خطوة بخطوة، مقابلة تجريبية كاملة للسفارة، مساعدة في السكن، خطة أول أسبوع بعد الوصول، و٣٠ يوم دعم بعد ما تنزل تشيكيا. وكمان كورس "أول ٩٠ يوم في تشيكيا" مجاناً.

Step 2 of 2: visa walkthrough, live mock interview, housing guidance, arrival plan, and 30 days of support after you land. Includes the full course free.
```

**Statement descriptor** · `STUDYCZECHIA FULL2`

---

## PART 3 — CUSTOM FIELDS

Separate field, not affected by the 500-char limit.

```
1 · Consultation
   رقم الواتساب (WhatsApp number) — required
   أنسب وقت للمكالمة (Best time to call) — optional

2 · Document Review
   رقم الواتساب (WhatsApp number) — required
   الجامعة والبرنامج (University and program) — optional

3 · Post-Arrival Support
   رقم الواتساب (WhatsApp number) — required
   المدينة وتاريخ الوصول (City and arrival date) — required

4 · Interview Prep
   رقم الواتساب (WhatsApp number) — required
   تاريخ المقابلة والسفارة (Interview date and embassy) — required

5 · Course
   رقم الواتساب — للانضمام لجروب الطلاب (WhatsApp — student group) — optional

6 · Full Step 1
   رقم الواتساب (WhatsApp number) — required
   إنت واقف فين دلوقتي؟ (Where are you in the process?) — required

7 · Full Step 2
   رقم الواتساب (WhatsApp number) — required
```

---

## PART 4 — CONFIRMATION MESSAGES

Separate field, longer limit. Arabic first.

**1 · Consultation**
```
تمام، الحجز اتسجّل ✅

هبعتلك على الواتساب خلال ٢٤ ساعة عشان نحدد ميعاد المكالمة.

قبلها ابعتلي أي تفاصيل عن وضعك — مجموعك، الجامعات اللي مهتم بيها، أو اللي واقف قدامك. كل ما أعرف أكتر، كل ما الـ ٣٠ دقيقة تطلع مفيدة أكتر.

Booked. I'll message you on WhatsApp within 24 hours to schedule your call.
```

**2 · Document Review**
```
تمام، وصلني ✅

ابعتلي الأوراق دلوقتي على الواتساب أو الإيميل — الملف كامل، كل حاجة ناوي تقدّمها.

هتستلم التقرير المكتوب خلال ٧٢ ساعة. ولو فيه حاجة محتاجة تعديل، ظبّطها وابعتها تاني وأأكدلك إنك جاهز.

Received. Send your full document package now. Report within 72 hours.
```

**3 · Post-Arrival Support**
```
تمام، إنت مغطّى ✅

هبعتلك الليستة المخصوصة بتاعتك خلال ٤٨ ساعة — متظبطة على مدينتك وتاريخ وصولك.

ومن أول يوم تنزل فيه، الواتساب مفتوح ١٤ يوم. اسألني في أي حاجة، حتى لو حاسس إنها سؤال بسيط — دي بالظبط الأسئلة اللي بتوقّع الناس.

Your personalised checklist arrives within 48 hours. WhatsApp open for 14 days from landing.
```

**4 · Interview Prep**
```
تمام، اتحجز ✅

هبعتلك على الواتساب خلال ٢٤ ساعة عشان نحدد ميعاد المقابلة التجريبية — هنعملها قبل ميعادك الحقيقي بوقت كافي عشان يبقى قدامك مساحة تظبّط أي حاجة.

وورقة الـ ١٥ سؤال هتوصلك مع نفس الرسالة، ابدأ ذاكرها من دلوقتي.

I'll message you within 24 hours to schedule. Cheat sheet comes with that message.
```

**5 · Course**
```
تمام، إنت جوه ✅

لينك الدخول جايلك على الإيميل خلال دقايق. لو مالقتوش، بصّ في السبام أو كلمني على الواتساب.

من فين تبدأ؟
← لو مقابلة السفارة قدامك، ابدأ بالموديول الأول
← لو الفيزا معاك خلاص، ابدأ بالموديول التاني

You're in. Access link on the way by email.
```

**6 · Full Step 1**
```
تمام، بدأنا ✅

هكلمك على الواتساب خلال ٢٤ ساعة وهنحجز أول مكالمة خلال الأسبوع ده.

قبلها ابعتلي: مجموعك، ميزانيتك التقريبية، وأي حاجة جهّزتها فعلاً. هنبني منها ليستة الجامعات والجدول الزمني بتاعك.

المرحلة التانية مش دلوقتي — هبعتهالك بنفسي لما نوصل لمرحلة الفيزا.

We're starting. I'll message you on WhatsApp within 24 hours.
```

**7 · Full Step 2**
```
تمام، وصلني — إحنا في آخر مرحلة ✅

هبعتلك لينك الكورس، وهنحدد ميعاد المقابلة التجريبية خلال أيام.

من دلوقتي لحد ما تنزل تشيكيا — وأول ٣٠ يوم بعد ما تنزل — الواتساب بتاعي مفتوح ليك في أي وقت.

Received. Course access and mock interview scheduling coming shortly.
```

---

## PART 5 — LAUNCH CHECKLIST

```
☐ Open all 7 links, confirm product + price match the mapping table
☐ Descriptions pasted, all under 500 chars
☐ Statement descriptors set (English only, all 7)
☐ Custom fields added
☐ Confirmation messages set
☐ Currency = EUR on all 7
☐ Type = one-time payment, NOT subscription
☐ Collect email = ON, collect name = ON
☐ Drop config/stripe-links.json into the repo
☐ Link 7 kept off the services page
☐ Do one real €15 purchase end-to-end, then refund yourself
☐ Confirm the WhatsApp number came through in your dashboard
```

That last item matters more than it looks. If custom fields aren't wired correctly, you'll take payments with no way to reach the buyer quickly — and for an anxious student who just sent money abroad, a slow first reply is exactly what triggers a refund request.
