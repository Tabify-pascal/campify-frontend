import { api } from "../../../api/client";

import type { Spot } from "../types/Spot";
import type { Availability } from "../types/Availability";

export type GetSpotsParams = {
    campingId?: string | null;
    arrivalDate?: string | null;
    departureDate?: string | null;
    guests?: string | null;
};

export function getSpots(params?: GetSpotsParams) {
    const searchParams = new URLSearchParams();

    if (params?.campingId) {
        searchParams.set("campingId", params.campingId);
    }

    if (params?.arrivalDate) {
        searchParams.set("arrivalDate", params.arrivalDate);
    }

    if (params?.departureDate) {
        searchParams.set("departureDate", params.departureDate);
    }

    if (params?.guests) {
        searchParams.set("guests", params.guests);
    }

    const queryString = searchParams.toString();

    return api<Spot[]>(
        `/spots${queryString ? `?${queryString}` : ""}`
    );
}

export function getSpot(spotId: string) {
    return api<Spot>(`/spots/${spotId}`);
}

export function getSpotAvailability(
    spotId: string,
    startDate: string,
    endDate: string
) {
    return api<Availability>(
        `/spots/${spotId}/availability?startDate=${startDate}&endDate=${endDate}`
    );
}