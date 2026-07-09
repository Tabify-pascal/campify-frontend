import { useMutation } from "@tanstack/react-query";
import { createReservation } from "../../../api/reservationsApi";

export function useCreateReservation(){
    return useMutation({
        mutationFn: createReservation,
    })
}