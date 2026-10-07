import { api } from "../../../api/client";

import type { ReservationFormData } from "../schemas/reservationSchema";
import type { CheckoutSummary } from "../types/CheckoutSummary";
import type { PaymentStatus } from "../types/PaymentStatus";
import type { Reservation } from "../types/Reservation";

export type CreateReservationInput = ReservationFormData & {
    spotId: string;
};

export type CreateReservationResponse = {
    success: boolean;
    message: string;
    reservation: Reservation;
};

export function createReservation(
    data: CreateReservationInput
) {
    return api<CreateReservationResponse>(
        "/reservations",
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
}

export function updatePaymentStatus(
    reservationId: string,
    paymentStatus: PaymentStatus,
) {
    return api<Reservation>(
        `/reservations/${reservationId}/payment`,
        {
            method: "PATCH",
            body: JSON.stringify({
                paymentStatus,
            }),
        }
    );
}

export function getCheckoutSummary(
    reservationId: string
) {
    return api<CheckoutSummary>(
        `/reservations/${reservationId}/checkout`
    );
}