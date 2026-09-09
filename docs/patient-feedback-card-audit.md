# Patient Feedback Card Audit

Generated: 2026-09-09

## Scope

- Source archive inspected: `C:\Users\bizzz\Downloads\Patient feedback`
- Rendered source pages in `public/patient-feedback`: 153
- Source archive files counted: 72 ({'.doc': 2, '.jpg': 1, '.pdf': 68, '.xlsx': 1})
- Original source files were not deleted, overwritten, or renamed.

## Current Pipeline Finding

- The existing app rendered `patientFeedbackCards.generated.json` as a flat page gallery.
- The old data model had no pair, duplicate, orientation, consent, or publication-status metadata.
- Cleaned derivatives now live in `public/patient-feedback-clean/`; originals remain in `public/patient-feedback/`.
- `src/data/patientFeedbackCards.ts` is the selector boundary for public rendering.

## Cleanup Summary

- Candidate pages retained for grouped testimonials: 48
- Final testimonial groups: 42
- Single-page testimonial groups: 37
- Multi-page testimonial groups: 5
- Staff-recognition pages excluded: 22
- Colleague/trainee pages excluded: 20
- Decorative/front pages excluded: 42
- Duplicate pages excluded: 16
- Blank/non-content pages excluded: 3
- Manual-review items: 2

## Orientation Normalisation

- Candidate pages rotated 90 degrees clockwise: 3
- Candidate pages rotated 90 degrees counterclockwise: 4
- Candidate pages rotated 180 degrees: 0

## Consent And Publication Status

- Asset cleanup does not establish dated consent.
- Consent-approved public testimonials recorded in this pass: 0
- Pending testimonial groups retained as candidates: 42
- The strict `getPublicPatientTestimonials` selector remains blocked until publication status is `verified` after review.
- The existing feedback-card gallery uses the cleaned normalised candidate list after explicit content-owner approval; audit status metadata is retained.

## QA Artifacts

- Manifest: `docs/patient-feedback-card-manifest.csv`
- Manual review queue: `docs/patient-feedback-manual-review.csv`
- Summary JSON: `artifacts/feedback-card-cleanup/manifest-summary.json`
- Candidate contact sheets:
  - `artifacts\feedback-card-cleanup\after\candidate-contact-sheet-002-022.jpg`
  - `artifacts\feedback-card-cleanup\after\candidate-contact-sheet-031-079.jpg`
  - `artifacts\feedback-card-cleanup\after\candidate-contact-sheet-080-125.jpg`
  - `artifacts\feedback-card-cleanup\after\candidate-contact-sheet-126-150.jpg`
- Before/after examples:
  - sideways_before_after: `artifacts\feedback-card-cleanup\before\sideways_before_after-feedback-card-013.jpg`, `public\patient-feedback-clean\feedback-card-013.jpg`, `artifacts\feedback-card-cleanup\before\sideways_before_after-feedback-card-117.jpg`, `public\patient-feedback-clean\feedback-card-117.jpg`
  - cover_message: `artifacts\feedback-card-cleanup\before\cover_message-feedback-card-001.jpg`, `artifacts\feedback-card-cleanup\before\cover_message-feedback-card-002.jpg`, `public\patient-feedback-clean\feedback-card-002.jpg`
  - message_continuation: `artifacts\feedback-card-cleanup\before\message_continuation-feedback-card-125.jpg`, `public\patient-feedback-clean\feedback-card-125.jpg`, `artifacts\feedback-card-cleanup\before\message_continuation-feedback-card-126.jpg`, `public\patient-feedback-clean\feedback-card-126.jpg`
  - staff_absent_source: `artifacts\feedback-card-cleanup\before\staff_absent_source-feedback-card-045.jpg`
  - duplicate_group: `artifacts\feedback-card-cleanup\before\duplicate_group-feedback-card-148.jpg`, `public\patient-feedback-clean\feedback-card-148.jpg`, `artifacts\feedback-card-cleanup\before\duplicate_group-feedback-card-151.jpg`

## Remaining Ambiguity

- `feedback-card-100`: mixed staff/patient source label; needs human confirmation.
- `feedback-card-116`: content is too faint to classify confidently from the rendered page.
