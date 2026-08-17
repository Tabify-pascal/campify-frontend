import { useQuery } from "@tanstack/react-query";
import { getAdminReservationById } from "../api/adminReservationApi";
import { queryKeys } from "../../../../queryKeys";

export function useAdminReservation(reservationId: string) {
    return useQuery({
        queryKey: queryKeys.admin.reservations.detail(reservationId),
        queryFn: () => {
            if (!reservationId) {
                throw new Error("Reservation ID is required");
            }

            return getAdminReservationById(reservationId);
        },
        enabled: !!reservationId,
    });
}
