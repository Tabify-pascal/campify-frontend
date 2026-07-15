import { z } from "zod";

export const spotSchema = z.object({
  name: z.string().min(2, "Naam moet minimaal 2 tekens bevatten"),
  description: z
    .string()
    .min(10, "Beschrijving moet minimaal 10 tekens bevatten"),

  capacity: z.coerce.number().int().min(1),
  pricePerNight: z.coerce.number().int().min(1),
  size: z.coerce.number().int().min(1),

  image: z
    .instanceof(FileList)
    .optional(),

  electricity: z.boolean(),
  waterConnection: z.boolean(),

  features: z
    .array(
      z.object({
        name: z.string(),
      })
    )
    .default([]),
});

export type SpotFormInput = z.input<typeof spotSchema>;
export type SpotFormData = z.output<typeof spotSchema>;