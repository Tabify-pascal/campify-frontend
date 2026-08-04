export type ReservationStatus = 
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED";

export type AdminReservation = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    guests: number;
    arrivalDate: string;
    departureDate: string;
    notes?: string | null;
    status: ReservationStatus;
    createdAt: string;
    spot: {
        id: string;
        name: string;
    };
};

