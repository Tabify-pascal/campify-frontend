/**
 * @file registerSchema.test.ts
 * @author Pascal Thomasse Mol
 * @since 2026-11-27
 */

import { registerSchema } from "./registerSchema";

const validRegistration = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "Password123",
};

describe("registerSchema", () => {
    it("accepts valid registration data", () => {
        expect(
            registerSchema.safeParse(validRegistration).success
        ).toBe(true);
    });

    it.each([
        ["firstName", ""],
        ["firstName", "   "],
        ["lastName", ""],
        ["lastName", "   "],
        ["email", ""],
        ["email", "invalid-email"],
        ["password", ""],
        ["password", "1234567"],
    ])("rejects an invalid %s value (%s)", (field, value) => {
        const result = registerSchema.safeParse({
            ...validRegistration,
            [field]: value,
        });

        expect(result.success).toBe(false);
    });

    it("accepts a password with exactly eight characters", () => {
        expect(
            registerSchema.safeParse({
                ...validRegistration,
                password: "12345678",
            }).success
        ).toBe(true);
    });

    it("trims whitespace from names and email", () => {
        const result = registerSchema.parse({
            ...validRegistration,
            firstName: " John ",
            lastName: " Doe ",
            email: " john@example.com ",
        });

        expect(result).toEqual(validRegistration);
    });

    it("preserves whitespace in passwords", () => {
        const password = " Password123 ";

        const result = registerSchema.parse({
            ...validRegistration,
            password,
        });

        expect(result.password).toBe(password);
    });
});