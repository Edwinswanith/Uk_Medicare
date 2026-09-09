import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  MessageSquareQuote,
  Quote,
  Star,
  X,
} from 'lucide-react';
import {
  featuredPatientTestimonials,
  patientTestimonials,
} from '../data/patientTestimonials';
import { getCleanedPatientTestimonials } from '../data/patientFeedbackCards';
import { PatientFeedbackCardsGallery } from './PatientFeedbackCardsGallery';

interface RoboticTestimonialsSectionProps {
  onSubmitTestimonial?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const AUTO_SLIDE_MS = 5600;
const SWIPE_THRESHOLD_PX = 48;

const toneStyles = {
  surgery: 'bg-sky-50 text-sky-800 border-sky-200',
  consultation: 'bg-teal-50 text-teal-800 border-teal-200',
  'nhs-care': 'bg-emerald-50 text-emerald-800 border-emerald-200',
  'private-care': 'bg-amber-50 text-amber-800 border-amber-200',
} as const;

const getRelativeSlidePosition = (index: number, activeIndex: number, total: number) => {
  const diff = (index - activeIndex + total) % total;

  if (diff === 0) return 'active';
  if (diff === 1) return 'next';
  if (diff === total - 1) return 'previous';
  return 'hidden';
};

const slideStyles = {
  previous: {
    opacity: 0.48,
    transform: 'translateX(-122%) scale(0.86)',
    zIndex: 10,
  },
  active: {
    opacity: 1,
    transform: 'translateX(-50%) scale(1)',
    zIndex: 30,
  },
  next: {
    opacity: 0.55,
    transform: 'translateX(22%) scale(0.86)',
    zIndex: 10,
  },
  hidden: {
    opacity: 0,
    transform: 'translateX(112%) scale(0.78)',
    zIndex: 0,
  },
} as const;

export const RoboticTestimonialsSection: React.FC<RoboticTestimonialsSectionProps> = ({
  onSubmitTestimonial,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const totalSlides = featuredPatientTestimonials.length;
  const cleanedFeedbackTestimonials = getCleanedPatientTestimonials();
  const cleanedFeedbackCardCount = cleanedFeedbackTestimonials.reduce(
    (total, testimonial) => total + testimonial.pages.length,
    0
  );

  useEffect(() => {
    if (!modalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen]);

  const moveSlide = useCallback((direction: 'next' | 'previous') => {
    setActiveIndex((current) => {
      if (direction === 'next') {
        return (current + 1) % featuredPatientTestimonials.length;
      }

      return (current - 1 + featuredPatientTestimonials.length) % featuredPatientTestimonials.length;
    });
  }, []);

  useEffect(() => {
    if (modalOpen || isPaused || totalSlides <= 1) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    const timer = window.setInterval(() => moveSlide('next'), AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, modalOpen, moveSlide, totalSlides]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
    setIsPaused(true);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;

    window.setTimeout(() => setIsPaused(false), 300);

    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const isHorizontalSwipe =
      Math.abs(deltaX) >= SWIPE_THRESHOLD_PX &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

    if (!isHorizontalSwipe) return;

    moveSlide(deltaX < 0 ? 'next' : 'previous');
  };

  return (
    <>
      <section
        id="patient-testimonials"
        className="relative overflow-hidden border-y border-teal-100 bg-[#e5f4f5] px-4 py-20 text-slate-800 sm:px-6 lg:py-24"
        aria-label="Patient testimonials"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-teal-200" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-teal-700 ring-1 ring-teal-200 shadow-sm">
            <Quote className="h-8 w-8" />
          </div>

          <p className="mt-6 font-serif text-[30px] leading-none text-navy-900 sm:text-[36px]">
            Patient
          </p>
          <h2 className="text-section-title mt-1 text-navy-900">
            Testimonials
          </h2>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-amber-400" aria-hidden="true">
            {[...Array(5)].map((_, index) => (
              <Star key={index} className="h-5 w-5 fill-current sm:h-6 sm:w-6" />
            ))}
          </div>

          <p className="text-meta mt-3 text-teal-800">
            <span className="font-extrabold text-teal-700">{cleanedFeedbackCardCount}+</span>
            {' '}patient feedback cards shared
          </p>

          <div
            className="mt-12 grid w-full items-center gap-4 lg:grid-cols-[44px_1fr_44px] lg:gap-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <button
              type="button"
              onClick={() => moveSlide('previous')}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-teal-200 bg-white text-navy-900 shadow-sm transition hover:border-teal-600 hover:bg-teal-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 lg:inline-flex"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div
              className="relative h-[330px] min-w-0 overflow-hidden sm:h-[340px] lg:h-[324px]"
              aria-live="polite"
              aria-label="Patient testimonial carousel"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {featuredPatientTestimonials.map((testimonial, index) => {
                const position = getRelativeSlidePosition(index, activeIndex, totalSlides);
                const isActive = position === 'active';

                return (
                  <article
                    key={testimonial.id}
                    className={`absolute left-1/2 top-0 flex h-full w-[min(76vw,620px)] flex-col justify-between overflow-hidden rounded-xl border p-4 text-left shadow-[0_20px_44px_rgba(15,42,69,0.14)] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:w-[min(72vw,720px)] sm:p-7 lg:w-[720px] ${
                      isActive
                        ? 'border-teal-200 bg-teal-50 text-navy-900'
                        : 'pointer-events-none border-sky-100 bg-sky-100/80 text-slate-500 blur-[0.2px]'
                    }`}
                    style={slideStyles[position]}
                    aria-hidden={!isActive}
                  >
                    <div>
                      <div className="flex items-start justify-end gap-4">
                        <div className="flex shrink-0 items-center gap-0.5 text-amber-400" aria-hidden="true">
                          {[...Array(5)].map((_, starIndex) => (
                            <Star key={starIndex} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>

                      <p
                        className={`mt-7 text-center font-semibold italic ${
                          isActive
                            ? 'text-testimonial-quote text-navy-900'
                            : 'text-[17px] leading-8 text-slate-400 sm:text-xl'
                        }`}
                      >
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>

                    <div className="text-meta mt-7 flex flex-col items-center justify-center gap-2 border-t border-sky-100 pt-5 text-center text-slate-600 sm:flex-row">
                      <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 font-bold uppercase tracking-[0.08em] text-teal-800">
                        {testimonial.sourceLabel}
                      </span>
                      <span className="hidden h-1 w-1 rounded-full bg-sky-300 sm:block" />
                      <span>{testimonial.context}</span>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => moveSlide('next')}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-teal-200 bg-white text-navy-900 shadow-sm transition hover:border-teal-600 hover:bg-teal-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 lg:inline-flex"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2" aria-label="Choose testimonial slide">
            {featuredPatientTestimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === index ? 'w-7 bg-teal-600' : 'w-2.5 bg-slate-300 hover:bg-teal-300'
                }`}
                aria-label={`Show testimonial ${index + 1}`}
                aria-pressed={activeIndex === index}
              />
            ))}
          </div>

          <div className="mt-16 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sky-500 px-8 py-3 font-bold text-white shadow-[0_14px_30px_rgba(14,165,233,0.24)] transition hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <MessageSquareQuote className="h-4 w-4" />
              <span>View All Testimonials</span>
            </button>

            <a
              href="/submit-testimonial"
              onClick={onSubmitTestimonial}
              className="text-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sky-500 px-8 py-3 font-bold text-white shadow-[0_14px_30px_rgba(14,165,233,0.18)] transition hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <span>Submit Your Testimonial</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 px-3 py-4 backdrop-blur-sm sm:px-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModalOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="all-testimonials-title"
            className="relative flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-xl bg-white text-slate-800 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-[#064a5f] px-5 py-5 text-white sm:px-7">
              <div>
                <p className="text-eyebrow text-sky-200">
                  Patient feedback
                </p>
                <h3 id="all-testimonials-title" className="text-subsection-title mt-1">
                  Patient Testimonials
                </h3>
                <p className="mt-2 text-sm text-sky-100">
                  {patientTestimonials.length} message testimonials
                  {cleanedFeedbackTestimonials.length > 0
                    ? ` and ${cleanedFeedbackTestimonials.length} cleaned feedback card testimonials`
                    : ''}
                  .
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white hover:text-[#064a5f] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close testimonials"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto bg-slate-50 px-4 py-5 sm:px-7 sm:py-7">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {patientTestimonials.map((testimonial) => (
                  <article
                    key={testimonial.id}
                    className="flex min-h-[220px] flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`text-meta rounded-full border px-2.5 py-1 font-extrabold uppercase tracking-[0.08em] ${toneStyles[testimonial.tone]}`}
                        >
                          {testimonial.context}
                        </span>
                        <div className="flex shrink-0 items-center gap-0.5 text-amber-400" aria-hidden="true">
                          {[...Array(5)].map((_, index) => (
                            <Star key={index} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      <p className="text-body-small mt-5 font-medium italic text-slate-700">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-end border-t border-slate-100 pt-4">
                      <span className="text-meta font-medium text-teal-700">
                        {testimonial.sourceLabel}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              <PatientFeedbackCardsGallery
                className="mt-9 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};
