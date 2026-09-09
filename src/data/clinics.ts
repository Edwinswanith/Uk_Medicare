/**
 * SINGLE SOURCE OF TRUTH for private practice clinic locations and
 * doctor availability. The availability schedule below is sourced from
 * the client-provided clinic schedule update on 2026-09-09.
 *
 * Components should read clinic names, addresses, map coordinates,
 * directions, and consultation times from this file instead of
 * duplicating timetable copy locally.
 */
import { VerificationStatus } from './contentStatus';

export type ClinicAvailabilityFilter =
  | 'all'
  | 'monday'
  | 'wednesday'
  | 'thursday'
  | 'alternate-thursday'
  | 'friday';

export interface ClinicAvailabilityPeriod {
  id: string;
  day: 'Monday' | 'Wednesday' | 'Thursday' | 'Alternate Thursday' | 'Friday';
  filter: Exclude<ClinicAvailabilityFilter, 'all'>;
  time: string;
  note?: string;
}

export interface ClinicLocation {
  id: string;
  name: string;
  shortName: string;
  network: string;
  tagline: string;
  area: string;
  address: string;
  postcode: string;
  latitude: number;
  longitude: number;
  coordinateSourceLabel: string;
  coordinateSourceUrl: string;
  coordinateStatus: VerificationStatus;
  publicationStatus: VerificationStatus;
  directionsUrl: string;
  phone?: string;
  secretaryName?: string;
  secretaryPhone?: string;
  secretaryEmail?: string;
  consultationTimes?: string[];
  facilities?: string[];
  parkingInfo: string;
  mapQuery: string;
  availability: ClinicAvailabilityPeriod[];
  isPrimary?: boolean;
}

export const clinicAvailabilityFilters: {
  id: ClinicAvailabilityFilter;
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    id: 'all',
    label: 'All',
    shortLabel: 'All',
    description: 'Show every clinic with published availability.',
  },
  {
    id: 'monday',
    label: 'Monday',
    shortLabel: 'Mon',
    description: 'Show Monday consultation clinics.',
  },
  {
    id: 'wednesday',
    label: 'Wednesday',
    shortLabel: 'Wed',
    description: 'Show Wednesday consultation clinics.',
  },
  {
    id: 'thursday',
    label: 'Thursday',
    shortLabel: 'Thu',
    description: 'Show regular Thursday consultation clinics.',
  },
  {
    id: 'alternate-thursday',
    label: 'Alternate Thursday',
    shortLabel: 'Alt Thu',
    description: 'Show clinics available on alternate Thursdays only.',
  },
  {
    id: 'friday',
    label: 'Friday',
    shortLabel: 'Fri',
    description: 'Show Friday consultation clinics.',
  },
];

export const getClinicAvailability = (
  clinic: ClinicLocation,
  filter: ClinicAvailabilityFilter = 'all'
) =>
  filter === 'all'
    ? clinic.availability
    : clinic.availability.filter((period) => period.filter === filter);

export const hasClinicAvailabilityForFilter = (
  clinic: ClinicLocation,
  filter: ClinicAvailabilityFilter
) => getClinicAvailability(clinic, filter).length > 0;

export const formatClinicAvailability = (period: ClinicAvailabilityPeriod) =>
  `${period.day} - ${period.time}`;

export const getClinicAvailabilitySummary = (
  clinic: ClinicLocation,
  filter: ClinicAvailabilityFilter = 'all'
) => getClinicAvailability(clinic, filter).map(formatClinicAvailability);

export const clinicLocations: ClinicLocation[] = [
  {
    id: 'clementine-churchill',
    name: 'The Clementine Churchill Hospital',
    shortName: 'Clementine Churchill',
    network: 'Circle Health Group',
    tagline: 'Premier Private Hospital for North West London & Middlesex',
    area: 'Harrow, Greater London',
    address: 'Sudbury Hill, Harrow, Greater London',
    postcode: 'HA1 3RX',
    latitude: 51.56497,
    longitude: -0.33271,
    coordinateSourceLabel: 'Mapcarta / OpenStreetMap',
    coordinateSourceUrl: 'https://mapcarta.com/24923916',
    coordinateStatus: 'verified',
    publicationStatus: 'pending',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=The%20Clementine%20Churchill%20Hospital%2C%20Sudbury%20Hill%2C%20Harrow%20HA1%203RX',
    parkingInfo: 'Complimentary on-site patient parking with EV charging points.',
    mapQuery: 'The Clementine Churchill Hospital, Sudbury Hill, Harrow',
    availability: [
      {
        id: 'clementine-monday',
        day: 'Monday',
        filter: 'monday',
        time: '5:30 PM - 6:30 PM',
      },
      {
        id: 'clementine-friday',
        day: 'Friday',
        filter: 'friday',
        time: '3:30 PM - 5:30 PM',
      },
    ],
  },
  {
    id: 'spire-bushey',
    name: 'Spire Bushey Hospital & Diagnostic Centre',
    shortName: 'Spire Diagnostic Centre',
    network: 'Spire Healthcare',
    tagline: 'Leading Surgical Centre Serving South Hertfordshire, Watford & Stanmore',
    area: 'Bushey, Hertfordshire',
    address: 'Heathbourne Road, Bushey, Hertfordshire',
    postcode: 'WD23 1RD',
    latitude: 51.63744,
    longitude: -0.33164,
    coordinateSourceLabel: 'Mapcarta / OpenStreetMap',
    coordinateSourceUrl: 'https://mapcarta.com/W967775040',
    coordinateStatus: 'verified',
    publicationStatus: 'pending',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Spire%20Bushey%20Hospital%2C%20Heathbourne%20Road%2C%20Bushey%20WD23%201RD',
    parkingInfo: 'Free dedicated patient & visitor parking on hospital grounds.',
    mapQuery: 'Spire Bushey Hospital, Heathbourne Road, Bushey',
    availability: [
      {
        id: 'spire-monday',
        day: 'Monday',
        filter: 'monday',
        time: '7:00 PM - 8:00 PM',
      },
      {
        id: 'spire-alternate-thursday',
        day: 'Alternate Thursday',
        filter: 'alternate-thursday',
        time: '5:00 PM - 7:00 PM',
        note: 'Alternate Thursday clinic only.',
      },
    ],
  },
  {
    id: 'wellington-elstree',
    name: 'The Wellington Hospital - Elstree Waterfront',
    shortName: 'Elstree Clinic',
    network: 'HCA Healthcare UK',
    tagline: 'Harley Street-Grade Private Care in Hertfordshire',
    area: 'Elstree, Hertfordshire',
    address: 'Beaufort House, The Waterfront Business Park, Elstree Road, Elstree',
    postcode: 'WD6 3BS',
    latitude: 51.6427263,
    longitude: -0.314103,
    coordinateSourceLabel: 'myHealthSpecialist clinic listing',
    coordinateSourceUrl:
      'https://www.myhealthspecialist.com/clinic/The-Wellington-Hospital-Elstree-Waterfront',
    coordinateStatus: 'verified',
    publicationStatus: 'pending',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=The%20Wellington%20Hospital%20Elstree%20Waterfront%2C%20Beaufort%20House%2C%20Elstree%20WD6%203BS',
    parkingInfo: 'Ample free surface parking directly outside Beaufort House.',
    mapQuery: 'The Wellington Hospital Elstree Waterfront, Beaufort House',
    availability: [
      {
        id: 'elstree-alternate-thursday',
        day: 'Alternate Thursday',
        filter: 'alternate-thursday',
        time: '9:00 AM - 10:00 AM',
        note: 'Alternate Thursday clinic only.',
      },
    ],
  },
  {
    id: 'syon-clinic',
    name: 'Syon Clinic',
    shortName: 'Syon Clinic',
    network: 'Circle Health Group',
    tagline: 'Private outpatient and diagnostic centre in Brentford',
    area: 'Brentford, West London',
    address: '941 Great West Road, Brentford, Middlesex',
    postcode: 'TW8 9DU',
    latitude: 51.48361,
    longitude: -0.32411,
    coordinateSourceLabel: 'CQC / OpenStreetMap',
    coordinateSourceUrl: 'https://www.cqc.org.uk/location/1-131838369/contact',
    coordinateStatus: 'verified',
    publicationStatus: 'verified',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Syon%20Clinic%2C%20941%20Great%20West%20Road%2C%20Brentford%20TW8%209DU',
    parkingInfo: 'Limited on-site parking.',
    mapQuery: 'Syon Clinic, 941 Great West Road, Brentford',
    availability: [
      {
        id: 'syon-wednesday',
        day: 'Wednesday',
        filter: 'wednesday',
        time: '5:30 PM - 7:00 PM',
      },
      {
        id: 'syon-thursday',
        day: 'Thursday',
        filter: 'thursday',
        time: '3:00 PM - 4:00 PM',
      },
    ],
  },
  {
    id: 'chiswick-medical-centre',
    name: 'Chiswick Medical Centre',
    shortName: 'Chiswick Med Centre',
    network: 'HCA Healthcare UK',
    tagline: 'Outpatient and diagnostic care in Chiswick',
    area: 'Chiswick, West London',
    address: 'Bond House, 347-353 Chiswick High Road, London',
    postcode: 'W4 4HS',
    latitude: 51.4927147,
    longitude: -0.2704739,
    coordinateSourceLabel: 'HCA UK / OpenStreetMap',
    coordinateSourceUrl:
      'https://www.hcahealthcare.co.uk/locations/outpatients/the-lister-hospital/chiswick-outpatients',
    coordinateStatus: 'verified',
    publicationStatus: 'verified',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Chiswick%20Medical%20Centre%2C%20Bond%20House%2C%20347-353%20Chiswick%20High%20Road%2C%20London%20W4%204HS',
    parkingInfo: 'On-site patient parking available.',
    mapQuery: 'Chiswick Medical Centre, Bond House, 347-353 Chiswick High Road',
    availability: [
      {
        id: 'chiswick-alternate-thursday',
        day: 'Alternate Thursday',
        filter: 'alternate-thursday',
        time: '3:00 PM - 4:00 PM',
        note: 'Alternate Thursday clinic only.',
      },
    ],
  },
];

export const nhsBase = {
  trust: 'London North West University Healthcare NHS Trust',
  hospital: 'Ealing Hospital (Southall / Ealing)',
  address: 'Uxbridge Road, Southall, Middlesex UB1 3HW',
  role: 'Consultant Upper GI, HPB & Laparoscopic Surgeon',
  note:
    'For NHS appointments, patients require a referral letter from their NHS General Practitioner (GP) via the NHS e-Referral Service (ERS).',
};
