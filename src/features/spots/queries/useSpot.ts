/**
 * @file useSpot.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-09
 */

import { useQuery } from "@tanstack/react-query";
import { getSpot } from "../api/spotsApi"; 
import { queryKeys } from "../../../app/queryKeys";

export function useSpot(spotId: string | undefined) {
    return useQuery({
        queryKey: queryKeys.spots.detail(spotId!),
        queryFn: () => getSpot(spotId!),
        enabled: !!spotId,
    });
}