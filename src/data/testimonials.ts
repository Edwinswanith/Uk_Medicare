import { VerificationStatus } from './contentStatus';

/**
 * Testimonial data — NOT currently rendered anywhere (`TestimonialWall.tsx`
 * is not imported into `App.tsx`). Kept unwired deliberately: every entry
 * below has `status: 'pending'` because no per-testimonial, dated consent
 * record exists for any of them — see docs/testimonial-register.md.
 *
 * IMPORTANT — content-integrity fix applied: the original version of this
 * file attributed substantially longer, embellished quotes (specific
 * hospitals, procedures, recovery timelines, backstory) to three real,
 * named individuals. Names are intentionally removed until consent exists.
 * — none of which they actually said. That text has been replaced below
 * with their real, short, verbatim quotes as found on the legacy site.
 * Do not lengthen, embellish, or add specifics (hospital, procedure,
 * dates) to a real person's quote that they did not actually provide —
 * see docs/testimonial-register.md Part B for the full comparison.
 *
 * Do not wire `TestimonialWall.tsx` back into `App.tsx` until every entry
 * that will be shown has `status: 'verified'` (real quote + confirmed,
 * dated consent) — filter with `renderable()` from `./contentStatus`
 * when that time comes, rather than rendering `testimonialCards` directly.
 */
export interface TestimonialCard {
  id: string;
  status: VerificationStatus;
  type: 'patient-card' | 'colleague-letter' | 'verified-review';
  author: string;
  roleOrRelation: string;
  hospital?: string;
  procedure?: string;
  date?: string;
  title: string;
  excerpt: string;
  fullMessage: string;
  rating: number;
  highlightedQuote: string;
  cardTheme: 'parchment' | 'cream' | 'azure' | 'medical-letterhead';
}

/**
 * Review-platform aggregate counts — zero source found on the legacy
 * site or independently for any of the 4 (see
 * docs/content-verification.md §A rows 6-9). Do not render until each
 * platform has been checked directly (Doctify, IWantGreatCare,
 * Top Doctors, Google Business Profile).
 */
export const platformStats: { platform: string; rating: string; reviewsCount: string; badge: string; status: VerificationStatus }[] = [
  { platform: "Doctify UK", rating: "5.0", reviewsCount: "120+", badge: "Top Rated Specialist", status: 'pending' },
  { platform: "I Want Great Care", rating: "5.0", reviewsCount: "85+", badge: "Certificate of Excellence", status: 'pending' },
  { platform: "Top Doctors UK", rating: "5.0", reviewsCount: "50+", badge: "Verified Consultant", status: 'pending' },
  { platform: "Google Reviews", rating: "4.9", reviewsCount: "70+", badge: "Private Clinics", status: 'pending' },
];

export const testimonialCards: TestimonialCard[] = [
  // Legacy-site quotes, anonymized until dated publication consent exists.
  // Procedure/hospital/date were NOT stated by these patients on the
  // legacy site and have been removed rather than invented.
  {
    id: "card-1",
    status: 'pending',
    type: "patient-card",
    author: "Anonymous patient",
    roleOrRelation: "Private Patient",
    title: "A Privilege to Give Feedback",
    highlightedQuote: "As an engineer I can appreciate the thought and skill that he put into my treatment.",
    excerpt: "It was a privilege to be asked to give feedback to Mr Sheth. As an engineer I can appreciate the thought and skill that he put into my treatment which was entirely successful.",
    fullMessage: "It was a privilege to be asked to give feedback to Mr Sheth. As an engineer I can appreciate the thought and skill that he put into my treatment which was entirely successful.",
    rating: 5,
    cardTheme: "parchment"
  },
  {
    id: "card-2",
    status: 'pending',
    type: "patient-card",
    author: "Anonymous patient",
    roleOrRelation: "Private Patient",
    procedure: "Endoscopy",
    title: "Calm and Caring",
    highlightedQuote: "His calm demeanour put me at ease during the endoscopy procedure.",
    excerpt: "Dr Sheth is a very empathetic and caring doctor. His calm demeanour put me at ease during the endoscopy procedure, which was performed expertly.",
    fullMessage: "Dr Sheth is a very empathetic and caring doctor. His calm demeanour put me at ease during the endoscopy procedure, which was performed expertly.",
    rating: 5,
    cardTheme: "cream"
  },
  {
    id: "card-3",
    status: 'pending',
    type: "patient-card",
    author: "Anonymous patient",
    roleOrRelation: "Private Patient",
    procedure: "Laparoscopic cholecystectomy",
    title: "Highly Skilled and Knowledgeable",
    highlightedQuote: "A highly skilled and knowledgeable surgeon.",
    excerpt: "Mr Sheth is a highly skilled and knowledgeable surgeon. He operated on me for laparoscopic cholecystectomy.",
    fullMessage: "Mr Sheth is a highly skilled and knowledgeable surgeon. He operated on me for laparoscopic cholecystectomy. A surgeon with excellent bed side manner.",
    rating: 5,
    cardTheme: "azure"
  },

  // Entirely unsourced — no legacy-site or independent record of these
  // individuals or quotes at all. Left in place only as clearly-flagged
  // placeholders for genuinely new, consented testimonials to replace.
  {
    id: "card-4",
    status: 'pending',
    type: "patient-card",
    author: "Anonymous patient",
    roleOrRelation: "Private Patient",
    procedure: "Robotic Inguinal Hernia Repair",
    title: "Not yet sourced — do not publish",
    highlightedQuote: "",
    excerpt: "No source found on the legacy site or independently. Replace with a genuine, consented testimonial before use, or remove.",
    fullMessage: "No source found on the legacy site or independently. Replace with a genuine, consented testimonial before use, or remove.",
    rating: 5,
    cardTheme: "parchment"
  },
  {
    id: "card-5",
    status: 'pending',
    type: "patient-card",
    author: "Anonymous patient",
    roleOrRelation: "Self-Pay Patient",
    procedure: "Robotic Anti-Reflux Nissen Fundoplication",
    title: "Not yet sourced — do not publish",
    highlightedQuote: "",
    excerpt: "No source found on the legacy site or independently. Replace with a genuine, consented testimonial before use, or remove.",
    fullMessage: "No source found on the legacy site or independently. Replace with a genuine, consented testimonial before use, or remove.",
    rating: 5,
    cardTheme: "cream"
  },

  // Colleague letters — entirely unsourced (abbreviated names, no
  // legacy-site record). See docs/testimonial-register.md Part B.
  {
    id: "colleague-1",
    status: 'pending',
    type: "colleague-letter",
    author: "Anonymous colleague",
    roleOrRelation: "Consultant Histopathologist & Referring Physician",
    title: "Not yet sourced — do not publish",
    highlightedQuote: "",
    excerpt: "No source found on the legacy site or independently. Confirm this individual and obtain consent before use, or remove.",
    fullMessage: "No source found on the legacy site or independently. Confirm this individual and obtain consent before use, or remove.",
    rating: 5,
    cardTheme: "medical-letterhead"
  },
  {
    id: "colleague-2",
    status: 'pending',
    type: "colleague-letter",
    author: "Anonymous colleague",
    roleOrRelation: "Consultant Anaesthetist",
    title: "Not yet sourced — do not publish",
    highlightedQuote: "",
    excerpt: "No source found on the legacy site or independently. Confirm this individual and obtain consent before use, or remove.",
    fullMessage: "No source found on the legacy site or independently. Confirm this individual and obtain consent before use, or remove.",
    rating: 5,
    cardTheme: "medical-letterhead"
  },
  {
    id: "colleague-3",
    status: 'pending',
    type: "colleague-letter",
    author: "Anonymous colleague",
    roleOrRelation: "Senior General Practitioner",
    title: "Not yet sourced — do not publish",
    highlightedQuote: "",
    excerpt: "No source found on the legacy site or independently. Confirm this individual and obtain consent before use, or remove.",
    fullMessage: "No source found on the legacy site or independently. Confirm this individual and obtain consent before use, or remove.",
    rating: 5,
    cardTheme: "medical-letterhead"
  }
];
