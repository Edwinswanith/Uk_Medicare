import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Stethoscope,
} from 'lucide-react';
import {
  TreatmentBreadcrumb,
  TreatmentCategory,
  TreatmentPage,
  getRelatedTreatments,
  getTreatmentBreadcrumbs,
  getTreatmentCategoryById,
  getTreatmentCategoryByPath,
  getTreatmentPageByPath,
  getTreatmentsForCategory,
  publicTreatmentCategories,
  publicTreatmentPages,
} from '../data/treatmentHierarchy';

interface TreatmentDetailsPageProps {
  currentPath: string;
  onBackHome?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onNavigate: (path: string) => void;
  onOpenBooking: (procedureName?: string) => void;
}

const isPlainLeftClick = (event: React.MouseEvent<HTMLAnchorElement>) =>
  event.button === 0 &&
  !event.metaKey &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  !event.defaultPrevented;

const InternalLink: React.FC<{
  path: string;
  onNavigate: (path: string) => void;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}> = ({ path, onNavigate, className, children, ariaLabel }) => (
  <a
    href={path}
    aria-label={ariaLabel}
    className={className}
    onClick={(event) => {
      if (!isPlainLeftClick(event)) return;

      event.preventDefault();
      onNavigate(path);
    }}
  >
    {children}
  </a>
);

const Breadcrumbs: React.FC<{
  items: TreatmentBreadcrumb[];
  onNavigate: (path: string) => void;
  dark?: boolean;
}> = ({ items, onNavigate, dark = false }) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex flex-wrap items-center gap-1 text-[13px] font-bold">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <li key={`${item.path}-${item.label}`} className="flex items-center gap-1">
            {isLast ? (
              <span className={dark ? 'text-white' : 'text-slate-900'}>
                {item.label}
              </span>
            ) : (
              <InternalLink
                path={item.path}
                onNavigate={onNavigate}
                className={dark ? 'text-sky-200 hover:text-white' : 'text-sky-700 hover:text-sky-900'}
              >
                {item.label}
              </InternalLink>
            )}
            {!isLast && (
              <ChevronRight
                className={`h-4 w-4 ${dark ? 'text-white/35' : 'text-slate-300'}`}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

const PageShell: React.FC<{
  breadcrumbs: TreatmentBreadcrumb[];
  eyebrow?: string;
  title: string;
  intro: string;
  onBackHome?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}> = ({ breadcrumbs, eyebrow = 'Treatments & specialities', title, intro, onBackHome, onNavigate, children }) => (
  <section className="bg-[#f8fbfd] text-slate-800">
    <div className="border-b border-sky-100 bg-[#081424] px-4 py-10 text-white sm:px-6 lg:py-14">
      <div className="mx-auto max-w-[1320px]">
        <a
          href="/"
          onClick={onBackHome}
          className="text-button inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-bold text-sky-100 transition hover:border-sky-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to home</span>
        </a>

        <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
          <div>
            <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} dark />
            <p className="text-eyebrow mt-8 text-sky-300">{eyebrow}</p>
            <h1 className="mt-3 font-serif text-[40px] font-bold leading-tight text-white sm:text-[56px] lg:text-[66px]">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-lead text-sky-100">
              {intro}
            </p>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/[0.08] p-5">
            <div className="flex items-start gap-3">
              <Stethoscope className="mt-1 h-5 w-5 shrink-0 text-sky-300" />
              <p className="text-body-small text-sky-50">
                General information only. Treatment choice depends on diagnosis,
                investigations, symptoms, fitness for surgery and consultation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {children}
  </section>
);

const TreatmentMiniCard: React.FC<{
  treatment: TreatmentPage;
  onNavigate: (path: string) => void;
}> = ({ treatment, onNavigate }) => (
  <article className="group flex min-h-[448px] flex-col overflow-hidden rounded-[18px] border border-[#E3EDF3] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_12px_28px_rgba(2,132,199,0.09)]">
    <div className="h-[198px] shrink-0 overflow-hidden rounded-t-[17px] bg-[#f0f7fb]">
      <img
        src={treatment.image}
        alt={treatment.title}
        loading="lazy"
        className="h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
      />
    </div>

    <div className="flex grow flex-col justify-between p-4 sm:p-5">
      <div>
        <p className="text-eyebrow mb-1 text-[#0284c7]">
          {getTreatmentCategoryById(treatment.categoryId)?.shortTitle ?? 'Treatment'}
        </p>
        <h3 className="font-serif text-[21px] font-semibold leading-[1.16] text-slate-900 transition-colors group-hover:text-[#0284c7] sm:text-[23px]">
          {treatment.title}
        </h3>
        <p className="mt-2 text-body-small font-semibold text-teal-700">
          {treatment.subtitle}
        </p>
        <p
          className="mt-2 overflow-hidden text-body-small text-slate-600"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 4,
          }}
        >
          {treatment.summary}
        </p>
      </div>

      <InternalLink
        path={treatment.path}
        onNavigate={onNavigate}
        className="text-button mt-4 flex min-h-11 items-center justify-between border-t border-slate-100 pt-3 font-semibold text-[#0284c7] transition-colors group-hover:text-[#0369a1]"
        ariaLabel={`Read about ${treatment.title}`}
      >
        <span>Read about {treatment.shortTitle}</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </InternalLink>
    </div>
  </article>
);

const OverviewPage: React.FC<{
  onBackHome?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onNavigate: (path: string) => void;
}> = ({ onBackHome, onNavigate }) => (
  <PageShell
    breadcrumbs={getTreatmentBreadcrumbs('/treatments')}
    title="Treatments & Specialities"
    intro="Explore care by speciality, then move into a focused clinical guide or a dedicated patient-information page for a specific treatment."
    onBackHome={onBackHome}
    onNavigate={onNavigate}
  >
    <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-eyebrow text-sky-700">Treatment directory</p>
          <h2 className="mt-2 font-serif text-[34px] font-bold leading-tight text-navy-900 sm:text-[44px]">
            Explore care by speciality
          </h2>
        </div>
        <p className="max-w-xl text-body text-slate-600 lg:text-right">
          Use the category route when you want context, or go directly to a
          treatment page if you already know the procedure.
        </p>
      </div>

      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {publicTreatmentCategories.map((category, index) => {
          const treatments = getTreatmentsForCategory(category.id);

          return (
            <article
              key={category.id}
              className="grid gap-5 py-8 transition-colors hover:bg-white/70 sm:py-10 lg:grid-cols-[72px_minmax(220px,0.8fr)_minmax(320px,1fr)_240px] lg:items-start"
            >
              <div className="font-serif text-[28px] font-semibold leading-none text-sky-700">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div>
                <h3 className="font-serif text-[32px] font-bold leading-tight text-navy-900 sm:text-[42px]">
                  {category.title}
                </h3>
                <p className="mt-3 max-w-md text-body text-slate-600">
                  {category.deck}
                </p>
              </div>

              <div>
                <p className="text-eyebrow text-slate-500">Treatments</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {treatments.map((treatment) => (
                    <InternalLink
                      key={treatment.id}
                      path={treatment.path}
                      onNavigate={onNavigate}
                      className="group/link flex min-h-11 items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[15px] font-bold text-slate-800 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
                    >
                      <span>{treatment.shortTitle}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-sky-600 transition-transform group-hover/link:translate-x-1" />
                    </InternalLink>
                  ))}
                </div>
              </div>

              <div className="lg:flex lg:justify-end">
                <InternalLink
                  path={category.path}
                  onNavigate={onNavigate}
                  className="text-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-2.5 font-bold text-sky-800 shadow-sm transition hover:border-sky-400 hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
                >
                  <span>{category.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </InternalLink>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </PageShell>
);

const CategoryPage: React.FC<{
  category: TreatmentCategory;
  onBackHome?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onNavigate: (path: string) => void;
  onOpenBooking: (procedureName?: string) => void;
}> = ({ category, onBackHome, onNavigate, onOpenBooking }) => {
  const treatments = getTreatmentsForCategory(category.id);
  const otherCategories = publicTreatmentCategories.filter((item) => item.id !== category.id);

  return (
    <PageShell
      breadcrumbs={getTreatmentBreadcrumbs(category.path)}
      title={category.title}
      intro={category.intro}
      onBackHome={onBackHome}
      onNavigate={onNavigate}
    >
      <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:items-start">
          <div className="overflow-hidden rounded-[18px] border border-[#E3EDF3] bg-white">
            <img
              src={category.image}
              alt=""
              className="h-[280px] w-full object-cover sm:h-[340px] lg:h-[420px]"
              loading="lazy"
            />
          </div>

          <div className="space-y-6">
            {category.sections.map((section) => (
              <section key={section.title} className="border-b border-slate-200 pb-5 last:border-b-0">
                <h2 className="font-serif text-[28px] font-bold leading-tight text-navy-900">
                  {section.title}
                </h2>
                {section.body && (
                  <p className="mt-3 text-body text-slate-600">
                    {section.body}
                  </p>
                )}
                {section.items && (
                  <ul className="mt-3 grid gap-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2 text-body text-slate-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>

        <section className="mt-12">
          <div className="mb-5 flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-eyebrow text-sky-700">Treatments</p>
              <h2 className="mt-1 font-serif text-[32px] font-bold leading-tight text-navy-900 sm:text-[40px]">
                Available {category.shortTitle} care
              </h2>
            </div>
            <p className="max-w-xl text-body text-slate-600 sm:text-right">
              Choose a treatment to read the full patient guide before booking.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {treatments.map((treatment) => (
              <TreatmentMiniCard
                key={treatment.id}
                treatment={treatment}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>

        <div className="mt-12 grid gap-5 rounded-[18px] border border-slate-200 bg-white p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-eyebrow text-sky-700">Your consultation</p>
            <h2 className="mt-2 font-serif text-[30px] font-bold leading-tight text-navy-900">
              Discuss the right treatment route
            </h2>
            <p className="mt-3 max-w-3xl text-body text-slate-600">
              Prof. Sheth will review symptoms, investigations and treatment aims before
              advising whether this speciality pathway is appropriate.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenBooking(category.title)}
            className="text-button inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#294363] px-6 py-3 font-bold text-white transition hover:bg-[#1e3450] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
          >
            <CalendarDays className="h-4 w-4" />
            <span>Request a consultation</span>
          </button>
        </div>

        <nav className="mt-8 border-t border-slate-200 pt-6" aria-label="Related treatment categories">
          <p className="text-eyebrow text-slate-500">Related care</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {otherCategories.map((item) => (
              <InternalLink
                key={item.id}
                path={item.path}
                onNavigate={onNavigate}
                className="text-button inline-flex min-h-11 items-center rounded-full border border-slate-200 bg-white px-4 py-2 font-bold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
              >
                {item.title}
              </InternalLink>
            ))}
          </div>
        </nav>
      </div>
    </PageShell>
  );
};

const SectionBlock: React.FC<{ section: TreatmentPage['sections'][number] }> = ({ section }) => (
  <section className="border-b border-slate-200 pb-7 last:border-b-0">
    <h2 className="font-serif text-[28px] font-bold leading-tight text-navy-900 sm:text-[34px]">
      {section.title}
    </h2>
    {section.body && (
      <p className="mt-3 text-body text-slate-600">
        {section.body}
      </p>
    )}
    {section.items && (
      <ul className="mt-4 grid gap-2">
        {section.items.map((item) => (
          <li key={item} className="flex gap-3 text-body text-slate-600">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}
  </section>
);

const TreatmentPageView: React.FC<{
  treatment: TreatmentPage;
  onBackHome?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onNavigate: (path: string) => void;
  onOpenBooking: (procedureName?: string) => void;
}> = ({ treatment, onBackHome, onNavigate, onOpenBooking }) => {
  const category = getTreatmentCategoryById(treatment.categoryId);
  const relatedTreatments = getRelatedTreatments(treatment);

  return (
    <PageShell
      breadcrumbs={getTreatmentBreadcrumbs(treatment.path)}
      title={treatment.title}
      intro={treatment.answerFirst}
      onBackHome={onBackHome}
      onNavigate={onNavigate}
    >
      <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,820px)_minmax(300px,1fr)] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-[18px] border border-[#E3EDF3] bg-white">
              <img
                src={treatment.image}
                alt=""
                loading="lazy"
                className="h-[260px] w-full object-cover sm:h-[340px]"
              />
            </div>

            <section className="mt-8">
              <p className="text-eyebrow text-sky-700">Quick patient guide</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {treatment.quickGuide.map((item) => (
                  <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-meta font-extrabold uppercase tracking-[0.12em] text-sky-700">
                      {item.label}
                    </p>
                    <p className="mt-2 text-body-small text-slate-700">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-10 space-y-7">
              {treatment.sections.map((section) => (
                <SectionBlock key={section.title} section={section} />
              ))}
            </div>

            <section className="mt-10 rounded-[18px] border border-slate-200 bg-white p-5 sm:p-6">
              <p className="text-eyebrow text-sky-700">Clinical review information</p>
              <h2 className="mt-2 font-serif text-[28px] font-bold leading-tight text-navy-900">
                General information for consultation
              </h2>
              <p className="mt-3 text-body text-slate-600">
                This page is written as patient education and should be confirmed during
                consultation. It does not replace personalised medical advice.
              </p>
            </section>

            <section className="mt-6 rounded-[18px] bg-[#081424] p-5 text-white sm:p-6">
              <p className="text-eyebrow text-sky-300">Request a consultation</p>
              <h2 className="mt-2 font-serif text-[30px] font-bold leading-tight">
                Ready to discuss {treatment.shortTitle}?
              </h2>
              <p className="mt-3 max-w-2xl text-body-small text-sky-50">
                Use the appointment flow when you are ready to discuss symptoms,
                investigations and treatment options with Prof. Sheth.
              </p>
              <button
                type="button"
                onClick={() => onOpenBooking(treatment.title)}
                className="text-button mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#38bdf8] px-6 py-3 font-bold text-[#081424] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <CalendarDays className="h-4 w-4" />
                <span>Request a consultation</span>
              </button>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            {category && (
              <InternalLink
                path={category.path}
                onNavigate={onNavigate}
                className="text-button inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-bold text-sky-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to {category.shortTitle}</span>
              </InternalLink>
            )}

            <div className="rounded-[18px] border border-slate-200 bg-white p-5">
              <p className="text-eyebrow text-slate-500">On this page</p>
              <div className="mt-3 space-y-2">
                {treatment.sections.slice(0, 7).map((section) => (
                  <p key={section.title} className="text-body-small font-semibold text-slate-700">
                    {section.title}
                  </p>
                ))}
              </div>
            </div>

            {relatedTreatments.length > 0 && (
              <div className="rounded-[18px] border border-slate-200 bg-white p-5">
                <p className="text-eyebrow text-slate-500">Related treatments</p>
                <div className="mt-3 space-y-2">
                  {relatedTreatments.map((related) => (
                    <InternalLink
                      key={related.id}
                      path={related.path}
                      onNavigate={onNavigate}
                      className="flex min-h-11 items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-body-small font-bold text-slate-800 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
                    >
                      <span>{related.shortTitle}</span>
                      <ArrowRight className="h-4 w-4 text-sky-600" />
                    </InternalLink>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </PageShell>
  );
};

export const TreatmentDetailsPage: React.FC<TreatmentDetailsPageProps> = ({
  currentPath,
  onBackHome,
  onNavigate,
  onOpenBooking,
}) => {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash || currentPath !== '/treatments') return;

    const targetTreatment = publicTreatmentPages.find((treatment) => treatment.id === hash);
    if (targetTreatment) {
      onNavigate(targetTreatment.path);
      return;
    }

    const targetCategory = publicTreatmentCategories.find((category) => category.id === hash);
    if (targetCategory) {
      onNavigate(targetCategory.path);
    }
  }, [currentPath, onNavigate]);

  const category = getTreatmentCategoryByPath(currentPath);
  if (category) {
    return (
      <CategoryPage
        category={category}
        onBackHome={onBackHome}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
      />
    );
  }

  const treatment = getTreatmentPageByPath(currentPath);
  if (treatment) {
    return (
      <TreatmentPageView
        treatment={treatment}
        onBackHome={onBackHome}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
      />
    );
  }

  return (
    <OverviewPage
      onBackHome={onBackHome}
      onNavigate={onNavigate}
    />
  );
};
