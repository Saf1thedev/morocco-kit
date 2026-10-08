import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import { formatMAD } from "../src/currency.js";
import {
	fixedHolidays,
	holidays,
	isHoliday,
	lunarHolidays,
} from "../src/holidays.js";
import {
	formatNational,
	isValidFixed,
	isValidMobile,
	normalizePhone,
} from "../src/phone.js";
import { REGIONS, findRegionByProvince, getRegion } from "../src/regions.js";

describe("phone (ANRT closed 10-digit plan, CC 212, NSN 9 digits)", () => {
	it("parses fake mobile 0661000000", () => {
		expect(normalizePhone("0661000000")).toMatchObject({
			e164: "+212661000000",
			kind: "mobile",
		});
	});
	it("accepts +212, 00212, spaces", () => {
		expect(normalizePhone("+212 661-000000")?.e164).toBe("+212661000000");
		expect(normalizePhone("00212661000000")?.e164).toBe("+212661000000");
	});
	it("rejects short/special", () => {
		expect(normalizePhone("06123")).toBeNull();
		expect(normalizePhone("190")).toBeNull();
	});
	it("property: mobile round-trips through E.164", () => {
		fc.assert(
			fc.property(fc.integer({ min: 610000000, max: 799999999 }), (n) => {
				const p = normalizePhone(`0${n}`);
				return p !== null && p.e164 === `+212${n}` && isValidMobile(p.e164);
			}),
		);
	});
	it("fixed + format", () => {
		expect(isValidFixed("0522000000")).toBe(true);
		expect(formatNational("0661000000")).toBe("06 61 00 00 00");
	});
});

describe("holidays (2-77-169 as amended + 2.25.1140/2.26.14 Unity Day)", () => {
	it("11 fixed public incl 31 Oct Unity Day, 11 Jan + 14 Jan present", () => {
		const f = fixedHolidays(2026);
		expect(f.length).toBe(11);
		expect(f.find((h) => h.date === "2026-01-11")).toBeDefined();
		expect(f.find((h) => h.date === "2026-01-14")).toBeDefined();
		expect(f.find((h) => h.date === "2026-10-31")).toMatchObject({
			id: "unity-day",
			days: 1,
		});
		expect(isHoliday("2026-10-31", 2026)).toBe(true);
	});
	it("private excludes 1 Jan", () => {
		expect(
			fixedHolidays(2026, "private").some((h) => h.id === "new-year"),
		).toBe(false);
	});
	it("Fitr/Adha/Mawlid are 2 days, Hijra 1 day", () => {
		expect(lunarHolidays(2026).find((h) => h.id === "eid-fitr")?.days).toBe(2);
		expect(lunarHolidays(2026).find((h) => h.id === "hijra")?.days).toBe(1);
	});
	it("lunar without override is null date + approx month", () => {
		const found = lunarHolidays(2026).find((h) => h.id === "eid-fitr");
		expect(found?.date ?? null).toBeNull();
		expect(found?.estimated).toBe(true);
		expect(found?.approxMonth).toBe(3);
		expect(lunarHolidays(2026).find((h) => h.id === "hijra")?.approxMonth).toBe(
			6,
		);
	});
	it("override makes exact + isHoliday spans 2 days", () => {
		const ov = { "eid-fitr": "2026-03-20" };
		expect(isHoliday("2026-03-20", 2026, { overrides: ov })).toBe(true);
		expect(isHoliday("2026-03-21", 2026, { overrides: ov })).toBe(true);
		expect(isHoliday("2026-03-19", 2026, { overrides: ov })).toBe(false);
		expect(isHoliday("2026-07-30", 2026)).toBe(true);
	});
	it("total public = 15 occasions", () => {
		expect(holidays(2026).length).toBe(15);
	});
});

describe("regions (Decret 2.15.10, 12 regions)", () => {
	it("12 regions, capitals set", () => {
		expect(REGIONS.length).toBe(12);
		expect(getRegion("casablanca-settat")?.capital).toBe("Casablanca");
	});
	it("province lookup", () => {
		expect(findRegionByProvince("Safi")?.id).toBe("marrakech-safi");
	});
});

describe("MAD (Intl, no licensed data)", () => {
	it("formats fr-MA and ar-MA without throwing", () => {
		expect(formatMAD(1234.5, "fr-MA")).toContain("MAD");
		expect(formatMAD(1234.5, "ar-MA").length).toBeGreaterThan(3);
		expect(formatMAD(1234.5, "en").length).toBeGreaterThan(3);
	});
});
