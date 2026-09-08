import React, { useState } from 'react';
import { Building2, ShieldCheck, ChevronDown } from 'lucide-react';
import { aboutPositioning, credentialCategories, profileDetail } from '../data/about';

const CATEGORY_ICONS = [Building2, ShieldCheck];

export const AboutSection: React.FC = () => {
  const [showQualifications, setShowQualifications] = useState(false);

  return (
    <section id="about" className="py-20 lg:py-24 bg-white text-slate-800 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* LEFT: Positioning copy */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <p className="text-eyebrow text-teal-700">
                {aboutPositioning.eyebrow}
              </p>
              <div className="w-10 h-[2px] bg-teal-600 mt-2 rounded-full" />
            </div>

            <h2 className="text-section-title text-navy-900">
              {aboutPositioning.heading}
            </h2>

            <p className="text-meta font-semibold text-slate-500 uppercase tracking-[0.08em]">
              {aboutPositioning.workingTitle}
            </p>

            <p className="text-body text-slate-600 max-w-xl">
              {aboutPositioning.statement}
            </p>

            {/* Credential category labels */}
            <div className="flex flex-wrap gap-3 pt-1">
              {credentialCategories.map((label, idx) => {
                const Icon = CATEGORY_ICONS[idx];
                return (
                  <span
                    key={label}
                    className="text-body-small inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-navy-900"
                  >
                    <Icon className="w-4 h-4 text-teal-600" />
                    {label}
                  </span>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#treatments"
                className="text-button inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold transition-colors"
              >
                View Conditions Treated
              </a>

              <button
                type="button"
                onClick={() => setShowQualifications((v) => !v)}
                className="text-button inline-flex items-center gap-1.5 font-semibold text-teal-700 hover:text-teal-900 transition-colors"
              >
                NHS Role &amp; Memberships
                <ChevronDown className={`w-4 h-4 transition-transform ${showQualifications ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* NHS role, memberships, languages — verified content only */}
            {showQualifications && (
              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4 animate-fadeIn">
                <div className="text-body-small grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
                  <div>
                    <p className="font-semibold text-navy-900 mb-1">NHS role</p>
                    <p>{profileDetail.nhsRole}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 mb-1">Professional memberships</p>
                    <ul className="space-y-0.5">
                      {profileDetail.memberships.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 mb-1">Languages spoken</p>
                    <p>{profileDetail.languages.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Side card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-7">
              <p className="text-body-small text-slate-700">
                {aboutPositioning.sideCard}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
