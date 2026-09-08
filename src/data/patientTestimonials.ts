export interface PatientTestimonial {
  id: string;
  quote: string;
  context: string;
  sourceLabel: string;
  tone: 'surgery' | 'consultation' | 'nhs-care' | 'private-care';
}

export const patientTestimonials: PatientTestimonial[] = [
  {
    id: 'legacy-engineer-feedback',
    quote:
      'It was a privilege to give feedback. The treatment was thoughtful, skilled and followed by careful recovery support.',
    context: 'Surgical care feedback',
    sourceLabel: 'Legacy website review',
    tone: 'surgery',
  },
  {
    id: 'legacy-endoscopy-feedback',
    quote:
      'A calm, empathetic approach made the procedure easier, with clear communication before and after treatment.',
    context: 'Endoscopy feedback',
    sourceLabel: 'Legacy website review',
    tone: 'consultation',
  },
  {
    id: 'legacy-cholecystectomy-feedback',
    quote:
      'Highly skilled, knowledgeable and reassuring throughout laparoscopic gallbladder surgery.',
    context: 'Gallbladder surgery feedback',
    sourceLabel: 'Legacy website review',
    tone: 'surgery',
  },
  {
    id: 'legacy-warm-surgeon-feedback',
    quote:
      'Excellent, warm, knowledgeable and approachable care. The experience left a strong recommendation.',
    context: 'Patient review',
    sourceLabel: 'Legacy website review',
    tone: 'consultation',
  },
  {
    id: 'legacy-thorough-operation-feedback',
    quote:
      'Professional and thorough from the beginning of the operation journey through to the end.',
    context: 'Operation feedback',
    sourceLabel: 'IWantGreatCare via legacy website',
    tone: 'surgery',
  },
  {
    id: 'legacy-explained-surgery-feedback',
    quote:
      'The condition and surgery were explained with care, patience and enough time for questions.',
    context: 'Surgery planning feedback',
    sourceLabel: 'IWantGreatCare via legacy website',
    tone: 'consultation',
  },
  {
    id: 'local-nhs-2024-feedback',
    quote:
      'The care was empathetic and detailed, with treatment plans explained clearly to the patient and family.',
    context: 'NHS patient feedback',
    sourceLabel: 'Practice feedback file',
    tone: 'nhs-care',
  },
  {
    id: 'local-symptom-free-feedback',
    quote:
      'Follow-up care and medication planning helped the patient feel reassured after a difficult admission.',
    context: 'NHS follow-up feedback',
    sourceLabel: 'Practice feedback file',
    tone: 'nhs-care',
  },
  {
    id: 'local-ealing-team-feedback',
    quote:
      'The general surgery team were thanked for prompt action, treatment and attentive hospital care.',
    context: 'Hospital team feedback',
    sourceLabel: 'Practice feedback file',
    tone: 'nhs-care',
  },
  {
    id: 'local-gallbladder-letter-feedback',
    quote:
      'Gallbladder treatment was described with gratitude for professionalism, kindness and patience.',
    context: 'Private patient letter',
    sourceLabel: 'Practice feedback file',
    tone: 'private-care',
  },
  {
    id: 'local-card-caring-feedback',
    quote:
      'Handwritten card feedback repeatedly thanks the team for caring support during treatment and recovery.',
    context: 'Thank-you card feedback',
    sourceLabel: 'Practice feedback file',
    tone: 'private-care',
  },
  {
    id: 'local-card-reassurance-feedback',
    quote:
      'Several cards emphasise reassurance, kindness and clear explanations at moments when patients felt anxious.',
    context: 'Thank-you card feedback',
    sourceLabel: 'Practice feedback file',
    tone: 'consultation',
  },
];

export const featuredPatientTestimonials = patientTestimonials.slice(0, 3);
