import { z } from "zod";

export const contactMessageStatusSchema = z.object({
    status: z.enum([
        "NEW",
        "READ",
        "CLOSED"
    ]),
});

export type ContactMessageStatusFormInput = z.input<typeof contactMessageStatusSchema>;
export type ContactMessageStatusFormData = z.output<typeof contactMessageStatusSchema>;

