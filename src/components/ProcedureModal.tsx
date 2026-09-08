import React from 'react';
import { X, Cpu, Clock, Building, Calendar, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { ProcedureDetail } from '../data/procedures';

interface ProcedureModalProps {
  procedure: ProcedureDetail | null;
  onClose: () => void;
  onBookProcedure: (procedureName: string) => void;
}

export const ProcedureModal: React.FC<ProcedureModalProps> = ({ procedure, onClose, onBookProcedure }) => {
  if (!procedure) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-slate-900 text-white p-6 sm:p-8 flex items-start justify-between relative">
          <div className="space-y-2 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                {procedure.category}
              </span>
              {procedure.isRoboticAvailable && (
                <span className="flex items-center space-x-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                  <Cpu className="w-3 h-3 text-teal-400" />
                  <span>Da Vinci Robotic Available</span>
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              {procedure.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-light">
              {procedure.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition shrink-0"
            aria-label="Close procedure modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-8">
          
          {/* AEO Direct Answer Summary Box */}
          <div className="bg-teal-50/70 border border-teal-200 p-4 sm:p-5 rounded-xl">
            <div className="flex items-center space-x-2 text-teal-900 font-semibold text-xs uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              <span>Quick Clinical Summary &amp; Overview</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {procedure.aeoSummary}
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Clock className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <div className="text-[11px] text-slate-400 font-medium">Duration</div>
              <div className="text-xs font-semibold text-navy-900 mt-0.5">{procedure.duration}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Building className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <div className="text-[11px] text-slate-400 font-medium">Hospital Stay</div>
              <div className="text-xs font-semibold text-navy-900 mt-0.5">{procedure.hospitalStay.split('(')[0]}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Calendar className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <div className="text-[11px] text-slate-400 font-medium">Anaesthesia</div>
              <div className="text-xs font-semibold text-navy-900 mt-0.5">{procedure.anaesthesia.split('(')[0]}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <div className="text-[11px] text-slate-400 font-medium">Desk Work</div>
              <div className="text-xs font-semibold text-navy-900 mt-0.5">7 - 10 Days</div>
            </div>
          </div>

          {/* Symptoms Treated */}
          <div>
            <h4 className="font-serif font-bold text-lg text-navy-900 mb-3">
              Symptoms &amp; Clinical Indications
            </h4>
            <div className="space-y-2">
              {procedure.symptoms.map((symptom, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{symptom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Surgical Approach & Technique */}
          <div className="border-t border-slate-100 pt-6">
            <h4 className="font-serif font-bold text-lg text-navy-900 mb-2">
              Surgical Approach &amp; Technique
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {procedure.approach}
            </p>
          </div>

          {/* Recovery Timeline */}
          <div className="border-t border-slate-100 pt-6">
            <h4 className="font-serif font-bold text-lg text-navy-900 mb-2">
              Recovery Timeline &amp; Discharge
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {procedure.recoveryTimeline}
            </p>
          </div>

          {/* Procedure Specific FAQs */}
          {procedure.faqs && procedure.faqs.length > 0 && (
            <div className="border-t border-slate-100 pt-6">
              <h4 className="font-serif font-bold text-lg text-navy-900 mb-4 flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-teal-600" />
                <span>Frequently Asked Questions</span>
              </h4>

              <div className="space-y-3">
                {procedure.faqs.map((faq, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="text-xs sm:text-sm font-semibold text-navy-900">
                      {faq.question}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Covered by Bupa, AXA, Aviva, Vitality &amp; Self-Pay options available.
          </p>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-navy-900 bg-white border border-slate-300 rounded-xl shadow-sm transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookProcedure(procedure.name);
              }}
              className="w-1/2 sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow transition flex items-center justify-center space-x-1.5"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
