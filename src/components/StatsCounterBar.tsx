import React, { useEffect, useMemo, useState } from 'react';

interface ProfileStatItem {
  id: string;
  value: number;
  label: string;
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

    const duration = 2800;
    let animationFrame = 0;
    let startTime: number | undefined;

    const animate = (timestamp: number) => {
      if (startTime === undefined) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    setDisplayValue(0);
    animationFrame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [value]);

  return <>{new Intl.NumberFormat('en-GB').format(displayValue)}</>;
};

export const StatsCounterBar: React.FC = () => {
  const items = useMemo<ProfileStatItem[]>(
    () => [
      {
        id: 'surgeries',
        value: 5000,
        label: 'surgeries performed',
      },
      {
        id: 'robotic-procedures',
        value: 50,
        label: 'robotic procedures',
      },
      {
        id: 'publications',
        value: 35,
        label: 'research publications',
      },
      {
        id: 'experience',
        value: 34,
        label: 'years of experience',
      },
    ],
    []
  );

  return (
    <section className="relative z-30 -mt-[70px] bg-transparent px-4 pb-8 sm:-mt-[74px] sm:px-6 md:-mt-[42px] lg:-mt-[44px]">
      <div className="mx-auto max-w-[760px]">
        <div className="relative overflow-hidden rounded-lg border border-white/25 bg-[#18283b] shadow-[0_20px_42px_rgba(15,23,42,0.24)]">
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(56,189,248,0.14),rgba(24,40,59,0.98)_42%,rgba(111,28,72,0.36)_100%)]" />

          <div className="relative grid grid-cols-2 divide-x divide-y divide-white/10 md:grid-cols-4 md:divide-y-0">
            {items.map(({ id, value, label }) => (
              <div
                key={id}
                className="flex min-h-[70px] flex-col items-center justify-center px-2.5 py-2.5 text-center sm:min-h-[78px] sm:px-4 sm:py-3"
              >
                <div className="text-[9px] font-extrabold uppercase leading-none tracking-[0.18em] text-sky-300 sm:text-[10px]">
                  Over
                </div>

                <div
                  className="mt-1 font-serif text-[26px] font-bold leading-none text-white sm:text-[31px]"
                  aria-label={`Over ${new Intl.NumberFormat('en-GB').format(value)} ${label}`}
                >
                  <AnimatedStatValue value={value} />
                  <span>+</span>
                </div>

                <div className="mt-1.5 text-[8px] font-extrabold uppercase leading-tight tracking-[0.12em] text-slate-200 sm:text-[9px]">
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
