export interface TreatmentDetail {
  id: string;
  groupId: string;
  groupTitle: string;
  title: string;
  subtitle: string;
  image: string;
  overview: string;
  indications: string[];
  procedure: string[];
  recovery: string[];
  risks: string[];
}

export interface TreatmentDetailGroup {
  id: string;
  title: string;
  intro: string;
}

export const treatmentDetailGroups: TreatmentDetailGroup[] = [
  {
    id: 'upper-gi',
    title: 'Upper GI',
    intro:
      'Assessment and treatment for problems affecting the oesophagus, stomach and duodenum.',
  },
  {
    id: 'hpb-disorders',
    title: 'HPB Disorders',
    intro:
      'Laparoscopic care for selected liver, gallbladder, bile duct and spleen conditions.',
  },
  {
    id: 'hernia-surgery',
    title: 'Hernia Surgery',
    intro:
      'Keyhole and specialist repair options for groin, diaphragmatic and incisional hernias.',
  },
  {
    id: 'appendicectomy',
    title: 'Appendicectomy',
    intro:
      'Emergency and planned appendix surgery, usually using a minimally invasive approach where suitable.',
  },
];

export const treatmentDetails: TreatmentDetail[] = [
  {
    id: 'upper-gi-endoscopy',
    groupId: 'upper-gi',
    groupTitle: 'Upper GI',
    title: 'Upper GI Endoscopy',
    subtitle: 'Camera examination of the oesophagus, stomach and duodenum.',
    image: '/treatments/upper-gi-endoscopy.jpg',
    overview:
      'Upper GI endoscopy, also called gastroscopy or OGD, uses a slim flexible camera to examine the upper digestive tract. It can help diagnose reflux, ulcers, bleeding, swallowing symptoms and other upper abdominal concerns.',
    indications: [
      'Difficulty or pain when swallowing',
      'Vomiting blood, black stools or iron-deficiency anaemia',
      'Troublesome heartburn, dyspepsia or persistent ulcer-like pain',
      'Biopsy for suspected malabsorption or follow-up of selected ulcers',
    ],
    procedure: [
      'Usually performed as an outpatient procedure with throat spray and/or intravenous sedation.',
      'The endoscope is passed through the mouth while breathing is not blocked.',
      'Biopsies, polyp removal, treatment of bleeding or dilatation may be performed when clinically needed.',
    ],
    recovery: [
      'Observation in recovery is usually short after the procedure.',
      'A responsible adult should take you home if sedation is used.',
      'Biopsy results are usually reported separately after laboratory review.',
    ],
    risks: [
      'Temporary sore throat or bloating',
      'Bleeding after biopsy or therapeutic treatment',
      'Rare perforation or sedation-related complication',
    ],
  },
  {
    id: 'anti-reflux-surgery',
    groupId: 'upper-gi',
    groupTitle: 'Upper GI',
    title: 'Anti-Reflux Surgery',
    subtitle: 'Laparoscopic fundoplication and repair of reflux-related hiatus hernia.',
    image: '/treatments/reflux-hiatus-hernia.jpg',
    overview:
      'Anti-reflux surgery treats gastro-oesophageal reflux when the lower oesophageal sphincter does not prevent acid flowing back into the oesophagus. Laparoscopic Nissen fundoplication is used to restore the anti-reflux barrier in selected patients.',
    indications: [
      'GORD with persistent heartburn or regurgitation',
      'Hiatus hernia contributing to reflux symptoms',
      'Chronic oesophagitis',
      'Symptoms continuing despite medication and lifestyle measures',
    ],
    procedure: [
      'Performed under general anaesthesia through small abdominal incisions.',
      'A laparoscope provides a magnified view while instruments repair the reflux mechanism.',
      'The top of the stomach is wrapped around the lower oesophagus to reduce reflux.',
    ],
    recovery: [
      'Heavy lifting and pressure on the abdomen are avoided during early recovery.',
      'Liquids and soft foods are commonly advised for two to four weeks.',
      'Pain relief, wound care and diet guidance are provided before discharge.',
    ],
    risks: [
      'Bloating or difficulty swallowing',
      'Loosening of the wrap',
      'Recurrence of reflux symptoms',
    ],
  },
  {
    id: 'laparoscopic-bile-duct-exploration',
    groupId: 'hpb-disorders',
    groupTitle: 'HPB Disorders',
    title: 'Laparoscopic Bile Duct Exploration',
    subtitle: 'Keyhole removal of stones from the common bile duct.',
    image: '/treatments/gallbladder-gallstones.jpg',
    overview:
      'The common bile duct carries bile from the liver and gallbladder toward the small intestine. Laparoscopic bile duct exploration is used to locate and remove stones blocking bile flow.',
    indications: [
      'Common bile duct stones',
      'Jaundice or abnormal liver tests related to bile duct obstruction',
      'Bile duct blockage found during gallbladder assessment',
    ],
    procedure: [
      'Performed under general anaesthesia using three to four keyhole incisions.',
      'Contrast dye and X-ray imaging may be used to confirm the stone position.',
      'Instruments are used to open the duct, remove stones and drain bile when required.',
    ],
    recovery: [
      'Hospital stay depends on the complexity of the blockage and recovery.',
      'Follow-up checks monitor symptoms, wounds and liver blood tests.',
    ],
    risks: [
      'Bleeding or infection',
      'Swelling of the duct',
      'Bile leak or need for further treatment',
    ],
  },
  {
    id: 'laparoscopic-liver-surgery',
    groupId: 'hpb-disorders',
    groupTitle: 'HPB Disorders',
    title: 'Laparoscopic Benign Liver Disease Surgery',
    subtitle: 'Minimally invasive assessment and surgery for selected liver conditions.',
    image: '/treatments/liver-hpb-surgery.jpg',
    overview:
      'Laparoscopic liver surgery uses small incisions and a camera to treat selected liver problems. Suitability depends on imaging, blood tests, diagnosis, anatomy and wider clinical review.',
    indications: [
      'Selected benign liver lesions or cysts',
      'Liver masses requiring specialist surgical assessment',
      'Carefully selected liver resection cases after imaging review',
    ],
    procedure: [
      'Performed under general anaesthesia.',
      'Three to five small incisions may be used for the laparoscope and instruments.',
      'The affected liver segment is removed or treated, then retrieved through a small incision when needed.',
    ],
    recovery: [
      'Pain relief and antibiotics may be given through an IV line initially.',
      'Early walking supports recovery.',
      'Heavy lifting is avoided for several weeks.',
    ],
    risks: [
      'Bleeding or blood clots',
      'Infection',
      'Bile leak, kidney issues or scar tissue formation',
    ],
  },
  {
    id: 'laparoscopic-splenectomy',
    groupId: 'hpb-disorders',
    groupTitle: 'HPB Disorders',
    title: 'Laparoscopic Splenectomy',
    subtitle: 'Keyhole removal of the spleen when clinically indicated.',
    image: '/treatments/liver-hpb-surgery.jpg',
    overview:
      'Splenectomy is removal of the spleen. It may be considered for an enlarged or diseased spleen after clinical examination, imaging and blood-test review.',
    indications: [
      'Enlarged spleen requiring specialist assessment',
      'Abdominal discomfort, early fullness or fatigue related to spleen disease',
      'Selected haematological conditions where spleen removal is advised',
    ],
    procedure: [
      'Open or laparoscopic surgery may be used depending on spleen size and diagnosis.',
      'Laparoscopic splenectomy uses three to four small abdominal incisions.',
      'The spleen is freed and removed using camera-guided instruments.',
    ],
    recovery: [
      'Recovery planning includes wound care and activity guidance.',
      'Long-term infection prevention advice may be needed after spleen removal.',
    ],
    risks: [
      'Bleeding or wound infection',
      'Pneumonia',
      'Injury to nearby structures',
    ],
  },
  {
    id: 'laparoscopic-cholecystectomy',
    groupId: 'hpb-disorders',
    groupTitle: 'HPB Disorders',
    title: 'Laparoscopic Cholecystectomy',
    subtitle: 'Keyhole gallbladder removal for gallstones and gallbladder inflammation.',
    image: '/treatments/gallbladder-gallstones.jpg',
    overview:
      'Laparoscopic cholecystectomy removes the gallbladder through small incisions. It is commonly used for gallstones, cholecystitis and related gallbladder problems.',
    indications: [
      'Gallstones in the gallbladder or bile duct',
      'Inflammation or infection of the gallbladder',
      'Gallbladder-related pancreatitis or recurrent biliary pain',
    ],
    procedure: [
      'Performed under general anaesthesia.',
      'Three to four small incisions allow insertion of a laparoscope and fine instruments.',
      'The duct and blood vessels to the gallbladder are controlled before the gallbladder is removed.',
    ],
    recovery: [
      'Many patients go home the same day or after one overnight stay.',
      'Normal daily routines may resume in about a week for many patients.',
      'Diet, wound care and follow-up instructions are provided before discharge.',
    ],
    risks: [
      'Infection, bleeding or blood clots',
      'Bile leakage',
      'Injury to the bile duct, liver, bowel, nerves or blood vessels',
    ],
  },
  {
    id: 'laparoscopic-hernia-repair',
    groupId: 'hernia-surgery',
    groupTitle: 'Hernia Surgery',
    title: 'Laparoscopic Hernia Surgery',
    subtitle: 'TEP and TAPP keyhole repair for selected hernias.',
    image: '/treatments/hernia-repair.jpg',
    overview:
      'A hernia occurs when tissue bulges through a weak area in the abdominal wall. Laparoscopic TEP and TAPP repairs use small incisions and mesh reinforcement to repair selected hernias.',
    indications: [
      'Groin or abdominal wall bulge',
      'Pain, dragging discomfort or activity-related symptoms',
      'Risk of obstruction or strangulation',
    ],
    procedure: [
      'TAPP repair enters the abdominal cavity and places mesh over the hernia opening.',
      'TEP repair works outside the peritoneal cavity in the preperitoneal space.',
      'The mesh gradually incorporates into the abdominal wall tissues.',
    ],
    recovery: [
      'Most recovery plans focus on early walking and staged return to activity.',
      'Driving, work and exercise timing depend on pain control and the type of repair.',
    ],
    risks: [
      'Infection or bleeding',
      'Swelling',
      'Damage to nearby structures or recurrence',
    ],
  },
  {
    id: 'diaphragmatic-hernia-repair',
    groupId: 'hernia-surgery',
    groupTitle: 'Hernia Surgery',
    title: 'Laparoscopic Repair of Diaphragmatic Hernia',
    subtitle: 'Repair of a defect in the diaphragm when clinically suitable.',
    image: '/treatments/reflux-hiatus-hernia.jpg',
    overview:
      'The diaphragm separates the chest from the abdomen and helps breathing. A diaphragmatic hernia is an opening that allows abdominal contents to move toward the chest and may need surgical repair.',
    indications: [
      'Diaphragmatic defect shown on imaging',
      'Breathing, reflux or pressure symptoms related to herniation',
      'Planned specialist repair after clinical review',
    ],
    procedure: [
      'Surgery is performed under general anaesthesia.',
      'The abdominal contents are returned to the abdomen.',
      'The diaphragm opening is closed with sutures or reinforced where needed.',
    ],
    recovery: [
      'Recovery depends on the hernia type, size and surgical approach.',
      'Breathing, pain control and return to activity are reviewed after surgery.',
    ],
    risks: [
      'Breathing problems after surgery',
      'Collapsed lung or chest-related complication',
      'Recurrence or need for further treatment',
    ],
  },
  {
    id: 'complex-incisional-hernia',
    groupId: 'hernia-surgery',
    groupTitle: 'Hernia Surgery',
    title: 'Complex Incisional Herniae Surgery',
    subtitle: 'Repair of hernias developing through a previous abdominal wound.',
    image: '/treatments/hernia-repair.jpg',
    overview:
      'An incisional hernia is a bulge through weakness in a previous surgical wound. It may appear months after abdominal surgery and can become painful, enlarged or complicated.',
    indications: [
      'Visible bulge at a previous surgical scar',
      'Pain, redness, nausea, vomiting or bowel symptoms',
      'Concern about obstruction or strangulation',
    ],
    procedure: [
      'Assessment may include standing examination and imaging such as ultrasound, CT or MRI.',
      'Open or laparoscopic repair may be recommended depending on size and complexity.',
      'The hernia contents are returned and the defect is repaired with sutures and/or mesh.',
    ],
    recovery: [
      'Weight control, constipation prevention and smoking avoidance support healing.',
      'Activity restrictions are tailored to the repair and wound condition.',
    ],
    risks: [
      'Wound infection, bleeding or fluid collection',
      'Bowel obstruction or recurrence',
      'Pain, scarring or mesh-related problems',
    ],
  },
  {
    id: 'laparoscopic-appendicectomy',
    groupId: 'appendicectomy',
    groupTitle: 'Appendicectomy',
    title: 'Laparoscopic Appendicectomy',
    subtitle: 'Keyhole removal of the appendix, usually for appendicitis.',
    image: '/treatments/appendix-laparoscopic-surgery.jpg',
    overview:
      'Appendicectomy is surgical removal of the appendix. It is most often performed for appendicitis, where urgent treatment prevents rupture, abscess or peritonitis.',
    indications: [
      'Right lower abdominal pain with fever, nausea or vomiting',
      'Inflamed or infected appendix',
      'Concern for rupture, abscess or peritonitis',
    ],
    procedure: [
      'Open surgery uses a small incision in the lower right abdomen.',
      'Laparoscopic surgery uses several small incisions, a camera and miniature instruments.',
      'The appendix is removed and the area is washed if infection or rupture is present.',
    ],
    recovery: [
      'Hospital stay may range from same-day discharge to a few days depending on severity.',
      'Many patients resume normal activities within one to two weeks.',
      'Strenuous activity is usually avoided for several weeks.',
    ],
    risks: [
      'Wound infection, bleeding or scarring',
      'Abscess or blood clots',
      'Damage to nearby organs such as bowel or bladder',
    ],
  },
];
