import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCamping } from "../api/adminCampingApi";
import type { CampingFormData } from "../schemas/campingSchema";
import { queryKeys } from "../../../../queryKeys";

type Variables = {
    id: string;
    data: CampingFormData;
};

export function useUpdateCamping() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: Variables) =>
            updateCamping(id, data),

        onSuccess: async (updatedCamping) => {
            queryClient.setQueryData(
                queryKeys.admin.campings.detail(
                    updatedCamping.id
                ),
                updatedCamping
            );

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