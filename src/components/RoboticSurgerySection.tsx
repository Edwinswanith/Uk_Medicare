import React, { useState } from 'react';

interface RoboticSurgerySectionProps {
  onOpenBooking?: () => void;
  onExploreRobotic?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const RoboticSurgerySection: React.FC<RoboticSurgerySectionProps> = ({
  onOpenBooking,
  onExploreRobotic,
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <section
      id="robotic-surgery"
      className="relative w-full overflow-hidden border-y border-sky-800/60 bg-navy-850 py-20 text-white lg:py-28"
    >
      {/* ========================================================
          1. BACKGROUND AMBIENCE
          Deep navy surface with restrained contour lines.
          ======================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Faint contour lines keep the section connected to the robotic story. */}
        <svg
          className="absolute inset-0 h-full w-full opacity-15"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
        >
          <path
            d="M-100,200 C300,100 600,450 1100,250 C1300,180 1500,280 1600,220"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          <path
            d="M-50,450 C350,300 700,600 1200,400 C1400,320 1550,480 1650,420"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* ========================================================
            2. TWO-COLUMN LAYOUT (DESKTOP: ~48% / 52%)
            Stacks vertically on mobile with text first, video second.
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ====================================================
              LEFT COLUMN: Copy, 3 Benefit Blocks, CTA
              ==================================================== */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">

            {/* Eyebrow: ROBOTIC SURGERY with cyan underline */}
            <div>
              <p className="text-eyebrow text-[#38bdf8]">
                ROBOTIC SURGERY
              </p>
              <div className="w-10 h-[2px] bg-[#38bdf8] mt-2 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
            </div>

            {/* Main Heading: Source Serif 4 */}
            <h2
              className="text-section-title text-white"
              style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
            >
              Advanced robotic surgery <br />
              with precision at its core
            </h2>

            {/* Body Copy */}
            <p className="text-lead max-w-[560px] text-sky-100">
              Robotic-assisted surgery offers exceptional precision, enhanced visualisation and a minimally invasive approach for selected upper GI, gallbladder and hernia procedures.
            </p>

            {/* 3 Benefit Blocks: Side-by-side on desktop & tablet */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 pb-2">

              {/* Benefit 1: Enhanced precision */}
              <div className="space-y-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/20 bg-sky-950/60">
                  {/* Target / Precision Crosshair SVG */}
                  <svg
                    className="w-5 h-5 text-[#38bdf8]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="12" y1="3" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="21" />
                    <line x1="3" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="21" y2="12" />
                  </svg>
                </div>
                <h3 className="font-sans text-[17px] font-semibold leading-snug text-white">
                  Enhanced precision
                </h3>
                <p className="text-body-small text-sky-100/90">
                  Greater accuracy for complex procedures
                </p>
              </div>

              {/* Benefit 2: Minimally invasive approach */}
              <div className="space-y-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/20 bg-sky-950/60">
                  {/* Scalpel / Micro-incision Instrument SVG */}
                  <svg
                    className="w-5 h-5 text-[#38bdf8]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 4L20 9.5L9.5 20H4V14.5L14.5 4Z" />
                    <path d="M13 5.5L18.5 11" />
                    <circle cx="7" cy="17" r="0.75" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="font-sans text-[17px] font-semibold leading-snug text-white">
                  Minimally invasive approach
                </h3>
                <p className="text-body-small text-sky-100/90">
                  Smaller incisions, less pain and faster recovery
                </p>
              </div>

              {/* Benefit 3: Advanced visualisation */}
              <div className="space-y-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/20 bg-sky-950/60">
                  {/* High-Definition 3D Monitor / Console SVG */}
                  <svg
                    className="w-5 h-5 text-[#38bdf8]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                    <path d="M6 10l3-3 3 3 6-5" />
                  </svg>
                </div>
                <h3 className="font-sans text-[17px] font-semibold leading-snug text-white">
                  Advanced visualisation
                </h3>
                <p className="text-body-small text-sky-100/90">
                  High-definition 3D imaging for superior surgical control
                </p>
              </div>

            </div>

            {/* CTA Link — routes to the real educational explainer section
                (id="robotic") rather than the booking modal; previously
                labelled "Explore" while opening an enquiry form. */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="/robotic-surgery"
                onClick={onExploreRobotic}
                className="text-button group inline-flex cursor-pointer items-center gap-2.5 rounded-lg border border-sky-400/70 bg-[#0c2747]/90 px-6 py-3.5 font-semibold text-white shadow-[0_8px_18px_rgba(15,42,69,0.28)] transition-all duration-300 hover:border-sky-400 hover:bg-sky-400 hover:text-[#081424]"
              >
                <span>Explore Robotic Surgery</span>
                <span className="text-[18px] group-hover:translate-x-1 transition-transform">-&gt;</span>
              </a>

              {/* Discreet Trust Indicator featuring team photo thumbnail */}
              <div className="text-meta flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sky-100/90">
                <img
                  src="/images/sheth_robotic_surgical_team.png"
                  alt="Ealing Hospital Robotic Surgical Team"
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-sky-400/40"
                />
                <span className="font-medium text-slate-200">
                  NHS National Record Team
                </span>
              </div>
            </div>

          </div>

          {/* ====================================================
              RIGHT COLUMN: Video Panel Card (~52%)
              ==================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center">

            {/* Elevated Media Frame */}
            <div className="group relative w-full overflow-hidden rounded-lg border border-white/15 bg-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">

              <div className="relative aspect-video w-full bg-[#050c18] overflow-hidden">
                {!isPlayingVideo ? (
                  /* ==============================================
                     Mockup-Styled Video Poster with Play Action
                     Matches media_1788736074226.png reference
                     ============================================== */
                  <div
                    onClick={() => setIsPlayingVideo(true)}
                    className="relative w-full h-full cursor-pointer select-none group"
                    role="button"
                    aria-label="Play video: Ealing Hospital breaks national record for robotic surgeries"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setIsPlayingVideo(true);
                      }
                    }}
                  >
                    {/* Background Poster: Official NHS YouTube broadcast footage */}
                    <img
                      src="/images/youtube_thumb_Q__rvX_EEGQ.jpg"
                      alt="Prof. Hemant Sheth operating da Vinci console"
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
                    />

                    {/* Gradient Overlay for Cinematic Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061224]/95 via-transparent to-black/40" />

                    {/* Prominent Frosted Circular Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 group-hover:bg-[#38bdf8] border border-white/40 group-hover:border-[#38bdf8] backdrop-blur-md flex items-center justify-center text-white group-hover:text-[#081424] shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-all duration-300">
                        {/* Play Triangle Icon */}
                        <svg
                          className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="6 3 20 12 6 21 6 3" />
                        </svg>
                      </div>
                    </div>

                    {/* Video Title Overlay (Bottom Left) */}
                    <div className="absolute bottom-11 left-4 right-4 pointer-events-none">
                      <p className="font-sans font-semibold text-white text-base sm:text-[17px] leading-snug drop-shadow-md">
                        Robotic Surgery at a Higher Standard
                      </p>
                      <p className="text-caption text-sky-100 drop-shadow">
                        Prof. Hemant Sheth
                      </p>
                    </div>

                    {/* Simulated Player Controls Bar (as in reference mockup) */}
                    <div className="text-caption absolute bottom-0 inset-x-0 h-9 bg-black/60 backdrop-blur-sm px-3.5 flex items-center justify-between text-white/85 pointer-events-none border-t border-white/10">
                      <div className="flex items-center gap-2.5">
                        {/* Mini Play Icon */}
                        <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                          <polygon points="6 3 20 12 6 21 6 3" />
                        </svg>
                        <span>0:00 / 2:18</span>
                        {/* Scrubber bar */}
                        <div className="hidden sm:block w-32 md:w-44 h-1 bg-white/25 rounded-full overflow-hidden">
                          <div className="w-1/4 h-full bg-[#38bdf8]" />
                        </div>
                      </div>

                      {/* Right-side control icons */}
                      <div className="flex items-center gap-3 text-white/70">
                        {/* Volume icon */}
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                        {/* Settings gear */}
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        {/* Fullscreen icon */}
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ==============================================
                     Active YouTube Responsive Iframe Player
                     Plays on click seamlessly
                     ============================================== */
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/Q__rvX_EEGQ?autoplay=1&rel=0"
                    title="Watch: Ealing Hospital breaks national record for robotic surgeries"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>

            </div>

            {/* Captions below video */}
            <div className="mt-4 px-1 space-y-1">
              <p className="text-body-small font-medium text-white">
                Watch: Ealing Hospital breaks national record for robotic surgeries
              </p>
              <p className="text-caption text-sky-200">
                Featuring the Ealing Hospital robotic surgery programme.
              </p>
            </div>

            {/* Bottom Accent line: PATIENT-FOCUSED. TECHNOLOGY-DRIVEN. BETTER OUTCOMES. */}
            <div className="mt-8 border-t border-white/10 pt-4">
              <div
                className="text-eyebrow flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sky-200"
              >
                <span>PATIENT-FOCUSED.</span>
                <span>TECHNOLOGY-<span className="text-[#38bdf8]">DRIVEN</span>.</span>
                <span>BETTER OUTCOMES.</span>
              </div>
              <div className="w-12 h-[2px] bg-[#38bdf8] mt-2 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
