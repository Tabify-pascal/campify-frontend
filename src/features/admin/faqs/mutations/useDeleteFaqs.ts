import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFaq } from "../../../../api/adminFaqApi";

export function useDeleteFaq(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFaq, 
        onSuccess: async (_, deletedId) => {
            await queryClient.invalidateQueries({ queryKey: [ "faqs"]});
            queryClient.removeQueries({ queryKey: ["admin", "faqs", deletedId]})
        }
    })
}
