import React, { useState } from 'react';
import { Cpu, Award, Play, CheckCircle2, ChevronRight, Eye, Move3d, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { roboticOverview } from '../data/roboticData';

interface RoboticShowcaseProps {
  onOpenBooking: () => void;
  onSelectProcedure: (procedureId: string) => void;
}

export const RoboticShowcase: React.FC<RoboticShowcaseProps> = ({ onOpenBooking, onSelectProcedure }) => {
  const [activeTab, setActiveTab] = useState<'benefits' | 'comparison' | 'video'>('benefits');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <section id="robotic-surgery" className="py-24 bg-gradient-to-b from-navy-900 via-navy-850 to-slate-900 text-white relative overflow-hidden">
      
      {/* Visual Accent Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <Cpu className="w-4 h-4 text-teal-400" />
            <span>State-of-the-Art Surgical Robotics</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            The Da Vinci Xi <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-100">Robotic Platform</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            Bringing aerospace-grade robotic precision, 3D high-definition visualization, and micro-articulated instruments to complex abdominal and upper gastrointestinal surgery.
          </p>
        </div>

        {/* Historic NHS Milestone Callout Card */}
        <div className="mb-14 rounded-2xl bg-gradient-to-r from-teal-900/60 via-navy-800/80 to-navy-900/90 border border-teal-500/40 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center space-x-2 text-teal-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                <Award className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Pioneering Leadership in the UK National Health Service</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {roboticOverview.nationalRecordBadge}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {roboticOverview.nationalRecordDescription}
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs sm:text-sm text-slate-200">
                <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Sub-Millimeter Tissue Handling</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Dramatically Reduced Pain</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Faster Return to Home &amp; Work</span>
                </span>
              </div>
            </div>

            {/* Video Feature Thumbnail / Player */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="w-full relative rounded-xl overflow-hidden shadow-2xl border border-teal-500/40 bg-black aspect-video group">
                {!isPlayingVideo ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-navy-950">
                    <img 
                      src={`https://img.youtube.com/vi/${roboticOverview.videoEmbedId}/maxresdefault.jpg`} 
                      alt="Ealing Hospital Robotic Surgery Record" 
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    <button
                      onClick={() => setIsPlayingVideo(true)}
                      className="absolute w-16 h-16 rounded-full bg-teal-500 hover:bg-teal-400 text-white flex items-center justify-center shadow-lg shadow-teal-500/40 group-hover:scale-110 transition-transform"
                      aria-label="Play Robotic Surgery Video"
                    >
                      <Play className="w-7 h-7 fill-white translate-x-0.5" />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 text-center">
                      <p className="text-xs font-semibold text-white drop-shadow">
                        Watch: National Record for Robotic Surgeries
                      </p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${roboticOverview.videoEmbedId}?autoplay=1`}
                    title="Robotic Surgery Feature"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-2 text-center">
                Featured coverage on NHS Trust &amp; regional medical broadcast
              </p>
            </div>

          </div>
        </div>

        {/* Tab Navigation for Robotic Insights */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl bg-navy-800/90 border border-slate-700/80 shadow-lg">
            <button
              onClick={() => setActiveTab('benefits')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'benefits'
                  ? 'bg-teal-500 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Technology &amp; Patient Benefits
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'comparison'
                  ? 'bg-teal-500 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Robotic vs Keyhole vs Open Matrix
            </button>
          </div>
        </div>

        {/* Tab 1: Technological Innovations */}
        {activeTab === 'benefits' && (
          <div className="space-y-12 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roboticOverview.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-navy-850/80 border border-slate-700/80 p-6 flex flex-col justify-between hover:border-teal-400/50 hover:bg-navy-800/80 transition group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 flex items-center justify-center group-hover:scale-105 group-hover:bg-teal-500 group-hover:text-white transition">
                      {idx === 0 && <Eye className="w-6 h-6" />}
                      {idx === 1 && <Move3d className="w-6 h-6" />}
                      {idx === 2 && <Activity className="w-6 h-6" />}
                      {idx === 3 && <ShieldCheck className="w-6 h-6" />}
                    </div>

                    <h4 className="text-lg font-serif font-bold text-white group-hover:text-teal-200 transition">
                      {feature.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700/60">
                    <p className="text-xs font-medium text-teal-300 flex items-start space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span><strong>Benefit:</strong> {feature.benefit}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Procedures Available via Robotic Surgery */}
            <div className="rounded-2xl bg-navy-900 border border-slate-800 p-8">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6 text-center">
                Procedures Performed Robotically by Prof. Sheth
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roboticOverview.roboticProcedures.map((proc, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-teal-400/40 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-lg text-white">
                          {proc.name}
                        </h4>
                        <span className="text-[11px] font-semibold text-teal-300 bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-500/30">
                          Da Vinci Xi
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        <strong>Indications:</strong> {proc.indication}
                      </p>
                      <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                        {proc.advantage}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 flex items-center justify-between border-t border-white/5">
                      <button
                        onClick={onOpenBooking}
                        className="text-xs text-teal-300 hover:text-white font-semibold flex items-center space-x-1"
                      >
                        <span>Book Robotic Evaluation</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Comparison Matrix */}
        {activeTab === 'comparison' && (
          <div className="rounded-2xl bg-navy-900 border border-slate-700/80 overflow-hidden shadow-2xl animate-fadeIn">
            <div className="p-6 bg-navy-850 border-b border-slate-700">
              <h3 className="text-xl font-serif font-bold text-white">
                Surgical Modality Comparison: Open vs Laparoscopic vs Robotic
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Understanding how technological evolution translates into tangible patient comfort and safety.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700/80 bg-navy-950/60 text-slate-400">
                    <th className="py-4 px-6 font-semibold w-1/4">Surgical Aspect</th>
                    <th className="py-4 px-6 font-semibold w-1/4">Traditional Open</th>
                    <th className="py-4 px-6 font-semibold w-1/4">Standard Laparoscopy</th>
                    <th className="py-4 px-6 font-semibold w-1/4 text-teal-300 bg-teal-950/40">
                      Da Vinci Xi Robotic
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {roboticOverview.comparisons.map((row, index) => (
                    <tr key={index} className="hover:bg-white/5 transition">
                      <td className="py-4 px-6 font-semibold text-white">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 text-slate-400">
                        {row.open}
                      </td>
                      <td className="py-4 px-6 text-slate-300">
                        {row.laparoscopic}
                      </td>
                      <td className="py-4 px-6 text-teal-200 font-medium bg-teal-950/20">
                        {row.robotic}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-navy-850/80 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-300">
                Are you wondering whether your condition is suitable for robotic-assisted surgery?
              </p>
              <button
                onClick={onOpenBooking}
                className="bg-teal-500 hover:bg-teal-400 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow transition"
              >
                Discuss Robotic Options with Prof. Sheth
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
