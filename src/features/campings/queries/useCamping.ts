/**
 * @file useCamping.ts
 * @author Pascal Thomasse Mol
 * @since 2026-09-09
 */

import { useQuery } from "@tanstack/react-query";

import { getCamping } from "../api/campingsApi";
import { queryKeys } from "../../../app/queryKeys";

export function useCamping(
    campingId: string | undefined
) {
    return useQuery({
        queryKey: queryKeys.campings.detail(
            campingId ?? ""
        ),
        queryFn: () => {
            if (!campingId) {
                throw new Error("Camping ID is required");
            }

            return getCamping(campingId);
        },
        enabled: !!campingId,
    });
}