# Location Verification Register

**Retrieved date:** 2026-09-07 | **Reviewer:** unassigned | **Last reviewed:** 2026-09-07
**Rule applied:** a location appearing on the legacy site does not by itself prove Prof. Sheth currently practises there; every entry below is marked LEGACY - NEEDS CONFIRMATION unless independently corroborated, and even then not silently upgraded to VERIFIED.

## 1. The Clementine Churchill Hospital (Circle Health Group)

| Field | Legacy site | Current rebuild | Independent source | Status |
|---|---|---|---|---|
| Full name | "The Clementine Churchill Hospital & Clinics" | "The Clementine Churchill Hospital" | Circle Health Group profile confirms affiliation | LEGACY - NEEDS CONFIRMATION |
| Address | "Harrow HA1 3RX" (street-level address not captured on legacy Contact page) | "Sudbury Hill, Harrow, Greater London, HA1 3RX" | Consistent with Circle Health Group's Harrow site | PARTIAL match (postcode agrees; legacy never gave street name) |
| Phone | NOT FOUND on legacy site (2 independent fetch attempts) | "+44 (0)20 8872 3872" | Not independently checked for this specific hospital | NEEDS VERIFICATION |
| Consultation hours | "Monday 17:30-18:30, Thursday 14:00-17:00" | "Wednesday 14:00-18:00, Friday 09:00-13:00, Alternate Saturday Clinics" | None | **CONFLICTING** - completely different days/times between old and new; do not assume either is current |
| Secretary | "Nehali Christian" | "Amit Christian / Nehali Christian" | Spire profile names "Amit Christian" (for Bushey, not this location) | LEGACY - NEEDS CONFIRMATION |
| Facilities claimed | Not described on legacy site | "State-of-the-Art Da Vinci Robotic Suite", "JAG-Accredited Endoscopy Suite", "3T MRI", "Level 3 ICU" etc. | None found | **DO NOT PRESENT AS VERIFIED** - these are specific, checkable facility claims with zero source; confirm directly with Circle Health Group/the hospital before publishing |
| Robotic surgery here | Not mentioned on legacy site | Marked as the primary robotic-surgery hospital (`isPrimary: true`, "Da Vinci Robotic Suite") | The YouTube video referenced in `roboticData.ts` is about Ealing Hospital (NHS), not Clementine Churchill | **CONFLICTING/NEEDS VERIFICATION** - the rebuild's "national record" robotic video is associated with the NHS site (Ealing), not this private hospital; do not conflate the two without confirmation of where private robotic surgery is actually performed |

## 2. Spire Bushey Hospital & Diagnostic Centre

| Field | Legacy site | Current rebuild | Independent source | Status |
|---|---|---|---|---|
| Address | "Heathbourne Road, Bushey, Hertfordshire, WD23 1RD" | "Heathbourne Road, Bushey, Hertfordshire, WD23 1RD" | Matches | **COMPLETE** |
| Phone | NOT FOUND on legacy site | "+44 (0)20 8950 9090" | **Spire Healthcare's own consultant-profile page lists "020 8901 5555" for Spire Bushey Diagnostic Centre** | **CONFLICTING** - two different numbers for the same hospital; the rebuild's number does not match Spire's own published number. Do not use either without direct confirmation. |
| Consultation hours | "Monday 19:00-20:00, alternate Thursdays 10:30-12:00" | "Tuesday evening 17:30-20:30, Thursday morning 09:00-13:00, Specialist Diagnostic Clinics" | None | **CONFLICTING** - different days/times |
| Secretary | Not specifically named for this location on legacy | "Amit Christian" | Spire profile independently names secretary "Amit Christian", phone "020 3371 1785" (different number again from clinics.ts's "+44 (0)7716 835261") | LEGACY - NEEDS CONFIRMATION, phone number itself conflicting across 2 rebuild-adjacent sources |
| Initial consultation fee | Legacy site-wide: "£220" | "£250" | **Spire's own profile independently states "Initial Consultation Fee: £250"**, matching the rebuild, not the legacy site | **CONFLICTING between legacy site and Spire's own page** - Spire's figure (matching the rebuild) may be the more current one since it's a third-party-maintained page, but this must be confirmed with the practice, not assumed |

## 3. The Wellington Hospital – Elstree Waterfront (HCA Healthcare)

| Field | Legacy site | Current rebuild | Independent source | Status |
|---|---|---|---|---|
| Address | "Beaufort House, The Waterfront Business Park, Elstree Road, Elstree, WD6 3BS" | "Beaufort House, The Waterfront Business Park, Elstree Road, Elstree, WD6 3BS" | Not independently checked | **COMPLETE** (matches) |
| Phone | NOT FOUND on legacy site | "+44 (0)20 7483 5148" | Not independently checked | NEEDS VERIFICATION |
| Consultation hours | Not specified/captured on legacy site | "Monday afternoon 14:00-17:30, By Special Appointment" | None | LEGACY - NEEDS CONFIRMATION (legacy gave no hours to compare against) |
| Secretary | "Nehali Christian" | "Nehali Christian" | None | Matches, but see general secretary-name conflict in `professional-facts-register.md` |

## 4. Syon Clinic (West London Outpatients), Brentford

| Field | Legacy site | Current rebuild | Independent source | Status |
|---|---|---|---|---|
| Presence at all | **NOT FOUND on any of the 30 legacy pages crawled**, including the dedicated Contact page and the site's own Sitemap (which lists only the 3 hospitals above) | Full entry present: name, tagline, address "941 Great West Road, Brentford, Middlesex, TW8 9DU", phone "+44 (0)20 8322 6000", secretary, hours, facilities, `mapQuery` | A general WebSearch on Prof. Sheth returned a snippet stating "Mr Hemant Sheth is a Consultant... surgeon at The Clementine Churchill Hospital **and Syon Clinic** in London" — this is a partial independent corroboration that Syon Clinic is a real, current practice location, though it does not corroborate the specific address/phone/hours the rebuild has built out in detail | **LEGACY - NEEDS CONFIRMATION (high priority, but no longer entirely unsourced)** |
| JSON-LD cross-check | N/A | `index.html` JSON-LD `hospitalAffiliation` lists Syon Clinic with an address that matches `clinics.ts` exactly (941 Great West Road / Brentford / Middlesex / TW8 9DU) | Same WebSearch snippet as above | This is at minimum an internally-consistent rebuild claim with weak external corroboration; still requires the client to confirm it directly since the primary legacy source never mentions it and the address/phone/hours detail has no independent source at all |

**Recommendation:** Do not remove Syon Clinic from the rebuild (the WebSearch snippet suggests it is likely real), but do not treat any of its specific details (address, phone, hours, facilities) as confirmed until the practice verifies them directly — this is exactly the scenario the task brief's "LEGACY - NEEDS CONFIRMATION" category exists for, in reverse (here it's "new-site-only, partially corroborated" rather than "legacy-only").

## 5. NHS base — Ealing Hospital (London North West University Healthcare NHS Trust)

| Field | Legacy site | Current rebuild | Status |
|---|---|---|---|
| Address | "Uxbridge Road, Southall, Middlesex UB1 3HW" | "Uxbridge Road, Southall, Middlesex UB1 3HW" | **COMPLETE** (matches exactly) |
| Role | "Consultant UGI, laparoscopic and HPB surgeon"; also "Surgical Tutor for the trust" and "Clinical lead for the department of surgery at Ealing site" | "Consultant Upper GI, HPB, Laparoscopic & Robotic Surgeon" | PARTIAL - "Robotic" added, Surgical Tutor/Clinical Lead titles dropped; see `professional-facts-register.md` |
| Referral note | Not stated on legacy site | "For NHS appointments, patients require a referral letter from their NHS GP via the NHS e-Referral Service (ERS)" | LEGACY - NEEDS CONFIRMATION (rebuild-original, standard NHS process, but should be confirmed as accurate for this specific trust) |

## 6. Summary table

| Location | On legacy site? | On rebuild? | Address match | Phone status | Overall status |
|---|---|---|---|---|---|
| Clementine Churchill | Yes | Yes | Partial (postcode only on legacy) | Not found on legacy; unverified on rebuild | LEGACY - NEEDS CONFIRMATION |
| Spire Bushey | Yes | Yes | Full match | **CONFLICTING** (2 different numbers found) | CONFLICTING |
| Wellington Elstree Waterfront | Yes | Yes | Full match | Not found on legacy; unverified on rebuild | NEEDS VERIFICATION |
| Syon Clinic | **No** | Yes | N/A (no legacy address to compare) | N/A | LEGACY - NEEDS CONFIRMATION (partially corroborated externally) |
| Ealing Hospital (NHS) | Yes | Yes | Full match | N/A (NHS, not a private booking line) | COMPLETE for address/role core, PARTIAL for exact title wording |
