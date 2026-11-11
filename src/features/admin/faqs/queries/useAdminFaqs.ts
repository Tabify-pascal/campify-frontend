/**
 * @file useAdminFaqs.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-29
 */

import { useQuery } from "@tanstack/react-query";
import { getAdminFaqs } from "../api/adminFaqApi";

export function useAdminFaqs(){
    return useQuery({
        queryKey: ["admin", "faqs"],
        queryFn: getAdminFaqs,
    })
}
