import generatedCards from './patientFeedbackCards.generated.json';

export interface PatientFeedbackCard {
  id: string;
  sequence: number;
  title: string;
  category: string;
  sourceKind: 'PDF page' | 'JPG' | 'DOC' | 'XLSX';
  pageLabel: string;
  image: string;
}

export const patientFeedbackCards = generatedCards as PatientFeedbackCard[];

export const patientFeedbackCategories = Array.from(
  new Set(patientFeedbackCards.map((card) => card.category))
);
