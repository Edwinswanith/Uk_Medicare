import React, { useState } from 'react';
import { Star, Heart, Award, ArrowUpRight, MessageSquareQuote, ShieldCheck, Check } from 'lucide-react';
import { testimonialCards, platformStats, TestimonialCard } from '../data/testimonials';
import { CardModal } from './CardModal';

export const TestimonialWall: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'patient-card' | 'colleague-letter'>('all');
  const [selectedCard, setSelectedCard] = useState<TestimonialCard | null>(null);

  const filteredCards = activeFilter === 'all'
    ? testimonialCards
    : testimonialCards.filter(c => c.type === activeFilter);

  return (
    <section id="testimonials" className="py-24 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-100/80 border border-teal-300 text-teal-800 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Patient Gratitude &amp; Peer Endorsements</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy-900 tracking-tight">
            Voices of Trust &amp; <span className="text-teal-600">Surgical Excellence</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
            Read authentic handwritten cards from patients whose lives were transformed, along with professional endorsements from fellow medical consultants, anaesthetists, and referring GPs.
          </p>
        </div>

        {/* Platform Trust Scorecards Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {platformStats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center hover:shadow-md transition"
            >
              <div className="flex items-center justify-center space-x-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-2xl font-serif font-bold text-navy-900">{item.rating} / 5.0</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">{item.platform}</div>
              <div className="text-[11px] text-teal-600 font-medium mt-1 bg-teal-50 py-0.5 px-2 rounded-full inline-block">
                {item.badge} ({item.reviewsCount})
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeFilter === 'all'
                  ? 'bg-navy-900 text-white shadow'
                  : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
              }`}
            >
              All Letters &amp; Cards ({testimonialCards.length})
            </button>
            <button
              onClick={() => setActiveFilter('patient-card')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center space-x-1.5 ${
                activeFilter === 'patient-card'
                  ? 'bg-navy-900 text-white shadow'
                  : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Patient Cards</span>
            </button>
            <button
              onClick={() => setActiveFilter('colleague-letter')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center space-x-1.5 ${
                activeFilter === 'colleague-letter'
                  ? 'bg-navy-900 text-white shadow'
                  : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Colleague Endorsements</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="cursor-pointer group rounded-2xl bg-white border border-amber-200/60 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative Envelope Accent on Top Right */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute transform rotate-45 bg-amber-100/60 text-amber-800 text-[9px] font-bold py-0.5 right-[-35px] top-[18px] w-[120px] text-center shadow-xs">
                  {card.type === 'patient-card' ? 'PATIENT' : 'COLLEAGUE'}
                </div>
              </div>

              <div>
                {/* Header Badge */}
                <div className="flex items-center space-x-1.5 text-xs text-amber-700 font-semibold mb-3">
                  {card.type === 'patient-card' ? (
                    <>
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>Handwritten Card &bull; {card.hospital?.split(',')[0]}</span>
                    </>
                  ) : (
                    <>
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      <span>Peer Letter &bull; {card.hospital?.split(' ')[0]}</span>
                    </>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(card.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Card Title */}
                <h3 className="font-serif font-bold text-lg text-navy-900 group-hover:text-teal-600 transition mb-3 line-clamp-1">
                  {card.title}
                </h3>

                {/* Highlight Quote */}
                <div className="bg-amber-50/60 border-l-2 border-amber-400 p-3 rounded-r-lg italic text-xs text-slate-700 mb-3">
                  &ldquo;{card.highlightedQuote}&rdquo;
                </div>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light line-clamp-3">
                  {card.excerpt}
                </p>
              </div>

              {/* Author & Read Full Link */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-serif font-bold text-sm text-navy-900">
                    {card.author}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {card.roleOrRelation}
                  </p>
                </div>

                <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-teal-500 group-hover:text-white flex items-center justify-center text-slate-600 transition shrink-0 ml-2">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Patient Reassurance Footer Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-850 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-serif font-bold text-white">
              Every Patient Treated with Dignity, Precision &amp; Genuine Care
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-2xl">
              Whether you are consulting for acute abdominal pain, a hernia repair, or long-standing acid reflux, you receive individualized attention from consultation to full recovery.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-xs text-teal-300 font-medium">Over 30 Years of Dedication</span>
            <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

      </div>

      {/* Full Card Modal Viewer */}
      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </section>
  );
};
