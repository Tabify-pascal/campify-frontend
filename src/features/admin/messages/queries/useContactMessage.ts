import { useQuery } from "@tanstack/react-query";
import { getContactMessage } from "../api/adminContact";

export function useContactMessage(messageId: string | undefined) {
    return useQuery({
        queryKey: ["admin", "messages", messageId],
        queryFn: () => {
            if (!messageId){
                throw new Error("Message ID is required");
            }

            return getContactMessage(messageId);
        },
        enabled: !!messageId,
    });
}
