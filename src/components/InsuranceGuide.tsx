import React, { useState } from 'react';
import { ShieldCheck, PoundSterling, CheckCircle, FileText, ArrowRight, HelpCircle } from 'lucide-react';

interface InsuranceGuideProps {
  onOpenBooking: () => void;
}

export const InsuranceGuide: React.FC<InsuranceGuideProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'insured' | 'selfpay'>('insured');

  const insurers = [
    { name: "Bupa", badge: "Fee-Assured Consultant", note: "Direct billing via Bupa provider network" },
    { name: "AXA Health", badge: "Recognised Specialist", note: "Covered across all outpatient & day units" },
    { name: "Aviva Health", badge: "Approved Consultant", note: "Fast-track pre-authorisation accepted" },
    { name: "Vitality Health", badge: "Premier Partner", note: "Consultant directory listed" },
    { name: "WPA", badge: "Fee-Appointed", note: "Direct claim settlement" },
    { name: "Cigna Healthcare", badge: "Global & UK", note: "Comprehensive international cover accepted" },
    { name: "Allianz Care", badge: "International", note: "Embassy and overseas coverage" },
    { name: "Healix Health", badge: "Corporate & Private", note: "Direct billing protocol" },
  ];

  return (
    <section id="insurance" className="py-24 bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Insurance &amp; Financial Navigation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy-900 tracking-tight">
            Transparent Care for <span className="text-teal-600">Insured &amp; Self-Pay</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
            We believe in complete pricing transparency. Whether you hold private medical insurance or are funding your own treatment, our team ensures a clear, stress-free pathway.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab('insured')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition flex items-center space-x-2 ${
                activeTab === 'insured'
                  ? 'bg-navy-900 text-white shadow'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Privately Insured Patients</span>
            </button>

            <button
              onClick={() => setActiveTab('selfpay')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition flex items-center space-x-2 ${
                activeTab === 'selfpay'
                  ? 'bg-navy-900 text-white shadow'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <PoundSterling className="w-4 h-4" />
              <span>Self-Funding (Self-Pay)</span>
            </button>
          </div>
        </div>

        {/* Insured Pathway */}
        {activeTab === 'insured' && (
          <div className="space-y-12 animate-fadeIn">
            {/* 4-Step How to Book with Insurance */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
                <span className="text-3xl font-serif font-bold text-teal-600/30 absolute top-4 right-4">01</span>
                <h4 className="font-serif font-bold text-base text-navy-900 mb-2">GP Referral</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Obtain an open referral or named referral to <strong>Professor Hemant Sheth</strong> from your GP.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
                <span className="text-3xl font-serif font-bold text-teal-600/30 absolute top-4 right-4">02</span>
                <h4 className="font-serif font-bold text-base text-navy-900 mb-2">Pre-Authorisation</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Contact your insurance company with Prof. Sheth's details (GMC 4567912) to receive an authorization code.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
                <span className="text-3xl font-serif font-bold text-teal-600/30 absolute top-4 right-4">03</span>
                <h4 className="font-serif font-bold text-base text-navy-900 mb-2">Book Appointment</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Schedule your consultation online or with our secretary at Clementine Churchill, Spire Bushey, or Wellington Elstree.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
                <span className="text-3xl font-serif font-bold text-teal-600/30 absolute top-4 right-4">04</span>
                <h4 className="font-serif font-bold text-base text-navy-900 mb-2">Direct Settlement</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  We bill your insurer directly for consultations and procedures, minimizing out-of-pocket paperwork.
                </p>
              </div>
            </div>

            {/* Recognized Insurers Grid */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="font-serif font-bold text-xl text-navy-900 mb-6 text-center">
                Recognized by Leading Healthcare Insurers
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {insurers.map((ins, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                    <p className="font-serif font-bold text-base text-navy-900">{ins.name}</p>
                    <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      {ins.badge}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">{ins.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Self-Pay Pathway */}
        {activeTab === 'selfpay' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Initial Consultation */}
              <div className="p-8 rounded-3xl bg-white border-2 border-teal-500 shadow-xl relative flex flex-col justify-between">
                <div className="absolute -top-3.5 left-8 bg-teal-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Most Popular
                </div>

                <div>
                  <h4 className="font-serif font-bold text-2xl text-navy-900">
                    Initial Private Consultation
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Comprehensive in-person surgical assessment &amp; examination
                  </p>

                  <div className="my-6">
                    <span className="text-4xl font-serif font-bold text-navy-900">&pound;250</span>
                    <span className="text-xs text-slate-500 ml-1">fixed fee</span>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Up to 30-40 minutes dedicated consultant consultation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Full clinical history and physical examination</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Review of previous scans, endoscopies, and reports</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Written clinical letter sent to you and your GP</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <button
                    onClick={onOpenBooking}
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 rounded-xl shadow transition"
                  >
                    Book Initial Consultation
                  </button>
                </div>
              </div>

              {/* Follow-Up Consultation */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-2xl text-navy-900">
                    Follow-Up Consultation
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Results review, post-operative check, or ongoing review
                  </p>

                  <div className="my-6">
                    <span className="text-4xl font-serif font-bold text-navy-900">&pound;180</span>
                    <span className="text-xs text-slate-500 ml-1">fixed fee</span>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Detailed review of diagnostic imaging or biopsy results</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Discussion of personalized treatment pathway</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Post-operative wound inspection and guidance</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200">
                  <button
                    onClick={onOpenBooking}
                    className="w-full bg-white hover:bg-slate-100 text-navy-900 border border-slate-300 font-semibold py-3 rounded-xl shadow-xs transition"
                  >
                    Schedule Follow-Up
                  </button>
                </div>
              </div>

              {/* All-Inclusive Surgery Packages */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-2xl text-navy-900">
                    All-Inclusive Surgery Packages
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Fixed-price quotes provided prior to surgery with zero hidden fees
                  </p>

                  <div className="my-6">
                    <span className="text-2xl font-serif font-bold text-teal-700">Transparent Quotes</span>
                    <p className="text-xs text-slate-500 mt-1">Guaranteed package protection</p>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Surgeon &amp; Consultant Anaesthetist fees included</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Operating theatre, equipment &amp; mesh/implant costs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Hospital room, nursing, standard take-home medication</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Subsequent follow-up consultation included</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200">
                  <button
                    onClick={onOpenBooking}
                    className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-3 rounded-xl shadow transition"
                  >
                    Request Package Price Quote
                  </button>
                </div>
              </div>

            </div>

            {/* Finance note */}
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-center text-xs text-slate-700">
              <strong>Flexible Payment Plans Available:</strong> Partner hospitals (Circle Health Group, Spire Healthcare, and HCA Healthcare) offer 0% interest and structured medical loans for eligible self-pay patients.
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
