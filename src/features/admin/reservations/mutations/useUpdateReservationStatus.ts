import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminReservationStatus } from "../../../../api/adminReservationApi";
import type { ReservationStatus } from "../types/AdminReservation";

type UpdateReservationStatusInput = {
    reservationId: string;
    status: ReservationStatus;
};

export function useUpdateReservationStatus(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:({ reservationId, status}: UpdateReservationStatusInput) => updateAdminReservationStatus(reservationId, status),
        onSuccess: async (updatedReservation, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin", "reservations"]});
            queryClient.setQueryData(
                ["admin", "reservations", variables.reservationId],
                updatedReservation
            );
        },
    });
}
