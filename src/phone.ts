// Morocco phone numbers.
// Source: ANRT National Numbering Plan, https://www.anrt.ma/en/missions/numerotation
// accessed 2026-10-08: closed 10-digit plan "CC + N(S)N", CC=212, national number = 9 digits ZABPQMCDU.
// Prefix detail cross-checked with ITU/ANRT allocations via Telephone_numbers_in_Morocco (Wikipedia,
// single-source warning — treat operator mapping as best-effort, format rule as authoritative).
// All examples below are fake (06 61 00 00 00 style).

export type PhoneKind = "mobile" | "fixed" | "tollfree" | "premium" | "unknown";

export interface ParsedPhone {
	/** E.164 form, e.g. +212661000000 */
	e164: string;
	/** National form with trunk 0, e.g. 0661000000 */
	national: string;
	/** International with spaces, e.g. +212 661-000000 */
	international: string;
	kind: PhoneKind;
	/** First two digits of national number, e.g. 06 */
	prefix: string;
}

// National 9-digit NSN: 6x/7x mobile, 5x fixed, 80x toll-free, 89x premium.
function kindOf(national9: string): PhoneKind {
	const p2 = national9.slice(0, 2);
	const p3 = national9.slice(0, 3);
	if (
		p2 === "66" ||
		p2 === "61" ||
		p2 === "62" ||
		p2 === "63" ||
		p2 === "64" ||
		p2 === "65" ||
		p2 === "67" ||
		p2 === "68" ||
		p2 === "69" ||
		p2 === "60" ||
		p2 === "70" ||
		p2 === "71" ||
		p2 === "72" ||
		p2 === "73" ||
		p2 === "74" ||
		p2 === "75" ||
		p2 === "76" ||
		p2 === "77" ||
		p2 === "78" ||
		p2 === "79"
	)
		return "mobile";
	if (p3 === "800" || p3 === "801" || p3 === "802") return "tollfree";
	if (p3 === "890" || p3 === "891") return "premium";
	if (p2[0] === "5") return "fixed";
	return "unknown";
}

function digitsOnly(input: string): string {
	return input.replace(/\D/g, "");
}

/**
 * Normalize any Moroccan phone input to 9-digit national (without trunk) + E.164.
 * Accepts: 0661000000, 06 61 00 00 00, +212661000000, 00212661000000, 212661000000.
 * Returns null when the number cannot be a Moroccan 9-digit NSN.
 */
export function normalizePhone(input: string): ParsedPhone | null {
	let d = digitsOnly(input);
	// strip international prefixes
	if (d.startsWith("00212")) d = d.slice(5);
	else if (d.startsWith("212") && d.length === 12) d = d.slice(3);
	else if (d.startsWith("212") && d.length === 11) d = d.slice(2); // tolerate 212+9 without extra?
	// handle +212 already stripped to 212XXXXXXXXX (12 digits)
	if (d.length === 12 && d.startsWith("212")) d = d.slice(3);
	// trunk 0 + 9 digits
	if (d.length === 10 && d.startsWith("0")) d = d.slice(1);
	if (!/^[0-9]{9}$/.test(d)) return null;
	if (d[0] === "0" || d[0] === "1") return null; // 0x/1x are special services, not subscriber
	const kind = kindOf(d);
	if (kind === "unknown") return null;
	return {
		e164: `+212${d}`,
		national: `0${d}`,
		international: `+212 ${d.slice(0, 3)}-${d.slice(3)}`,
		kind,
		prefix: `0${d.slice(0, 1)}`,
	};
}

/** True when input parses as Moroccan mobile (06/07). */
export function isValidMobile(input: string): boolean {
	const p = normalizePhone(input);
	return p?.kind === "mobile";
}

/** True when input parses as Moroccan fixed (05...). */
export function isValidFixed(input: string): boolean {
	const p = normalizePhone(input);
	return p?.kind === "fixed";
}

/** Format to national display groups: 06 61 00 00 00. Fake examples only. */
export function formatNational(input: string): string | null {
	const p = normalizePhone(input);
	if (!p) return null;
	const n = p.national;
	return `${n.slice(0, 2)} ${n.slice(2, 4)} ${n.slice(4, 6)} ${n.slice(6, 8)} ${n.slice(8, 10)}`;
}
