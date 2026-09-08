import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  MessageSquareQuote,
  Send,
  ShieldCheck,
  Star,
  UserRound,
} from 'lucide-react';
import { legacyProfileIntro } from '../data/legacyProfile';
import { patientTestimonials } from '../data/patientTestimonials';

interface SubmitTestimonialPageProps {
  onOpenBooking: () => void;
  onViewProfile: () => void;
}

const reviewTypes = ['Website review', 'IWantGreatCare-style review'];

const careContexts = [
  'Robotic surgery',
  'Laparoscopic surgery',
  'Gallbladder surgery',
  'Hernia repair',
  'Endoscopy',
  'Consultation',
  'General surgical care',
];

const patientResources = [
  { label: 'First Visit Guide', href: '/#patient-info' },
  { label: 'Patient Forms', href: '/#patient-info' },
  { label: 'Post-Op Instructions', href: '/#patient-info' },
  { label: 'Insurance Info', href: '/#patient-info' },
];

export const SubmitTestimonialPage: React.FC<SubmitTestimonialPageProps> = ({
  onOpenBooking,
  onViewProfile,
}) => {
  const [reviewType, setReviewType] = useState(reviewTypes[0]);
  const [careContext, setCareContext] = useState(careContexts[0]);
  const [rating, setRating] = useState(5);
  const [privateName, setPrivateName] = useState('');
  const [contactDetail, setContactDetail] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [publishConsent, setPublishConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const formLabelClass = 'text-form-label block font-bold uppercase tracking-[0.08em] text-slate-700';
  const fieldClass = 'mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-base leading-6 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-700';
  const primaryButtonClass = 'text-button inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#294363] px-6 py-3 font-bold text-white shadow-sm transition hover:bg-[#1e3450] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700';

  return (
    <section className="bg-slate-50 text-slate-800">
      <div className="bg-[#064a5f] px-4 py-16 text-white sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <div className="text-eyebrow inline-flex items-center gap-2 rounded-full border border-sky-200/20 bg-white/10 px-4 py-1.5 text-sky-100">
              <MessageSquareQuote className="h-4 w-4 text-sky-300" />
              <span>Patient testimonials</span>
            </div>

            <h1 className="text-page-title mt-6 text-white">
              Submit Your Testimonial
            </h1>

            <p className="text-lead mt-5 max-w-2xl text-sky-50">
              If you are interested in submitting a testimonial for Prof. Sheth, please use the form below to do so.
            </p>
            <p className="text-body-small mt-2 font-semibold text-sky-100">Thanks!</p>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur">
            <p className="text-eyebrow text-sky-200">
              Privacy first
            </p>
            <p className="text-body-small mt-3 text-sky-50">
              Patient names are kept out of public testimonial displays. Contact details are only for private follow-up.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:py-16">
        <main className="space-y-8">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-eyebrow text-sky-700">
                  Write a review
                </p>
                <h2 className="text-subsection-title mt-2 text-navy-900">
                  Share feedback about your care
                </h2>
              </div>

              <div className="flex flex-wrap gap-2" aria-label="Review type">
                {reviewTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setReviewType(type)}
                    aria-pressed={reviewType === type}
                    className={`text-button rounded-full border px-4 py-2 font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700 ${
                      reviewType === type
                        ? 'border-sky-700 bg-sky-700 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-sky-200 hover:bg-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-form-help mt-5 text-slate-500">
              Fields marked <span className="font-bold text-red-600">*</span> are required.
            </p>

            {submitted ? (
              <div className="mt-7 rounded-xl border border-sky-200 bg-sky-50 p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-sky-700 shadow-sm">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-subsection-title mt-4 text-navy-900">
                  Thank you for your feedback
                </h3>
                <p className="text-body-small mx-auto mt-3 max-w-xl text-slate-600">
                  Your testimonial has been prepared for practice review. If published on the website, it will appear without your patient name.
                </p>
                <div className="mx-auto mt-5 max-w-xl rounded-lg border border-slate-200 bg-white p-4 text-left">
                  <p className="text-eyebrow text-sky-700">
                    Anonymous preview
                  </p>
                  <p className="text-body-small mt-3 italic text-slate-700">
                    &ldquo;{testimonial}&rdquo;
                  </p>
                  <p className="text-meta mt-4 font-bold uppercase tracking-[0.08em] text-slate-500">
                    Anonymous patient - {careContext}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setTestimonial('');
                    setPrivateName('');
                    setContactDetail('');
                    setRating(5);
                    setPublishConsent(true);
                  }}
                  className="text-button mt-5 rounded-lg bg-[#294363] px-5 py-3 font-bold text-white transition hover:bg-[#1e3450] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
                >
                  Write another testimonial
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="testimonial-context" className={formLabelClass}>
                      Care area <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="testimonial-context"
                      value={careContext}
                      onChange={(event) => setCareContext(event.target.value)}
                      className={`${fieldClass} font-medium`}
                    >
                      {careContexts.map((context) => (
                        <option key={context} value={context}>
                          {context}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className={formLabelClass}>
                      Rating <span className="text-red-600">*</span>
                    </span>
                    <div className="mt-2 flex min-h-[46px] items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRating(value)}
                          className={`rounded p-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700 ${
                            value <= rating ? 'text-amber-400' : 'text-slate-300 hover:text-amber-300'
                          }`}
                          aria-label={`${value} star${value > 1 ? 's' : ''}`}
                          aria-pressed={value <= rating}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="testimonial-name" className={formLabelClass}>
                      Private name
                    </label>
                    <input
                      id="testimonial-name"
                      type="text"
                      value={privateName}
                      onChange={(event) => setPrivateName(event.target.value)}
                      placeholder="For practice follow-up only"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="testimonial-contact" className={formLabelClass}>
                      Email or phone
                    </label>
                    <input
                      id="testimonial-contact"
                      type="text"
                      value={contactDetail}
                      onChange={(event) => setContactDetail(event.target.value)}
                      placeholder="Optional private contact detail"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="testimonial-message" className={formLabelClass}>
                    Testimonial <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="testimonial-message"
                    required
                    value={testimonial}
                    onChange={(event) => setTestimonial(event.target.value)}
                    rows={7}
                    placeholder="Tell us about your experience, care, explanation, operation or recovery."
                    className={`${fieldClass} resize-y`}
                  />
                </div>

                <label className="text-body-small flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-600">
                  <input
                    type="checkbox"
                    required
                    checked={publishConsent}
                    onChange={(event) => setPublishConsent(event.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-700"
                  />
                  <span>
                    <span className="font-semibold text-slate-800">I confirm this feedback may be reviewed by the practice before publication.</span>
                    {' '}If displayed publicly, it should appear anonymously.
                  </span>
                </label>

                <button
                  type="submit"
                  className={`${primaryButtonClass} w-full sm:w-auto`}
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Your Testimonial</span>
                </button>
              </form>
            )}
          </div>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-eyebrow text-sky-700">
                  Website reviews
                </p>
                <h2 className="text-subsection-title mt-2 text-navy-900">
                  Recent anonymous feedback
                </h2>
              </div>
              <div className="hidden items-center gap-1 text-amber-400 sm:flex" aria-hidden="true">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {patientTestimonials.slice(0, 4).map((review) => (
                <article key={review.id} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <p className="text-body-small italic text-slate-700">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                    <span className="text-meta font-bold uppercase tracking-[0.08em] text-slate-500">
                      Anonymous patient
                    </span>
                    <span className="text-meta rounded-full border border-sky-200 bg-white px-2.5 py-1 font-bold uppercase tracking-[0.08em] text-sky-700">
                      {review.context}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        <aside className="space-y-5">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#17293e] p-5 text-white">
              <div className="mx-auto h-40 w-32 overflow-hidden rounded-lg border border-white/20 bg-slate-900">
                <img
                  src={legacyProfileIntro.portrait.src}
                  alt={legacyProfileIntro.portrait.alt}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <h2 className="mt-4 text-center font-serif text-2xl font-bold">
                {legacyProfileIntro.name}
              </h2>
              <p className="text-body-small mt-2 text-center text-sky-100">
                {legacyProfileIntro.title}
              </p>
            </div>

            <div className="space-y-3 p-5">
              <button
                type="button"
                onClick={onViewProfile}
                className="text-button inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-bold text-[#294363] transition hover:border-sky-300 hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
              >
                <UserRound className="h-4 w-4" />
                <span>View Profile</span>
              </button>
              <button
                type="button"
                onClick={onOpenBooking}
                className="text-button inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#294363] px-4 py-2.5 font-bold text-white transition hover:bg-[#1e3450] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
              >
                <ClipboardCheck className="h-4 w-4" />
                <span>Book an Appointment</span>
              </button>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-sky-700" />
              <h2 className="font-serif text-xl font-bold text-navy-900">
                Patient Resources
              </h2>
            </div>
            <ul className="mt-4 space-y-2">
              {patientResources.map((resource) => (
                <li key={resource.label}>
                  <a
                    href={resource.href}
                    className="text-body-small flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-white hover:text-sky-700"
                  >
                    <span>{resource.label}</span>
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </section>
  );
};
