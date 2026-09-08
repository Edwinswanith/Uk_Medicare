import React from 'react';
import { ShieldCheck, Award, Sparkles, ArrowRight, Phone, CheckCircle2, Star, Cpu } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-navy-900 text-white">
      {/* Background Decorative Lighting Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-navy-900/90 to-navy-900 pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Surgical Authority & Accolades */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* National Robotic Milestone Pill */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs sm:text-sm font-medium backdrop-blur-sm shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <Cpu className="w-4 h-4 text-teal-400" />
              <span>Pioneering Da Vinci Robotic Surgery &bull; National NHS Record Contributor</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-serif font-bold tracking-tight text-white leading-[1.15]">
              World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-200 to-emerald-400">Robotic &amp; Keyhole</span> Surgical Care
            </h1>

            {/* Subtitle & Clinical Credentials */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-light max-w-2xl">
              Led by <strong className="text-white font-semibold">Professor Hemant Sheth</strong>, Consultant Upper GI, Laparoscopic &amp; Robotic Surgeon. Providing high-precision, minimally invasive treatments for gallstones, complex hernias, and severe acid reflux across premier private hospitals in London &amp; Hertfordshire.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Sub-millimeter Da Vinci Xi robotic precision</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Rapid day-case recovery &amp; minimal scarring</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>All major UK private insurers accepted</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Self-pay consultations from &pound;250</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold px-7 py-4 rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all flex items-center justify-center space-x-2 text-base group"
              >
                <span>Request Private Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#robotic-surgery"
                className="border border-slate-600 hover:border-teal-400/60 bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-4 rounded-xl transition flex items-center justify-center space-x-2 text-base"
              >
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Discover Robotic Surgery</span>
              </a>
            </div>

            {/* Secretary Contact Quick Bar */}
            <div className="flex items-center space-x-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>Direct Secretary Line:</span>
              </span>
              <a href="tel:+447716835261" className="text-teal-300 font-semibold hover:underline">
                07716 835261
              </a>
              <span className="text-slate-600">&bull;</span>
              <span>Fast-Track Insured &amp; Self-Pay Bookings</span>
            </div>
          </div>

          {/* Right Column: Surgeon Credibility Card & Hospital Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-teal-500/30 to-blue-600/20 blur-xl opacity-75" />

              {/* Main Card */}
              <div className="relative rounded-2xl bg-navy-850/90 border border-slate-700/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
                
                {/* Profile Header */}
                <div className="flex items-center space-x-4 pb-5 border-b border-slate-700/60">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-600 to-navy-800 p-0.5 shadow-lg shrink-0 overflow-hidden flex items-center justify-center">
                    <img 
                      src="https://assets.yourpractice.online/2533/dr-sheth-h-cc.png" 
                      alt="Prof. Hemant Sheth" 
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        // Fallback monogram if asset fails
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="font-serif font-bold text-2xl text-white">HS</div>
                  </div>

                  <div>
                    <h2 className="text-xl font-serif font-bold text-white">Prof. Hemant Sheth</h2>
                    <p className="text-xs text-teal-300 font-medium">MBBS MS FRCS MD(Res) UCL</p>
                    <p className="text-xs text-slate-400 mt-1">Consultant Upper GI &amp; General Surgeon</p>
                    <div className="flex items-center space-x-1 mt-1.5 text-amber-400 text-xs">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-slate-300 font-semibold ml-1">5.0</span>
                      <span className="text-slate-400">(150+ Verified Reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Badges / Clinical Pillars */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-start space-x-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Clinical Professor (Awarded 2023)</p>
                      <p className="text-slate-400">Awarded for high-level surgical training and research contributions</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Royal College of Surgeons Surgical Tutor</p>
                      <p className="text-slate-400">Faculty for Intermediate Laparoscopic Skills &amp; Core Trainee Mentor</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    <Cpu className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Da Vinci Robotic Surgical Pioneer</p>
                      <p className="text-slate-400">Led record-breaking robotic case adoption at Ealing Hospital (NHS Trust)</p>
                    </div>
                  </div>
                </div>

                {/* Hospital Locations Summary */}
                <div className="pt-2 border-t border-slate-700/60">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Operating &amp; Consulting Privately At:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="bg-navy-900/80 px-2.5 py-1.5 rounded-lg border border-slate-700/40">
                      &bull; Clementine Churchill (Harrow)
                    </div>
                    <div className="bg-navy-900/80 px-2.5 py-1.5 rounded-lg border border-slate-700/40">
                      &bull; Spire Bushey (Herts)
                    </div>
                    <div className="bg-navy-900/80 px-2.5 py-1.5 rounded-lg border border-slate-700/40">
                      &bull; Wellington Elstree (HCA)
                    </div>
                    <div className="bg-navy-900/80 px-2.5 py-1.5 rounded-lg border border-slate-700/40">
                      &bull; Syon Clinic (Brentford)
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-teal-300">30+</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Years Surgical Experience</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-teal-300">10,000+</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Minimally Invasive Procedures</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-teal-300">National Record</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Robotic Surgery Milestones</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-teal-300">5.0 &starf;</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Verified Patient Ratings</div>
          </div>
        </div>

      </div>
    </section>
  );
};
