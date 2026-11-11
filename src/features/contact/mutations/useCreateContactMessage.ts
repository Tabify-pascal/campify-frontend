/**
 * @file useCreateContactMessage.ts
 * @author Pascal Thomasse Mol
 * @since 2026-08-06
 */

import { useMutation } from "@tanstack/react-query";
import { createContactMessage } from "../api/contactApi";
import { queryKeys } from "../../../app/queryKeys";
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