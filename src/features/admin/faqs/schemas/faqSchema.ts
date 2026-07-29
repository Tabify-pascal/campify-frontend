import { z } from "zod";

export const faqSchema = z.object({
    question: z.string().min(1, "De vraag is verplicht"),
    answer: z.string().min(1, "Antwoord is verplicht"),
})

export type FaqFormInput = z.input<typeof faqSchema>;
export type FaqFormData = z.output<typeof faqSchema>;
