import { api } from "./client";
import type { ContactFormData } from "../features/contact/schemas/contactSchema";

export type ContactMessage = ContactFormData & {
    id: string;
    status: "NEW" | "READ" | "CLOSED";
    createdAt: string;
    updatedAt: string;
};

export function createContactMessage(data: ContactFormData){
    return api<ContactMessage>("/contact", {
        method: "POST",
        body: JSON.stringify(data),
    });
}