import React from 'react';
import { patientJourneySteps } from '../data/patientJourney';

export const PatientJourneySection: React.FC = () => {
  return (
    <section id="patient-info" className="py-20 lg:py-24 bg-slate-50 text-slate-800 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
          <p className="text-eyebrow text-teal-700">
            Your care journey
          </p>
          <h2 className="text-section-title text-navy-900">
            From enquiry to follow-up
          </h2>
          <p className="text-lead text-slate-600">
            Assessment comes first. Surgery is recommended only when appropriate.
          </p>
        </div>

        <ol className="relative space-y-8 sm:space-y-0">
          {/* Connecting line on larger screens */}
          <div className="hidden sm:block absolute left-[19px] top-2 bottom-2 w-px bg-slate-200" aria-hidden="true" />

          {patientJourneySteps.map((step, idx) => (
            <li key={step.title} className="relative flex items-start gap-5 sm:pb-8 last:pb-0">
              <span className="shrink-0 relative z-10 w-10 h-10 rounded-full bg-navy-900 text-white text-base font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="font-serif font-bold text-navy-900 text-[19px] sm:text-[21px] leading-snug">
                  {step.title}
                </h3>
                <p className="text-body-small text-slate-600 mt-1">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
};
