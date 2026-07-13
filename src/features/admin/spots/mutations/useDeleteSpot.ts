import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpot } from "../../../../api/adminSpotApi";
import type { Spot } from "../../../spots/types/Spot";

export function useDeleteSpot(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSpot,
        onSuccess: async (_, deletedSpotId) => {

            queryClient.setQueriesData<Spot[]>(
                {queryKey: ["spots"]},
                (currentSpots) => 
                    currentSpots?.filter((spot) => spot.id !== deletedSpotId) ?? []
            );

            await queryClient.invalidateQueries({
                queryKey: ["spots"],
            });
        },
    });
}