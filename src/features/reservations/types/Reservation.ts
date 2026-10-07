import type { PaymentStatus } from "./PaymentStatus";

export type ReservationStatus =
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED"
    | "COMPLETED";

export type Reservation = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    guests: number;
    arrivalDate: string;
    departureDate: string;
    notes: string | null;
    status: ReservationStatus;
    paymentStatus: PaymentStatus;
    totalPrice: number;
};