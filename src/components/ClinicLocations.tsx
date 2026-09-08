import React from 'react';
import { InteractiveLocationsMap } from './locations/InteractiveLocationsMap';

interface ClinicLocationsProps {
  onOpenBooking: (clinicId?: string) => void;
}

export const ClinicLocations: React.FC<ClinicLocationsProps> = ({ onOpenBooking }) => (
  <InteractiveLocationsMap onOpenBooking={onOpenBooking} />
);
