/**
 * @file useAccountReservations.ts
 * @author Pascal Thomasse Mol
 * @since 2026-08-24
 */

import { useQuery } from "@tanstack/react-query";

import { getAccountReservations } from "../api/accountApi";
import { queryKeys } from "../../../app/queryKeys";

export function useAccountReservations(){
    return useQuery({
        queryKey: queryKeys.account.reservations,
        queryFn: getAccountReservations,
    });
}