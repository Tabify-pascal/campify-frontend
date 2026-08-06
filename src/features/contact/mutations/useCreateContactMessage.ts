import { useMutation } from "@tanstack/react-query";
import { createContactMessage } from "../../../api/contact";

export function useCreateContactMessage(){
    return useMutation({
        mutationFn: createContactMessage,
    });
}