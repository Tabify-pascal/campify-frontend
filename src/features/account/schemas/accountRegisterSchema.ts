import { z } from "zod";

export const accountRegisterSchema = z.object({ 
    name: z.string().trim().min(2, "Naam is verplicht"),
    email: z.string().email("Vul een geldig e-mailadres in"),
    password: z
        .string()
        .min(8, "Wachtwoord moet minimaal 8 tekens bevatten")
});

export type accountRegisterFormData = z.infer<typeof accountRegisterSchema>;