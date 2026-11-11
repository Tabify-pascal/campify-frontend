/**
 * @file useAdminSpot.ts
 * @author Pascal Thomasse Mol
 * @since 2026-09-14
 */

import { useQuery } from "@tanstack/react-query";

import { getAdminSpot } from "../api/adminSpotApi";
import { queryKeys } from "../../../../app/queryKeys";

export function useAdminSpot(
    spotId: string | undefined
) {
    return useQuery({
        queryKey: queryKeys.admin.spots.detail(
            spotId ?? ""
        ),
        queryFn: () => {
            if (!spotId) {
                throw new Error("Spot ID is required");
            }

            return getAdminSpot(spotId);
        },
        enabled: !!spotId,
    });
}