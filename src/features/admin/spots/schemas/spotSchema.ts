import { z } from "zod";

export const spotSchema = z.object({
    name: z.string().min(1, "Naam is verplicht"),
    description: z.string().min(1, "Beschrijving is verplicht"),

    campingId: z.string().min(1, "Camping is verplicht"),

    capacity: z.coerce.number().min(1),
    pricePerNight: z.coerce.number().min(1),
    size: z.coerce.number().min(1),

    electricity: z.boolean(),
    waterConnection: z.boolean(),

    image: z.instanceof(FileList).optional(),

    features: z.array(
        z.object({
            name: z.string(),
        })
    ).optional(),
});

export type SpotFormInput = z.input<typeof spotSchema>;
export type SpotFormData = z.output<typeof spotSchema>;