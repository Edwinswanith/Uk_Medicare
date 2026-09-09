import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Globe2, Loader2, LocateFixed, MapPin } from 'lucide-react';
import {
  ClinicAvailabilityFilter,
  ClinicLocation,
  clinicAvailabilityFilters,
  clinicLocations,
  getClinicAvailability,
  hasClinicAvailabilityForFilter,
} from '../../data/clinics';
import { LocationDetailStrip } from './LocationDetailStrip';
import { LocationSelector } from './LocationSelector';
import { GoogleMapsEmbedPreview } from './GoogleMapsEmbedPreview';
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
  focusedClinicId?: string;
  onFocusedClinicHandled?: () => void;
  onOpenBooking: (clinicId?: string) => void;
}

type MapLoadState = 'idle' | 'loading' | 'ready' | 'missing-key' | 'error';

const getAccessibleMarkerLabel = (clinic: ClinicLocation) =>
  `${clinic.name}, ${clinic.area}`;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const getGroupZoom = (clinicCount: number) => {
  if (clinicCount <= 1) return 14.2;
  if (clinicCount === 2) return 10.8;
  return REGIONAL_VIEW.zoom;
};

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
  focusedClinicId,
  onFocusedClinicHandled,
  onOpenBooking,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any | null>(null);
  const markerLibraryRef = useRef<{ AdvancedMarkerElement: any; PinElement: any } | null>(null);
  const markersRef = useRef<Map<string, any[]>>(new Map());
  const cameraTimersRef = useRef<number[]>([]);

  const clinics = useMemo(
    () => clinicLocations.filter((clinic) => clinic.coordinateStatus === 'verified'),
    []
  );
  const [availabilityFilter, setAvailabilityFilter] = useState<ClinicAvailabilityFilter>('all');
  const visibleClinics = useMemo(
    () =>
      clinics.filter((clinic) =>
        hasClinicAvailabilityForFilter(clinic, availabilityFilter)
      ),
    [availabilityFilter, clinics]
  );
  const visibleClinicIds = useMemo(
    () => new Set(visibleClinics.map((clinic) => clinic.id)),
    [visibleClinics]
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
    ? visibleClinics.find((clinic) => clinic.id === selectedClinicId) ?? null
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
    (nextSelectedClinicId: string | null, nextVisibleClinicIds = visibleClinicIds) => {
      const PinElement = markerLibraryRef.current?.PinElement;
      if (!PinElement) return;

      clinics.forEach((clinic) => {
        const clinicMarkers = markersRef.current.get(clinic.id) ?? [];
        const isSelected = clinic.id === nextSelectedClinicId;
        const isVisible = nextVisibleClinicIds.has(clinic.id);

        clinicMarkers.forEach((marker) => {
          const shouldShowLabel = Boolean(marker.__showLabel) || isSelected;
          marker.map = isVisible ? mapRef.current : null;
          marker.content = createMarkerContent(
            PinElement,
            clinic,
            isSelected,
            shouldShowLabel
          );
          marker.zIndex = isSelected ? 100 : 10;
          marker.title = getAccessibleMarkerLabel(clinic);
        });
      });
    },
    [clinics, visibleClinicIds]
  );

  const focusClinicGroup = useCallback(
    (targetClinics: ClinicLocation[]) => {
      const map = mapRef.current;
      const focusedClinics = targetClinics.length > 0 ? targetClinics : clinics;
      const center = getClinicsCenter(focusedClinics);
      const zoom = getGroupZoom(focusedClinics.length);

      if (!map) return;

      clearCameraTimers();

      if (prefersReducedMotion()) {
        map.setCenter(center);
        map.setZoom(zoom);
        return;
      }

      map.panTo(center);
      queueCameraStep(() => map.setZoom(zoom), 220);
      queueCameraStep(() => map.panTo(center), 420);
    },
    [clearCameraTimers, clinics, queueCameraStep]
  );

  const moveToClinic = useCallback(
    (clinic: ClinicLocation) => {
      const map = mapRef.current;
      const target = getClinicLatLng(clinic);

      clearCameraTimers();

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
      const scheduleCount = getClinicAvailability(clinic, availabilityFilter).length;
      const scheduleMessage =
        scheduleCount > 0
          ? `${scheduleCount} matching availability period${scheduleCount === 1 ? '' : 's'} visible.`
          : 'All published availability periods are visible.';
      setAnnouncement(`${clinic.name} selected. ${scheduleMessage} The map is centred on ${clinic.area}.`);
    },
    [availabilityFilter, moveToClinic, updateMarkerStyles]
  );

  const handleAvailabilityFilterChange = useCallback(
    (nextFilter: ClinicAvailabilityFilter) => {
      const nextClinics = clinics.filter((clinic) =>
        hasClinicAvailabilityForFilter(clinic, nextFilter)
      );
      const nextVisibleClinicIds = new Set(nextClinics.map((clinic) => clinic.id));
      const nextSelectedClinicId = nextVisibleClinicIds.has(selectedClinicId ?? '')
        ? selectedClinicId
        : nextClinics[0]?.id ?? null;
      const filterLabel =
        clinicAvailabilityFilters.find((filter) => filter.id === nextFilter)?.label ?? 'All';

      setAvailabilityFilter(nextFilter);
      setSelectedClinicId(nextSelectedClinicId);
      setMapMode('region');
      updateMarkerStyles(nextSelectedClinicId, nextVisibleClinicIds);
      focusClinicGroup(nextClinics);
      setAnnouncement(
        nextFilter === 'all'
          ? 'Showing every clinic with published availability.'
          : `Showing ${filterLabel} clinic availability.`
      );
    },
    [clinics, focusClinicGroup, selectedClinicId, updateMarkerStyles]
  );

  const viewAllLocations = useCallback(() => {
    const map = mapRef.current;
    const nextSelectedClinicId = selectedClinicId ?? firstClinicId;

    setAvailabilityFilter('all');
    setSelectedClinicId(nextSelectedClinicId);
    setMapMode('region');
    updateMarkerStyles(nextSelectedClinicId, new Set(clinics.map((clinic) => clinic.id)));
    setAnnouncement('Showing London and Hertfordshire consultation locations.');

    const regionalCenter = getClinicsCenter(clinics);

    if (!map) return;

    clearCameraTimers();

    if (prefersReducedMotion()) {
      map.setCenter(regionalCenter);
      map.setZoom(REGIONAL_VIEW.zoom);
      return;
    }

    map.panTo(regionalCenter);
    queueCameraStep(() => map.setZoom(REGIONAL_VIEW.zoom), 220);
    queueCameraStep(() => map.panTo(regionalCenter), 420);
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
    updateMarkerStyles(null, visibleClinicIds);
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
  }, [clearCameraTimers, queueCameraStep, updateMarkerStyles, visibleClinicIds]);

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

        const initialSelectedClinic =
          mapMode === 'selected' && selectedClinic ? selectedClinic : null;
        const initialVisibleClinics = visibleClinics.length > 0 ? visibleClinics : clinics;

        const map = new GoogleMap(mapElementRef.current, {
          ...GOOGLE_MAP_OPTIONS,
          center: initialSelectedClinic
            ? getClinicLatLng(initialSelectedClinic)
            : getClinicsCenter(initialVisibleClinics),
          mapId: GOOGLE_MAPS_MAP_ID,
          zoom: initialSelectedClinic
            ? HOSPITAL_VIEW_ZOOM
            : getGroupZoom(initialVisibleClinics.length),
        });

        mapRef.current = map;

        clinics.forEach((clinic) => {
          const isSelected = clinic.id === selectedClinicId;
          const isVisible = visibleClinicIds.has(clinic.id);
          const marker = new AdvancedMarkerElement({
            content: createMarkerContent(PinElement, clinic, isSelected, isSelected),
            gmpClickable: true,
            map: isVisible ? map : null,
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
  }, [
    clinics,
    handleSelectClinic,
    mapMode,
    selectedClinic,
    selectedClinicId,
    shouldLoadMap,
    visibleClinicIds,
    visibleClinics,
  ]);

  useEffect(() => {
    updateMarkerStyles(selectedClinicId, visibleClinicIds);
  }, [selectedClinicId, updateMarkerStyles, visibleClinicIds]);

  useEffect(() => {
    if (!focusedClinicId) return;

    const clinic = clinics.find((item) => item.id === focusedClinicId);
    if (!clinic) {
      onFocusedClinicHandled?.();
      return;
    }

    const allClinicIds = new Set(clinics.map((item) => item.id));
    setAvailabilityFilter('all');
    setSelectedClinicId(clinic.id);
    setMapMode('selected');
    updateMarkerStyles(clinic.id, allClinicIds);
    moveToClinic(clinic);
    setAnnouncement(`${clinic.name} selected from the profile quick links.`);
    onFocusedClinicHandled?.();
  }, [
    clinics,
    focusedClinicId,
    moveToClinic,
    onFocusedClinicHandled,
    updateMarkerStyles,
  ]);

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
              Compare clinic days and consultation times, then select the hospital that best matches your preferred appointment window.
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

        <div className="mt-8 rounded-[22px] border border-white/80 bg-white/[0.9] p-3 shadow-[0_18px_44px_rgba(53,91,122,0.12)] backdrop-blur sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-eyebrow text-red-500">
                Find by availability
              </p>
              <p className="text-body-small mt-1 text-[#51667f]">
                Filter the map by day to see where Prof. Sheth is available.
              </p>
            </div>

            <div
              className="flex gap-2 overflow-x-auto pb-1 lg:justify-end lg:pb-0"
              role="tablist"
              aria-label="Filter clinics by doctor availability"
            >
              {clinicAvailabilityFilters.map((filter) => {
                const isActive = filter.id === availabilityFilter;
                const clinicCount = clinics.filter((clinic) =>
                  hasClinicAvailabilityForFilter(clinic, filter.id)
                ).length;

                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => handleAvailabilityFilterChange(filter.id)}
                    className={`text-button inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border px-4 py-2.5 font-extrabold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                      isActive
                        ? 'border-[#1b304d] bg-[#1b304d] text-white shadow-[0_12px_28px_rgba(27,48,77,0.22)]'
                        : 'border-slate-200 bg-white text-[#294363] hover:border-slate-300 hover:bg-slate-50'
                    }`}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`${filter.description} ${clinicCount} clinic${clinicCount === 1 ? '' : 's'}.`}
                  >
                    <span className="hidden sm:inline">{filter.label}</span>
                    <span className="sm:hidden">{filter.shortLabel}</span>
                    <span
                      className={`text-caption rounded-full px-2 py-0.5 font-extrabold ${
                        isActive ? 'bg-white/15 text-white' : 'bg-slate-100 text-[#60738b]'
                      }`}
                    >
                      {clinicCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="relative h-[560px] overflow-hidden rounded-[22px] border border-white/80 bg-[#c6e0eb] shadow-[0_24px_72px_rgba(53,91,122,0.28)] sm:h-[610px] lg:h-[620px]">
            {loadState !== 'ready' && (
              <GoogleMapsEmbedPreview
                clinics={visibleClinics}
                mapMode={mapMode}
                selectedClinicId={selectedClinicId}
              />
            )}

            <div
              ref={mapElementRef}
              className={`absolute inset-0 bg-[#dfe7ef] transition-opacity duration-300 ${
                loadState === 'ready' ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
              aria-label="Interactive Google Map showing Prof. Sheth consultation hospital locations"
            />

            <div className="pointer-events-none absolute left-3 right-3 top-3 z-30 flex flex-col gap-2 sm:left-5 sm:right-5 sm:top-5 md:flex-row md:items-start md:justify-between md:gap-3">
              <div className="pointer-events-auto grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                <button
                  type="button"
                  onClick={viewAllLocations}
                  className={`text-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2.5 font-extrabold shadow-[0_14px_30px_rgba(15,23,42,0.14)] backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:min-h-12 sm:px-5 sm:py-3 ${
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
                  className={`text-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2.5 font-extrabold shadow-[0_14px_30px_rgba(15,23,42,0.12)] backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:min-h-12 sm:px-5 sm:py-3 ${
                    mapMode === 'uk'
                      ? 'border-[#1b304d] bg-[#1b304d] text-white'
                      : 'border-white/80 bg-white/[0.92] text-[#294363] hover:bg-white'
                  }`}
                >
                  <Globe2 className="h-4 w-4" />
                  <span>UK overview</span>
                </button>
              </div>
            </div>

            {selectedClinic && mapMode !== 'uk' && (
              <div className="pointer-events-none absolute right-3 top-20 z-30 w-[calc(100%-1.5rem)] max-w-[340px] sm:right-5 sm:w-[340px] lg:top-5">
                <div className="rounded-xl border border-white/80 bg-white/[0.94] px-4 py-3 shadow-[0_14px_32px_rgba(15,23,42,0.18)] backdrop-blur">
                  <p className="text-caption font-extrabold uppercase text-red-500">
                    {selectedClinic.area.split(',')[0]}
                  </p>
                  <p className="mt-1 font-serif text-[18px] font-bold leading-tight text-[#172943]">
                    {selectedClinic.name}
                  </p>
                  <p className="text-form-help mt-1.5 text-[#5f7088]">
                    {selectedClinic.address}, {selectedClinic.postcode}, UK
                  </p>
                </div>
              </div>
            )}

            {loadState === 'loading' && (
              <div className="text-caption absolute right-4 top-24 z-30 hidden rounded-full border border-white/70 bg-white/[0.88] px-3 py-1.5 font-extrabold uppercase tracking-[0.08em] text-[#596d87] shadow-sm backdrop-blur sm:block lg:top-28">
                <span className="inline-flex items-center gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Loading live map
                </span>
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-3 z-30 md:bottom-4 md:left-4 md:right-auto">
              <LocationSelector
                clinics={visibleClinics}
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
            <LocationDetailStrip
              activeFilter={availabilityFilter}
              clinic={selectedClinic}
              onOpenBooking={onOpenBooking}
            />
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>
      </div>
    </section>
  );
};
