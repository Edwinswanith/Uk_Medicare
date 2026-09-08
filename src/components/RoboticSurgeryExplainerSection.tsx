import React from 'react';

interface RoboticSurgeryExplainerSectionProps {
  onOpenBooking?: () => void;
  onCompareApproaches?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const RoboticSurgeryExplainerSection: React.FC<RoboticSurgeryExplainerSectionProps> = ({
  onOpenBooking,
  onCompareApproaches,
}) => {
  return (
    <section
      id="robotic"
      className="relative w-full bg-[#081528] text-white py-20 lg:py-28 overflow-hidden border-t border-sky-950/50"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(14, 55, 105, 0.8) 0%, rgba(8, 21, 40, 0) 70%)'
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[650px] h-[650px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(2, 132, 199, 0.6) 0%, rgba(8, 21, 40, 0) 70%)'
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
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

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="space-y-6 sm:space-y-7">

          <div>
            <p className="text-eyebrow text-[#38bdf8]">
              Minimally invasive surgery
            </p>
            <div className="w-10 h-[2px] bg-[#38bdf8] mt-2 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
          </div>

          <h2
            className="text-section-title text-white"
            style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
          >
            Robotic surgery, <br />
            clearly explained.
          </h2>

          <p className="text-lead text-sky-100 max-w-[560px]">
            Robotic-assisted surgery uses small incisions, a console, specialist instruments and a magnified 3D view.
          </p>

          {/* Emphasis line: pulled out visually as a deliberate safety/accuracy framing */}
          <div className="border-l-2 border-[#38bdf8] pl-4 py-0.5 max-w-[540px]">
            <p className="font-sans font-semibold text-white text-[17px] sm:text-xl leading-snug">
              The surgeon controls every movement. The system cannot act on its own.
            </p>
          </div>

          {/* How it works: 3 numbered steps */}
          <div className="space-y-3.5 pt-1">
            <p className="text-eyebrow text-sky-200">
              How it works
            </p>
            <ol className="space-y-3">
              {[
                'The surgeon sits at the console',
                'Hand movements are translated by the system',
                'Instruments move only under surgeon control',
              ].map((step, idx) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-sky-950/60 border border-sky-400/30 text-[#38bdf8] text-[15px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-body-small text-sky-100 pt-0.5">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Decision-point summary: Benefit / Limits / Suitability */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 pb-1 border-t border-white/10 mt-1">
            {[
              { label: 'Benefit', value: '3D vision and wristed instruments may help selected operations.' },
              { label: 'Limits', value: 'It is not autonomous or automatically superior.' },
              { label: 'Suitability', value: 'Diagnosis, anatomy and hospital pathway guide the choice.' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-eyebrow text-sky-200">
                  {item.label}
                </p>
                <p className="text-body-small text-sky-100 mt-1">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Link */}
          <div className="pt-2">
            <a
              href="/robotic-surgery/compare"
              onClick={onCompareApproaches}
              className="text-button inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0c2747]/90 hover:bg-[#38bdf8] text-white hover:text-[#081424] font-semibold border border-[#38bdf8]/70 hover:border-[#38bdf8] shadow-[0_4px_20px_rgba(56,189,248,0.2)] hover:shadow-[0_4px_25px_rgba(56,189,248,0.45)] transition-all duration-300 group cursor-pointer"
            >
              <span>Compare approaches</span>
              <span className="text-[18px] group-hover:translate-x-1 transition-transform">-&gt;</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
