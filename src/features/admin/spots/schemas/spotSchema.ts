import { z } from "zod";

export const spotSchema = z.object({
    name: z.string().min(2, "Naam is verplicht"),
    description: z.string().min(10, "Beschrijving is te kort"),
    capacity: z.coerce.number().min(1, "Capacititeit moet minstens 1 zijn"),
    pricePerNight: z.coerce.number().min(1, "Prijs moet minimaal 1 zijn"),
    size: z.coerce.number().min(1, "Oppervlakte moet minimaal 1 zijn"),
    imageUrl: z.string(),
    electricity: z.boolean(),
    waterConnection: z.boolean(),
});

export type SpotFormInput = z.input<typeof spotSchema>;
export type SpotFormData = z.output<typeof spotSchema>;