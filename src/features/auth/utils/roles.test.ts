/**
 * @file roles.test.ts
 * @author Pascal Thomasse Mol
 * @since 2026-11-27
 */

import { canAccessAdmin, isAdmin } from "./roles";

describe("canAccessAdmin", () => {
    it("allows administrators to access the admin environment", () => {
        expect(canAccessAdmin("ADMIN")).toBe(true);
    });

    it("allows managers to access the admin environment", () => {
        expect(canAccessAdmin("MANAGER")).toBe(true);
    });

    it("denies customers access to the admin environment", () => {
        expect(canAccessAdmin("CUSTOMER")).toBe(false);
    });
});

describe("isAdmin", () => {
    it("returns true for administrators", () => {
        expect(isAdmin("ADMIN")).toBe(true);
    });

    it("returns false for managers", () => {
        expect(isAdmin("MANAGER")).toBe(false);
    });

    it("returns false for customers", () => {
        expect(isAdmin("CUSTOMER")).toBe(false);
    });
});