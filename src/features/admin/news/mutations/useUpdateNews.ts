import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNews } from "../../../../api/adminNewsApi";
import type { NewsFormData } from "../schemas/newsSchema";

type Variables = {
    id: string,
    data: NewsFormData;
};

export function useUpdateNews(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: Variables)=> updateNews(id, data),
        onSuccess: (updatedNews) => {
            queryClient.setQueryData(["news", updatedNews.id], updatedNews);
            queryClient.invalidateQueries({ queryKey: ["news"]});
        }
    })
}