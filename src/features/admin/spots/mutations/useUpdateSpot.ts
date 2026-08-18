import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSpot } from "../api/adminSpotApi";
import { queryKeys } from "../../../../queryKeys";

type UpdateSpotVariables = {
    id: string;
    data: Parameters<typeof updateSpot>[1];
}

export function useUpdateSpot(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data}: UpdateSpotVariables) =>
            updateSpot(id, data),

        onSuccess: async (updatedSpot) => {
            queryClient.setQueryData(
                queryKeys.admin.spots.detail(updatedSpot.id),
                updatedSpot
            );

            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: queryKeys.admin.spots.all,
                }),
                queryClient.invalidateQueries({
                    queryKey: queryKeys.spots.all
                }),
            ]);
        },
    });
}

