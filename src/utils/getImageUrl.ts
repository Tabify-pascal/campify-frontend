const ASSET_URL = import.meta.env.VITE_ASSET_URL;

export function getImageUrl(
    imageUrl : string | null | undefined,
    fallback = "/images/campify.png"
) {
    if (!imageUrl){
        return fallback;
    }

    if (
        imageUrl.startsWith("http://") ||
        imageUrl.startsWith("https://") ||
        imageUrl.startsWith("data")
    ) {
        return imageUrl;
    }

    if (imageUrl.startsWith("/uploads/")){
        return `${ASSET_URL}${imageUrl}`;
    }

    return imageUrl;
}