/**
 * @file formatDate.test.ts
 * @author Pascal Thomasse Mol
 * @since 2026-11-27
 */

import { formatDate } from "./formatDate";

describe("formatDate", () => {
    it("formats a date in Dutch", () => {
        expect(formatDate("2026-07-15"))
            .toBe("15 juli 2026");
    });

    it("formats single-digit days without leading zeros", () => {
        expect(formatDate("2026-01-05"))
            .toBe("5 januari 2026");
    });

    it("formats leap-year dates correctly", () => {
        expect(formatDate("2028-02-29"))
            .toBe("29 februari 2028");
    });
});