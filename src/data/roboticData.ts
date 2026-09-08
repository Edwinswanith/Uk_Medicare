export interface RoboticFeature {
  title: string;
  description: string;
  benefit: string;
}

export interface ProcedureComparison {
  feature: string;
  open: string;
  laparoscopic: string;
  robotic: string;
}

export const roboticOverview = {
  headline: "Pioneering Da Vinci Xi Robotic Surgery in London & Hertfordshire",
  subheadline: "Unmatched Precision, Faster Recovery, and Superior Clinical Outcomes",
  nationalRecordBadge: "National Record-Breaking Milestone at Ealing Hospital (NHS Trust)",
  nationalRecordDescription: "Prof. Hemant Sheth and his surgical team at London North West University Healthcare NHS Trust (Ealing Hospital) achieved a historic regional and national milestone by rapidly accelerating the adoption of Da Vinci robotic surgery, reducing surgical waiting times and establishing pioneering day-case robotic recovery protocols.",
  videoUrl: "https://www.youtube.com/watch?v=Q__rvX_EEGQ",
  videoEmbedId: "Q__rvX_EEGQ",
  features: [
    {
      title: "10x Magnification 3D-HD Vision",
      description: "True stereoscopic three-dimensional view allows the surgeon to visualize tiny nerves, blood vessels, and tissue planes with unmatched microscopic clarity.",
      benefit: "Significantly lowers risk of nerve injury and inadvertent tissue trauma."
    },
    {
      title: "EndoWrist® Micro-Dexterity",
      description: "Instruments articulate with 7 degrees of freedom, rotating and bending well beyond the physiological limits of the human wrist inside narrow anatomical spaces.",
      benefit: "Enables ultra-precise suturing and dissection in complex abdominal wall and hiatus regions."
    },
    {
      title: "Tremor Filtration & Motion Scaling",
      description: "Software algorithms translate the surgeon's natural hand movements into flawless, tremor-free micro-motions at sub-millimeter scale.",
      benefit: "Eliminates fatigue tremor, ensuring rock-steady tissue handling throughout delicate operations."
    },
    {
      title: "Ergonomic Surgeon Console",
      description: "The surgeon operates comfortably seated at an immersive high-tech console with dual hand controllers and foot pedals, maintaining peak focus.",
      benefit: "Allows prolonged complex reconstructions without surgeon muscular fatigue."
    }
  ],
  comparisons: [
    {
      feature: "Surgical Incision Size",
      open: "Large open incision (10cm - 25cm)",
      laparoscopic: "3 to 4 small keyholes (5mm - 12mm)",
      robotic: "3 to 4 ultra-precise mini-ports (8mm)"
    },
    {
      feature: "Visualisation",
      open: "Direct eye view with surgical headlights",
      laparoscopic: "2D monitor screen, flat depth perception",
      robotic: "Immersive 3D High-Definition stereoscopic view (10x zoom)"
    },
    {
      feature: "Instrument Maneuverability",
      open: "Direct human hand access with rigid instruments",
      laparoscopic: "Rigid straight shafts with limited angles of motion",
      robotic: "EndoWrist technology with 7 degrees of freedom (rotates 360°)"
    },
    {
      feature: "Post-Operative Pain",
      open: "Significant pain requiring strong oral/IV opioids",
      laparoscopic: "Mild to moderate pain, short painkiller course",
      robotic: "Significantly reduced pain due to zero abdominal wall torque"
    },
    {
      feature: "Hospital Stay Duration",
      open: "3 to 7+ days in hospital",
      laparoscopic: "Day case or 1 night stay",
      robotic: "Day case or overnight stay (rapid return to home)"
    },
    {
      feature: "Return to Normal Routine",
      open: "6 to 8 weeks recovery",
      laparoscopic: "2 to 3 weeks recovery",
      robotic: "1 to 2 weeks for most daily activities and light work"
    }
  ],
  roboticProcedures: [
    {
      name: "Robotic Inguinal & Femoral Hernia Repair",
      indication: "Primary and recurrent groin hernias",
      advantage: "Allows anatomical mesh placement with zero nerve-pinching tacks, substantially reducing risk of chronic groin neuralgia."
    },
    {
      name: "Robotic Complex Incisional & Ventral Hernia (TAR/eTEP)",
      indication: "Large abdominal wall defects and previous surgical scar hernias",
      advantage: "Reconstructs rectus abdominal muscles retro-muscularly without large painful open incisions or wound complications."
    },
    {
      name: "Robotic Anti-Reflux & Hiatus Hernia Repair",
      indication: "Severe GERD, large para-esophageal sliding or rolling hiatus hernias",
      advantage: "Unmatched visualization around the esophagus, vagus nerves, and mediastinum ensures anatomically perfect fundoplication wraps."
    },
    {
      name: "Robotic Cholecystectomy (Gallbladder Removal)",
      indication: "Symptomatic gallstones, acute and chronic cholecystitis, gallbladder polyps",
      advantage: "Sub-millimeter dissection of Calot's triangle to protect the common bile duct and cystic artery in inflamed anatomy."
    }
  ]
};
