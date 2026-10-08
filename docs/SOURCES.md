# Data sources (accessed 2026-10-08)

Every rule/dataset below was read at the URL shown. Facts only — no copied prose.
Code cites the same URLs in comments. Fake examples only, no real personal data.

## 1. Phone — ANRT National Numbering Plan
- URL: https://www.anrt.ma/en/missions/numerotation
- Used: closed 10-digit plan, CC=212, national NSN = 9 digits ZABPQMCDU.
- Prefix ranges: cross-checked via ANRT allocation Excel + Telephone_numbers_in_Morocco
  (https://en.wikipedia.org/wiki/Telephone_numbers_in_Morocco) — that page carries a
  single-source warning, so operator mapping is best-effort; format rule is authoritative.
  README carries the same best-effort notice.
- License: ANRT site (c) ANRT. Facts restated, file not redistributed.
- Test vectors: fake numbers only (0661000000-style).

## 2. Holidays — Decret 2-77-169 (public sector, 17 days)
- URL: https://www.mmsp.gov.ma/fr/nos-metiers/horaires-de-travail-et-jours-feries
- Used: 17-day table — Hijra 1d, Mawlid 2d, Fitr 2d, Adha 2d, 10 fixed 1d each
  (01-01, 01-11, 01-14 Amazigh added 2023 per royal statement 3 May 2023, 05-01,
  07-30, 08-14, 08-20, 08-21, 11-06, 11-18). Decret n° 2-77-169 du 28 Feb 1977 as amended.
- Private sector cross-check: Decret n° 2-4-426 (29 Dec 2004, art.217 Code du travail):
  8 fixed + 4 religious, no 2nd Aid day, no 01-01. Implemented as sector flag.
- Religious dates: lunar, announced by Ministere des Habous after crescent sighting.
  All religious entries estimated:true unless overridden with announced date.
- License: government portal (c). Facts + decree numbers cited.

### 31 Oct Unity Day verdict (checked 2026-10-08)
- maroc.ma informational page lists 31 Oct "Aid Al Wahda (Unity Day)" among national
  holidays (https://www.maroc.ma/en/morocco/religious-and-national-holidays) but cites
  NO decree and NO duration — it is an editorial list, not legal text.
- The binding table on mmsp.gov.ma (Decret 2-77-169 as amended, 17 days) does NOT
  contain 31 Oct. The private-sector Decret 2-4-426 list does not contain it either.
- Verdict: EXCLUDED from FIXED until a decree/BO number confirms paid-holiday status
  and duration. Left in docs/ROADMAP.md as deferred. Tests assert 10 fixed / 14 total.

## 3. Regions — Decret 2.15.10 (12 regions)
- URL: https://collectivites-territoriales.gov.ma/fr/actualites/nouveau-decoupage-territorial-du-royaume
- Used: 12 region names, capitals, province lists. Decret n°2.15.10 du 20 Feb 2015, BO n°6340 05 Mar 2015.
- License: DGCT portal (c). Facts restated with attribution.

## 4. MAD formatting — no licensed data
- Intl.NumberFormat with currency MAD. No dataset copied.

## Explicitly NOT in v0.1 (no verified official spec found yet)
- RIB 24-digit key algorithm, MA IBAN registry entry, bank RIB codes: need Bank Al-Maghrib spec.
- CIN / ICE formats: dropped from v0.1 per your instruction.
- See docs/ROADMAP.md.
