import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNews } from "../api/adminNewsApi";
import { queryKeys } from "../../../../queryKeys";

export function useDeleteNews() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNews,
        onSuccess: async (_, deletedId) => {
            queryClient.removeQueries({ queryKey: ["news", deletedId] });
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.news.all }),
                queryClient.invalidateQueries({ queryKey: queryKeys.news.all }),
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.dashboard}),
            ]);
        },
    });
}