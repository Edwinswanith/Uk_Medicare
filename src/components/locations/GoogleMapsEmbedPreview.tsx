import React, { useMemo } from 'react';
import { ClinicLocation } from '../../data/clinics';
import { LocationsMapMode, REGIONAL_VIEW, UK_VIEW } from './mapConfig';

interface GoogleMapsEmbedPreviewProps {
  clinics: ClinicLocation[];
  mapMode: LocationsMapMode;
  selectedClinicId: string | null;
}

export const GoogleMapsEmbedPreview: React.FC<GoogleMapsEmbedPreviewProps> = ({
  clinics,
  mapMode,
  selectedClinicId,
}) => {
  const selectedClinic = selectedClinicId
    ? clinics.find((clinic) => clinic.id === selectedClinicId) ?? null
    : null;

  const fallbackClinic = selectedClinic ?? (mapMode === 'uk' ? null : clinics[0] ?? null);

  const zoom = fallbackClinic ? 15 : mapMode === 'uk' ? 6 : 10;
  const mapCenter = fallbackClinic
    ? `${fallbackClinic.latitude},${fallbackClinic.longitude}`
    : mapMode === 'uk'
      ? `${UK_VIEW.center.lat},${UK_VIEW.center.lng}`
      : `${REGIONAL_VIEW.center.lat},${REGIONAL_VIEW.center.lng}`;

  const mapSrc = useMemo(
    () =>
      `https://www.google.com/maps?ll=${encodeURIComponent(mapCenter)}&z=${zoom}&output=embed`,
    [mapCenter, zoom]
  );

  return (
    <div className="absolute inset-0 bg-[#dfe7ef]">
      <iframe
        key={mapSrc}
        src={mapSrc}
        title={
          fallbackClinic
            ? `Google Map for ${fallbackClinic.name}`
            : 'Google Map for consultation locations'
        }
        className="h-full w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
