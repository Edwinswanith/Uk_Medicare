import { VerificationStatus, isSafeToRender } from './contentStatus';

/**
 * SINGLE SOURCE OF TRUTH for public contact channels and operational
 * commitments (phone/email shown to patients, turnaround promises).
 * Kept separate from professionalIdentity.ts because these are
 * operational facts, not clinical/professional credentials — but the
 * same rule applies: components must read from here, not hardcode a
 * number/email/promise locally, and must render nothing when a field's
 * status isn't 'verified'.
 *
 * generalPhone: "020 3371 1785" — independently corroborated by
 * Spire Healthcare's own consultant page as a real, working number
 * connected to Prof. Sheth's practice (attributed there to private
 * secretary Amit Christian). The number itself is not in dispute; only
 * its precise description ("general enquiry line" vs "a named
 * secretary's direct line") is uncertain — so it is labelled generically
 * ("Practice Contact") rather than as a department-specific line, and
 * kept verified. This is a reasoned, evidenced decision, not a default —
 * see docs/professional-facts-register.md §9 and
 * docs/location-verification.md.
 *
 * secretaryMobile: "07716 835261" — the number found only on the
 * pre-gate site's own clinics.ts, shared across all locations, with NO
 * independent corroboration and conflicting attribution (Amit vs
 * Nehali Christian). Stays 'pending'. Do not render this number
 * anywhere. This was leaking into ConsultationModal's hardcoded
 * success-screen text; that leak is fixed by sourcing from this file.
 *
 * email: "info@keyholesurgeon.co.uk" — inferred from the practice's own
 * domain, never independently confirmed as a live, monitored inbox.
 * Stays 'pending' until confirmed.
 *
 * enquiryTurnaround: no operational commitment has been confirmed by the
 * practice for any specific response time. Stays 'pending' — do not
 * render a turnaround promise (e.g. "within 24 business hours") without
 * an approved commitment behind it.
 */

interface ContactFact<T> {
  value: T;
  status: VerificationStatus;
}

export const contactInfo = {
  generalPhone: {
    value: { display: '020 3371 1785', href: 'tel:02033711785', label: 'Practice Contact' },
    status: 'verified',
  } satisfies ContactFact<{ display: string; href: string; label: string }>,

  secretaryMobile: {
    value: { display: '07716 835261', href: 'tel:+447716835261' },
    status: 'pending',
  } satisfies ContactFact<{ display: string; href: string }>,

  email: {
    value: { display: 'info@keyholesurgeon.co.uk', href: 'mailto:info@keyholesurgeon.co.uk' },
    status: 'pending',
  } satisfies ContactFact<{ display: string; href: string }>,

  enquiryTurnaround: {
    value: 'Within 24 business hours.',
    status: 'pending',
  } satisfies ContactFact<string>,
} as const;

export function getVerifiedContact<T>(fact: ContactFact<T>): T | undefined {
  return isSafeToRender(fact.status) ? fact.value : undefined;
}
