import { api } from "../../../../api/client";

import type { Camping } from "../../../campings/types/Camping";
import type { CampingFormData } from "../schemas/campingSchema";

function createCampingFormData(
    data: CampingFormData
) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("slug", data.slug);

    formData.append(
        "description",
        data.description ?? ""
    );

    const logo = data.logo?.[0];

    if (logo) {
        formData.append("logo", logo);
    }

    return formData;
}

export function getAdminCampings() {
    return api<Camping[]>("/admin/campings");
}

export function getAdminCamping(
    campingId: string
) {
    return api<Camping>(
        `/admin/campings/${campingId}`
    );
}

export function createCamping(
    data: CampingFormData
) {
    return api<Camping>("/admin/campings", {
        method: "POST",
        body: createCampingFormData(data),
    });
}

export function updateCamping(
    campingId: string,
    data: CampingFormData
) {
    return api<Camping>(
        `/admin/campings/${campingId}`,
        {
            method: "PUT",
            body: createCampingFormData(data),
        }
    );
}

export function deleteCamping(
    campingId: string
) {
    return api<void>(
        `/admin/campings/${campingId}`,
        {
            method: "DELETE",
        }
    );
}