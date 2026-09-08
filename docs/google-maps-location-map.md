# Google Maps Location Map

## Provider

The Locations section uses the Google Maps JavaScript API and the `marker` library for `AdvancedMarkerElement` / `PinElement` markers.

The implementation lazy-loads Google Maps only when the Locations section approaches the viewport. If Google Maps is not configured or fails to load, the section displays an attributed static OpenStreetMap tile preview and keeps the hospital selector, verified address strip, directions links and consultation action available.

## Required Google Cloud Setup

Enable these in the Google Cloud project:

- Maps JavaScript API

Create:

- Browser API key for the website.
- JavaScript map ID for Advanced Markers.

Configure local or deployment environment variables:

```env
VITE_GOOGLE_MAPS_API_KEY=your_browser_key
VITE_GOOGLE_MAPS_MAP_ID=your_javascript_map_id
```

The code falls back to `DEMO_MAP_ID` when `VITE_GOOGLE_MAPS_MAP_ID` is not set so the component architecture can be tested. Use a real JavaScript map ID for production.

## API Key Restrictions

Use both application and API restrictions:

- Application restriction: Websites / HTTP referrers.
- Production referrer: `https://www.keyholesurgeon.co.uk/*`
- Local development referrer: `http://localhost:3000/*`
- Local development referrer: `http://127.0.0.1:3000/*`
- API restriction: Maps JavaScript API only.

Do not commit the key. `.env` files are ignored and `.env.example` contains only empty placeholders.

## Billing And Usage

Google Maps Platform requires a Cloud project and billing account for production use. Map loads can incur billable usage according to the account's Maps JavaScript API pricing and quotas.

## Privacy And Loading

Loading the interactive map contacts Google Maps Platform from the user's browser and loads Google map tiles/scripts. Without a Google Maps API key, the fallback preview loads public OpenStreetMap tiles with visible attribution. The section does not request user geolocation, calculate nearest hospital, call directions services, or send appointment form data to any map provider.

## Coordinate Sources

Locations remain sourced from `src/data/clinics.ts`.

- The Clementine Churchill Hospital: Mapcarta / OpenStreetMap, `51.56497, -0.33271`
- Spire Bushey Hospital & Diagnostic Centre: Mapcarta / OpenStreetMap, `51.63744, -0.33164`
- The Wellington Hospital - Elstree Waterfront: myHealthSpecialist clinic listing, `51.6427263, -0.314103`

No Syon Clinic or unverified hospital is included.

## Location Image Sources

- The Clementine Churchill Hospital: cropped from the client-provided visual reference.
- Spire Bushey Hospital: `https://www.spirehealthcare.com/media/6504/spire_bushey_exterior.jpg`
- The Wellington Hospital - Elstree Waterfront: `https://www.myhealthspecialist.com/assets/images/uploads/building-elstree_waterfront.jpg`

## Map Behaviour

- Initial state: UK overview, zoom `5.6`.
- View all locations: consultation-area view, zoom `10.2`, centered across the three hospitals.
- Selected hospital: hospital-level view, zoom `16`.
- Camera movement: short interruptible pan/zoom sequence; reduced-motion users receive direct camera changes.
- Markers: Google Maps Advanced Markers with red `PinElement` markers, white centre glyph, selected scale and outline.
