import { adminApi } from "./adminClient";
import type { AdminReservation, ReservationStatus } from "../features/admin/reservations/types/AdminReservation";

export function getAdminReservations(){
    return adminApi<AdminReservation[]>(`/admin/reservations`);
}

export function getAdminReservationById(reservationId: string){
    return adminApi<AdminReservation>(`/admin/reservations/${reservationId}`);
}

// export function updateAdminReservationStatus(reservationId : string, status: ReservationStatus ) {
//     return adminApi<ReservationStatus>(`/admin/reservations/${reservationId}/status`, {
//         method: "PATCH",
//         body: JSON.stringify({status,})
//     });
// } 

export function updateAdminReservationStatus(
    reservationId: string, 
    status: ReservationStatus
) {
    return adminApi<AdminReservation>(
        `/admin/reservation/${reservationId}/status`,
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

