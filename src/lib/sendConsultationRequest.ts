import emailjs from '@emailjs/browser';

/** Inbox for consultation enquiries (also set as default "To" in your EmailJS template). */
export const CONSULTATION_INBOX_EMAIL = 'LondonRoboticSurgeon@gmail.com';

export type ConsultationRequestPayload = {
  patientType: 'insured' | 'selfpay';
  selectedHospital: string;
  procedure: string;
  fullName: string;
  phone: string;
  email: string;
  preferredDays: string;
  insurerName: string;
  authCode: string;
};

type EmailJsConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};

function getEmailJsConfig(): EmailJsConfig | null {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

  if (!serviceId || !templateId || !publicKey) {
    return null;
  }

  return { serviceId, templateId, publicKey };
}

function buildMessageBody(payload: ConsultationRequestPayload): string {
  const funding =
    payload.patientType === 'insured'
      ? `Private medical insurance (${payload.insurerName || 'not specified'})`
      : 'Self-funding (direct pay)';

  const lines = [
    'New consultation request from keyholesurgeon.co.uk',
    '',
    `Funding: ${funding}`,
    `Hospital: ${payload.selectedHospital}`,
    `Procedure / concern: ${payload.procedure}`,
    `Preferred timing: ${payload.preferredDays}`,
    '',
    `Patient name: ${payload.fullName}`,
    `Telephone: ${payload.phone}`,
    `Email: ${payload.email}`,
  ];

  if (payload.patientType === 'insured') {
    lines.push(`Insurance provider: ${payload.insurerName || '—'}`);
    lines.push(`Pre-authorisation code: ${payload.authCode || '—'}`);
  }

  return lines.join('\n');
}

export async function sendConsultationRequest(payload: ConsultationRequestPayload): Promise<void> {
  const config = getEmailJsConfig();
  if (!config) {
    throw new Error(
      'Email is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file.'
    );
  }

  const templateParams = {
    to_email: CONSULTATION_INBOX_EMAIL,
    title: `New consultation request from ${payload.fullName}`,
    name: payload.fullName,
    email: payload.email,
    reply_to: payload.email,
    from_name: payload.fullName,
    patient_name: payload.fullName,
    patient_phone: payload.phone,
    patient_email: payload.email,
    funding_type: payload.patientType === 'insured' ? 'Private medical insurance' : 'Self-funding',
    hospital: payload.selectedHospital,
    procedure: payload.procedure,
    preferred_timing: payload.preferredDays,
    insurer_name: payload.patientType === 'insured' ? payload.insurerName : 'N/A',
    auth_code: payload.patientType === 'insured' ? payload.authCode || '—' : 'N/A',
    message: buildMessageBody(payload),
  };

  await emailjs.send(config.serviceId, config.templateId, templateParams, {
    publicKey: config.publicKey,
  });
}
