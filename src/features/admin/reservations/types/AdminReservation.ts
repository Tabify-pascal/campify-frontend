import type { Reservation } from "../../../reservations/types/Reservation";

export type AdminReservation = Reservation & {
    source: "CAMPIFY" | "BLOOKERS";
    externalReservationId: string | null;
    spot: {
        id: string;
        name: string;
    };
};