import { useQuery } from "@tanstack/react-query";

import { getAccountReservations } from "../api/accountApi";
import { queryKeys } from "../../../app/queryKeys";

export function useAccountReservations(){
    return useQuery({
        queryKey: queryKeys.account.reservations,
        queryFn: getAccountReservations,
    });
}