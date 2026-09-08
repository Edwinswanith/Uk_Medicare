# Video & Media Inventory

**Retrieved date:** 2026-09-07 | **Reviewer:** unassigned | **Last reviewed:** 2026-09-07
**Source:** https://www.keyholesurgeon.co.uk/ (homepage, Media page, Patient Education Videos page — all crawled 2026-09-07); `D:\prof_hemant_sheth_website` source tree.

## 1. Videos found

| Title | Existing page | Media URL | Topic | Ownership | Sheth appears? | Relevance | Recommended new location |
|---|---|---|---|---|---|---|---|
| "WATCH: Ealing Hospital breaks national record for robotic surgeries" | Legacy homepage (per original extraction); also embedded live in the current rebuild's `RoboticSurgerySection.tsx` | YouTube ID `Q__rvX_EEGQ` (`https://www.youtube.com/watch?v=Q__rvX_EEGQ`) | Robotic surgery milestone at Ealing Hospital, NHS | Appears to be third-party/news-produced content (title framing is journalistic, "WATCH:" prefix typical of a news outlet), not a practice-produced patient-education video | Presumably yes (context implies Prof. Sheth's team) | High — this is the single piece of concrete, findable evidence behind the rebuild's "national record" robotic-surgery claim | KEEP in a dedicated Robotic Surgery section; this asset is legitimately and consistently sourced across both old and new sites |

## 2. Duplicate-video status (cross-reference with prior UX audit — already resolved, not re-flagged as outstanding)

The prior UX/CTA audit had flagged a duplicate-video issue in the rebuild's robotic sections and the team already fixed it. This content audit independently re-verified the current source code and confirms the fix is in place:

- `RoboticSurgerySection.tsx` (rendered live): embeds `Q__rvX_EEGQ`.
- `RoboticSurgeryExplainerSection.tsx` (rendered live): **no video embed at all** — text-only explainer.
- `RoboticComparisonSection.tsx` (rendered live): **no video embed at all** — comparison table only.
- `RoboticShowcase.tsx` (dead component, not rendered): also embeds `Q__rvX_EEGQ` — if this dead component were ever wired back into `App.tsx` alongside `RoboticSurgerySection.tsx`, the same video would then appear twice on the page. **Recommendation: if `RoboticShowcase.tsx` is ever reactivated, either remove its video embed or remove the one in `RoboticSurgerySection.tsx` to avoid reintroducing the duplicate.**

**Conclusion: no duplicate-video issue exists on the live page today.** Only one video is shown to any real visitor.

## 3. Patient Education Videos hub page — unresolved gap

- **URL:** `/patient-education-videos-general-laparoscopic-surgeon-hertfordshire-harrow-london/`
- **Finding:** The AI-mediated text-fetch tool could not surface any actual video titles or YouTube IDs on this page — only generic instructional copy ("Click on the desired multimedia patient education videos to learn more...") and one placeholder link ("Educational Videos 1") were captured.
- **Likely explanation:** The legacy site shows signs (a "Your Practice Online" / YPO logo found on other pages) of being built on the YPO medical-website platform, which commonly serves patient-education video libraries via a JavaScript-rendered third-party widget that a text-mode fetch tool cannot see.
- **Status: INVESTIGATE.** Do not conclude this page has no content — a follow-up crawl using a browser-rendering tool (e.g. Playwright or Chrome DevTools MCP, both available in this environment) is recommended before any final decision on whether there is a video library worth migrating.

## 4. Media hub page — thin content, other sub-sections not crawled

- **URL:** `/media-general-laparoscopic-surgeon-hertfordshire-harrow-london/`
- **Finding:** Functions as a navigation hub only (~150-200 words), linking to "Patient Testimonials," "Healthcare News," and "In the News" sub-sections. No video embeds were found on this page itself despite its name.
- **Sub-sections NOT individually crawled in this pass:** "Healthcare News" and "In the News" — their URLs were referenced but not captured/fetched.
- **Status: INVESTIGATE.** These 2 sub-sections may contain press coverage or additional video/media content relevant to a new site's Media/Press section and should be crawled before finalising that section's content plan.

## 5. Images inventory (alt-text level only — no image files were downloaded or inspected in this audit)

| Image (alt text / description as captured) | Where found | Notes |
|---|---|---|
| "Hemant Sheth Logo" | Site-wide | Practice logo |
| "Dr Hemant Sheth" (profile photo) | Bio page | **Note: alt text says "Dr", body copy on the same page says "Prof." — an internal legacy-site inconsistency, cross-referenced in `professional-facts-register.md`** |
| "Hemant Sheth certification" (certificate image) | Bio page | Certificate image referenced but content not readable from alt text alone; if reused, the certificate itself should be independently reviewed, not assumed to corroborate any specific credential claim |
| "Your Practice Online" logo | Multiple pages (footer) | CMS/platform vendor attribution, confirms the site's platform origin, not practice content itself |
| Institutional/affiliate logos (Clementine Churchill, NHS Royal Free London, UCL, NHS London North West, Royal College of Surgeons, ASGBI) | Media, Services, Testimonials pages | Standard affiliation logos; if reused on the new site, each affiliation should be current-verified before display (an out-of-date affiliation logo is itself a compliance risk) |
| `og:image` / social preview image | `index.html` (rebuild) | `https://assets.yourpractice.online/2533/dr-sheth-h-cc.png` — note this asset is hosted on a `yourpractice.online` (YPO platform) domain, meaning the rebuild's own social-preview image is currently dependent on the legacy CMS vendor's asset hosting; recommend re-hosting this image on the new site's own infrastructure to remove that dependency |

## 6. Social media accounts (consistent across every legacy page crawled)

| Platform | URL | Notes |
|---|---|---|
| Facebook | https://www.facebook.com/MrHemantSheth | Handle uses "Mr" not "Prof." |
| Twitter/X | https://twitter.com/MrHEMANTSheth1 | Handle uses "Mr" not "Prof." |
| LinkedIn | https://in.linkedin.com/in/hemant-sheth-15a95696 | `.in` (India) LinkedIn domain — worth confirming this is still the correct/current profile |
| YouTube | https://www.youtube.com/channel/UCArSTcjcxMRNC5XWIFscO2Q | Channel likely hosts the Ealing Hospital video and possibly the missing Patient Education Videos library — **recommend directly browsing this channel** as a fast way to resolve the item-3 gap above |

**Status for all 4: LEGACY - NEEDS CONFIRMATION** that these accounts are still active/current/correctly attributed before linking them from the new site — none were independently checked for current activity in this pass.

## 7. Recommended new-site media architecture

1. A dedicated Robotic Surgery / Press section keeping the verified Ealing Hospital video (`Q__rvX_EEGQ`).
2. A Patient Education Videos section — populate only after the INVESTIGATE item above is resolved (browser-render the legacy page or browse the YouTube channel directly).
3. A lightweight Press/Media section for any "Healthcare News"/"In the News" content, pending the INVESTIGATE item above.
4. Re-host the social-preview (`og:image`) asset on the new site's own infrastructure rather than depending on the legacy CMS vendor's domain.
