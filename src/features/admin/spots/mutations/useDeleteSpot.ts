/**
 * @file useDeleteSpot.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-13
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpot } from "../api/adminSpotApi";
import type { Spot } from "../../../spots/types/Spot";
import { queryKeys } from "../../../../app/queryKeys";

export function useDeleteSpot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSpot,
        onSuccess: async (_, deletedSpotId) => {

            queryClient.setQueriesData<Spot[]>(
                { queryKey: queryKeys.admin.spots.all },
                (currentSpots) =>
                    currentSpots?.filter((spot) => spot.id !== deletedSpotId) ?? []
            );

            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: queryKeys.admin.spots.all,
                }),
                queryClient.invalidateQueries({
                    queryKey: queryKeys.spots.all,
                }),
            ]);
        },
    });
}