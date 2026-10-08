# Roadmap

## v0.1 (this PR)
- Phone normalize/validate/format (ANRT format rule)
- Holidays fixed + lunar with overrides, public/private sectors
- 12 regions + provinces (Decret 2.15.10)
- MAD formatting (Intl)

## Deferred — needs official spec before implementation
- RIB 24-digit key checksum: need Bank Al-Maghrib RIB specification document.
- MA IBAN format/registry: need SWIFT IBAN Registry entry for MA.
- Bank RIB codes: need BAM-published bank list with codes + redistribution license.
- Provinces/prefectures full list + cities: need HCP or Interior Ministry dataset with clear license.
- CIN / ICE: dropped from v0.1. Only format-level checks if official public doc found.
- 31 Oct Unity Day: INCLUDED as 1-day fixed both sectors (Royal communique 4 Nov 2025,
  Decrets 2.26.14 + 2.25.1140 adopted 15 Jan 2026, published Feb 2026).
  BO number still not located — mmsp 17-day table predates decrees.

## Later
- Single Next.js web app: API /v1 + docs + playground (one Vercel project).
- In-memory rate limiting documented as best-effort on serverless.
- GitHub Releases via tags. No npm publishing.
