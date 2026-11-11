/**
 * @file campingsApi.ts
 * @author Pascal Thomasse Mol
 * @since 2026-09-09
 */

import { api } from "../../../api/client";

import type { Camping } from "../types/Camping";

export function getCampings() {
    return api<Camping[]>("/campings");
}

export function getCamping(campingId: string) {
    return api<Camping>(`/campings/${campingId}`);
}