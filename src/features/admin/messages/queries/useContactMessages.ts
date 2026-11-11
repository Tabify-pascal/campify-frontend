import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../queryKeys";
import { getContactMessages } from "../api/adminContactApi";

export function useContactMessages(){
    return useQuery({
        queryKey: queryKeys.admin.messages.all,
        queryFn: getContactMessages,
    });
}

