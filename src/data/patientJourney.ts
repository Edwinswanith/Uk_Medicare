export interface PatientJourneyStep {
  title: string;
  description: string;
}

export const patientJourneySteps: PatientJourneyStep[] = [
  {
    title: 'Appointment request',
    description: 'Send an online request or contact the practice.',
  },
  {
    title: 'Practice contact',
    description: 'The practice confirms a suitable time and location.',
  },
  {
    title: 'Consultant assessment',
    description: 'Prof. Sheth reviews your symptoms, history and priorities in consultation.',
  },
  {
    title: 'Investigations',
    description: 'Further tests are arranged only when needed.',
  },
  {
    title: 'Treatment decision',
    description: 'Options, risks and alternatives are discussed with you.',
  },
  {
    title: 'Treatment or surgery',
    description: 'Preparation, treatment and recovery are explained clearly.',
  },
  {
    title: 'Follow-up',
    description: 'Recovery is reviewed and questions are answered.',
  },
];
