// Holidays: Decret 2-77-169 (28 Feb 1977) as amended, incl. Decret 2.25.1140 (public)
// and Royal communique 4 Nov 2025 + Decret 2.26.14 (private), all accessed 2026-10-08.
// 18 days public (17-day mmsp table predates 2026 decrees + 31 Oct Unity Day added):
// Hijra 1d, Mawlid 2d, Fitr 2d, Adha 2d, 11 fixed 1d each incl. 31 Oct.
// Religious dates lunar, announced by Ministere des Habous after crescent sighting.
export type HolidaySector = "public" | "private";
export interface Holiday {
	id: string;
	fr: string;
	ar: string;
	en: string;
	fixed: string | null;
	days: number;
	lunar: boolean;
	sectors: HolidaySector[];
}
export const FIXED: Holiday[] = [
	{
		id: "new-year",
		fr: "Nouvel an",
		ar: "ras as-sana",
		en: "New Year",
		fixed: "01-01",
		days: 1,
		lunar: false,
		sectors: ["public"],
	},
	{
		id: "manifesto",
		fr: "Manifeste Independance",
		ar: "wathiqat istiqlal",
		en: "Independence Manifesto",
		fixed: "01-11",
		days: 1,
		lunar: false,
		sectors: ["public", "private"],
	},
	{
		id: "amazigh",
		fr: "Nouvel an Amazigh",
		ar: "ras as-sana al-amazighiya",
		en: "Amazigh New Year",
		fixed: "01-14",
		days: 1,
		lunar: false,
		sectors: ["public", "private"],
	},
	{
		id: "labour",
		fr: "Fete du travail",
		ar: "eid ach-choghl",
		en: "Labour Day",
		fixed: "05-01",
		days: 1,
		lunar: false,
		sectors: ["public", "private"],
	},
	{
		id: "throne",
		fr: "Fete du trone",
		ar: "eid al-arch",
		en: "Throne Day",
		fixed: "07-30",
		days: 1,
		lunar: false,
		sectors: ["public", "private"],
	},
	{
		id: "oued",
		fr: "Oued Eddahab",
		ar: "wadi addahab",
		en: "Oued Ed-Dahab Day",
		fixed: "08-14",
		days: 1,
		lunar: false,
		sectors: ["public", "private"],
	},
	{
		id: "revolution",
		fr: "Revolution Roi et Peuple",
		ar: "thawrat al-malik",
		en: "Revolution Day",
		fixed: "08-20",
		days: 1,
		lunar: false,
		sectors: ["public", "private"],
	},
	{
		id: "youth",
		fr: "Fete de la jeunesse",
		ar: "eid ach-chabab",
		en: "Youth Day",
		fixed: "08-21",
		days: 1,
		lunar: false,
		sectors: ["public", "private"],
	},
	{
		// Aid Al Wahda (Unity Day), 31 Oct, 1 day, both sectors.
		// Royal Office communique 4 Nov 2025 (mre.gov.ma, accessed 2026-10-08):
		// "decreter la journee du 31 octobre de chaque annee une fete nationale" nommee "Aid Al Wahda".
		// Implemented by Decret 2.26.14 (completes 2.04.426, paid holidays agri/non-agri private)
		// and Decret 2.25.1140 (completes 2.77.169, public administrations),
		// adopted by Government Council 15 Jan 2026 (spokesperson Mustapha Baitas),
		// published Feb 2026 (LeBrief 16 Feb 2026: "deux decrets ... ajoutent le 31 octobre
		// a la liste des jours feries ... secteur public et prive").
		// No BO number located as of 2026-10-08; mmsp.gov.ma 17-day table predates these decrees.
		id: "unity-day",
		fr: "Aid Al Wahda (Fete de l'Unite)",
		ar: "eid al-wahda",
		en: "Unity Day",
		fixed: "10-31",
		days: 1,
		lunar: false,
		sectors: ["public", "private"],
	},
	{
		id: "green-march",
		fr: "Marche verte",
		ar: "al-masira alkhadra",
		en: "Green March",
		fixed: "11-06",
		days: 1,
		lunar: false,
		sectors: ["public", "private"],
	},
	{
		id: "independence",
		fr: "Fete Independance",
		ar: "eid al-istiqlal",
		en: "Independence Day",
		fixed: "11-18",
		days: 1,
		lunar: false,
		sectors: ["public", "private"],
	},
];
export const LUNAR: Holiday[] = [
	{
		id: "hijra",
		fr: "1er Moharram",
		ar: "fatih muharram",
		en: "Islamic New Year",
		fixed: null,
		days: 1,
		lunar: true,
		sectors: ["public", "private"],
	},
	{
		id: "mawlid",
		fr: "Aid Al Mawlid",
		ar: "eid al-mawlid",
		en: "Prophet Birthday",
		fixed: null,
		days: 2,
		lunar: true,
		sectors: ["public", "private"],
	},
	{
		id: "eid-fitr",
		fr: "Aid Al Fitr",
		ar: "eid al-fitr",
		en: "Eid al-Fitr",
		fixed: null,
		days: 2,
		lunar: true,
		sectors: ["public", "private"],
	},
	{
		id: "eid-adha",
		fr: "Aid Al Adha",
		ar: "eid al-adha",
		en: "Eid al-Adha",
		fixed: null,
		days: 2,
		lunar: true,
		sectors: ["public", "private"],
	},
];
export interface Dated extends Holiday {
	date: string | null;
	end: string | null;
	approxMonth: number | null;
	estimated: boolean;
}
// Tabular Islamic calendar estimate: Hijri year ≈ Gregorian year - 622 + (Gregorian year - 622)/32.
// Gives the APPROXIMATE Gregorian month for each lunar holiday; exact date needs Habous announcement.
// Verified pattern: Fitr 2026-03-20 announced, shifting ~10 days earlier yearly — estimator within ±1 month.
function estimateMonth(id: string, gYear: number): number | null {
	const hijri = Math.round(((gYear - 622) * 33) / 32);
	const anchor = (hYear: number, hMonth: number, hDay: number): number => {
		// days since Hijri epoch to tabular date, converted to Gregorian month estimate
		const hDays =
			(hYear - 1) * 354 +
			Math.floor((3 + 11 * hYear) / 30) +
			(hMonth - 1) * 29.5 +
			hDay;
		const gDays = hDays + 227014; // Hijri epoch 622-07-16 → Rata Die offset
		const g = new Date(Date.UTC(1, 0, 1) + (gDays - 1) * 86400000);
		return g.getUTCMonth() + 1;
	};
	try {
		if (id === "hijra") return anchor(hijri, 1, 1);
		if (id === "mawlid") return anchor(hijri, 3, 12);
		if (id === "eid-fitr") return anchor(hijri, 10, 1);
		if (id === "eid-adha") return anchor(hijri, 12, 10);
		return null;
	} catch {
		return null;
	}
}
export function fixedHolidays(
	year: number,
	sector: HolidaySector = "public",
): Dated[] {
	return FIXED.filter((h) => h.sectors.includes(sector)).map((h) => {
		const md = typeof h.fixed === "string" ? h.fixed : "01-01";
		const d = new Date(
			Date.UTC(year, Number(md.slice(0, 2)) - 1, Number(md.slice(3))),
		);
		d.setUTCDate(d.getUTCDate() + h.days - 1);
		return {
			...h,
			date: `${year}-${h.fixed}`,
			end: d.toISOString().slice(0, 10),
			approxMonth: Number(String(h.fixed).slice(0, 2)),
			estimated: false,
		};
	});
}
export function lunarHolidays(
	year: number,
	ov: Record<string, string> = {},
	sector: HolidaySector = "public",
): Dated[] {
	return LUNAR.filter((h) => h.sectors.includes(sector)).map((h) => {
		const a = ov[h.id];
		if (a) {
			const d = new Date(`${a}T00:00:00Z`);
			d.setUTCDate(d.getUTCDate() + h.days - 1);
			return {
				...h,
				date: a,
				end: d.toISOString().slice(0, 10),
				approxMonth: Number(a.slice(5, 7)),
				estimated: false,
			};
		}
		return {
			...h,
			date: null,
			end: null,
			approxMonth: estimateMonth(h.id, year),
			estimated: true,
		};
	});
}
export function holidays(
	year: number,
	o: { sector?: HolidaySector; overrides?: Record<string, string> } = {},
): Dated[] {
	const s = o.sector ?? "public";
	return [
		...fixedHolidays(year, s),
		...lunarHolidays(year, o.overrides ?? {}, s),
	];
}
export function isHoliday(
	iso: string,
	year: number,
	o: { sector?: HolidaySector; overrides?: Record<string, string> } = {},
): boolean {
	return holidays(year, o).some(
		(h) => h.date !== null && h.end !== null && iso >= h.date && iso <= h.end,
	);
}
