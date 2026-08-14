import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../queryKeys";
import { getContactMessages } from "../api/adminContact";

export function useContactMessages(){
    return useQuery({
        queryKey: queryKeys.admin.messages.all,
        queryFn: getContactMessages,
    });
}

