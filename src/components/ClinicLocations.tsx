import React from 'react';
import { InteractiveLocationsMap } from './locations/InteractiveLocationsMap';

interface ClinicLocationsProps {
  onOpenBooking: (clinicId?: string) => void;
  focusedClinicId?: string;
  onFocusedClinicHandled?: () => void;
}

export const ClinicLocations: React.FC<ClinicLocationsProps> = ({
  focusedClinicId,
  onFocusedClinicHandled,
  onOpenBooking,
}) => (
  <InteractiveLocationsMap
    focusedClinicId={focusedClinicId}
    onFocusedClinicHandled={onFocusedClinicHandled}
    onOpenBooking={onOpenBooking}
  />
);
