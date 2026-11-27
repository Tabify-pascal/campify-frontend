/**
 * @file contactSchema.test.ts
 * @author Pascal Thomasse Mol
 * @since 2026-11-27
 */

import { contactSchema } from "./contactSchema";

const validContact = {
    campingId: "camping-1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Camping facilities",
    message: "Are pets allowed at the camping?",
};

describe("contactSchema", () => {
    it("accepts a valid contact message", () => {
        expect(
            contactSchema.safeParse(validContact).success
        ).toBe(true);
    });

    it.each([
        ["campingId", ""],
        ["name", ""],
        ["email", ""],
        ["email", "invalid-email"],
        ["subject", ""],
        ["message", ""],
    ])("rejects an invalid %s value (%s)", (field, value) => {
        const result = contactSchema.safeParse({
            ...validContact,
            [field]: value,
        });

        expect(result.success).toBe(false);
    });
});