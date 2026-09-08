export interface FAQItem {
  id: string;
  category: 'robotic' | 'insurance' | 'fees' | 'recovery' | 'referrals';
  question: string;
  answer: string;
  keyTakeaway: string;
}

export const faqCategories = [
  { id: 'all', label: 'All FAQs' },
  { id: 'robotic', label: 'Robotic Surgery (Da Vinci)' },
  { id: 'insurance', label: 'Private Medical Insurance' },
  { id: 'fees', label: 'Self-Pay & Fees' },
  { id: 'recovery', label: 'Recovery & Hospital Stay' },
  { id: 'referrals', label: 'GP Referrals & Booking' },
];

export const allFaqs: FAQItem[] = [
  {
    id: "faq-1",
    category: "robotic",
    question: "Does the surgical robot perform the operation automatically on its own?",
    answer: "No, absolutely not. The Da Vinci robotic system cannot move or make any decisions on its own. It is completely controlled by Professor Sheth from an ergonomic console in the operating theatre. Every single millimeter movement of the wristed micro-instruments is a direct, filtered translation of Professor Sheth's real-time hand and finger motions.",
    keyTakeaway: "The robot is a high-precision extension of the surgeon's hands; the surgeon performs every second of the operation."
  },
  {
    id: "faq-2",
    category: "robotic",
    question: "Is robotic surgery more expensive than traditional keyhole surgery?",
    answer: "For privately insured patients, most major UK health insurance policies (including Bupa, AXA Health, Aviva, and Vitality) cover robotic procedures when performed at recognized robotic centres like The Clementine Churchill Hospital, subject to your policy terms. For self-funding patients, inclusive hospital package rates are available and often comparable to standard advanced laparoscopic surgery.",
    keyTakeaway: "Most private insurers cover robotic surgery when clinically indicated by a recognized consultant."
  },
  {
    id: "faq-3",
    category: "insurance",
    question: "Which private health insurance providers does Prof. Hemant Sheth accept?",
    answer: "Prof. Hemant Sheth is recognized by all leading UK and international private healthcare insurers, including Bupa (Premier Consultant), AXA Health, Aviva Health, Vitality Health, WPA, Cigna Healthcare, Allianz Worldwide Care, Healix, Exeter Friendly, and Police Mutual. His GMC Number is 4567912.",
    keyTakeaway: "Fully recognized by all major private healthcare insurers with fee-assured consultant status."
  },
  {
    id: "faq-4",
    category: "insurance",
    question: "What do I need from my insurer before booking an appointment?",
    answer: "Before your consultation, contact your insurer to notify them that you wish to see Professor Hemant Sheth for your symptoms. Your insurer will provide an Authorisation Code (pre-authorisation number). Please bring this code along with your Membership / Policy Number to your appointment so the hospital can settle your account directly.",
    keyTakeaway: "Obtain a pre-authorisation code and policy number from your insurer before attending."
  },
  {
    id: "faq-5",
    category: "fees",
    question: "How much does a private consultation cost if I am paying for myself (self-pay)?",
    answer: "An initial private consultation with Professor Hemant Sheth is £250. A follow-up consultation is typically £180. Any diagnostic investigations recommended during the consultation (such as ultrasound scans, MRI, or blood tests) are billed separately by the hospital diagnostic department, who will provide clear upfront pricing.",
    keyTakeaway: "Initial consultation fee is £250; transparent fixed package quotes are provided for all operations."
  },
  {
    id: "faq-6",
    category: "fees",
    question: "Can I get an all-inclusive package price for my surgery?",
    answer: "Yes. For self-pay patients, our partner hospitals (The Clementine Churchill, Spire Bushey, and The Wellington Hospital) offer fixed-price surgery packages. These all-inclusive quotes encompass surgeon fees, anaesthetist fees, theatre costs, hospital accommodation, standard medications, and routine post-operative follow-up visits.",
    keyTakeaway: "Fixed all-inclusive hospital packages protect you from unexpected surgical or hospital expenses."
  },
  {
    id: "faq-7",
    category: "recovery",
    question: "How soon can I return to driving and work after keyhole or robotic surgery?",
    answer: "For day-case laparoscopic or robotic gallbladder or hernia repairs, most patients return to gentle desk work within 7 to 10 days. You may resume driving once you are completely free of pain and can perform a safe emergency brake stop without hesitation (typically around 5 to 7 days post-op). Professor Sheth will provide personalized return-to-work fitness certificates.",
    keyTakeaway: "Most desk-based work resumes in 7-10 days; driving is safe once you can comfortably execute an emergency stop."
  },
  {
    id: "faq-8",
    category: "referrals",
    question: "Do I need a GP referral letter to book a private consultation?",
    answer: "While having a referral letter from your General Practitioner (GP) is recommended and often required by private health insurance policies to authorize payment, self-funding patients can frequently self-refer directly for private assessment without a GP letter. You can contact our private practice secretary directly to discuss your circumstances.",
    keyTakeaway: "GP referral is required by insurers, but self-pay patients can often book directly."
  },
  {
    id: "faq-9",
    category: "referrals",
    question: "Does Prof. Sheth offer multilingual consultations for non-English speakers?",
    answer: "Yes. Professor Sheth is fluent in English, Gujarati, Hindi, Marathi, and Konkani. If you or a family member feel more comfortable communicating clinical details in your mother tongue, consultations can be conducted smoothly without language barriers.",
    keyTakeaway: "Consultations available in English, Gujarati, Hindi, Marathi, and Konkani."
  }
];
