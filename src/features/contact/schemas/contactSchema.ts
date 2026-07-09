import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, "Naam is verplicht"),
    email: z.string().email("Vul een geldig e-mailadres in"),
    subject: z.string().min(2, "Onderwerp is verplicht"),
    message: z.string().min(10, "Bericht moet minimaal 10 tekens bevatten"),
});

export type ContactFormData = z.infer<typeof contactSchema>;