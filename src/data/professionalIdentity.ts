import { VerificationStatus, isSafeToRender } from './contentStatus';

/**
 * SINGLE SOURCE OF TRUTH for Prof. Sheth's professional identity.
 *
 * Every component that previously hardcoded a title, qualifications
 * string, GMC number, or NHS-role wording must import from here instead.
 * Do not add a new hardcoded copy of any of these facts elsewhere.
 *
 * Status basis (see docs/professional-facts-register.md and
 * docs/verification-dashboard.md for the full evidence trail):
 *
 * - displayName: "Prof. Hemant Sheth" is the site's own long-standing
 *   convention, independently corroborated by 3 third-party directories
 *   (Spire Healthcare, BUPA Finder, Doctify). Real patient testimonials on
 *   the legacy site use "Mr"/"Dr" instead, which reflects the traditional
 *   UK surgical honorific rather than a contradiction of an academic title
 *   — both can be true. Treated as verified for the working title; the
 *   *specific* "Clinical Professor (awarded 2023)" claim is a separate,
 *   single-valued fact with no named awarding institution and is kept
 *   pending.
 * - gmcNumber: consistent across 4+ sources but never independently
 *   confirmed against the GMC register itself (automated lookup blocked).
 *   Clinical-review-required — must not render until a human confirms it
 *   directly against https://www.gmc-uk.org/registration-and-licensing/the-medical-register
 * - qualificationsString: 4 different exact wordings exist across the
 *   pre-gate codebase, none identical to each other or to the legacy
 *   bio page's own fullest version. Conflicting — do not render a
 *   specific qualifications string until one canonical version is
 *   client-confirmed.
 * - clinicalProfessorClaim: year matches between legacy and rebuild, but
 *   no awarding institution is named anywhere. Pending.
 * - nhsRole: core substance verified; the rebuild-added word "Robotic"
 *   is not corroborated by the legacy NHS-role wording specifically, so
 *   it is omitted from the verified string below.
 * - memberships / languages: match the legacy site with no conflict.
 *   Treated as verified.
 */

interface IdentityFact<T> {
  value: T;
  status: VerificationStatus;
}

export const professionalIdentity = {
  displayName: { value: 'Prof. Hemant Sheth', status: 'verified' } satisfies IdentityFact<string>,

  workingTitle: {
    value: 'Consultant Upper GI, Laparoscopic & Hepatobiliary Surgeon',
    status: 'verified',
  } satisfies IdentityFact<string>,

  gmcNumber: { value: '4567912', status: 'clinical-review-required' } satisfies IdentityFact<string>,

  qualificationsString: {
    value: null,
    status: 'conflicting',
  } satisfies IdentityFact<string | null>,

  clinicalProfessorClaim: {
    value: 'Clinical Professor (awarded 2023)',
    status: 'pending',
  } satisfies IdentityFact<string>,

  nhsRole: {
    value: 'Consultant Upper GI, Hepatobiliary & Laparoscopic Surgeon',
    status: 'verified',
  } satisfies IdentityFact<string>,

  memberships: {
    value: [
      'Royal College of Surgeons of England',
      'Association of Surgeons of Great Britain and Ireland (ASGBI)',
      'British Medical Association (BMA)',
      'Association of Upper Gastrointestinal Surgeons (AUGIS)',
      'European-African Hepato-Pancreato-Biliary Association (E-AHPBA)',
      'International Hepato-Pancreato-Biliary Association (IHPBA)',
    ],
    status: 'verified',
  } satisfies IdentityFact<string[]>,

  languages: {
    value: ['Gujarati', 'Hindi', 'Marathi', 'Konkani'],
    status: 'verified',
  } satisfies IdentityFact<string[]>,
} as const;

/** Convenience getters — return the value only when verified, else undefined. */
export function getVerified<T>(fact: IdentityFact<T>): T | undefined {
  return isSafeToRender(fact.status) ? fact.value : undefined;
}
