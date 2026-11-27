/**
 * @file loginSchema.test.ts
 * @author Pascal Thomasse Mol
 * @since 2026-11-27
 */

import { loginSchema } from "./loginSchema";

const validLogin = {
    email: "john@example.com",
    password: "Password123",
};

describe("loginSchema", () => {
    it("accepts valid login data", () => {
        expect(
            loginSchema.safeParse(validLogin).success
        ).toBe(true);
    });

    it.each([
        ["email", ""],
        ["email", "invalid-email"],
        ["password", ""],
    ])("rejects an invalid %s value (%s)", (field, value) => {
        const result = loginSchema.safeParse({
            ...validLogin,
            [field]: value,
        });

        expect(result.success).toBe(false);
    });

    it("trims whitespace from the email address", () => {
        const result = loginSchema.parse({
            ...validLogin,
            email: " john@example.com ",
        });

        expect(result.email).toBe("john@example.com");
    });

    it("preserves whitespace in the password", () => {
        const password = " Password123 ";

        const result = loginSchema.parse({
            ...validLogin,
            password,
        });

        expect(result.password).toBe(password);
    });
});