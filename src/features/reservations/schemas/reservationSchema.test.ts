/**
 * @file reservationSchema.test.ts
 * @author Pascal Thomasse Mol
 * @since 2026-11-27
 */

import { reservationSchema } from "./reservationSchema";

const validReservation = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "0612345678",
    guests: 2,
    arrivalDate: "2027-07-10",
    departureDate: "2027-07-15",
    notes: "Near the lake, please.",
};

describe("reservationSchema", () => {
    it("accepts a valid reservation", () => {
        expect(
            reservationSchema.safeParse(validReservation).success
        ).toBe(true);
    });

    it.each([
        ["firstName", ""],
        ["lastName", ""],
        ["email", "invalid-email"],
        ["phone", "1234567"],
        ["guests", 0],
        ["guests", 9],
        ["arrivalDate", ""],
        ["departureDate", ""],
    ])("rejects an invalid %s value (%s)", (field, value) => {
        const result = reservationSchema.safeParse({
            ...validReservation,
            [field]: value,
        });

        expect(result.success).toBe(false);
    });

    it.each([1, 8])("accepts %i guests", (guests) => {
        expect(
            reservationSchema.safeParse({
                ...validReservation,
                guests,
            }).success
        ).toBe(true);
    });

    it("converts the guest count from a string to a number", () => {
        const result = reservationSchema.parse({
            ...validReservation,
            guests: "4",
        });

        expect(result.guests).toBe(4);
    });

    it("accepts a reservation without notes", () => {
        expect(
            reservationSchema.safeParse({
                ...validReservation,
                notes: undefined,
            }).success
        ).toBe(true);
    });
});