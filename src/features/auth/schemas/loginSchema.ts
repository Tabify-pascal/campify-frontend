import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Vul een geldig e-mailadres in"),

    password: z
        .string()
        .min(1, "Wachtwoord is verplicht"),
});

export type LoginFormData = z.infer<typeof loginSchema>;