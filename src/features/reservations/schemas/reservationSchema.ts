import { z } from "zod";

export const reservationSchema = z.object({
    firstName: z.string().min(1, "Voornaam is verplicht"),
    lastName: z.string().min(1, "Achternaam is verplicht"),
    email: z.string().email("Vul een geldig emailadres in"),
    phone: z.string().min(8, "Vul een geldig telefoonnummer in"),
    guests: z.coerce.number().min(1).max(8),
    arrivalDate: z.string().min(1, "kies een aankomstdatum"),
    departureDate: z.string().min(1, "Kies een vertrekdatum"),
    notes: z.string().optional(),
});

export type ReservationFormInput = z.input<typeof reservationSchema>;
export type ReservationFormData = z.output<typeof reservationSchema>;