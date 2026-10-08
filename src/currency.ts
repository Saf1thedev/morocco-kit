// MAD formatting via Intl.NumberFormat (no data to license).
export type MadLocale = "fr-MA" | "ar-MA" | "en";
export function formatMAD(amount: number, locale: MadLocale = "fr-MA"): string {
	const tag = locale === "en" ? "en-MA" : locale;
	return new Intl.NumberFormat(tag, {
		style: "currency",
		currency: "MAD",
	}).format(amount);
}
export function formatMADParts(
	amount: number,
	locale: MadLocale = "fr-MA",
): Intl.NumberFormatPart[] {
	const tag = locale === "en" ? "en-MA" : locale;
	return new Intl.NumberFormat(tag, {
		style: "currency",
		currency: "MAD",
	}).formatToParts(amount);
}
