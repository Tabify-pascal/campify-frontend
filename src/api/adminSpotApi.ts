import { adminApi } from "./adminClient";
import type { Spot } from "../features/spots/types/Spot";
import type { SpotFormData } from "../features/admin/spots/schemas/spotSchema";


export function createSpot(data: SpotFormData){
    return adminApi<Spot>("/admin/spots", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateSpot(id: string, data: SpotFormData){
    return adminApi<Spot>(`/admin/spots/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export function deleteSpot(id: string) {
    return adminApi<void>(`/admin/spots/${id}`, {
        method: "DELETE",
    });
}
