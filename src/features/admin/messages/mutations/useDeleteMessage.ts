import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminMessage } from "../api/adminContact";
import { queryKeys } from "../../../../queryKeys";

export function useDeleteMessage(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAdminMessage,
        onSuccess: async (_, deletedId) => {
            queryClient.removeQueries({queryKey: queryKeys.admin.messages.detail(deletedId)});
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.messages.all}),
                queryClient.invalidateQueries({ queryKey: queryKeys.admin.dashboard}),
            ])
        },
    });
}
