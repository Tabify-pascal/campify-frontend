import { useQuery } from "@tanstack/react-query";

import { getCampings } from "../api/campingsApi";
import { queryKeys } from "../../../queryKeys";

export function useCampings() {
    return useQuery({
        queryKey: queryKeys.campings.all,
        queryFn: getCampings,
    });
}

