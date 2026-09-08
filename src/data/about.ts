import { professionalIdentity, getVerified } from './professionalIdentity';

export const aboutPositioning = {
  eyebrow: 'About Prof. Hemant Sheth',
  heading: 'Clear judgement before treatment.',
  workingTitle: getVerified(professionalIdentity.workingTitle) ?? '',
  statement:
    'Patient-focused surgical care for conditions of the upper digestive system, gallbladder, bile duct, and hernia — including minimally invasive laparoscopic and robotic-assisted approaches.',
  sideCard:
    'Consultant-led assessment for upper digestive, gallbladder, bile duct, liver, spleen and hernia conditions.',
};

/**
 * Only categories backed by verified content in `professionalIdentity.ts`
 * appear here. "Surgical qualifications" is deliberately omitted — 4
 * conflicting wordings exist across old and new sources with no single
 * confirmed version (see docs/professional-facts-register.md §2) — do
 * not reinstate this category until a canonical qualifications string
 * is client-confirmed and added to professionalIdentity.ts as verified.
 */
export const credentialCategories = ['NHS consultant role', 'Professional memberships'];

/**
 * Detail behind the "Qualifications & Memberships" toggle. Sourced
 * entirely from `professionalIdentity.ts` — only verified fields are
 * read here, so this object can never expose pending/conflicting facts
 * even if professionalIdentity.ts is edited carelessly elsewhere.
 */
export const profileDetail = {
  nhsRole: getVerified(professionalIdentity.nhsRole) ?? '',
  memberships: getVerified(professionalIdentity.memberships) ?? [],
  languages: getVerified(professionalIdentity.languages) ?? [],
};
