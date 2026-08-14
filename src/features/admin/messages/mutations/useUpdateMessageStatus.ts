import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminMessageStatus } from "../../../../api/adminContact";
import type { ContactMessageStatus } from "../types/message";

type UpdateMessageStatusInput = {
    messageId: string;
    status: ContactMessageStatus;
};

export function useUpdateMessageStatus(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ messageId, status}:UpdateMessageStatusInput) => updateAdminMessageStatus(messageId, status),
        onSuccess: (updatedMessage, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin", "messages"]});
            queryClient.setQueryData(
                ["admin", "messages", variables.messageId],
                updatedMessage
            );
        },
    });    
}

