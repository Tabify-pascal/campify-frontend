/**
 * @file useNewsItems.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-09
 */

import { useQuery } from "@tanstack/react-query";
import { getNewsItems } from "../api/newsApi";

export function useNewsItems(){
    return useQuery({
        queryKey: ["news"],
        queryFn: getNewsItems,
    });
}