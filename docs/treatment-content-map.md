# Treatment Content Migration Map

**Retrieved date:** 2026-09-07 | **Reviewer:** unassigned | **Last reviewed:** 2026-09-07
**Source:** https://www.keyholesurgeon.co.uk/ — 10 dedicated treatment pages crawled in full (2026-09-07). All clinical wording below is reproduced for review purposes only — **none of it should be published verbatim**; every page needs rewriting into plain British English and a clinical-review sign-off before reuse, per task instructions. A cross-page finding applies to all 10: the site was almost certainly built on the "Your Practice Online" (YPO) medical-website template/CMS (a YPO logo was found on multiple pages), meaning this clinical copy likely originates from vendor boilerplate customised per procedure, not bespoke authorship — this should be disclosed to the client and does not reduce the need for clinical review.

**Robotic-relevance finding (applies to all 10 treatments):** Across every treatment page, "Robotic Surgeon" appears only inside Prof. Sheth's standard byline/credential line. **No treatment page describes an actual robotic technique, instrument, or step for any procedure** — every procedure is described exclusively in laparoscopic or open terms. This is a genuine content gap/opportunity, not a contradiction: if robotic techniques are now offered for these procedures, that is new content the rebuild would need to add post-clinical-verification, not something inherited from the legacy site.

---

## 1. Upper GI Endoscopy
- **Old URL:** `/upper-gi-endoscopy-general-laparoscopic-surgeon-hertfordshire-harrow-london/`
- **Condition/procedure type:** Diagnostic/therapeutic endoscopic procedure (EGD)
- **Existing explanation:** Outpatient endoscope-based visual exam of upper GI tract; described as "a more precise examination than X-ray studies" in many cases.
- **Symptoms/reasons for referral:** Difficulty/pain swallowing; GI bleeding (haematemesis, melena, iron-deficiency anaemia); troublesome heartburn; persistent ulcer-like pain; dyspepsia with weight loss/NSAID use/gastric ulcer history; persistent nausea/vomiting/pyloric obstruction; gastric ulcer on barium meal; duodenal biopsy for malabsorption.
- **Assessment info:** Barium meal, biopsy (3-7 day turnaround), Barrett's oesophagus surveillance.
- **Treatment options (therapeutic):** Sclerotherapy for varices; stricture dilatation; achalasia pneumatic dilatation; polyp removal/surveillance; foreign body removal.
- **Surgical approach:** Endoscopic (N/A laparoscopic/robotic).
- **Risks:** "Minor sore throat" typical; therapeutic endoscopy carries increased but still described as "rare" bleeding/perforation risk.
- **Alternatives:** X-ray/barium meal (less precise, per legacy wording).
- **Recovery:** ~30 min recovery-room observation; no driving 24 hrs; no food/drink in car; report severe pain/cough/fever/chills/chest pain/vomiting within 72 hrs.
- **Follow-up:** Report and biopsy results sent to referring physician.
- **FAQs:** None on legacy page.
- **Location:** Clementine Churchill; NHS Royal Free London; NHS London North West; UCL.
- **Robotic relevance:** None described.
- **Laparoscopic relevance:** N/A (endoscopic procedure).
- **Images/video:** Profile photo only; no embedded video found.
- **Clinical-review status: CLINICAL REVIEW REQUIRED** before any reuse (risk thresholds, e.g. fever/timing windows, must be clinician-confirmed as current).
- **Recommended action:** KEEP as base text, REWRITE for plain British English, EXPAND where thin.

## 2. Anti-Reflux Surgery (Laparoscopic Nissen Fundoplication)
- **Old URL:** `/anti-reflux-surgery-general-laparoscopic-surgeon-hertfordshire-harrow-london/`
- **Existing explanation:** GERD pathophysiology (lower oesophageal sphincter), Nissen fundoplication as minimally invasive correction.
- **Symptoms/reasons for referral:** Heartburn/acid reflux unresponsive to conservative treatment.
- **Indications:** GERD, hiatal hernia, chronic oesophagitis, failed medication/lifestyle modification.
- **Assessment info:** Not explicitly described.
- **Treatment options/alternatives:** Medication and lifestyle modification as prior conservative step.
- **Surgical approach:** Laparoscopic only, general anaesthesia, small incisions, stomach wrapped around oesophagus; benefits described as smaller incisions/faster healing/shorter rehab/less scarring, often outpatient/same-day.
- **Risks:** Bloating, dysphagia, wrap loosening, symptom recurrence.
- **Recovery:** Avoid heavy lifting; pain meds as prescribed; keep incision clean/dry; soft foods/liquids 2-4 weeks.
- **Follow-up:** Not specified.
- **FAQs:** None.
- **Location:** Clementine Churchill; NHS Royal Free London; NHS London North West.
- **Robotic relevance:** Byline mention only, not described as a technique here — note this directly relevant to `procedures.ts`'s claim of "Laparoscopic & Robotic Anti-Reflux Surgery" curing "over 90%" of cases, which has zero legacy-site corroboration.
- **Clinical-review status: CLINICAL REVIEW REQUIRED** — the rebuild's `procedures.ts` percentage claims (">90% symptom freedom") have no legacy or independent source at all and must be clinically verified before any reuse.
- **Recommended action:** KEEP as base, REWRITE, CLINICAL REVIEW REQUIRED, consider adding a verified robotic option.

## 3. Laparoscopic Common Bile Duct (CBD) Exploration
- **Old URL:** `/laparoscopic-common-bile-duct-exploration-general-laparoscopic-surgeon-hertfordshire-harrow-london/`
- **Existing explanation:** CBD stone removal via keyhole technique; short page (~250 words), notably thinner than others.
- **Symptoms/reasons for referral:** Not stated on this page.
- **Assessment info:** Intraoperative cholangiogram (dye + X-ray) to locate stones.
- **Surgical approach:** 3-4 keyhole incisions, laparoscope, instruments to cut duct and remove stone; temporary drainage catheter may be used; sutured closure.
- **Risks:** Bleeding, infection, duct swelling, bile leakage.
- **Recovery/follow-up:** Not detailed on this page - a genuine content gap even on the legacy site.
- **FAQs:** None.
- **Location:** Clementine Churchill; NHS Royal Free London; NHS London North West.
- **Robotic relevance:** Byline only.
- **Clinical-review status: CLINICAL REVIEW REQUIRED**, and this page needs substantial EXPANSION (recovery/follow-up missing even in the source).
- **Recommended action:** KEEP as base, REWRITE and EXPAND, CLINICAL REVIEW REQUIRED.

## 4. Laparoscopic Liver Resection (Hepatectomy)
- **Old URL:** `/laparoscopic-liver-resection-general-laparoscopic-surgeon-hertfordshire-harrow-london/`
- **Existing explanation:** Minimally invasive partial/whole liver removal; lists liver functions.
- **Indications:** Colon cancer metastatic to liver; benign liver tumours; hepatocellular carcinoma. **Contains a flagged, possibly erroneous line: "In the case of complete resection, liver transplantation is required" — this reads as ambiguous/potentially incorrect boilerplate and MUST be corrected or clarified by a clinician, not republished as-is.**
- **Assessment info:** Standard pre-op work-up (history, allergy check, imaging/bloods, bowel prep, NPO 6-8 hrs).
- **Treatment options:** Surgery ± adjuvant chemo/radiation.
- **Surgical approach:** 3-5 incisions, gas insufflation, laparoscope, specimen removed via umbilical incision.
- **Risks:** Bleeding, blood clots, infection, bile leakage, kidney problems, scar tissue.
- **Recovery:** IV pain/antibiotics, liquid diet initially, avoid heavy lifting, walking encouraged, possible adjuvant chemo/radiation, liver regenerates "in a few months."
- **FAQs:** None.
- **Location:** Clementine Churchill; NHS Royal Free London; UCL; NHS London North West.
- **Clinical-review status: CLINICAL REVIEW REQUIRED (high priority — the transplantation sentence needs explicit correction before reuse)**.
- **Recommended action:** KEEP as base, REWRITE, CLINICAL REVIEW REQUIRED with specific flag on the transplantation line.

## 5. Splenectomy
- **Old URL:** `/splenectomy-general-laparoscopic-surgeon-hertfordshire-harrow-london/`
- **Existing explanation:** Surgical spleen removal; spleen described as containing macrophages that "fight against foreign bodies."
- **Symptoms/reasons for referral:** Abdominal pain, hiccups, early satiety, weakness, fatigue, frequent infections, severe bleeding.
- **Assessment info:** Physical exam or radiological diagnosis.
- **Surgical approach:** BOTH open (large mid/left abdominal incision) and laparoscopic (3-4 incisions, gas insufflation) described.
- **Risks:** Bleeding, wound infection, pneumonia, injury to other structures.
- **Recovery/follow-up:** Not provided on this page - a genuine gap.
- **FAQs:** None.
- **Location:** Clementine Churchill; NHS Royal Free London; NHS London North West.
- **Clinical-review status: REWRITE REQUIRED (no recovery/follow-up content at all — shortest, thinnest page found)**.
- **Recommended action:** KEEP as base, REWRITE and substantially EXPAND, CLINICAL REVIEW REQUIRED.

## 6. Laparoscopic Cholecystectomy (Gallbladder Removal)
- **Old URL:** `/laparoscopic-cholecystectomy-general-laparoscopic-surgeon-hertfordshire-harrow-london/`
- **Existing explanation:** Most complete/detailed treatment page found (~1,300-1,400 words) - full pre-op through post-op coverage.
- **Symptoms/reasons for referral:** Cholecystitis, gallstones (bile duct or gallbladder), gallbladder infection, gallbladder cancer, pancreatitis unresponsive to other treatment.
- **Assessment info:** Pre-op work-up (medical evaluation, bloodwork, imaging).
- **Surgical approach:** 3-4 incisions, laparoscope, gas insufflation, bile duct/vessels ligated then gallbladder removed; ~1-2 hours.
- **Risks:** Infection, bleeding, hernias, blood clots, bile leakage, allergic/anaesthetic reactions, nerve/vessel injury, liver/duct/intestine damage.
- **Recovery:** Same-day or overnight stay; shoulder-tip pain from CO2 explained; no heavy lifting (>5 lb) until follow-up; return to work ~1 week; antibiotics; avoid smoking/alcohol; low-fat diet.
- **Follow-up:** Scheduled follow-up appointment to monitor progress.
- **FAQs:** None on legacy page (rebuild's `procedures.ts` for this treatment DOES add 2 FAQs, including an unverified ">95% normal diet" claim - flag separately).
- **Location:** Clementine Churchill; NHS Royal Free London; NHS London North West; UCL.
- **Clinical-review status: REWRITE REQUIRED (content quality is good, just needs modernised tone), CLINICAL REVIEW REQUIRED for risk list currency.**
- **Recommended action:** KEEP as the strongest base text of the 10, REWRITE, CLINICAL REVIEW REQUIRED.

## 7. Laparoscopic Hernia Repair — TEP and TAPP
- **Old URL:** `/laparoscopic-hernia-repair-tep-and-tapp-general-laparoscopic-surgeon-hertfordshire-harrow-london/`
- **Existing explanation:** Distinguishes TAPP (transabdominal preperitoneal) vs TEP (totally extraperitoneal) with full step-by-step description of each, including named advantages/disadvantages (TAPP: usable after prior lower-midline surgery but risk of adjacent-organ injury; TEP: avoids peritoneal entry risk).
- **Symptoms/reasons for referral:** Visible bulge with pain/discomfort.
- **Risks:** Infection, bleeding, swelling, adjacent-organ damage.
- **Recovery/follow-up:** Not detailed on this page - only a generic link to the separate Post-Op Instructions page.
- **FAQs:** None.
- **Location:** Clementine Churchill; NHS Royal Free London; NHS London North West.
- **Clinical-review status: CLINICAL REVIEW REQUIRED, REWRITE REQUIRED (recovery section missing)**.
- **Recommended action:** KEEP as base (the TAPP-vs-TEP comparison content is genuinely valuable and specific, not generic boilerplate), REWRITE and EXPAND recovery, CLINICAL REVIEW REQUIRED.

## 8. Incisional Hernia Repair
- **Old URL:** `/incisional-hernia-repair-general-laparoscopic-surgeon-hertfordshire-harrow-london/`
- **Existing explanation:** Most detailed page found (~1,800-2,000 words) - full indications through recovery.
- **Symptoms/reasons for referral:** Enlarged/painful bulge; incarcerated/strangulated hernia warning signs (medical emergency framing is appropriately strong).
- **Assessment info:** Full pre-op workup incl. allergy screening, medication review (blood thinners held 1-2 weeks prior), NPO 8 hrs, antibacterial shower, driver arranged, informed consent.
- **Surgical approach:** BOTH open (5-10cm incision) and laparoscopic (2-3 small incisions) fully described, with mesh use for larger defects.
- **Risks:** Infection (incision/mesh), post-op pain, blood/fluid accumulation, bleeding, anaesthetic reaction, recurrence, blood clots, adjacent-structure injury.
- **Recovery:** Same-day/next-day (lap.) or 2-3 days (open); **recovery text mentions "pain, swelling, and discomfort in the groin or upper thigh area" — this is anatomically more consistent with INGUINAL hernia repair recovery than incisional hernia repair, and is flagged as probable mismatched/reused boilerplate that needs clinician correction, not verbatim reuse.**
- **Follow-up:** Periodic follow-up scheduled.
- **FAQs:** None.
- **Location:** Clementine Churchill; NHS Royal Free London; NHS London North West.
- **Cross-reference note:** A SEPARATE "Incisional Hernia" condition-explainer page also exists (discovered via the General Surgery Conditions directory, URL `/incisional-hernia-general-laparoscopic-surgeon-hertfordshire-harrow-london/`, NOT YET CRAWLED) — distinct from this treatment page. Confirm both are needed and not contradictory before final IA decisions.
- **Clinical-review status: CLINICAL REVIEW REQUIRED (high priority — the groin/thigh recovery text needs explicit correction)**.
- **Recommended action:** KEEP as base (strongest indications/assessment content of the 10), REWRITE, CLINICAL REVIEW REQUIRED with specific flag on the recovery-text mismatch.

## 9. Appendectomy
- **Old URL:** `/appendectomy-general-laparoscopic-surgeon-hertfordshire-harrow-london/`
- **Existing explanation:** Appendix removal for appendicitis; BOTH open (2-3in incision) and laparoscopic approaches described.
- **Symptoms/reasons for referral:** Appendicitis framed correctly as a medical emergency; rupture risk (peritonitis, "sometimes fatal if not treated urgently"); most common ages 10-30.
- **Assessment info:** History, physical exam, bloods/diagnostics; NPO 8 hrs.
- **Risks:** Wound infection, haematoma, scarring, hernia, blood clots, anaesthetic reaction, abscess, bladder/intestine damage.
- **Recovery:** 1-3 day hospital stay depending on approach; antibiotics/pain meds; return to activity 1-2 weeks; avoid strenuous activity 4-6 weeks.
- **Follow-up:** 1-2 week follow-up for stitch/bandage removal.
- **FAQs:** None.
- **Location:** Clementine Churchill; NHS Royal Free London; NHS London North West.
- **Clinical-review status: REWRITE REQUIRED (templated copy, otherwise complete and appropriately urgent in tone).**
- **Recommended action:** KEEP as base, REWRITE, CLINICAL REVIEW REQUIRED.

## 10. Patient Education Videos (hub page — not a single treatment)
- **Old URL:** `/patient-education-videos-general-laparoscopic-surgeon-hertfordshire-harrow-london/`
- **Finding:** Text-mode extraction could NOT surface any actual video titles/IDs — only generic instructional copy and one placeholder link ("Educational Videos 1") were captured. Given the YPO-platform signal found elsewhere on the site, this page very likely contains a JS-rendered video library that a text-based fetch cannot see.
- **Recommended action:** **INVESTIGATE** with a browser-rendering tool (e.g. Playwright/Chrome DevTools MCP) before concluding this page has no migratable video content — do not assume it is empty.

---

## Related, discovered-but-not-yet-crawled content (for IA planning)

Two condition-directory pages were crawled and revealed **26 further individual condition-explainer URLs** never individually fetched in this pass:

**Gastroenterology directory (16 pages):** Acute Abdominal Pain, Liver Disease, Liver Masses, Hepatobiliary Disease, Gastric Disease, Biliary Tract Cancer, Indigestion, Liver Cancer, Upper Gastrointestinal Disease, Belching and Bloating, Achalasia, Gallstones, Gallbladder Disease, Choledocholithiasis, Gastroesophageal Reflux Disease (GERD), Prevention of Gastrointestinal Diseases.

**General Surgery directory (10 pages):** Hernia, Inguinal Hernia, Incisional Hernia (condition page — distinct from the treatment page above), Hiatal Hernia, Paraesophageal Hernia, Lumps and Bumps, Skin Cancer/Mole Checks, Anorectal Abscess, Pilonidal Sinus, Umbilical Hernia.

**Recommended action for all 26: INVESTIGATE.** These represent real, additional legacy content not covered in this pass and should be crawled before any final treatment/condition information-architecture decision is locked in, since several (e.g. Gallstones, GERD, Hernia, Inguinal Hernia) likely contain patient-facing explainer content that complements — but is distinct from — the 10 treatment pages mapped above.
