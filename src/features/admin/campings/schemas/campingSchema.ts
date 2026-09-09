import { z } from "zod";

export const campingSchema = z.object({
    name: z.string().min(1, "Naam is verplicht"),
    slug: z.string().min(1, "Slug is verplicht"),
    description: z.string().optional(),

    logo: z
        .instanceof(FileList)
        .optional(),
});

export type CampingFormInput =
    z.input<typeof campingSchema>;

export type CampingFormData =
    z.output<typeof campingSchema>;