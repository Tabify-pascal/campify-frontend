/**
 * @file useCreateReservation.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-09
 */

import { useMutation } from "@tanstack/react-query";
import { createReservation } from "../api/reservationsApi";

export function useCreateReservation(){
    return useMutation({
        mutationFn: createReservation,
    })
}