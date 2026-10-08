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

## 2. Holidays — Decret 2-77-169 as amended + 31 Oct Unity Day (18 days public)
- Base table URL: https://www.mmsp.gov.ma/fr/nos-metiers/horaires-de-travail-et-jours-feries
  (accessed 2026-10-08 — NOTE: this page still shows the pre-2026 17-day table;
  it predates the Unity Day decrees below and has not been updated yet.)
- Base: 17-day table — Hijra 1d, Mawlid 2d, Fitr 2d, Adha 2d, 10 fixed 1d each
  (01-01, 01-11, 01-14 Amazigh added 2023 per royal statement 3 May 2023, 05-01,
  07-30, 08-14, 08-20, 08-21, 11-06, 11-18). Decret n° 2-77-169 du 28 Feb 1977 as amended.
- 31 Oct Unity Day addition (verified 2026-10-08):
  - Royal Office communique 4 Nov 2025: https://www.mre.gov.ma/fr/media-room/actualites/sa-majeste-le-roi-decrete-le-31-octobre-fete-de-lunite-communique-du-cabinet
    — "decreter la journee du 31 octobre de chaque annee une fete nationale" nommee "Aid Al Wahda".
  - Decret n° 2.26.14 (completes 2.04.426, paid holidays agricultural + non-agricultural private)
    and Decret n° 2.25.1140 (completes 2.77.169, public administrations),
    adopted by Government Council 15 Jan 2026 per spokesperson Mustapha Baitas:
    https://lematin.ma/nation/fete-de-lunite-le-31-octobre-inscrit-parmi-les-jours-feries/324527
    and https://ecoactu.ma/fete-de-lunite-deux-decrets-adoptes-par-le-gouvernement/
  - Published Feb 2026: https://www.lebrief.ma/fete-de-lunite-le-31-octobre-inscrit-au-calendrier-des-jours-feries-au-maroc-100141894/
    — "deux decrets ... ajoutent le 31 octobre a la liste des jours feries ... public et prive".
  - Duration 1 day, both sectors. No Bulletin Officiel number located as of 2026-10-08.
- Private sector cross-check: Decret n° 2-4-426 (29 Dec 2004, art.217 Code du travail):
  8 fixed + 4 religious, no 2nd Aid day, no 01-01 — now + 31 Oct via 2.26.14. Implemented as sector flag.
- Religious dates: lunar, announced by Ministere des Habous after crescent sighting.
  All religious entries estimated:true unless overridden with announced date.
- License: government portals (c). Facts + decree numbers cited.

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
