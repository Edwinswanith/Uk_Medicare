import React from 'react';
import {
  ClinicAvailabilityFilter,
  ClinicLocation,
  getClinicAvailability,
} from '../../data/clinics';

interface LocationSelectorProps {
  clinics: ClinicLocation[];
  activeFilter: ClinicAvailabilityFilter;
  selectedClinicId: string | null;
  onSelect: (clinic: ClinicLocation) => void;
  variant: 'overlay' | 'mobile';
}

const getAreaLabel = (clinic: ClinicLocation) => clinic.area.split(',')[0].toUpperCase();

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  clinics,
  activeFilter,
  selectedClinicId,
  onSelect,
  variant,
}) => (
  <div
    className={
      variant === 'overlay'
        ? 'pointer-events-auto flex w-full max-w-[640px] overflow-x-auto rounded-2xl border border-white/75 bg-white/[0.92] p-1 shadow-[0_18px_46px_rgba(15,23,42,0.14)] backdrop-blur md:w-[640px] md:p-0'
        : 'flex gap-2 overflow-x-auto pb-1'
    }
    role="listbox"
    aria-label="Select consultation hospital"
  >
    {clinics.map((clinic, index) => {
      const isSelected = clinic.id === selectedClinicId;
      const areaName = getAreaLabel(clinic);
      const availability = getClinicAvailability(clinic, activeFilter);

      return (
        <button
          key={clinic.id}
          type="button"
          onClick={() => onSelect(clinic)}
          aria-current={isSelected ? 'location' : undefined}
          aria-pressed={isSelected}
          className={`group relative min-w-[176px] flex-1 px-4 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500 motion-reduce:transition-none sm:min-w-[205px] sm:px-5 sm:py-5 ${
            variant === 'overlay'
              ? 'bg-transparent text-[#1b304d] hover:bg-white/70'
              : `rounded-xl border ${
                  isSelected
                    ? 'border-red-200 bg-white text-[#1b304d] shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700'
                }`
          }`}
          role="option"
          aria-selected={isSelected}
        >
          {variant === 'overlay' && index > 0 && (
            <span
              className="absolute bottom-5 left-0 top-5 w-px bg-slate-200 sm:bottom-6 sm:top-6"
              aria-hidden="true"
            />
          )}

          <span className="text-eyebrow block text-red-500">
            {areaName}
          </span>
          <span className="mt-2 block text-[16px] font-extrabold leading-5 text-[#1b304d] sm:text-[20px] sm:leading-6">
            {clinic.shortName}
          </span>
          <span className="text-meta mt-1 block font-medium text-[#5f7088]">
            {clinic.area}
          </span>

          <span className="mt-3 block space-y-1">
            {availability.map((period) => (
              <span
                key={period.id}
                className={`text-caption block rounded-lg px-2.5 py-1.5 font-extrabold uppercase tracking-[0.08em] ${
                  period.filter === 'alternate-thursday'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-slate-50 text-[#294363]'
                }`}
              >
                {period.day} - {period.time}
              </span>
            ))}
          </span>

          {isSelected && (
            <span
              className="absolute bottom-0 left-5 right-5 h-1 rounded-t-full bg-red-500"
              aria-hidden="true"
            />
          )}
        </button>
      );
    })}
  </div>
);
