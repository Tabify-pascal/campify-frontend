import { useQuery } from "@tanstack/react-query";
import { getAdminReservations } from "../../../../api/adminReservationApi";

export function useAdminReservations(){
    return useQuery({
        queryKey: ["admin", "reservations"],
        queryFn: getAdminReservations,
    });
}

