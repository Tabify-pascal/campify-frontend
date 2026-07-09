import { useQuery } from "@tanstack/react-query";
import { getFaqItems } from "../../../api/faqApi";

export function useFaqItems(){
    return useQuery({
        queryKey: ["faq"],
        queryFn: getFaqItems,
    })
}

