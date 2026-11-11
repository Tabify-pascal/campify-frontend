/**
 * @file useNewsItem.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-09
 */

import { useQuery } from "@tanstack/react-query";
import { getNewsItem } from "../api/newsApi";

export function useNewsItem(newsId: string | undefined ){
    return useQuery({
        queryKey: [ "news", newsId],
        queryFn: ()=> getNewsItem(newsId!),
        enabled: !!newsId,
    });
}