// 12 regions per Decret n°2.15.10 du 20 Fev 2015, BO n°6340 05 Mars 2015.
// Source: DGCT https://collectivites-territoriales.gov.ma/fr/actualites/nouveau-decoupage-territorial-du-royaume
// accessed 2026-10-08. Facts only, no copied prose. Provinces per same page.
export interface Region {
	id: string;
	nameFr: string;
	nameAr: string;
	nameEn: string;
	capital: string;
	provinces: string[];
}
export const REGIONS: Region[] = [
	{
		id: "tanger-tetouan-al-hoceima",
		nameFr: "Tanger-Tétouan-Al Hoceïma",
		nameAr: "طنجة تطوان الحسيمة",
		nameEn: "Tanger-Tetouan-Al Hoceima",
		capital: "Tanger",
		provinces: [
			"Tanger-Assilah",
			"M'diq-Fnideq",
			"Tétouan",
			"Fahs-Anjra",
			"Larache",
			"Al Hoceïma",
			"Chefchaouen",
			"Ouazzane",
		],
	},
	{
		id: "oriental",
		nameFr: "L'Oriental",
		nameAr: "الشرق",
		nameEn: "Oriental",
		capital: "Oujda",
		provinces: [
			"Oujda-Angad",
			"Nador",
			"Driouch",
			"Jerada",
			"Berkan",
			"Taourirt",
			"Guercif",
			"Figuig",
		],
	},
	{
		id: "fes-meknes",
		nameFr: "Fès-Meknès",
		nameAr: "فاس مكناس",
		nameEn: "Fes-Meknes",
		capital: "Fès",
		provinces: [
			"Fès",
			"Meknès",
			"El Hajeb",
			"Ifrane",
			"Moulay Yacoub",
			"Sefrou",
			"Boulemane",
			"Taounate",
			"Taza",
		],
	},
	{
		id: "rabat-sale-kenitra",
		nameFr: "Rabat-Salé-Kénitra",
		nameAr: "الرباط سلا القنيطرة",
		nameEn: "Rabat-Sale-Kenitra",
		capital: "Rabat",
		provinces: [
			"Rabat",
			"Salé",
			"Skhirate-Témara",
			"Kénitra",
			"Khémisset",
			"Sidi Kacem",
			"Sidi Slimane",
		],
	},
	{
		id: "beni-mellal-khenifra",
		nameFr: "Béni Mellal-Khénifra",
		nameAr: "بني ملال خنيفرة",
		nameEn: "Beni Mellal-Khenifra",
		capital: "Béni Mellal",
		provinces: [
			"Béni Mellal",
			"Azilal",
			"Fquih Ben Salah",
			"Khénifra",
			"Khouribga",
		],
	},
	{
		id: "casablanca-settat",
		nameFr: "Casablanca-Settat",
		nameAr: "الدار البيضاء سطات",
		nameEn: "Casablanca-Settat",
		capital: "Casablanca",
		provinces: [
			"Casablanca",
			"Mohammadia",
			"El Jadida",
			"Nouaceur",
			"Médiouna",
			"Benslimane",
			"Berrechid",
			"Settat",
			"Sidi Bennour",
		],
	},
	{
		id: "marrakech-safi",
		nameFr: "Marrakech-Safi",
		nameAr: "مراكش آسفي",
		nameEn: "Marrakech-Safi",
		capital: "Marrakech",
		provinces: [
			"Marrakech",
			"Chichaoua",
			"Al Haouz",
			"Kelâa des Sraghna",
			"Essaouira",
			"Rehamna",
			"Safi",
			"Youssoufia",
		],
	},
	{
		id: "draa-tafilalet",
		nameFr: "Drâa-Tafilalet",
		nameAr: "درعة تافيلالت",
		nameEn: "Draa-Tafilalet",
		capital: "Errachidia",
		provinces: ["Errachidia", "Ouarzazate", "Midelt", "Tinghir", "Zagora"],
	},
	{
		id: "souss-massa",
		nameFr: "Souss-Massa",
		nameAr: "سوس ماسة",
		nameEn: "Souss-Massa",
		capital: "Agadir",
		provinces: [
			"Agadir Ida-Ou-Tanane",
			"Inezgane-Aït Melloul",
			"Chtouka-Aït Baha",
			"Taroudannt",
			"Tiznit",
			"Tata",
		],
	},
	{
		id: "guelmim-oued-noun",
		nameFr: "Guelmim-Oued Noun",
		nameAr: "كلميم واد نون",
		nameEn: "Guelmim-Oued Noun",
		capital: "Guelmim",
		provinces: ["Guelmim", "Assa-Zag", "Tan-Tan", "Sidi Ifni"],
	},
	{
		id: "laayoune-sakia-hamra",
		nameFr: "Laâyoune-Sakia El Hamra",
		nameAr: "العيون الساقية الحمراء",
		nameEn: "Laayoune-Sakia El Hamra",
		capital: "Laâyoune",
		provinces: ["Laâyoune", "Boujdour", "Tarfaya", "Es-Semara"],
	},
	{
		id: "dakhla-oued-eddahab",
		nameFr: "Dakhla-Oued Ed-Dahab",
		nameAr: "الداخلة وادي الذهب",
		nameEn: "Dakhla-Oued Ed-Dahab",
		capital: "Dakhla",
		provinces: ["Oued Ed-Dahab", "Aousserd"],
	},
];
export function getRegion(id: string): Region | null {
	return REGIONS.find((r) => r.id === id) ?? null;
}
export function provincesOf(regionId: string): string[] {
	return getRegion(regionId)?.provinces ?? [];
}
export function findRegionByProvince(province: string): Region | null {
	const p = province.trim().toLowerCase();
	return (
		REGIONS.find((r) => r.provinces.some((x) => x.toLowerCase() === p)) ?? null
	);
}
