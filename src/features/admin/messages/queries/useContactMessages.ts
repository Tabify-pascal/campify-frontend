import { useQuery } from "@tanstack/react-query";
import { getContactMessages } from "../api/adminContact";

export function useContactMessages(){
    return useQuery({
        queryKey: ["admin", "messages"],
        queryFn: getContactMessages,
    });
}

