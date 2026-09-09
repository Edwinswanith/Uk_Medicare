import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface TreatmentCardData {
  id: string;
  detailId: string;
  category: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
}

const TREATMENTS: TreatmentCardData[] = [
  {
    id: 'gallbladder',
    detailId: '/treatments/hpb/gallbladder-surgery',
    category: 'HEPATOBILIARY',
    title: 'Gallbladder & Gallstones',
    image: '/treatments/gallbladder-gallstones.jpg',
    description: 'Minimally invasive assessment and treatment for gallstones and gallbladder conditions.',
    tags: ['Gallstones', 'Cholecystectomy'],
  },
  {
    id: 'reflux',
    detailId: '/treatments/upper-gi/anti-reflux-surgery',
    category: 'UPPER GI',
    title: 'Reflux & Hiatus Hernia',
    image: '/treatments/reflux-hiatus-hernia.jpg',
    description: 'Specialist assessment and surgical treatment for persistent reflux, GORD and hiatus hernia.',
    tags: ['GORD', 'Hiatus Hernia'],
  },
  {
    id: 'hernia',
    detailId: '/treatments/hernia/laparoscopic-hernia-surgery',
    category: 'HERNIA SURGERY',
    title: 'Hernia Repair',
    image: '/treatments/hernia-repair.jpg',
    description: 'Laparoscopic and robotic repair for common and complex abdominal wall hernias.',
    tags: ['Inguinal', 'Umbilical', 'Incisional'],
  },
  {
    id: 'liver-hpb',
    detailId: '/treatments/hpb/benign-liver-disease-surgery',
    category: 'HEPATOBILIARY',
    title: 'Liver & HPB Surgery',
    image: '/treatments/liver-hpb-surgery.jpg',
    description: 'Specialist surgical evaluation and care for complex hepatobiliary and liver conditions.',
    tags: ['Liver', 'Biliary'],
  },
  {
    id: 'endoscopy',
    detailId: '/treatments/upper-gi/endoscopy',
    category: 'DIAGNOSTICS',
    title: 'Upper GI Endoscopy',
    image: '/treatments/upper-gi-endoscopy.jpg',
    description: 'Diagnostic gastroscopy and precision assessment of upper gastrointestinal symptoms.',
    tags: ['Gastroscopy', 'Diagnosis'],
  },
  {
    id: 'appendix',
    detailId: '/treatments/appendicectomy/laparoscopic-appendicectomy',
    category: 'GENERAL LAPAROSCOPIC SURGERY',
    title: 'Appendix & Laparoscopic Surgery',
    image: '/treatments/appendix-laparoscopic-surgery.jpg',
    description: 'Keyhole surgical treatment for appendicitis and acute general surgical conditions.',
    tags: ['Appendix', 'Keyhole Surgery'],
  },
];

interface TreatmentsCarouselProps {
  onViewAllTreatments: () => void;
  onViewTreatment: (treatmentId: string) => void;
}

export const TreatmentsCarousel: React.FC<TreatmentsCarouselProps> = ({
  onViewAllTreatments,
  onViewTreatment,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollLimits = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const atStart = el.scrollLeft <= 5;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);
  };

  useEffect(() => {
    checkScrollLimits();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollLimits, { passive: true });
      window.addEventListener('resize', checkScrollLimits);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScrollLimits);
      window.removeEventListener('resize', checkScrollLimits);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardStep = 336; // Card width (318px) + gap (18px)
    const scrollAmount = direction === 'left' ? -cardStep : cardStep;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[#F8FBFD] pt-16 sm:pt-20 pb-20 sm:pb-24 overflow-hidden select-none">
      
      {/* ========================================================
          5. SUBTLE LAYERED SILK/RIBBON WAVE BACKGROUND
          Very soft translucent filled blue waves entering softly from
          the left and right edges. Base: #F8FBFD.
          No circles, no dashed curves, no technical diagrams, no hard outlines.
          ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <svg 
          className="absolute w-full h-full" 
          viewBox="0 0 1440 700" 
          fill="none" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Wave 1: rgba(218, 239, 250, 0.65) */}
            <linearGradient id="waveSilkLeft1" x1="0%" y1="20%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#DAEFFA" stopOpacity={0.65} />
              <stop offset="60%" stopColor="#E6F5FC" stopOpacity={0.30} />
              <stop offset="100%" stopColor="#F8FBFD" stopOpacity={0} />
            </linearGradient>

            {/* Wave 2: rgba(230, 245, 252, 0.75) */}
            <linearGradient id="waveSilkLeft2" x1="0%" y1="50%" x2="100%" y2="90%">
              <stop offset="0%" stopColor="#E6F5FC" stopOpacity={0.75} />
              <stop offset="65%" stopColor="#DAEFFA" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#F8FBFD" stopOpacity={0} />
            </linearGradient>

            {/* Wave 3: rgba(199, 230, 247, 0.38) */}
            <linearGradient id="waveSilkRight" x1="100%" y1="30%" x2="0%" y2="70%">
              <stop offset="0%" stopColor="#C7E6F7" stopOpacity={0.38} />
              <stop offset="60%" stopColor="#DAEFFA" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#F8FBFD" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Left Main Silk Ribbon Wave */}
          <path 
            d="M 0,0 C 260,50 390,200 340,410 C 290,600 130,660 0,700 Z" 
            fill="url(#waveSilkLeft1)" 
          />

          {/* Left Secondary Layered Ribbon Wave */}
          <path 
            d="M 0,300 C 180,350 280,480 230,630 C 190,690 90,700 0,700 Z" 
            fill="url(#waveSilkLeft2)" 
          />

          {/* Right Silk Ribbon Wave */}
          <path 
            d="M 1440,30 C 1200,100 1060,260 1120,480 C 1170,630 1300,680 1440,700 Z" 
            fill="url(#waveSilkRight)" 
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* ========================================================
            3. CENTRE-ALIGNED SECTION HEADING
            Reduced vertical whitespace by ~30px.
            Desktop: clamp(36px, 3.3vw, 50px), line-height: 1.02, max-w: 760px
            Mobile: 30px to 32px, line-height: ~1.08
            ======================================================== */}
        <div className="text-center max-w-[960px] mx-auto mb-3 sm:mb-4 px-2">
          <p 
            className="text-eyebrow text-[#0284c7]"
          >
            TREATMENTS &amp; SPECIALITIES
          </p>
          
          <h2 
            className="text-section-title text-slate-900 mt-2 max-w-[960px] mx-auto"
            style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
          >
            Specialist care for <br className="sm:hidden" />
            <span className="hidden sm:inline">upper GI, </span>
            <span className="sm:hidden">upper GI, hepatobiliary &amp;</span>
            <br />
            <span className="hidden sm:inline">hepatobiliary &amp; </span>
            abdominal conditions
          </h2>
          
          <p className="text-body text-slate-600 mt-3 max-w-2xl mx-auto">
            Evidence-based laparoscopic and robotic treatment tailored to your condition.
          </p>
        </div>

        {/* ========================================================
            CONTROLS ROW IMMEDIATELY ABOVE CARDS
            "View all treatments" + Previous / Next Arrow Controls
            ======================================================== */}
        <div className="flex items-center justify-between sm:justify-end gap-3 mb-3 sm:mb-4 px-1">
          <button
            type="button"
            onClick={onViewAllTreatments}
            className="text-button inline-flex items-center font-semibold font-sans text-sky-700 hover:text-sky-900 transition-colors group sm:mr-1.5"
          >
            <span>View all treatments</span>
            <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
          </button>

          {/* Dual Minimal Circular Controls (44px, white bg, thin pale-blue border, dark navy arrows) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous treatment"
              className="w-11 h-11 rounded-full bg-white border border-[#E3EDF3] text-[#0f274d] flex items-center justify-center shadow-sm hover:bg-[#f0f7fb] hover:border-sky-300 transition-all duration-300 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#E3EDF3]"
            >
              <ArrowLeft className="w-5 h-5 text-[#0f274d]" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next treatment"
              className="w-11 h-11 rounded-full bg-white border border-[#E3EDF3] text-[#0f274d] flex items-center justify-center shadow-sm hover:bg-[#f0f7fb] hover:border-sky-300 transition-all duration-300 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#E3EDF3]"
            >
              <ArrowRight className="w-5 h-5 text-[#0f274d]" />
            </button>
          </div>
        </div>

        {/* ========================================================
            4. HORIZONTAL CAROUSEL RAIL
            Desktop: ~3 complete cards + 60-75% of 4th card peeking (width: 318px, height: 420px)
            Mobile: 1.1-1.2 cards so next card is visibly peeking (width: 290px)
            ======================================================== */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-3.5 sm:gap-[18px] overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {TREATMENTS.map((treatment) => (
            <article
              key={treatment.id}
              onClick={() => onViewTreatment(treatment.detailId)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onViewTreatment(treatment.detailId);
                }
              }}
              role="button"
              tabIndex={0}
              className="snap-start flex-shrink-0 w-[290px] sm:w-[295px] md:w-[318px] bg-white rounded-[18px] border border-[#E3EDF3] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_12px_28px_rgba(2,132,199,0.09)] transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer overflow-hidden"
              style={{
                scrollSnapAlign: 'start',
                height: '448px',
              }}
            >
              {/* Anatomy Image (approx 47% of card height = 198px, object-fit: cover) */}
              <div className="relative w-full h-[198px] bg-[#f0f7fb] overflow-hidden rounded-t-[17px] flex-shrink-0">
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                />
              </div>

              {/* Card Content Underneath */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-eyebrow text-[#0284c7] block mb-1">
                    {treatment.category}
                  </span>

                  <h3 
                    className="font-serif font-semibold text-[21px] sm:text-[23px] text-slate-900 leading-[1.16] group-hover:text-[#0284c7] transition-colors"
                    style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
                  >
                    {treatment.title}
                  </h3>

                  <p className="text-body-small text-slate-600 mt-2">
                    {treatment.description}
                  </p>

                  {/* Tags: 1-3 small treatment tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {treatment.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-meta font-sans font-medium px-2.5 py-0.5 rounded-full bg-[#f0f7fb] text-slate-600 border border-[#e1eef6]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card CTA Link: Consistently anchored at the bottom */}
                <div className="text-button mt-3 pt-3 border-t border-slate-100 flex items-center justify-between font-sans font-semibold text-[#0284c7] group-hover:text-[#0369a1] transition-colors">
                  <span>View details</span>
                  <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300 text-sm">
                    &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
