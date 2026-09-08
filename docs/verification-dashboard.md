# Client Verification Dashboard (internal — development only)

**Do not link this file from the site, the sitemap, or any navigation.** It is not a route, not a component, and not bundled by Vite (nothing under `docs/` is served). It exists purely for developer/editor reference alongside `docs/client-verification-needed.md`, which has the same content phrased as direct questions to send the practice.

**Retrieved date:** 2026-09-07 | **Reviewer:** unassigned | **Last reviewed:** 2026-09-07

Status column uses the 5-state content-safety gate from `src/data/contentStatus.ts`: `verified` / `pending` / `conflicting` / `clinical-review-required` / `retired`. Only `verified` items may render publicly — see each register in `docs/` for full evidence.

---

## P0 — Launch blockers

| Fact | Current value (pre-gate) | Conflicting value | Legacy source | Other evidence | Required answer | Status |
|---|---|---|---|---|---|---|
| GMC number | `4567912` (was in `index.html` JSON-LD, now removed) | — | Bio page: "GMC registration ... 4567912" | Spire/BUPA/Doctify profile identity all consistent, but GMC register itself not directly queried (403) | Confirm 4567912 against the GMC register directly | `clinical-review-required` |
| Testimonials for Charles Clarke / Deepa Pathare / Devendarsingh Banker | Embellished, longer quotes (now replaced in `testimonials.ts` with real short quotes) | Original short legacy quotes | Legacy testimonials page | — | Use real quotes only, or obtain fresh consented quotes | `pending` (real quotes restored, consent still unresolved) |
| 4 headline statistics (7,000+ surgeries, 100+ robotic, 50+ publications, 34+ years) | Removed from `StatsCounterBar`, no longer rendered | `Hero.tsx` (dead) had 10,000+/30+/150+ — different numbers again | Not found anywhere on legacy site | Only 20 publications independently itemised | Confirm actual current figures or leave removed | `pending` (all 4) |
| "Professor" / "Clinical Professor (awarded 2023)" | "Prof." kept as working title (verified); "Clinical Professor (awarded 2023)" specific claim removed from `index.html` description | Legacy testimonials use "Mr"/"Dr" | Legacy bio page: "Clinical Professor (2023)" | Spire/BUPA/Doctify all show "Professor" | Confirm awarding institution/date for "Clinical Professor" | `verified` (title) / `pending` (Clinical Professor claim) |
| Testimonial consent | No testimonials rendered anywhere live | — | Legacy disclaimer: thin, undated usage-licence clause | — | Obtain documented, dated consent before publishing any testimonial | `pending` (all) |
| Liver Resection page: "In the case of complete resection, liver transplantation is required" | Not migrated into rebuild (no treatment detail pages exist yet) | — | Legacy Liver Resection page | Reads as medically ambiguous/incorrect | Clinician must correct or clarify before this page content is ever used | `clinical-review-required` |

## P1 — Important, section-level blockers

| Fact | Current value (pre-gate) | Conflicting value | Legacy source | Other evidence | Required answer | Status |
|---|---|---|---|---|---|---|
| Syon Clinic | Removed entirely from `clinics.ts`, `index.html` JSON-LD, and the booking modal's hospital list | — | Absent from all 30 legacy pages including sitemap | One weak third-party WebSearch mention | Confirm address/phone/hours if real | `pending` |
| Consultation fee | Not rendered anywhere live | £220 (legacy) vs £250 (Spire's own page) | Legacy Contact page: £220 | Spire Healthcare: £250 | Confirm current fee | `conflicting` |
| Per-hospital phone numbers | Removed from `clinics.ts` for all 3 remaining hospitals | Spire's own page lists a different Bushey number than either prior value | Not found on legacy site at all | Spire Healthcare (partial, conflicting) | Confirm correct number per hospital | `conflicting`/`pending` |
| Secretary name(s) | Removed from `clinics.ts` for all 3 hospitals | "Amit" vs "Nehali" Christian | Legacy: "Nehali Christian" consistently | Spire: "Amit Christian" | Confirm current secretary/number per location | `conflicting` |
| Qualifications string | Removed from `AboutSection`'s rendered detail panel; `professionalIdentity.ts` holds no verified string | 4 different wordings found pre-gate | Legacy bio page fullest version (dated) | Spire: short form | Confirm one canonical string | `conflicting` |
| Robotic clinical claims (EndoWrist, degrees of freedom, procedure-specific claims) | `RoboticComparisonSection`/`RoboticSurgeryExplainerSection` kept as general device/educational content only; no personal case-volume or outcome claims attached | — | Legacy treatment pages never describe robotic technique, only the byline credential | Ealing Hospital video is real, general robotic involvement evidence | Confirm which specific procedures are offered robotically | `pending` (person-specific/technical specifics) |
| NHS role wording | "Robotic" removed from `nhsBase.role` in `clinics.ts` | Legacy never includes "Robotic" for the NHS post specifically | Legacy: "Consultant UGI, Hepatobiliary & laparoscopic surgeon" | — | Confirm if "Robotic" is accurate for the NHS (not just private) role | `pending` |
| Insurer list | Not rendered anywhere live (`InsuranceGuide.tsx` is dead) | — | Legacy Insurance page is an empty placeholder | — | Confirm current insurer list | `pending` |
| "LINX" device mention | Not rendered anywhere live (`QuickServiceCards.tsx` is dead) | — | Not found anywhere on legacy site | — | Confirm whether offered; likely a content error | `pending` |

## P2 — Optional, non-blocking

| Fact | Current value (pre-gate) | Legacy source | Required answer | Status |
|---|---|---|---|---|
| Full legal name | Not used anywhere in rebuild | "Hemant Dhansukh Sheth" (external directory only) | Confirm if/where it should appear | `pending` |
| Language fluency levels | `professionalIdentity.ts` lists languages without fluency detail (verified as a plain list) | Legacy specifies native/fluent/conversational | Confirm fluency levels if reinstating detail | `pending` |
| Personal/research interests, GP courses | Not present in rebuild | Legacy: walking/trekking/meditation; liver ischaemia-reperfusion research interest; "GI Masterclass" | Confirm if desired for About section | `pending` |
| Social media accounts | Not linked anywhere in rebuild | Facebook/Twitter/LinkedIn/YouTube found on legacy | Confirm still active/correct before linking | `pending` |
| Publications beyond the 20 found | `src/data/publications.ts` holds exactly 20, all `pending` except 1 `verified` | Legacy Research page: 20 itemised | Confirm if more exist | `pending` |
| Patient Education Videos content | Not present in rebuild | Legacy page uses JS-rendered widget, unreadable by text fetch | Provide video list or YouTube channel link | `pending` (`INVESTIGATE`) |
| Press/"In the News" content | Not present in rebuild | Referenced but not crawled | Confirm if worth including | `pending` (`INVESTIGATE`) |
| Privacy Policy | Not present in rebuild (legacy version is non-GDPR-compliant, not migrated) | Legacy privacy page (outdated) | Provide DPO/data contact for a freshly drafted policy | `pending`, drafting requires specialist review |
| Stale CMS test data on the **live legacy site** | N/A to rebuild | One of 18 "testimonials" is leftover platform test data | Practice should remove this from their current live site regardless of the rebuild | N/A — informational only |

---

## What changed to enforce this gate (see final report for the complete file list)

- `src/data/contentStatus.ts` — shared status vocabulary + `renderable()` helper.
- `src/data/professionalIdentity.ts` — single source of truth for name/title/GMC/qualifications/NHS role/memberships/languages, each with a status.
- `src/data/clinics.ts` — Syon Clinic removed; phone/secretary/hours/facilities made optional and left unset for all 3 remaining hospitals until confirmed.
- `src/data/testimonials.ts` — fabricated quotes replaced with real ones; every entry marked `pending` (consent unresolved); not wired into any live component.
- `src/data/publications.ts` — new structured model, 20 items, 1 `verified`, rest `pending`; not yet wired into any UI (no existing Research section to place it in).
- `index.html` — GMC identifier removed from JSON-LD and Twitter meta; unqualified "Clinical Professor"/"30 years"/"Pioneering" claims removed from descriptions; Syon Clinic removed from `hospitalAffiliation`; 2 unverified FAQ entries (insurer list, consultation fee) removed; hospital-list FAQ answer corrected.
- `src/App.tsx` — `StatsCounterBar` unmounted (0 of 4 stats verified).
- `src/components/AboutSection.tsx` / `src/data/about.ts` — qualifications-string category and detail removed; NHS role/memberships/languages now sourced from `professionalIdentity.ts` instead of hardcoded locally.
- `src/components/ClinicLocations.tsx` — consultation-hours, facilities, and secretary/phone blocks now conditionally rendered (omitted, not shown as empty placeholders) when the underlying data is absent; CTA label bug fixed.
- `src/components/ConsultationModal.tsx` — hospital dropdown now sourced from `clinics.ts` instead of an independently hardcoded list (removes the Syon Clinic option automatically).
