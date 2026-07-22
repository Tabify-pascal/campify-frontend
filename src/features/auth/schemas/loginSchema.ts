import { z } from "zod";

export const loginSchema = z.object({
    email: z.string()
    .min(1, "E-mailadres is verplicht")
    .email("Vul een geldig e-mailadres in"),

    password: z
    .string()
    .min(1, "Wachtwoord is verplicht"),
});

export type LoginFormInput = z.input<typeof loginSchema>;
export type LoginFormData = z.output<typeof loginSchema>;