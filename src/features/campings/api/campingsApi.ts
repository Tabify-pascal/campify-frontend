import { api } from "../../../api/client";

import type { Camping } from "../types/Camping";

export function getCampings() {
    return api<Camping[]>("/campings");
}

export function getCamping(campingId: string) {
    return api<Camping>(`/campings/${campingId}`);
}