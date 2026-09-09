import React, { useState, useRef, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import {
  clinicLocations,
  formatClinicAvailability,
  getClinicAvailabilitySummary,
} from '../data/clinics';
import { contactInfo, getVerifiedContact } from '../data/contactInfo';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProcedure?: string;
  preselectedClinicId?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedProcedure,
  preselectedClinicId,
}) => {
  const [patientType, setPatientType] = useState<'insured' | 'selfpay'>('insured');
  const [selectedHospital, setSelectedHospital] = useState<string>(clinicLocations[0].name);
  const [procedure, setProcedure] = useState<string>(preselectedProcedure || 'Robotic Surgery Assessment');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDays, setPreferredDays] = useState('Any listed clinic time');
  const [insurerName, setInsurerName] = useState('Bupa');
  const [authCode, setAuthCode] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const verifiedPhone = getVerifiedContact(contactInfo.generalPhone);
  const verifiedEmail = getVerifiedContact(contactInfo.email);
  const verifiedTurnaround = getVerifiedContact(contactInfo.enquiryTurnaround);

  useEffect(() => {
    if (!isOpen) return;

    const matchingClinic = clinicLocations.find((clinic) => clinic.id === preselectedClinicId);
    setSelectedHospital(matchingClinic?.name ?? clinicLocations[0].name);
    setPreferredDays('Any listed clinic time');
    setProcedure(preselectedProcedure || 'Robotic Surgery Assessment');
  }, [isOpen, preselectedClinicId, preselectedProcedure]);

  const closeModal = () => {
    setIsSubmitted(false);
    onClose();
  };

  // Focus management + body scroll lock, scoped to this modal's open state.
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the dialog panel itself first so its accessible name (the
    // heading) is announced before landing on any individual control.
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      previouslyFocusedElement.current?.focus();
    };
  }, [isOpen]);

  // Move focus to the success heading when the form transitions to the
  // confirmation state, so it's announced once without a separate live region.
  useEffect(() => {
    if (isSubmitted) {
      successHeadingRef.current?.focus();
    }
  }, [isSubmitted]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      closeModal();
      return;
    }

    if (e.key === 'Tab' && dialogRef.current) {
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      // Initial focus sits on the dialog container itself (not in
      // `focusable`, since it's not part of the tab sequence going
      // forward) — treat that as equivalent to "at the first field" so
      // Shift+Tab from the untouched dialog wraps to the last control
      // instead of escaping to the page behind it.
      const atStart = document.activeElement === first || document.activeElement === dialogRef.current;

      if (e.shiftKey && atStart) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const sectionLabelClass = 'text-form-label block font-bold text-slate-700 uppercase tracking-[0.08em] mb-2';
  const labelClass = 'text-form-label block text-slate-700 mb-1.5';
  const inputClass = 'w-full text-base leading-6 p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#294363]';
  const compactInputClass = 'w-full text-base leading-6 p-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#294363]';
  const selectedClinic =
    clinicLocations.find((clinic) => clinic.name === selectedHospital) ?? clinicLocations[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn"
      onClick={closeModal}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
        tabIndex={-1}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Modal Header */}
        <div className="bg-[#17293e] text-white p-6 sm:p-7 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-eyebrow text-slate-200">
              Private Practice Direct Booking
            </span>
            <h3 id="consultation-modal-title" className="text-subsection-title text-white">
              Request a Consultation with Prof. Sheth
            </h3>
            {verifiedPhone && (
              <p className="text-meta text-slate-200">
                London &amp; Hertfordshire Clinics &bull; Tel: {verifiedPhone.display}
              </p>
            )}
          </div>

          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            aria-label="Close consultation request dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Patient Funding Type */}
              <div>
                <span id="funding-type-label" className={sectionLabelClass}>
                  1. How will you be funding your treatment?
                </span>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="group" aria-labelledby="funding-type-label">
                  <button
                    type="button"
                    aria-pressed={patientType === 'insured'}
                    onClick={() => setPatientType('insured')}
                    className={`text-button py-3 px-4 rounded-xl font-bold border text-center transition ${
                      patientType === 'insured'
                        ? 'bg-[#294363] text-white border-[#294363] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Private Medical Insurance
                  </button>

                  <button
                    type="button"
                    aria-pressed={patientType === 'selfpay'}
                    onClick={() => setPatientType('selfpay')}
                    className={`text-button py-3 px-4 rounded-xl font-bold border text-center transition ${
                      patientType === 'selfpay'
                        ? 'bg-[#294363] text-white border-[#294363] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Self-Funding (Direct Pay)
                  </button>
                </div>
              </div>

              {/* Preferred Hospital Location */}
              <div>
                <label htmlFor="consult-hospital" className={sectionLabelClass}>
                  2. Choose Preferred Hospital Location
                </label>
                <select
                  id="consult-hospital"
                  value={selectedHospital}
                  onChange={(e) => {
                    setSelectedHospital(e.target.value);
                    setPreferredDays('Any listed clinic time');
                  }}
                  className={`${inputClass} font-medium`}
                >
                  {clinicLocations.map((clinic) => (
                    <option key={clinic.id} value={clinic.name}>
                      {clinic.shortName} ({clinic.postcode}) - {getClinicAvailabilitySummary(clinic).join('; ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition / Procedure of Interest */}
              <div>
                <label htmlFor="consult-procedure" className={sectionLabelClass}>
                  3. Procedure or Condition of Concern
                </label>
                <select
                  id="consult-procedure"
                  value={procedure}
                  onChange={(e) => setProcedure(e.target.value)}
                  className={`${inputClass} font-medium`}
                >
                  <option value="Robotic Surgery Assessment">Robotic Surgery Assessment (Da Vinci Xi)</option>
                  <option value="Gallbladder & Gallstones">Gallbladder &amp; Gallstones (Cholecystectomy)</option>
                  <option value="Acid Reflux & Heartburn">Acid Reflux &amp; Heartburn (Hiatus Hernia / GERD)</option>
                  <option value="Hernia Repair">Hernia Repair (Inguinal, Umbilical, Incisional)</option>
                  <option value="Diagnostic Endoscopy (Gastroscopy)">Diagnostic Endoscopy (Gastroscopy)</option>
                  <option value="General Abdominal Second Opinion">General Abdominal Consultation</option>
                </select>
              </div>

              {/* Insurer Fields if Insured */}
              {patientType === 'insured' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <label htmlFor="consult-insurer" className={labelClass}>
                      Insurance Provider
                    </label>
                    <input
                      id="consult-insurer"
                      type="text"
                      placeholder="e.g. Bupa, AXA Health, Aviva, Vitality, WPA"
                      value={insurerName}
                      onChange={(e) => setInsurerName(e.target.value)}
                      className={compactInputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="consult-authcode" className={labelClass}>
                      Pre-Authorisation Code (If available)
                    </label>
                    <input
                      id="consult-authcode"
                      type="text"
                      placeholder="e.g. 12345678"
                      value={authCode}
                      onChange={(e) => setAuthCode(e.target.value)}
                      className={compactInputClass}
                    />
                  </div>
                </div>
              )}

              {/* Contact Details */}
              <div className="space-y-4">
                <span id="contact-details-label" className="text-form-label block font-bold text-slate-700 uppercase tracking-[0.08em]">
                  4. Patient Contact Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="consult-fullname" className={labelClass}>Full Name *</label>
                    <input
                      id="consult-fullname"
                      type="text"
                      required
                      aria-required="true"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="consult-phone" className={labelClass}>Telephone *</label>
                    <input
                      id="consult-phone"
                      type="tel"
                      required
                      aria-required="true"
                      placeholder="07... or 020..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="consult-email" className={labelClass}>Email Address *</label>
                    <input
                      id="consult-email"
                      type="email"
                      required
                      aria-required="true"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="consult-timing" className={labelClass}>Preferred Timing</label>
                    <select
                      id="consult-timing"
                      value={preferredDays}
                      onChange={(e) => setPreferredDays(e.target.value)}
                      className={inputClass}
                    >
                      <option value="Any listed clinic time">Any listed time at selected clinic</option>
                      {selectedClinic.availability.map((period) => (
                        <option key={period.id} value={formatClinicAvailability(period)}>
                          {formatClinicAvailability(period)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="text-button w-full bg-[#294363] hover:bg-[#1e3450] text-white font-bold py-3.5 rounded-xl shadow transition flex items-center justify-center space-x-2 uppercase tracking-[0.08em]"
                >
                  <span>Submit Consultation Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-form-help text-slate-500 text-center mt-2">
                  This submits an enquiry only — it does not confirm an appointment. Our private secretary will contact you to arrange a time.
                </p>
              </div>

            </form>
          ) : (
            /* Submission Success Screen */
            <div className="py-8 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-[#294363] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="text-subsection-title text-slate-900 focus:outline-none"
                >
                  Thank You, {fullName}
                </h4>
                <p className="text-body-small text-slate-600 max-w-md mx-auto">
                  Your enquiry for <strong>{procedure}</strong> at <strong>{selectedHospital}</strong>
                  {preferredDays !== 'Any listed clinic time' ? (
                    <>
                      {' '}
                      on <strong>{preferredDays}</strong>
                    </>
                  ) : null}{' '}
                  has been submitted.
                </p>
              </div>

              {(verifiedPhone || verifiedEmail || verifiedTurnaround) && (
                <div className="text-body-small bg-slate-50 p-4 rounded-xl border border-slate-200 max-w-md mx-auto text-left space-y-1.5 text-slate-700">
                  {verifiedPhone && (
                    <p><strong>{verifiedPhone.label}:</strong> {verifiedPhone.display}</p>
                  )}
                  {verifiedEmail && (
                    <p><strong>Email:</strong> {verifiedEmail.display}</p>
                  )}
                  {verifiedTurnaround && (
                    <p><strong>Turnaround:</strong> {verifiedTurnaround}</p>
                  )}
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={closeModal}
                  className="text-button px-6 py-2 bg-[#294363] hover:bg-[#1e3450] text-white font-bold rounded-lg uppercase tracking-[0.08em] transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
