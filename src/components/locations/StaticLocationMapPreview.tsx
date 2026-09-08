import React from 'react';
import { Navigation, MapPin } from 'lucide-react';
import { ClinicLocation } from '../../data/clinics';

interface StaticLocationMapPreviewProps {
  clinics: ClinicLocation[];
  selectedClinicId: string | null;
  onSelect: (clinic: ClinicLocation) => void;
}

const mainTiles = Array.from({ length: 25 }, (_, index) => ({
  x: 29 + (index % 5),
  y: 18 + Math.floor(index / 5),
}));

const regionalTiles = Array.from({ length: 25 }, (_, index) => ({
  x: 1020 + (index % 5),
  y: 678 + Math.floor(index / 5),
}));

const mainMarkerPositions: Record<string, string> = {
  'clementine-churchill': 'left-[46%] top-[63%]',
  'spire-bushey': 'left-[49%] top-[60%]',
  'wellington-elstree': 'left-[51%] top-[56%]',
};

const insetMarkerPositions: Record<string, string> = {
  'clementine-churchill': 'left-[48%] top-[63%]',
  'spire-bushey': 'left-[42%] top-[42%]',
  'wellington-elstree': 'left-[50%] top-[16%]',
};

const tileUrl = (zoom: number, x: number, y: number) =>
  `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;

const TileGrid: React.FC<{
  tiles: { x: number; y: number }[];
  zoom: number;
  className: string;
}> = ({ tiles, zoom, className }) => (
  <div
    className={`absolute grid grid-cols-5 ${className}`}
    style={{ gridTemplateColumns: 'repeat(5, 256px)' }}
    aria-hidden="true"
  >
    {tiles.map((tile) => (
      <img
        key={`${zoom}-${tile.x}-${tile.y}`}
        src={tileUrl(zoom, tile.x, tile.y)}
        alt=""
        className="h-64 w-64 select-none"
        draggable={false}
        loading="lazy"
      />
    ))}
  </div>
);

const StaticPin: React.FC<{
  clinic: ClinicLocation;
  isSelected: boolean;
  className: string;
  showLabel?: boolean;
  onSelect: (clinic: ClinicLocation) => void;
}> = ({ clinic, isSelected, className, showLabel = false, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(clinic)}
    className={`absolute z-20 flex -translate-x-1/2 -translate-y-full items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${className}`}
    aria-label={`Select ${clinic.name}`}
  >
    <span
      className={`relative flex h-12 w-12 items-center justify-center rounded-full transition motion-reduce:transition-none ${
        isSelected ? 'bg-white/70 shadow-[0_0_0_16px_rgba(255,255,255,0.46)]' : ''
      }`}
    >
      <MapPin
        className={`h-10 w-10 drop-shadow-lg ${
          isSelected
            ? 'fill-red-500 stroke-white text-red-500'
            : 'fill-red-500 stroke-white text-red-500'
        }`}
        strokeWidth={2.4}
      />
    </span>

    {showLabel && (
      <span
        className={`text-meta whitespace-nowrap rounded-full px-4 py-2 font-extrabold shadow-[0_12px_28px_rgba(15,23,42,0.16)] ${
          isSelected ? 'bg-white text-[#172943]' : 'bg-white/[0.88] text-[#203450]'
        }`}
      >
        {clinic.shortName}
      </span>
    )}
  </button>
);

export const StaticLocationMapPreview: React.FC<StaticLocationMapPreviewProps> = ({
  clinics,
  selectedClinicId,
  onSelect,
}) => (
  <div className="absolute inset-0 overflow-hidden bg-[#b9ddeb]">
    <TileGrid
      tiles={mainTiles}
      zoom={6}
      className="left-1/2 top-1/2 -translate-x-[48%] -translate-y-[45%] scale-[1.12] opacity-90"
    />
    <div className="absolute inset-0 bg-[#7ec8e3]/25" aria-hidden="true" />

    <button
      type="button"
      className="absolute bottom-[182px] left-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.92] text-[#203450] shadow-[0_14px_32px_rgba(15,23,42,0.18)] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      aria-label="Use current map area"
    >
      <Navigation className="h-5 w-5 fill-[#203450]" />
    </button>

    <div className="absolute left-[48%] top-[61%] z-10 hidden h-1 w-[28%] origin-left -rotate-[15deg] rounded-full bg-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.45)] lg:block" />

    {clinics.map((clinic) => (
      <StaticPin
        key={`main-${clinic.id}`}
        clinic={clinic}
        isSelected={clinic.id === selectedClinicId}
        className={mainMarkerPositions[clinic.id] ?? 'left-1/2 top-1/2'}
        onSelect={onSelect}
      />
    ))}

    <div className="absolute right-[5%] top-9 z-10 hidden aspect-square w-[min(40vw,560px)] overflow-hidden rounded-full border-[7px] border-white/95 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)] lg:block">
      <TileGrid
        tiles={regionalTiles}
        zoom={11}
        className="left-1/2 top-1/2 -translate-x-[51%] -translate-y-[50%] scale-[0.94] opacity-95"
      />
      <div className="absolute inset-0 bg-white/[0.08]" aria-hidden="true" />

      {clinics.map((clinic) => (
        <StaticPin
          key={`inset-${clinic.id}`}
          clinic={clinic}
          isSelected={clinic.id === selectedClinicId}
          className={insetMarkerPositions[clinic.id] ?? 'left-1/2 top-1/2'}
          showLabel
          onSelect={onSelect}
        />
      ))}
    </div>

    <div className="text-meta absolute bottom-5 right-5 z-20 hidden items-end gap-2 font-bold text-[#203450] lg:flex">
      <span className="block h-px w-28 bg-[#203450]" aria-hidden="true" />
      <span>10 km</span>
    </div>

    <a
      href="https://www.openstreetmap.org/copyright"
      target="_blank"
      rel="noopener noreferrer"
      className="text-caption absolute bottom-2 right-3 z-20 rounded bg-white/80 px-2 py-1 font-semibold text-slate-600"
    >
      &copy; OpenStreetMap contributors
    </a>
  </div>
);
