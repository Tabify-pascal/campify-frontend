import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSpot } from "../../../../api/adminSpotApi";

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
                ["spots", updatedSpot.id],
                updatedSpot
            );

            await queryClient.invalidateQueries({
                queryKey: ["spots"],
            });
        },
    });
}

