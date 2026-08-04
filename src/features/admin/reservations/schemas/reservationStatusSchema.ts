import { z } from "zod";

export const reservationStatusSchema = z.object({
    status: z.enum([
        "PENDING",
        "CONFIRMED",
        "CANCELLED",
    ]),
});

export type ReservationStatusFormInput = z.input<typeof reservationStatusSchema>;
export type ReservationStatusFormData = z.output<typeof reservationStatusSchema>;