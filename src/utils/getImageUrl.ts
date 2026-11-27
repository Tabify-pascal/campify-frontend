/**
 * @file getImageUrl.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-13
 */

import { ASSET_URL } from "../app/env";

export function getImageUrl(
    imageUrl: string | null | undefined,
    fallback = "/images/campify.png"
) {
    if (!imageUrl) {
        return fallback;
    }

    if (
        imageUrl.startsWith("http://") ||
        imageUrl.startsWith("https://") ||
        imageUrl.startsWith("data")
    ) {
        return imageUrl;
    }

    if (imageUrl.startsWith("/uploads/")) {
        return `${ASSET_URL}${imageUrl}`;
    }

    return imageUrl;
}