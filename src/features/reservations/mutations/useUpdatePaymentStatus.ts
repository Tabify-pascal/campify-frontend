/**
 * @file useUpdatePaymentStatus.ts
 * @author Pascal Thomasse Mol
 * @since 2026-10-07
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePaymentStatus } from "../api/reservationsApi";
import { queryKeys } from "../../../app/queryKeys";
import type { PaymentStatus } from "../types/PaymentStatus";

type Variables = {
    reservationId: string;
    paymentStatus: PaymentStatus;
};

export function useUpdatePaymentStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            reservationId,
            paymentStatus,
        }: Variables) =>
            updatePaymentStatus(
                reservationId,
                paymentStatus
            ),

        onSuccess: async (_, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: queryKeys.account.reservations,
                }),
                queryClient.invalidateQueries({
                    queryKey: queryKeys.reservations.checkout(
                        variables.reservationId
                    ),
                }),
            ]);
        },
    });
}