import { api } from "../../../api/client";
import type { ReservationFormData } from "../schemas/reservationSchema";

export type CreateReservationInput = ReservationFormData & {
    spotId: string;
};

export async function createReservation(data: CreateReservationInput){
    return api("/reservations", {
        method: "POST", 
        body: JSON.stringify(data),
    });
}