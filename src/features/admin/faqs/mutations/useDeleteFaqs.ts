import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFaq } from "../api/adminFaqApi";
import { queryKeys } from "../../../../queryKeys";

export function useDeleteFaq() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFaq,
        onSuccess: async (_, deletedFaq) => {
            queryClient.removeQueries({ queryKey: queryKeys.admin.faqs.detail(deletedFaq) });
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.faqs.all }),
                queryClient.invalidateQueries({ queryKey: queryKeys.faqs.all }),
            ]);
        }
    });
}
