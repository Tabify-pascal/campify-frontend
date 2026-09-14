import { z } from "zod";

export const contactSchema = z.object({
    campingId: z
        .string()
        .min(1, "Kies een camping"),

    name: z
        .string()
        .min(1, "Naam is verplicht"),

    email: z
        .string()
        .email("Vul een geldig e-mailadres in"),

    subject: z
        .string()
        .min(1, "Onderwerp is verplicht"),

    message: z
        .string()
        .min(1, "Bericht is verplicht"),
});

export type ContactFormData =
    z.infer<typeof contactSchema>;