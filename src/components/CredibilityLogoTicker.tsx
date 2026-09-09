import React from 'react';
import { legacyProfileLogoStrip } from '../data/legacyProfile';

interface CredibilityLogoTickerProps {
  compact?: boolean;
}

export const CredibilityLogoTicker: React.FC<CredibilityLogoTickerProps> = ({ compact = false }) => {
  const tickerLogos = [...legacyProfileLogoStrip, ...legacyProfileLogoStrip];

  return (
    <section
      className={`w-full overflow-hidden bg-[#f8fbfd] ${
        compact ? 'border-y border-slate-200 py-4' : 'py-6 sm:py-8'
      }`}
      aria-label="Professional affiliations and hospital logos"
    >
      <div className="logo-ticker relative mx-auto w-full max-w-7xl overflow-hidden">
        <div className="logo-ticker-track flex w-max items-center gap-12 sm:gap-16">
          {tickerLogos.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className={`flex shrink-0 items-center justify-center ${
                compact ? 'h-14 w-36' : 'h-16 w-44 sm:h-20 sm:w-52'
              }`}
              title={logo.label}
            >
              <img
                src={logo.src}
                alt={index >= legacyProfileLogoStrip.length ? '' : logo.alt}
                aria-hidden={index >= legacyProfileLogoStrip.length}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
