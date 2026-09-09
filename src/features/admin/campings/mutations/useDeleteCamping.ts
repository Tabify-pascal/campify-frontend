import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCamping } from "../api/adminCampingApi";
import { queryKeys } from "../../../../queryKeys";

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