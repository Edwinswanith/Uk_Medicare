import React from 'react';
import { CalendarCheck, UserRound } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onViewProfile: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onViewProfile }) => {
  return (
    <section className="relative w-full bg-[#081424] overflow-hidden select-none min-h-[650px] sm:min-h-[680px] md:min-h-[660px] lg:min-h-[730px] xl:min-h-[760px] flex items-start">
      
      {/* ========================================================
          1. CONTINUOUS VISUAL BACKGROUND (ALL BREAKPOINTS)
          Single continuous photograph; no stacked separate blocks.
          The full 1440 x 768 source image is fitted to the hero height so its
          top and bottom edges remain visible on wide screens. Right alignment
          preserves the existing dark safe area for the copy.
          ======================================================== */}
      <div 
        className="absolute inset-0 h-full w-full bg-[length:auto_100%] bg-no-repeat bg-[position:56%_center] md:bg-right"
        style={{
          backgroundImage: `url('/hero_bg_davinci_sheth.png')`,
        }}
        role="img"
        aria-label="Prof. Hemant Sheth seated at Da Vinci Xi Robotic Surgery Console with Operating Theater Background"
      >
        {/* Integrated mobile directional gradient overlay:
            dark navy on far left -> medium navy -> increasingly transparent toward Prof. Sheth.
            The right side of the photograph retains full natural brightness and color. */}
        <div 
          className="md:hidden absolute inset-0 pointer-events-none" 
          style={{
            background: 'linear-gradient(to right, rgba(8,20,36,0.97) 0%, rgba(8,20,36,0.90) 32%, rgba(8,20,36,0.48) 54%, rgba(8,20,36,0.06) 68%, transparent 78%), linear-gradient(180deg, rgba(8,20,36,0.75) 0%, transparent 12%)'
          }}
        />
      </div>

      {/* ========================================================
          2. DESKTOP & TABLET COPY (>= 768px)
          Positioned within the dark blue gradient safe area on the left.
          translate-x-0 on md/lg to prevent clipping, xl:-translate-x-8 2xl:-translate-x-12.
          ======================================================== */}
      <div className="hidden md:block relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-20 md:pt-24 lg:pt-[130px] xl:pt-[145px]">
        <div className="w-full max-w-[540px] lg:max-w-[600px] space-y-4 md:translate-x-0 xl:-translate-x-8 2xl:-translate-x-12">
          
          <div>
            <p 
              className="text-eyebrow text-white"
            >
              PROF. HEMANT SHETH
            </p>
            <div className="w-12 sm:w-14 h-[2px] bg-[#38bdf8] mt-2 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
          </div>

          {/* Main Hero Heading: Source Serif 4, 600 weight, clamp(48px, 4.2vw, 64px), line-height: 0.95, letter-spacing: -0.025em
              Note: rendered as <p>, not <h1> — the mobile copy below (same
              text) is the page's single semantic h1, since mobile-first
              indexing evaluates the mobile-visible DOM. This is its
              desktop-viewport visual duplicate. */}
          <p
            className="font-serif font-semibold text-white drop-shadow-sm pr-1"
            style={{
              fontFamily: '"Source Serif 4", Georgia, serif',
              fontSize: 'clamp(48px, 4.2vw, 64px)',
              lineHeight: '1',
              letterSpacing: '-0.025em',
            }}
          >
            Specialist Robotic <br />
            &amp; Laparoscopic <br />
            Upper GI Surgeon
          </p>

          <p 
            className="text-eyebrow text-sky-200 pt-0.5"
          >
            IN LONDON &amp; HERTFORDSHIRE
          </p>

          <p className="text-lead text-sky-100 max-w-[500px] pt-1">
            Expert surgical care for upper GI conditions with a patient-first approach.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="text-button inline-flex items-center justify-center gap-2 rounded-lg bg-[#38bdf8] px-5 py-3 font-bold uppercase tracking-[0.08em] text-[#081424] shadow-[0_10px_24px_rgba(56,189,248,0.28)] transition-all duration-200 hover:bg-white hover:shadow-[0_12px_28px_rgba(255,255,255,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
            >
              <CalendarCheck className="h-4 w-4 shrink-0" />
              <span>Book Consultation</span>
            </button>

            <button
              type="button"
              onClick={onViewProfile}
              className="text-button inline-flex items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/[0.08] px-5 py-3 font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition-all duration-200 hover:border-white/70 hover:bg-white/[0.15] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              <UserRound className="h-4 w-4 shrink-0" />
              <span>View Profile</span>
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================
          3. MOBILE HERO COPY (< 768px)
          Positioned absolute in the middle-left zone of the hero,
          vertically centered within the visible left safe area.
          ======================================================== */}
      <div 
        className="md:hidden absolute left-4 sm:left-6 top-[46%] -translate-y-1/2 z-10 w-[270px] sm:w-[310px] space-y-3"
      >
        <div>
          <p 
            className="text-eyebrow text-white"
          >
            PROF. HEMANT SHETH
          </p>
          <div className="w-11 h-[2px] bg-[#38bdf8] mt-1.5 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
        </div>

        {/* Heading: 36px to 39px (37px), line-height: 0.96
            This is the page's single semantic h1 — kept on the
            mobile-visible copy since mobile-first indexing evaluates
            the mobile DOM. The desktop copy above is its visual
            duplicate for larger viewports, rendered as a <p>. */}
        <h1
          className="font-serif font-semibold text-white drop-shadow-sm"
          style={{
            fontFamily: '"Source Serif 4", Georgia, serif',
            fontSize: 'clamp(2.55rem, 9.6vw, 3.05rem)',
            lineHeight: '1',
            letterSpacing: '-0.025em',
          }}
        >
          Specialist Robotic &amp;<br />
          Laparoscopic<br />
          Upper GI<br />
          Surgeon
        </h1>

        <p 
          className="text-eyebrow text-sky-200 pt-0.5"
        >
          IN LONDON &amp; HERTFORDSHIRE
        </p>

        <p className="font-sans text-[16px] sm:text-[17px] text-sky-100 leading-[1.6] max-w-[260px] sm:max-w-[285px] pt-0.5">
          Expert surgical care for upper GI conditions with a patient-first approach.
        </p>

        <div className="flex flex-col gap-2.5 pt-1">
          <button
            type="button"
            onClick={onOpenBooking}
            className="text-button inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#38bdf8] px-4 py-2.5 font-bold uppercase tracking-[0.07em] text-[#081424] shadow-[0_10px_22px_rgba(56,189,248,0.28)] transition-all duration-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
          >
            <CalendarCheck className="h-4 w-4 shrink-0" />
            <span>Book Consultation</span>
          </button>

          <button
            type="button"
            onClick={onViewProfile}
            className="text-button inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/[0.08] px-4 py-2.5 font-bold uppercase tracking-[0.07em] text-white backdrop-blur-sm transition-all duration-200 hover:border-white/70 hover:bg-white/[0.15] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <UserRound className="h-4 w-4 shrink-0" />
            <span>View Profile</span>
          </button>
        </div>
      </div>

    </section>
  );
};
