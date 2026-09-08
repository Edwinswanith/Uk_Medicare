import React from 'react';
import { X, Star, Heart, Award, Building, Calendar, Quote } from 'lucide-react';
import { TestimonialCard } from '../data/testimonials';

interface CardModalProps {
  card: TestimonialCard | null;
  onClose: () => void;
}

export const CardModal: React.FC<CardModalProps> = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#fffefc] rounded-2xl shadow-2xl border border-amber-200/80 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {card.type === 'patient-card' ? (
              <span className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-500/30">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Patient Thank-You Card</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/30">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Colleague &amp; Peer Endorsement</span>
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Body - Styled like a cherished physical card / letter */}
        <div className="p-6 sm:p-8 paper-card max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Card Stamp / Hospital Header */}
          <div className="flex items-start justify-between border-b border-amber-200/60 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-navy-900">
                {card.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                {card.hospital && (
                  <span className="flex items-center space-x-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{card.hospital}</span>
                  </span>
                )}
                {card.date && (
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{card.date}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Star Rating Badge */}
            <div className="flex items-center space-x-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              {[...Array(card.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
              ))}
            </div>
          </div>

          {/* Highlight Quote Box */}
          <div className="bg-amber-50/70 border-l-4 border-amber-400 p-4 rounded-r-xl italic font-serif text-slate-700 text-sm sm:text-base leading-relaxed relative">
            <Quote className="w-6 h-6 text-amber-300 absolute top-2 right-2 opacity-50 pointer-events-none" />
            &ldquo;{card.highlightedQuote}&rdquo;
          </div>

          {/* Full Card Transcript */}
          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            <p className="whitespace-pre-line">
              {card.fullMessage}
            </p>
          </div>

          {/* Signature Block */}
          <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between">
            <div>
              <p className="font-serif font-bold text-navy-900 text-base sm:text-lg">
                {card.author}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {card.roleOrRelation}
              </p>
              {card.procedure && (
                <p className="text-xs text-teal-700 font-semibold mt-0.5">
                  Treatment: {card.procedure}
                </p>
              )}
            </div>

            <div className="text-right">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Verified Feedback
              </span>
              <span className="text-xs font-serif text-teal-800 italic">
                KeyholeSurgeon Archive
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-navy-900 bg-white border border-slate-300 hover:border-slate-400 rounded-lg shadow-sm transition"
          >
            Close Card
          </button>
        </div>

      </div>
    </div>
  );
};
