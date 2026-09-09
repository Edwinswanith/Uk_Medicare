import { ClinicLocation } from '../../data/clinics';

export type LocationsMapMode = 'uk' | 'region' | 'selected';

export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim() ?? '';
export const GOOGLE_MAPS_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID?.trim() || 'DEMO_MAP_ID';
export const USING_DEMO_MAP_ID = GOOGLE_MAPS_MAP_ID === 'DEMO_MAP_ID';

export const MAP_SECTION_ROOT_MARGIN = '320px';
export const MAP_SCRIPT_VERSION = 'weekly';

export const UK_VIEW = {
  center: { lat: 54.35, lng: -2.65 },
  zoom: 5.6,
};

export const REGIONAL_VIEW = {
  center: { lat: 51.615, lng: -0.326 },
  zoom: 10.2,
};

export const HOSPITAL_VIEW_ZOOM = 16;

export const MARKER_RED = '#D94B45';
export const SELECTED_MARKER_RED = '#B9342F';
export const MARKER_OUTLINE = '#ffffff';
export const MARKER_SHADOW = '0 10px 24px rgba(15, 23, 42, 0.28)';

export const GOOGLE_MAP_OPTIONS = {
  backgroundColor: '#eef2f6',
  clickableIcons: true,
  controlSize: 28,
  disableDefaultUI: false,
  fullscreenControl: true,
  gestureHandling: 'cooperative',
  keyboardShortcuts: true,
  mapTypeControl: false,
  rotateControl: false,
  scaleControl: true,
  streetViewControl: true,
  tilt: 0,
  zoomControl: true,
};

export const getClinicLatLng = (clinic: ClinicLocation) => ({
  lat: clinic.latitude,
  lng: clinic.longitude,
});

export const getClinicsCenter = (clinics: ClinicLocation[]) => {
  if (clinics.length === 0) return REGIONAL_VIEW.center;

  const totals = clinics.reduce(
    (sum, clinic) => ({
      lat: sum.lat + clinic.latitude,
      lng: sum.lng + clinic.longitude,
    }),
    { lat: 0, lng: 0 }
  );

  return {
    lat: totals.lat / clinics.length,
    lng: totals.lng / clinics.length,
  };
};
