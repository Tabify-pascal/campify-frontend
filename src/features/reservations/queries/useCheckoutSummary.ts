import { useQuery } from "@tanstack/react-query";

import { getCheckoutSummary } from "../api/reservationsApi";
import { queryKeys } from "../../../queryKeys";

export function useCheckoutSummary(
    reservationId: string | undefined
) {
    return useQuery({
        queryKey: queryKeys.reservations.checkout(
            reservationId ?? ""
        ),
        queryFn: () => {
            if (!reservationId) {
                throw new Error(
                    "Reservation ID is required"
                );
            }

            return getCheckoutSummary(
                reservationId
            );
        },
        enabled: !!reservationId,
    });
}