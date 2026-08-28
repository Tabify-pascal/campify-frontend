export type AccountReservationStatus = 
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED"
    | "COMPLETED"

export type AccountReservation = {
    id: string;
    firstName: string;
    lastName: string;
    guests: number;
    arrivalDate: string;
    departureDate: string;
    notes: string | null;
    status: AccountReservationStatus;
    spot: {
        id: string;
        name: string;
        imageUrl: string;
    };
}