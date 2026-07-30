import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFaq } from "../../../../api/adminFaqApi";
import { type FaqFormData } from "../schemas/faqSchema";

type Variables = {
    id: string,
    data: FaqFormData;
}

export function useUpdateFaq(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data}: Variables)=> updateFaq(id, data),
        onSuccess: (updatedFaq) => {
            queryClient.setQueryData(["faqs", updatedFaq.id], updatedFaq);
            queryClient.invalidateQueries({ queryKey: ["admin", "faqs"]});
        }
    });
}
