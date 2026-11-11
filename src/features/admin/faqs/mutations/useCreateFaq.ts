import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFaq } from "../api/adminFaqApi";
import { queryKeys } from "../../../../app/queryKeys";

export function useCreateFaq() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createFaq,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.faqs.all }),
                queryClient.invalidateQueries({ queryKey: queryKeys.faqs.all }),
            ]);
        },
    });
}
