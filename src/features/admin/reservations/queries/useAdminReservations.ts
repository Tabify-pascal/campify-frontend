/**
 * @file useAdminReservations.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-28
 */

import { useQuery } from "@tanstack/react-query";
import { getAdminReservations } from "../api/adminReservationApi";
import { queryKeys } from "../../../../app/queryKeys";

export function useAdminReservations(){
    return useQuery({
        queryKey: queryKeys.admin.reservations.all,
        queryFn: getAdminReservations,
    });
}

