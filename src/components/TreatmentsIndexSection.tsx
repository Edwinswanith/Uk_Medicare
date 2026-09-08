import React from 'react';
import { ArrowRight } from 'lucide-react';
import { treatmentsIndex, treatmentsIndexIntro } from '../data/treatmentsIndex';

interface TreatmentsIndexSectionProps {
  onOpenBooking: (procedureName: string) => void;
}

export const TreatmentsIndexSection: React.FC<TreatmentsIndexSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="treatments" className="py-20 lg:py-24 bg-white text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy-900 tracking-tight">
            Treatments
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
            {treatmentsIndexIntro}
          </p>
        </div>

        <div className="space-y-12">
          {treatmentsIndex.map((group) => (
            <div key={group.group}>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-navy-900 mb-5 pb-3 border-b border-slate-200">
                {group.group}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {group.treatments.map((treatment) => (
                  <button
                    key={treatment.name}
                    type="button"
                    onClick={() => onOpenBooking(treatment.name)}
                    className="text-left rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-400/60 hover:shadow-md p-5 transition-all duration-200 group"
                  >
                    <h4 className="font-sans font-semibold text-navy-900 text-[15px] group-hover:text-teal-700 transition mb-1.5">
                      {treatment.name}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      {treatment.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-teal-700 mt-3 group-hover:gap-2 transition-all">
                      Enquire about this <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
