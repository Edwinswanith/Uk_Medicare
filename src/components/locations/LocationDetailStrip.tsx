import React from 'react';
import { Building2, CalendarDays, MapPin, Navigation } from 'lucide-react';
import { ClinicLocation } from '../../data/clinics';

interface LocationDetailStripProps {
  clinic: ClinicLocation | null;
  onOpenBooking: (clinicId?: string) => void;
}

const getConsultationNote = (clinic: ClinicLocation) =>
  `Consultations can be requested at ${clinic.name}. Appointment availability is confirmed when the consultation request is reviewed.`;

const clinicImageById: Partial<Record<string, string>> = {
  'clementine-churchill': '/location-clementine-reference.png',
  'spire-bushey': '/location-spire-bushey.jpg',
  'wellington-elstree': '/location-wellington-elstree.jpg',
};

export const LocationDetailStrip: React.FC<LocationDetailStripProps> = ({
  clinic,
  onOpenBooking,
}) => (
  <div className="rounded-[22px] border border-white/80 bg-white/[0.92] p-4 shadow-[0_20px_60px_rgba(53,91,122,0.18)] backdrop-blur sm:p-5">
    {clinic ? (
      <div className="grid gap-5 lg:grid-cols-[220px_minmax(250px,1fr)_minmax(360px,1.2fr)_auto] lg:items-center">
        <div className="relative h-28 overflow-hidden rounded-2xl bg-[#dceaf3]">
          {clinicImageById[clinic.id] ? (
            <img
              src={clinicImageById[clinic.id]}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fbfd_0%,#d4e7f2_55%,#b8dbea_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-11 bg-white/[0.42]" />
              <div className="absolute left-5 top-5 flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-white/90 text-red-500 shadow-[0_12px_28px_rgba(15,23,42,0.12)]">
                <Building2 className="h-7 w-7" />
              </div>
              <div className="absolute bottom-4 left-5 right-5">
                <p className="text-eyebrow text-[#5f7088]">
                  Verified site
                </p>
                <p className="text-meta mt-1 truncate font-extrabold text-[#1b304d]">
                  {clinic.shortName}
                </p>
              </div>
            </>
          )}
        </div>

        <div>
          <p className="text-eyebrow text-red-500">
            Selected hospital
          </p>
          <h3 className="text-subsection-title mt-2 text-navy-900">
            {clinic.shortName}
          </h3>
          <p className="text-body-small mt-3 flex flex-wrap items-center gap-2 font-bold text-[#42556f]">
            <MapPin className="h-4 w-4 fill-red-500 text-red-500" />
            <span>{clinic.area}</span>
            <span className="text-slate-300">-</span>
            <span>{clinic.postcode}</span>
          </p>
        </div>

        <div className="text-body-small border-slate-200 text-[#5f7088] lg:border-l lg:pl-8">
          {getConsultationNote(clinic)}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <a
            href={clinic.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-button inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[#b8c6d6] bg-white px-6 py-3 font-extrabold text-[#1b304d] transition hover:border-[#1b304d] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <Navigation className="h-4 w-4 fill-[#1b304d]" />
            <span>Get directions</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenBooking(clinic.id)}
            className="text-button inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-red-500 px-6 py-3 font-extrabold text-white shadow-[0_16px_34px_rgba(239,68,68,0.24)] transition hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            <CalendarDays className="h-4 w-4" />
            <span>Request a consultation here</span>
          </button>
        </div>
      </div>
    ) : (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-eyebrow text-red-500">
            Select a hospital
          </p>
          <p className="text-body-small mt-1 text-[#5f7088]">
            Choose a marker or hospital selector to view the address, directions and consultation action.
          </p>
        </div>
        <p className="text-meta font-semibold text-slate-500">
          Appointment availability is confirmed during booking.
        </p>
      </div>
    )}
  </div>
);
