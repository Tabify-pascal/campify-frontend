/**
 * @file useFaqs.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-09
 */

import { useQuery } from "@tanstack/react-query";
import { getFaqItems } from "../api/faqApi";

export function useFaqItems(){
    return useQuery({
        queryKey: ["faq"],
        queryFn: getFaqItems,
    })
}

