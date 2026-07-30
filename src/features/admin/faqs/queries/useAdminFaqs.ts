import { useQuery } from "@tanstack/react-query";
import { getAdminFaqs } from "../../../../api/adminFaqApi";

export function useAdminFaqs(){
    return useQuery({
        queryKey: ["admin", "faqs"],
        queryFn: getAdminFaqs,
    })
}
