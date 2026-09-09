import generatedCards from './patientFeedbackCards.generated.json';
import cleanedGeneratedCards from './patientFeedbackCards.cleaned.generated.json';
import { isSafeToRender, type VerificationStatus } from './contentStatus';

export interface PatientFeedbackCard {
  id: string;
  sequence: number;
  title: string;
  category: string;
  sourceKind: 'PDF page' | 'JPG' | 'DOC' | 'XLSX';
  pageLabel: string;
  image: string;
}

export type PatientFeedbackPageRole =
  | 'message'
  | 'cover'
  | 'design'
  | 'continuation'
  | 'staff-recognition'
  | 'blank'
  | 'duplicate'
  | 'unknown';

export type PatientFeedbackOrientation =
  | 'upright'
  | 'rotate-90-clockwise'
  | 'rotate-90-counterclockwise'
  | 'rotate-180'
  | 'unknown';

export type PatientFeedbackPublicCandidate = 'yes' | 'no' | 'review';
export type PatientFeedbackConsentStatus =
  | VerificationStatus
  | 'approved'
  | 'denied'
  | 'not-required';

export interface PatientFeedbackSourcePage {
  source_file: string;
  source_index: number;
  source_group: string;
  pair_id: string;
  page_number: number;
  page_role: PatientFeedbackPageRole;
  orientation: PatientFeedbackOrientation;
  rotation_required: string;
  content_type: string;
  testimonial_type: 'patient' | 'staff-recognition' | 'colleague-trainee' | 'unknown';
  staff_recognition: 'yes' | 'no';
  duplicate_group: string;
  public_candidate: PatientFeedbackPublicCandidate;
  publication_status: VerificationStatus;
  consent_status: PatientFeedbackConsentStatus;
  exclusion_reason: string;
  original_asset: string;
  normalised_asset: string;
  notes: string;
}

export interface PatientFeedbackTestimonialPage {
  id: string;
  src: string;
  sourceSrc: string;
  sourceFile: string;
  pageRole: Extract<PatientFeedbackPageRole, 'message' | 'continuation'>;
  orientation: 'upright';
  originalOrientation: PatientFeedbackOrientation;
  pageLabel: string;
}

export interface PatientFeedbackTestimonial {
  id: string;
  type: 'patient' | 'staff-recognition' | 'colleague-trainee' | 'unknown';
  source: 'source-feedback-card';
  category: string;
  sourceFiles: string[];
  publicationStatus: VerificationStatus;
  consentStatus: PatientFeedbackConsentStatus;
  publicCandidate: boolean;
  pages: PatientFeedbackTestimonialPage[];
}

export interface PatientFeedbackAuditSummary {
  generatedAt: string;
  sourceArchive: string;
  sourceArchiveFiles: number;
  sourceArchiveExtensionCounts: Record<string, number>;
  sourcePageCount: number;
  originalPublicImageCount: number;
  candidatePageCount: number;
  finalTestimonialGroupCount: number;
  finalPublicCandidateCount: number;
  renderablePublicTestimonials: number;
  consentApprovedPublicTestimonials: number;
  pendingTestimonials: number;
  singlePageTestimonialGroups: number;
  multiPageTestimonialGroups: number;
  staffRecognitionPagesFound: number;
  staffRecognitionPagesExcluded: number;
  colleagueTraineePagesExcluded: number;
  decorativeCoverPagesExcluded: number;
  trueDuplicatePagesFound: number;
  duplicatePagesExcluded: number;
  blankNonContentPagesExcluded: number;
  manualReviewItems: number;
  totalExcludedFromPublicDisplay: number;
  orientationIssuesFound: number;
  cardsRotated90Clockwise: number;
  cardsRotated90Counterclockwise: number;
  cardsRotated180: number;
  originalSourceHashesSample: Record<string, string>;
}

interface PatientFeedbackCleanedDataset {
  generatedAt: string;
  sourceArchive: string;
  summary: PatientFeedbackAuditSummary;
  sourcePages: PatientFeedbackSourcePage[];
  testimonials: PatientFeedbackTestimonial[];
}

export const patientFeedbackCards = generatedCards as PatientFeedbackCard[];
export const patientFeedbackCleanedDataset =
  cleanedGeneratedCards as PatientFeedbackCleanedDataset;

export const patientFeedbackSourcePages = patientFeedbackCleanedDataset.sourcePages;
export const patientFeedbackCandidateTestimonials = patientFeedbackCleanedDataset.testimonials;
export const patientFeedbackAuditSummary = patientFeedbackCleanedDataset.summary;

export const patientFeedbackSourceCategories = Array.from(
  new Set(patientFeedbackCards.map((card) => card.category))
);

export const patientFeedbackCandidateCategories = Array.from(
  new Set(patientFeedbackCandidateTestimonials.map((testimonial) => testimonial.category))
);

const hasPublicationApproval = (testimonial: PatientFeedbackTestimonial): boolean =>
  isSafeToRender(testimonial.publicationStatus);

const hasConsentApproval = (testimonial: PatientFeedbackTestimonial): boolean =>
  testimonial.consentStatus === 'approved' || testimonial.consentStatus === 'verified';

export const getPublicPatientTestimonials = (): PatientFeedbackTestimonial[] =>
  patientFeedbackCandidateTestimonials.filter((testimonial) => (
    testimonial.type === 'patient' &&
    testimonial.publicCandidate &&
    hasPublicationApproval(testimonial) &&
    hasConsentApproval(testimonial) &&
    testimonial.pages.length > 0
  ));

/**
 * The image-card gallery uses the complete cleaned archive selected by the
 * content owner. This retains only real patient messages and continuations;
 * covers, duplicates, staff recognition and unresolved review items were
 * already excluded while generating the normalised assets.
 */
export const getCleanedPatientTestimonials = (): PatientFeedbackTestimonial[] =>
  patientFeedbackCandidateTestimonials.filter((testimonial) => (
    testimonial.type === 'patient' &&
    testimonial.publicCandidate &&
    testimonial.pages.length > 0
  ));

export const patientFeedbackPublicCategories = Array.from(
  new Set(getPublicPatientTestimonials().map((testimonial) => testimonial.category))
);

export const patientFeedbackCategories = patientFeedbackPublicCategories;
