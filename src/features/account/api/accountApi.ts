/**
 * @file accountApi.ts
 * @author Pascal Thomasse Mol
 * @since 2026-08-24
 */

import { api } from "../../../api/client";

import type { AccountReservation } from "../types/AccountReservation";

export function getAccountReservations() {
    return api<AccountReservation[]>(
        "/account/reservations"
    );
}