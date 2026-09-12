import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ClinicLocation } from '../../data/clinics';

interface LocationSelectorProps {
  clinics: ClinicLocation[];
  selectedClinicId: string | null;
  onSelect: (clinic: ClinicLocation) => void;
  variant: 'overlay' | 'mobile';
}

const getAreaLabel = (clinic: ClinicLocation) => clinic.area.split(',')[0].toUpperCase();

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  clinics,
  selectedClinicId,
  onSelect,
  variant,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const isOverlay = variant === 'overlay';

  const updateScrollState = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !isOverlay) return;

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    setCanScrollPrevious(scroller.scrollLeft > 4);
    setCanScrollNext(scroller.scrollLeft < maxScrollLeft - 4);
  }, [isOverlay]);

  const moveClinicStrip = useCallback((direction: 'previous' | 'next') => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const firstCard = scroller.querySelector<HTMLElement>('[data-clinic-card]');
    const cardWidth = firstCard?.offsetWidth ?? 210;

    scroller.scrollBy({
      left: direction === 'next' ? cardWidth + 1 : -(cardWidth + 1),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }, []);

  useEffect(() => {
    if (!isOverlay) return undefined;

    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    updateScrollState();
    scroller.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      scroller.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [clinics.length, isOverlay, updateScrollState]);

  useEffect(() => {
    if (!isOverlay) return;

    window.requestAnimationFrame(updateScrollState);
  }, [clinics, isOverlay, updateScrollState]);

  useEffect(() => {
    if (!isOverlay || !selectedClinicId) return;

    const scroller = scrollerRef.current;
    const selectedCard = scroller?.querySelector<HTMLElement>(
      `[data-clinic-id="${selectedClinicId}"]`
    );

    if (!scroller || !selectedCard) return;

    // Keep the selected clinic visible without scrolling the page to the map.
    const stripBounds = scroller.getBoundingClientRect();
    const cardBounds = selectedCard.getBoundingClientRect();
    const offset = cardBounds.left < stripBounds.left
      ? cardBounds.left - stripBounds.left
      : cardBounds.right > stripBounds.right
        ? cardBounds.right - stripBounds.right
        : 0;

    if (offset === 0) return;

    scroller.scrollBy({
      left: offset,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }, [isOverlay, selectedClinicId]);

  return (
    <div
      className={
        isOverlay
          ? 'pointer-events-auto relative w-full max-w-[640px] overflow-hidden rounded-2xl border border-white/75 bg-white/[0.92] p-1 shadow-[0_18px_46px_rgba(15,23,42,0.14)] backdrop-blur md:w-[640px] md:p-0'
          : 'pointer-events-auto'
      }
    >
      {isOverlay && (
        <div className="absolute right-2 top-2 z-20 flex gap-1.5">
          <button
            type="button"
            onClick={() => moveClinicStrip('previous')}
            disabled={!canScrollPrevious}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-[#1b304d] shadow-[0_10px_22px_rgba(15,23,42,0.16)] transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-0"
            aria-label="Previous clinic"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => moveClinicStrip('next')}
            disabled={!canScrollNext}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-[#1b304d] shadow-[0_10px_22px_rgba(15,23,42,0.16)] transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-0"
            aria-label="Next clinic"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {isOverlay && (
        <p className="text-caption border-b border-slate-200 px-4 py-2.5 font-extrabold uppercase text-[#5f7088] sm:px-5">
          {clinics.length} Clinic Location{clinics.length === 1 ? '' : 's'}
        </p>
      )}

      <div
        ref={scrollerRef}
        role="listbox"
        aria-label="Select consultation hospital"
        className={
          isOverlay
            ? 'flex overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            : 'flex gap-2 overflow-x-auto pb-1'
        }
      >
        {clinics.map((clinic, index) => {
          const isSelected = clinic.id === selectedClinicId;
          const areaName = getAreaLabel(clinic);

          return (
            <button
              key={clinic.id}
              data-clinic-card
              data-clinic-id={clinic.id}
              type="button"
              onClick={() => onSelect(clinic)}
              aria-current={isSelected ? 'location' : undefined}
              aria-pressed={isSelected}
              className={`group relative min-w-[176px] snap-start px-4 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500 motion-reduce:transition-none sm:min-w-[205px] sm:px-5 sm:py-5 ${
                isOverlay
                  ? 'shrink-0 basis-[calc(100%/2)] bg-transparent text-[#1b304d] hover:bg-white/70 md:basis-[calc(100%/3)]'
                  : `shrink-0 rounded-xl border ${
                      isSelected
                        ? 'border-red-200 bg-white text-[#1b304d] shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`
              }`}
              role="option"
              aria-selected={isSelected}
            >
              {isOverlay && index > 0 && (
                <span
                  className="absolute bottom-5 left-0 top-5 w-px bg-slate-200 sm:bottom-6 sm:top-6"
                  aria-hidden="true"
                />
              )}

              <span className="text-eyebrow block pr-20 text-red-500">
                {areaName}
              </span>
              <span className="mt-2 block text-[16px] font-extrabold leading-5 text-[#1b304d] sm:text-[20px] sm:leading-6">
                {clinic.shortName}
              </span>
              <span className="text-meta mt-1 block font-medium text-[#5f7088]">
                {clinic.area}
              </span>

              {isSelected && (
                <span
                  className="absolute bottom-0 left-5 right-5 h-1 rounded-t-full bg-red-500"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
