// Holidays: Decret 2-77-169 (28 Feb 1977), table at mmsp.gov.ma accessed 2026-10-08.
// 17 days: Hijra 1d, Mawlid 2d, Fitr 2d, Adha 2d, all fixed 1d each.
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
	date: string;
	end: string;
	estimated: boolean;
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
				estimated: false,
			};
		}
		return {
			...h,
			date: `${year}-??-??`,
			end: `${year}-??-??`,
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
		(h) => h.date !== `${year}-??-??` && iso >= h.date && iso <= h.end,
	);
}
