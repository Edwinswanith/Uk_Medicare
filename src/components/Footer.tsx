import React from 'react';
import { Phone, ChevronRight, AlertTriangle } from 'lucide-react';
import { professionalIdentity, getVerified } from '../data/professionalIdentity';
import { contactInfo, getVerifiedContact } from '../data/contactInfo';
import { clinicLocations, getClinicAvailabilitySummary } from '../data/clinics';

interface FooterProps {
  onOpenBooking: () => void;
  onViewProfile: () => void;
}

/**
 * Rebuilt from scratch against the content-safety gate — the previous
 * version of this file (unwired, never live) hardcoded the GMC number,
 * "Clinical Professor", an unsourced "30 years" stat, Syon Clinic, and
 * an unverified secretary phone number, independently of every other
 * gated data source in the app. None of that is reintroduced here.
 *
 * Every fact below is read from professionalIdentity.ts / contactInfo.ts
 * / clinics.ts and rendered only if verified. No policy links are
 * included — no GDPR-compliant privacy policy or reviewed disclaimer
 * currently exists for this rebuild (see docs/client-verification-needed.md
 * item 24); that remains a documented release blocker, not something to
 * fabricate here.
 */
export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onViewProfile }) => {
  const displayName = getVerified(professionalIdentity.displayName);
  const workingTitle = getVerified(professionalIdentity.workingTitle);
  const verifiedPhone = getVerifiedContact(contactInfo.generalPhone);

  const navLinks: Array<{ label: string; href?: string; onClick?: () => void }> = [
    { label: 'About Prof. Sheth', onClick: onViewProfile },
    { label: 'Robotic Surgery', href: '#robotic' },
    { label: 'Treatments & Specialties', href: '/treatments' },
    { label: 'Locations', href: '#clinics' },
    { label: 'Patient Info', href: '#patient-info' },
  ];

  return (
    <footer className="bg-navy-900 text-slate-300 pt-14 pb-10 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-navy-800">

          {/* Identity + closing appointment action */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              {displayName && (
                <h3 className="font-serif text-[22px] font-bold leading-tight text-white">{displayName}</h3>
              )}
              {workingTitle && (
                <p className="text-meta text-teal-300 mt-1">{workingTitle}</p>
              )}
            </div>

            <p className="text-body-small text-slate-300 max-w-sm">
              Consultant-led assessment and minimally invasive laparoscopic and robotic-assisted
              surgical care across London and Hertfordshire.
            </p>

            <button
              onClick={onOpenBooking}
              className="text-button inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2.5 px-4 rounded-lg transition"
            >
              Book a Consultation
            </button>
          </div>

          {/* Section navigation */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-[15px] text-white uppercase tracking-[0.08em]">
              Explore
            </h4>
            <ul className="space-y-2 text-body-small text-slate-300">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      type="button"
                      onClick={link.onClick}
                      className="hover:text-teal-300 transition flex items-center gap-1 text-left"
                    >
                      <ChevronRight className="w-3 h-3 text-teal-500 shrink-0" />
                      <span>{link.label}</span>
                    </button>
                  ) : (
                    <a href={link.href} className="hover:text-teal-300 transition flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 text-teal-500 shrink-0" />
                      <span>{link.label}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Locations + contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-[15px] text-white uppercase tracking-[0.08em]">
              Practice Locations
            </h4>
            <ul className="space-y-2 text-body-small text-slate-300">
              {clinicLocations.map((clinic) => {
                const availability = getClinicAvailabilitySummary(clinic);

                return (
                  <li key={clinic.id}>
                    <a href="#clinics" className="block rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 transition hover:border-teal-400/40 hover:bg-white/[0.06]">
                      <span className="block font-bold text-white">{clinic.shortName}</span>
                      <span className="mt-0.5 block text-caption text-slate-400">
                        {availability.join('; ')}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {verifiedPhone && (
              <a
                href={verifiedPhone.href}
                className="inline-flex items-center gap-1.5 text-teal-300 font-semibold hover:underline pt-1"
              >
                <Phone className="w-3.5 h-3.5" />
                {verifiedPhone.display}
              </a>
            )}
          </div>

        </div>

        {/* Emergency guidance — general, always-true safety information,
            not a claim about this practice specifically */}
        <div className="text-form-help flex items-start gap-2 pt-6 text-amber-100 max-w-2xl">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p>
            If you are experiencing a medical emergency, call 999 or attend your nearest A&amp;E.
            This website is not monitored for urgent or emergency enquiries.
          </p>
        </div>

        {/* Copyright + educational-purpose note */}
        <div className="text-caption pt-6 text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} {displayName ?? 'Prof. Hemant Sheth'}. All rights reserved.</p>
          <p className="text-caption text-slate-400 max-w-xl">
            Medical information provided on this website is for general educational purposes only
            and does not substitute for formal clinical consultation with a registered specialist.
          </p>
        </div>

      </div>
    </footer>
  );
};
