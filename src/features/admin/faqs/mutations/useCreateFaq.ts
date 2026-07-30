import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFaq } from "../../../../api/adminFaqApi";

export function useCreateFaq(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createFaq,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin", "faqs"]});
        },
    });
}
