import { useQuery } from "@tanstack/react-query";
import { getAdminReservationById } from "../../../../api/adminReservationApi";

export function useAdminReservation(reservationId: string | undefined) {
    return useQuery({
        queryKey: ["admin", "reservations", reservationId],
        queryFn: () => {
            if (!reservationId) {
                throw new Error("Reservation ID is required");
            }

            return getAdminReservationById(reservationId);
        },
        enabled: !!reservationId,
    });
}
