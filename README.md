# morocco-kit

TypeScript toolkit for Morocco: phone, holidays, regions, MAD formatting. Zero runtime dependencies.

## Install (GitHub only, no npm registry)

```bash
npm i github:Saf1thedev/morocco-kit#v0.1.0
```

> Verified 2026-10-08 in a clean folder: installs, `prepare` runs `tsup` build.
> Modern npm pauses once to approve the build script — approve `morocco-kit:prepare`, then `require('morocco-kit')` works.
> No npm publishing: versioning is via git tags + GitHub Releases.

## Examples

```ts
import { normalizePhone, holidays, REGIONS, formatMAD } from "morocco-kit";

normalizePhone("0661000000");
// { e164: "+212661000000", national: "0661000000", kind: "mobile", ... }

holidays(2026, { overrides: { "eid-fitr": "2026-03-20" } });
// fixed dates exact; lunar estimated:true unless overridden (moon sighting)

REGIONS.length; // 12 — Decret 2.15.10
formatMAD(1234.5, "fr-MA"); // 1.234,50 MAD
```

## Sources

- Phone: ANRT numbering plan — https://www.anrt.ma/en/missions/numerotation
- Holidays: Decret 2-77-169 table — https://www.mmsp.gov.ma/fr/nos-metiers/horaires-de-travail-et-jours-feries
- Regions: Decret 2.15.10 — https://collectivites-territoriales.gov.ma/fr/actualites/nouveau-decoupage-territorial-du-royaume
- Full citations: [docs/SOURCES.md](docs/SOURCES.md). Deferred items: [docs/ROADMAP.md](docs/ROADMAP.md).

## Contributing

See CONTRIBUTING.md. Conventional commits, Vitest 95%+, no real personal data in examples.
