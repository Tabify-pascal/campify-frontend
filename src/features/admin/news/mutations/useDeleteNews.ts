import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNews } from "../../../../api/adminNewsApi";

export function useDeleteNews() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNews,
        onSuccess: async (_, deletedId) => {
            await queryClient.invalidateQueries({ queryKey: ["news"]});
            queryClient.removeQueries({ queryKey: ["news", deletedId]});
        },
    });
}