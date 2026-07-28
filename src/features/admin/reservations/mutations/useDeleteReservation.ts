import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { deleteAdminReservation } from "../../../../api/adminReservationApi"

export function useDeleteReservation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAdminReservation,
        onSuccess: async (_, deletedId) => {
            await queryClient.invalidateQueries({ queryKey: ["admin", "reservations"]});
            queryClient.removeQueries({queryKey: ["admin", "reservations", deletedId] });
        },
    });
}