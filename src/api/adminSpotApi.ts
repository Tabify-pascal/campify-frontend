import { adminApi } from "./adminClient";
import type { Spot } from "../features/spots/types/Spot";
import type { SpotFormData } from "../features/admin/spots/schemas/spotSchema";

function createSpotFormData(data: SpotFormData) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("capacity", String(data.capacity));
    formData.append("pricePerNight", String(data.pricePerNight));
    formData.append("size", String(data.size));

    formData.append("electricity", String(data.electricity));
    formData.append("waterConnection", String(data.waterConnection));

    formData.append(
        "features",
        JSON.stringify(
            data.features
            .map(({ name }) => name.trim())
            .filter((name) => name.length > 0)
        )
    );

    const image = data.image?.[0];

    if (image) {
        formData.append("image", image);
    }

    return formData;
}

export function createSpot(data: SpotFormData){
    return adminApi<Spot>("/admin/spots", {
        method: "POST",
        body: createSpotFormData(data),
    });
}

export function updateSpot(id: string, data: SpotFormData){
    return adminApi<Spot>(`/admin/spots/${id}`, {
        method: "PUT",
        body: createSpotFormData(data),
    });
}

export function deleteSpot(id: string) {
    return adminApi<void>(`/admin/spots/${id}`, {
        method: "DELETE",
    });
}
