import React, { useState } from 'react';
import { Cpu, ArrowRight, Activity, Clock, CheckCircle, Shield } from 'lucide-react';
import { proceduresData, procedureCategories, ProcedureDetail } from '../data/procedures';
import { ProcedureModal } from './ProcedureModal';

interface ProceduresGridProps {
  onBookProcedure: (procedureName: string) => void;
}

export const ProceduresGrid: React.FC<ProceduresGridProps> = ({ onBookProcedure }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProcedure, setActiveProcedure] = useState<ProcedureDetail | null>(null);

  const filteredProcedures = selectedCategory === 'all'
    ? proceduresData
    : selectedCategory === 'robotic'
    ? proceduresData.filter(p => p.isRoboticAvailable)
    : proceduresData.filter(p => p.category === selectedCategory);

  return (
    <section id="procedures" className="py-24 bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Specialist Surgical Treatments</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy-900 tracking-tight">
            Comprehensive <span className="text-teal-600">Minimally Invasive</span> Care
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
            Every procedure is planned with meticulous anatomical precision to minimize postoperative discomfort, preserve healthy tissue, and ensure rapid return to normal living.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {procedureCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Procedures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProcedures.map((proc) => (
            <div
              key={proc.id}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-teal-400/60 transition-all duration-300 group"
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {proc.category}
                  </span>

                  {proc.isRoboticAvailable && (
                    <span className="flex items-center space-x-1 text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                      <Cpu className="w-3 h-3 text-teal-600" />
                      <span>Da Vinci Robotic</span>
                    </span>
                  )}
                </div>

                {/* Procedure Title */}
                <h3 className="font-serif font-bold text-xl text-navy-900 group-hover:text-teal-600 transition mb-2">
                  {proc.shortName}
                </h3>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-4">
                  {proc.tagline}
                </p>

                {/* Quick Info Points */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span><strong>Duration:</strong> {proc.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span><strong>Hospital Stay:</strong> {proc.hospitalStay.split('(')[0]}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span><strong>Recovery:</strong> {proc.recoveryTimeline.split(';')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveProcedure(proc)}
                  className="text-xs sm:text-sm font-semibold text-navy-900 group-hover:text-teal-600 flex items-center space-x-1 transition"
                >
                  <span>Explore Clinical Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onBookProcedure(proc.name)}
                  className="text-xs text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-2"
                >
                  Enquire
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Procedure Modal */}
      <ProcedureModal
        procedure={activeProcedure}
        onClose={() => setActiveProcedure(null)}
        onBookProcedure={onBookProcedure}
      />
    </section>
  );
};
