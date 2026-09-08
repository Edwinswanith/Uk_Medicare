import React from 'react';
import { roboticOverview } from '../data/roboticData';

interface RoboticComparisonSectionProps {
  onOpenBooking?: () => void;
}

export const RoboticComparisonSection: React.FC<RoboticComparisonSectionProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="robotic-comparison"
      className="relative w-full bg-[#0a1c33] text-white py-20 lg:py-24 overflow-hidden border-t border-sky-950/50"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <p className="text-eyebrow text-[#38bdf8]">
            Compare approaches
          </p>
          <h2
            className="text-section-title text-white"
            style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
          >
            Open, laparoscopic or robotic — how they differ
          </h2>
          <p className="text-body text-sky-100">
            Diagnosis, anatomy and hospital pathway determine which approach suits you. This is a general guide, not a recommendation.
          </p>
        </div>

        <div className="rounded-2xl border border-white/15 bg-[#081528]/80 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[15px] sm:text-base leading-relaxed">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-sky-100">
                  <th className="py-4 px-5 sm:px-6 font-semibold w-1/4">Surgical Aspect</th>
                  <th className="py-4 px-5 sm:px-6 font-semibold w-1/4">Traditional Open</th>
                  <th className="py-4 px-5 sm:px-6 font-semibold w-1/4">Laparoscopic</th>
                  <th className="py-4 px-5 sm:px-6 font-semibold w-1/4 text-[#38bdf8] bg-sky-950/30">
                    Robotic (Da Vinci Xi)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sky-100/80">
                {roboticOverview.comparisons.map((row) => (
                  <tr key={row.feature} className="hover:bg-white/[0.03] transition">
                    <td className="py-4 px-5 sm:px-6 font-semibold text-white">
                      {row.feature}
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-sky-100/85">
                      {row.open}
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-sky-100/90">
                      {row.laparoscopic}
                    </td>
                    <td className="py-4 px-5 sm:px-6 font-medium text-sky-100 bg-sky-950/20">
                      {row.robotic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02]">
            <p className="text-body-small text-sky-100">
              Not sure which approach is suitable for your condition?
            </p>
            <button
              type="button"
              onClick={onOpenBooking}
              className="text-button inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0c2747]/90 hover:bg-[#38bdf8] text-white hover:text-[#081424] font-semibold border border-[#38bdf8]/70 hover:border-[#38bdf8] shadow-[0_4px_20px_rgba(56,189,248,0.2)] transition-all duration-300"
            >
              Discuss your options with Prof. Sheth
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
