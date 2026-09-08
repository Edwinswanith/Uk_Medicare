import React, { useEffect, useState } from 'react';
import { CalendarCheck, ChevronDown, ExternalLink, MapPin, Phone, X } from 'lucide-react';
import { CredibilityLogoTicker } from './CredibilityLogoTicker';
import {
  legacyProfileIntro,
  legacyProfileLocations,
  legacyProfileSections,
  ProfileBlock,
} from '../data/legacyProfile';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

const sectionDomId = (title: string) =>
  `profile-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

function ProfileContentBlock({ block }: { block: ProfileBlock }) {
  return (
    <div className="space-y-3">
      {block.heading && (
        <h4 className="font-serif text-[21px] font-bold leading-snug text-navy-900">
          {block.heading}
        </h4>
      )}

      {block.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="text-body-small text-slate-600">
          {paragraph}
        </p>
      ))}

      {block.bullets && (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {block.bullets.map((item) => (
            <li
              key={item}
              className="text-body-small flex gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-700"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {block.logos && (
        <div className="flex flex-wrap gap-3 pt-1">
          {block.logos.map((logo) => (
            <div
              key={logo.src}
              className="flex h-20 w-36 items-center justify-center rounded-lg border border-slate-200 bg-white p-3"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      )}

      {block.image && (
        <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <img
            src={block.image.src}
            alt={block.image.alt}
            className="mx-auto max-h-[70vh] w-full max-w-3xl object-contain p-2 sm:p-4"
          />
          <figcaption className="text-meta flex flex-col gap-2 border-t border-slate-200 px-3 py-2 font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>{block.image.label}</span>
            <a
              href={block.image.src}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-900"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Open full-size image</span>
            </a>
          </figcaption>
        </figure>
      )}
    </div>
  );
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [openSection, setOpenSection] = useState(legacyProfileSections[0]?.title ?? '');

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-900/75 px-3 py-4 backdrop-blur-sm sm:px-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm transition hover:bg-white hover:text-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          aria-label="Close profile"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto">
          <header className="bg-navy-900 text-white">
            <div className="grid gap-6 px-5 py-7 sm:px-8 lg:grid-cols-[220px_1fr] lg:items-center lg:py-8">
              <div className="mx-auto h-56 w-48 overflow-hidden rounded-lg border border-white/20 bg-navy-800 lg:mx-0">
                <img
                  src={legacyProfileIntro.portrait.src}
                  alt={legacyProfileIntro.portrait.alt}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="space-y-4 text-center lg:text-left">
                <div>
                  <p className="text-eyebrow text-teal-300">
                    Professional Profile
                  </p>
                  <h2
                    id="profile-modal-title"
                    className="text-page-title mt-2 text-white"
                  >
                    {legacyProfileIntro.name}
                  </h2>
                  <p className="text-body-small mt-2 font-semibold text-sky-100">
                    {legacyProfileIntro.title}
                  </p>
                  <p className="text-meta mt-1 uppercase tracking-[0.08em] text-sky-200">
                    {legacyProfileIntro.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="text-button inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-5 py-3 font-bold uppercase tracking-[0.08em] text-white transition hover:bg-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <CalendarCheck className="h-4 w-4" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          </header>

          <div className="space-y-5 px-5 py-6 sm:px-8 sm:py-8">
            <div className="grid gap-4 lg:grid-cols-3">
              {legacyProfileIntro.summary.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-body-small rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <section className="space-y-4">
              <div>
                <p className="text-eyebrow text-teal-700">
                  Locations
                </p>
                <h3 className="text-subsection-title mt-1 text-navy-900">
                  Practice Locations
                </h3>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {legacyProfileLocations.map((location) => (
                  <article
                    key={location.name}
                    className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <h4 className="font-serif text-[21px] font-bold leading-7 text-navy-900">
                      {location.name}
                    </h4>

                    <address className="text-body-small mt-3 flex-1 not-italic text-slate-600">
                      {location.address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>

                    <div className="mt-4 flex flex-col gap-2">
                      <a
                        href={location.phoneHref}
                        className="text-button inline-flex items-center justify-center gap-2 rounded-lg bg-navy-900 px-4 py-2.5 font-bold text-white transition hover:bg-navy-800"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{location.phone}</span>
                      </a>

                      <a
                        href={location.directionsHref}
                        target="_blank"
                        rel="noreferrer"
                        className="text-button inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 font-bold text-teal-700 transition hover:border-teal-300 hover:bg-teal-50"
                      >
                        <MapPin className="h-4 w-4" />
                        <span>Driving Directions</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <CredibilityLogoTicker compact />

            <div className="space-y-2">
              {legacyProfileSections.map((section) => {
                const isOpenSection = openSection === section.title;
                const id = sectionDomId(section.title);

                return (
                  <div
                    key={section.title}
                    className="overflow-hidden rounded-lg border border-slate-200 bg-white"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 bg-[#064f66] px-4 py-3 text-left text-white transition hover:bg-[#083f55] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-300 sm:px-5"
                      aria-expanded={isOpenSection}
                      aria-controls={id}
                      onClick={() => setOpenSection(isOpenSection ? '' : section.title)}
                    >
                      <span className="font-serif text-[19px] font-bold leading-6 sm:text-[22px]">
                        {section.title}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 transition-transform ${
                          isOpenSection ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpenSection && (
                      <div id={id} className="space-y-5 bg-slate-50 p-4 sm:p-5">
                        {section.blocks.map((block, index) => (
                          <ProfileContentBlock
                            key={`${section.title}-${block.heading ?? index}`}
                            block={block}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
