/**
 * Content safety gate — shared verification-status vocabulary.
 *
 * Every public-facing factual claim (identity, statistics, locations,
 * testimonials, publications) carries one of these statuses. Only
 * `verified` content may render. Everything else must be omitted from
 * the rendered page entirely — never shown as a placeholder, and never
 * exposed to visitors as a status label.
 *
 * See docs/verification-dashboard.md for the underlying evidence behind
 * every non-verified item currently held back from production.
 */
export type VerificationStatus =
  | 'verified'
  | 'pending'
  | 'conflicting'
  | 'clinical-review-required'
  | 'retired';

export const isSafeToRender = (status: VerificationStatus): boolean => status === 'verified';

/** Filters a list down to only publicly renderable items, in one place. */
export function renderable<T extends { status: VerificationStatus }>(items: T[]): T[] {
  return items.filter((item) => isSafeToRender(item.status));
}
