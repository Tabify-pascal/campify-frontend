import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminMessageStatus } from "../api/adminContact";
import type { ContactMessageStatus } from "../types/message";
import { queryKeys } from "../../../../queryKeys";

type UpdateMessageStatusInput = {
    messageId: string;
    status: ContactMessageStatus;
};

export function useUpdateMessageStatus(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ messageId, status}:UpdateMessageStatusInput) => updateAdminMessageStatus(messageId, status),
        onSuccess: async(updatedMessage, variables) => {
            queryClient.setQueryData(
                queryKeys.admin.messages.detail(variables.messageId),
                updatedMessage
            );
            await queryClient.invalidateQueries({ queryKey: queryKeys.admin.messages.all});
        },
    });    
}

