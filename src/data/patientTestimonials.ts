export interface PatientTestimonial {
  id: string;
  quote: string;
  context: string;
  sourceLabel: string;
  tone: 'surgery' | 'consultation' | 'nhs-care' | 'private-care';
}

export const patientTestimonials: PatientTestimonial[] = [
  {
    id: 'patient-hernia-gratitude-feedback',
    quote:
      'My wife and I are immensely grateful for your treatment of my hernia. We cannot thank you enough for the kindness and thoughtfulness you showed us.',
    context: 'Hernia treatment feedback',
    sourceLabel: 'Practice feedback card',
    tone: 'private-care',
  },
  {
    id: 'patient-gallbladder-gratitude-feedback',
    quote:
      'This is to express my gratitude and appreciation for looking after me and treating my gallbladder which was causing me much pain and anxiety.',
    context: 'Gallbladder surgery feedback',
    sourceLabel: 'Practice feedback letter',
    tone: 'surgery',
  },
  {
    id: 'patient-professional-surgery-feedback',
    quote:
      'The surgery you performed successfully was done to the highest degree of professionalism.',
    context: 'Surgery feedback',
    sourceLabel: 'Practice feedback letter',
    tone: 'surgery',
  },
  {
    id: 'patient-reassuring-qualities-feedback',
    quote:
      'The most important qualities you enjoy are kindness, patience and pleasantness. These qualities reassure the patient.',
    context: 'Patient letter',
    sourceLabel: 'Practice feedback letter',
    tone: 'private-care',
  },
  {
    id: 'patient-nhs-professionalism-feedback',
    quote:
      'Mr Sheth and his team are a great asset to the hospital and NHS. He carries himself with great professionalism, empathy and also takes time with every patient.',
    context: 'NHS care feedback',
    sourceLabel: 'Practice feedback file',
    tone: 'nhs-care',
  },
  {
    id: 'patient-family-communication-feedback',
    quote:
      'He ensured that all the relevant tests and scans were done with feedback to me and my family always.',
    context: 'NHS follow-up feedback',
    sourceLabel: 'Practice feedback file',
    tone: 'consultation',
  },
  {
    id: 'patient-surgery-aftercare-feedback',
    quote:
      'My sincere thanks for you and your team to look after me during my surgery and thereafter.',
    context: 'Surgery aftercare feedback',
    sourceLabel: 'Practice feedback card',
    tone: 'surgery',
  },
  {
    id: 'patient-family-explanation-feedback',
    quote:
      "Thank you so much for all you have done for my dad. You've been very open to explaining your decisions as well as the whole operation and how it went.",
    context: 'Family feedback',
    sourceLabel: 'Practice feedback card',
    tone: 'consultation',
  },
  {
    id: 'patient-london-consultation-feedback',
    quote:
      'Thanks so much for taking the time to see me, get my tests done and prioritising things for my short time in London.',
    context: 'Consultation feedback',
    sourceLabel: 'Practice feedback card',
    tone: 'consultation',
  },
  {
    id: 'patient-superb-care-feedback',
    quote:
      'Please accept this small thank you for the superb care you and your teams have given me during the past year.',
    context: 'Hospital care feedback',
    sourceLabel: 'Practice feedback file',
    tone: 'nhs-care',
  },
  {
    id: 'patient-team-kindness-feedback',
    quote:
      'The team has been approachable, efficient, kind and always helpful.',
    context: 'Team feedback',
    sourceLabel: 'Practice feedback file',
    tone: 'nhs-care',
  },
  {
    id: 'patient-wonderful-work-feedback',
    quote:
      'I wanted to thank you and all your team for your wonderful work and for saving my life.',
    context: 'Patient thank-you card',
    sourceLabel: 'Practice feedback card',
    tone: 'private-care',
  },
];

export const featuredPatientTestimonials: PatientTestimonial[] = [
  patientTestimonials[0],
  patientTestimonials[6],
  patientTestimonials[1],
  patientTestimonials[9],
  patientTestimonials[2],
  patientTestimonials[7],
  patientTestimonials[3],
  patientTestimonials[10],
  patientTestimonials[4],
  patientTestimonials[8],
  patientTestimonials[5],
  patientTestimonials[11],
];
