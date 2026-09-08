# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/practice website for Prof. Hemant Sheth (consultant laparoscopic & robotic surgeon, London/Hertfordshire, UK — `keyholesurgeon.co.uk`). A single-page React app: no router, no backend, no CMS. All content is hardcoded in TypeScript data files or directly in JSX.

## Commands

- `npm run dev` — start Vite dev server on port 3000
- `npm run build` — type-check (`tsc`) then production build via Vite
- `npm run preview` — preview the production build

There is no lint script, no test runner, and no test files in this repo. Verify changes by running `npm run build` (catches type errors) and checking the page with `npm run dev`.

## Architecture

**Entry point:** `src/main.tsx` → `src/App.tsx`. `App.tsx` is the single page composition root — it holds top-level UI state (`activeTab`, booking modal open/closed, selected procedure) and renders sections in order, passing an `onOpenBooking(procedureName?)` callback down so any section can trigger the consultation modal pre-filled with a specific procedure.

**Important: `src/components/` contains more files than are actually wired up.** Only what's imported in `App.tsx` is live on the page. As of now that's: `TopHeader`, `Navbar` (exports `NavBar`), `HeroSection`, `StatsCounterBar`, `TreatmentsCarousel`, `RoboticSurgerySection`, `ConsultationModal`. Files like `Hero.tsx`, `AboutSection.tsx`, `AeoFaqSection.tsx`, `ProceduresGrid.tsx`, `ProcedureModal.tsx`, `CardModal.tsx`, `ClinicLocations.tsx`, `InsuranceGuide.tsx`, `QuickServiceCards.tsx`, `RoboticShowcase.tsx`, `ServiceIcons.tsx`, `StickyMobileBar.tsx`, `TestimonialWall.tsx`, `KeyholeLogo.tsx` exist but are **not currently rendered anywhere** — check `App.tsx` before assuming a component is live, and check whether a task means "build it" vs "wire up the existing one."

**Data layer** (`src/data/*.ts`): typed content arrays consumed by components, no fetching involved.
- `procedures.ts` — `ProcedureDetail[]`, one entry per surgical procedure (symptoms, approach, recovery timeline, FAQs, etc.), plus `procedureCategories` for filtering.
- `clinics.ts` — `ClinicLocation[]` for the hospitals Prof. Sheth operates from, plus a separate `nhsBase` object for his NHS affiliation.
- `faqs.ts`, `testimonials.ts`, `roboticData.ts` — similarly typed static content.

When adding a new procedure, clinic, FAQ, or testimonial, add an entry to the relevant data file rather than hardcoding content into a component.

**Styling:** Tailwind CSS with a custom theme in `tailwind.config.js` (`navy`, `teal`, `gold` color scales; `serif` = Source Serif 4, `sans` = Manrope, loaded via Google Fonts in `index.html`). Some components also use inline hex colors (e.g. `#294363`, `#17293e`) that aren't part of the Tailwind theme — match existing color usage in the surrounding component rather than introducing new ad hoc hex values.

**SEO/AEO:** `index.html` carries extensive meta tags and a JSON-LD `@graph` (Physician, MedicalWebPage, FAQPage schema) for medical AEO/local-search purposes. Keep this in sync if practice details (hospitals, credentials, FAQ content) change — e.g. `aeoSummary` fields in `procedures.ts` are written for AI answer-engine consumption, and the JSON-LD `FAQPage` in `index.html` should stay consistent with `src/data/faqs.ts`.

**`Feedback Cards/`** at the repo root holds real patient/colleague thank-you letters (PDF/DOCX/images) — source material for testimonials content, not code. Treat as reference material only.

**Assets:** `public/` contains many similarly-named image iterations (hero backgrounds, doctor portraits, cropped/zoomed variants) accumulated from prior design passes — check what's actually referenced in components (e.g. `hero_bg_davinci_sheth.png` is the current hero background) before assuming an image is in use or safe to delete.
