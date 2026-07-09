import { api } from "./client";
import type { ReservationFormData } from "../features/reservations/schemas/reservationSchema";

export type CreateReservationInput = ReservationFormData & {
    spotId: string;
};

export async function createReservation(data: CreateReservationInput){
    return api("/reservations", {
        method: "POST", 
        body: JSON.stringify(data),
    });
}