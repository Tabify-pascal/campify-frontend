import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNews } from "../api/adminNewsApi";
import type { NewsFormData } from "../schemas/newsSchema";
import { queryKeys } from "../../../../queryKeys";

type Variables = {
    id: string,
    data: NewsFormData;
};

export function useUpdateNews() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: Variables) => updateNews(id, data),
        onSuccess: async (updatedNews) => {
            queryClient.setQueryData(queryKeys.admin.news.detail(updatedNews.id), updatedNews);
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.news.all }),
                queryClient.invalidateQueries({ queryKey: queryKeys.news.all }),
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.dashboard}),
            ]);
        }
    });
}