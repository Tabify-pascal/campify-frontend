import { useMutation } from "@tanstack/react-query";
import { createContactMessage } from "../api/contact";
import { queryKeys } from "../../../queryKeys";
import { queryClient } from "../../../app/queryClient";

export function useCreateContactMessage(){
    return useMutation({
        mutationFn: createContactMessage,

        onSuccess: async()=> {
            await Promise.all([
              queryClient.invalidateQueries({queryKey: queryKeys.admin.messages.all}),
              queryClient.invalidateQueries({queryKey: queryKeys.admin.dashboard}),  
            ]);
        }
    });
}