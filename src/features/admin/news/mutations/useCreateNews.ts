import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNews } from "../api/adminNewsApi";
import { queryKeys } from "../../../../queryKeys";

export function useCreateNews(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNews, 
        onSuccess: async() => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.news.all}),
                queryClient.invalidateQueries({ queryKey: queryKeys.news.all}),
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.dashboard}),
            ]);            
        },
    });
}