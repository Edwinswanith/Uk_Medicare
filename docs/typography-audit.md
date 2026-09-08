# Typography Audit

Date: 2026-09-08

## Scope

Reviewed the rendered home page at the requested baseline viewport sizes and scanned the React/Tailwind source for typography classes across header, hero, trust/proof bands, treatments, robotic surgery, testimonials, locations, FAQ, appointment form, routed testimonial form, modals, and footer.

Baseline screenshots:

- `artifacts/typography-before/home-390x844.png`
- `artifacts/typography-before/home-430x932.png`
- `artifacts/typography-before/home-768x1024.png`
- `artifacts/typography-before/home-1024x768.png`
- `artifacts/typography-before/home-1280x800.png`
- `artifacts/typography-before/home-1366x768.png`
- `artifacts/typography-before/home-1440x900.png`
- `artifacts/typography-before/home-1600x900.png`
- `artifacts/typography-before/home-1920x1080.png`
- `artifacts/typography-before/home-fullpage-1600x7200.png`

## Current Type Direction

The HTML imports the requested font families:

- Display/editorial: Source Serif 4
- Body/UI: Manrope

The CSS base layer currently overrides that direction:

- `html` uses `Plus Jakarta Sans`
- `h1, h2, h3, .font-serif` use `Playfair Display`

This creates an implementation mismatch with the requested visual system and with `tailwind.config.js`, which already defines `font-serif` as Source Serif 4 and `font-sans` as Manrope.

## Existing Type Scale Inventory

Current source patterns include:

- Eyebrows: commonly `9.5px`, `10px`, `11px`, `11.5px`, `12px`, with letter spacing up to `0.28em`
- Hero H1: strong serif display sizing, but paired with small uppercase and CTA text
- Page/section H2: mostly `24px` to `72px`, inconsistent by section
- H3/H4: commonly `15px` to `20px`, sometimes too close to body copy
- Lead paragraphs: usually `14px` to `17px`
- Body paragraphs: commonly `13px`, `14px`, `15px`, or `16px`
- Small body/captions: frequently `10px`, `11px`, `12px`, or `text-xs`
- Navigation: desktop around `12.5px`; mobile menu items `12px`
- Buttons: many primary CTAs at `11px`, `13px`, or `14px`
- Form labels: mostly `12px`
- Form inputs/selects: `12px` mobile, `14px` small-screen and up
- FAQ questions/answers: tabs and callouts from `12px`; answers around `14px` to `16px`
- Location labels and metadata: `10px` to `14px`
- Testimonial metadata: `10px` to `12px`; quote has stronger scale but surrounding supporting text is small
- Footer: headings `14px`, links/body `12px`, legal/disclaimer `11px` to `12px`

## Problems Found

1. Font-family mismatch: base CSS does not use the requested Source Serif 4 / Manrope stack even though the fonts are loaded.
2. Too much meaningful content sits below comfortable reading size, especially form labels, input values, footer copy, location metadata, treatment summaries, and robotic feature descriptions.
3. Small uppercase labels are overused and often too spaced out, making them decorative instead of functional.
4. Many arbitrary sizes create a fragmented hierarchy: `9.5`, `10`, `11`, `11.5`, `12`, `12.5`, `13`, `13.5`, `14`, `14.5`, `15`, `16`, and `17px` all appear in important UI.
5. Desktop navigation is visually precise but too small for the importance of the site-wide wayfinding.
6. Appointment and testimonial forms use 12-14px input text; this is below the requested mobile-safe 16px minimum.
7. Dark-section supporting copy often uses low-opacity text, making normal reading harder than necessary.
8. FAQ answers and key takeaway callouts are understated for medical scanning behavior.
9. Footer typography collapses into legal-document scale, including important disclaimer and contact context.
10. Several headings use manual arbitrary sizes rather than a shared scale, so section hierarchy varies between modules.
11. Metadata sometimes competes with body copy because some body text is too small rather than metadata being too large.
12. Long supporting paragraphs do not consistently use readable measure and `text-wrap: pretty`.

## Section Notes

Header and navigation:

- Brand/title hierarchy is acceptable, but subtitle and title support copy are small.
- Desktop nav should move from roughly 12.5px to 15-16px.
- Mobile nav should move from `text-xs` to 16px.

Hero:

- The hero image and display heading have strong presence.
- CTA text and supporting labels are smaller than their role.
- Body copy is close to acceptable but should be tied to a semantic lead/body token.

Treatments:

- Treatment names are scannable, but summaries and action text are closer to metadata scale than patient reading scale.
- Tags and categories need clearer separation from real descriptions.

Robotic surgery and comparison:

- Editorial heading works, but feature descriptions and badges use 12-13px text with low-opacity colors.
- Comparison table and CTA text should be lifted to readable UI/body scale.

Testimonials:

- Carousel motion and layout are clear.
- Featured quote should stay editorial and the attribution/supporting type should not fall to tiny metadata scale.

Locations:

- The hospital explorer is visually strong.
- Selector labels, verified-site labels, addresses, and consultation copy should be more readable.

FAQ:

- FAQ section structure is clear, but tab labels, answers, and takeaway callouts are too small for medical information.

Appointment and testimonial forms:

- Labels, input/select values, placeholder text, help text, and confirmation details are too small.
- Mobile inputs should be at least 16px to avoid browser zoom and improve readability.

Footer:

- Footer links, disclaimers, and copyright are too small.
- Group headings can remain compact but should not be the only readable text.

## Planned Semantic Type Tokens

Create a shared semantic scale in `src/index.css`:

- `.text-eyebrow`
- `.text-display`
- `.text-page-title`
- `.text-section-title`
- `.text-subsection-title`
- `.text-lead`
- `.text-body`
- `.text-body-small`
- `.text-meta`
- `.text-caption`
- `.text-button`
- `.text-form-label`
- `.text-form-help`

The implementation should use these tokens to replace repeated arbitrary sizes where it improves consistency, while preserving section-specific composition where needed.

## Target Scale

- Display/Hero H1: Source Serif 4, clamp around `3.4rem` to `5.25rem`, tight but readable line-height
- Page H1: Source Serif 4, clamp around `2.9rem` to `4.4rem`
- Section H2: Source Serif 4, clamp around `2.25rem` to `3.4rem`
- H3/Subsection: Source Serif 4, clamp around `1.45rem` to `1.9rem`
- Lead paragraph: Manrope, `1.0625rem` mobile to `1.3rem` desktop, line-height around `1.6`
- Body: Manrope, `1rem` mobile to `1.125rem` desktop, line-height `1.65` to `1.75`
- Small body: `0.9375rem` to `1rem`
- Metadata: `0.875rem` to `0.9375rem`
- Eyebrow: `0.75rem` to `0.8125rem`, controlled tracking
- Buttons: `0.95rem` to `1rem`
- Form labels: `0.9375rem`
- Form help: `0.875rem` to `0.9375rem`

## Pre-Change Typography Scores

- Typography hierarchy: 7.4/10
- Body readability: 7.2/10
- Mobile typography: 7.0/10
- Form readability: 6.6/10
- Heading differentiation: 8.0/10
- Navigation readability: 6.8/10

These are visual audit scores, not automated accessibility scores.
