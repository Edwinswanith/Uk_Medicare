import React, { useEffect } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ShieldAlert,
  Stethoscope,
} from 'lucide-react';
import {
  treatmentDetailGroups,
  treatmentDetails,
  TreatmentDetail,
} from '../data/treatmentDetails';

interface TreatmentDetailsPageProps {
  onBackHome?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onOpenBooking: (procedureName?: string) => void;
}

const SectionList: React.FC<{
  title: string;
  items: string[];
  tone?: 'clinical' | 'recovery' | 'risk';
}> = ({ title, items, tone = 'clinical' }) => {
  const Icon = tone === 'risk' ? ShieldAlert : tone === 'recovery' ? Clock3 : CheckCircle2;
  const iconClass =
    tone === 'risk'
      ? 'text-amber-600'
      : tone === 'recovery'
        ? 'text-sky-700'
        : 'text-teal-700';

  return (
    <div>
      <h4 className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase leading-tight tracking-[0.08em] text-slate-500">
        <Icon className={`h-3.5 w-3.5 shrink-0 ${iconClass}`} />
        {title}
      </h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-[13px] leading-5 text-slate-700">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone === 'risk' ? 'bg-amber-500' : tone === 'recovery' ? 'bg-sky-600' : 'bg-teal-600'}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TreatmentCard: React.FC<{
  treatment: TreatmentDetail;
  onOpenBooking: (procedureName?: string) => void;
}> = ({ treatment, onOpenBooking }) => (
  <article
    id={treatment.id}
    className="scroll-mt-40 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-sky-200 hover:shadow-[0_18px_42px_rgba(15,42,69,0.09)]"
  >
    <div className="grid min-h-full sm:grid-cols-[180px_minmax(0,1fr)]">
      <div className="h-44 bg-slate-100 sm:h-full sm:min-h-[248px]">
        <img
          src={treatment.image}
          alt={treatment.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-h-full flex-col p-4 sm:p-5">
        <p className="text-[10px] font-extrabold uppercase leading-none tracking-[0.14em] text-sky-700">
          {treatment.groupTitle}
        </p>
        <h3 className="mt-2 font-serif text-[24px] font-bold leading-tight text-navy-900 sm:text-[28px]">
          {treatment.title}
        </h3>
        <p className="mt-1.5 text-[14px] font-semibold leading-5 text-teal-700">
          {treatment.subtitle}
        </p>
        <p className="mt-3 text-[14px] leading-6 text-slate-600">
          {treatment.overview}
        </p>

        <div className="mt-5 grid gap-x-5 gap-y-4 md:grid-cols-2">
          <SectionList title="When it may be considered" items={treatment.indications} />
          <SectionList title="What treatment involves" items={treatment.procedure} />
          <SectionList title="Recovery planning" items={treatment.recovery} tone="recovery" />
          <SectionList title="Risks to discuss" items={treatment.risks} tone="risk" />
        </div>

        <button
          type="button"
          onClick={() => onOpenBooking(treatment.title)}
          className="text-button mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#294363] px-5 py-2.5 font-bold text-white transition hover:bg-[#1e3450] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700 sm:w-fit"
        >
          <CalendarDays className="h-4 w-4" />
          <span>Book consultation</span>
        </button>
      </div>
    </div>
  </article>
);

export const TreatmentDetailsPage: React.FC<TreatmentDetailsPageProps> = ({
  onBackHome,
  onOpenBooking,
}) => {
  useEffect(() => {
    const targetId = window.location.hash.replace('#', '');
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 0);
  }, []);

  return (
    <section className="bg-[#f8fbfd] text-slate-800">
      <div className="border-b border-sky-100 bg-[#081424] px-4 py-10 text-white sm:px-6 lg:py-14">
        <div className="mx-auto max-w-[1480px]">
          <a
            href="/"
            onClick={onBackHome}
            className="text-button inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-bold text-sky-100 transition hover:border-sky-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to home</span>
          </a>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <div>
              <p className="text-eyebrow text-sky-300">Treatments &amp; specialities</p>
              <h1 className="mt-2 font-serif text-[38px] font-bold leading-tight text-white sm:text-[52px] lg:text-[58px]">
                Treatment details
              </h1>
              <p className="mt-5 max-w-3xl text-lead text-sky-100">
                Patient-facing information about the main upper GI, HPB, hernia and
                appendicectomy services provided by Prof. Hemant Sheth.
              </p>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/[0.08] p-5">
              <div className="flex items-start gap-3">
                <Stethoscope className="mt-1 h-5 w-5 shrink-0 text-sky-300" />
                <p className="text-body-small text-sky-50">
                  This page is general information only. The right treatment depends on
                  diagnosis, symptoms, imaging, fitness for surgery and consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-[142px] z-40 border-b border-slate-200 bg-[#f8fbfd]/95 px-4 py-3 shadow-sm backdrop-blur sm:px-6 md:top-[94px]">
        <nav className="mx-auto flex max-w-[1480px] gap-2 overflow-x-auto" aria-label="Treatment groups">
          {treatmentDetailGroups.map((group) => {
            const treatmentCount = treatmentDetails.filter(
              (treatment) => treatment.groupId === group.id
            ).length;

            return (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="text-button inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-bold text-slate-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
              >
                <span>{group.title}</span>
                <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-extrabold text-sky-800">
                  {treatmentCount}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-10">
          {treatmentDetailGroups.map((group) => {
            const groupTreatments = treatmentDetails.filter(
              (treatment) => treatment.groupId === group.id
            );

            return (
              <section key={group.id} id={group.id} className="scroll-mt-24">
                <div className="mb-4 flex flex-col gap-2 border-b border-slate-200 pb-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-eyebrow text-sky-700">Treatment group</p>
                    <h2 className="mt-1 font-serif text-[30px] font-bold leading-tight text-navy-900 sm:text-[38px]">
                      {group.title}
                    </h2>
                  </div>
                  <p className="max-w-2xl text-body text-slate-600 lg:text-right">{group.intro}</p>
                </div>

                <div className="grid gap-5 xl:grid-cols-2">
                  {groupTreatments.map((treatment) => (
                    <TreatmentCard
                      key={treatment.id}
                      treatment={treatment}
                      onOpenBooking={onOpenBooking}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
};
