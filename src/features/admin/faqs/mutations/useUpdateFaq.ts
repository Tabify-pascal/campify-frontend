import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFaq } from "../api/adminFaqApi";
import { type FaqFormData } from "../schemas/faqSchema";
import { queryKeys } from "../../../../queryKeys";

type Variables = {
    id: string,
    data: FaqFormData;
}

export function useUpdateFaq(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data}: Variables)=> updateFaq(id, data),
        onSuccess: async(updatedFaq) => {
            queryClient.setQueryData(queryKeys.admin.faqs.detail(updatedFaq.id), updatedFaq);
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.faqs.all}),
                queryClient.invalidateQueries({ queryKey: queryKeys.faqs.all}),
            ]);            
        }
    });
}
