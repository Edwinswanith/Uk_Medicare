import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  Maximize2,
  X,
} from 'lucide-react';
import {
  patientFeedbackCards,
  patientFeedbackCategories,
} from '../data/patientFeedbackCards';

const ALL_CATEGORIES = 'All feedback';

interface PatientFeedbackCardsGalleryProps {
  showHeader?: boolean;
  className?: string;
}

export const PatientFeedbackCardsGallery: React.FC<PatientFeedbackCardsGalleryProps> = ({
  showHeader = true,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const categoryOptions = useMemo(
    () => [ALL_CATEGORIES, ...patientFeedbackCategories],
    []
  );

  const visibleCards = useMemo(
    () => (
      activeCategory === ALL_CATEGORIES
        ? patientFeedbackCards
        : patientFeedbackCards.filter((card) => card.category === activeCategory)
    ),
    [activeCategory]
  );

  const activeCard = activeIndex === null ? null : visibleCards[activeIndex];

  useEffect(() => {
    if (!activeCard) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
        return;
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (
          current === null ? current : (current + 1) % visibleCards.length
        ));
        return;
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => (
          current === null
            ? current
            : (current - 1 + visibleCards.length) % visibleCards.length
        ));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCard, visibleCards.length]);

  const moveLightbox = (direction: 'previous' | 'next') => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return direction === 'next'
        ? (current + 1) % visibleCards.length
        : (current - 1 + visibleCards.length) % visibleCards.length;
    });
  };

  return (
    <>
      <section className={`${showHeader ? 'mt-8 border-t border-slate-200 pt-7' : 'mt-0 pt-0'} ${className}`}>
        <div className={`flex flex-col gap-4 border-b border-slate-200 pb-4 ${
          showHeader ? 'lg:flex-row lg:items-end lg:justify-between' : 'items-center'
        }`}>
          {showHeader && (
            <div>
              <p className="text-eyebrow text-sky-700">Source feedback cards</p>
              <h4 className="mt-1 font-serif text-[28px] font-bold leading-tight text-navy-900">
                Patient Testimonials
              </h4>
              <p className="mt-1 text-body-small text-slate-600">
                {patientFeedbackCards.length} feedback card pages from the patient feedback folder.
              </p>
            </div>
          )}

          <div className="flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Filter feedback cards">
            {categoryOptions.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setActiveIndex(null);
                }}
                className={`text-button inline-flex shrink-0 items-center rounded-full border px-3.5 py-2 font-bold transition ${
                  activeCategory === category
                    ? 'border-[#064a5f] bg-[#064a5f] text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleCards.map((card, index) => (
            <article
              key={card.id}
              className="group flex min-h-[500px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm transition hover:border-sky-300 hover:shadow-lg"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="relative flex h-[430px] items-center justify-center bg-white p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
                aria-label={`Open ${card.title}`}
              >
                <img
                  src={card.image}
                  alt={`${card.title}: ${card.category}, ${card.pageLabel}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
                <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </button>

              <div className="flex flex-1 items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-extrabold uppercase tracking-[0.08em] text-navy-900">
                    {card.title}
                  </p>
                  <p className="mt-0.5 text-[12px] font-semibold text-slate-500">
                    {card.category} | {card.pageLabel}
                  </p>
                </div>
                <ImageIcon className="h-5 w-5 shrink-0 text-sky-700" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeCard && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/90 px-3 py-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveIndex(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label={activeCard.title}
            className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
              <div className="min-w-0">
                <p className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-navy-900">
                  {activeCard.title}
                </p>
                <p className="text-[12px] font-semibold text-slate-500">
                  {activeCard.category} | {activeCard.pageLabel} | {(activeIndex ?? 0) + 1} of {visibleCards.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-800 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
                aria-label="Close feedback card"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-[44px_minmax(0,1fr)_44px] items-center bg-slate-100 sm:grid-cols-[64px_minmax(0,1fr)_64px]">
              <button
                type="button"
                onClick={() => moveLightbox('previous')}
                className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow transition hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
                aria-label="Previous feedback card"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div className="flex h-full min-h-0 items-center justify-center overflow-auto p-3 sm:p-5">
                <img
                  src={activeCard.image}
                  alt={`${activeCard.title}: ${activeCard.category}, ${activeCard.pageLabel}`}
                  decoding="async"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() => moveLightbox('next')}
                className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow transition hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
                aria-label="Next feedback card"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
