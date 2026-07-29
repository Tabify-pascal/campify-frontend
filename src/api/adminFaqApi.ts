import { adminApi } from "./adminClient";
import type { FaqItem } from "../features/faq/types/FaqItem";
import type { FaqFormData } from "../features/admin/faqs/schemas/faqSchema";

export function getAdminFaqs(){
    return adminApi<FaqItem[]>(`/admin/faqs`);
}

export function getAdminFaqById(faqId: string){
    return adminApi<FaqItem>(`/admin/faqs/${faqId}`);
}

export function createFaq(data: FaqFormData){
    return adminApi<FaqItem>("/admin/faqs", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateFaq(faqId: string, data: FaqFormData){
    return adminApi<FaqItem>(`/admin/faqs/${faqId}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export function deleteFaq(faqId: string) {
    return adminApi<void>(`/admin/faqs/${faqId}`, {
        method: "DELETE",
    });
}
