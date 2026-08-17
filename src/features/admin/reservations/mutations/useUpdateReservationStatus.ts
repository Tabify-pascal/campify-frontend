import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminReservationStatus } from "../api/adminReservationApi";
import type { ReservationStatus } from "../types/AdminReservation";
import { queryKeys } from "../../../../queryKeys";

type UpdateReservationStatusInput = {
    reservationId: string;
    status: ReservationStatus;
};

export function useUpdateReservationStatus(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:({ reservationId, status}: UpdateReservationStatusInput) => updateAdminReservationStatus(reservationId, status),
        onSuccess: async (updatedReservation, variables) => {
            queryClient.setQueryData(
                queryKeys.admin.reservations.detail(variables.reservationId),
                updatedReservation
            );
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.reservations.all}),
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.dashboard}),
            ])
            
        },
    });
}
