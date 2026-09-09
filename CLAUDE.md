# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/practice website for Prof. Hemant Sheth (consultant laparoscopic & robotic surgeon, London/Hertfordshire, UK — `keyholesurgeon.co.uk`). A React + Vite + TypeScript app with no backend and no CMS — all content is hardcoded in TypeScript data files. There is no router library; `src/App.tsx` implements its own lightweight client-side routing over the History API (see Architecture below).

## Commands

- `npm install` — install dependencies
- `npm run dev` — start Vite dev server on port 3000
- `npm run build` — type-check (`tsc`) then production build via Vite
- `npm run preview` — preview the production build

There is no lint script, no test runner, and no test files in this repo. Verify changes by running `npm run build` (catches type errors) and checking affected pages/flows with `npm run dev`, including desktop and mobile breakpoints.

A `.env` (see `.env.example`) can define `VITE_GOOGLE_MAPS_API_KEY` and `VITE_GOOGLE_MAPS_MAP_ID` for the interactive locations map — see "Locations map" below. Never commit real values; only `.env.example` is tracked.

## Architecture

**Entry point & routing:** `src/main.tsx` → `src/App.tsx`. `App.tsx` is the composition root. It hand-rolls routing for five paths (`/`, `/treatments`, `/robotic-surgery`, `/robotic-surgery/compare`, `/submit-testimonial`) using `window.history.pushState`/`popstate` — no React Router. It also holds top-level UI state (`activeTab`, booking modal, profile modal, selected procedure/clinic) and passes `onOpenBooking(procedureName?, clinicId?)` down so any section can trigger the consultation modal pre-filled with a specific procedure or clinic. Internal links use `navigateToPage`/`handleNavNavigate` helpers that intercept plain left-clicks (respecting modifier keys and `target="_blank"`-style default-prevented clicks) and fall back to a native navigation otherwise. Anchor-hash targets (e.g. `/treatments#some-procedure`) are scrolled into view with a retry loop since content can mount asynchronously.

**Important: `src/components/` contains more files than are actually wired up.** Only what's imported in `App.tsx` is live. Check `App.tsx` before assuming a component is rendered anywhere, and before assuming a task means "wire up the existing component" vs. "build a new one." As of now, components NOT imported by `App.tsx` include: `Hero.tsx`, `AboutSection.tsx`, `CardModal.tsx`, `InsuranceGuide.tsx`, `KeyholeLogo.tsx`, `ProcedureModal.tsx`, `ProceduresGrid.tsx`, `QuickServiceCards.tsx`, `RoboticShowcase.tsx`, `ServiceIcons.tsx`, `StickyMobileBar.tsx`, `TestimonialWall.tsx`, `PatientFeedbackCardsGallery.tsx`, `PatientJourneySection.tsx`, `TreatmentsIndexSection.tsx`.

**Content verification gate — read before adding/editing any factual content.** `src/data/contentStatus.ts` defines `VerificationStatus` (`'verified' | 'pending' | 'conflicting' | 'clinical-review-required' | 'retired'`) and a `renderable()` filter. **Only items with `status: 'verified'` may render on the page — never as a placeholder, and never with the status itself exposed to visitors.** This gate exists because the site makes medical/professional claims (qualifications, GMC number, hospital affiliations, testimonials) that must be evidence-backed; unverified claims are deliberately withheld rather than shown provisionally. `src/data/professionalIdentity.ts` is the single source of truth for Prof. Sheth's title, qualifications, GMC number, and NHS role — every fact there documents its own evidence basis inline and cites the underlying register in `docs/`. Do not hardcode a competing copy of any of these facts in a component; import from `professionalIdentity.ts` instead. The evidence trail behind every non-verified item lives in `docs/verification-dashboard.md` and the other `docs/*.md`/`docs/*.csv` registers (`professional-facts-register.md`, `testimonial-register.md`, `publication-register.md`, `location-verification.md`, `content-verification.md`, etc.) — consult these before changing a status or asserting a new fact is safe to render. `clinics.ts`, `contactInfo.ts`, `publications.ts`, and `testimonials.ts` follow the same status-gated pattern.

**Data layer** (`src/data/*.ts`): typed content arrays consumed by components, no fetching involved. Key files: `procedures.ts` (`ProcedureDetail[]` — symptoms, approach, recovery timeline, FAQs, `aeoSummary` written for AI answer-engine consumption), `treatmentDetails.ts` / `treatmentsIndex.ts` (treatment listing/detail page content), `clinics.ts` (`ClinicLocation[]` for hospitals + a separate `nhsBase` object for the NHS affiliation), `faqs.ts`, `testimonials.ts` / `patientTestimonials.ts` / `patientFeedbackCards.ts` (+ generated `patientFeedbackCards.generated.json`), `patientJourney.ts`, `roboticData.ts`, `about.ts`, `contactInfo.ts`, `publications.ts`, `legacyProfile.ts`, `professionalIdentity.ts`, `contentStatus.ts`. When adding a new procedure, clinic, FAQ, or testimonial, add an entry to the relevant data file (with an honest `status`) rather than hardcoding content into a component.

**Locations map** (`src/components/locations/`): `InteractiveLocationsMap.tsx` loads the Google Maps JS API lazily and asynchronously via `googleMapsLoader.ts`, keyed by `VITE_GOOGLE_MAPS_API_KEY`/`VITE_GOOGLE_MAPS_MAP_ID`. When no API key is configured (e.g. local dev without `.env`), the UI falls back to `StaticLocationMapPreview.tsx`, a static attributed OpenStreetMap-based preview — this fallback is intentional, not a bug. `LocationSelector.tsx` and `LocationDetailStrip.tsx` handle the hospital-picker UI and selected-hospital detail card.

**Styling:** Tailwind CSS with a custom theme in `tailwind.config.js` (`navy`, `teal`, `gold` color scales; `serif` = Source Serif 4, `sans` = Manrope, loaded via Google Fonts in `index.html`). Some components also use inline hex colors (e.g. `#294363`, `#17293e`) that aren't part of the Tailwind theme — match existing color usage in the surrounding component rather than introducing new ad hoc hex values.

**SEO/AEO:** `index.html` carries extensive meta tags and a JSON-LD `@graph` (Physician, MedicalWebPage, FAQPage schema) for medical AEO/local-search purposes. Keep this in sync if practice details (hospitals, credentials, FAQ content) change — the JSON-LD `FAQPage` should stay consistent with `src/data/faqs.ts`, and any claim added there is subject to the same verification gate as the data layer.

**`Feedback Cards/`** at the repo root holds real patient/colleague thank-you letters (PDF/DOCX/images) — source material for testimonials content, not code. Treat as reference material only. It's git-ignored.

**Assets:** `public/` contains many similarly-named image iterations (hero backgrounds, doctor portraits, cropped/zoomed variants) accumulated from prior design passes — check what's actually referenced in components before assuming an image is in use or safe to delete. Note that `.gitignore` only allow-lists specific files under `public/` (see the `public/*` block at the end of `.gitignore`); an image can exist locally and still not be tracked in git, so check `git check-ignore` if you're unsure whether a new/edited asset will actually ship.

**`artifacts/`** holds design-QA screenshot evidence from prior visual-review passes (git-ignored, local only). **`docs/`** holds the content-verification registers referenced above plus `typography-audit.md`, `media-inventory.md`, `seo-migration-map.csv`, and `legacy-vs-current-content-gap.md` — tracked in git, treat as living documentation when doing content or migration work.
