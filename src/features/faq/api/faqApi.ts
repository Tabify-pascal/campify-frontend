/**
 * @file faqApi.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-09
 */

import { api } from "../../../api/client";
import type { FaqItem } from "../types/FaqItem";

export async function getFaqItems(): Promise<FaqItem[]> {
    return api<FaqItem[]>("/faq");
}
