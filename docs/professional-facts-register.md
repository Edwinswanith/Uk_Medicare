# Prof. Hemant Sheth — Professional Facts Register

**Retrieved date:** 2026-09-07 | **Reviewer:** unassigned | **Last reviewed:** 2026-09-07
**Sources used:** https://www.keyholesurgeon.co.uk/ (30 pages crawled 2026-09-07); `D:\prof_hemant_sheth_website` source tree; independent WebSearch/WebFetch corroboration from spirehealthcare.com, finder.bupa.co.uk, doctify.com, circlehealthgroup.co.uk (all fetched/searched 2026-09-07).

## 1. Identity

| Field | Legacy site (keyholesurgeon.co.uk) | Current rebuild | Independent 3rd-party source | Status |
|---|---|---|---|---|
| Display name | "Prof. Hemant Sheth" (bio/contact/research/services/media); testimonials use "Mr Sheth"/"Mr. Sheth"/"Dr Sheth"/"Dr. Sheth" (never "Prof.") | "Prof. Hemant Sheth" everywhere | Spire Healthcare, BUPA, Doctify: all "Professor Hemant Sheth" | **CONFLICTING** between official site branding and organic patient-facing testimonials; the official-branding side is corroborated by 3 independent directories. Record both versions - do not silently pick one. |
| Full legal name | Not stated on keyholesurgeon.co.uk itself | Not used anywhere ("Prof. Hemant Sheth" only) | Circle Health Group profile URL/page: "Hemant Dhansukh Sheth" | **LEGACY - NEEDS CONFIRMATION** |
| GMC number | "4567912" (bio page) | "4567912" (5 locations in rebuild, see `content-verification.md`) | Spire Healthcare profile slug `c4567912`; BUPA/Doctify listings consistent | **CLINICAL REVIEW REQUIRED** - highly consistent across sources but GMC register itself not directly queried (403 on automated fetch) |
| Professional title/honorific | "Professor" (site branding) / "Mr"/"Dr" (patient testimonials) | "Professor" (`honorificPrefix` in JSON-LD) | "Professor" (Spire, BUPA, Doctify) | **CONFLICTING** - record both usages; UK surgical convention normally uses "Mr/Miss/Ms/Mrs", so "Professor" implies a specific academic appointment that should have a named, checkable source |

## 2. Qualifications (4 conflicting wordings found within the rebuild alone)

| Source | Exact wording |
|---|---|
| Legacy homepage | "MBBS, MS, FRCS, MD (RES)" |
| Legacy bio page (fullest) | FRCS (RCS Eng) - 2009; MD (Research) - UCL (2010); FRCS (RCS Glasgow) - 1996; MS (General Surgery) - TNMC Mumbai (1994); MBBS - TNMC Mumbai (1990) |
| `index.html` meta `author` tag | "Prof. Hemant Sheth MBBS, MS, FRCS, MD (Res) UCL" |
| `src/data/about.ts` | "MBBS, MS (General Surgery), FRCS (Glasgow), FRCS (England), MD (Res)" |
| `Footer.tsx` (dead) | "MS FRCS MD(Res) UCL" |
| `Hero.tsx` (dead) | "MBBS MS FRCS MD(Res) UCL" |
| Spire Healthcare (independent) | "MBBS, MS, FRCS, MD(res)" |

**Status: LEGACY - NEEDS CONFIRMATION / REWRITE REQUIRED.** Recommend the legacy bio page's dated, fuller breakdown as the canonical source of truth, confirmed with the client, then applied identically across every rebuild file listed above.

## 3. GMC registration

- Number: **4567912**
- Sources agreeing: keyholesurgeon.co.uk bio page; index.html JSON-LD + Twitter meta; faqs.ts; Footer.tsx (x2); InsuranceGuide.tsx; Spire Healthcare profile URL; corroborated by BUPA Finder and Doctify listings (same identity, not independently re-stating the number itself).
- Source disagreeing: **`src/data/about.ts`**, which contains this code comment: *"GMC number is deliberately withheld until verified against the GMC register"* and is the only file in the rebuild treating this fact as unconfirmed.
- Direct GMC register lookup (gmc-uk.org): attempted, returned HTTP 403 (anti-bot protection) - **not resolved in this session**.
- **Status: CLINICAL REVIEW REQUIRED.** Recommend a human perform the direct GMC register search (Registered Medical Practitioner search by name or number) before public launch. Given how consistently the number recurs, risk is lower than a typical unverified claim, but the task brief treats GMC identifiers as safety-critical, and `about.ts`'s own caution should not be silently overridden by the rest of the codebase.

## 4. Title: "Professor" / "Clinical Professor (awarded 2023)"

- Legacy bio page heading: "Clinical Professor (2023)"
- Rebuild (`index.html`, `Footer.tsx`, `Hero.tsx`, `faqs.ts`): "Clinical Professor (Awarded 2023)"
- `about.ts`/`AboutSection.tsx` (the only rendered, live component actually about his biography): does **not** mention "Professor"/"Clinical Professor" at all, and wraps all credential detail in a "pending independent verification... treat as provisional" banner.
- No awarding institution is named anywhere (legacy or rebuild) for this title.
- Independent corroboration: Spire Healthcare, BUPA, and Doctify all use "Professor" as his displayed title, but none states an awarding body/date either.
- **Status: LEGACY - NEEDS CONFIRMATION.** Do not present as unconditionally verified. Recommend obtaining the specific awarding institution and date directly from the client so the claim can carry a checkable attribution.

## 5. NHS post & training history

| Field | Legacy site | Rebuild |
|---|---|---|
| Current NHS post | "Consultant UGI, Hepatobiliary & laparoscopic surgeon", Ealing and London Northwest Healthcare Trust; also "Surgical Tutor for the trust" and "Clinical lead for the department of surgery at Ealing site" | `nhsBase`: "Consultant Upper GI, HPB, Laparoscopic & Robotic Surgeon", London North West University Healthcare NHS Trust / Ealing Hospital (Surgical Tutor / Clinical Lead titles dropped) |
| Training history | Mumbai (MBBS 1990, MS 1994) → FRCS 1996 → Royal Free Hospital Liver Unit 1999 (hepatobiliary/transplant training + UCL postgrad research registration) → Northeast London surgical training scheme 2004 → Barts & The London / Royal Free liver units → Addenbrookes Hospital Cambridge 2009 (laparoscopic HPB training) | Not reproduced anywhere in the rebuild - `about.ts` has no training-history narrative field at all |
| MD thesis | "Therapeutic Modulation Of Liver Ischaemia Reperfusion Injury" (UCL) | Not referenced |
| MS thesis | "Splenectomy For haematological disorders" (University of Bombay, 1994) | Not referenced |

**Status:** COMPLETE for the core NHS post fact (substance matches, "Robotic" added in rebuild needs confirming); MISSING for the full training-history narrative, which is genuinely valuable, differentiating content the rebuild currently has no equivalent for. **Recommend KEEP/MERGE** this training narrative into the new About section content, subject to client sign-off on wording.

## 6. Memberships & professional bodies

| Legacy site | Rebuild (`about.ts` / JSON-LD) |
|---|---|
| Royal College of Surgeons of England | ✓ matches |
| Association of Surgeons of Great Britain & Ireland (ASGBI) | ✓ matches |
| BMA | ✓ matches |
| AUGIS (Association of Upper GI Surgeons) | ✓ matches |
| EAHPBA (European-African HPB Association) | ✓ matches (rebuild: "European-African Hepato-Pancreato-Biliary Association") |
| IHPBA (International HPB Association) | ✓ matches |
| "Surgical Tutor - RCS England (2012)" | Not carried into `about.ts`; appears only in `Hero.tsx` (dead) as "Royal College of Surgeons Surgical Tutor" / "Faculty for Intermediate Laparoscopic Skills & Core Trainee Mentor" |
| "Member of AUGIS (2018)" (specific year) | Year dropped in rebuild |
| "Faculty for the Intermediate Laparoscopic Skills Course for RCS England" | Only in dead `Hero.tsx`, not in live `about.ts` |

**Status: COMPLETE** for the core 6-body membership list (matches well); **PARTIAL** for the more specific role/date detail (Surgical Tutor, AUGIS 2018), which exists on legacy but only survives in a dead rebuild file, not the live one.

## 7. Awards

- Legacy: "He has been awarded clinical excellence awards in his current job" (AI-summarised, vague wording - exact award name/tier/year not captured).
- Rebuild: No separate "awards" field exists; only the "Clinical Professor (2023)" claim functions award-like.
- **Status: LEGACY - NEEDS CONFIRMATION.** Recommend a direct source-page re-capture of the exact award wording, or direct confirmation from the client, before adding an "Awards" section to the new site.

## 8. Research interests / personal interests / languages / GP courses

| Field | Legacy site | Rebuild |
|---|---|---|
| Research interest | "Ischaemia reperfusion injury of the liver" | Not present |
| Personal interests | "Walking, Trekking, Meditation" | Not present |
| Languages | Gujarati (native), Hindi (fluent), Marathi (fluent), Konkani (conversational) | Gujarati, Hindi, Marathi, Konkani (no fluency levels; some files add "English") |
| Courses offered to GPs | "GI Masterclass" | Not present |

**Status: MISSING** (optional/human-interest content not currently in rebuild) and **LEGACY - NEEDS CONFIRMATION** (fluency-level detail) for languages.

## 9. Secretary / contact staff

- Legacy Contact & Appointment pages: secretary named consistently as **"Nehali Christian"**.
- One legacy testimonial (page 5) separately references a "PA Amit".
- Rebuild `clinics.ts`: secretary listed as "Amit Christian" (2 locations), "Amit Christian / Nehali Christian" (1 location), "Nehali Christian" alone (1 location) - all sharing the same mobile number "+44 (0)7716 835261".
- Independent: Spire Healthcare profile names "Amit Christian" as private secretary with phone "020 3371 1785" (a landline, different from the rebuild's shared mobile number).
- **Status: CONFLICTING.** Likely explanation is that Amit and Nehali Christian are both real staff (possibly a family-run secretarial team), but this must be confirmed rather than assumed, and the phone number used for each should be reconciled - see `client-verification-needed.md`.

## 10. Summary of conflicting-title/credential findings (task item 7)

1. "Prof." (official branding) vs "Mr"/"Dr" (100% of patient testimonials) - both real, unresolved.
2. GMC number consistent across 4 rebuild files but explicitly withheld as unverified in a 5th (`about.ts`) - internal self-contradiction.
3. "Clinical Professor (Awarded 2023)" present in `index.html`/`Footer.tsx`/`Hero.tsx`/`faqs.ts`, absent from the live `about.ts`/`AboutSection.tsx`.
4. Four different qualifications-string wordings across the rebuild, none identical, none identical to the legacy bio page's own fullest version.
5. £220 (legacy) vs £250 (rebuild, matching Spire's independent listing) initial consultation fee.
6. "Amit Christian" vs "Nehali Christian" as secretary, inconsistently applied per location.
7. Legacy "Ealing and London Northwest Healthcare Trust" NHS post lacks "Robotic" in its own title; rebuild's `nhsBase.role` adds "Robotic" - unclear if this is accurate to the NHS role specifically or bleeds in from the private-practice robotic branding.

None of these seven conflicts has been resolved in this audit - each is recorded for client/clinical decision, per the task's explicit instruction never to silently pick a winner.
