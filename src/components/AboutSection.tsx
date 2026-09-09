import React from 'react';
import { ArrowRight, CalendarCheck, ExternalLink, Languages, Stethoscope } from 'lucide-react';
import {
  legacyProfileIntro,
  legacyProfileSections,
} from '../data/legacyProfile';
import { professionalIdentity, getVerified } from '../data/professionalIdentity';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onViewProfile: () => void;
}

const getProfileBullets = (sectionTitle: string) =>
  legacyProfileSections
    .find((section) => section.title === sectionTitle)
    ?.blocks.flatMap((block) => block.bullets ?? []) ?? [];

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenBooking,
  onViewProfile,
}) => {
  const clinicalInterests = getProfileBullets('Clinical Interests');
  const memberships = getVerified(professionalIdentity.memberships) ?? [];
  const languages = getVerified(professionalIdentity.languages) ?? [];
  const nhsRole = getVerified(professionalIdentity.nhsRole);

  return (
    <section id="about" className="bg-[#f8fbfd] py-16 text-slate-800 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_380px] lg:items-start">
          <div>
            <p className="text-eyebrow text-[#0284c7]">
              Professional Profile
            </p>
            <h2 className="mt-3 font-serif text-[40px] font-bold leading-tight text-navy-900 sm:text-[54px]">
              {legacyProfileIntro.name}
            </h2>
            <p className="mt-3 text-body font-extrabold uppercase tracking-[0.08em] text-[#294363]">
              {legacyProfileIntro.title}
            </p>
            <p className="mt-2 text-body-small font-bold uppercase tracking-[0.12em] text-teal-700">
              {legacyProfileIntro.subtitle}
            </p>

            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              {legacyProfileIntro.summary.map((paragraph) => (
                <p
                  key={paragraph}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-body-small text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.72fr)]">
              <div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-teal-700" />
                  <h3 className="font-serif text-[28px] font-bold leading-tight text-navy-900">
                    Specialist in Upper GI &amp; HPB Surgery
                  </h3>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {clinicalInterests.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-body-small font-bold text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-slate-200 bg-[#f8fbfd] p-5">
                {nhsRole && (
                  <div>
                    <p className="text-eyebrow text-sky-700">NHS role</p>
                    <p className="mt-2 text-body-small font-semibold text-slate-700">
                      {nhsRole}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-eyebrow text-sky-700">Professional memberships</p>
                  <p className="mt-2 text-body-small text-slate-700">
                    {memberships.slice(0, 4).join(', ')}
                  </p>
                </div>

                <div>
                  <p className="text-eyebrow flex items-center gap-1.5 text-sky-700">
                    <Languages className="h-4 w-4" />
                    <span>Languages spoken</span>
                  </p>
                  <p className="mt-2 text-body-small text-slate-700">
                    {languages.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onViewProfile}
                className="text-button inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#294363] px-6 py-3 font-bold text-white transition hover:bg-[#1e3450] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
              >
                <ExternalLink className="h-4 w-4" />
                <span>View complete profile</span>
              </button>

              <button
                type="button"
                onClick={onOpenBooking}
                className="text-button inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-bold text-[#294363] transition hover:border-[#294363] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
              >
                <CalendarCheck className="h-4 w-4" />
                <span>Book consultation</span>
              </button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-[0_18px_46px_rgba(15,23,42,0.08)]">
              <img
                src={legacyProfileIntro.portrait.src}
                alt={legacyProfileIntro.portrait.alt}
                className="h-[430px] w-full object-cover object-top"
                loading="lazy"
              />
              <div className="border-t border-slate-200 bg-white p-5">
                <p className="text-eyebrow text-[#0284c7]">Consultant profile</p>
                <p className="mt-2 font-serif text-[25px] font-bold leading-tight text-navy-900">
                  Upper GI, HPB, laparoscopic and robotic surgical care.
                </p>
                <button
                  type="button"
                  onClick={onViewProfile}
                  className="text-button mt-4 inline-flex items-center gap-2 font-bold text-sky-700 transition hover:text-sky-900"
                >
                  <span>Open professional profile</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
