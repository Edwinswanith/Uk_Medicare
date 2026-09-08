export interface ProfileMedia {
  src: string;
  alt: string;
  label: string;
}

export interface ProfileBlock {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  image?: ProfileMedia;
  logos?: ProfileMedia[];
}

export interface ProfileSection {
  title: string;
  blocks: ProfileBlock[];
}

export interface ProfileLocation {
  name: string;
  address: string[];
  phone: string;
  phoneHref: string;
  directionsHref: string;
}

export const legacyProfileIntro = {
  name: 'Prof. Hemant Sheth',
  title: 'UGI & Hepatobiliary Laparoscopic & Robotic Surgeon',
  subtitle: 'Specialist in Upper GI & HPB Surgery',
  portrait: {
    src: '/legacy-profile-prof-hemant-sheth.png',
    alt: 'Prof. Hemant Sheth profile portrait',
    label: 'Profile portrait',
  },
  summary: [
    'Consultant laparoscopic UGI and hepatobiliary surgeon covering conditions of the oesophagus, stomach, liver, gallbladder and pancreas.',
    'Clinical interests include anti-reflux surgery, diaphragmatic hernia surgery, laparoscopic cholecystectomy with bile duct exploration, diagnostic UGI endoscopy and laparoscopic hernia repair.',
    "Trained in Mumbai and the UK, including hepatobiliary surgery and liver transplantation at the Royal Free Hospital Liver Unit, postgraduate research at University College London, and further laparoscopic HPB training at Addenbrooke's Hospital.",
  ],
};

export const legacyProfileLocations: ProfileLocation[] = [
  {
    name: 'Spire Bushey Hospital & Diagnostic Centre',
    address: ['Spire Bushey Hospital', 'Heathbourne Road', 'Bushey Hertfordshire WD23 1RD'],
    phone: '020 8950 9090',
    phoneHref: 'tel:+442089509090',
    directionsHref: 'https://goo.gl/maps/YnoXPTZGGHtYt79r9',
  },
  {
    name: 'The Clementine Churchill Hospital & Clinics',
    address: ['Harrow HA1 3RX'],
    phone: '020 8872 3872',
    phoneHref: 'tel:+442088723872',
    directionsHref: 'https://goo.gl/maps/LBdu34KihpYHGrJfA',
  },
  {
    name: 'The Wellington Hospital Elstree Waterfront',
    address: ['The Waterfront Business Park', 'Beaufort House, Elstree Road', 'Elstree WD6 3BS'],
    phone: '020 3993 9942',
    phoneHref: 'tel:+442039939942',
    directionsHref: 'https://goo.gl/maps/dP31CTpfn2YQNJzF9',
  },
];

export const legacyProfileLogoStrip: ProfileMedia[] = [
  {
    src: '/legacy-clementine-churchill-hospital.jpg',
    alt: 'The Clementine Churchill Hospital logo',
    label: 'The Clementine Churchill Hospital',
  },
  {
    src: '/legacy-nhs-royal-free-london.jpg',
    alt: 'Royal Free London NHS Foundation Trust logo',
    label: 'Royal Free London',
  },
  {
    src: '/legacy-ucl.jpg',
    alt: 'University College London logo',
    label: 'UCL',
  },
  {
    src: '/legacy-nhs-london-north-west.jpg',
    alt: 'London North West Healthcare NHS Trust logo',
    label: 'London North West Healthcare NHS Trust',
  },
  {
    src: '/legacy-royal-college-of-surgeons.jpg',
    alt: 'Royal College of Surgeons of England logo',
    label: 'Royal College of Surgeons of England',
  },
  {
    src: '/legacy-asgbi.jpg',
    alt: 'Association of Surgeons of Great Britain and Ireland logo',
    label: 'ASGBI',
  },
];

export const legacyProfileSections: ProfileSection[] = [
  {
    title: 'Clinical Interests',
    blocks: [
      {
        bullets: [
          'General Surgery',
          'Upper GI',
          'Laparoscopic Surgery',
          'Hernia Surgery',
          'Hepatobiliary',
          'Gallbladder',
          'Anti-reflux Surgery',
          'OGD',
          'Liver Cyst Surgery',
        ],
      },
    ],
  },
  {
    title: 'Qualification and Professional Memberships',
    blocks: [
      {
        heading: 'Qualifications',
        bullets: [
          'Clinical Professor, 2023',
          'FRCS (RCS Eng), RCS England, 2009',
          'MD (Research), University College London, 2010',
          'FRCS (RCS Glasgow), RCS Glasgow, 1996',
          'MS (General Surgery), TNMC Mumbai India, 1994',
          'MBBS, TNMC Mumbai India, 1990',
        ],
        image: {
          src: '/legacy-cfa-certificate-2023-h-sheth.jpg',
          alt: 'Clinical Professor appointment certificate for Dr. Hemant Sheth',
          label: 'Clinical Professor appointment certificate',
        },
      },
      {
        heading: 'Certificate details',
        paragraphs: [
          'American University of the Caribbean School of Medicine certificate appointing Dr. Hemant Sheth to the faculty rank of Clinical Professor.',
          'Appointment effective: November 1, 2023 to November 30, 2028.',
        ],
      },
      {
        heading: 'Professional memberships',
        bullets: [
          'Association of Surgeons of Great Britain & Ireland',
          'Royal College of Surgeons of England',
          'British Medical Association',
        ],
        logos: [
          {
            src: '/legacy-asgbi.jpg',
            alt: 'Association of Surgeons of Great Britain and Ireland logo',
            label: 'ASGBI',
          },
          {
            src: '/legacy-royal-college-of-surgeons.jpg',
            alt: 'Royal College of Surgeons of England logo',
            label: 'RCS England',
          },
        ],
      },
    ],
  },
  {
    title: 'GMC registration',
    blocks: [
      {
        bullets: ['Reference number 4567912'],
      },
    ],
  },
  {
    title: 'Professional bodies (positions held - last 3 yrs)',
    blocks: [
      {
        bullets: [
          'Surgical Tutor, RCS England, 2012',
          'Member of AUGIS, 2018',
          'Faculty for the Intermediate Laparoscopic Skills Course for RCS England',
        ],
      },
    ],
  },
  {
    title: 'Affiliations / memberships',
    blocks: [
      {
        bullets: ['AUGIS', 'RCS England', 'EAHPBA', 'IHPBA'],
      },
    ],
  },
  {
    title: 'Research and Publications',
    blocks: [
      {
        heading: 'Research themes',
        paragraphs: [
          'Research work includes splenectomy for haematological disorders, therapeutic modulation of liver ischaemia reperfusion injury, and consultant-delivered emergency general surgery service models.',
        ],
      },
      {
        heading: 'Selected peer-reviewed publications',
        bullets: [
          'After-hours CT scans of the abdomen and pelvis for abdominal pain, Scientific World Journal, 2017',
          'Non-haemorrhagic bilateral adrenal infarction with antiphospholipid syndrome and lupus myocarditis, BMJ Case Reports, 2016',
          'Primary gallbladder lymphoma detected incidentally by CT colonography, Case Reports in Surgery, 2015',
          'Unemployment, public-sector healthcare spending and stomach cancer mortality in the European Union, 2014',
          'Spontaneous intraperitoneal rupture of a hepatic hydatid cyst with anaphylaxis, Case Reports in Hepatology, 2013',
          'Methods of vascular occlusion for elective liver resections, Cochrane Database of Systematic Reviews, 2009',
          'Glycine reduces liver warm ischaemia reperfusion injury, 2010',
          'N-acetylcysteine and late-phase liver ischaemia/reperfusion injury, Clinical Science, 2005',
        ],
      },
    ],
  },
  {
    title: 'Current NHS posts held',
    blocks: [
      {
        bullets: [
          'Consultant UGI, laparoscopic and HPB surgeon',
          'Ealing and London Northwest NHS Trust',
          'Uxbridge Road, Southall, Middlesex, UB1 3HW',
        ],
      },
    ],
  },
  {
    title: 'Research interests',
    blocks: [
      {
        bullets: ['Ischaemia reperfusion injury of the liver'],
      },
    ],
  },
  {
    title: 'Personal interests',
    blocks: [
      {
        bullets: ['Walking', 'Trekking', 'Meditation'],
      },
    ],
  },
  {
    title: 'Awards received',
    blocks: [
      {
        bullets: ['Clinical excellence awards for the trust'],
      },
    ],
  },
  {
    title: '(Additional) Languages spoken',
    blocks: [
      {
        bullets: [
          'Gujarati - Native or bilingual',
          'Hindi - Fluent',
          'Marathi - Fluent',
          'Konkani - Conversational',
        ],
      },
    ],
  },
  {
    title: 'Courses offered to GPs',
    blocks: [
      {
        bullets: ['GI Masterclass'],
      },
    ],
  },
];
