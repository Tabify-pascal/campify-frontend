import { useQuery } from "@tanstack/react-query";
import { getNewsItem } from "../../../api/newsApi";

export function useNewsItem(newsId: string | undefined ){
    return useQuery({
        queryKey: [ "news", newsId],
        queryFn: ()=> getNewsItem(newsId!),
        enabled: !!newsId,
    });
}