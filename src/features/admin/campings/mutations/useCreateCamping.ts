import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCamping } from "../api/adminCampingApi";
import { queryKeys } from "../../../../app/queryKeys";

export function useCreateCamping() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCamping,
        onSuccess: async () => {
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