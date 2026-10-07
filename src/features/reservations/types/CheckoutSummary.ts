export type CheckoutSummary = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    guests: number;
    arrivalDate: string;
    departureDate: string;
    status:
        | "PENDING"
        | "CONFIRMED"
        | "CANCELLED"
        | "COMPLETED";
    paymentStatus:
        | "UNPAID"
        | "PAID";
    pricePerNight: number;
    totalPrice: number;
    spot: {
        id: string;
        name: string;
        camping: {
            id: string;
            name: string;
        };
    };
};