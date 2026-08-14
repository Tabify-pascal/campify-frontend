import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminMessage } from "../api/adminContact";

export function useDeleteMessage(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAdminMessage,
        onSuccess: async (_, deletedId) => {
            await queryClient.invalidateQueries({ queryKey: ["admin", "messages"]});
            queryClient.removeQueries({queryKey: ["admin", "messages", deletedId]});
        },
    });
}
