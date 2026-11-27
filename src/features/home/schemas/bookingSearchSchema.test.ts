/**
 * @file bookingSearchSchema.test.ts
 * @author Pascal Thomasse Mol
 * @since 2026-11-27
 */

import { bookingSearchSchema } from "./bookingSearchSchema";

const validSearch = {
    arrivalDate: "2027-07-10",
    departureDate: "2027-07-15",
    guests: 2,
};

describe("bookingSearchSchema", () => {
    it("accepts valid booking search criteria", () => {
        expect(
            bookingSearchSchema.safeParse(validSearch).success
        ).toBe(true);
    });

    it.each([
        ["arrivalDate", ""],
        ["departureDate", ""],
        ["guests", 0],
        ["guests", 7],
        ["guests", "invalid"],
    ])("rejects an invalid %s value (%s)", (field, value) => {
        const result = bookingSearchSchema.safeParse({
            ...validSearch,
            [field]: value,
        });

        expect(result.success).toBe(false);
    });

    it.each([1, 6])("accepts %i guests", (guests) => {
        expect(
            bookingSearchSchema.safeParse({
                ...validSearch,
                guests,
            }).success
        ).toBe(true);
    });

    it("converts the guest count from a string to a number", () => {
        const result = bookingSearchSchema.parse({
            ...validSearch,
            guests: "3",
        });

        expect(result.guests).toBe(3);
    });
});