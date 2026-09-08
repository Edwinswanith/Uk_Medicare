export interface TreatmentIndexItem {
  name: string;
  description: string;
}

export interface TreatmentIndexGroup {
  group: string;
  treatments: TreatmentIndexItem[];
}

export const treatmentsIndexIntro =
  'Explore information about the conditions and procedures treated, including what assessment, treatment and recovery may involve.';

export const treatmentsIndex: TreatmentIndexGroup[] = [
  {
    group: 'Diagnostic and upper digestive care',
    treatments: [
      {
        name: 'Upper GI Endoscopy',
        description:
          'Upper GI endoscopy explained: why gastroscopy is done, preparation, sedation, biopsies, risks, recovery, and urgent warning signs.',
      },
    ],
  },
  {
    group: 'Reflux and upper GI surgery',
    treatments: [
      {
        name: 'Anti-Reflux Surgery',
        description:
          'Anti-reflux surgery explained: GORD symptoms, tests before fundoplication, surgical options, risks, recovery, and alternatives.',
      },
    ],
  },
  {
    group: 'Gallbladder and bile duct',
    treatments: [
      {
        name: 'Gallbladder Surgery',
        description:
          'Gallbladder removal (cholecystectomy) explained: gallstone symptoms, keyhole vs open surgery, risks, recovery, and urgent warning signs.',
      },
      {
        name: 'Bile Duct Exploration',
        description:
          'Bile duct stones explained: symptoms, ERCP vs laparoscopic bile duct exploration, risks, recovery, and urgent warning signs.',
      },
    ],
  },
  {
    group: 'Hernia and general surgery',
    treatments: [
      {
        name: 'Hernia Surgery',
        description:
          'Hernia surgery explained: symptoms, when repair is needed, open vs keyhole techniques, risks, recovery, and urgent warning signs.',
      },
      {
        name: 'Appendicectomy',
        description:
          'Appendicectomy explained: appendicitis symptoms, keyhole vs open appendix surgery, risks, recovery, alternatives, and urgent warning signs.',
      },
    ],
  },
  {
    group: 'Liver and spleen',
    treatments: [
      {
        name: 'Liver and Spleen Surgery',
        description:
          'Liver and spleen surgery overview: liver tests, liver masses, liver resection, splenectomy, risks, recovery, and urgent warning signs.',
      },
    ],
  },
];
