import { api } from "../../../api/client";

import type { AccountReservation } from "../types/AccountReservation";

export function getAccountReservations() {
    return api<AccountReservation[]>(
        "/account/reservations"
    );
}