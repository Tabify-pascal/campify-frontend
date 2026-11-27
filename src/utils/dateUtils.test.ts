/**
 * @file dateUtils.test.ts
 * @author Pascal Thomasse Mol
 * @since 2026-11-27
 */

import {
    formatDateString,
    formatDate,
    getTodayString,
    isBeforeToday,
    getMonthName,
    getMonthRange,
    getDatesBetween,
    rangeContainsUnavailableDate,
} from "./dateUtils";

describe("formatDateString", () => {
    it("formats a Date object as YYYY-MM-DD", () => {
        expect(formatDateString(new Date(2026, 6, 15)))
            .toBe("2026-07-15");
    });

    it("pads single-digit months and days", () => {
        expect(formatDateString(new Date(2026, 0, 5)))
            .toBe("2026-01-05");
    });
});

describe("formatDate", () => {
    it("formats numeric date values as YYYY-MM-DD", () => {
        expect(formatDate(2026, 12, 15))
            .toBe("2026-12-15");
    });

    it("pads single-digit months and days", () => {
        expect(formatDate(2026, 2, 3))
            .toBe("2026-02-03");
    });
});

describe("relative date utilities", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date(2026, 10, 27, 12));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("returns today's date as YYYY-MM-DD", () => {
        expect(getTodayString()).toBe("2026-11-27");
    });

    it("identifies a date before today", () => {
        expect(isBeforeToday("2026-11-26")).toBe(true);
    });

    it("does not consider today to be in the past", () => {
        expect(isBeforeToday("2026-11-27")).toBe(false);
    });

    it("does not consider a future date to be in the past", () => {
        expect(isBeforeToday("2026-11-28")).toBe(false);
    });
});

describe("getMonthName", () => {
    it("returns the Dutch month name and year", () => {
        expect(getMonthName(2026, 11))
            .toBe("november 2026");
    });
});

describe("getMonthRange", () => {
    it("returns the first and last day of a 31-day month", () => {
        expect(getMonthRange(2026, 7)).toEqual({
            startDate: "2026-07-01",
            endDate: "2026-07-31",
        });
    });

    it("handles months with 30 days", () => {
        expect(getMonthRange(2026, 4)).toEqual({
            startDate: "2026-04-01",
            endDate: "2026-04-30",
        });
    });

    it("handles February in a regular year", () => {
        expect(getMonthRange(2026, 2)).toEqual({
            startDate: "2026-02-01",
            endDate: "2026-02-28",
        });
    });

    it("handles February in a leap year", () => {
        expect(getMonthRange(2028, 2)).toEqual({
            startDate: "2028-02-01",
            endDate: "2028-02-29",
        });
    });
});

describe("getDatesBetween", () => {
    it("includes the arrival date but excludes the departure date", () => {
        expect(getDatesBetween("2026-07-10", "2026-07-13"))
            .toEqual([
                "2026-07-10",
                "2026-07-11",
                "2026-07-12",
            ]);
    });

    it("handles dates across month boundaries", () => {
        expect(getDatesBetween("2026-07-30", "2026-08-02"))
            .toEqual([
                "2026-07-30",
                "2026-07-31",
                "2026-08-01",
            ]);
    });

    it("handles dates across year boundaries", () => {
        expect(getDatesBetween("2026-12-31", "2027-01-02"))
            .toEqual([
                "2026-12-31",
                "2027-01-01",
            ]);
    });

    it("returns an empty array for identical dates", () => {
        expect(getDatesBetween("2026-07-10", "2026-07-10"))
            .toEqual([]);
    });

    it("returns an empty array when the end precedes the start", () => {
        expect(getDatesBetween("2026-07-13", "2026-07-10"))
            .toEqual([]);
    });
});

describe("rangeContainsUnavailableDate", () => {
    it("detects an unavailable date within the reservation", () => {
        expect(
            rangeContainsUnavailableDate(
                "2026-07-10",
                "2026-07-13",
                ["2026-07-11"]
            )
        ).toBe(true);
    });

    it("detects an unavailable arrival date", () => {
        expect(
            rangeContainsUnavailableDate(
                "2026-07-10",
                "2026-07-13",
                ["2026-07-10"]
            )
        ).toBe(true);
    });

    it("allows an unavailable date on the departure day", () => {
        expect(
            rangeContainsUnavailableDate(
                "2026-07-10",
                "2026-07-13",
                ["2026-07-13"]
            )
        ).toBe(false);
    });

    it("ignores unavailable dates outside the reservation", () => {
        expect(
            rangeContainsUnavailableDate(
                "2026-07-10",
                "2026-07-13",
                ["2026-07-09", "2026-07-14"]
            )
        ).toBe(false);
    });

    it("returns false when all dates are available", () => {
        expect(
            rangeContainsUnavailableDate(
                "2026-07-10",
                "2026-07-13",
                []
            )
        ).toBe(false);
    });
});