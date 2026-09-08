import React, { useEffect, useMemo, useState } from 'react';
import { Languages, MapPin, ShieldCheck, Stethoscope } from 'lucide-react';
import { legacyProfileLocations } from '../data/legacyProfile';
import { getVerified, professionalIdentity } from '../data/professionalIdentity';

interface ProfileStatItem {
  id: string;
  overline: string;
  value: number;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

interface AnimatedStatValueProps {
  value: number;
}

const AnimatedStatValue: React.FC<AnimatedStatValueProps> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? value
      : 0
  ));

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return undefined;
    }

    const duration = 950;
    let animationFrame = 0;
    let startTime: number | undefined;

    const animate = (timestamp: number) => {
      if (startTime === undefined) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    setDisplayValue(0);
    animationFrame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [value]);

  return <>{displayValue}</>;
};

export const StatsCounterBar: React.FC = () => {
  const items = useMemo<ProfileStatItem[]>(() => {
    const membershipCount = getVerified(professionalIdentity.memberships)?.length ?? 0;
    const languageCount = getVerified(professionalIdentity.languages)?.length ?? 0;
    const focusAreas = ['Gallbladder', 'Reflux', 'Hernia', 'Endoscopy', 'Liver/HPB'];

    return [
      {
        id: 'locations',
        overline: 'Listed access',
        value: legacyProfileLocations.length,
        label: 'private hospital sites',
        Icon: MapPin,
      },
      {
        id: 'focus',
        overline: 'Clinical focus',
        value: focusAreas.length,
        label: 'upper GI care areas',
        Icon: Stethoscope,
      },
      {
        id: 'affiliations',
        overline: 'Affiliations',
        value: membershipCount,
        label: 'professional memberships',
        Icon: ShieldCheck,
      },
      {
        id: 'languages',
        overline: 'Patient access',
        value: languageCount,
        label: 'additional languages',
        Icon: Languages,
      },
    ];
  }, []);

  return (
    <section className="relative z-30 bg-white px-4 pb-5 sm:px-6">
      <div className="mx-auto -mt-8 max-w-6xl sm:-mt-10 lg:-mt-12">
        <div className="relative overflow-hidden rounded-xl border border-white/20 bg-[#17293e] shadow-[0_18px_42px_rgba(15,23,42,0.24)]">
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(56,189,248,0.15),rgba(23,41,62,0.94)_36%,rgba(111,28,72,0.38)_100%)]" />

          <div className="relative grid grid-cols-2 divide-x divide-y divide-white/10 md:grid-cols-4 md:divide-y-0">
            {items.map(({ id, overline, value, label, Icon }) => (
              <div
                key={id}
                className="flex min-h-[112px] flex-col items-center justify-center px-3 py-4 text-center sm:min-h-[124px] sm:px-5"
              >
                <div className="inline-flex items-center justify-center gap-1.5 rounded-full border border-sky-300/25 bg-white/10 px-2.5 py-1 text-[12px] font-extrabold uppercase tracking-[0.08em] text-sky-300 sm:text-[13px]">
                  <Icon className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                  <span>{overline}</span>
                </div>

                <div
                  className="mt-2 font-serif text-[30px] font-bold leading-none text-white sm:text-[36px]"
                  aria-label={`${value} ${label}`}
                >
                  <AnimatedStatValue value={value} />
                </div>

                <div className="mt-1.5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-slate-100 sm:text-[13px]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
