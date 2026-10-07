import { adminApi } from "../../../../api/adminClient";
import type { AdminReservation } from "../types/AdminReservation";
import type { ReservationStatus } from "../../../reservations/types/ReservationStatus";

export function getAdminReservations(){
    return adminApi<AdminReservation[]>(`/admin/reservations`);
}

export function getAdminReservationById(reservationId: string){
    return adminApi<AdminReservation>(`/admin/reservations/${reservationId}`);
}

export function updateAdminReservationStatus(
    reservationId: string, 
    status: ReservationStatus
) {
    return adminApi<AdminReservation>(
        `/admin/reservations/${reservationId}/status`,
        {
            method: "PATCH",
            body: JSON.stringify({ status}),
        }
    );
}

export function deleteAdminReservation(reservationId: string){
    return adminApi<void>(`/admin/reservations/${reservationId}`, {
        method: "DELETE",
    });
}

