import { z } from "zod";

export const newsSchema = z.object({
    title: z.string().min(2, "Titel is verplicht"),
    excerpt: z.string().min(10, "Samenvatting is te kort"),
    content: z.string().min(20, "Inhoud is te kort"),
    date: z.string().min(1, "datum is verplicht"),
    image: z.instanceof(FileList).optional(),
});

export type NewsFormInput = z.input<typeof newsSchema>;
export type NewsFormData = z.output<typeof newsSchema>;

