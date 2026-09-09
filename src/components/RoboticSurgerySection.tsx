import React, { useState } from 'react';
import { Crosshair, ScanSearch, Spline } from 'lucide-react';

interface RoboticSurgerySectionProps {
  onOpenBooking?: () => void;
  onExploreRobotic?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ROBOTIC_VIDEO_ID = 'Q__rvX_EEGQ';
const ROBOTIC_VIDEO_EMBED_BASE_URL =
  `https://www.youtube.com/embed/${ROBOTIC_VIDEO_ID}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
const ROBOTIC_VIDEO_WATCH_URL = `https://www.youtube.com/watch?v=${ROBOTIC_VIDEO_ID}`;

const getRoboticVideoEmbedUrl = () => {
  if (typeof window === 'undefined') {
    return ROBOTIC_VIDEO_EMBED_BASE_URL;
  }

  const needsMutedAutoplay =
    window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

  return needsMutedAutoplay
    ? `${ROBOTIC_VIDEO_EMBED_BASE_URL}&mute=1`
    : ROBOTIC_VIDEO_EMBED_BASE_URL;
};

const roboticBenefits = [
  {
    title: 'Enhanced precision',
    description: 'Greater accuracy for complex procedures',
    Icon: Crosshair,
  },
  {
    title: 'Minimally invasive approach',
    description: 'Smaller incisions, less pain and faster recovery',
    Icon: Spline,
  },
  {
    title: 'Advanced visualisation',
    description: 'High-definition 3D imaging for superior surgical control',
    Icon: ScanSearch,
  },
];

export const RoboticSurgerySection: React.FC<RoboticSurgerySectionProps> = ({
  onOpenBooking,
  onExploreRobotic,
}) => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

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
              {roboticBenefits.map(({ title, description, Icon }) => (
                <div key={title} className="space-y-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-sky-300/25 bg-white/[0.06] text-[#7dd3fc] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Icon className="h-[19px] w-[19px]" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h3 className="font-sans text-[17px] font-semibold leading-snug text-white">
                    {title}
                  </h3>
                  <p className="text-body-small text-sky-100/90">
                    {description}
                  </p>
                </div>
              ))}

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

            </div>

          </div>

          {/* ====================================================
              RIGHT COLUMN: Video Panel Card (~52%)
              ==================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center">

            {/* Elevated Media Frame */}
            <div className="group relative w-full overflow-hidden rounded-lg border border-white/15 bg-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">

              <div className="relative aspect-video w-full bg-[#050c18] overflow-hidden">
                {!videoSrc ? (
                  /* ==============================================
                     Mockup-Styled Video Poster with Play Action
                     Matches media_1788736074226.png reference
                     ============================================== */
                  <button
                    type="button"
                    onClick={() => setVideoSrc(getRoboticVideoEmbedUrl())}
                    className="relative block h-full w-full cursor-pointer touch-manipulation select-none text-left group"
                    aria-label="Play video: Ealing Hospital breaks national record for robotic surgeries"
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
                  </button>
                ) : (
                  /* ==============================================
                     Active YouTube Responsive Iframe Player
                     Plays on click seamlessly
                     ============================================== */
                  <iframe
                    className="w-full h-full"
                    src={videoSrc}
                    title="Watch: Ealing Hospital breaks national record for robotic surgeries"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
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
              <a
                href={ROBOTIC_VIDEO_WATCH_URL}
                target="_blank"
                rel="noreferrer"
                className="text-caption inline-flex font-semibold text-[#7dd3fc] underline-offset-4 transition hover:text-white hover:underline sm:hidden"
              >
                Open video on YouTube
              </a>
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
