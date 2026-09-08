import { VerificationStatus } from './contentStatus';

/**
 * Structured publication record — replaces the unsupported "50+
 * Research Publications" aggregate statistic (removed from
 * StatsCounterBar.tsx / App.tsx). See docs/publication-register.md for
 * the full evidence trail.
 *
 * Only 20 itemised publications + 2 theses could be found (legacy
 * Research page), of which 1 has been independently corroborated via
 * WebSearch. This file is intentionally NOT wired into any rendered
 * component yet — there is no existing live "Research" section to
 * place it in, and adding one is a content/design decision beyond this
 * safety pass. When a Research section is built, render only
 * `renderable(publications)` (see ./contentStatus) and feature no more
 * than 3-5 high-confidence items in any homepage/About-area teaser,
 * with the full list on its own page — per the task brief for this
 * work, never render the bare count as a headline statistic again.
 */
export interface Publication {
  title: string;
  authors: string;
  year: number;
  journal?: string;
  sourceUrl?: string;
  doiOrPmid?: string;
  category: string;
  status: VerificationStatus;
}

export const publications: Publication[] = [
  {
    title: 'The Diagnostic Utility and Clinical Impact of After-Hours CT Scans of the Abdomen and Pelvis Investigating Abdominal Pain',
    authors: 'Karia, Seager, Rafique, Sheth',
    year: 2017,
    journal: 'Scientific World Journal',
    doiOrPmid: 'https://doi.org/10.1155/2017/4028352',
    category: 'Clinical/diagnostic',
    status: 'pending',
  },
  {
    title: 'Non-haemorrhagic, bilateral adrenal infarction in a patient with antiphospholipid syndrome along with lupus myocarditis',
    authors: 'Batt, Malik, Harvie, Sheth',
    year: 2016,
    category: 'Case report',
    status: 'pending',
  },
  {
    title: 'Primary Gallbladder Lymphoma in a Male Patient with No Risk Factors Detected Incidentally by CT Colonography',
    authors: 'Karia, Mitsopoulos, Patel, Rafique, Sheth',
    year: 2015,
    category: 'Case report',
    status: 'pending',
  },
  {
    title: 'Unemployment, public-sector healthcare spending and stomach cancer mortality in the European Union, 1981-2009',
    authors: 'Maruthappu et al., Sheth',
    year: 2014,
    category: 'Health policy/epidemiology',
    status: 'pending',
  },
  {
    title: 'Vancomycin-induced thrombocytopaenia in a patient with severe pancreatitis',
    authors: 'Rowland, Rankin, Sheth',
    year: 2013,
    category: 'Case report',
    status: 'pending',
  },
  {
    title: 'Spontaneous Intraperitoneal Rupture of a Hepatic Hydatid Cyst with Subsequent Anaphylaxis',
    authors: 'Tinsley, Abbara, Kadaba, Sandhu, Sheth',
    year: 2013,
    doiOrPmid: 'http://dx.doi.org/10.1155/2013/320418',
    category: 'Case report',
    status: 'pending',
  },
  {
    title: 'Hepatic Portal Venous Gas: Comparison of Two Cases',
    authors: 'Rankin, Sheth',
    year: 2013,
    category: 'Case report',
    status: 'pending',
  },
  {
    title: 'A case of emphysematous pyelonephritis',
    authors: 'Rowland, Sheth',
    year: 2013,
    category: 'Case report',
    status: 'pending',
  },
  {
    title: 'An intraoperative cholangiogram: unusual anatomy',
    authors: 'Rowland, Sheth',
    year: 2013,
    category: 'Case report',
    status: 'pending',
  },
  {
    title: 'Endoscopic biopsy on patients taking antiplatelet agents',
    authors: 'Misro, Pal, Sheth',
    year: 2013,
    doiOrPmid: 'http://dx.doi.org/10.1155/2013/637951',
    category: 'Clinical practice',
    status: 'pending',
  },
  {
    title: 'Hepatic Portal Venous Gas due to Acute on Chronic Gastric Ischaemia',
    authors: 'Misro, Sheth',
    year: 2012,
    category: 'Case report',
    status: 'pending',
  },
  {
    title: 'Methods of vascular occlusion for elective liver resections',
    authors: 'Gurusamy, Sheth, Kumar, Sharma, Davidson',
    year: 2009,
    journal: 'Cochrane Database of Systematic Reviews',
    category: 'Systematic review',
    status: 'pending',
  },
  {
    title: 'Glycine reduces liver warm ischaemia reperfusion injury',
    authors: 'Sheth et al.',
    year: 2010,
    journal: 'Journal of Hepatology and Gastroenterology',
    category: 'Original research (liver transplant/HPB)',
    status: 'verified', // independently corroborated via WebSearch — see docs/publication-register.md #12
  },
  {
    title: 'Acute limb ischemia caused by femoral arterial line induces remote liver injury',
    authors: 'Glantzounis, Sheth et al.',
    year: 2009,
    category: 'Original research',
    status: 'pending',
  },
  {
    title: 'Glycine Protects Bile Physiology and Biliary-Specific Liver Cell Metabolism',
    authors: 'Hafez, Sheth, Glantzounis et al.',
    year: 2008,
    category: 'Original research',
    status: 'pending',
  },
  {
    title: 'Fishbone perforation mimicking a gastric intramural tumour',
    authors: 'Bajwa, Sheth, Hughes',
    year: 2007,
    category: 'Case report',
    status: 'pending',
  },
  {
    title: 'Midgut malrotation as a rare cause of chronic abdominal pain',
    authors: 'Bajwa, Sheth, Hughes',
    year: 2007,
    category: 'Case report',
    status: 'pending',
  },
  {
    title: 'Formation and role of plasma S-nitrosothiols in liver ischaemia-reperfusion injury',
    authors: 'Glantzounis, Rocks, Sheth et al.',
    year: 2007,
    category: 'Original research',
    status: 'pending',
  },
  {
    title: 'N-Acetylcysteine ameliorates the late phase of liver ischaemia/reperfusion injury',
    authors: 'Fusai, Glantzounis, Hafez, Sheth et al.',
    year: 2005,
    category: 'Original research',
    status: 'pending',
  },
  {
    title: 'Radioisotope bone Scans in the Preoperative Staging of Hepato-pancreato biliary Cancer',
    authors: 'Sheth, Javed, Hilson, Buscombe, Davidson',
    year: 2005,
    category: 'Original research',
    status: 'pending',
  },
];
