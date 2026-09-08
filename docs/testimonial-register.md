# Testimonial Register

**Retrieved date:** 2026-09-07 | **Reviewer:** unassigned | **Last reviewed:** 2026-09-07
**Source:** https://www.keyholesurgeon.co.uk/patient-reviews-testimonials-f14143/ (6 paginated pages, all fetched); `src/data/testimonials.ts` in the current rebuild.

**General rule applied:** Public presence on the legacy site does NOT by itself justify republication. Consent, original-source identifiability, and whether wording has been edited are recorded separately from whether the content is factually interesting.

## Part A — Legacy site testimonials (18 captured)

| # | Display name | Title used for Sheth | Procedure | Date given | Full text captured? | Original source identifiable? | Consent evidence? | Wording appears edited? | Publication-rights status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Charles Clarke | Mr Sheth | Not specified | None | Yes, full | Named individual, on-site submission | Legacy disclaimer page states testimonial submitters grant a usage licence (see below) but no per-testimonial consent record exists | No (short, plausible organic text) | LEGACY - NEEDS CONFIRMATION |
| 2 | Deepa Pathare | Dr Sheth | Endoscopy | None | Yes, full | Named individual | Same general disclaimer, no per-item record | No | LEGACY - NEEDS CONFIRMATION |
| 3 | Devendarsingh Banker | Mr Sheth | Laparoscopic cholecystectomy | None | Yes, full | Named individual | Same | No | LEGACY - NEEDS CONFIRMATION |
| 4 | Noel Rutherford | Mr Sheth | Multiple/order changed pre-op | None | **No — truncated ("[Read more]")** | Named individual | Same | Unknown (can't assess truncated text) | LEGACY - NEEDS CONFIRMATION |
| 5 | Chhavi Aga | (no title used) | Not specified | None | Yes, full | Named individual | Same | No | LEGACY - NEEDS CONFIRMATION |
| 6 | Rehan Kazi | First name "Hemant" only | Open hernia repair | None | Yes, full | Named individual | Same | No | LEGACY - NEEDS CONFIRMATION |
| 7 | Jose Mullerat | Mr Sheth | Not specified | None | Yes, full (contains 2 apparent typos: "excepcional", "ckear" — reproduced verbatim as found) | Named individual | Same | No | LEGACY - NEEDS CONFIRMATION |
| 8 | "DR SHANTANU Tendulkar" | Mr Sheth | N/A — appears to be a **professional colleague**, not a patient ("I have been working with Mr Sheth for last 30 yrs") | None | Yes, full | Named individual (colleague, not patient) | Same | No | LEGACY - NEEDS CONFIRMATION; note this is colleague testimony, should be labelled as such if reused, not presented as patient feedback |
| 9 | Shalin Diwanji | (no title used, "excellent colleague") | N/A — appears to be a colleague testimony | None | Yes, full (very short) | Named individual (colleague) | Same | No | LEGACY - NEEDS CONFIRMATION; same colleague-labelling note as #8 |
| 10 | "IWantGreatCare / Verified Patient" | Dr Sheth | Surgery, unspecified | None | Yes, full | Third-party platform (IWantGreatCare), not directly named | Platform's own consent process presumably applies, not the practice's | No | LEGACY - NEEDS CONFIRMATION - platform ToS/consent should be checked, not assumed via the practice's own disclaimer |
| 11 | "IWantGreatCare / Verified Patient" | Dr Sheth | Not specified | None | Yes, full | Third-party platform | Same as #10 | No | LEGACY - NEEDS CONFIRMATION |
| 12 | **"Test Mail"** | N/A | N/A | None | Yes | **NOT a real testimonial — leftover YPO platform test/spam data** ("This is a test mail form ypo... replying to pavan@yourpracticeonline.co.in") | N/A | N/A | **DO NOT MIGRATE.** This is a genuine legacy-site data-quality defect worth reporting to the client separately: stale test content is currently live in production on their existing site. |
| 13 | "IWantGreatCare / Verified Patient" | Mr Sheth | Gallbladder removal | None | **No — truncated** | Third-party platform | Same as #10 | Unknown | LEGACY - NEEDS CONFIRMATION |
| 14 | "IWantGreatCare / Verified Patient" | Mr. Sheth | Not specified | None | **No — truncated.** Mentions "his PA Amit" — cross-reference to the secretary-name conflict in `professional-facts-register.md` | Third-party platform | Same as #10 | Unknown | LEGACY - NEEDS CONFIRMATION |
| 15 | "IWantGreatCare / Verified Patient" | Mr. Sheth | Not specified | None | **No — truncated** | Third-party platform | Same as #10 | Unknown | LEGACY - NEEDS CONFIRMATION |
| 16 | "IWantGreatCare / Verified Patient" | Mr Sheth | Not specified | None | Yes, full | Third-party platform | Same as #10 | No | LEGACY - NEEDS CONFIRMATION |
| 17 | "IWantGreatCare / Verified Patient" | Mr. Sheth | Gallbladder surgery | None | **No — truncated** | Third-party platform | Same as #10 | Unknown | LEGACY - NEEDS CONFIRMATION |
| 18 | "IWantGreatCare / Verified Patient" | Dr Sheth | "Complex case" | None | **No — truncated** | Third-party platform | Same as #10 | Unknown | LEGACY - NEEDS CONFIRMATION |

**Legacy disclaimer clause governing testimonials (from `/disclaimer/`, AI-paraphrased — re-verify verbatim before relying on it legally):** by submitting a testimonial, users are stated to authorise the practice to "copy, exhibit, publish, or distribute" it, waiving right of approval, with "no monetary or other claims" permitted. **This clause's continued legal validity for testimonials being reused years after original submission (no dates are given on any of the 18) has not been assessed and should be confirmed by the client/legal reviewer before any republication**, particularly for the 2 apparent colleague-testimony entries (#8, #9), which may not have been submitted under the same "testimonial" framing at all.

**Star ratings:** None shown on any of the 18. **Dates:** None given on any of the 18 (this makes it impossible to know how old any given testimonial is, which matters for consent currency).

**7 of 18 (39%) were truncated** with an unresolved "[Read more]" link; full text was not obtained in this crawl pass.

## Part B — Current rebuild's testimonial content (`src/data/testimonials.ts`, not currently rendered — dead component `TestimonialWall.tsx`)

**Important integrity finding:** 3 names in the rebuild's testimonial data — **Charles Clarke, Deepa Pathare, Devendarsingh Banker** — are the SAME 3 real, named individuals whose testimonials appear on the legacy site (Part A, #1-3 above). However, the quotes attributed to them in `testimonials.ts` are **substantially longer, more detailed, and materially different in content** from what those individuals actually said on the legacy site:

| Name | Legacy site quote (actual) | Rebuild's quote (`testimonials.ts`) |
|---|---|---|
| Charles Clarke | "It was a privilege to be asked to give feedback to Mr Sheth. As an engineer I can appreciate the thought and skill that he put into my treatment which was entirely successful." | "It was a true privilege to be treated by Professor Sheth. As a retired chartered engineer, I scrutinise technical competence closely. The diagnostic clarity, the explanation of the robotic surgical plan, and the precision with which the gallbladder removal was executed were extraordinary. Within two days of leaving Clementine Churchill Hospital, I had virtually zero pain and was back walking in the garden. He is an outstanding surgeon with an exceptional bedside manner." — adds specific procedure ("robotic... gallbladder removal"), specific hospital, specific recovery timeline, and job title detail ("retired chartered engineer") not present in the original |
| Deepa Pathare | "Dr Sheth is a very empathetic and caring doctor. His calm demeanour put me at ease during the endoscopy procedure, which was performed expertly." | "Professor Sheth is a genuinely empathetic and caring consultant. I was terrified of undergoing an upper GI endoscopy after a previous bad experience elsewhere. From the moment I stepped into his consulting room at Spire Bushey, his calm, reassuring presence dissolved my anxiety..." — adds a prior-bad-experience backstory and specific hospital not present in the original |
| Devendarsingh Banker | "Mr Sheth is a highly skilled and knowledgeable surgeon. He operated on me for laparoscopic cholecystectomy." | "Mr Sheth is a surgeon of rare calibre. After suffering agonizing gallbladder attacks for months, I consulted him privately at Elstree Waterfront. He scheduled my keyhole operation promptly, visited me pre-op to calm my nerves, and checked in on me following the procedure..." — adds months-long symptom history, specific hospital, and pre/post-op visit detail not present in the original |

**This is a significant content-integrity concern, not merely a migration gap.** The rebuild appears to have taken three real people's names from the legacy site and generated substantially embellished quotations attributed to them that they did not actually say (at least not on the legacy site as captured). Publishing this would risk misattributing invented statements to real, named individuals — a reputational and potentially legal risk distinct from the general testimonial-consent question. **Recommended action: DO NOT MIGRATE these 3 rebuild-authored quotes under these real names.** Either (a) go back to the real, verbatim legacy quotes for these 3 people and use those instead (subject to the same consent caveats as Part A), or (b) if new, longer quotes are genuinely desired, obtain fresh, real testimonials directly from these patients with explicit consent, or (c) anonymise/fictionalise properly if these are meant to be illustrative composites rather than real patient quotes.

The remaining 2 patient cards (Sarah Jenkins, Robert M.) and 3 colleague-letter cards (Dr. A. Patel, Dr. M. S., Dr. K. Sharma) in `testimonials.ts` have **no corresponding legacy-site source at all** — they are entirely rebuild-original content, with specific dated claims ("Autumn 2024", "Spring 2024" etc.), specific hospitals, and named professional credentials (FRCPath, FRCA, MRCGP) that have zero independent verification in this audit.

| Rebuild-only entry | Status |
|---|---|
| Sarah Jenkins (robotic inguinal hernia repair) | **DO NOT PRESENT AS VERIFIED** — no legacy or independent source; confirm this is a real patient with real consent, or replace with genuine testimonial content |
| Robert M. (robotic anti-reflux fundoplication) | Same as above |
| Dr. A. Patel, FRCPath (colleague letter) | Same as above — a specific professional credential (FRCPath) attributed to a named-but-abbreviated individual with no verification |
| Dr. M. S., FRCA (colleague letter) | Same as above |
| Dr. K. Sharma, MRCGP (colleague letter) | Same as above |

**Platform review-count stats** in `testimonials.ts` (Doctify 120+, IWantGreatCare 85+, Top Doctors 50+, Google 70+) are separately covered in `content-verification.md` §A rows 6-9 — none independently verified in this pass.

## Part C — Recommended action summary

1. **DO NOT MIGRATE** the "Test Mail" spam entry (legacy #12) under any circumstances.
2. **DO NOT MIGRATE** the rebuild's embellished Charles Clarke / Deepa Pathare / Devendarsingh Banker quotes as currently worded — replace with verbatim legacy quotes or freshly consented new quotes.
3. Do not wire `TestimonialWall.tsx` into the live site until every entry has a confirmed, real, consented source.
4. Before republishing ANY testimonial (legacy or new), obtain updated, dated, per-testimonial consent records — the legacy site's blanket disclaimer clause is thin and undated.
5. Follow up on the 7 truncated legacy testimonials by locating their individual permalinks if their content is still wanted.
6. Label the 2 apparent colleague-testimony entries (legacy #8, #9) distinctly from patient feedback if reused.
