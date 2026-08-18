import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { deleteAdminReservation } from "../api/adminReservationApi"
import { queryKeys } from "../../../../queryKeys";

export function useDeleteReservation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAdminReservation,
        onSuccess: async (_, deletedId) => {
            queryClient.removeQueries({queryKey: queryKeys.admin.reservations.detail(deletedId)});
            await Promise.all ([
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.reservations.all}),
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.dashboard}),       
            ]);
        },
    });
}