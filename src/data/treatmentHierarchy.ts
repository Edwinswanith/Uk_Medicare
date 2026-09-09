import { VerificationStatus, renderable } from './contentStatus';

export interface TreatmentSourceMetadata {
  legacyUrl: string;
  legacyTitle: string;
  sourceStatus: VerificationStatus;
  notes: string[];
}

export interface TreatmentSection {
  title: string;
  body?: string;
  items?: string[];
}

export interface TreatmentCategory {
  id: string;
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  deck: string;
  intro: string;
  ctaLabel: string;
  image: string;
  status: VerificationStatus;
  source: TreatmentSourceMetadata;
  sections: TreatmentSection[];
  treatmentIds: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface TreatmentPage {
  id: string;
  slug: string;
  path: string;
  categoryId: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  image: string;
  summary: string;
  answerFirst: string;
  status: VerificationStatus;
  source: TreatmentSourceMetadata;
  quickGuide: {
    label: string;
    value: string;
  }[];
  sections: TreatmentSection[];
  relatedTreatmentIds: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface TreatmentBreadcrumb {
  label: string;
  path: string;
}

const legacyBase = 'https://www.keyholesurgeon.co.uk';

export const treatmentCategories: TreatmentCategory[] = [
  {
    id: 'upper-gi',
    slug: 'upper-gi',
    path: '/treatments/upper-gi',
    title: 'Upper GI',
    shortTitle: 'Upper GI',
    deck: 'Conditions affecting the oesophagus, stomach and upper digestive tract.',
    intro:
      'Upper GI care focuses on symptoms and conditions involving the oesophagus, stomach and duodenum. Assessment may include clinical review, investigations and discussion of non-surgical or procedural options.',
    ctaLabel: 'View Upper GI care',
    image: '/treatments/upper-gi-endoscopy.jpg',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/upper-gi-procedures-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Upper GI Procedures',
      sourceStatus: 'clinical-review-required',
      notes: [
        'Legacy page provides the topic structure for upper GI overview, symptoms, preparation, endoscopy and anti-reflux surgery.',
        'Public copy has been rewritten into cautious patient-facing wording.',
      ],
    },
    sections: [
      {
        title: 'What is Upper GI care?',
        body:
          'This area of practice covers the upper part of the digestive system: the oesophagus, stomach and first part of the small bowel. It may involve diagnostic endoscopy, reflux assessment and treatment planning.',
      },
      {
        title: 'When might you be referred?',
        items: [
          'Persistent heartburn or regurgitation',
          'Swallowing difficulty or upper abdominal discomfort',
          'Suspected ulcers, inflammation, bleeding or anaemia',
          'Symptoms that need specialist review before treatment is chosen',
        ],
      },
      {
        title: 'Assessment and preparation',
        body:
          'Assessment depends on symptoms and previous tests. Some patients need an endoscopy, imaging, blood tests or medication review. Preparation advice is given for any planned procedure.',
      },
      {
        title: 'Your consultation',
        body:
          'The consultation is used to review symptoms, investigations and treatment goals, then decide whether observation, medication, endoscopy or surgery is appropriate.',
      },
    ],
    treatmentIds: ['upper-gi-endoscopy', 'anti-reflux-surgery',
    ],
    seoTitle: 'Upper GI Treatments | Prof. Hemant Sheth',
    seoDescription:
      'Upper GI care with Prof. Hemant Sheth, including upper GI endoscopy and anti-reflux surgery for selected oesophageal, stomach and reflux symptoms.',
  },
  {
    id: 'hpb',
    slug: 'hpb',
    path: '/treatments/hpb',
    title: 'HPB Disorders',
    shortTitle: 'HPB',
    deck: 'Liver, gallbladder, bile duct and spleen conditions.',
    intro:
      'HPB care covers hepatobiliary and pancreatic-region conditions, including selected gallbladder, bile duct, liver and spleen problems where keyhole surgery may be suitable.',
    ctaLabel: 'Explore HPB treatments',
    image: '/treatments/gallbladder-gallstones.jpg',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/treatments-for-hpb-disorders-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Treatments for HPB Disorders',
      sourceStatus: 'clinical-review-required',
      notes: [
        'Legacy service group lists bile duct exploration, benign liver disease surgery, splenectomy and cholecystectomy.',
        'Liver content carries a flagged legacy wording issue and must not be copied verbatim.',
      ],
    },
    sections: [
      {
        title: 'What HPB care covers',
        body:
          'HPB care relates to the liver, gallbladder, bile ducts and spleen. Treatment choice depends on diagnosis, imaging, blood tests and overall health.',
      },
      {
        title: 'Common assessment themes',
        items: [
          'Gallstones or gallbladder inflammation',
          'Bile duct stones or abnormal liver blood tests',
          'Selected benign liver lesions or cysts',
          'Spleen conditions requiring specialist surgical assessment',
        ],
      },
      {
        title: 'Planning treatment',
        body:
          'Some problems are managed with monitoring or endoscopic treatment, while others may need keyhole surgery. The safest route is confirmed after review of investigations.',
      },
    ],
    treatmentIds: [
      'bile-duct-exploration',
      'benign-liver-disease-surgery',
      'splenectomy',
      'gallbladder-surgery',
    ],
    seoTitle: 'HPB Treatments | Gallbladder, Bile Duct, Liver and Spleen Surgery',
    seoDescription:
      'HPB treatment information for gallbladder surgery, bile duct exploration, benign liver disease surgery and splenectomy with Prof. Hemant Sheth.',
  },
  {
    id: 'hernia',
    slug: 'hernia',
    path: '/treatments/hernia',
    title: 'Hernia Surgery',
    shortTitle: 'Hernia',
    deck: 'Treatment for abdominal-wall and diaphragmatic hernias.',
    intro:
      'Hernia surgery considers the site, size, symptoms and risk profile of a hernia before deciding whether observation, open repair, laparoscopic repair or specialist reconstruction is most appropriate.',
    ctaLabel: 'View hernia treatments',
    image: '/treatments/hernia-repair.jpg',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/hernia-surgery-procedures-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Hernia Surgery Procedures',
      sourceStatus: 'clinical-review-required',
      notes: [
        'Legacy group lists laparoscopic hernia surgery, diaphragmatic hernia repair and complex incisional hernia surgery.',
        'Incisional hernia content has a separate repair page and a condition page; both map to one modern clinical-intent route.',
      ],
    },
    sections: [
      {
        title: 'What hernia care covers',
        body:
          'A hernia occurs when tissue pushes through a weakness in the abdominal wall or diaphragm. Symptoms, hernia type and previous surgery influence the treatment plan.',
      },
      {
        title: 'When repair may be discussed',
        items: [
          'A visible or enlarging bulge',
          'Pain, dragging discomfort or activity limitation',
          'Previous surgical wound weakness',
          'Symptoms or imaging suggesting a higher-risk hernia',
        ],
      },
      {
        title: 'Choosing an approach',
        body:
          'Laparoscopic, open and complex repairs have different advantages. The approach is selected after examination and, where needed, ultrasound or CT imaging.',
      },
    ],
    treatmentIds: [
      'laparoscopic-hernia-surgery',
      'diaphragmatic-hernia',
      'complex-incisional-hernia',
    ],
    seoTitle: 'Hernia Surgery | Laparoscopic and Complex Hernia Treatments',
    seoDescription:
      'Hernia surgery information covering laparoscopic hernia repair, diaphragmatic hernia repair and complex incisional hernia treatment.',
  },
  {
    id: 'appendicectomy',
    slug: 'appendicectomy',
    path: '/treatments/appendicectomy',
    title: 'Appendicectomy',
    shortTitle: 'Appendicectomy',
    deck: 'Assessment and surgical treatment of appendicitis.',
    intro:
      'Appendicectomy is removal of the appendix, most commonly for appendicitis. It may be performed urgently when inflammation or infection is suspected.',
    ctaLabel: 'View appendicectomy',
    image: '/treatments/appendix-laparoscopic-surgery.jpg',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/appendicectomy-procedure-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Appendicectomy Procedure',
      sourceStatus: 'clinical-review-required',
      notes: [
        'Legacy services and audit also identify /appendectomy-general-laparoscopic-surgeon-hertfordshire-harrow-london/ as the individual appendix treatment source.',
      ],
    },
    sections: [
      {
        title: 'What appendicectomy means',
        body:
          'The appendix is removed when appendicitis or another appendix problem requires surgery. A keyhole approach may be used when clinically suitable.',
      },
      {
        title: 'When urgent assessment matters',
        items: [
          'Right lower abdominal pain with fever or nausea',
          'Suspected appendix inflammation or infection',
          'Concern for rupture, abscess or peritonitis',
        ],
      },
      {
        title: 'Planning care',
        body:
          'Emergency presentations are assessed quickly with examination and investigations. The surgical approach depends on clinical findings and patient fitness.',
      },
    ],
    treatmentIds: ['laparoscopic-appendicectomy'],
    seoTitle: 'Appendicectomy | Laparoscopic Appendix Surgery',
    seoDescription:
      'Patient information about appendicectomy and laparoscopic appendix surgery for appendicitis, including assessment, surgery and recovery themes.',
  },
];

export const treatmentPages: TreatmentPage[] = [
  {
    id: 'upper-gi-endoscopy',
    slug: 'endoscopy',
    path: '/treatments/upper-gi/endoscopy',
    categoryId: 'upper-gi',
    title: 'Upper GI Endoscopy',
    shortTitle: 'Upper GI Endoscopy',
    subtitle: 'Camera examination of the oesophagus, stomach and duodenum.',
    image: '/treatments/upper-gi-endoscopy.jpg',
    summary:
      'Upper GI endoscopy is a diagnostic procedure used to look inside the upper digestive tract and investigate symptoms such as reflux, swallowing difficulty, bleeding, anaemia or persistent upper abdominal discomfort.',
    answerFirst:
      'Upper GI endoscopy, also called gastroscopy or OGD, uses a slim flexible camera to examine the oesophagus, stomach and duodenum. It can help identify inflammation, ulcers, bleeding, narrowing and other causes of upper digestive symptoms.',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/upper-gi-endoscopy-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Upper GI Endoscopy',
      sourceStatus: 'clinical-review-required',
      notes: [
        'Legacy topics retained: indications, repeat endoscopy, benefits, preparation, procedure, therapeutic endoscopy, recovery and complications.',
        'Specific time thresholds and comparative claims have been omitted pending clinical review.',
      ],
    },
    quickGuide: [
      { label: 'Purpose', value: 'Investigate upper digestive symptoms and obtain biopsies when needed.' },
      { label: 'Typical setting', value: 'Usually an outpatient endoscopy unit.' },
      { label: 'Sedation', value: 'Throat spray and/or sedation may be discussed.' },
      { label: 'Recovery', value: 'Short observation is typical; discharge advice depends on sedation and findings.' },
    ],
    sections: [
      {
        title: 'Why might it be recommended?',
        items: [
          'Swallowing difficulty or pain on swallowing',
          'Vomiting blood, black stools or unexplained iron-deficiency anaemia',
          'Persistent heartburn, indigestion or ulcer-like pain',
          'Need for biopsy, surveillance or follow-up of selected findings',
        ],
      },
      {
        title: 'How you are assessed',
        body:
          'Your symptoms, medical history, medications and previous tests are reviewed. The clinician decides whether endoscopy is the right next investigation or whether another test is more suitable.',
      },
      {
        title: 'Preparing for the procedure',
        body:
          'Preparation usually includes fasting instructions and medication advice. If sedation is planned, transport and aftercare arrangements are discussed before the appointment.',
      },
      {
        title: 'What happens during the procedure?',
        body:
          'The endoscope is passed through the mouth while the upper digestive tract is examined. Biopsies or therapeutic steps such as dilatation or treatment of bleeding may be performed only when clinically needed.',
      },
      {
        title: 'Potential benefits',
        items: [
          'Direct visual assessment of the upper digestive tract',
          'Biopsy or treatment during the same procedure where appropriate',
          'Clearer planning for reflux, ulcer, bleeding or swallowing symptoms',
        ],
      },
      {
        title: 'Risks and possible complications',
        items: [
          'Temporary sore throat or bloating',
          'Bleeding after biopsy or therapeutic treatment',
          'Rare perforation or sedation-related complication',
        ],
      },
      {
        title: 'Recovery and aftercare',
        body:
          'You receive discharge advice after observation. Biopsy results, if taken, are reported separately. Instructions after sedation should be followed carefully.',
      },
      {
        title: 'When to seek medical advice',
        body:
          'Seek urgent advice if you develop severe pain, persistent vomiting, chest symptoms, fever or bleeding after the procedure.',
      },
      {
        title: 'Alternatives',
        body:
          'Depending on the question being investigated, alternatives may include medication review, imaging, barium studies or specialist referral.',
      },
    ],
    relatedTreatmentIds: ['anti-reflux-surgery'],
    seoTitle: 'Upper GI Endoscopy | Gastroscopy with Prof. Hemant Sheth',
    seoDescription:
      'Patient guide to upper GI endoscopy, including why gastroscopy may be recommended, preparation, procedure steps, risks and aftercare.',
  },
  {
    id: 'anti-reflux-surgery',
    slug: 'anti-reflux-surgery',
    path: '/treatments/upper-gi/anti-reflux-surgery',
    categoryId: 'upper-gi',
    title: 'Anti-Reflux Surgery',
    shortTitle: 'Anti-Reflux Surgery',
    subtitle: 'Laparoscopic fundoplication and reflux-related hiatus hernia repair.',
    image: '/treatments/reflux-hiatus-hernia.jpg',
    summary:
      'Anti-reflux surgery may be considered for selected patients with persistent reflux symptoms, GORD or reflux-related hiatus hernia after specialist assessment.',
    answerFirst:
      'Anti-reflux surgery aims to reduce gastro-oesophageal reflux by improving the barrier between the stomach and oesophagus. In selected patients, laparoscopic fundoplication and hiatus hernia repair may be discussed after symptoms, tests and treatment history are reviewed.',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/anti-reflux-surgery-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Anti-Reflux Surgery',
      sourceStatus: 'clinical-review-required',
      notes: [
        'Legacy topics retained: GERD context, lower oesophageal sphincter, indications, fundoplication, procedure, after surgery and risks.',
        'Unsupported outcome-rate claims were omitted.',
      ],
    },
    quickGuide: [
      { label: 'Purpose', value: 'Reduce reflux symptoms in carefully selected patients.' },
      { label: 'Typical setting', value: 'Planned hospital surgery after specialist assessment.' },
      { label: 'Anaesthesia', value: 'Performed under general anaesthesia.' },
      { label: 'Recovery', value: 'Diet and activity guidance are tailored to the repair and recovery.' },
    ],
    sections: [
      {
        title: 'Why might it be recommended?',
        items: [
          'Persistent heartburn or regurgitation despite non-surgical treatment',
          'Hiatus hernia contributing to reflux symptoms',
          'Chronic oesophagitis or reflux complications',
          'Symptoms and investigations suggesting surgery may be suitable',
        ],
      },
      {
        title: 'How you are assessed',
        body:
          'Assessment may include symptom review, medication history, previous endoscopy findings and further reflux or imaging tests when needed.',
      },
      {
        title: 'Preparing for surgery',
        body:
          'Pre-operative preparation includes anaesthetic assessment, medication review and procedure-specific diet and fasting instructions.',
      },
      {
        title: 'What happens during the procedure?',
        body:
          'Laparoscopic fundoplication uses small incisions and a camera. The hiatus may be repaired, and the top of the stomach is wrapped around the lower oesophagus to strengthen the anti-reflux barrier.',
      },
      {
        title: 'Potential benefits',
        items: [
          'Reduced reflux or regurgitation in selected patients',
          'Repair of a reflux-related hiatus hernia when present',
          'Less reliance on long-term symptom medication for some patients',
        ],
      },
      {
        title: 'Risks and possible complications',
        items: [
          'Bloating or increased wind',
          'Difficulty swallowing during recovery or longer term',
          'Wrap loosening or recurrence of reflux symptoms',
        ],
      },
      {
        title: 'Recovery and aftercare',
        body:
          'Recovery advice commonly includes staged diet progression, wound care, pain control and temporary activity limits. Exact timing should be confirmed by the treating team.',
      },
      {
        title: 'When to seek medical advice',
        body:
          'Seek advice urgently for worsening pain, inability to swallow fluids, persistent vomiting, fever, wound concerns or breathing symptoms.',
      },
      {
        title: 'Alternatives',
        body:
          'Alternatives may include lifestyle measures, medicines, ongoing monitoring or additional testing before surgery is considered.',
      },
    ],
    relatedTreatmentIds: ['upper-gi-endoscopy'],
    seoTitle: 'Anti-Reflux Surgery | Laparoscopic Fundoplication',
    seoDescription:
      'Patient guide to anti-reflux surgery and laparoscopic fundoplication, including indications, assessment, procedure, recovery and risks.',
  },
  {
    id: 'bile-duct-exploration',
    slug: 'bile-duct-exploration',
    path: '/treatments/hpb/bile-duct-exploration',
    categoryId: 'hpb',
    title: 'Laparoscopic Bile Duct Exploration',
    shortTitle: 'Bile Duct Exploration',
    subtitle: 'Keyhole removal of stones from the common bile duct.',
    image: '/treatments/gallbladder-gallstones.jpg',
    summary:
      'Bile duct exploration may be used when stones block the common bile duct and need removal during specialist gallstone care.',
    answerFirst:
      'Laparoscopic bile duct exploration is a keyhole procedure used to find and remove stones from the common bile duct. It may be considered when bile duct stones are identified before or during gallbladder treatment.',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/laparoscopic-common-bile-duct-exploration-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Laparoscopic Common Bile Duct Exploration',
      sourceStatus: 'clinical-review-required',
      notes: ['Legacy content is thin; recovery and follow-up wording has been kept general.'],
    },
    quickGuide: [
      { label: 'Purpose', value: 'Remove selected common bile duct stones.' },
      { label: 'Typical setting', value: 'Hospital surgery as part of gallstone care.' },
      { label: 'Anaesthesia', value: 'General anaesthesia.' },
      { label: 'Recovery', value: 'Depends on the complexity of the duct problem and surgery.' },
    ],
    sections: [
      { title: 'Why might it be recommended?', items: ['Common bile duct stones', 'Jaundice or abnormal liver tests from blockage', 'Stones found during gallbladder assessment'] },
      { title: 'How you are assessed', body: 'Assessment may include blood tests, ultrasound, MRCP, CT or intra-operative imaging depending on presentation.' },
      { title: 'Preparing for surgery', body: 'Preparation is individualised and may include fasting, medication review and planning for possible gallbladder surgery.' },
      { title: 'What happens during the procedure?', body: 'A laparoscope and fine instruments are used through small incisions. Dye X-ray imaging may help confirm stone position before removal.' },
      { title: 'Potential benefits', items: ['Relief of bile duct obstruction', 'Treatment of stones through a keyhole approach where suitable', 'May avoid a separate procedure in selected cases'] },
      { title: 'Risks and possible complications', items: ['Bleeding or infection', 'Bile leak', 'Swelling, narrowing or further treatment need'] },
      { title: 'Recovery and aftercare', body: 'Aftercare includes monitoring symptoms, wounds and liver blood tests where required.' },
      { title: 'When to seek medical advice', body: 'Seek urgent advice for fever, worsening pain, jaundice, vomiting, wound concerns or feeling acutely unwell.' },
      { title: 'Alternatives', body: 'Alternatives may include ERCP, observation or staged gallbladder and bile duct treatment depending on the case.' },
    ],
    relatedTreatmentIds: ['gallbladder-surgery'],
    seoTitle: 'Laparoscopic Bile Duct Exploration | HPB Treatment',
    seoDescription:
      'Patient guide to laparoscopic bile duct exploration for common bile duct stones, including assessment, procedure, risks and aftercare.',
  },
  {
    id: 'benign-liver-disease-surgery',
    slug: 'benign-liver-disease-surgery',
    path: '/treatments/hpb/benign-liver-disease-surgery',
    categoryId: 'hpb',
    title: 'Laparoscopic Benign Liver Disease Surgery',
    shortTitle: 'Benign Liver Disease Surgery',
    subtitle: 'Minimally invasive assessment and surgery for selected liver conditions.',
    image: '/treatments/liver-hpb-surgery.jpg',
    summary:
      'Selected benign liver lesions, cysts or masses may require specialist surgical assessment and carefully planned laparoscopic treatment.',
    answerFirst:
      'Laparoscopic benign liver disease surgery uses keyhole techniques for selected liver conditions where surgery is appropriate. Suitability depends on imaging, diagnosis, liver anatomy, blood tests and overall fitness for surgery.',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/laparoscopic-liver-resection-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Laparoscopic Liver Resection',
      sourceStatus: 'clinical-review-required',
      notes: [
        'Legacy liver page has a flagged ambiguous transplantation sentence; it has not been reused.',
        'Public copy avoids cancer-treatment pathways and specific recovery claims pending review.',
      ],
    },
    quickGuide: [
      { label: 'Purpose', value: 'Assess and treat selected benign liver lesions or cysts.' },
      { label: 'Typical setting', value: 'Planned hospital surgery after imaging review.' },
      { label: 'Anaesthesia', value: 'General anaesthesia.' },
      { label: 'Recovery', value: 'Depends on the extent and site of liver treatment.' },
    ],
    sections: [
      { title: 'Why might it be recommended?', items: ['Selected benign liver lesions or cysts', 'Symptoms or uncertainty requiring specialist review', 'Liver findings needing planned surgical treatment'] },
      { title: 'How you are assessed', body: 'Assessment usually includes imaging, blood tests, medical history and discussion within an appropriate specialist pathway.' },
      { title: 'Preparing for surgery', body: 'Preparation may include anaesthetic review, medication adjustment, fasting advice and planning around liver function.' },
      { title: 'What happens during the procedure?', body: 'Small incisions allow a camera and instruments to treat or remove the selected liver area where keyhole surgery is suitable.' },
      { title: 'Potential benefits', items: ['Targeted treatment of the selected liver problem', 'Smaller incisions than open surgery where suitable', 'Specialist planning based on imaging and diagnosis'] },
      { title: 'Risks and possible complications', items: ['Bleeding or blood clots', 'Infection', 'Bile leak or need for further treatment'] },
      { title: 'Recovery and aftercare', body: 'Recovery includes pain control, wound care, early mobilisation and follow-up tailored to the liver procedure performed.' },
      { title: 'When to seek medical advice', body: 'Seek urgent advice for fever, worsening pain, jaundice, vomiting, wound problems or sudden deterioration.' },
      { title: 'Alternatives', body: 'Alternatives may include observation, repeat imaging, non-surgical treatment or open surgery depending on diagnosis.' },
    ],
    relatedTreatmentIds: ['splenectomy', 'gallbladder-surgery'],
    seoTitle: 'Laparoscopic Benign Liver Disease Surgery | Prof. Hemant Sheth',
    seoDescription:
      'Patient information about laparoscopic surgery for selected benign liver disease, including assessment, planning, risks and recovery themes.',
  },
  {
    id: 'splenectomy',
    slug: 'splenectomy',
    path: '/treatments/hpb/splenectomy',
    categoryId: 'hpb',
    title: 'Laparoscopic Splenectomy',
    shortTitle: 'Splenectomy',
    subtitle: 'Keyhole removal of the spleen when clinically indicated.',
    image: '/treatments/liver-hpb-surgery.jpg',
    summary:
      'Splenectomy is removal of the spleen. It may be considered for selected spleen conditions after specialist review.',
    answerFirst:
      'Laparoscopic splenectomy removes the spleen using keyhole surgery where suitable. It is considered only after the reason for spleen removal, infection-prevention needs and surgical risks have been reviewed.',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/splenectomy-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Splenectomy',
      sourceStatus: 'clinical-review-required',
      notes: ['Legacy page is short and lacks recovery/follow-up detail; public copy keeps recovery general.'],
    },
    quickGuide: [
      { label: 'Purpose', value: 'Remove the spleen for selected spleen or blood-related conditions.' },
      { label: 'Typical setting', value: 'Hospital surgery after specialist assessment.' },
      { label: 'Anaesthesia', value: 'General anaesthesia.' },
      { label: 'Recovery', value: 'Includes wound care and longer-term infection-prevention advice where needed.' },
    ],
    sections: [
      { title: 'Why might it be recommended?', items: ['Enlarged or diseased spleen requiring surgical review', 'Spleen-related abdominal symptoms', 'Selected haematological conditions where removal is advised'] },
      { title: 'How you are assessed', body: 'Assessment may include examination, imaging, blood tests and coordination with other specialists.' },
      { title: 'Preparing for surgery', body: 'Planning may include vaccination and infection-prevention advice, anaesthetic review and medication checks.' },
      { title: 'What happens during the procedure?', body: 'A camera and instruments are inserted through small incisions. The spleen is separated safely and removed using a protected retrieval method.' },
      { title: 'Potential benefits', items: ['Treatment of the selected spleen problem', 'Keyhole approach where anatomy and spleen size allow', 'Planned infection-prevention guidance'] },
      { title: 'Risks and possible complications', items: ['Bleeding or wound infection', 'Chest infection or pneumonia', 'Injury to nearby structures or need to convert to open surgery'] },
      { title: 'Recovery and aftercare', body: 'Aftercare includes activity guidance, wound checks and advice about infection risk after spleen removal.' },
      { title: 'When to seek medical advice', body: 'Seek urgent advice for fever, severe pain, breathlessness, wound concerns or signs of infection.' },
      { title: 'Alternatives', body: 'Alternatives depend on the diagnosis and may include monitoring, medicines or non-surgical specialist management.' },
    ],
    relatedTreatmentIds: ['benign-liver-disease-surgery'],
    seoTitle: 'Laparoscopic Splenectomy | Spleen Surgery Information',
    seoDescription:
      'Patient guide to laparoscopic splenectomy, including reasons for spleen removal, preparation, surgical approach, risks and aftercare.',
  },
  {
    id: 'gallbladder-surgery',
    slug: 'gallbladder-surgery',
    path: '/treatments/hpb/gallbladder-surgery',
    categoryId: 'hpb',
    title: 'Laparoscopic Cholecystectomy',
    shortTitle: 'Gallbladder Surgery',
    subtitle: 'Keyhole gallbladder removal for gallstones and gallbladder inflammation.',
    image: '/treatments/gallbladder-gallstones.jpg',
    summary:
      'Laparoscopic cholecystectomy removes the gallbladder through small incisions and is commonly used for symptomatic gallstones or gallbladder inflammation.',
    answerFirst:
      'Laparoscopic cholecystectomy is keyhole surgery to remove the gallbladder. It may be recommended for symptomatic gallstones, gallbladder inflammation or related complications after assessment and imaging.',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/laparoscopic-cholecystectomy-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Laparoscopic Cholecystectomy',
      sourceStatus: 'clinical-review-required',
      notes: ['Legacy page is detailed but contains templated wording; recovery durations have been softened.'],
    },
    quickGuide: [
      { label: 'Purpose', value: 'Remove a symptomatic or inflamed gallbladder.' },
      { label: 'Typical setting', value: 'Hospital keyhole surgery.' },
      { label: 'Anaesthesia', value: 'General anaesthesia.' },
      { label: 'Recovery', value: 'Return to routine activity varies by patient and operative findings.' },
    ],
    sections: [
      { title: 'Why might it be recommended?', items: ['Gallstones causing pain or complications', 'Gallbladder inflammation or infection', 'Gallbladder-related pancreatitis or recurrent biliary symptoms'] },
      { title: 'How you are assessed', body: 'Assessment often includes symptom review, blood tests and imaging such as ultrasound, with further tests if bile duct stones are suspected.' },
      { title: 'Preparing for surgery', body: 'Preparation includes anaesthetic review, fasting instructions, medication review and discussion of keyhole and open approaches.' },
      { title: 'What happens during the procedure?', body: 'Small incisions allow a camera and instruments to separate the gallbladder safely from its duct and blood supply before removal.' },
      { title: 'Potential benefits', items: ['Treatment of recurrent gallstone symptoms', 'Reduced risk of further gallbladder inflammation in suitable cases', 'Keyhole approach with smaller incisions where safe'] },
      { title: 'Risks and possible complications', items: ['Infection, bleeding or blood clots', 'Bile leakage', 'Injury to the bile duct, liver, bowel, nerves or blood vessels'] },
      { title: 'Recovery and aftercare', body: 'Aftercare includes wound care, pain relief, diet guidance if needed and follow-up planning.' },
      { title: 'When to seek medical advice', body: 'Seek urgent advice for fever, jaundice, worsening abdominal pain, persistent vomiting or wound concerns.' },
      { title: 'Alternatives', body: 'Alternatives may include observation, medicines for symptom control or endoscopic treatment for bile duct stones.' },
    ],
    relatedTreatmentIds: ['bile-duct-exploration'],
    seoTitle: 'Gallbladder Surgery | Laparoscopic Cholecystectomy',
    seoDescription:
      'Patient guide to gallbladder surgery and laparoscopic cholecystectomy for gallstones, including assessment, procedure, risks and recovery.',
  },
  {
    id: 'laparoscopic-hernia-surgery',
    slug: 'laparoscopic-hernia-surgery',
    path: '/treatments/hernia/laparoscopic-hernia-surgery',
    categoryId: 'hernia',
    title: 'Laparoscopic Hernia Surgery',
    shortTitle: 'Laparoscopic Hernia Surgery',
    subtitle: 'TEP and TAPP keyhole repair for selected hernias.',
    image: '/treatments/hernia-repair.jpg',
    summary:
      'Laparoscopic hernia surgery repairs selected hernias using small incisions, a camera and mesh reinforcement where appropriate.',
    answerFirst:
      'Laparoscopic hernia surgery uses keyhole techniques to repair selected hernias. TEP and TAPP approaches are considered depending on hernia type, anatomy, previous surgery and clinical findings.',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/laparoscopic-hernia-repair-tep-and-tapp-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Laparoscopic Hernia Repair TEP and TAPP',
      sourceStatus: 'clinical-review-required',
      notes: ['Legacy TEP/TAPP distinction retained; recovery advice is general pending review.'],
    },
    quickGuide: [
      { label: 'Purpose', value: 'Repair selected groin or abdominal wall hernias.' },
      { label: 'Typical setting', value: 'Planned hospital surgery.' },
      { label: 'Anaesthesia', value: 'General anaesthesia.' },
      { label: 'Recovery', value: 'Activity return is staged and depends on pain control and repair type.' },
    ],
    sections: [
      { title: 'Why might it be recommended?', items: ['Painful or enlarging hernia', 'Activity limitation from a hernia bulge', 'Risk of obstruction or strangulation'] },
      { title: 'How you are assessed', body: 'Assessment includes examination and may include imaging if the diagnosis or anatomy is uncertain.' },
      { title: 'Preparing for surgery', body: 'Preparation includes anaesthetic review, medication checks and advice on fasting, work, lifting and transport.' },
      { title: 'What happens during the procedure?', body: 'In TAPP repair the abdominal cavity is entered to place mesh over the defect. In TEP repair the repair is performed outside the peritoneal cavity.' },
      { title: 'Potential benefits', items: ['Small-incision repair where suitable', 'Mesh reinforcement of the weakened area', 'Ability to treat selected bilateral hernias through keyhole access'] },
      { title: 'Risks and possible complications', items: ['Infection or bleeding', 'Swelling, bruising or pain', 'Damage to nearby structures or recurrence'] },
      { title: 'Recovery and aftercare', body: 'Recovery planning covers wound care, walking, pain control and staged return to driving, work and exercise.' },
      { title: 'When to seek medical advice', body: 'Seek urgent advice for fever, severe pain, vomiting, a tender irreducible bulge, wound infection or testicular symptoms.' },
      { title: 'Alternatives', body: 'Alternatives may include watchful waiting, open repair or complex abdominal wall reconstruction in selected cases.' },
    ],
    relatedTreatmentIds: ['complex-incisional-hernia', 'diaphragmatic-hernia'],
    seoTitle: 'Laparoscopic Hernia Surgery | TEP and TAPP Repair',
    seoDescription:
      'Patient guide to laparoscopic hernia surgery, including TEP and TAPP repair, assessment, procedure, risks and recovery planning.',
  },
  {
    id: 'diaphragmatic-hernia',
    slug: 'diaphragmatic-hernia',
    path: '/treatments/hernia/diaphragmatic-hernia',
    categoryId: 'hernia',
    title: 'Laparoscopic Repair of Diaphragmatic Hernia',
    shortTitle: 'Diaphragmatic Hernia Repair',
    subtitle: 'Repair of a diaphragm defect when clinically suitable.',
    image: '/treatments/reflux-hiatus-hernia.jpg',
    summary:
      'Diaphragmatic hernia repair treats selected defects in the diaphragm after imaging and specialist assessment.',
    answerFirst:
      'A diaphragmatic hernia is an opening or weakness in the diaphragm that may allow abdominal contents to move toward the chest. Laparoscopic repair may be considered when symptoms, anatomy and overall fitness make it appropriate.',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/surgery-for-diaphragmatic-hernias-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Surgery for Diaphragmatic Hernias',
      sourceStatus: 'clinical-review-required',
      notes: ['Legacy service link identified from the Services page; public copy avoids paediatric-specific wording.'],
    },
    quickGuide: [
      { label: 'Purpose', value: 'Repair a clinically significant diaphragm defect.' },
      { label: 'Typical setting', value: 'Specialist planned surgery.' },
      { label: 'Anaesthesia', value: 'General anaesthesia.' },
      { label: 'Recovery', value: 'Depends on hernia type, size and chest or abdominal involvement.' },
    ],
    sections: [
      { title: 'Why might it be recommended?', items: ['Diaphragm defect on imaging', 'Pressure, breathing or reflux-related symptoms', 'Risk profile suggesting repair should be discussed'] },
      { title: 'How you are assessed', body: 'Assessment may include imaging, symptom review and anaesthetic evaluation.' },
      { title: 'Preparing for surgery', body: 'Preparation is tailored to the hernia type and any chest or reflux symptoms.' },
      { title: 'What happens during the procedure?', body: 'The hernia contents are returned to the abdomen where appropriate and the diaphragm defect is closed or reinforced.' },
      { title: 'Potential benefits', items: ['Repair of the diaphragm defect', 'Reduced herniation-related symptoms in selected patients', 'Keyhole access when suitable'] },
      { title: 'Risks and possible complications', items: ['Breathing problems after surgery', 'Chest-related complications', 'Recurrence or need for further treatment'] },
      { title: 'Recovery and aftercare', body: 'Aftercare focuses on breathing, pain control, wound care and staged return to normal activity.' },
      { title: 'When to seek medical advice', body: 'Seek urgent advice for breathlessness, chest pain, fever, severe pain, vomiting or wound concerns.' },
      { title: 'Alternatives', body: 'Alternatives depend on hernia type and symptoms and may include observation or open repair.' },
    ],
    relatedTreatmentIds: ['laparoscopic-hernia-surgery', 'anti-reflux-surgery'],
    seoTitle: 'Diaphragmatic Hernia Repair | Laparoscopic Hernia Surgery',
    seoDescription:
      'Patient guide to laparoscopic repair of diaphragmatic hernia, including assessment, surgery, risks and recovery themes.',
  },
  {
    id: 'complex-incisional-hernia',
    slug: 'complex-incisional-hernia',
    path: '/treatments/hernia/complex-incisional-hernia',
    categoryId: 'hernia',
    title: 'Complex Incisional Herniae Surgery',
    shortTitle: 'Complex Incisional Hernia',
    subtitle: 'Repair of hernias developing through a previous abdominal wound.',
    image: '/treatments/hernia-repair.jpg',
    summary:
      'Complex incisional hernia surgery treats hernias that develop through previous abdominal surgical scars and may require careful imaging and repair planning.',
    answerFirst:
      'An incisional hernia is a bulge through weakness in a previous abdominal wound. Complex repair planning considers hernia size, symptoms, previous operations, imaging and whether open, laparoscopic or specialist reconstruction is safest.',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/incisional-hernia-repair-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Incisional Hernia Repair',
      sourceStatus: 'clinical-review-required',
      notes: [
        'Legacy repair page is detailed, but recovery wording includes a probable template mismatch and has not been reused.',
        'The Services page also links an incisional hernia condition page; both map to this single modern route.',
      ],
    },
    quickGuide: [
      { label: 'Purpose', value: 'Repair a hernia at or near a previous abdominal incision.' },
      { label: 'Typical setting', value: 'Specialist hernia assessment and planned surgery.' },
      { label: 'Anaesthesia', value: 'Usually general anaesthesia.' },
      { label: 'Recovery', value: 'Depends on hernia complexity and repair method.' },
    ],
    sections: [
      { title: 'Why might it be recommended?', items: ['Bulge at a previous surgical scar', 'Pain, enlargement or activity limitation', 'Concern for obstruction, strangulation or skin changes'] },
      { title: 'How you are assessed', body: 'Assessment may include standing examination and imaging such as ultrasound or CT to define the defect and plan repair.' },
      { title: 'Preparing for surgery', body: 'Preparation may include weight, smoking, constipation and medication optimisation, plus anaesthetic review.' },
      { title: 'What happens during the procedure?', body: 'The hernia contents are returned safely and the abdominal wall weakness is repaired, often with mesh reinforcement when appropriate.' },
      { title: 'Potential benefits', items: ['Repair of the abdominal wall defect', 'Reduced pain or bulging in selected patients', 'Lower risk of future complication where repair is indicated'] },
      { title: 'Risks and possible complications', items: ['Wound infection, bleeding or fluid collection', 'Bowel injury or obstruction', 'Pain, recurrence or mesh-related problems'] },
      { title: 'Recovery and aftercare', body: 'Aftercare includes wound care, pain management, abdominal support where advised and staged return to lifting and activity.' },
      { title: 'When to seek medical advice', body: 'Seek urgent help for a painful irreducible bulge, vomiting, fever, spreading redness, wound discharge or severe abdominal pain.' },
      { title: 'Alternatives', body: 'Alternatives may include observation, abdominal support, open repair or complex abdominal wall reconstruction.' },
    ],
    relatedTreatmentIds: ['laparoscopic-hernia-surgery'],
    seoTitle: 'Complex Incisional Hernia Surgery | Prof. Hemant Sheth',
    seoDescription:
      'Patient guide to complex incisional hernia surgery, including assessment, repair options, risks, recovery and warning signs.',
  },
  {
    id: 'laparoscopic-appendicectomy',
    slug: 'laparoscopic-appendicectomy',
    path: '/treatments/appendicectomy/laparoscopic-appendicectomy',
    categoryId: 'appendicectomy',
    title: 'Laparoscopic Appendicectomy',
    shortTitle: 'Laparoscopic Appendicectomy',
    subtitle: 'Keyhole removal of the appendix, usually for appendicitis.',
    image: '/treatments/appendix-laparoscopic-surgery.jpg',
    summary:
      'Laparoscopic appendicectomy removes the appendix through small incisions and is commonly performed for appendicitis.',
    answerFirst:
      'Laparoscopic appendicectomy is keyhole surgery to remove the appendix. It is most often performed for appendicitis, where timely treatment helps reduce the risk of rupture, abscess or peritonitis.',
    status: 'verified',
    source: {
      legacyUrl: `${legacyBase}/appendectomy-general-laparoscopic-surgeon-hertfordshire-harrow-london/`,
      legacyTitle: 'Appendectomy',
      sourceStatus: 'clinical-review-required',
      notes: ['Legacy page uses appendectomy terminology; new site uses British English appendicectomy while preserving SEO mapping.'],
    },
    quickGuide: [
      { label: 'Purpose', value: 'Remove an inflamed or infected appendix.' },
      { label: 'Typical setting', value: 'Often urgent hospital surgery.' },
      { label: 'Anaesthesia', value: 'General anaesthesia.' },
      { label: 'Recovery', value: 'Depends on severity, perforation risk and operative findings.' },
    ],
    sections: [
      { title: 'Why might it be recommended?', items: ['Right lower abdominal pain with fever, nausea or vomiting', 'Inflamed or infected appendix', 'Concern for rupture, abscess or peritonitis'] },
      { title: 'How you are assessed', body: 'Assessment usually includes history, examination, blood tests and imaging when needed.' },
      { title: 'Preparing for surgery', body: 'Preparation is often urgent and includes fasting, anaesthetic review, antibiotics where appropriate and consent discussion.' },
      { title: 'What happens during the procedure?', body: 'Small incisions allow a camera and instruments to remove the appendix. The area may be washed if infection or rupture is present.' },
      { title: 'Potential benefits', items: ['Treatment of appendicitis', 'Reduced risk of worsening infection when surgery is indicated', 'Keyhole access where suitable'] },
      { title: 'Risks and possible complications', items: ['Wound infection, bleeding or scarring', 'Abscess or blood clots', 'Injury to nearby organs such as bowel or bladder'] },
      { title: 'Recovery and aftercare', body: 'Recovery advice includes wound care, pain control, activity guidance and follow-up according to severity.' },
      { title: 'When to seek medical advice', body: 'Seek urgent advice for fever, worsening abdominal pain, vomiting, wound infection, swelling or feeling acutely unwell.' },
      { title: 'Alternatives', body: 'Alternatives depend on diagnosis and severity and may include antibiotics, observation or open surgery.' },
    ],
    relatedTreatmentIds: [],
    seoTitle: 'Laparoscopic Appendicectomy | Appendix Surgery',
    seoDescription:
      'Patient guide to laparoscopic appendicectomy for appendicitis, including assessment, procedure, recovery, risks and warning signs.',
  },
];

export const publicTreatmentCategories = renderable(treatmentCategories);
export const publicTreatmentPages = renderable(treatmentPages);

export const getTreatmentCategoryById = (categoryId: string) =>
  publicTreatmentCategories.find((category) => category.id === categoryId) ?? null;

export const getTreatmentCategoryByPath = (path: string) =>
  publicTreatmentCategories.find((category) => category.path === path) ?? null;

export const getTreatmentPageById = (treatmentId: string) =>
  publicTreatmentPages.find((treatment) => treatment.id === treatmentId) ?? null;

export const getTreatmentPageByPath = (path: string) =>
  publicTreatmentPages.find((treatment) => treatment.path === path) ?? null;

export const getTreatmentsForCategory = (categoryId: string) =>
  publicTreatmentPages.filter((treatment) => treatment.categoryId === categoryId);

export const getRelatedTreatments = (treatment: TreatmentPage) =>
  treatment.relatedTreatmentIds
    .map((relatedId) => getTreatmentPageById(relatedId))
    .filter((item): item is TreatmentPage => Boolean(item));

export const getTreatmentRouteSeo = (path: string) => {
  if (path === '/treatments') {
    return {
      title: 'Treatments & Specialities | Prof. Hemant Sheth',
      description:
        'Explore upper GI, HPB, hernia and appendicectomy treatment information from Prof. Hemant Sheth, with dedicated patient guides for each speciality.',
      canonicalPath: '/treatments',
      h1: 'Treatments & Specialities',
    };
  }

  const category = getTreatmentCategoryByPath(path);
  if (category) {
    return {
      title: category.seoTitle,
      description: category.seoDescription,
      canonicalPath: category.path,
      h1: category.title,
    };
  }

  const treatment = getTreatmentPageByPath(path);
  if (treatment) {
    return {
      title: treatment.seoTitle,
      description: treatment.seoDescription,
      canonicalPath: treatment.path,
      h1: treatment.title,
    };
  }

  return null;
};

export const isKnownTreatmentPath = (path: string) =>
  path === '/treatments' ||
  Boolean(getTreatmentCategoryByPath(path)) ||
  Boolean(getTreatmentPageByPath(path));

export const getTreatmentBreadcrumbs = (path: string): TreatmentBreadcrumb[] => {
  const base: TreatmentBreadcrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Treatments', path: '/treatments' },
  ];

  const category = getTreatmentCategoryByPath(path);
  if (category) {
    return [...base, { label: category.title, path: category.path }];
  }

  const treatment = getTreatmentPageByPath(path);
  if (!treatment) return base;

  const treatmentCategory = getTreatmentCategoryById(treatment.categoryId);

  return [
    ...base,
    ...(treatmentCategory ? [{ label: treatmentCategory.title, path: treatmentCategory.path }] : []),
    { label: treatment.title, path: treatment.path },
  ];
};

export const treatmentPublicRoutes = [
  '/treatments',
  ...publicTreatmentCategories.map((category) => category.path),
  ...publicTreatmentPages.map((treatment) => treatment.path),
];
