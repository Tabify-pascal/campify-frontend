/**
 * @file reservationStatusSchema.ts
 * @author Pascal Thomasse Mol
 * @since 2026-08-04
 */

import { z } from "zod";

export const reservationStatusSchema = z.object({
    status: z.enum([
        "PENDING",
        "CONFIRMED",
        "CANCELLED",
        "COMPLETED",
    ]),
});

export type ReservationStatusFormInput = z.input<typeof reservationStatusSchema>;
export type ReservationStatusFormData = z.output<typeof reservationStatusSchema>;