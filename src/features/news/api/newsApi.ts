/**
 * @file newsApi.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-09
 */

import { api } from "../../../api/client";
import type { NewsItem } from "../types/NewsItem";

export async function getNewsItems(): Promise<NewsItem[]> {
    return api<NewsItem[]>("/news");
}

export function getNewsItem(newsId: string){
    return api<NewsItem>(`/news/${newsId}`);
}