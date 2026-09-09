import React from 'react';
import { Navigation, MapPin } from 'lucide-react';
import { ClinicLocation } from '../../data/clinics';
import { getClinicsCenter, LocationsMapMode, REGIONAL_VIEW, UK_VIEW } from './mapConfig';

interface StaticLocationMapPreviewProps {
  clinics: ClinicLocation[];
  mapMode: LocationsMapMode;
  selectedClinicId: string | null;
  onSelect: (clinic: ClinicLocation) => void;
}

interface TileLayerConfig {
  zoom: number;
  startX: number;
  startY: number;
  scale: number;
}

const TILE_SIZE = 256;
const TILE_COLUMNS = 5;
const TILE_GRID_SIZE = TILE_SIZE * TILE_COLUMNS;
const MAX_MERCATOR_LATITUDE = 85.05112878;

const ukLayerConfig: TileLayerConfig = {
  zoom: 6,
  startX: 29,
  startY: 18,
  scale: 1,
};

const regionalLayerConfig: TileLayerConfig = {
  zoom: 11,
  startX: 1020,
  startY: 678,
  scale: 1.12,
};

const insetLayerConfig: TileLayerConfig = {
  zoom: 11,
  startX: 1020,
  startY: 678,
  scale: 0.95,
};

const createTiles = ({ zoom, startX, startY }: TileLayerConfig) =>
  Array.from({ length: TILE_COLUMNS * TILE_COLUMNS }, (_, index) => ({
    key: `${zoom}-${startX + (index % TILE_COLUMNS)}-${startY + Math.floor(index / TILE_COLUMNS)}`,
    x: startX + (index % TILE_COLUMNS),
    y: startY + Math.floor(index / TILE_COLUMNS),
  }));

const tileUrl = (zoom: number, x: number, y: number) =>
  `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;

const projectToTilePoint = (latitude: number, longitude: number, zoom: number) => {
  const clampedLatitude = Math.max(
    Math.min(latitude, MAX_MERCATOR_LATITUDE),
    -MAX_MERCATOR_LATITUDE
  );
  const scale = 2 ** zoom;
  const latitudeRadians = (clampedLatitude * Math.PI) / 180;

  return {
    x: ((longitude + 180) / 360) * scale,
    y:
      ((1 -
        Math.log(Math.tan(latitudeRadians) + 1 / Math.cos(latitudeRadians)) / Math.PI) /
        2) *
      scale,
  };
};

const getPixelPosition = (
  point: { latitude: number; longitude: number },
  config: TileLayerConfig
) => {
  const tilePoint = projectToTilePoint(point.latitude, point.longitude, config.zoom);

  return {
    x: (tilePoint.x - config.startX) * TILE_SIZE,
    y: (tilePoint.y - config.startY) * TILE_SIZE,
  };
};

const getClinicPinStyle = (
  clinic: ClinicLocation,
  config: TileLayerConfig
): React.CSSProperties => {
  const position = getPixelPosition(
    { latitude: clinic.latitude, longitude: clinic.longitude },
    config
  );

  return {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };
};

const TileGrid: React.FC<{
  tiles: ReturnType<typeof createTiles>;
  zoom: number;
}> = ({ tiles, zoom }) => (
  <div
    className="absolute grid grid-cols-5"
    style={{ gridTemplateColumns: `repeat(${TILE_COLUMNS}, ${TILE_SIZE}px)` }}
    aria-hidden="true"
  >
    {tiles.map((tile) => (
      <img
        key={tile.key}
        src={tileUrl(zoom, tile.x, tile.y)}
        alt=""
        className="h-64 w-64 select-none"
        draggable={false}
        loading="lazy"
      />
    ))}
  </div>
);

const MapTileLayer: React.FC<{
  config: TileLayerConfig;
  center: { latitude: number; longitude: number };
  overlayClassName: string;
  children: React.ReactNode;
}> = ({ config, center, overlayClassName, children }) => {
  const centerPosition = getPixelPosition(center, config);
  const tiles = createTiles(config);

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        height: `${TILE_GRID_SIZE}px`,
        transform: `translate(${-centerPosition.x * config.scale}px, ${
          -centerPosition.y * config.scale
        }px)`,
        width: `${TILE_GRID_SIZE}px`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${config.scale})`,
          transformOrigin: 'top left',
        }}
      >
        <TileGrid tiles={tiles} zoom={config.zoom} />
        <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden="true" />
        {children}
      </div>
    </div>
  );
};

const StaticPin: React.FC<{
  clinic: ClinicLocation;
  isSelected: boolean;
  style: React.CSSProperties;
  showLabel?: boolean;
  onSelect: (clinic: ClinicLocation) => void;
}> = ({ clinic, isSelected, style, showLabel = false, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(clinic)}
    className="absolute z-20 flex -translate-x-1/2 -translate-y-full items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    style={style}
    aria-label={`Select ${clinic.name}`}
  >
    <span
      className={`relative flex h-12 w-12 items-center justify-center rounded-full transition motion-reduce:transition-none ${
        isSelected ? 'bg-white/70 shadow-[0_0_0_16px_rgba(255,255,255,0.46)]' : ''
      }`}
    >
      <MapPin
        className="h-10 w-10 fill-red-500 stroke-white text-red-500 drop-shadow-lg"
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
  mapMode,
  selectedClinicId,
  onSelect,
}) => {
  const clinicsCenter = getClinicsCenter(clinics);
  const selectedClinic = clinics.find((clinic) => clinic.id === selectedClinicId);
  const activeLayerConfig = mapMode === 'uk' ? ukLayerConfig : regionalLayerConfig;
  const mapCenter =
    mapMode === 'uk'
      ? { latitude: UK_VIEW.center.lat, longitude: UK_VIEW.center.lng }
      : mapMode === 'selected' && selectedClinic
      ? { latitude: selectedClinic.latitude, longitude: selectedClinic.longitude }
      : {
          latitude: clinicsCenter.lat || REGIONAL_VIEW.center.lat,
          longitude: clinicsCenter.lng || REGIONAL_VIEW.center.lng,
        };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#b9ddeb]">
      <MapTileLayer
        config={activeLayerConfig}
        center={mapCenter}
        overlayClassName={mapMode === 'uk' ? 'bg-[#7ec8e3]/25' : 'bg-[#7ec8e3]/20'}
      >
        {clinics.map((clinic) => (
          <StaticPin
            key={`main-${clinic.id}`}
            clinic={clinic}
            isSelected={clinic.id === selectedClinicId}
            style={getClinicPinStyle(clinic, activeLayerConfig)}
            onSelect={onSelect}
          />
        ))}
      </MapTileLayer>

      <button
        type="button"
        className="absolute bottom-[164px] left-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.92] text-[#203450] shadow-[0_14px_32px_rgba(15,23,42,0.18)] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 md:bottom-[182px] md:left-5 md:h-12 md:w-12"
        aria-label="Use current map area"
      >
        <Navigation className="h-5 w-5 fill-[#203450]" />
      </button>

      {mapMode !== 'uk' && (
        <div className="absolute right-[5%] top-9 z-10 hidden aspect-square w-[min(40vw,560px)] overflow-hidden rounded-full border-[7px] border-white/95 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)] lg:block">
          <MapTileLayer
            config={insetLayerConfig}
            center={mapCenter}
            overlayClassName="bg-white/[0.08]"
          >
            {clinics.map((clinic) => (
              <StaticPin
                key={`inset-${clinic.id}`}
                clinic={clinic}
                isSelected={clinic.id === selectedClinicId}
                style={getClinicPinStyle(clinic, insetLayerConfig)}
                showLabel
                onSelect={onSelect}
              />
            ))}
          </MapTileLayer>
        </div>
      )}

      <div className="text-meta absolute bottom-5 right-5 z-30 hidden items-end gap-2 font-bold text-[#203450] lg:flex">
        <span className="block h-px w-28 bg-[#203450]" aria-hidden="true" />
        <span>10 km</span>
      </div>

      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
        className="text-caption absolute bottom-2 right-3 z-30 rounded bg-white/80 px-2 py-1 font-semibold text-slate-600"
      >
        &copy; OpenStreetMap contributors
      </a>
    </div>
  );
};
