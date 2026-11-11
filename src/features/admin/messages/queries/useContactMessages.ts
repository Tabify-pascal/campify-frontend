/**
 * @file useContactMessages.ts
 * @author Pascal Thomasse Mol
 * @since 2026-08-14
 */

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../app/queryKeys";
import { getContactMessages } from "../api/adminContactApi";

export function useContactMessages(){
    return useQuery({
        queryKey: queryKeys.admin.messages.all,
        queryFn: getContactMessages,
    });
}

