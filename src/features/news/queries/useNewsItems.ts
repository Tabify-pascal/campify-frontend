import { useQuery } from "@tanstack/react-query";
import { getNewsItems } from "../../../api/newsApi";

export function useNewsItems(){
    return useQuery({
        queryKey: ["news"],
        queryFn: getNewsItems,
    });
}