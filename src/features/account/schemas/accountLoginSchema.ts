import { z } from "zod";

export const accountLoginSchema = z.object({
    email: z.string().email("Vul een geldig e-mailadres in"),
    password: z.string().min(1, "Wachtwoord is verplicht"), 
});

export type AccountLoginFormData = z.infer<typeof accountLoginSchema>;