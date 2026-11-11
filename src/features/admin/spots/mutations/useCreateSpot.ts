/**
 * @file useCreateSpot.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-13
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSpot } from "../api/adminSpotApi";
import { queryKeys } from "../../../../app/queryKeys";

export function useCreateSpot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSpot,
        onSuccess: async () => {
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