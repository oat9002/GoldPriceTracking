import { describe, expect, test } from "bun:test";
import { getRangeStart, priceRanges } from "../src/util/PriceRange";

describe("price range calendar boundaries", () => {
    test("multi-year ranges cover their labels, including leap days", () => {
        const now = Date.parse("2026-11-01T12:45:00+07:00");
        for (const [value, year] of [
            [730, 2024],
            [1095, 2023],
            [1825, 2021],
        ]) {
            expect(getRangeStart(value, now)).toBe(Date.parse(`${year}-11-01T00:00:00+07:00`));
        }
    });

    test("uses Bangkok's date rather than the UTC date", () => {
        expect(getRangeStart(3, Date.parse("2026-10-31T18:15:00Z"))).toBe(
            Date.parse("2026-10-29T00:00:00+07:00")
        );
    });

    test("calendar months clamp to the last valid day", () => {
        expect(getRangeStart(30, Date.parse("2024-03-31T12:00:00+07:00"))).toBe(
            Date.parse("2024-02-29T00:00:00+07:00")
        );
        expect(getRangeStart(365, Date.parse("2024-02-29T12:00:00+07:00"))).toBe(
            Date.parse("2023-02-28T00:00:00+07:00")
        );
    });

    test("every selectable range resolves and unknown ranges are rejected", () => {
        for (const range of priceRanges)
            expect(Number.isFinite(getRangeStart(range.value))).toBe(true);
        expect(() => getRangeStart(620)).toThrow("Unknown price range");
    });
});
