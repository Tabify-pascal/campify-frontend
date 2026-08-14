import { api } from "../../../api/client";
import type { FaqItem } from "../types/FaqItem";

export async function getFaqItems(): Promise<FaqItem[]> {
    return api<FaqItem[]>("/faq");
}
