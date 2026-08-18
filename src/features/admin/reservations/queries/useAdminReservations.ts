import { useQuery } from "@tanstack/react-query";
import { getAdminReservations } from "../api/adminReservationApi";
import { queryKeys } from "../../../../queryKeys";

export function useAdminReservations(){
    return useQuery({
        queryKey: queryKeys.admin.reservations.all,
        queryFn: getAdminReservations,
    });
}

