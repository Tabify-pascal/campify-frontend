/**
 * @file useDeleteCamping.ts
 * @author Pascal Thomasse Mol
 * @since 2026-09-09
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCamping } from "../api/adminCampingApi";
import { queryKeys } from "../../../../app/queryKeys";

export function useDeleteCamping() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCamping,

        onSuccess: async (_, deletedCampingId) => {
            queryClient.removeQueries({
                queryKey:
                    queryKeys.admin.campings.detail(
                        deletedCampingId
                    ),
            });

            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: queryKeys.admin.campings.all,
                }),
                queryClient.invalidateQueries({
                    queryKey: queryKeys.campings.all,
                }),
            ]);
        },
    });
}