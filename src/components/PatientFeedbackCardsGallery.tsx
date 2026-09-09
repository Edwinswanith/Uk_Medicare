import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  X,
} from 'lucide-react';
import {
  getCleanedPatientTestimonials,
  type PatientFeedbackTestimonial,
  type PatientFeedbackTestimonialPage,
} from '../data/patientFeedbackCards';

const ALL_CATEGORIES = 'All feedback';

interface PatientFeedbackCardsGalleryProps {
  showHeader?: boolean;
  className?: string;
}

interface FeedbackCardImageProps {
  page: PatientFeedbackTestimonialPage;
  title: string;
  className?: string;
}

const getFeedbackTitle = (testimonial: PatientFeedbackTestimonial) =>
  `Patient feedback ${testimonial.id.replace('feedback-', '')}`;

const FeedbackCardImage: React.FC<FeedbackCardImageProps> = ({
  page,
  title,
  className = '',
}) => (
  <div className={`flex h-full w-full items-center justify-center bg-white ${className}`}>
    <img
      src={page.src}
      alt={`${title}, ${page.pageLabel}`}
      loading="lazy"
      decoding="async"
      className="max-h-full max-w-full object-contain"
    />
  </div>
);

export const PatientFeedbackCardsGallery: React.FC<PatientFeedbackCardsGalleryProps> = ({
  showHeader = true,
  className = '',
}) => {
  const cleanedTestimonials = useMemo(() => getCleanedPatientTestimonials(), []);
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const categoryOptions = useMemo(
    () => [
      ALL_CATEGORIES,
      ...Array.from(new Set(cleanedTestimonials.map((testimonial) => testimonial.category))),
    ],
    [cleanedTestimonials]
  );

  const visibleTestimonials = useMemo(
    () => (
      activeCategory === ALL_CATEGORIES
        ? cleanedTestimonials
        : cleanedTestimonials.filter((testimonial) => testimonial.category === activeCategory)
    ),
    [activeCategory, cleanedTestimonials]
  );

  const activeTestimonial =
    activeIndex === null ? null : visibleTestimonials[activeIndex] ?? null;
  const activePage = activeTestimonial?.pages[activePageIndex] ?? activeTestimonial?.pages[0];

  const moveLightbox = useCallback((direction: 'previous' | 'next') => {
    setActiveIndex((current) => {
      if (current === null || visibleTestimonials.length === 0) return current;
      return direction === 'next'
        ? (current + 1) % visibleTestimonials.length
        : (current - 1 + visibleTestimonials.length) % visibleTestimonials.length;
    });
    setActivePageIndex(0);
  }, [visibleTestimonials.length]);

  const movePage = useCallback((direction: 'previous' | 'next') => {
    if (!activeTestimonial) return;

    if (direction === 'next') {
      if (activePageIndex < activeTestimonial.pages.length - 1) {
        setActivePageIndex((current) => current + 1);
      } else {
        moveLightbox('next');
      }
      return;
    }

    if (activePageIndex > 0) {
      setActivePageIndex((current) => current - 1);
    } else {
      moveLightbox('previous');
    }
  }, [activePageIndex, activeTestimonial, moveLightbox]);

  useEffect(() => {
    setActivePageIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (!activeTestimonial || activePageIndex < activeTestimonial.pages.length) return;
    setActivePageIndex(0);
  }, [activePageIndex, activeTestimonial]);

  useEffect(() => {
    if (!activeTestimonial) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
        return;
      }

      if (event.key === 'ArrowRight') {
        movePage('next');
        return;
      }

      if (event.key === 'ArrowLeft') {
        movePage('previous');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTestimonial, movePage]);

  if (cleanedTestimonials.length === 0) {
    return null;
  }

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
                {cleanedTestimonials.length} cleaned grouped feedback card testimonial{cleanedTestimonials.length === 1 ? '' : 's'}.
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
          {visibleTestimonials.map((testimonial, index) => {
            const firstPage = testimonial.pages[0];
            const title = getFeedbackTitle(testimonial);

            if (!firstPage) return null;

            return (
              <article
                key={testimonial.id}
                className="group overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm transition hover:border-sky-300 hover:shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setActivePageIndex(0);
                  }}
                  className="relative flex h-[430px] items-center justify-center bg-white p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
                  aria-label={`Open ${title}`}
                >
                  <FeedbackCardImage page={firstPage} title={title} />
                  <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {activeTestimonial && activePage && (
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
            aria-label={getFeedbackTitle(activeTestimonial)}
            className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
              <div className="min-w-0">
                <p className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-navy-900">
                  {getFeedbackTitle(activeTestimonial)}
                </p>
                <p className="text-[12px] font-semibold text-slate-500">
                  {activeTestimonial.category} | Page {activePageIndex + 1} of {activeTestimonial.pages.length} | {(activeIndex ?? 0) + 1} of {visibleTestimonials.length}
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
                onClick={() => movePage('previous')}
                className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow transition hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
                aria-label="Previous feedback card page"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div className="flex h-full min-h-0 items-center justify-center overflow-auto p-3 sm:p-5">
                <FeedbackCardImage page={activePage} title={getFeedbackTitle(activeTestimonial)} className="p-2 sm:p-4" />
              </div>

              <button
                type="button"
                onClick={() => movePage('next')}
                className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow transition hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
                aria-label="Next feedback card page"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {activeTestimonial.pages.length > 1 && (
              <div className="flex items-center justify-center gap-2 border-t border-slate-200 bg-white px-4 py-3">
                {activeTestimonial.pages.map((page, pageIndex) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => setActivePageIndex(pageIndex)}
                    className={`h-2.5 rounded-full transition-all ${
                      activePageIndex === pageIndex ? 'w-7 bg-sky-700' : 'w-2.5 bg-slate-300 hover:bg-sky-300'
                    }`}
                    aria-label={`Show page ${pageIndex + 1}`}
                    aria-pressed={activePageIndex === pageIndex}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
};
