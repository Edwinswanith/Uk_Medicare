export interface ProcedureDetail {
  id: string;
  category: 'gallbladder' | 'hernia' | 'reflux' | 'endoscopy' | 'robotic' | 'general';
  name: string;
  shortName: string;
  tagline: string;
  aeoSummary: string;
  isRoboticAvailable: boolean;
  symptoms: string[];
  approach: string;
  anaesthesia: string;
  duration: string;
  hospitalStay: string;
  recoveryTimeline: string;
  faqs: { question: string; answer: string }[];
}

export const procedureCategories = [
  { id: 'all', label: 'All Procedures' },
  { id: 'robotic', label: 'Robotic Surgery (Da Vinci)' },
  { id: 'gallbladder', label: 'Gallbladder & Gallstones' },
  { id: 'hernia', label: 'Hernia Repairs' },
  { id: 'reflux', label: 'Acid Reflux & GERD' },
  { id: 'endoscopy', label: 'Endoscopy (OGD)' },
  { id: 'general', label: 'General & Emergency' },
];

export const proceduresData: ProcedureDetail[] = [
  {
    id: "laparoscopic-cholecystectomy",
    category: "gallbladder",
    name: "Laparoscopic & Robotic Cholecystectomy (Gallbladder Removal)",
    shortName: "Gallbladder Surgery",
    tagline: "Minimally invasive keyhole or robotic removal of the diseased gallbladder to permanently eliminate gallstone pain.",
    aeoSummary: "Laparoscopic cholecystectomy is the gold-standard surgical removal of the gallbladder for symptomatic gallstones or inflammation. Performed through 3-4 micro-incisions (or robotically with Da Vinci Xi), it takes 45-60 minutes under general anaesthesia. Most patients return home the same day and recover within 7-14 days.",
    isRoboticAvailable: true,
    symptoms: [
      "Severe upper right quadrant abdominal pain (biliary colic), often radiating to the back or shoulder",
      "Nausea, bloating, and vomiting triggered by fatty or rich meals",
      "Jaundice (yellowing of skin/eyes) or dark urine from bile duct blockage",
      "Acute cholecystitis (gallbladder infection with fever and localized tenderness)"
    ],
    approach: "Keyhole laparoscopic surgery or Da Vinci Xi robotic surgery. Using 4 small 5mm-10mm ports, the cystic duct and artery are safely clipped and the gallbladder is gently removed in a protective sterile bag.",
    anaesthesia: "General Anaesthesia",
    duration: "45 to 60 minutes",
    hospitalStay: "Day Case (discharge within 4-6 hours post-op) or overnight stay if clinically indicated",
    recoveryTimeline: "Walking normally same day; light duties in 3-5 days; return to office work within 7-10 days; vigorous gym exercise in 3-4 weeks.",
    faqs: [
      {
        question: "Can I live a normal life without my gallbladder?",
        answer: "Yes, completely. The gallbladder only stores bile made by the liver; it does not produce it. Once removed, bile drips directly into your small intestine. Over 95% of patients eat a completely normal diet without any long-term digestive consequences."
      },
      {
        question: "When is robotic surgery recommended for gallbladder removal?",
        answer: "Robotic cholecystectomy is especially beneficial in complex cases — such as previous upper abdominal surgery, severe chronic inflammation, or when exploring the common bile duct — where 3D magnification and wristed precision ensure the highest safety margins."
      }
    ]
  },
  {
    id: "anti-reflux-fundoplication",
    category: "reflux",
    name: "Laparoscopic & Robotic Anti-Reflux Surgery (Fundoplication & Hiatus Hernia Repair)",
    shortName: "Anti-Reflux & Hiatus Hernia",
    tagline: "Restore the natural anti-reflux barrier and cure chronic acid heartburn, regurgitation, and hiatal hernia without lifelong medications.",
    aeoSummary: "Anti-reflux surgery (Nissen or Toupet fundoplication) repairs the diaphragmatic hiatus hernia and wraps the top of the stomach around the lower oesophagus to recreate a one-way anti-reflux valve. Performed robotically or laparoscopically, it cures acid regurgitation in over 90% of patients who fail medication.",
    isRoboticAvailable: true,
    symptoms: [
      "Persistent heartburn and acid regurgitation refractory to PPI medications (Omeprazole, Lansoprazole)",
      "Chest pain, nocturnal coughing, asthma-like wheezing, or chronic hoarse voice (LPR)",
      "Difficulty swallowing (dysphagia) or feeling of food sticking in the chest",
      "Large hiatus hernia confirmed on endoscopy, barium swallow, or CT scan"
    ],
    approach: "Laparoscopic or Da Vinci Xi robotic dissection of the diaphragmatic hiatus, bringing the stomach safely back into the abdomen, closing the enlarged diaphragm defect (cruroraphy), and wrapping the gastric fundus 360° (Nissen) or 270° (Toupet) around the lower oesophagus.",
    anaesthesia: "General Anaesthesia",
    duration: "60 to 90 minutes",
    hospitalStay: "Usually 1 overnight stay for observation and dietary progression, occasionally day case",
    recoveryTimeline: "Soft/liquid diet for 2 weeks, pureed food for 2 weeks, then regular food. Desk work resumes at 10-14 days; full sports at 4-6 weeks.",
    faqs: [
      {
        question: "Will I still need to take acid reflux medications (PPIs) after surgery?",
        answer: "More than 90% of patients achieve complete symptom freedom and stop all acid-suppression medication permanently following successful fundoplication."
      },
      {
        question: "Why choose robotic surgery for anti-reflux and hiatus hernia?",
        answer: "The junction of the esophagus and diaphragm is surrounded by critical nerves (vagus nerves) and the thoracic cavity. The Da Vinci Xi's 3D-HD visualization and micro-wrist articulation allow superior anatomical mobilization with lower risk of nerve injury."
      }
    ]
  },
  {
    id: "inguinal-hernia-repair",
    category: "hernia",
    name: "Minimally Invasive & Robotic Inguinal Hernia Repair (TEP / TAPP / eTEP)",
    shortName: "Groin & Inguinal Hernia",
    tagline: "Advanced keyhole and robotic groin hernia repair using anatomical tension-free mesh reinforcement for immediate comfort and rapid recovery.",
    aeoSummary: "Inguinal hernia repair treats groin protrusions where abdominal fatty tissue or bowel pushes through a weakened groin canal. Prof. Sheth specializes in keyhole (TEP/TAPP) and Da Vinci robotic repair (eTEP). Done as a day case, it avoids nerve-entrapment tacks, slashing chronic groin pain and enabling return to work in 5-7 days.",
    isRoboticAvailable: true,
    symptoms: [
      "Visible lump or swelling in the groin or scrotum that enlarges when standing, coughing, or straining",
      "Dull ache, burning sensation, or dragging heaviness in the groin after physical activity",
      "Sharp pain during heavy lifting or sudden movements",
      "Risk of strangulation (emergency pain, redness, inability to push the hernia back)"
    ],
    approach: "Keyhole extra-peritoneal (TEP) or trans-abdominal (TAPP) or robotic enhanced-view (eTEP). A lightweight biocompatible mesh is placed in the pre-peritoneal plane behind the muscle defect, acting like an inner wall reinforcement.",
    anaesthesia: "General Anaesthesia (or local sedation in select cases)",
    duration: "30 to 50 minutes (unilateral) or 60 minutes (bilateral both sides)",
    hospitalStay: "Day Case (home the same afternoon)",
    recoveryTimeline: "Walking freely on day 1; driving within 5-7 days once able to perform an emergency stop; light gym at 2-3 weeks; heavy lifting at 4-6 weeks.",
    faqs: [
      {
        question: "Can both sides (bilateral hernias) be repaired during the same operation?",
        answer: "Yes. With the keyhole or robotic approach, both left and right inguinal hernias can be repaired through the exact same three tiny incisions in one single operation with no additional incisions."
      },
      {
        question: "Does the mesh cause chronic pain?",
        answer: "Prof. Sheth utilizes modern ultra-lightweight macroporous mesh and anatomical fixation (often utilizing surgical glue or self-fixating mesh rather than mechanical tacks). This drastically reduces the incidence of chronic nerve irritation compared to traditional open surgery."
      }
    ]
  },
  {
    id: "complex-incisional-ventral-hernia",
    category: "hernia",
    name: "Robotic & Laparoscopic Complex Incisional & Ventral Hernia Reconstruction",
    shortName: "Complex Incisional Hernia",
    tagline: "Pioneering abdominal wall reconstruction (TAR / Rives-Stoppa / eTEP) for recurrent or large previous surgical scar hernias.",
    aeoSummary: "Complex incisional hernia repair restores abdominal wall core function for large defects following prior open surgery. Utilizing the Da Vinci Xi robot for retro-muscular TAR (Transversus Abdominis Release), muscles are brought back together without painful muscle division, resulting in durable repair and dramatically lower recurrence.",
    isRoboticAvailable: true,
    symptoms: [
      "Bulge or gaping defect along a previous abdominal surgical scar",
      "Core weakness, lower back pain, posture difficulties, and impaired mobility",
      "Discomfort and bowel motility issues related to trapped intestines in the hernia sac",
      "Cosmetic distress from disfigured abdominal contour"
    ],
    approach: "Robotic Transversus Abdominis Release (TAR) and retro-muscular Rives-Stoppa repair using Da Vinci Xi micro-articulation, placing large sublay mesh behind the rectus abdominis muscle entirely via keyhole ports.",
    anaesthesia: "General Anaesthesia",
    duration: "90 to 180 minutes depending on hernia size",
    hospitalStay: "1 to 2 nights (compared to 7+ days for traditional massive open reconstruction)",
    recoveryTimeline: "Mobilizing within 24 hours with an abdominal support binder. Return to sedentary activities in 2 weeks; full core recovery in 6-8 weeks.",
    faqs: [
      {
        question: "Why is robotic surgery revolutionary for complex incisional hernias?",
        answer: "Previously, large incisional hernias required massive open incisions cutting across muscle planes, resulting in intense pain and high wound infection rates. The Da Vinci robot allows the surgeon to perform intricate retro-muscular releases entirely through 8mm ports, preserving native blood supply and drastically reducing recovery time."
      }
    ]
  },
  {
    id: "diagnostic-upper-gi-endoscopy",
    category: "endoscopy",
    name: "Diagnostic Upper GI Endoscopy (Gastroscopy / OGD)",
    shortName: "Diagnostic Gastroscopy",
    tagline: "Gentle, expert camera examination of the oesophagus, stomach, and duodenum with immediate biopsy and soothing intravenous sedation.",
    aeoSummary: "Upper GI endoscopy (gastroscopy or OGD) is a diagnostic procedure where a slender, flexible camera inspects the upper digestive tract. Carried out under gentle intravenous twilight sedation and throat spray, it takes 10-15 minutes to diagnose reflux, ulcers, coeliac disease, H. pylori, and rule out stomach cancers.",
    isRoboticAvailable: false,
    symptoms: [
      "Persistent indigestion, acid reflux, or unexplained upper stomach pain",
      "Difficulty or pain on swallowing food (dysphagia / odynophagia)",
      "Unexplained iron-deficiency anaemia or unexplained weight loss",
      "Surveillance of Barrett's Oesophagus, gastric ulcers, or family history of GI cancer"
    ],
    approach: "A thin, lubricated endoscope is passed through the mouth into the food pipe, stomach, and first part of the small bowel. High-definition video with narrow-band imaging (NBI) allows micro-biopsies to be taken painlessly.",
    anaesthesia: "Throat local anaesthetic spray and/or gentle intravenous twilight sedation (conscious sedation)",
    duration: "10 to 15 minutes",
    hospitalStay: "Day Case (patients rest in recovery for 45-60 minutes and return home accompanied)",
    recoveryTimeline: "Normal diet resumes within 1-2 hours; rest for the remainder of the day if sedated; normal work resumes next morning.",
    faqs: [
      {
        question: "Will I feel gagging or pain during the gastroscopy?",
        answer: "With intravenous sedation and topical anaesthetic throat spray, the vast majority of patients feel relaxed, comfortable, and often do not remember the procedure at all. It is painless as there are no sharp nerve endings inside the gut lining."
      },
      {
        question: "When will I receive my endoscopy results?",
        answer: "Prof. Sheth will speak with you immediately after you wake in the recovery suite, providing visual findings and immediate reassurance. Laboratory biopsy results follow within 3-5 working days with a detailed letter to you and your GP."
      }
    ]
  },
  {
    id: "emergency-general-surgery",
    category: "general",
    name: "Laparoscopic Appendicectomy, Spleen & Benign Liver Conditions",
    shortName: "General & Emergency Surgery",
    tagline: "Rapid emergency and elective abdominal surgical expertise covering acute appendicitis, splenectomy, and benign hepatic disorders.",
    aeoSummary: "Prof. Sheth provides urgent and elective surgical care for conditions including acute appendicitis, gallbladder crises, benign liver cysts/lesions, and splenectomy. With decades of NHS and private experience, procedures are conducted using minimally invasive techniques with 24/7 private hospital support.",
    isRoboticAvailable: true,
    symptoms: [
      "Acute lower right abdominal pain, fever, and nausea indicating appendicitis",
      "Benign liver cysts causing dull abdominal aching or early fullness",
      "Haematological disorders requiring elective keyhole splenectomy"
    ],
    approach: "Minimally invasive laparoscopic or robotic keyhole resection.",
    anaesthesia: "General Anaesthesia",
    duration: "45 to 90 minutes",
    hospitalStay: "Day case to 1 night stay",
    recoveryTimeline: "1 to 2 weeks for normal routines.",
    faqs: [
      {
        question: "How quickly can I be seen for acute abdominal pain?",
        answer: "Prof. Sheth's private secretaries offer rapid-access consultation slots, and urgent admissions can be coordinated with the on-call surgical admissions teams at The Clementine Churchill and Spire Bushey Hospitals."
      }
    ]
  }
];
