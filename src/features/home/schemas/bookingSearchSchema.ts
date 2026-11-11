import { z } from "zod";

export const bookingSearchSchema = z.object({
    arrivalDate: z.string().min(1, "Kies een aankomstdatum"),
    departureDate: z.string().min(1, "Kies een vertrekdatum"),
    guests: z.coerce.number().min(1).max(6),
});

export type BookingSearchFormInput = z.input<typeof bookingSearchSchema>;
export type BookingSearchFormData = z.output<typeof bookingSearchSchema>;