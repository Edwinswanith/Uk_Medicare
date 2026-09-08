import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Globe2, Loader2, LocateFixed, MapPin, Minus, Plus } from 'lucide-react';
import { ClinicLocation, clinicLocations } from '../../data/clinics';
import { LocationDetailStrip } from './LocationDetailStrip';
import { LocationSelector } from './LocationSelector';
import { StaticLocationMapPreview } from './StaticLocationMapPreview';
import { loadGoogleMaps } from './googleMapsLoader';
import {
  GOOGLE_MAP_OPTIONS,
  GOOGLE_MAPS_API_KEY,
  GOOGLE_MAPS_MAP_ID,
  HOSPITAL_VIEW_ZOOM,
  MAP_SECTION_ROOT_MARGIN,
  MARKER_OUTLINE,
  MARKER_RED,
  MARKER_SHADOW,
  REGIONAL_VIEW,
  SELECTED_MARKER_RED,
  UK_VIEW,
  USING_DEMO_MAP_ID,
  getClinicLatLng,
  getClinicsCenter,
} from './mapConfig';

interface InteractiveLocationsMapProps {
  onOpenBooking: (clinicId?: string) => void;
}

type MapLoadState = 'idle' | 'loading' | 'ready' | 'missing-key' | 'error';

const getAccessibleMarkerLabel = (clinic: ClinicLocation) =>
  `${clinic.name}, ${clinic.area}`;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const createMarkerContent = (
  PinElement: any,
  clinic: ClinicLocation,
  selected: boolean,
  showLabel: boolean
) => {
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.gap = '8px';
  wrapper.style.transform = selected ? 'translateY(-2px)' : 'translateY(0)';
  wrapper.style.transition = prefersReducedMotion()
    ? 'none'
    : 'transform 160ms ease, filter 160ms ease';

  const glyph = document.createElement('span');
  glyph.setAttribute('aria-hidden', 'true');
  Object.assign(glyph.style, {
    width: selected ? '10px' : '8px',
    height: selected ? '10px' : '8px',
    borderRadius: '999px',
    background: '#ffffff',
    display: 'block',
  });

  const pin = new PinElement({
    background: selected ? SELECTED_MARKER_RED : MARKER_RED,
    borderColor: selected ? MARKER_OUTLINE : '#ffffff',
    glyph,
    glyphColor: '#ffffff',
    scale: selected ? 1.12 : 1,
  });

  const pinElement = pin.element ?? pin;
  pinElement.style.filter = MARKER_SHADOW;
  wrapper.appendChild(pinElement);

  if (showLabel) {
    const label = document.createElement('span');
    label.textContent = clinic.shortName;
    Object.assign(label.style, {
      background: 'rgba(255, 255, 255, 0.92)',
      borderRadius: '999px',
      boxShadow: '0 12px 28px rgba(15, 23, 42, 0.16)',
      color: '#172943',
      fontSize: '13px',
      fontWeight: '800',
      lineHeight: '1',
      padding: '11px 14px',
      whiteSpace: 'nowrap',
    });
    wrapper.appendChild(label);
  }

  wrapper.addEventListener('mouseenter', () => {
    if (!prefersReducedMotion()) {
      wrapper.style.transform = 'translateY(-3px)';
    }
  });
  wrapper.addEventListener('mouseleave', () => {
    wrapper.style.transform = selected ? 'translateY(-2px)' : 'translateY(0)';
  });

  return wrapper;
};

export const InteractiveLocationsMap: React.FC<InteractiveLocationsMapProps> = ({
  onOpenBooking,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const insetMapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any | null>(null);
  const insetMapRef = useRef<any | null>(null);
  const markerLibraryRef = useRef<{ AdvancedMarkerElement: any; PinElement: any } | null>(null);
  const markersRef = useRef<Map<string, any[]>>(new Map());
  const cameraTimersRef = useRef<number[]>([]);

  const clinics = useMemo(
    () => clinicLocations.filter((clinic) => clinic.coordinateStatus === 'verified'),
    []
  );
  const firstClinicId = clinics[0]?.id ?? null;
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(firstClinicId);
  const [mapMode, setMapMode] = useState<'uk' | 'region' | 'selected'>('region');
  const [loadState, setLoadState] = useState<MapLoadState>(
    GOOGLE_MAPS_API_KEY ? 'idle' : 'missing-key'
  );
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [announcement, setAnnouncement] = useState('All consultation locations are visible.');

  const selectedClinic = selectedClinicId
    ? clinics.find((clinic) => clinic.id === selectedClinicId) ?? null
    : null;

  const clearCameraTimers = useCallback(() => {
    cameraTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    cameraTimersRef.current = [];
  }, []);

  const queueCameraStep = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, delay);
    cameraTimersRef.current.push(timer);
  }, []);

  const registerMarker = (clinicId: string, marker: any, showLabel: boolean) => {
    marker.__showLabel = showLabel;
    const existingMarkers = markersRef.current.get(clinicId) ?? [];
    existingMarkers.push(marker);
    markersRef.current.set(clinicId, existingMarkers);
  };

  const updateMarkerStyles = useCallback(
    (nextSelectedClinicId: string | null) => {
      const PinElement = markerLibraryRef.current?.PinElement;
      if (!PinElement) return;

      clinics.forEach((clinic) => {
        const clinicMarkers = markersRef.current.get(clinic.id) ?? [];
        const isSelected = clinic.id === nextSelectedClinicId;

        clinicMarkers.forEach((marker) => {
          marker.content = createMarkerContent(
            PinElement,
            clinic,
            isSelected,
            Boolean(marker.__showLabel)
          );
          marker.zIndex = isSelected ? 100 : 10;
          marker.title = getAccessibleMarkerLabel(clinic);
        });
      });
    },
    [clinics]
  );

  const moveToClinic = useCallback(
    (clinic: ClinicLocation) => {
      const map = mapRef.current;
      const insetMap = insetMapRef.current;
      const target = getClinicLatLng(clinic);

      clearCameraTimers();

      if (insetMap) {
        insetMap.panTo(target);
        insetMap.setZoom(12);
      }

      if (!map) return;

      const currentZoom = map.getZoom?.() ?? UK_VIEW.zoom;

      if (prefersReducedMotion()) {
        map.setCenter(target);
        map.setZoom(HOSPITAL_VIEW_ZOOM);
        return;
      }

      if (currentZoom < REGIONAL_VIEW.zoom - 0.5) {
        map.panTo(target);
        queueCameraStep(() => map.setZoom(REGIONAL_VIEW.zoom), 150);
        queueCameraStep(() => map.panTo(target), 360);
        queueCameraStep(() => map.setZoom(HOSPITAL_VIEW_ZOOM), 650);
      } else {
        map.panTo(target);
        queueCameraStep(() => map.setZoom(HOSPITAL_VIEW_ZOOM), 280);
      }

      queueCameraStep(() => map.panTo(target), 820);
    },
    [clearCameraTimers, queueCameraStep]
  );

  const handleSelectClinic = useCallback(
    (clinic: ClinicLocation) => {
      setSelectedClinicId(clinic.id);
      setMapMode('selected');
      updateMarkerStyles(clinic.id);
      moveToClinic(clinic);
      setAnnouncement(`${clinic.name} selected. The map is centred on ${clinic.area}.`);
    },
    [moveToClinic, updateMarkerStyles]
  );

  const viewAllLocations = useCallback(() => {
    const map = mapRef.current;
    const insetMap = insetMapRef.current;
    const nextSelectedClinicId = selectedClinicId ?? firstClinicId;

    setSelectedClinicId(nextSelectedClinicId);
    setMapMode('region');
    updateMarkerStyles(nextSelectedClinicId);
    setAnnouncement('Showing London and Hertfordshire consultation locations.');

    if (insetMap) {
      insetMap.setCenter(getClinicsCenter(clinics));
      insetMap.setZoom(11);
    }

    if (!map) return;

    clearCameraTimers();

    if (prefersReducedMotion()) {
      map.setCenter(UK_VIEW.center);
      map.setZoom(UK_VIEW.zoom);
      return;
    }

    map.panTo(UK_VIEW.center);
    queueCameraStep(() => map.setZoom(UK_VIEW.zoom), 220);
  }, [
    clearCameraTimers,
    clinics,
    firstClinicId,
    queueCameraStep,
    selectedClinicId,
    updateMarkerStyles,
  ]);

  const viewUkOverview = useCallback(() => {
    const map = mapRef.current;

    setSelectedClinicId(null);
    setMapMode('uk');
    updateMarkerStyles(null);
    setAnnouncement('Showing the United Kingdom overview. No hospital is currently selected.');

    if (!map) return;

    clearCameraTimers();

    if (prefersReducedMotion()) {
      map.setCenter(UK_VIEW.center);
      map.setZoom(UK_VIEW.zoom);
      return;
    }

    map.panTo(UK_VIEW.center);
    queueCameraStep(() => map.setZoom(Math.max(REGIONAL_VIEW.zoom - 1, UK_VIEW.zoom)), 150);
    queueCameraStep(() => map.setZoom(UK_VIEW.zoom), 430);
  }, [clearCameraTimers, queueCameraStep, updateMarkerStyles]);

  const changeZoom = useCallback((direction: 'in' | 'out') => {
    const map = mapRef.current;
    if (!map) return;

    const currentZoom = map.getZoom?.() ?? REGIONAL_VIEW.zoom;
    map.setZoom(direction === 'in' ? currentZoom + 1 : currentZoom - 1);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoadMap(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: MAP_SECTION_ROOT_MARGIN }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadMap || !GOOGLE_MAPS_API_KEY || !mapElementRef.current || mapRef.current) return;

    let cancelled = false;
    setLoadState('loading');

    const initialiseMap = async () => {
      try {
        const google = await loadGoogleMaps(GOOGLE_MAPS_API_KEY);
        const [{ Map: GoogleMap }, { AdvancedMarkerElement, PinElement }] = await Promise.all([
          google.maps.importLibrary('maps'),
          google.maps.importLibrary('marker'),
        ]);

        if (cancelled || !mapElementRef.current) return;

        markerLibraryRef.current = { AdvancedMarkerElement, PinElement };

        const map = new GoogleMap(mapElementRef.current, {
          ...GOOGLE_MAP_OPTIONS,
          center: UK_VIEW.center,
          mapId: GOOGLE_MAPS_MAP_ID,
          zoom: UK_VIEW.zoom,
        });

        mapRef.current = map;

        if (insetMapElementRef.current && window.innerWidth >= 1024) {
          insetMapRef.current = new GoogleMap(insetMapElementRef.current, {
            ...GOOGLE_MAP_OPTIONS,
            center: getClinicsCenter(clinics),
            clickableIcons: false,
            gestureHandling: 'none',
            mapId: GOOGLE_MAPS_MAP_ID,
            zoom: 11,
          });
        }

        clinics.forEach((clinic) => {
          const isSelected = clinic.id === selectedClinicId;
          const marker = new AdvancedMarkerElement({
            content: createMarkerContent(PinElement, clinic, isSelected, false),
            gmpClickable: true,
            map,
            position: getClinicLatLng(clinic),
            title: getAccessibleMarkerLabel(clinic),
            zIndex: isSelected ? 100 : 10,
          });

          if (typeof marker.addListener === 'function') {
            marker.addListener('click', () => handleSelectClinic(clinic));
          } else {
            marker.addEventListener?.('gmp-click', () => handleSelectClinic(clinic));
          }

          registerMarker(clinic.id, marker, false);

          if (insetMapRef.current) {
            const insetMarker = new AdvancedMarkerElement({
              content: createMarkerContent(PinElement, clinic, isSelected, true),
              gmpClickable: true,
              map: insetMapRef.current,
              position: getClinicLatLng(clinic),
              title: getAccessibleMarkerLabel(clinic),
              zIndex: isSelected ? 100 : 10,
            });

            if (typeof insetMarker.addListener === 'function') {
              insetMarker.addListener('click', () => handleSelectClinic(clinic));
            } else {
              insetMarker.addEventListener?.('gmp-click', () => handleSelectClinic(clinic));
            }

            registerMarker(clinic.id, insetMarker, true);
          }
        });

        setLoadState('ready');
      } catch {
        if (!cancelled) {
          setLoadState('error');
        }
      }
    };

    initialiseMap();

    return () => {
      cancelled = true;
    };
  }, [clinics, handleSelectClinic, selectedClinicId, shouldLoadMap]);

  useEffect(() => {
    return () => {
      clearCameraTimers();
      markersRef.current.forEach((markers) => {
        markers.forEach((marker) => {
          marker.map = null;
        });
      });
      markersRef.current.clear();
      mapRef.current = null;
      insetMapRef.current = null;
    };
  }, [clearCameraTimers]);

  return (
    <section
      ref={sectionRef}
      id="clinics"
      className="bg-[#eef7fb] py-16 text-slate-800 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1540px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-start">
          <div>
            <div className="text-eyebrow inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/[0.72] px-4 py-1.5 font-extrabold text-[#294363] shadow-sm backdrop-blur">
              <MapPin className="h-4 w-4 fill-red-500 text-red-500" />
              <span>Consultation locations</span>
            </div>

            <h2 className="text-page-title mt-5 text-navy-900">
              Hospital location explorer
            </h2>

            <p className="text-lead mt-5 max-w-3xl text-[#54677f]">
              Begin with the United Kingdom overview, then zoom into the London and Hertfordshire consultation area or select an approved hospital directly.
            </p>
          </div>

          <div className="hidden border-l border-slate-300 pl-12 pt-2 lg:block">
            <p className="font-serif text-2xl font-semibold italic leading-8 text-[#263a55]">
              Expert care.
              <br />
              Accessible to you.
            </p>
            <span className="mt-5 block h-px w-5 bg-red-500" aria-hidden="true" />
            <p className="text-eyebrow mt-6 whitespace-nowrap text-[#596d87]">
              London <span className="mx-3 text-slate-400">\</span> Hertfordshire{' '}
              <span className="mx-3 text-slate-400">\</span> Beyond
            </p>
          </div>
        </div>

        <div className="mt-9">
          <div className="relative h-[520px] overflow-hidden rounded-[22px] border border-white/80 bg-[#c6e0eb] shadow-[0_24px_72px_rgba(53,91,122,0.28)] sm:h-[610px] lg:h-[620px]">
            {loadState !== 'ready' && (
              <StaticLocationMapPreview
                clinics={clinics}
                selectedClinicId={selectedClinicId}
                onSelect={handleSelectClinic}
              />
            )}

            <div
              ref={mapElementRef}
              className={`absolute inset-0 bg-[#dfe7ef] transition-opacity duration-300 ${
                loadState === 'ready' ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
              aria-label="Interactive Google Map showing Prof. Sheth consultation hospital locations"
            />

            <div
              className={`absolute right-[5%] top-9 z-10 hidden aspect-square w-[min(40vw,560px)] overflow-hidden rounded-full border-[7px] border-white/95 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)] transition-opacity duration-300 lg:block ${
                loadState === 'ready' ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
              aria-label="London and Hertfordshire consultation area"
            >
              <div ref={insetMapElementRef} className="h-full w-full" />
            </div>

            <div className="pointer-events-none absolute left-4 right-4 top-4 z-30 flex items-start justify-between gap-3 sm:left-5 sm:right-5 sm:top-5">
              <div className="pointer-events-auto flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={viewAllLocations}
                  className={`text-button inline-flex min-h-12 items-center gap-2 rounded-full border px-5 py-3 font-extrabold shadow-[0_14px_30px_rgba(15,23,42,0.14)] backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                    mapMode === 'region' || mapMode === 'selected'
                      ? 'border-[#1b304d] bg-[#1b304d] text-white'
                      : 'border-white/80 bg-white/[0.92] text-[#294363] hover:bg-white'
                  }`}
                >
                  <LocateFixed className="h-4 w-4" />
                  <span>View all locations</span>
                </button>

                <button
                  type="button"
                  onClick={viewUkOverview}
                  className={`text-button inline-flex min-h-12 items-center gap-2 rounded-full border px-5 py-3 font-extrabold shadow-[0_14px_30px_rgba(15,23,42,0.12)] backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                    mapMode === 'uk'
                      ? 'border-[#1b304d] bg-[#1b304d] text-white'
                      : 'border-white/80 bg-white/[0.92] text-[#294363] hover:bg-white'
                  }`}
                >
                  <Globe2 className="h-4 w-4" />
                  <span>UK overview</span>
                </button>
              </div>

              <div className="pointer-events-auto flex overflow-hidden rounded-3xl border border-white/[0.85] bg-white/[0.92] shadow-[0_16px_34px_rgba(15,23,42,0.14)] backdrop-blur">
                <button
                  type="button"
                  onClick={() => changeZoom('in')}
                  className="flex h-14 w-14 items-center justify-center text-[#1b304d] transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Zoom in"
                  disabled={loadState !== 'ready'}
                >
                  <Plus className="h-5 w-5" />
                </button>
                <span className="my-3 w-px bg-slate-200" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => changeZoom('out')}
                  className="flex h-14 w-14 items-center justify-center text-[#1b304d] transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Zoom out"
                  disabled={loadState !== 'ready'}
                >
                  <Minus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {loadState !== 'ready' && (
              <div className="text-caption absolute right-4 top-24 z-30 hidden rounded-full border border-white/70 bg-white/[0.88] px-3 py-1.5 font-extrabold uppercase tracking-[0.08em] text-[#596d87] shadow-sm backdrop-blur sm:block">
                {loadState === 'loading' ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Loading map
                  </span>
                ) : loadState === 'error' ? (
                  'Google Maps unavailable'
                ) : (
                  'Static map preview'
                )}
              </div>
            )}

            <div className="absolute bottom-4 left-4 z-30 right-4 md:right-auto">
              <LocationSelector
                clinics={clinics}
                selectedClinicId={selectedClinicId}
                onSelect={handleSelectClinic}
                variant="overlay"
              />
            </div>

            {USING_DEMO_MAP_ID && GOOGLE_MAPS_API_KEY && loadState === 'ready' && (
              <div className="text-caption absolute bottom-4 right-4 z-30 hidden rounded-full border border-white/70 bg-white/[0.88] px-3 py-1.5 font-extrabold uppercase tracking-[0.08em] text-slate-500 shadow-sm backdrop-blur md:block">
                Demo map ID
              </div>
            )}
          </div>

          <div className="mt-5">
            <LocationDetailStrip clinic={selectedClinic} onOpenBooking={onOpenBooking} />
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>
      </div>
    </section>
  );
};
