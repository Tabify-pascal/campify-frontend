import { z } from "zod";

export const registerSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, "Voornaam is verplicht"),

    lastName: z
        .string()
        .trim()
        .min(1, "Achternaam is verplicht"),

    email: z
        .string()
        .trim()
        .email("Vul een geldig e-mailadres in"),

    password: z
        .string()
        .min(8, "Wachtwoord moet minimaal 8 tekens bevatten"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;