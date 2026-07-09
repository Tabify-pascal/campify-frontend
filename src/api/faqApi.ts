import { api } from "./client";
import type { FaqItem } from "../features/faq/types/FaqItem";


export async function getFaqItems(): Promise<FaqItem[]> {
    return api<FaqItem[]>("/faq");
}
