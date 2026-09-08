/**
 * Practice locations — content safety gate applied.
 *
 * Only `id`, `name`, `network`, `tagline`, `address`, `postcode`,
 * `parkingInfo` and `mapQuery` are rendered without qualification: these
 * matched (or were never contradicted by) the legacy site.
 *
 * `phone`, `secretaryName`, `secretaryPhone`, `secretaryEmail`,
 * `consultationTimes`, and `facilities` are optional and deliberately
 * left unset below — every one of these fields is either CONFLICTING
 * (two different values found across sources) or NEEDS VERIFICATION
 * (no legacy-site or independent source at all). See
 * docs/location-verification.md for the full evidence per hospital.
 * Do not fill these back in without a client-confirmed source — see
 * docs/verification-dashboard.md items under "Locations".
 *
 * Syon Clinic has been removed entirely: it does not appear anywhere on
 * the legacy site (including its own sitemap), and only a weak,
 * unconfirmed third-party mention exists. See
 * docs/location-verification.md §4. Do not reinstate it here without
 * direct client confirmation of its address/phone/hours.
 */
import { VerificationStatus } from './contentStatus';

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
  isPrimary?: boolean;
}

export const clinicLocations: ClinicLocation[] = [
  {
    id: "clementine-churchill",
    name: "The Clementine Churchill Hospital",
    shortName: "Clementine Churchill",
    network: "Circle Health Group",
    tagline: "Premier Private Hospital for North West London & Middlesex",
    area: "Harrow, Greater London",
    address: "Sudbury Hill, Harrow, Greater London",
    postcode: "HA1 3RX",
    latitude: 51.56497,
    longitude: -0.33271,
    coordinateSourceLabel: "Mapcarta / OpenStreetMap",
    coordinateSourceUrl: "https://mapcarta.com/24923916",
    coordinateStatus: "verified",
    publicationStatus: "pending",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=The%20Clementine%20Churchill%20Hospital%2C%20Sudbury%20Hill%2C%20Harrow%20HA1%203RX",
    parkingInfo: "Complimentary on-site patient parking with EV charging points.",
    mapQuery: "The Clementine Churchill Hospital, Sudbury Hill, Harrow",
  },
  {
    id: "spire-bushey",
    name: "Spire Bushey Hospital & Diagnostic Centre",
    shortName: "Spire Bushey",
    network: "Spire Healthcare",
    tagline: "Leading Surgical Centre Serving South Hertfordshire, Watford & Stanmore",
    area: "Bushey, Hertfordshire",
    address: "Heathbourne Road, Bushey, Hertfordshire",
    postcode: "WD23 1RD",
    latitude: 51.63744,
    longitude: -0.33164,
    coordinateSourceLabel: "Mapcarta / OpenStreetMap",
    coordinateSourceUrl: "https://mapcarta.com/W967775040",
    coordinateStatus: "verified",
    publicationStatus: "pending",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Spire%20Bushey%20Hospital%2C%20Heathbourne%20Road%2C%20Bushey%20WD23%201RD",
    parkingInfo: "Free dedicated patient & visitor parking on hospital grounds.",
    mapQuery: "Spire Bushey Hospital, Heathbourne Road, Bushey",
  },
  {
    id: "wellington-elstree",
    name: "The Wellington Hospital - Elstree Waterfront",
    shortName: "Wellington Elstree",
    network: "HCA Healthcare UK",
    tagline: "Harley Street-Grade Private Care in Hertfordshire",
    area: "Elstree, Hertfordshire",
    address: "Beaufort House, The Waterfront Business Park, Elstree Road, Elstree",
    postcode: "WD6 3BS",
    latitude: 51.6427263,
    longitude: -0.314103,
    coordinateSourceLabel: "myHealthSpecialist clinic listing",
    coordinateSourceUrl: "https://www.myhealthspecialist.com/clinic/The-Wellington-Hospital-Elstree-Waterfront",
    coordinateStatus: "verified",
    publicationStatus: "pending",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=The%20Wellington%20Hospital%20Elstree%20Waterfront%2C%20Beaufort%20House%2C%20Elstree%20WD6%203BS",
    parkingInfo: "Ample free surface parking directly outside Beaufort House.",
    mapQuery: "The Wellington Hospital Elstree Waterfront, Beaufort House",
  },
];

export const nhsBase = {
  trust: "London North West University Healthcare NHS Trust",
  hospital: "Ealing Hospital (Southall / Ealing)",
  address: "Uxbridge Road, Southall, Middlesex UB1 3HW",
  // "Robotic" intentionally omitted: the legacy site's NHS-role wording
  // ("Consultant UGI, Hepatobiliary & laparoscopic surgeon") never
  // includes it for this specific post — see
  // docs/professional-facts-register.md §5.
  role: "Consultant Upper GI, HPB & Laparoscopic Surgeon",
  note: "For NHS appointments, patients require a referral letter from their NHS General Practitioner (GP) via the NHS e-Referral Service (ERS).",
};
