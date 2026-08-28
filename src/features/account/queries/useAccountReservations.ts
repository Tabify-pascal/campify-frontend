import { useQuery } from "@tanstack/react-query";

import { getAccountReservations } from "../api/accountApi";
import { queryKeys } from "../../../queryKeys";

export function useAccountReservations(){
    return useQuery({
        queryKey: queryKeys.account.reservations,
        queryFn: getAccountReservations,
    });
}