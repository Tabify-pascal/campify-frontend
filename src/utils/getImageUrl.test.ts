/**
 * @file getImageUrl.test.ts
 * @author Pascal Thomasse Mol
 * @since 2026-11-27
 */

import { getImageUrl } from "./getImageUrl";

jest.mock("../app/env", () => ({
    ASSET_URL: "https://assets.example.com",
}));

describe("getImageUrl", () => {
    it("returns the default fallback for null", () => {
        expect(getImageUrl(null))
            .toBe("/images/campify.png");
    });

    it("returns the default fallback for undefined", () => {
        expect(getImageUrl(undefined))
            .toBe("/images/campify.png");
    });

    it("returns the default fallback for an empty string", () => {
        expect(getImageUrl(""))
            .toBe("/images/campify.png");
    });

    it("supports a custom fallback image", () => {
        expect(getImageUrl(null, "/images/default.png"))
            .toBe("/images/default.png");
    });

    it("preserves absolute HTTP URLs", () => {
        expect(getImageUrl("http://example.com/image.png"))
            .toBe("http://example.com/image.png");
    });

    it("preserves absolute HTTPS URLs", () => {
        expect(getImageUrl("https://example.com/image.png"))
            .toBe("https://example.com/image.png");
    });

    it("preserves data URLs", () => {
        const dataUrl = "data:image/png;base64,AAAA";

        expect(getImageUrl(dataUrl)).toBe(dataUrl);
    });

    it("prefixes uploaded images with the asset URL", () => {
        expect(getImageUrl("/uploads/camping.png"))
            .toBe("https://assets.example.com/uploads/camping.png");
    });

    it("preserves local image paths", () => {
        expect(getImageUrl("/images/camping.png"))
            .toBe("/images/camping.png");
    });
});