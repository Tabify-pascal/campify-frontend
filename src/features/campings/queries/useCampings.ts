/**
 * @file useCampings.ts
 * @author Pascal Thomasse Mol
 * @since 2026-09-09
 */

import { useQuery } from "@tanstack/react-query";

import { getCampings } from "../api/campingsApi";
import { queryKeys } from "../../../app/queryKeys";

export function useCampings() {
    return useQuery({
        queryKey: queryKeys.campings.all,
        queryFn: getCampings,
    });
}

