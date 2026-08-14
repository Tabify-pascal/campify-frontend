import { useQuery } from "@tanstack/react-query";
import { getContactMessage } from "../api/adminContact";
import { queryKeys } from "../../../../queryKeys";

export function useContactMessage(messageId: string | undefined) {
    return useQuery({
        queryKey: queryKeys.admin.messages.detail(messageId ?? ""),
        queryFn: () => {
            if (!messageId){
                throw new Error("Message ID is required");
            }

            return getContactMessage(messageId);
        },
        enabled: !!messageId,
    });
}
