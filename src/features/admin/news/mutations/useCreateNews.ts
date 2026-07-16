import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNews } from "../../../../api/adminNewsApi";

export function useCreateNews(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNews, 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ "news"]});
        },
    });
}