export type AccountReservationStatus = 
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED"
    | "COMPLETED"

export type PaymentStatus =
    | "UNPAID"
    | "PAID";

export type AccountReservation = {
    id: string;
    firstName: string;
    lastName: string;
    guests: number;
    arrivalDate: string;
    departureDate: string;
    notes: string | null;
    status: AccountReservationStatus;
    totalPrice: number;
    spot: {
        id: string;
        name: string;
        imageUrl: string;
    };
    paymentStatus: PaymentStatus;
}